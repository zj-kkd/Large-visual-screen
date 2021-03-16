<template>
  <div class="com-jiangMuRu">
    <div class="box" ref="jiangMuRu"></div>
    <!-- <div class="label">被下载次数（单位: 万）</div> -->
  </div>
</template>
<script>
export default {
  props: ["chartData"],
  methods: {
    initChart() {
      let fontColor = "rgba(255, 255, 255, .5)";
      let lineColor = "#1c2844";
      let chart = this.$echarts.init(this.$refs.jiangMuRu);
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine,
        nameTextStyle
        
      } = this.$chartConfig.lineStyle;
      let { getRem } = this.$chartConfig;
      let option = {
        tooltip: this.$store.state.tooltip[1],
        grid: {
          left: "10",
          right: "18%",
          top: "20%",
          bottom: "5%",
          containLabel: true
        },

        legend: {
          show: false
        },
        xAxis: [
          {
            name: "     恶意程序名",
            nameLocation: "end",
            nameTextStyle: {
              color: "rgba(255,255,255,.5)",
              fontSize: getRem(12),
              align: "center"
            },
            type: "category",
            // boundaryGap: true,
            boundaryGap: ["10%", "10%"],
            axisLabel: {
              interval: 0,
              rotate: 38,
              color: fontColor,
              fontSize: getRem(12)
            },
            axisLine,
            axisTick,
            splitLine,
            data: this.chartData.map(item => item.name)
          }
        ],
        yAxis: [
          {
            name: "         被下载次数（单位：万）",
            nameTextStyle,
            type: "value",
            axisLabel,
            axisLine,
            axisTick,
            splitLine
          }
        ],
        series: [
          {
            name: "被下载次数",
            type: "bar",
            barWidth: 5,
            itemStyle: {
              normal: {
                color: "#3e7b94"
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
};
</script>

<style lang="scss" scoped>
.com-jiangMuRu {
  width: 100%;
  height: 200rem;
  position: relative;
  // border: 1rem solid red;
  .box {
    width: 100%;
    height: 100%;
  }
  .label {
    width: 100%;
    font-size: 10rem;
    color: #9e9fa3;
    position: absolute;
    top: 0;
    margin-left: 10rem;
  }
}
</style>