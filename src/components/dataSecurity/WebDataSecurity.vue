<template>
  <div class="data_S">
    <div class="fanzha-title">
      <p>App违法违规专项监测</p>
    </div>
    <div class="chart_top" ref="chart_top"></div>
    <div class="fanzha-title t-bottom">
      <p>通报、监督、举报、第三方监测数安事件</p>
    </div>
    <div class="chart_bottom">
      <ul>
        <div class="all">
          <img
            class="out"
            src="../../../public/static/img/imgs/shujuanquan/img_outsiderotate.png"
            alt
          />
          <img
            class="in"
            src="../../../public/static/img/imgs/shujuanquan/img_insiderotate.png"
            alt
          />
          <p class="all-name">{{chartData.data2[0].name}}</p>
          <p class="all-num">{{chartData.data2[0].value}}</p>
        </div>
        <li v-for="(item, index) in chartData.data2.slice(1)" :key="index">
          <p class="name">{{item.name}}</p>
          <p class="num">{{item.value}}</p>
        </li>
      </ul>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.data_S {
  height: 50vh;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  position: relative;
  width: 100%;
  .fanzha-title {
    &.t-bottom {
      margin-top: 30rem;
    }
  }
  .chart_top {
    width: 100%;
    height: 40%;
  }
  .chart_bottom {
    width: 100%;
    height: 170rem;
    padding: 0 10rem;
    ul {
      position: relative;
      font-size: 14rem;
      color: #7ea4b5;
      width: 100%;
      height: 100%;
      background-image: url("../../../public/static/img/imgs/shujuanquan/img_datarightbg.png");
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      flex-wrap: wrap;

      .all {
        padding-top: 25rem;
        margin-left: 1rem;
        position: absolute;
        width: 96rem;
        height: 96rem;
        left: 50%;
        top: 50%;
        margin-left: -48rem;
        margin-top: -48rem;
        color: #95d8ff;
        text-align: center;
        .all-num {
          font-family: "font-Family-self";
          font-size: 32rem;
          line-height: 25rem;
        }
        .out,
        .in {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .in {
          animation: in 6s linear infinite;
          @keyframes in {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
        .out {
          animation: out 6s linear infinite;
          @keyframes out {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        }
      }
      & li:nth-of-type(even) {
        padding-right: 30rem;
        text-align: right;
      }
      & li:nth-of-type(odd) {
        padding-left: 30rem;
        text-align: left;
      }
      li {
        padding-top: 15rem;
        width: 50%;
        height: 50%;
        .num {
          font-family: "font-Family-self";
          font-size: 35rem;
          line-height: 30rem;
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {};
      },
    },
    // chartData1: {
    //   type: Array,
    //   default() {
    //     return [
    //       { name: "总数", value: 12000 },
    //       { name: "未公开收集\n使用规则", value: 2000 },
    //       { name: "未经同意向他\n人提供个人信息", value: 2000 },
    //       { name: "未经同意向他\n人提供个人信息", value: 2000 },
    //       {
    //         name: "违反必要原则，\n收集与其提供\n的服务无关的\n个人信息",
    //         value: 2000,
    //       },
    //       { name: "未明示收集使用\n个人信息的目的、\n方式和范围", value: 2000 },
    //       { name: "未明示收集使用\n个人信息的目的、\n方式和范围", value: 2000 },
    //     ];
    //   },
    // },
  },
  // props: ["chartData", 'chartData1'],
  data() {
    return {
      colorList: [
        "#776164",
        "#794c51",
        "#7f654c",
        "#6f7b54",
        "#3e7b7b",
        "#206481",
      ],
      // chartData: [
      //   { name: "总数", value: 62000 },
      //   { name: "公安等部门通报 ", value: 30000 },
      //   { name: "媒体监督", value: 20000 },
      //   { name: "用户举报投诉 ", value: 3000 },
      //   { name: "第三方机构监测 ", value: 10000 },
      // ],
      // chartData1: [
      //   { name: "总数", value: 12000 },
      //   { name: "未公开收集\n使用规则", value: 2000 },
      //   { name: "未经同意向他\n人提供个人信息", value: 2000 },
      //   { name: "未经同意向他\n人提供个人信息", value: 2000 },
      //   {
      //     name: "违反必要原则，\n收集与其提供\n的服务无关的\n个人信息",
      //     value: 2000,
      //   },
      //   { name: "未明示收集使用\n个人信息的目的、\n方式和范围", value: 2000 },
      //   { name: "未明示收集使用\n个人信息的目的、\n方式和范围", value: 2000 },
      // ],
    };
  },
  methods: {
    initChart() {
      let { getRem } = this.$chartConfig;

      const chart = this.$echarts.init(this.$refs.chart_top);
      let me = this;
      let data = this.chartData.data1.slice(1);
      let titleArr = [],
        seriesArr = [];
      data.forEach((item, index) => {
        titleArr.push({
          text: (() => {
            return item.name[1];
          })(),
          left:
            index >= 3 ? (index - 3) * 35 + 13 + "%" : index * 35 + 13 + "%",
          top: index >= 3 ? "75%" : "30%",
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: getRem(12),
            color: "rgba(255, 255, 255, .8)",
            textAlign: "center",
            lineHeight: getRem(12),
          },
        });
        seriesArr.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: ["17%", "25%"],
          itemStyle: {
            normal: {
              color: me.colorList[index],
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          center: [
            index >= 3 ? (index - 3) * 35 + 14 + "%" : index * 35 + 14 + "%",
            index >= 3 ? "60%" : "15%",
          ],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  padding: [5, 0, 0, 0],
                  textStyle: {
                    fontWeight: "normal",
                    color: "#fff",
                    fontSize: getRem(15),
                    lineHeight: getRem(15),
                    rich: {
                      title: {
                        fontSize: getRem(15),
                        align: "center",
                        color: "#fff",
                      },
                    },
                  },
                  formatter: function () {
                    return item.value;
                  },
                  position: "center",
                  show: true,
                },
              },
            },
            {
              value: me.chartData.data1[0].value - item.value,
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
          radius: ["23%", "25%"],
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
          center: [
            index >= 3 ? (index - 3) * 35 + 14 + "%" : index * 35 + 14 + "%",
            index >= 3 ? "60%" : "15%",
          ],
          data: [
            {
              value: item.value,
            },
            {
              value: me.chartData.data1[0].value - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: me.colorList[index],
                },
              },
            },
          ],
        });
      });

      let option = {
        tooltip: {
          show: true,
          confine: true,
          backgroundColor: "rgba(0,101,153,.5)",
          textStyle: {
            fontSize: getRem(12),
            color: "#fff",
          },
          show: true,
          padding: [10, 10],
          formatter(e) {
            // console.log(778899, e.seriesName);
            let sliceNum = 10;
            let row = Math.ceil(e.seriesName.length / sliceNum);
            let arr = [];
            for (let i = 0; i < row; i++) {
              arr.push(e.seriesName.slice(i * sliceNum, (i + 1) * sliceNum));
            }
            console.log(11222333, arr);
            return arr.join("<br>");
          },
        },
        title: titleArr,
        series: seriesArr,
      };
      chart.on("mousemove", (e) => {
        console.log(111, e.seriesIndex);
      });
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
  },
  mounted() {
    console.log(99988, this.chartData);
    this.initChart();
  },
};
</script>  