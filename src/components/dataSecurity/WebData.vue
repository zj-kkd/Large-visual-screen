<template>
  <div class="data_S">
    <div class="fanzha-title">
      <p>网络数据生命周期违规事件监测</p>
    </div>
    <div class="title-tab-btn">
      <span :class="isCheck == 'month'? 'active': '' " @click="changeTab('month')">月</span>
      <span :class="isCheck == 'quarter'? 'active': '' " @click="changeTab('quarter')">季</span>
      <span :class="isCheck == 'year'? 'active': '' " @click="changeTab('year')">年</span>
    </div>

    <div class="chart" ref="chart" @mouseenter="mouseEnter" @mouseleave="mouseLeave"></div>
  </div>
</template> 
<style lang="scss" scoped>
.data_S {
  .fanzha-title {
    width: 40%;
  }
  position: relative;
  width: 100%;
  .chart {
    width: 100%;
    height: 250rem;
  }
}
</style>

<script>
export default {
  data() {
    return {
      chartData: {},
      end: 30,
      start: 0,
      timer: null,
      nameList: [],
      isCheck: 'month',
      colorList: [
        "#206481",
        "#3e7b7b",
        "#6f7b54",
        "#7f654c",
        "#794c51",
        "#776164",
      ],
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
    changeTab(e) {
      this.isCheck = e;
      if (e == 0) {
          this.end = 0;
          this.start = 30;
      }
      this.chartData = {
        type1: this.$store.state.dataSecurityData['data_collect_' + e],
        type2: this.$store.state.dataSecurityData['data_transport_' + e],
        type3: this.$store.state.dataSecurityData['data_save_' + e],

        type4: this.$store.state.dataSecurityData['data_collect_' + e + 1],
        type5: this.$store.state.dataSecurityData['data_transport_' + e + 1],
        type6: this.$store.state.dataSecurityData['data_save_' + e + 1],
      };
      this.initChart()
    },
    initChart() {
      let { getRem } = this.$chartConfig;
      let fontColor = "rgba(255, 255, 255, .5)";
      let lineColor = "#1c2844";
      let seriesArr = [];
      let chart = this.$echarts.init(this.$refs.chart);
      this.nameList.forEach((item, index) => {
        seriesArr.push({
          name: item,
          type: "bar",
          stack: "总量",
          barWidth: "20%",
          itemStyle: {
            normal: {
              color: this.colorList[index],
            },
          },
          data: this.chartData["type" + (index + 1)].value,
        });
      });

      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine,
        nameTextStyle,
      } = this.$chartConfig.lineStyle;
      let tooltip = this.$chartConfig.tooltip[0];

      let option = {
        grid: {
          left: "2%",
          right: "5%",
          top: "25%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip,

        legend: {
          data: this.nameList,
          // orient: "vertical",
          right: 0,
          top: "11%",
          itemGap: 15,
          icon: "rect",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: getRem(12),
            color: "rgba(255, 255, 255, .5)",
          },
        },

        xAxis: [
          {
            name: "日期",
            nameTextStyle,

            type: "category",
            // boundaryGap: true,
            // boundaryGap: ['10%', '10%'],
            axisLabel: {
              interval: 0,
              color: fontColor,
               fontSize: getRem(12)
            },
            axisLine,
            axisTick,
            splitLine,
            data: this.chartData.type1.name,
          },
        ],
        yAxis: [
          {
            name: "数量",
            nameTextStyle,
            type: "value",
            axisLabel,
            axisLine,
            axisTick,
            splitLine,
          },
        ],
        series: seriesArr,
      };
      if (this.isCheck == "month") {
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
  },
  created() {
    this.nameList = this.$store.state.dataSecurityData.data_cycle_monitor;
    this.chartData = {
      type1: this.$store.state.dataSecurityData.data_collect_month,
      type2: this.$store.state.dataSecurityData.data_transport_month,
      type3: this.$store.state.dataSecurityData.data_save_month,

      type4: this.$store.state.dataSecurityData.data_collect_month1,
      type5: this.$store.state.dataSecurityData.data_transport_month1,
      type6: this.$store.state.dataSecurityData.data_save_month1,
    };
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
    end(a, b) {
      if (a != b) {
        this.initChart();
      }
    },
    chartData(a, b) {
      if (a != b) {
        this.initChart();
      }
    },
  },
};
</script> 