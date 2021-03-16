<template>
  <div class="com-world-map">
    <div class="world-map" ref="map"></div>
    <div class="attack-from-label" @click="toogleChart('showLeft')">攻击源</div>
    <div class="attack-type-label" @click="toogleChart('showRight')">攻击类型</div>
    <transition name="fade">
      <div class="attack-from" v-show="showLeft">
        <div class="title">攻击源</div>
        <div class="info">
          <div class="times">
            发动攻击
            <span>{{(2000000 + 1500000 + 1200000 + 800300 + 500050).toLocaleString('en-US')}}</span>次
          </div>
          <ul>
            <li v-for="item in data" :key="item.url">
              <img
                :src="require('../../../public/static/img/imgs/wangan/img_' + item.url + '.png')"
                alt
              />
              <div class="right">
                <p class="text">
                  <span class="name">{{item.name.toLocaleString('en-US')}}</span>
                  <span class="value">{{item.value.toLocaleString('en-US')}}</span>
                </p>
                <div class="bg">
                  <div class="data animate-left" :style="{width: (item.value/data[0].value * 100) + '%'}"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade1">
      <div class="attack-type" v-show="showRight">
        <img
          class="animate-circle"
          src="../../../public/static/img/imgs/wangan/animate_circle.png"
          alt
        />
        <div class="circle">
          <p class="number">{{chartData.type[0].value.toLocaleString('en-us')}}</p>
          <p>攻击总数</p>
        </div>
        <div class="title">浙江省近7日遭受攻击统计</div>
        <ul>
          <li v-for="item in chartData.type.slice(1)" :key="item.name">
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
  transform: translateX(-200rem);
  opacity: 0;
}

