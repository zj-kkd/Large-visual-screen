<template>
  <div class="com-wanghanhuoyue" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="box" ref="wanghanhuoyue"></div>
    <div class="tab">
      <div>
        <span
          :class="isCheck =='month' ? 'active tab-btn': 'tab-btn'"
          @click="showChart('month')"
        >近30天</span>
        <span :class="isCheck =='year' ? 'active tab-btn': 'tab-btn'" @click="showChart('year')">近1年</span>
        <span
          :class="isCheck =='5year' ? 'active tab-btn': 'tab-btn'"
          @click="showChart('5year')"
        >近5年</span>
      </div>
    </div>
    <p class="y">漏洞数量</p>
    <p class="x">日期</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCheck: "month",
      chartData: "",
      end: 30,
      start: 0,
      timer: null
    };
  },
  created() {
    this.chartData = this.$store.state.webSecurityData.overall_loopholes_last_30day_trend;
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

    showChart(chartType) {
      this.isCheck = chartType;
      this.initChart();
      switch (chartType) {
        case "month":
           this.end = 0;
          this.start = 30,
          this.chartData = this.$store.state.webSecurityData.overall_loopholes_last_30day_trend;
          break;
        case "year":
          this.chartData = this.$store.state.webSecurityData.overall_loopholes_last_1year_trend;
          break;
        case "5year":
          this.chartData = this.$store.state.webSecurityData.overall_loopholes_last_5year_trend;
          break;
      }
    },

    initChart() {
      let fontColor = "rgba(255, 255, 255, .5)";
      let lineColor = "#1c2844";
      let chart = this.$echarts.init(this.$refs.wanghanhuoyue);
      let data1 = [];
      let data2 = [];
      let data3 = [];
      // let allData = [];
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine
      } = this.$chartConfig.lineStyle;

      for (let i = 0; i < this.chartData.name.length; i++) {
        data1.push({
          name: this.chartData.name[i],
          value: this.chartData.value["低危漏洞"][i]
        });
        data2.push({
          name: this.chartData.name[i],
          value: this.chartData.value["中危漏洞"][i]
        });
        data3.push({
          name: this.chartData.name[i],
          value: this.chartData.value["高危漏洞"][i]
        });
        // allData.push({
        //   value: this.chartData.value["总数"][i]
        // });
      }
      let option = {
        grid: {
          left: "10",
          right: "5%",
          top: "30%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: this.$store.state.tooltip[1],

        legend: {
          data: ["低危漏洞", "中危漏洞", "高危漏洞"],
          orient: "vertical",
          right: 0,
          top: 0,
          itemGap: 5,
          icon: "rect",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            rich: {
              name: {
                fontSize: 10,
                width: 50,
                height: 10,
                align: "left"
              },
              value: {
                width: 40,
                height: 10,
                fontSize: 10,
                align: "right"
              }
            }
          },
          formatter(name) {
            let data = option.series[0].data;
            let allData = data.reduce((prev, item) => +item.value + +prev, 0);
            let num = 0;
            num = "{name|" + name + "}" + "{value|" + allData + "}";
            return num;
          }
        },

        xAxis: [
          {
            type: "category",
            // boundaryGap: true,
            // boundaryGap: ['10%', '10%'],
            axisLabel: {
              interval: 0,
              // rotate: this.isCheck == "month" ? 0 : 35,
              rotate: 35,
              color: fontColor,
              fontSize: 10
            },
            axisLine,
            axisTick,
            splitLine,
            data: this.chartData.name
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel,
            axisLine,
            axisTick,
            splitLine
          }
        ],
        series: [
          {
            name: "低危漏洞",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#1f6563"
              }
            },
            data: data1
          },
          {
            name: "中危漏洞",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#60581e"
              }
            },
            data: data2
          },
          {
            name: "高危漏洞",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#5f3d42"
              }
            },
            data: data3
          },
          {
            tooltip: {
              show: false
            },
            name: "总数",
            stack: "总量",
            type: "line",
            symbolSize: 5,
            symbol: "circle",
            lineStyle: {
              width: 1
            },
            itemStyle: {
              normal: {
                color: "rgba(255, 255, 255, .4)",
                barBorderRadius: 0,
                label: {
                  show: false,
                  position: "top"
                }
              }
            },
            // data: JSON.parse(JSON.stringify(this.chartData.value['总数']))
            data: new Array(this.chartData.name.length).fill(0)
          }
        ]
      };
      if (this.isCheck == "month") {
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
        // option.dataZoom = this.$store.state.dataZoom;
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
  height: 200rem;
  position: relative;
  .box {
    width: 100%;
    height: 100%;
  }
  .y {
    font-size: 10rem;
    position: absolute;
    top: 25rem;
    left: 12rem;
    color: #9e9fa3;
  }
  .x {
    font-size: 10rem;
    position: absolute;
    bottom: 5%;
    right: 0rem;
    color: #9e9fa3;
  }
  .tab {
    width: 100%;
    position: absolute;
    top: 0rem;
    left: 10rem;
    z-index: 10;
  }
}
</style>