<template>
  <div class="com-zj-map">
    <div class="zj-map" ref="map" @mouseleave="mapLeave"></div>
    <div class="line-map" ref="lineMap" v-if="showLine" @mouseenter="mapEnter"></div>
    <div class="attack-from-label" @click="toogleChart('showLeft')">攻击源</div>
    <div class="attack-type-label" @click="toogleChart('showRight')">攻击类型</div>
    <transition name="fade">
      <div class="attack-from" v-show="showLeft">
        <div class="title">
          <span>{{ inOut == 'in' ? '境内攻击源': '境外攻击源'}}</span>
          <span class="tab">
            <img
              @click="changeTab('in')"
              :src="require(`../../../public/static/img/imgs/wangan/icon_${inOut == 'in'? 'jingnei_click' : 'jingnei'}.png`)"
              alt
            />
            <img
              @click="changeTab('out')"
              :src="require(`../../../public/static/img/imgs/wangan/icon_${inOut !== 'in'? 'jingwai_click' : 'jingwai'}.png`)"
              alt
            />
          </span>
        </div>
        <div class="info">
          <div class="times">
            发动攻击
            <span>{{mapData[showCity.index][inOut][0].value.toLocaleString()}}</span>次
          </div>
          <ul>
            <li v-for="(item, index) in mapData[showCity.index][inOut].slice(1)" :key="index">
              <img
                v-if="inOut == 'out'"
                :src="require('../../../public/static/img/imgs/wangan/img_' + icons[index] + '.png')"
                alt
              />
              <span class="name">{{item.name}}</span>
              <span class="bg">
                <span
                  class="data animate-left"
                  :style="{width: (item.value/mapData[showCity.index][inOut].slice(1)[0].value * 100) + '%'}"
                ></span>
              </span>
              <span class="value">{{item.value.toLocaleString('en-US')}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="attack-type" v-show="showRight">
        <img
          class="animate-circle"
          src="../../../public/static/img/imgs/wangan/animate_circle.png"
          alt
        />
        <div class="circle">
          <p>攻击总数</p>
          <p class="number">{{mapData[showCity.index][inOut][0].value.toLocaleString()}}</p>
        </div>
        <div class="title">{{ showCity.name +'近7日遭受攻击统计'}}</div>
        <ul>
          <li v-for="item in mapData[showCity.index].type.slice(1)" :key="item.name">
            <span class="type">{{item.name}}</span>
            <span class="value">{{item.value.toLocaleString('en-us')}}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(200rem);
  opacity: 0;
}
.com-zj-map {
  position: relative;
  display: flex;
  width: 100%;
  height: 500rem;
  background-image: url("../../../public/static/img/imgs/gk_map_outline.png");
  background-size: 100% 100%;
  overflow: hidden;
  .zj-map {
    position: absolute;
    width: 55%;
    height: 100%;
  }
  .line-map {
    position: absolute;
    width: 55%;
    height: 100%;
  }
  .attack-from-label,
  .attack-type-label {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 60rem;
    width: 25rem;
    position: absolute;
    font-size: 11rem;
    color: rgba(179, 179, 179, 1);
    padding: 3rem 5rem;
    line-height: 1.2;
  }
  .attack-type-label {
    right: 0;
    top: 320rem;
    padding-top: 1rem;
    padding-left: 8rem;
    background-image: url("../../../public/static/img/imgs/wangan/wangan_type_bg.png");
    background-position: 2rem 0;
  }
  .attack-from-label {
    background-image: url("../../../public/static/img/imgs/wangan/wangan_form_bg.png");
    background-position: 2rem 0;
    line-height: 1.5;
    right: 0;
    top: 30rem;
    padding-left: 8rem;
  }
  .attack-from {
    width: 350rem;
    height: 250rem;
    position: absolute;
    top: 30rem;
    right: 40rem;
    background-image: url("../../../public/static/img/imgs/wangan/img_gjybg.png");
    background-size: 100% 100%;
    padding: 0 20rem;
    .title {
      font-size: 18rem;
      color: #fff;
      margin-top: 5rem;
      padding-left: 60rem;
      .tab {
        margin-top: 7rem;
        position: absolute;
        top: 0;
        right: 20rem;
        img {
          height: 20rem;
          margin: 0 10rem;
        }
      }
    }
    .info {
      font-size: 12rem;
      color: #fff;
      .times {
        margin-top: 15rem;
        height: 30rem;
        // padding: 10rem 0;
        letter-spacing: 2rem;
        font-size: 15rem;
        color: rgba(255, 255, 255, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          color: #e4da39;
          font-family: "font-Family-number";
          font-size: 20rem;
          padding: 0 10rem;
        }
      }
      ul {
        height: 160rem;
        padding: 15rem 0 0 0;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        font-size: 14rem;
        li {
          padding: 0 5rem;
          width: 100%;
          display: flex;
          img {
            width: 26rem;
            height: 18rem;
            margin-right: 10rem;
          }
          .name {
            width: 25%;
          }
          .value {
            text-align: right;
            width: 25%;
            font-family: "font-Family-self";
            font-size: 26rem;
            line-height: 22rem;
          }
          .bg {
            background-color: #3b4a4e;
            height: 4rem;
            width: 50%;
            border-radius: 2rem;
            position: relative;
            top: 7rem;
            overflow: hidden;
            .data {
              position: absolute;
              left: 0;
              width: 50%;
              height: 100%;
              border-radius: 2rem;
              background-color: #999638;
            }
          }
        }
      }
    }
  }
  .attack-type {
    .animate-circle {
      width: 130rem;
      position: absolute;
      top: 27rem;
      left: 11rem;
      animation: animate_circle 6s infinite linear;
      @keyframes animate_circle {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
    width: 380rem;
    height: 160rem;
    color: #fff;
    position: absolute;
    top: 320rem;
    right: 40rem;
    background-image: url("../../../public/static/img/imgs/wangan/img_gjzsbg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    .circle {
      width: 120rem;
      height: 70rem;
      position: absolute;
      top: 60rem;
      left: 16rem;
      color: #fff;
      font-size: 13rem;
      text-align: center;
      .number {
        font-size: 35rem;
        line-height: 35rem;
        font-family: "font-Family-self";
      }
    }
    .title {
      font-size: 13rem;
      line-height: 30rem;
      width: 100%;
      position: absolute;
      padding-left: 180rem;
      // background-color: orange;
    }
    ul {
      top: 30rem;
      right: 15rem;
      width: 190rem;
      height: 130rem;
      padding: 5rem 0;
      position: absolute;
      font-size: 12rem;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      li {
        line-height: 20rem;
        font-size: 11rem;
        padding: 0 10rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 20rem;
        background-color: rgba(113, 62, 62, 0.57);
        .value {
          font-size: 23rem;
          font-family: "font-Family-self";
        }
      }
    }
  }
}
</style>

<script>
import data from "echarts/map/json/province/zhejiang.json";
export default {
  data() {
    return {
      showLine: true,
      inOut: "in",
      showCity: { name: "杭州市", index: 0, xy: [120.153576, 30.137459] },
      timer: null,
      mapData: "",
      chartData: "",
      icons: ["AUS", "USA", "IND", "HKG", "CAN"],
      showLeft: true,
      showRight: true,
      lines_coord: [
        // {
        //   coords: [
        //     [140.153576, 35.137459],
        //     [120.153576, 30.137459],
        //   ],
        // },
        // {
        //   coords: [
        //     [140.153576, 35.137459],
        //     [120.153576, 30.137459],
        //   ],
        // },
        // {
        //   coords: [
        //     [140.153576, 35.137459],
        //     [120.153576, 30.137459],
        //   ],
        // },
        // {
        //   coords: [
        //     [140.153576, 35.137459],
        //     [120.153576, 30.137459],
        //   ],
        // },
        // {
        //   coords: [
        //     [140.153576, 35.137459],
        //     [120.153576, 30.137459],
        //   ],
        // },
        // {
        //   coords: [
        //     [140.153576, 35.137459],
        //     [120.153576, 30.137459],
        //   ],
        // },
      ],
    };
  },

  created() {
    let me = this;
    this.chartData = this.$store.state.webSecurityData.attack_data_map;
    this.mapData = data.features.map((val) => {
      for (let i = 0; i < this.chartData.length; i++) {
        if (this.chartData[i].name == val.properties.name) {
          return {
            name: val.properties.name,
            value: [val.properties.cp[0], val.properties.cp[1] - 0.15],
            out: this.chartData[i].attack_source_out,
            in: this.chartData[i].attack_source_in,
            type: this.chartData[i].attack_type,
          };
        }
      }
    });
  },

  methods: {
    mapEnter() {
      this.showLine = false
    },
    mapLeave() {
      this.showLine = true
    },
    changeTab(e) {
      console.log(111, e);
      this.inOut = e;
    },
    toogleChart(e) {
      this[e] = !this[e];
    },
    initLineMap() {
      let me = this;
      const LineChart = this.$echarts.init(this.$refs.lineMap);
       this.$echarts.registerMap("zhejiang", data);
      let option = {
        geo: {
          show: false,
          map: "zhejiang",
          zoom: 1.1,
          roam: false,
          itemStyle: {
            normal: {
              shadowColor: "#21446a",
              shadowOffsetX: 5,
              shadowOffsetY: 15,
            },
          },
        },
        series: [
          // 受攻击城市
          // 120.153576, 30.137459
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 15,
            symbolSize: 5,
            rippleEffect: {
              period: 3,
              brushType: "fill",
              scale: 5,
            },
            itemStyle: {
              color: "red",
              opacity: 1,
            },
            data: [{ name: "杭州", value: me.lines_coord[0].coords[1] }],
          },

          // 飞线
          {
            type: "lines",
            // coordinateSystem: "geo",
            zlevel: 15,
            effect: {
              show: true,
              period: 5,
              trailLength: 0,
              symbol: "arrow",
              color: "red",
              symbolSize: 8,
            },
            lineStyle: {
              normal: {
                width: 1.2,
                opacity: 0.6,
                curveness: 0.2,
                color: "red",
                type: "dotted",
              },
            },
            data: this.lines_coord,
          },
        ],
      };
      // LineChart.on('mousemove', e => {
      //   me.showLine = false;
      //   console.log(999999888765, me.showLine)
      // })
      // LineChart.on('mouseout', e => {
      //   me.showLine = true
      //   console.log(1111234325, me.showLine)
      // })
      LineChart.setOption(option);
      window.addEventListener("resize", () => {
        LineChart.resize();
      });

    },

// 
// 
    // 
    initChart() {
      let index = -1;
      let me = this;
      this.showCity.xy = [];
      // this.mapData.forEach((v, index1) => {
      //   arr.push({
      //     coords: [
      //       [
      //         120.153576 +
      //           (Math.random() > 0.5
      //             ? Math.random() * 2.5
      //             : Math.random() * -2.5),
      //         30.137459 +
      //           (Math.random() > 0.5
      //             ? Math.random() * 2.5
      //             : Math.random() * -2.5),
      //       ],
      //       // [120.153576, 30.137459]
      //       data.features[(index == -1 ? 0 : index) % 11].properties.cp,
      //     ],
      //   });
      // });

      // this.mapData.forEach((v, index1) => {
      //   arr.push({
      //     coords: [
      //       [
      //         data.features[(index == -1 ? 0 : index) % 11].properties.cp[0] +
      //           (Math.random() > 0.5
      //             ? Math.random() * 2.5
      //             : Math.random() * -2.5),
      //         data.features[(index == -1 ? 0 : index) % 11].properties.cp[1] +
      //           (Math.random() > 0.5
      //             ? Math.random() * 2.5
      //             : Math.random() * -2.5),
      //       ],
      //       data.features[(index == -1 ? 0 : index) % 11].properties.cp,
      //     ],
      //   });
      // });

      // this.lines_coord = arr;

      const chart = this.$echarts.init(this.$refs.map);
      // 定时器回调函数
      var fn = function () {
        // 隐藏提示框
        chart.dispatchAction({
          type: "hideTip",
          seriesIndex: 0,
          dataIndex: index % 11,
        });
        // 显示提示框
        chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: (index + 1) % 11,
        });
        // 取消高亮指定的数据图形
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index % 11,
        });
        // 高亮指定的数据图形
        chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: (index + 1) % 11,
        });
        index++;
        me.showCity.name = data.features[index % 11].properties.name;
        me.showCity.index = index % 11;
        me.showCity.xy = data.features[index % 11].properties.cp;
        let arr = [];
        // me.mapData.forEach((v, index1) => {
        //   arr.push({
        //     coords: [
        //       [
        //         120.153576 +
        //           (Math.random() > 0.5
        //             ? Math.random() * 2.5
        //             : Math.random() * -2.5),
        //         30.137459 +
        //           (Math.random() > 0.5
        //             ? Math.random() * 2.5
        //             : Math.random() * -2.5),
        //       ],
        //       // [120.153576, 30.137459]
        //       data.features[(index == -1 ? 0 : index) % 11].properties.cp,
        //     ],
        //   });
        // });
         me.mapData.forEach((v, index1) => {
        arr.push({
          coords: [
            [
              data.features[(index == -1 ? 0 : index) % 11].properties.cp[0] +
                (Math.random() > 0.5
                  ? Math.random() * 2.5
                  : Math.random() * -2.5),
              data.features[(index == -1 ? 0 : index) % 11].properties.cp[1] +
                (Math.random() > 0.5
                  ? Math.random() * 2.5
                  : Math.random() * -2.5),
            ],
            [data.features[(index == -1 ? 0 : index) % 11].properties.cp[0], data.features[(index == -1 ? 0 : index) % 11].properties.cp[1] -0.2],
          ],
        });
      });
        me.lines_coord = arr;
      };
      this.timer = setInterval(fn, 3000);
      chart.on("mousemove", function (e) {
        me.showCity.name = e.data.name;
        me.showCity.index = e.dataIndex;
        console.log(12321, e);
        clearInterval(me.timer);
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
        });
        chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
        chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
      });

      chart.on("mouseout", function (e) {
        clearInterval(me.timer);
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        });
        me.timer = setInterval(fn, 3000);
      });

      this.$echarts.registerMap("zhejiang", data);
      let option = {
        geo: {
          map: "zhejiang",
          zoom: 1.1,
          roam: false,
          itemStyle: {
            normal: {
              shadowColor: "#21446a",
              shadowOffsetX: 5,
              shadowOffsetY: 15,
            },
          },
        },
        series: [
          {
            type: "map",
            roam: false,
            scaleLimit: {
              max: 1.1,
              min: 1.1,
            },
            label: {
              normal: {
                show: true,
                formatter({ data }) {
                  // return data.name + "\n" + "{icon|" + " " + "}";
                  return data.name;
                },
                textStyle: {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "12",
                  lineHeight: 16,
                  rich: {
                    icon: {
                      width: 12,
                      height: 12,
                      backgroundColor: {
                        image: `${require("../../../public/static/img/imgs/fanzha/icon_mappoint.png")}`,
                      },
                    },
                  },
                },
              },
              emphasis: {
                formatter({ data }) {
                  // return data.name + "\n" + "{icon|" + " " + "}";
                  return data.name
                },
                textStyle: {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "12",
                  lineHeight: 16,
                  rich: {
                    icon: {
                      width: 12,
                      height: 12,
                      backgroundColor: {
                        image: `${require("../../../public/static/img/imgs/fanzha/icon_mappoint.png")}`,
                      },
                    },
                  },
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#3687a7",
                borderWidth: 1.5,
                areaColor: "#1c517a",
              },
              emphasis: {
                areaColor: "#6a733c",
                borderColor: "#ced166",
                borderWidth: 2,
              },
            },
            zoom: 1.1,
            map: "zhejiang",
            data: this.mapData,
          },
          // 受攻击城市
          // 120.153576, 30.137459
          // {
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   zlevel: 15,
          //   symbolSize: 8,
          //   rippleEffect: {
          //     period: 3,
          //     brushType: "fill",
          //     scale: 6,
          //   },
          //   itemStyle: {
          //     color: "red",
          //     opacity: 1,
          //   },
          //   data: [{ name: "杭州", value: data.features[index % 11] }],
          // },

          // 飞线
          // {
          //   type: "lines",
          //   // coordinateSystem: "geo",
          //   zlevel: 15,

          //   effect: {
          //     show: true,
          //     period: 5,
          //     trailLength: 0,
          //     symbol: "arrow",
          //     color: "red",
          //     symbolSize: 8,
          //   },
          //   lineStyle: {
          //     normal: {
          //       width: 1.2,
          //       opacity: 0.6,
          //       curveness: 0.2,
          //       color: "red",
          //       type: "dotted",
          //     },
          //   },
          //   data: this.lines_coord,
          // },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
  },

  mounted() {
    this.initChart();
    this.initLineMap();
  },
  watch: {
    lines_coord(a, b) {
      if (a != b) {
        console.log("a, b");
        this.initLineMap()
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>