.fade1-enter-active,
.fade1-leave-active {
  transition: 0.3s;
}
.fade1-enter,
.fade1-leave-to {
  transform: translateX(200rem);
  opacity: 0;
}
.com-world-map {
  overflow: hidden;
  width: 100%;
  height: 500rem;
  background-image: url("../../../public/static/img/imgs/gk_map_outline.png");
  background-size: 100% 100%;
  position: relative;
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
    top: 220rem;
    padding-top: 1rem;
    padding-left: 8rem;
    background-image: url("../../../public/static/img/imgs/wangan/wangan_type_bg.png");
    background-position: 2rem 0;
  }
  .attack-from-label {
    background-image: url("../../../public/static/img/imgs/wangan/wangan_form_bg.png");
    background-position: -2rem 0;
    line-height: 1.5;
    left: 0;
    top: 40rem;
  }
  .attack-from {
    width: 300rem;
    height: 360rem;
    position: absolute;
    top: 40rem;
    left: 40rem;
    background-image: url("../../../public/static/img/imgs/wangan/img_gjybg.png");
    background-size: 100% 100%;
    padding: 0 20rem;
    .title {
      font-size: 15rem;
      color: rgba(157, 255, 215, 1);
      margin-top: 4rem;
    }
    .info {
      margin-top: 20rem;
      font-size: 12rem;
      color: #fff;
      .times {
        height: 50rem;
        padding: 10rem 0;
        letter-spacing: 2rem;
        font-size: 12rem;
        color: rgba(255, 255, 255, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          color: #e4da39;
          font-family: "font-Family-number";
          font-size: 20rem;
          padding: 0 5rem;
        }
      }
      ul {
        height: 230rem;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        li {
          width: 100%;
          display: flex;
          img {
            width: 35rem;
            margin-right: 8rem;
          }
          .right {
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            flex: 1;
            .text {
              width: 100%;
              display: flex;
              justify-content: space-between;
              .value {
                font-family: "font-Family-self";
                font-size: 24rem;
                line-height: 20rem;
              }
            }
            .bg {
              background-color: #3b4a4e;
              height: 4rem;
              width: 100%;
              border-radius: 2rem;
              position: relative;
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
    top: 220rem;
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
      position: absolute;
      left: 170rem;
    }
    ul {
      top: 30rem;
      right: 10rem;
      width: 170rem;
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
  .world-map {
    width: 100%;
    height: 100%;
  }
}
</style>

<script>
import "echarts/map/js/world.js";
import data from "echarts/map/json/world.json";
export default {
  methods: {
    toogleChart(e) {
      this[e] = !this[e];
    }
  },
  data() {
    return {
      showLeft: true,
      showRight: true,
      data: [
        { name: "澳大利亚", value: 2000000, url: "AUS" },
        { name: "美国", value: 1500000, url: "USA" },
        { name: "印度", value: 1200000, url: "IND" },
        { name: "中国香港", value: 800300, url: "HKG" },
        { name: "加拿大", value: 500050, url: "CAN" }
      ],
      data1: [
        { type: "DDOS攻击", value: 200000 },
        { type: "僵尸网络", value: 150000 },
        { type: "木马", value: 100000 },
        { type: "蠕虫", value: 20000 }
      ],
      chartData: {
        from: [],
        type: []
      }
    };
  },
  created() {
    this.chartData.from = this.$store.state.webSecurityData.attack_source;
    this.chartData.type = this.$store.state.webSecurityData.attack_type;
  },
  mounted() {
    console.log(9999988888,this.chartData)
    const chart = this.$echarts.init(this.$refs.map);
    let geoCoordMap = {
      阿富汗: [69.11, 34.28],
      阿尔巴尼亚: [19.49, 41.18],
      阿尔及利亚: [3.08, 36.42],
      美属萨摩亚: [-170.43, -14.16],
      安道尔: [1.32, 42.31],
      安哥拉: [13.15, -8.5],
      安提瓜和巴布达: [-61.48, 17.2],
      阿根廷: [-60.0, -36.3],
      亚美尼亚: [44.31, 40.1],
      阿鲁巴: [-70.02, 12.32],
      澳大利亚: [149.08, -35.15],
      奥地利: [16.22, 48.12],
      阿塞拜疆: [49.56, 40.29],
      巴哈马: [-77.2, 25.05],
      巴林: [50.3, 26.1],
      孟加拉国: [90.26, 23.43],
      巴巴多斯: [-59.3, 13.05],
      白俄罗斯: [27.3, 53.52],
      比利时: [4.21, 50.51],
      伯利兹: [-88.3, 17.18],
      贝宁: [2.42, 6.23],
      不丹: [89.45, 27.31],
      玻利维亚: [-68.1, -16.2],
      波斯尼亚和黑塞哥维那: [18.26, 43.52],
      博茨瓦纳: [25.57, -24.45],
      巴西: [-47.55, -15.47],
      英属维尔京群岛: [-64.37, 18.27],
      文莱: [115.0, 4.52],
      保加利亚: [23.2, 42.45],
      布基纳法索: [-1.3, 12.15],
      布隆迪: [29.18, -3.16],
      柬埔寨: [104.55, 11.33],
      喀麦隆: [11.35, 3.5],
      加拿大: [-75.42, 45.27],
      佛得角: [-23.34, 15.02],
      开曼群岛: [-81.24, 19.2],
      中非共和国: [18.35, 4.23],
      乍得: [14.59, 12.1],
      智利: [-70.4, -33.24],
      中国: [116.2, 39.55],
      哥伦比亚: [-74.0, 4.34],
      科摩罗: [43.16, -11.4],
      刚果: [15.12, -4.09],
      哥斯达黎加: [-84.02, 9.55],
      科特迪瓦: [-5.17, 6.49],
      克罗地亚: [15.58, 45.5],
      古巴: [-82.22, 23.08],
      塞浦路斯: [33.25, 35.1],
      捷克共和国: [14.22, 50.05],
      朝鲜: [125.3, 39.09],
      刚果: [15.15, -4.2],
      丹麦: [12.34, 55.41],
      吉布提: [42.2, 11.08],
      多米尼加: [-61.24, 15.2],
      多米尼加共和国: [-69.59, 18.3],
      东帝汶: [125.34, -8.29],
      厄瓜多尔: [-78.35, -0.15],
      埃及: [31.14, 30.01],
      萨尔瓦多: [-89.1, 13.4],
      赤道几内亚: [8.5, 3.45],
      厄立特里亚: [38.55, 15.19],
      爱沙尼亚: [24.48, 59.22],
      埃塞俄比亚: [38.42, 9.02],
      福克兰群岛: [-59.51, -51.4],
      法罗群岛: [-6.56, 62.05],
      斐济: [178.3, -18.06],
      芬兰: [25.03, 60.15],
      法国: [2.2, 48.5],
      法属圭亚那: [-52.18, 5.05],
      法属波利尼西亚: [-149.34, -17.32],
      加蓬: [9.26, 0.25],
      冈比亚: [-16.4, 13.28],
      格鲁吉亚: [44.5, 41.43],
      德国: [13.25, 52.3],
      加纳: [-0.06, 5.35],
      希腊: [23.46, 37.58],
      格陵兰: [-51.35, 64.1],
      瓜德罗普岛: [-61.44, 16.0],
      危地马拉: [-90.22, 14.4],
      根西岛: [-2.33, 49.26],
      几内亚: [-13.49, 9.29],
      几内亚比绍: [-15.45, 11.45],
      圭亚那: [-58.12, 6.5],
      海地: [-72.2, 18.4],
      赫德岛和麦当劳群岛: [74.0, -53.0],
      洪都拉斯: [-87.14, 14.05],
      匈牙利: [19.05, 47.29],
      冰岛: [-21.57, 64.1],
      印度: [77.13, 28.37],
      印度尼西亚: [106.49, -6.09],
      伊朗: [51.3, 35.44],
      伊拉克: [44.3, 33.2],
      爱尔兰: [-6.15, 53.21],
      以色列: [35.12, 31.47],
      意大利: [12.29, 41.54],
      牙买加: [-76.5, 18.0],
      约旦: [35.52, 31.57],
      哈萨克斯坦: [71.3, 51.1],
      肯尼亚: [36.48, -1.17],
      基里巴斯: [173.0, 1.3],
      科威特: [48.0, 29.3],
      吉尔吉斯斯坦: [74.46, 42.54],
      老挝: [102.36, 17.58],
      拉脱维亚: [24.08, 56.53],
      黎巴嫩: [35.31, 33.53],
      莱索托: [27.3, -29.18],
      利比里亚: [-10.47, 6.18],
      阿拉伯利比亚民众国: [13.07, 32.49],
      列支敦士登: [9.31, 47.08],
      立陶宛: [25.19, 54.38],
      卢森堡: [6.09, 49.37],
      马达加斯加: [47.31, -18.55],
      马拉维: [33.48, -14.0],
      马来西亚: [101.41, 3.09],
      马尔代夫: [73.28, 4.0],
      马里: [-7.55, 12.34],
      马耳他: [14.31, 35.54],
      马提尼克岛: [-61.02, 14.36],
      毛里塔尼亚: [57.3, -20.1],
      马约特岛: [45.14, -12.48],
      墨西哥: [-99.1, 19.2],
      密克罗尼西亚: [158.09, 6.55],
      摩尔多瓦共和国: [28.5, 47.02],
      莫桑比克: [32.32, -25.58],
      缅甸: [96.2, 16.45],
      纳米比亚: [17.04, -22.35],
      尼泊尔: [85.2, 27.45],
      荷兰: [4.54, 52.23],
      荷属安的列斯: [-69.0, 12.05],
      新喀里多尼亚: [166.3, -22.17],
      新西兰: [174.46, -41.19],
      尼加拉瓜: [-86.2, 12.06],
      尼日尔: [2.06, 13.27],
      尼日利亚: [7.32, 9.05],
      诺福克岛: [168.43, -45.2],
      北马里亚纳群岛: [145.45, 15.12],
      挪威: [10.45, 59.55],
      阿曼: [58.36, 23.37],
      巴基斯坦: [73.1, 33.4],
      帕劳: [134.28, 7.2],
      巴拿马: [-79.25, 9.0],
      巴布亚新几内亚: [147.08, -9.24],
      巴拉圭: [-57.3, -25.1],
      秘鲁: [-77.0, -12.0],
      菲律宾: [121.03, 14.4],
      波兰: [21.0, 52.13],
      葡萄牙: [-9.1, 38.42],
      波多黎各: [-66.07, 18.28],
      卡塔尔: [51.35, 25.15],
      韩国: [126.58, 37.31],
      罗马尼亚: [26.1, 44.27],
      俄罗斯: [37.35, 55.45],
      卢旺达: [30.04, -1.59],
      圣基茨和尼维斯: [-62.43, 17.17],
      圣卢西亚: [-60.58, 14.02],
      圣皮埃尔和密克隆: [-56.12, 46.46],
      圣文森特和格林纳丁斯: [-61.1, 13.1],
      萨摩亚: [-171.5, -13.5],
      圣马力诺: [12.3, 43.55],
      圣多美和普林西比: [6.39, 0.1],
      沙特阿拉伯: [46.42, 24.41],
      塞内加尔: [-17.29, 14.34],
      塞拉利昂: [-13.17, 8.3],
      斯洛伐克: [17.07, 48.1],
      斯洛文尼亚: [14.33, 46.04],
      所罗门群岛: [159.57, -9.27],
      索马里: [45.25, 2.02],
      比勒陀利亚: [28.12, -25.44],
      西班牙: [-3.45, 40.25],
      苏丹: [32.35, 15.31],
      苏里南: [-55.1, 5.5],
      斯威士兰: [31.06, -26.18],
      瑞典: [18.03, 59.2],
      瑞士: [7.28, 46.57],
      阿拉伯叙利亚共和国: [36.18, 33.3],
      塔吉克斯坦: [68.48, 38.33],
      泰国: [100.35, 13.45],
      马其顿: [21.26, 42.01],
      多哥: [1.2, 6.09],
      汤加: [-174.0, -21.1],
      突尼斯: [10.11, 36.5],
      土耳其: [32.54, 39.57],
      土库曼斯坦: [57.5, 38.0],
      图瓦卢: [179.13, -8.31],
      乌干达: [32.3, 0.2],
      乌克兰: [30.28, 50.3],
      阿联酋: [54.22, 24.28],
      英国: [-0.05, 51.36],
      坦桑尼亚: [35.45, -6.08],
      美国: [-77.02, 39.91],
      美属维尔京群岛: [-64.56, 18.21],
      乌拉圭: [-56.11, -34.5],
      乌兹别克斯坦: [69.1, 41.2],
      瓦努阿图: [168.18, -17.45],
      委内瑞拉: [-66.55, 10.3],
      越南: [105.55, 21.05],
      南斯拉夫: [20.37, 44.5],
      赞比亚: [28.16, -15.28],
      津巴布韦: [31.02, -17.43],
      中国台湾: [120.85, 24.23],
      中国香港: [114.19, 22.27],
    };
    
    const coord = data.features
      .map(val => {
        if (typeof val.geometry.coordinates[0][0][0] == "number") {
          return {
            name: val.properties.name,
            value: val.geometry.coordinates[0][0]
          };
        } else {
          return {
            name: val.properties.name,
            value: val.geometry.coordinates[0][0][0]
          };
        }
      })
      .splice(5, 15);

    const lines_coord = [];
    coord.forEach((v, index) => {
      index > 0 &&
        lines_coord.push({
          coords: [v.value, [120.153576, 30.137459]]
        });
    });
    let option = {
      tooltip: {
        show: false
      },

      geo: {
        map: "world",
        zoom: 1,
        roam: false,
        itemStyle: {
          normal: {
            shadowColor: "#053f40",
            shadowOffsetX: 5,
            shadowOffsetY: 15
          }
        }
      },
      series: [
        {
          type: "map",
          roam: false,
          scaleLimit: {
            max: 1,
            min: 1
          },
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: 12,
                color: "#DADADA"
              }
            },
            emphasis: {
              show: false,
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "#18757b",
              borderWidth: 1.5,
              areaColor: "#114049"
            },
            emphasis: {
              borderColor: "#18757b",
              borderWidth: 1.5,
              areaColor: "#114049"
            }
          },
          zoom: 1,
          map: "world",
          data: coord
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          showEffectOn: "render",
          symbolSize: 8,
          rippleEffect: {
            period: 3,
            scale: 3,
            brushType: "fill"
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: "#e8cf41",
              shadowBlur: 10
            }
          },
          data: coord
        },
        {
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 15,

          effect: {
            show: true,
            period: 5,
            trailLength: 0,
            symbol: "arrow",
            color: "red",
            symbolSize: 8
          },
          lineStyle: {
            normal: {
              width: 1.2,
              opacity: 0.6,
              curveness: 0.2,
              color: "red",
              type: "dotted"
            }
          },
          data: lines_coord
        },
        // 杭州
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 15,
          symbolSize: 8,
          rippleEffect: {
            period: 3,
            brushType: "fill",
            scale: 6
          },
          itemStyle: {
            color: "red",
            opacity: 1
          },
          data: [{ name: "杭州", value: [120.153576, 30.137459] }]
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  }
};
</script>