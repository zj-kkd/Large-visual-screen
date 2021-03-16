<template>
  <div class="chart" ref="chart"></div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  padding: 20rem;
}
</style>

<script>
export default {
  created() {
    this.data = this.$store.state.infoSecurityData.unhealthy_info_industry;
  },
  mounted() {
    const chart = this.$echarts.init(this.$refs.chart);
    let color = ["#3a6554", "#4b7c83", "#52607c", "#515270"];
    let chartData = this.data;
    let arrName = [];
    let arrValue = [];
    let sum = 0;
    let pieSeries = [],
      lineYAxis = [];

    // 数据处理
    chartData.forEach(v => {
      arrName.push(v.name);
      arrValue.push(v.value);
      sum = sum + v.value;
    });

    // 图表option整理
    chartData.forEach((v, i) => {
      pieSeries.push({
         tooltip: this.$store.state.tooltip[0],
        name: "不良信息行业分布",
        type: "pie",
        clockWise: false,
        hoverAnimation: false,
        radius: [72 - i * 15 + "%", 67 - i * 15 + "%"],
        center: ["28%", "50%"],
        label: {
          show: false
        },
        data: [
          {
            value: v.value,
            name: v.name
          },
          {
            value: sum - v.value,
            name: "",
            itemStyle: {
              color: "rgba(0,0,0,0)"
            }
          }
        ]
      });
      pieSeries.push({
        name: "",
        type: "pie",
        silent: true,
        z: 1,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [72 - i * 15 + "%", 67 - i * 15 + "%"],
        center: ["28%", "50%"],
        label: {
          show: false
        },
        data: [
          {
            value: 7.5,
            itemStyle: {
              color: "rgb(39, 41, 62)"
            }
          },
          {
            value: 2.5,
            name: "",
            itemStyle: {
              color: "rgba(0,0,0,0)"
            }
          }
        ]
      });
      v.percent = ((v.value / sum) * 100).toFixed(1) + "%";
      lineYAxis.push({
        value: i,
        textStyle: {
          rich: {
            circle: {
              color: color[i],
              padding: [0, 5]
            }
          }
        }
      });
    });

    let option = {
      color: color,
      grid: {
        top: "12%",
        bottom: "59%",
        left: "30%",
        containLabel: false
      },
      legend: {
        orient: "vertical",
        icon: "circle",
        right: "10",
        top: "center",
        itemGap: 15,
        itemWidth: 8,
        data: chartData.map(item => item.name),
        formatter(name) {
          let data = chartData;
          let num = 0;
          let cur_nums = 0;
          for (let i = 0; i < data.length; i++) {
            if (name == data[i].name) {
              cur_nums = data[i].value;
            }
          }
          num = "{name|" + name + "}" + "{value|" + '[ ' + cur_nums + ' ]' + "}" + "{name2|" + '件' + "}";
          return num;
        },
        textStyle: {
            rich: {
            name: {
                width: 40
            },
            name1: {
            },
            value: {
              width: 70,
              color: '#e6d72b',
              align: 'center'
            }
          },
          color: "#B3B3B3"
        }
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function(params) {
              let item = chartData[params];
              return item.percent;
            },
            interval: 0,
            inside: true,
            textStyle: {
              color: "#B3B3B3",
              fontSize: 11,
              lineHeight: 30
            },
            show: true
          },
          data: lineYAxis
        }
      ],
      xAxis: [
        {
          show: false
        }
      ],
      series: pieSeries
    };
    chart.setOption(option);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  }
};
</script>