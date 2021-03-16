<template>
  <div class="com-jiangMuRu">
    <div class="box" ref="jiangMuRu"></div>
    <div class="label">
      <span>IP数</span>
      <span>
        <span class="one"></span>控制服务器
        <br />IP在本省
      </span>
      <span>
        <span class="tow"></span>被控服务器
        <br />IP在本省
      </span>
      <span>
        <span class="three"></span>感染飞客蠕虫
        <br />主机IP数
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["chartData"],
  data() {
    return {
      data1: [],
      data2: [],
      data3: []
    };
  },
  created() {
    for (let i = 0; i < this.chartData.name.length; i++) {
      this.data1.push({
        name: this.chartData.name[i],
        value: this.chartData.value["控制服务器IP在本省数"][i]
      });
      this.data2.push({
        name: this.chartData.name[i],
        value: this.chartData.value["被控服务器IP在本省数"][i]
      });
      this.data3.push({
        name: this.chartData.name[i],
        value: this.chartData.value["感染飞客蠕虫主机IP数"][i]
      });
    }
  },
  methods: {
    initChart() {
      let fontColor = "rgba(255, 255, 255, .5)";
      let lineColor = "#1c2844";
      let chart = this.$echarts.init(this.$refs.jiangMuRu);
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine
      } = this.$chartConfig.lineStyle;
      let option = {
        grid: {
          left: "0",
          right: "5%",
          top: "20%",
          bottom: "5%",
          containLabel: true
        },

        legend: {
          show: false
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: 38,
              color: fontColor,
              fontSize: 10
            },
            axisLine,
            axisTick,
            splitLine,
            data: this.data1.map(item => item.name)
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 10000,
            axisLabel,
            axisLine,
            axisTick,
            splitLine
          }
        ],
        series: [
          {
            name: "控制服务器IP在本省数",
            type: "line",
            stack: "总量",
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#0092f6",
                point: "",
                lineStyle: {
                  color: "#e8e579",
                  width: 1
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
            data: this.data1
          },
          {
            name: "被控服务器IP在本省数",
            type: "line",
            stack: "总量",
            symbol: "none",
            // symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#aecb56",
                lineStyle: {
                  color: "#e58079",
                  width: 1
                }
              }
            },
            data: this.data2
          },
          {
            name: "感染飞客蠕虫主机IP数",
            type: "line",
            stack: "总量",
            symbol: "none",
            // symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#aecb56",
                lineStyle: {
                  color: "#70e4ba",
                  width: 1
                }
              }
            },
            data: this.data3
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
  height: 250rem;
  margin-top: 10rem;
  position: relative;
  .box {
    width: 100%;
    height: 100%;
  }
  .label {
    width: 100%;
    padding-right: 10rem;
    font-size: 11rem;
    color: #9e9fa3;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    span {
      .one {
        background-color: #e8e579;
      }
      .tow {
        background-color: #fc8a81;
      }
      .three {
        background-color: #79f7c8;
      }
      position: relative;
      span {
        display: block;
        width: 3rem;
        height: 10rem;
        position: absolute;
        top: 2rem;
        left: -5rem;
      }
    }
  }
}
</style>