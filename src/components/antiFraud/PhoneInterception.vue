<template>
  <div class="com-Malicious-web-type" v-if="chartData">
    <div class="fanzha-title">
      <p>有害电话拦截统计</p>
    </div>
    <div class="title-tab-btn">
      <span :class="isCheck == 'today'? 'active': '' " @click="changeTab('today')">今日</span>
      <span :class="isCheck == 'month'? 'active': '' " @click="changeTab('month')">本月</span>
      <span :class="isCheck == 'year'? 'active': '' " @click="changeTab('year')">本年</span>
    </div>
    <div class="chart1">
      <li v-for="(item, index) in dayData.data1" :key="index">
        <p class="top">
          <img
            :src="require(`../../../public/static/img/imgs/fanzha/${index == 0 ? 'icon_yys': 'icon_huati'}.png`)"
            alt
          />
          <span>{{item.name}}</span>
        </p>
        <p class="center">
          <span>{{chartData[index][0].value}}</span>
          <span class="unit">件</span>
        </p>
        <p class="bottom">
          <span>环比</span>
          <span class="rate">
            <span
              :style="{color: chartData[index][0].add ? 'rgba(238, 226, 38, 1)': 'green'}"
            >{{chartData[index][0].reduce || chartData[index][0].add}}</span>
            <img
              class="icon-add"
              :src="require(`../../../public/static/img/icons/icon_${chartData[index][0].add ? 'add': 'reduce'}.png`)"
              alt
            />
          </span>
        </p>
      </li>
    </div>
    <div class="chart2">
      <li ref="chartPei1"></li>
      <li ref="chartPei2"></li>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.com-Malicious-web-type {
  position: relative;
  width: 100%;
  .chart1 {
    margin-top: 30rem;
    height: 100rem;
    display: flex;
    justify-content: space-around;
    li {
      width: 35%;
      height: 100%;
      display: flex;
      align-content: space-around;
      flex-wrap: wrap;
      p {
        width: 100%;
      }
      .top {
        height: 26rem;
        width: 100%;
        font-size: 20rem;
        line-height: 25rem;
        color: rgba(255, 255, 255, 1);
        position: relative;
        span {
          position: absolute;
          top: 0;
          display: inline-block;
          margin-left: 10rem;
        }
        img {
          width: 26rem;
          height: 26rem;
        }
      }
      .center {
        padding: 3rem 0;
        font-size: 24rem;
        border-bottom: dashed 1rem rgba(69, 82, 106, 1);
        color: $blue3;
        .unit {
          font-size: 12rem;
          color: rgba(204, 204, 204, 1);
          margin-left: 4rem;
        }
      }
      .bottom {
        position: relative;
        font-size: 12rem;
        color: rgba(179, 179, 179, 1);
        .rate {
          position: absolute;
          right: 0;
        }
        .icon-add {
          display: inline-block;
          width: 10rem;
          height: 10rem;
          margin-left: 3rem;
        }
      }
    }
  }
  .chart2 {
    display: flex;
    height: 300rem;
    margin-top: 20rem;
    li {
      width: 50%;
      height: 100%;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      color: ["#5c4f83", "#476999", "#3e918e", "#8c6b2d"],
      chartData: [],
      isCheck: "today",
      dayData: {
        data1: [{ name: "运营商" }, { name: "话题类" }]
      }
    };
  },
  watch: {
    chartData(a, b) {
      if (a != b) {
        this.initChart();
        this.initChart2();
      }
    }
  },
  methods: {
    changeTab(e) {
      this.isCheck = e;
      this.chartData = [
        this.$store.state.antifraudData["operator_" + e],
        this.$store.state.antifraudData["topic_" + e]
      ];
      // switch (e) {
      //   case "day":
      //     this.chartData = [
      //       this.$store.state.antifraudData.operator_today,
      //       this.$store.state.antifraudData.topic_today
      //     ];
      //     break;
      //   case "month":
      //     this.chartData = [
      //       this.$store.state.antifraudData['operator_' + e],
      //       this.$store.state.antifraudData['topic_' + e]
      //     ];
      //   break;
      //   case "year":
      //     this.chartData = [
      //       this.$store.state.antifraudData.operator_year,
      //       this.$store.state.antifraudData.topic_year
      //     ];
      //     break;
      // }
      this.initChart();
      this.initChart2();
    },
    fontSize(res) {
      let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = clientWidth / 1920;
      return res * fontSize;
    },
    initChart() {
      let tooltip = this.$chartConfig.tooltip;
      let chartPei1 = this.$echarts.init(this.$refs.chartPei1);
      let option = {
        tooltip: tooltip[0],
        legend: {
          orient: "vertical",
          icon: "pin",
          top: "60%",
          left: 'center',
          height: "100%",
          itemWidth: 10,
          itemHeight: 5,
          itemGap: 8,
          textStyle: {
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: this.fontSize(12),
            rich: {
              name: {
                padding: [0, this.fontSize(5), 0, this.fontSize(5)],
                align: "left"
              },
              value: {
                padding: [0, this.fontSize(5), 0, this.fontSize(5)],
                align: "right"
              }
            }
          },
          formatter(name) {
            let data = option.series[0].data;
            let num = 0;
            let cur_nums = 0;
            let rate = 0;
            for (let i = 0; i < data.length; i++) {
              if (name == data[i].name) {
                cur_nums = data[i].value;
                rate = data[i].rate;
              }
            }
            num =
              "{name|" +
              name +
              "}" +
              "{value|" +
              cur_nums +
              "}" +
              "{value|" +
              rate + '%' +
              "}";
            return num;
          }
        },
        series: [
          {
            label: {
              show: false,
              position: "inner",
              color: "rgba(255, 255, 255, 0.6)",
              formatter({ data }) {
                return data.value + "\n" + data.rate + "%";
              }
            },
            color: this.color,
            name: "电话来源",
            type: "pie",
            radius: "60%",
            center: ["50%", "30%"],
            data: this.chartData[0].slice(1)
          }
        ]
      };
      chartPei1.setOption(option);
      window.addEventListener("resize", () => {
        chartPei1.resize();
      });
    },
    initChart2() {
      let tooltip = this.$chartConfig.tooltip;
      let chartPei2 = this.$echarts.init(this.$refs.chartPei2);
      var data = [];
      for (var i = 0; i < this.chartData[0].slice(1).length; i++) {
        data.push(
          {
            value: this.chartData[1].slice(1)[i].value,
            name: this.chartData[1].slice(1)[i].name,
            rate: this.chartData[1].slice(1)[i].rate,
            itemStyle: {
              normal: {
                borderWidth: 3,
                shadowBlur: 0,
                borderColor: this.color[i],
                shadowColor: this.color[i]
              }
            }
          },
          {
            value:
              (this.chartData[1]
                .slice(1)
                .map(item => item.value)
                .reduce((prev, item) => prev + item, 0) /
                100) *
              4,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0
              }
            }
          }
        );
      }
      var seriesOption = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: ["59%", "60%"],
          center: ["50%", "30%"],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false
              }
            }
          },
          data: data
        }
      ];
      let option = {
        color: this.color,

        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: require("../../../public/static/img/imgs/fanzha/img_tjtcircle.png"),
                width: this.fontSize(100),
                height: this.fontSize(100)
              },
              left: "center",
              top: "13.4%"
            }
          ]
        },
        legend: {
          show: true,
          top: "60%",
          icon: "pin",
          itemWidth: 10,
          itemHeight: 5,
          itemGap: 8,
          textStyle: {
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: this.fontSize(12),
            rich: {
              name: {
                padding: [0, this.fontSize(5), 0, this.fontSize(5)],
                align: "left"
              },
              value: {
                padding: [0, this.fontSize(5), 0, this.fontSize(5)],
                align: "right"
              }
            }
          },
          formatter(name) {
            let data = option.series[0].data;
            let num = 0;
            let cur_nums = 0;
            let rate = 0;
            for (let i = 0; i < data.length; i++) {
              if (name == data[i].name) {
                cur_nums = data[i].value;
                rate = data[i].rate;
              }
            }
            num =
              "{name|" +
              name +
              "}" +
              "{value|" +
              cur_nums +
              "}" +
              "{value|" +
              rate +
              "%" +
              "}";
            return num;
          }
        },
        series: seriesOption
      };
      chartPei2.setOption(option);
      window.addEventListener("resize", () => {
        chartPei2.resize();
      });
    }
  },
  mounted() {
    this.initChart();
    this.initChart2();
  },
  created() {
    this.chartData = [
      this.$store.state.antifraudData.operator_today,
      this.$store.state.antifraudData.topic_today
    ];
    console.log(9999, this.chartData);
  }
};
</script> 