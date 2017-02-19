var debug, parseArgs, testSeq,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

window.log = function() {
  try {
    return console.log.apply(console, arguments);
  } catch (undefined) {}
};

debug = function() {
  if ((window.debug != null) && window.console) {
    return console.debug.apply(arguments);
  }
};

parseArgs = function(qstr) {
  var a, argv, b, i;
  if (qstr == null) {
    qstr = window.location.search.substring(1);
  }
  argv = {};
  a = qstr.split('&');
  for (i in a) {
    b = a[i].split('=');
    argv[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
  }
  return argv;
};

this.Chart = (function() {
  function Chart(data1, done) {
    this.data = data1;
    this.done = done;
    this.query = bind(this.query, this);
    this.macCondition = bind(this.macCondition, this);
    this.fieldNames = bind(this.fieldNames, this);
    this.queryFields = bind(this.queryFields, this);
    this.isShowChart = bind(this.isShowChart, this);
    this.show = bind(this.show, this);
    this.transformData = bind(this.transformData, this);
    this.loadData = bind(this.loadData, this);
    this.loadAndShow = bind(this.loadAndShow, this);
    this.series = [];
    this.argv = parseArgs();
  }

  Chart.prototype.loadAndShow = function() {
    if (this.isShowChart()) {
      this.div = $('<div>').addClass("chart");
      $("#content").append(this.div);
      this.div.append($('<h2>').text("Loading " + this.data.name + "..."));
      this.div.append($('<img>').attr("src", "assets/images/ajax-loader.gif"));
      return this.loadData().then(this.transformData).then((function(_this) {
        return function() {
          _this.show();
          return typeof _this.done === "function" ? _this.done() : void 0;
        };
      })(this));
    } else {
      return typeof this.done === "function" ? this.done() : void 0;
    }
  };

  Chart.prototype.loadData = function() {
    log("Chart[" + this.data.name + "]#loadData(): query: ", this.query());
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return influxdb.query(_this.query(), function(points, err) {
          if (err != null) {
            return reject(err);
          } else {
            return resolve(points);
          }
        });
      };
    })(this));
  };

  Chart.prototype.transformData = function(response) {
    var name, nodes, points, serie, series;
    points = response[0].points;
    nodes = _.groupBy(points, function(point) {
      return point.host;
    });
    series = {};
    nodes = _.groupBy(points, function(point) {
      return point.host;
    });
    _.each(nodes, (function(_this) {
      return function(points, host) {
        return _.each(_this.fieldNames(), function(field) {
          var name;
          name = host + " - " + field;
          return series[name] || (series[name] = {
            name: name,
            data: []
          });
        });
      };
    })(this));
    _.each(nodes, (function(_this) {
      return function(points, host) {
        var data;
        return data = _.each(points, function(point) {
          return _.each(_this.fieldNames(), function(field) {
            var name;
            name = point.host + " - " + field;
            return series[name].data.push([point.time.getTime(), point[field]]);
          });
        });
      };
    })(this));
    for (name in series) {
      serie = series[name];
      if (_.find(serie.data, function(item) {
        return !!item[1];
      })) {
        serie.data = serie.data.reverse();
        this.series.push(serie);
      }
    }
    return 1;
  };

  Chart.prototype.show = function() {
    var params;
    this.div.empty();
    params = _.clone(this.data.chart);
    _.merge(params, {
      chart: {
        renderTo: this.div[0],
        height: 300
      },
      title: {
        text: this.data.chart.title
      },
      xAxis: {
        type: 'datetime'
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 1
      },
      series: this.series
    });
    if (params.series.length > 0) {
      return this.chart = new Highcharts.Chart(params);
    }
  };

  Chart.prototype.isShowChart = function() {
    var graphs;
    if (this.argv.graphs) {
      graphs = this.argv.graphs.split(",");
      return !!_.find(graphs, (function(_this) {
        return function(item) {
          return item === _this.data.name;
        };
      })(this));
    } else {
      return true;
    }
  };

  Chart.prototype.queryFields = function() {
    var fields, ref;
    fields = (ref = this.data.select) != null ? ref.fields : void 0;
    if ((fields != null ? fields.join : void 0) != null) {
      return fields;
    } else if (typeof fields === 'object') {
      return _.map(fields, function(val, key) {
        return val + " AS " + key;
      });
    } else {
      return [this.data.select.fields];
    }
  };

  Chart.prototype.fieldNames = function() {
    var fields, ref;
    fields = (ref = this.data.select) != null ? ref.fields : void 0;
    if ((fields != null ? fields.join : void 0) != null) {
      return fields;
    } else if (typeof fields === 'object') {
      return _.map(fields, function(val, key) {
        return key;
      });
    } else {
      return [this.data.select.fields];
    }
  };

  Chart.prototype.macCondition = function() {
    var macs;
    macs = function(str) {
      macs = str.split(",").map(function(s) {
        return "mac = '" + s + "'";
      });
      return "( " + (macs.join(" OR ")) + " )";
    };
    if (this.argv.macs) {
      return macs(this.argv.macs);
    } else if (this.data.select.macs != null) {
      return macs(this.data.select.macs);
    } else if (this.data.select.mac != null) {
      return "mac = '" + this.data.select.mac + "'";
    } else {
      return "mac =~ /^18FE.*/";
    }
  };

  Chart.prototype.group = function() {
    if (this.argv.group) {
      return this.argv.group;
    } else {
      return "10m";
    }
  };

  Chart.prototype.period = function() {
    var period, result, start;
    period = "15m";
    if (this.argv.period != null) {
      period = this.argv.period;
    }
    result = this.argv.start != null ? (start = this.argv.start, "time > '" + start + "' AND time < '" + start + "' + " + period) : "time > NOW() - " + period;
    return result;
  };

  Chart.prototype.query = function() {
    var fields;
    fields = this.queryFields().join(', ');
    return ("SELECT host, " + fields + " FROM srach ") + ("  GROUP BY host, time(" + (this.group()) + ") fill(0) ") + ("  WHERE " + (this.macCondition()) + " AND (" + (this.period()) + ");");
  };

  return Chart;

})();

$(document).ready(function() {
  var chain, filtered_graphs, graph_list;
  if (window.location.search.length !== 0) {
    $('#no-data').hide();
    window.charts = [];
    window.influxdb = new InfluxDB({
      host: 'builder.flymon.net',
      port: 8086,
      username: 'webface',
      password: 'webface2015',
      database: 'flymon'
    });
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    if (graph_list = parseArgs().graphs) {
      graph_list = graph_list.split(",");
      filtered_graphs = [];
      _.each(graph_list, function(graph_name) {
        var g;
        g = _.find(window.graphs, function(g) {
          return g.name === graph_name;
        });
        if (g != null) {
          return filtered_graphs.push(g);
        }
      });
      window.graphs = filtered_graphs;
    }
    chain = Promise.resolve();
    return window.graphs.forEach(function(graph_data) {
      return chain = chain.then(function() {
        var chart, data;
        data = _.cloneDeep(defaults);
        _.merge(data, graph_data);
        chart = new Chart(data);
        window.charts.push(chart);
        return chart.loadAndShow();
      });
    });
  }
});

testSeq = function() {
  var delay;
  delay = function(ms) {
    return new Promise(function(resolve, reject) {
      return setTimeout((function() {
        return resolve();
      }), ms);
    });
  };
  delay(500).then(function() {
    return log("delay  500");
  });
  delay(1000).then(function() {
    return log("delay 1000");
  });
  delay(1500).then(function() {
    return log("delay 1500");
  });
  return delay(2000).then(function() {
    return log("delay 2000");
  });
};
