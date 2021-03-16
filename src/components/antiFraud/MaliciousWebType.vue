<template>
  <div class="com-Malicious-web-type">
    <div class="fanzha-title">
      <p>恶意网址类型分布</p>
    </div>
    <div class="chart" ref="chart"></div>
    <div class="title-tab-btn">
      <span :class="isCheck == 'day'? 'active': '' " @click="changeTab('day')">今日</span>
      <span :class="isCheck == 'month'? 'active': '' " @click="changeTab('month')">本月</span>
      <span :class="isCheck == 'year'? 'active': '' " @click="changeTab('year')">本年</span>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.com-Malicious-web-type {
  position: relative;
  width: 100%;
  .chart {
    width: 100%;
    height: 180rem;
  }
}
</style>

<script>
export default {
  data() {
    return {
      chartData: "",
      color: [
        ["#bc7e65", "#2f3535"],
        ["#5db6f2", "#2f3535"],
        ["#f1a541", "#2f3535"],
        ["#5ea6a0", "#2f3535"],
      ],
      isCheck: "day",
    };
  },
  methods: {
    changeTab(e) {
      this.isCheck = e;
      switch (e) {
        case "day":
          this.chartData = this.$store.state.antifraudData.malicious_url_today;
          break;
        case "month":
          this.chartData = this.$store.state.antifraudData.malicious_url_month;
          break;
        case "year":
          this.chartData = this.$store.state.antifraudData.malicious_url_year;
          break;
      }
      this.initChart();
    },
    initChart() {
      const chart = this.$echarts.init(this.$refs.chart);
      let me = this;
      let data = this.chartData;
      let titleArr = [],
        seriesArr = [];
      let colors = this.color;
      data.forEach(function (item, index) {
        titleArr.push({
          text: item.name + "\n" + item.value + "个",
          left: index * 25 + 13 + "%",
          top: "65%",
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: "12",
            color: "rgba(255, 255, 255, .8)",
            textAlign: "center",
            lineHeight: 20,
          },
        });
        seriesArr.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: ["35%", "45%"],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          center: [index * 25 + 14 + "%", "38%"],
          data: [
            {
              value: index == 0 ? me.chartData[0].value : item.value,
              label: {
                normal: {
                  padding: [5, 0, 0, 0],
                  textStyle: {
                    fontWeight: "normal",
                    color: "#fff",
                    fontSize: 15,
                    lineHeight: 20,
                    rich: {
                      title: {
                        fontSize: 15,
                        align: "center",
                        color: "#fff",
                      },
                    },
                  },
                  formatter: function (params) {
                    return index == 0 ? item.value : item.rate + "%";
                  },
                  position: "center",
                  show: true,
                },
              },
            },
            {
              value: index == 0 ? 0 : me.chartData[0].value - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: "rgba(0,0,0,0)",
                },
              },
            },
          ],
        });
        //   外环
        seriesArr.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: ["42%", "45%"],
          itemStyle: {
            normal: {
              color: "rgba(0, 0, 0, 0)",
              shadowBlur: 0,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          center: [index * 25 + 14 + "%", "38%"],
          data: [
            {
              value: item.value,
            },
            {
              value: me.chartData[0].value - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: index == 0 ? "rgba(0,0,0,0)" : "#486e85",
                },
              },
            },
          ],
        });
      });

      let option = {
        title: titleArr,
        series: seriesArr,
      };
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
  },
  created() {
    this.chartData = this.$store.state.antifraudData.malicious_url_today;
  },
  mounted() {
    this.initChart();
  },
};
</script> 