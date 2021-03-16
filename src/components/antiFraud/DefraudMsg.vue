<template>
  <div class="com-defraud-msg" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="fanzha-title" :style="{width: '50%'}">
      <p>诈骗短信统计</p>
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<style lang="scss" scoped>
.com-defraud-msg {
  width: 100%;
  .chart {
    width: 100%;
    height: 250rem;
  }
}
</style>

<script>
export default {
  props: ["chartData"],
  data() {
    return {
      start: 0,
      end: 30,
      timer: null
    };
  },

  methods: {
    mouseEnter() {
      clearInterval(this.timer);
      this.timer = null;
    },

    mouseLeave() {
      this.timer = setInterval(() => {
        if (this.start >= 70) {
          this.start = 0;
        }
        if (this.end >= 100) {
          this.end = 30;
        }
        this.start = this.start + 5;
        this.end = this.end + 5;
      }, 3000);
    },
    initChart() {
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine,
        nameTextStyle
      } = this.$chartConfig.lineStyle;
      let chart = this.$echarts.init(this.$refs.chart);
      let option = {
        grid: {
          top: "15%",
          left: "5%",
          right: "10%",
          bottom: "5%",
          containLabel: true
        },

        xAxis: {
          name: '日期',
          nameTextStyle,
          data: this.chartData[1].name,
          axisLabel: {
            interval: 0,
            show: true,
            textStyle: {
              rich: {
                name: {
                  width: 40,
                  height: 20,
                  fontSize: 12,
                  borderColor: "rgba(55,71,103,.7)",
                  borderWidth: "1",
                  barBorderRadius: 5,
                  color: "rgba(255,255,255,.5)",
                  backgroundColor: "rgba(28,42,70,.7)"
                }
              }
            },
            formatter(e) {
              return "{name|" + e + "}";
            }
          },
          axisLine: {
            show: false
          },
          axisTick,
          splitLine
        },
        yAxis: {
          name: "数量           ",
          nameTextStyle,
          axisLabel,
          axisLine: {
            show: false
          },
          axisTick,
          splitLine
        },
        series: [
          {
            name: "拆线",
            type: "line",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            symbolSize: 10,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}",
                color: "#fff"
              }
            },
            itemStyle: {
              color: "rgba(255,255,255,.8)",
              borderColor: "",
              borderWidth: 4
            },
            lineStyle: {
              normal: {
                color: "rgba(35, 206, 255, 1)",
                width: 1.5
              }
            },
            data: this.chartData[1].value
          },
          {
            name: "柱子",
            type: "bar",
            barGap: "100%",
            barWidth: 40,

            itemStyle: {
              normal: {
                borderColor: "rgba(55,71,103,.7)",
                borderWidth: "1",
                barBorderRadius: 5,
                color: "rgba(28,42,70,.7)"
              }
            },
            // z: -12,
            data: new Array(this.chartData[1].name.length).fill(
              this.chartData[0].value * 1.3
            )
          }
        ]
      };
      let dataZoom = [
        {
          type: "inside",
          show: true,
          xAxisIndex: [0],
          start: this.start,
          end: this.end
        }
      ];
      option.dataZoom = dataZoom;
      chart.setOption(option, true);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  },

  mounted() {
     window.addEventListener("resize", () => {
        this.initChart()
      });
    this.initChart();
    this.timer = setInterval(() => {
      if (this.start >= 70) {
        this.start = 0;
      }
      if (this.end >= 100) {
        this.end = 30;
      }
      this.start = this.start + 3.3;
      this.end = this.end + 3.3;
    }, 3000);
  },
  watch: {
    end(a, b) {
      if (a !== b) {
        this.initChart();
      }
    }
  }
};
</script> 