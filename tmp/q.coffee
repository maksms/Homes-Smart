window.log = -> try console.log.apply(console, arguments)
debug = -> console.debug.apply arguments if window.console

class @Chart
  constructor: (@data, @done) ->
    @series = []
    @parseArgs window.location.search.substring(1)
    @loadData =>
      @show()
      @done() if @done

  parseArgs: (qstr) ->
    @argv = {}
    a = qstr.split('&')
    for i of a
      b = a[i].split('=')
      @argv[decodeURIComponent(b[0])] = decodeURIComponent(b[1])
    @argv


  queryFields: =>
    fields = @data.select?.fields
    if fields?.join?
      fields
    else if typeof fields is 'object'
      _.map fields, (k, v) -> "#{k} AS #{v}"
    else
      [@data.select.fields]

  fieldNames: =>
    fields = @data.select?.fields
    if fields?.join?
      fields
    else if typeof fields is 'object'
      _.map fields, (k, v) -> v
    else
      [@data.select.fields]


  macCondition: =>
    macs = (str) ->
      macs = str.split(",").map (s) -> "mac = '#{s}'"
      "( #{macs.join(" OR ")} )"

    if @argv.macs
      macs @argv.macs
    else if @data.select.macs?
      macs @data.select.macs
    else if @data.select.mac?
      "mac = '#{@data.select.mac}'"
    else
      "mac =~ /^18FE.*/"


  period: ->
    default_start = new Date(Date.now() - 86400 * 1000)

    log "default_start", default_start
    parseTime = (str) ->
      time = Date.parse(str)

      if isNaN(time)
        log "Invalid time #{str}"
        time = default_start
      time
    start = if @argv.start then parseTime(@argv.start) else default_start
    result = "time > #{start.getTime()}"

    if @argv.period
      period = parseInt(@argv.period)
      if isNaN(period)
        log "Invalid period #{@arg.period}"
      else
        log "start: ", start
        period = period * 1000
        result = "#{result} AND time < #{start.getTime() + period}"
    # else @argv.from? and @argv.to?


    result

  group: ->
    if @argv.group
      @argv.group
    else
      "10m"

  query: =>
    fields = @queryFields().join ', '
    "SELECT host, #{fields} FROM srach " +
    "  GROUP BY host, time(#{@group()}) fill(0) " +
    "  WHERE #{@macCondition()} AND (#{@period()});"

  loadData: (cb) =>
    log "query: ", @query()
    influxdb.query @query(), (points) =>
      log "points:", points
      nodes = _.groupBy points, (point) -> point.host
      series = {}

      log "nodes:", nodes
      nodes = _.groupBy points, (point) -> point.host
      _.each nodes, (points, host) =>
        # console.log "#{host} points: ", points
        _.each @fieldNames(), (field) ->
          name = "#{host} - #{field}"
          series[name] ||= {name: name, data: []}

      _.each nodes, (points, host) =>
        data = _.each points, (point) =>
          _.each @fieldNames(), (field) ->
            name = "#{point.host} - #{field}"
            series[name].data.push [point.time.getTime(), point[field]]

      # Fill @series if data present
      for name, serie of series
        if _.find(serie.data, (item) -> !!item[1])
          serie.data = serie.data.reverse()
          @series.push serie

      # console.log "series: ", series

      cb() if cb?


  show: =>
    div = $('<div>').addClass("chart")
    $("#content").append div

    params = _.clone(@data.chart)
    _.merge params,
      chart:
        renderTo: div[0]
        height: 550
      title: text: @data.chart.title
      xAxis: type: 'datetime'
      legend:
        layout: 'horizontal'
        align: 'center'
        verticalAlign: 'bottom'

        borderWidth: 1
      series: @series

    # console.log "params: ", params
    if params.series.length > 0
      @chart = new Highcharts.Chart params


# Once DOM (document) is finished loading
$(document).ready ->

  unless window.location.search.length is 0
    $('#no-data').hide()
    # Charts definition
    window.charts = []


    window.influxdb = new InfluxDB
      host: 'builder.flymon.net',
      port: 8086,
      username: 'webface',
      password: 'webface2015',
      database: 'flymon'

    Highcharts.setOptions global: useUTC: false

    async.eachSeries graphs, (graph_data, cb) ->
      # console.log "graph_data", graph_data
      data = _.cloneDeep(defaults)
      _.merge data, graph_data
      chart = new Chart(data, cb)
      window.charts.push chart
