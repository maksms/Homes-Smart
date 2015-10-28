
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
      name: 'uptime',
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
      name: 'freemem',
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
      name: 'voltage',
      chart: {
        title: 'Voltage',
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
        fields: ["vdd", "inav", "cvv"]
      }
    },


    {
      name: 'current',
      chart: {
        title: 'Current',
        yAxis: {
          title: {
             text: 'mA'
          }
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' mA'
        }
      },
      select: {
        fields: ["inac", "cvc"]
      }
    },


    {
      name: 'rssi',
      chart: {
        title: 'RSSI level',
        yAxis: {
          title: {
             text: 'dBm'
          },
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' dBm'
        }
      },
      select: {
        fields: ["rssi"]
      }
    },


    {
      name: 'temperature',
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
        fields: ["amt", "lm", "bmpt", "bmet", "dhtt1", "dhtt2", "ds", "dsw1", "dsw2", "dsw3", "dsw4", "dsw5", "dsw6", "dsw7", "dsw8", "dsw9", "dsw10", "dsw11", "dsw12", "dsw13", "dsw14", "dsw15", "heat", "nrf1t1", "nrf2t1", "nrf3t1", "nrf1t2", "nrf2t2", "nrf3t2", "shtt"]
      }
    },


    {
      name: 'humidity',
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
        fields: ["amh", "dhth1", "dhth2", "bmeh", "nrf1h1", "nrf2h1", "nrf3h1", "nrf1h2", "nrf2h2", "nrf3h2", "shth"]
      }
    },


    {
      name: 'pressure',
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
      name: 'brightness',
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
      name: 'adc',
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
        fields: ["adc", "adc0", "adc1", "adc2", "adc3", "nrf1a1", "nrf2a1", "nrf3a1", "nrf1a2", "nrf2a2", "nrf3a2" ]
      }
    },


    {
      name: 'pwm',
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
      name: 'gpio',
      chart: {
        title: 'GPIO Monitor',
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
        fields: ["gpioint", "gpio1", "gpio2", "gpio3", "gpio4", "gpio5", "gpio13", "gpio12", "gpiout4", "gpiout5", "gpiout12", "gpiout13", "gpiout14", "nrf1g1", "nrf2g1", "nrf3g1", "nrf1g2", "nrf2g2", "nrf3g2"]
      }
    },


    {
      name: 'counter',
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
        fields: ["counter", "countrst", "nrf1c1", "nrf2c1", "nrf3c1", "nrf1c2", "nrf2c2", "nrf3c2"]
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


    {
      name: 'acvolt',
      chart: {
        title: 'AC Voltage',
        yAxis: {
          title: {
             text: 'V'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' V'
        }
      },
      select: {
        fields: ["pmv"]
      }
    },


    {
      name: 'accurr',
      chart: {
        title: 'AC Current',
        yAxis: {
          title: {
             text: 'A'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' A'
        }
      },
      select: {
        fields: ["pmc"]
      }
    },


    {
      name: 'acpwr',
      chart: {
        title: 'AC Power',
        yAxis: {
          title: {
             text: 'Wt'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' Wt'
        }
      },
      select: {
        fields: ["pmw"]
      }
    },


    {
      name: 'acpwhr',
      chart: {
        title: 'AC Power/Hours',
        yAxis: {
          title: {
             text: 'Wt/h'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' Wt/h'
        }
      },
      select: {
        fields: ["pmwh"]
      }
    },




  ];

