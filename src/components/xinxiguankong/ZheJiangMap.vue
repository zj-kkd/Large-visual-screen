<template>
  <div class="com-zj-map">
    <div class="zj-map" ref="map"></div>
    <div class="chart">
      <img src="../../../public/static/img/imgs/gk_map_chart_bg.png" alt />
      <p>{{showCity.name + 'IDC&ISP接入风险情况'}}</p>
      <div class="label">
        <span>IP未报备</span>
        <span>企业未报备</span>
        <span>非法虚拟主机</span>
      </div>
      <ul>
        <li v-for="item in mapData[showCity.index].value.slice(5)" :key="item.type">
          <span class="type">{{item.name}}</span>
          <span class="bg">
            <span
              class="data"
              :style="{width: (item.value.reduce((prev, item) => prev + item, 0)/1400 * 100 + '%') + ''}"
            >
              <span :style="{backgroundColor: '#2b645b'}">{{item.value[0]}}</span>
              <span :style="{backgroundColor: '#6a623f'}">{{item.value[1]}}</span>
              <span :style="{backgroundColor: '#6a4d56'}">{{item.value[2]}}</span>
            </span>
            <!-- <span class="num">{{item.value.reduce((prev, item) => prev + item, 0)}}</span> -->
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.com-zj-map {
  display: flex;
  width: 100%;
  height: 500rem;
  background-image: url("../../../public/static/img/imgs/gk_map_outline.png");
  background-size: 100% 100%;
  overflow: hidden;
  .zj-map {
    width: 60%;
    height: 100%;
  }
  .chart {
    width: 350rem;
    height: 400rem;
    position: relative;
    top: 0;
    bottom: 0;
    margin: auto;
    margin-left: -10rem;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    p {
      position: absolute;
      font-size: 14rem;
      width: 100%;
      text-align: center;
      line-height: 40rem;
      color: #fff;
    }
    .label {
      width: 100%;
      position: absolute;
      justify-content: space-around;
      top: 70rem;
      padding: 0 5rem;
      display: flex;
      color: #b2b2b2;
      :nth-child(1) {
        border-color: #2b645b;
      }
      :nth-child(2) {
        border-color: #6a623f;
      }
      :nth-child(3) {
        border-color: #6a4d56;
      }
      span {
        padding-left: 3rem;
        font-size: 12rem;
        height: 8rem;
        border-left: 8rem solid red;
        line-height: 8rem;
      }
    }
    ul {
      height: 100%;
      width: 100%;
      padding-top: 120rem;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 100%;
        margin: 0 20rem;
        font-size: 12rem;
        display: flex;
        height: 12rem;
        align-items: center;
        .type {
          width: 50%;
          color: #b9babc;
        }
        .bg {
          text-align: center;
          width: 50%;
          height: 14rem;
          background-color: none;
          position: relative;
          overflow: hidden;
          .data {
            // width: 50%;
            color: #fff;
            line-height: 14rem;
            font-size: 10rem;
            background-color: #335c58;
            height: 100%;
            position: absolute;
            left: 0;
            display: flex;
            span {
              flex: 1;
            }
            animation: show 1.2s forwards;
            @keyframes show {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(0%);
              }
            }
          }
          .num {
            color: #b3b3b3;
            font-size: 12rem;
            position: absolute;
            right: 4rem;
            top: 0rem;
          }
        }
      }
    }
  }
}
</style>

<script>
import data from "echarts/map/json/province/zhejiang.json";
export default {
  props: ["chartData"],
  data() {
    return {
      showCity: { name: "杭州市", index: 0 },
      timer: null,
      mapData: ""
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  created() {
    this.mapData = data.features.map(val => {
      for (let i = 0; i < this.chartData.length; i++) {
        if (this.chartData[i][val.properties.name]) {
          return {
            name: val.properties.name,
            value: [val.properties.cp[0], val.properties.cp[1] - 0.15].concat(
              this.chartData[i][val.properties.name]
            )
          };
        }
      }
    });
  },
  mounted() {
    console.log(this.mapData);
    const chart = this.$echarts.init(this.$refs.map);
    let index = -1;
    let me = this;
    // 定时器回调函数
    var fn = function() {
      // 隐藏提示框
      chart.dispatchAction({
        type: "hideTip",
        seriesIndex: 0,
        dataIndex: index % 11
      });
      // 显示提示框
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: (index + 1) % 11
      });
      // 取消高亮指定的数据图形
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index % 11
      });
      // 高亮指定的数据图形
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: (index + 1) % 11
      });
      index++;
      me.showCity.name = data.features[index % 11].properties.name;
      me.showCity.index = index % 11;
    };
    this.timer = setInterval(fn, 3000);
    chart.on("mousemove", function(e) {
      me.showCity.name = e.data.name;
      me.showCity.index = e.dataIndex;
      clearInterval(me.timer);
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0
      });
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex
      });
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: e.dataIndex
      });
    });

    chart.on("mouseout", function(e) {
      clearInterval(me.timer);
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: e.dataIndex
      }); //
      me.timer = setInterval(fn, 3000);
    });

    this.$echarts.registerMap("zhejiang", data);
    let option = {
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(1, 1, 1, 0)",
        borderColor: "rgba(1, 1, 1, 0)",
        // padding: [10, 20],
        borderWidth: 1,
        //   position: [20, 20],
        formatter: function(params) {
          return `
            <div style="background-image: url('${require("../../../public/static/img/imgs/img_map_text_bg2@2x.png")}'); background-size: 100% 100%; padding: 10rem 20rem">
                <p style="font-size: 12rem">${params.name}</p>
                <p style="font-size: 12rem">${params.data.value[2].name +
                  ":"}<span font-size: 12rem"> ${
            params.data.value[2].value
          }</span></p>
                <p style="font-size: 12rem">${params.data.value[3].name +
                  ":"}<span font-size: 12rem"> ${
            params.data.value[3].value
          }</span></p>
                <p style="font-size: 12rem">${params.data.value[4].name +
                  ":"}<span font-size: 12rem"> ${
            params.data.value[4].value
          }</span></p>
            </div>
            `;
        }
      },

      geo: {
        map: "zhejiang",
        zoom: 1,
        roam: false,
        itemStyle: {
          normal: {
            shadowColor: "#21446a",
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
              show: true,
              textStyle: {
                fontSize: 12,
                color: "#DADADA"
              }
            },
            emphasis: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "#3687a7",
              borderWidth: 1.5,
              areaColor: "#1c517a"
            },
            emphasis: {
              areaColor: "#6a733c",
              borderColor: "#ced166",
              borderWidth: 2
            }
          },
          zoom: 1,
          map: "zhejiang",
          data: this.mapData
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
          data: this.mapData
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