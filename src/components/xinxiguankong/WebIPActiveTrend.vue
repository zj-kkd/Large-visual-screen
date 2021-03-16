<template>
  <div class="com-wanghanhuoyue" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="box" ref="wanghanhuoyue"></div>
    <div class="y">日期</div>
    <div class="tab">
      <div class="left-text">
        <span class="left"></span>
        <p>
          网站访问量
          <br />单位：万
        </p>
      </div>
      <div class="tabs">
        <span
          :class="isCheck =='30day' ? 'active tab-btn': 'tab-btn'"
          @click="showChart('30day')"
        >近30天</span>
        <span
          :class="isCheck =='month' ? 'active tab-btn': 'tab-btn'"
          @click="showChart('month')"
        >月度</span>
        <span
          :class="isCheck =='quarter' ? 'active tab-btn': 'tab-btn'"
          @click="showChart('quarter')"
        >季度</span>
        <span :class="isCheck =='year' ? 'active tab-btn': 'tab-btn'" @click="showChart('year')">年度</span>
      </div>
      <div class="left-text right">
        <span class="left"></span>
        <p>
          活跃IP数
          <br />单位：万
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCheck: "30day",
      chartData: "",
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
    // 改变图表
    showChart(chartType) {
      this.isCheck = chartType;
      switch (chartType) {
        case "month":
          this.chartData = this.$store.state.controlData.active_website_last_12month_trend;
          break;
        case "30day":
          this.chartData = this.$store.state.controlData.active_website_last_30day_trend;
          break;
        case "quarter":
          this.chartData = this.$store.state.controlData.active_website_last_4quarter_trend;
          break;
        case "year":
          this.chartData = this.$store.state.controlData.active_website_last_5year_trend;
          break;
      }
    },

    initChart() {
      let data1 = [];
      let data2 = [];
      for (let i = 0; i < this.chartData.name.length; i++) {
        data1.push({
          name: this.chartData.name[i],
          value: this.chartData.value["网站访问量"][i]
        });
        data2.push({
          name: this.chartData.name[i],
          value: this.chartData.value["活跃IP数"][i]
        });
      }
      let max = (
        (Math.max(...data1.map(item => item.value)) +
          Math.max(...data2.map(item => item.value))) *
        1.4
      ).toFixed(0);
      let fontColor = "rgba(255, 255, 255, .5)";
      let lineColor = "#384861";
      let chart = this.$echarts.init(this.$refs.wanghanhuoyue);
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine
      } = this.$chartConfig.lineStyle;
      let option = {
        grid: {
          left: "0",
          right: "0%",
          top: "27%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: this.$store.state.tooltip[1],

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
            max,
            axisLabel,
            axisLine,
            axisTick,
            splitLine
          },
          {
            type: "value",
            min: 0,
            max,
            axisLabel,
            axisLine,
            axisTick,
            splitLine
          }
        ],
        series: [
          {
            name: "网站访问量",
            type: "line",
            stack: "总量",
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#0092f6",
                point: "",
                lineStyle: {
                  color: "#4c7652",
                  width: 1
                },
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(36, 68, 55,0.1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(36, 68, 55,0.9)"
                    }
                  ])
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red"
                }
              }
            },
            data: data1
          },
          {
            name: "活跃ip数",
            type: "line",
            stack: "总量",
            symbol: "none",
            // symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#aecb56",
                lineStyle: {
                  color: "#226667",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(12, 39, 48,0.5)"
                    },
                    {
                      offset: 1,
                      color: "rgba(12, 39, 48,0.8)"
                    }
                  ])
                }
              }
            },
            data: data2
          }
        ]
      };

      // 开启数据缩放
      if (this.isCheck == "30day") {
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
      }

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
  mounted() {
    this.chartData = this.$store.state.controlData.active_website_last_30day_trend;
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
.com-wanghanhuoyue {
  width: 100%;
  height: 280rem;
  position: relative;
  .box {
    width: 100%;
    height: 100%;
  }
  .y {
    font-size: 10rem;
    position: absolute;
    bottom: 10%;
    right: 0;
    color: $fff05;
  }
  .tab {
    font-size: 9rem;
    width: 100%;
    position: absolute;
    top: 15rem;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    .tabs {
      span {
        margin-bottom: 5rem;
      }
    }
    .left-text {
      // background-color: #fff;
      position: relative;
      width: 26%;
      span {
        position: absolute;
        left: 0;
        top: 0;
        width: 10rem;
        height: 10rem;
        background-color: #226667;
        border: none;
      }
      p {
        position: absolute;
        font-size: 9rem;
        // background-color: #fff;
        color: $fff05;
        left: 16rem;
        top: -2rem;
      }
    }
    .right {
      width: 23%;
      // background-color: #fff;
      & > span {
        background-color: #4c7652;
      }
      & > p {
        text-align: right;
      }
    }
  }
}
</style>