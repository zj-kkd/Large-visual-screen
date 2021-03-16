<template>
  <div class="com-website-defacement">
    <div class="chart" ref="chart"></div>
    <div class="x">被篡改次数</div>
    <div class="ctrl">
      <span :class="check == 'web' ? 'active': ''" @click="showChart('web')">被篡改网站</span>
      <span :class="check == 'room' ? 'active': ''" @click="showChart('room')">被篡改机房</span>
      <span :class="check == 'address' ? 'active': ''" @click="showChart('address')">被篡改地域</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-website-defacement {
  height: calc(100% - 30rem);
  width: 100%;
  position: relative;
  overflow: hidden;
  .chart {
    width: 100%;
    height: 100%;
  }
  .x {
    position: absolute;
    bottom: 3%;
    right: 10rem;
    color: #909196;
    font-size: 10rem;
  }
  .ctrl {
    font-size: 12rem;
    position: absolute;
    top: 20rem;
    left: 10rem;
    width: 20%;
    height: 80%;
    span {
      display: block;
      height: 25rem;
      line-height: 22rem;
      width: 100%;
      color: rgba(255, 255, 255, 0.5);
      border: 1rem solid rgba(255, 255, 255, 0.3);
      font-size: 11rem;
      text-align: center;
      margin-bottom: 10rem;
      &.active {
        border: 1rem solid $blue3;
        color: $blue3;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      chartData: "",
      check: "web"
    };
  },
  created() {
    this.chartData = this.$store.state.webSecurityData.falsify_website;
  },
  mounted() {
    this.initChart();
  },
  methods: {
    showChart(chartType) {
      this.check = chartType;
      switch (chartType) {
        case "web":
          this.chartData = this.$store.state.webSecurityData.falsify_website;
          break;
        case "room":
          this.chartData = this.$store.state.webSecurityData.falsify_engine_room;
          break;
        case "address":
          this.chartData = this.$store.state.webSecurityData.falsify_area;
          break;
      }
    },
    initChart() {
      let chart = this.$echarts.init(this.$refs.chart);
      let lineColor = "#1c2844";
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine
      } = this.$chartConfig.lineStyle;
      let option = {
        grid: {
          top: 20,
          left: "25%",
          right: "10%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: false
          },
          axisLine,
          axisTick,
          splitLine
        },
        yAxis: {
          data: this.chartData.map(item => item.name),
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
              fontSize: 11
            }
          },
          axisLine,
          axisTick,
          splitLine,
          type: "category"
        },
        series: [
          {
            barWidth: 6,
            itemGap: 0,
            name: "篡改数量",
            type: "bar",
            itemStyle: {
              color: "rgba(103, 134, 166, .3)"
            },
            data: this.chartData,
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#a7a7a9",
                fontSize: 10
              }
            }
          }
        ]
      };

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
    }
  },
  getData() {
    return this.data;
  }
};
</script>