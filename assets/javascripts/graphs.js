
  defaults = {
      "chart": {
        chart: {
          type: 'spline'
        },
        "plotOptions": {
          "spline": {
            "marker": {
              "enabled": false
            }
          }
        },

        "tooltip": {
          "crosshairs": true
        }
      }
  }


  graphs = [

/*
    {
      chart: {
        chart: {
          type: 'column'
        },
        title: 'Example graph',
        yAxis: {
          title: {
            text: 'Essence'
          },
          min: -10,
          max: 50
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' EX'
        },
        plotOptions: {
          series: {
            marker: {
              symbol: 'diamond',
              enabled: 'true'
            }
          }
        }
      },
      select: {
        fields: ["field1", "field2"],
        mac: /18FE349B/
      }
    },
*/

    {
      chart: {
        chart: {
          type: 'line'
        },
        title: 'Uptime & Connections',
        yAxis: {
          title: {
            text: 'sec'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' sec'
        },
        plotOptions: {
          spline: {
            marker: {
              symbol: 'diamond',
              enabled: 'true'
            }
          }
        }
      },
      select: {
        fields: ["uptime"]
      }
    },


    {
      chart: {
        title: 'Free Memory',
        yAxis: {
          title: {
            text: 'bytes'
          }
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' bytes'
        }
      },
      select: {
        fields: ["freemem"]
      }
    },


    {
      chart: {
        title: 'Power Voltage',
        yAxis: {
          title: {
             text: 'mV'
          }
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' mV'
        }
      },
      select: {
        fields: ["vdd"]
      }
    },


    {
      chart: {
        title: 'Temperature',
        yAxis: {
          title: {
            text: '°C'
          },
          plotLines: [{
            value: 0,
            color: 'orange',
            dashStyle: 'shortdash',
            width: 1,
            label: {
              text: 'Null'
            }
          }],
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' °C'
        }
      },
      select: {
        fields: ["amt", "bmpt", "bmet", "dhtt1", "dhtt2", "ds", "dsw1", "dsw2", "dsw3", "dsw4", "dsw5", "dsw6", "dsw7", "dsw8", "dsw9", "dsw10", "dsw11", "dsw12", "dsw13", "dsw14", "dsw15", "nrf1t2", "nrf2t2"]
      }
    },


    {
      chart: {
        title: 'Humidity',
        yAxis: {
          title: {
             text: '%'
          },
          min: 0,
          plotLines: [{
            value: 20,
            color: 'green',
            dashStyle: 'shortdash',
            width: 1,
            label: {
              text: 'Critical low'
            }
          }, {
            value: 90,
            color: 'red',
            dashStyle: 'shortdash',
            width: 1,
            label: {
              text: 'Critical high'
            }
          }],
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' %'
        }
      },
      select: {
        fields: ["amh", "dhth1", "dhth2", "bmeh"]
      }
    },


    {
      chart: {
        title: 'Atmospheric pressure',
        yAxis: {
          title: {
             text: 'mmHg'
          }
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' mmHg'
        }
      },
      select: {
        fields: ["bmpp", "bmep"]
      }
    },


    {
      chart: {
        title: 'Brightness',
        yAxis: {
          title: {
             text: 'Lux'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' Lux'
        }
      },
      select: {
        fields: ["light"]
      }
    },


    {
      chart: {
        title: 'Analog-to-digital converter',
        yAxis: {
          title: {
             text: 'points'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' points'
        }
      },
      select: {
        fields: ["adc", "adc0", "adc1", "adc2", "adc3" ]
      }
    },


    {
      chart: {
        title: 'Pulse-Width Modulation status',
        yAxis: {
          title: {
             text: 'points'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' points'
        }
      },
      select: {
        fields: ["pwm", "pwm0", "pwm1", "pwm2" ]
      }
    },


    {
      chart: {
        title: 'GPIO Input Monitor',
        yAxis: {
          title: {
             text: 'status'
          },
          min: 0,
          max: 1
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' status'
        }
      },
      select: {
        fields: ["gpioint", "gpio1", "gpio2", "gpio3", "gpio4", "gpio5", "gpio13", "gpiout13"]
      }
    },


    {
      chart: {
        title: 'Counter',
        yAxis: {
          title: {
             text: 'ps'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' ps'
        }
      },
      select: {
        fields: ["counter", "countrst", "nrf1c1", "nrf2c1"]
      }
    },


    {
      chart: {
        title: 'Counter v.2 (derivative)',
        yAxis: {
          title: {
             text: 'ps'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' ps'
        }
      },
      select: {
        fields: {counter: "DERIVATIVE(counter)"}
      }
    },


  ];

