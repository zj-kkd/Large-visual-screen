<template>
  <div class="com-OneMonthInfoSecurity" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="box" ref="OneMonthInfoSecurity"></div>
    <span class="y">事件数</span>
    <span class="x">日期</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      start: 0,
      end: 30,
      timer: null
    };
  },
  props: ["chartData"],
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
      let fontColor = "rgba(255, 255, 255, .5)";
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine
      } = this.$chartConfig.lineStyle;
      let chart = this.$echarts.init(this.$refs.OneMonthInfoSecurity);
      let data = [];
      for (let i = 0; i < this.chartData.name.length; i++) {
        data.push({
          name: this.chartData.name[i],
          value: this.chartData.value[i]
        });
      }
      let option = {
        tooltip: this.$store.state.tooltip[1],

        grid: {
          left: "0",
          right: "12%",
          top: "15%",
          bottom: "5%",
          containLabel: true
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel,
            axisLine,
            axisTick,
            splitLine,
            data: this.chartData.name
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 4000,
            axisLabel,
            axisLine,
            axisTick,
            splitLine
          }
        ],
        series: [
          {
            name: "事件数",
            type: "line",
            symbol: "circle",
            symbolSize: 3,
            smooth: true,
            itemStyle: {
              normal: {
                color: "#6abcc7",
                lineStyle: {
                  color: "#33526e",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(57, 102, 127,.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(57, 102, 127,1)"
                    }
                  ])
                }
              }
            },
            data
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
  watch: {
    chartData(a, b) {
      if (a !== b) {
        this.initChart();
      }
    },
    end(a, b) {
      if (a !== b) {
        this.initChart();
      }
    }
  },
  created() {},
  mounted() {
    this.initChart();
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
  }
};
</script>

<style lang="scss" scoped>
.com-OneMonthInfoSecurity {
  padding-top: 20rem;
  width: 100%;
  height: 250rem;
  position: relative;
  padding-left: 10rem;
  margin-bottom: 20rem;
  .box {
    width: 100%;
    height: 100%;
  }
  .y {
    position: absolute;
    left: 10rem;
    top: 20rem;
    color: #9e9fa3;
    font-size: 11rem;
  }
  .x {
    position: absolute;
    right: 0rem;
    bottom: 5%;
    color: #9e9fa3;
    font-size: 11rem;
  }
}
</style>