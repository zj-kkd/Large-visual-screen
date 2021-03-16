<template>
  <div class="com-fanzha-shewen">
    <div class="com-monitor">
      <Title :title="'反诈监测情况'"></Title>
      <ul>
        <li v-for="item in monitorData" :key="item.name">
          <div class="circle">
            <div class="border"></div>
          </div>
          <div class="text">
            <p class="num">{{item.value}}</p>
          </div>
          <div class="title">{{item.name}}</div>
        </li>
      </ul>
    </div>
    <div class="shewen">
      <Title :title="'涉稳人员在全省的实时分布'"></Title>
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-fanzha-shewen {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.com-monitor {
  padding-left: 10px;
  border: 1px solid red;
  width: 63%;
  display: flex;
  flex-wrap: wrap;
  ul {
    height: 150px;
    border: 1px solid red;
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
    li {
      position: relative;
      width: 75px;
      height: 75px;
      text-align: center;
      .circle {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        animation: turn 5s infinite linear;
        @keyframes turn {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        background-image: url("../../../public/static/img/imgs/out-circle.png");
        background-repeat: no-repeat;
        background-size: 100%;
        .border {
          width: 100%;
          height: 100%;
          opacity: 0.8;
          border-radius: 50%;
        }
      }
      .text {
        .num {
          font-family: "font-Family-self";
          font-size: 45px;
          color: rgb(214, 200, 200);
          line-height: 75px;
        }
      }
      .title {
        margin-top: 20px;
        background-color: #192c37;
        font-size: 12px;
        color: #6beebb;
        line-height: 20px;
        &::before {
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          border-top: 1px solid #6beebb;
          border-left: 1px solid #6beebb;
          float: left;
        }
        &::after {
          margin-top: 12px;
          content: "";
          display: inline-block;
          width: 6px;
          height: 6px;
          border-bottom: 1px solid #6beebb;
          border-right: 1px solid #6beebb;
          float: right;
        }
      }
    }
  }
}
.shewen {
  width: 35%;
  border: 1px solid red;
  .chart {
    width: 100%;
    height: 220px;
    padding: 20px;
  }
}
</style>

<script>
import Title from "../Title";
export default {
  data() {
    return {
      monitorData: [
        { name: "诈骗电话数", value: 123 },
        { name: "诈骗短信数", value: 123 },
        { name: "仿冒App", value: 123 },
        { name: "钓鱼网站数", value: 123 },
        { name: "伪基站数", value: 123 }
      ],
      cityList: [
        { name: "杭州市", value: 100 },
        { name: "宁波市", value: 90 },
        { name: "温州市", value: 80 },
        { name: "金华市", value: 70 },
        { name: "嘉兴市", value: 60 },
        { name: "湖州市", value: 50 },
        { name: "绍兴市", value: 40 },
        { name: "舟山市", value: 30 },
        { name: "台州市", value: 20 },
        { name: "丽水市", value: 10 },
        { name: "衡州市", value: 5 }
      ]
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chart = this.$echarts.init(this.$refs.chart);
      var max = 100;
      let option = {
        tooltip: {
          backgroundColor: "rgba(24, 150, 140, 1)",
          textStyle: {
            fontSize: 11
          },
          confine: true,
          show: true
        },
        radar: {
          nameGap: 5,
          axisLine: {
            lineStyle: {
              color: "#3e4f55"
            }
          },
          name: {
            textStyle: {
              color: "#8d9095",
              fontSize: 11,
              backgroundColor: "rgba(1,1,1,0)"
            }
          },
          shape: "circle",
          center: ["50%", "50%"],
          radius: "80%",
          scale: true,
          indicator: this.cityList.map(item => {
            let arr = {};
            arr.name = item.name;
            arr.max = max;
            return arr;
          }),
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {},
        angleAxis: {
          startAngle: -90,
        },
        radiusAxis: {
          min: 0,
          max: max,
          interval: 25,
          // bg
          // splitArea: {
          //   show: false
          // },
          axisLabel: {
            show: true,
            margin: 1,
            textStyle: {
              fontSize: 10
            },
            color: "#438b75",
            showMinLabel: false,
            showMaxLabel: true
          },
          // 同心圆
          splitLine: {
            lineStyle: {
              color: "#2c3642"
            }
          }
        },
        series: [
          {
            name: "涉稳人员分布",
            type: "radar",
            symbol: "circle",
            lineStyle: {
              normal: {
                width: 0.5,
                color: "#4297e"
              }
            },
            areaStyle: {
              normal: {
                color: "rgba(107, 238, 187, .3)",
                width: 1
              }
            },
            itemStyle: {
              normal: {
                color: "#5fd7aa",
                borderWidth: 0
              }
            },
            data: [{ value: this.cityList.map(item => item.value) }]
          }
        ]
      };

      // let option = {
      //   tooltip: {
      //     backgroundColor: "rgba(24, 150, 140, .65)",
      //     textStyle: {
      //       fontSize: 11
      //     },
      //     confine: true,
      //     show: true
      //   },
      //   radar: {
      //     nameGap: 3,
      //     splitNumber: 2,
      //     name: {
      //       textStyle: {
      //         color: "#8d9095",
      //         fontSize: 11,
      //         backgroundColor: "rgba(1,1,1,0)"
      //       }
      //     },
      //     indicator: this.cityList.map(item => {
      //       let arr = {};
      //       arr.name = item.name;
      //       arr.max = 100;
      //       return arr;
      //     }),
      //     axisLine: {
      //       lineStyle: {
      //         color: "#1c2534"
      //       }
      //     },
      //     axisLabel: {
      //       show: true,
      //       color: "red",
      //       showMaxLabel: true
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         color: "#1c2534"
      //       }
      //     },
      //     splitArea: {
      //       areaStyle: {
      //         color: "rgba(1,1,1,0)"
      //       }
      //     }
      //   },
      //   radiusAxis: {
      //     min: 0,
      //     max: 100,
      //     interval: 10,
      //     splitArea: {
      //       show: false
      //     }
      //   },
      //   series: [
      //     {
      //       name: "涉稳人员分布",
      //       type: "radar",
      //       symbol: "circle",
      //       lineStyle: {
      //         normal: {
      //           width: 0.5,
      //           color: "#42947e"
      //         }
      //       },
      //       areaStyle: {
      //         normal: {
      //           color: "rgba(107, 238, 187, .3)",
      //           width: 1
      //         }
      //       },
      //       itemStyle: {
      //         normal: {
      //           color: "#5fd7aa",
      //           borderWidth: 0
      //         }
      //       },
      //       data: [{ value: this.cityList.map(item => item.value) }]
      //     }
      //   ]
      // };
      chart.setOption(option, true);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  },
  components: {
    Title
  }
};
</script> 
