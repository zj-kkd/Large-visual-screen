<template>
  <div class="data_S">
    <div class="fanzha-title">
      <p>行业网络数据安全监测达标率</p>
    </div>
    <div class="title-tab-btn">
      <span :class="isCheck == '0'? 'active': '' " @click="changeTab('0')">月</span>
      <span :class="isCheck == '1'? 'active': '' " @click="changeTab('1')">季</span>
      <span :class="isCheck == '2'? 'active': '' " @click="changeTab('2')">年</span>
    </div>

    <div class="chart" ref="chart" @mouseenter="mouseEnter" @mouseleave="mouseLeave"></div>
  </div>
</template> 
<style lang="scss" scoped>
.data_S {
  .title-tab-btn {
    position: absolute;
    right: 15rem;
  }
  .fanzha-title {
    width: 40%;
  }
  position: relative;
  width: 100%;
  .chart {
    width: 100%;
    height: 50vh;
    // background-color: #fff;
  }
}
</style>

<script>
export default {
  data() {
    return {
      end: 30,
      start: 0,
      timer: null,
      nameList: ["基础性安全达标率", "数据生命周期安全达标率"],
      isCheck: 0,
    };
  },
  methods: {
    initChart() {
      let fontColor = "rgba(255, 255, 255, .5)";
      let lineColor = "#384861";
      let chart = this.$echarts.init(this.$refs.chart);
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine,
        nameTextStyle,
      } = this.$chartConfig.lineStyle;

      let option = {
        legend: {
          data: this.nameList,
          // orient: "vertical",
          right: "1%",
          top: "0%",
          //   itemGap: 15,
          //   icon: "diamond",
          //   itemWidth: 8,
          //   itemHeight: 8,

          textStyle: {
            color: [],
          },
        },
        grid: {
          left: "2%",
          right: "7%",
          top: "10%",
          bottom: "5%",
          containLabel: true,
        },
        // tooltip: this.$store.state.tooltip[1],
        tooltip: {
          formatter(e) {
            console.log(e)
            return e[0].seriesName + ' :   ' + e[0].value + '%' + '<br>' + e[1].seriesName + ' :   ' + e[1].value + '%'
          },
          confine: true,
          trigger: "axis",
          axisPointer: {
            label: {
              show: false,
            },
            lineStyle: {
              width: 0,
            },
          },
          backgroundColor: "rgba(0,101,153,.5)",
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
          padding: [10, 10],
        },

        xAxis: [
          {
            name: "日期",
            nameTextStyle,
            type: "category",
            boundaryGap: false,
            axisLabel,
            axisLine,
            axisTick,
            splitLine,
            data: this.chartData[0].name,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "rgba(255, 255, 255, .5)",
              formatter(e) {
                return e == 0 ? 0 : e / 2 + "%";
              },
            },
            axisLine,
            axisTick,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255,255,.1)",
                width: 1,
              },
            },
          },
        ],
        series: [
          {
            //   下
            name: this.nameList[0],
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 6,
            smooth: true,
            itemStyle: {
              normal: {
                color: "#648798",
                point: "",
                lineStyle: {
                  color: "#648798",
                  width: 1,
                },
                areaStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(100, 135, 152,0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(100, 135, 152,0.9)",
                    },
                  ]),
                },
              },
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red",
                },
              },
            },
            data: this.chartData[0].value,
          },
          {
            // 上
            name: this.nameList[1],
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 6,
            smooth: true,
            itemStyle: {
              normal: {
                color: "#b0605c",
                lineStyle: {
                  color: "#b0605c",
                  width: 1,
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(193, 105, 101,0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(193, 105, 101,0.8)",
                    },
                  ]),
                },
              },
            },
            data: this.chartData[1].value,
          },
        ],
      };

      // 开启数据缩放
      if (this.isCheck == "0") {
        let dataZoom = [
          {
            type: "inside",
            show: true,
            xAxisIndex: [0],
            start: this.start,
            end: this.end,
          },
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
    },
    changeTab(e) {
      this.isCheck = e;
      this.initChart();
      switch (e) {
        case "0":
          this.end = 0;
          this.start = 30;
          this.initChart();
          this.chartData = [
            this.$store.state.dataSecurityData.base_compliance_rate_month,
            this.$store.state.dataSecurityData.data_cycle_compliance_rate_month,
          ];
          break;
        case "1":
          this.chartData = [
            this.$store.state.dataSecurityData.base_compliance_rate_quarter,
            this.$store.state.dataSecurityData
              .data_cycle_compliance_rate_quarter,
          ];
          break;
        case "2":
          this.chartData = [
            this.$store.state.dataSecurityData.base_compliance_rate_year,
            this.$store.state.dataSecurityData.data_cycle_compliance_rate_year,
          ];
          break;
      }
      this.initChart();
    },
  },
  created() {
    this.chartData = [
      this.$store.state.dataSecurityData.base_compliance_rate_month,
      this.$store.state.dataSecurityData.data_cycle_compliance_rate_month,
    ];
  },
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
    },
  },
};
</script> 