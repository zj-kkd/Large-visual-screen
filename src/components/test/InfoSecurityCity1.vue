<template>
  <div class="com-info-security-city">
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script>
 /** export default {
  props: ["chartData"],
  methods: {
    initChart() {
      let chart = this.$echarts.init(this.$refs.chart);
      let option = {
        grid: {
          left: "5%",
          right: "5%",
          top: "15%",
          bottom: "20%"
          // containLabel: true
        },
        tooltip: this.$store.state.tooltip[1],
        legend: {
          show: false
        },
        xAxis: [
          {
            type: "category",
            // boundaryGap: true,
            // boundaryGap: ["10%", "10%"],
            axisLabel: {
              interval: 0,
              rotate: 38,
              color: '#4C8587',
              fontSize: 10
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#3a414b"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "red"
              }
            },
            data: this.chartData.map(item => item.name)
          }
        ],
        yAxis: {
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#3a414b"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(45, 54, 64, .5)"
            }
          }
        },
        series: [
          {
            name: "信安事件数",
            type: "bar",
            barWidth: 8,
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 10,
                color: "#9A9A9A"
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(62, 126, 120,1)' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: 'rgba(62, 126, 120,.1)' // 100% 处的颜色
                }], false)
            }
            },
            data: this.chartData
          }
        ]
      };
      chart.setOption(option, true);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  },
  mounted() {
    this.initChart();
  }
}; **/

</script>

<style lang="scss" scoped>
.com-info-security-city {
  background-color: red;
  width: 100%;
  height: 250rem;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>