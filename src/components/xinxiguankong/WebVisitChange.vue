<template>
  <div class="com-wanghanhuoyue" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="box" ref="wanghanhuoyue"></div>
    <div class="tab">
      <div>
        <span :class="isCheck =='day' ? 'active tab-btn': 'tab-btn'" @click="showChart('day')">昨日</span>
        <span :class="isCheck =='week' ? 'active tab-btn': 'tab-btn'" @click="showChart('week')">周</span>
        <span :class="isCheck =='month' ? 'active tab-btn': 'tab-btn'" @click="showChart('month')">月</span>
        <span
          :class="isCheck =='quarter' ? 'active tab-btn': 'tab-btn'"
          @click="showChart('quarter')"
        >季</span>
        <span :class="isCheck =='year' ? 'active tab-btn': 'tab-btn'" @click="showChart('year')">年度</span>
      </div>
    </div>
    <p class="y">网站数</p>
    <p class="x">{{isCheck == 'day'? '小时':'日期'}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCheck: "day",
      chartData: "",
      start: 0,
      end: 30,
      timer: null
    };
  },
  methods: {
    showChart(chartType) {
      // this.isCheck != chartType && this.initChart();
      this.isCheck = chartType;
      this.initChart()
      switch (chartType) {
        case "day":
          this.end = 0;
          (this.start = 30),
            (this.chartData = this.$store.state.controlData.visit_website_last_24hours_trend);
          break;
        case "week":
          this.chartData = this.$store.state.controlData.visit_website_last_week_trend;
          break;
        case "month":
          this.end = 0;
          (this.start = 30),
            (this.chartData = this.$store.state.controlData.visit_website_last_month_trend);
          break;
        case "quarter":
          this.chartData = this.$store.state.controlData.visit_website_last_4quarter_trend;
          break;
        case "year":
          this.chartData = this.$store.state.controlData.visit_website_last_year_trend;
          break;
      }
    },

    initChart() {
      let fontColor = "#9e9fa3";
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine
      } = this.$chartConfig.lineStyle;
      let chart = this.$echarts.init(this.$refs.wanghanhuoyue);
      let data = [];
      for (let i = 0; i < this.chartData.name.length; i++) {
        data.push({
          name: this.chartData.name[i],
          value: this.chartData.value[i]
        });
      }
      let option = {
        grid: {
          left: "10",
          right: "10%",
          top: "20%",
          bottom: "0%",
          containLabel: true
        },
        tooltip: this.$store.state.tooltip[1],

        xAxis: [
          {
            type: "category",
            // boundaryGap: true,
            // boundaryGap: ['10%', '10%'],
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
            // max: 3800,
            axisLabel,
            axisLine,
            axisTick,
            splitLine
          }
        ],
        series: [
          {
            name: "访问量",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#39717e"
              }
            },
            data
          },

          {
            tooltip: {
              show: false
            },
            type: "line",
            symbolSize: 5,
            symbol: "none",
            lineStyle: {
              width: 1
            },
            itemStyle: {
              normal: {
                color: "#DE8B85",
                barBorderRadius: 0,
                label: {
                  show: false,
                  position: "top"
                }
              }
            },
            data: data
          }
        ]
      };
      if (this.isCheck == "day" || this.isCheck == "month") {
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
    },

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
    this.chartData = this.$store.state.controlData.visit_website_last_24hours_trend;
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
  // border: 1rem solid orange;
  width: 100%;
  height: calc(100% - 30rem);
  position: relative;
  overflow: hidden;
  .box {
    width: 100%;
    height: 100%;
  }
  p {
    font-size: 10rem;
    position: absolute;
    color: #9e9fa3;
    &.y {
      top: 5%;
      left: 12rem;
    }
    &.x {
      bottom: 0%;
      right: 10rem;
    }
  }
  .tab {
    position: absolute;
    top: 10rem;
    right: 10rem;
    z-index: 10;
  }
}
</style>