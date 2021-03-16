<template>
  <div class="com-security-event-top" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="fanzha-title">
      <p>{{title}}</p>
    </div>
    <div class="tab">
      <span :class="isCheck == 'left' ? 'active' :''" @click="changeTab('left')">企业</span>
      <span class="line">|</span>
      <span :class="isCheck == 'right' ? 'active' :''" @click="changeTab('right')">行业</span>
    </div>
    <div class="title-tab-btn">
      <span :class="tabBarCheck == 'day'? 'active': '' " @click="changeTabBar('day')">今日</span>
      <span :class="tabBarCheck == 'month'? 'active': '' " @click="changeTabBar('month')">本月</span>
      <span :class="tabBarCheck == 'year'? 'active': '' " @click="changeTabBar('year')">本年</span>
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template> 
<style lang="scss" scoped>
.com-security-event-top {
  width: 50%;
  height: 303rem;
  position: relative;
  .tab {
    color: rgba(179, 179, 179, 1);
    font-size: 14rem;
    position: absolute;
    right: 15rem;
    top: 0;
    line-height: 36rem;
    .line {
      margin: 0 10rem;
    }
    span {
      &.active {
        color: $blue3;
      }
    }
  }
  .title-tab-btn {
    z-index: 20;
    position: absolute;
    left: 0;
    top: 25%;
    padding: 0;
    width: 60rem;
    span {
      text-align: center;
      height: 20rem;
      width: 60rem;
      line-height: 20rem;
      display: block;
      margin-bottom: 15rem;
    }
  }
  .chart {
    width: 100%;
    height: 270rem;
  }
}
</style>

<script>
export default {
  props: ["title", "colorList", "chartData"],
  data() {
    return {
      mySwiper: "",
      isCheck: "left",
      tabBarCheck: "day",
      timer: null,
      //  123 年月日
      chartIndex: 0,
      showIndex: 0,
      showChartData: "",
      // chartData: [
      //   { name: "杭州电力", value: 1000 },
      //   { name: "杭州电力", value: 900 },
      //   { name: "杭州电力", value: 800 },
      //   { name: "杭州电力", value: 700 },
      //   { name: "杭州电力", value: 600 },
      //   { name: "杭州电力", value: 500 },
      //   { name: "杭州电力", value: 400 },
      //   { name: "杭州电力", value: 300 },
      //   { name: "杭州电力", value: 200 },
      //   { name: "杭州电力", value: 100 },
      // ],
    };
  },
  methods: {
    initChart() {
      let chart = this.$echarts.init(this.$refs.chart);
      let lineColor = "#1c2844";
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine,
      } = this.$chartConfig.lineStyle;
      let option = {
        grid: {
          top: "5%",
          left: "18%",
          right: "10%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          interval: 0,
          type: "value",
          axisLabel,
          axisLine,
          axisTick,
          splitLine,
        },
        yAxis: {
          interval: 0,
          data: this.showChartData.map((item) => item.name),
          axisLabel: {
            formatter(e) {
              if (e.length > 8) {
                return e.slice(0, 8) + "...";
              } else {
                return e;
              }
            },
            textStyle: {
              color: "#a7a7a9",
              fontSize: 12,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick,
          splitLine,
          type: "category",
        },
        series: [
          {
            barWidth: 8,
            itemGap: 0,
            showBackground: true,
            backgroundStyle: {
              barBorderRadius: 3,
              color: "rgba(255, 255, 255,.05)",
            },
            name: "篡改数量",
            type: "bar",
            itemStyle: {
              normal: {
                borderColor: this.colorList[0],
                borderWidth: "1",
                barBorderRadius: 3,
                color: this.colorList[1],
              },
            },
            data: this.showChartData,
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#a7a7a9",
                fontSize: 10,
              },
            },
          },
        ],
      };

      chart.setOption(option, true);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
    changeTab(e) {
      this.isCheck = e;
      this.showChartData = this.chartData[this.isCheck][this.showIndex];
    },

    mouseLeave() {
      this.timer = setInterval(() => {
        if (this.isCheck == "left") {
          this.isCheck = "right";
        } else {
          this.isCheck = "left";
        }
        this.showChartData = this.chartData[this.isCheck][this.showIndex];
      }, 4000);
    },

    mouseEnter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 时间周期
    changeTabBar(e) {
      this.tabBarCheck = e;
      if (e == "day") {
        this.showIndex = 0;
      } else if (e == "month") {
        this.showIndex = 1;
      } else {
        this.showIndex = 2;
      }
      this.showChartData = this.chartData[this.isCheck][this.showIndex];
    },
  },
  created() {
    this.showChartData = this.chartData.left[0];
    this.timer = setInterval(() => {
      if (this.isCheck == "left") {
        this.isCheck = "right";
      } else {
        this.isCheck = "left";
      }
      this.showChartData = this.chartData[this.isCheck][this.showIndex];
    }, 4000);
  },
  watch: {
    showChartData(a, b) {
      if (a !== b) {
        this.initChart();
      }
    },
  },
  mounted() {
    this.initChart();
  },
};
</script> 