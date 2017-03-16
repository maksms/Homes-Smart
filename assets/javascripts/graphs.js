
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
      name: 'up',
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
      name: 'mem',
      chart: {
        title: 'Memory',
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
        fields: ["freemem", "memory"]
      }
    },


    {
      name: 'volt',
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
      name: 'curr',
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
      name: 'temp',
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
        fields: ["amt", "lm", "bmpt", "bmet", "dhtt1", "dhtt2", "ds", "dsw1", "dsw2", "dsw3", "dsw4", "dsw5", "dsw6", "dsw7", "dsw8", "dsw9", "dsw10", "dsw11", "dsw12", "dsw13", "dsw14", "dsw15", "heat", "nrf1t1", "nrf2t1", "nrf3t1", "nrf1t2", "nrf2t2", "nrf3t2", "shtt", "sht10t", "rcs0t"]
      }
    },


    {
      name: 'hum',
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
        fields: ["amh", "dhth1", "dhth2", "bmeh", "nrf1h1", "nrf2h1", "nrf3h1", "nrf1h2", "nrf2h2", "nrf3h2", "shth", "sht10h"]
      }
    },


    {
      name: 'pres',
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
      name: 'bright',
      chart: {
        title: 'Brightness',
        yAxis: {
          title: {
             text: 'Lux'
          }
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
          }
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
        fields: ["mcpgpio0", "mcpgpio1", "mcpgpio2", "mcpgpio3", "mcpgpio4", "mcpgpio5", "mcpgpio6", "mcpgpio7", "mcpgpio8", "mcpgpio9", "mcpgpio10", "mcpgpio11", "mcpgpio12", "mcpgpio13", "mcpgpio14", "mcpgpio15", "gpioint", "gpio0", "gpio1", "gpio2", "gpio3", "gpio4", "gpio5", "gpio12", "gpio13", "gpio14", "gpio15", "gpio16", "gpiout0", "gpiout1", "gpiout2", "gpiout3", "gpiout4", "gpiout5", "gpiout12", "gpiout13", "gpiout14", "gpiout15", "gpiout16", "nrf1g1", "nrf2g1", "nrf3g1", "nrf1g2", "nrf2g2", "nrf3g2", "gpio200", "gpio201", "gpio202", "gpio203", "gpio204", "gpio205", "gpio206", "gpio207", "gpio208", "gpio209", "gpio210", "gpio211", "gpio212", "gpio213", "gpio214", "gpio215", "gpiout220", "gpiout221", "gpiout222", "gpiout223", "gpiout224", "gpiout225", "gpiout226", "gpiout227"]
      }
    },


    {
      name: 'count',
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
        fields: ["counter", "counter1", "counter2", "counter3", "counter4", "countrst", "countrst1", "countrst2", "countrst3", "countrst4", "nrf1c1", "nrf2c1", "nrf3c1", "nrf1c2", "nrf2c2", "nrf3c2", "pcfcnt1", "pcfcnt2"]
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
      name: 'scale',
      chart: {
        title: 'Scale',
        yAxis: {
          title: {
             text: 'mux'
          },
          min: 0
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' mux'
        }
      },
      select: {
        fields: ["scale"]
      }
    },


    {
      name: 'error',
      chart: {
        title: 'Link Error Counter',
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
        fields: ["errconn"]
      }
    },


    {
      name: 'acvolt',
      chart: {
        title: 'AC Voltage',
        yAxis: {
          title: {
             text: 'V'
          }
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
      name: 'acpwh',
      chart: {
        title: 'AC Power/Hours',
        yAxis: {
          title: {
             text: 'Wt/h'
          }
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


    {
      name: 'co2',
      chart: {
        title: 'CO2 control',
        yAxis: {
          title: {
             text: 'ppm'
          }
        },
        tooltip: {
          crosshairs: true,
          valueSuffix: ' ppm'
        }
      },
      select: {
        fields: ["co2"]
      }
    },




  ];

