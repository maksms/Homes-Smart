window.log = -> try console.log.apply(console, arguments)
debug = -> console.debug.apply arguments if window.console

class @Chart
  constructor: (@data, @done) ->
    log "Chart#constructor(): init chart '#{@data.name}'"
    @series = []
    @parseArgs window.location.search.substring(1)

  loadAndShow: =>
    if @isShowChart()
      log "Chart[#{@data.name}]#loadAndShow()"
      @loadData()
        .then(@transformData)
        .then =>
          @show()
          @done?()
    else
      @done?()

  loadData: =>
    log "Chart[#{@data.name}]#loadData(): query: ", @query()
    new Promise (resolve, reject)=>
      influxdb.query @query(), (points, err)=>
        if err?
          reject(err)
        else
          resolve(points)

  transformData: (response) =>
    log "Chart[#{@data.name}]#transformData(response):", response
    points = response[0].points
    nodes = _.groupBy points, (point) -> point.host
    series = {}

    #log "nodes:", nodes
    nodes = _.groupBy points, (point) -> point.host
    _.each nodes, (points, host) =>
      # console.log "#{host} points: ", points
      _.each @fieldNames(), (field) =>
        name = "#{host} - #{field}"
        series[name] ||= {name: name, data: []}

    _.each nodes, (points, host) =>
      data = _.each points, (point) =>
        _.each @fieldNames(), (field) =>
          name = "#{point.host} - #{field}"
          series[name].data.push [point.time.getTime(), point[field]]

    # Fill @series if data present
    for name, serie of series
      if _.find(serie.data, (item) -> !!item[1])
        serie.data = serie.data.reverse()
        @series.push serie

    # console.log "series: ", series

    1

  show: =>
    log "Chart#show()"
    div = $('<div>').addClass("chart")
    $("#content").append div

    params = _.clone(@data.chart)
    _.merge params,
      chart:
        renderTo: div[0]
        height: 300
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

  parseArgs: (qstr) ->
    @argv = {}
    a = qstr.split('&')
    for i of a
      b = a[i].split('=')
      @argv[decodeURIComponent(b[0])] = decodeURIComponent(b[1])
    @argv

  isShowChart: =>
    # log "argv", @argv
    if @argv.graphs
      graphs = @argv.graphs.split(",")
      # Detect first occurance of @data.name
      !! _.find graphs, (item) => item == @data.name
    else
      true

  queryFields: =>
    fields = @data.select?.fields
    if fields?.join?
      # array
      fields
    else if typeof fields is 'object'
      # convert {counter: "cnt1"}" -> "cnt1" AS counter
      _.map fields, (val, key) -> "#{val} AS #{key}"
    else
      # some string value
      [@data.select.fields]

  fieldNames: =>
    fields = @data.select?.fields
    if fields?.join?
      # array
      fields
    else if typeof fields is 'object'
      # convert {counter: "cnt1"}" -> "counter"
      _.map fields, (val, key) -> key
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
    if @argv.period
      @argv.period
    else
      "12h"

  query: =>
    fields = @queryFields().join ', '
    "SELECT host, #{fields} FROM srach GROUP BY host, time(10m) fill(0) WHERE #{@macCondition()} AND time > NOW() - #{@period()};"


testSeq = ->
  delay = (ms)->
    new Promise (resolve, reject) ->
      setTimeout((-> resolve()), ms)

  delay( 500).then -> log "delay  500"
  delay(1000).then -> log "delay 1000"
  delay(1500).then -> log "delay 1500"
  delay(2000).then -> log "delay 2000"


# Once DOM (document) is finished loading
$(document).ready ->
  unless window.location.search.length is 0
    $('#no-data').hide()
    # Charts definition
    window.charts = []

    window.influxdb = new InfluxDB
      host: 'builder.flymon.net'
      port: 8086
      username: 'webface'
      password: 'webface2015'
      database: 'flymon'

    Highcharts.setOptions global: useUTC: false

    # Sequental via promises
    chain = Promise.resolve()
    graphs.forEach (graph_data)->
      chain = chain.then( =>
        data = _.cloneDeep(defaults)
        _.merge data, graph_data
        chart = new Chart data
        window.charts.push chart
        chart.loadAndShow()
      )

#    # Parallel via promises
#    graphs.forEach (graph_data)->
#      data = _.cloneDeep(defaults)
#      _.merge data, graph_data
#      chart = new Chart data
#      window.charts.push chart
#      chart.loadAndShow()

    # Sequental via Async lib
#    async.eachSeries graphs, (graph_data, cb) ->
#      # console.log "graph_data", graph_data
#      data = _.cloneDeep(defaults)
#      _.merge data, graph_data
#      log "new Chart", data.name
#      chart = new Chart(data, cb)
#      window.charts.push chart
#      chart.loadAndShow()
