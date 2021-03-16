<template>
  <div class="com-zj-map" v-if="chartData">
    <div class="zj-map" ref="map"></div>
    <div class="chart" v-if="mapData">
      <div class="title">{{showCity.name}}</div>
      <ul>
        <li v-for="(item, index) in mapData[showCity.index].value.slice(2)" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="value">
            <span class="num">{{item.value}}</span>
            <span class="add">{{item.add}}</span>
          </div>
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
    padding: 60rem 30rem 40rem 30rem;
    position: relative;
    width: 330rem;
    height: 80%;
    margin-top: 55rem;
    background-image: url("../../../public/static/img/imgs/fanzha/img_mapdatabg.png");
    background-size: 100% 100%;
    .title {
      width: 160rem;
      height: 45rem;
      text-align: center;
      font-size: 16rem;
      line-height: 40rem;
      color: $yellow;
      position: absolute;
      top: 0;
      left: 0;
    }
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-content: space-around;
      flex-wrap: wrap;
      li {
        width: 100%;
        height: 48rem;
        border-radius: 0 15rem 0 0;
        background: rgba(34, 89, 128, 0.25);
        display: flex;
        justify-content: space-between;
        .name {
          display: flex;
          align-items: center;
          width: 40%;
          height: 100%;
          background: rgba(50, 140, 187, 0.2);
          color: rgba(204, 204, 204, 1);
          font-size: 15rem;
          padding: 0 10rem;
        }
        .value {
          position: relative;
          flex: 1;
          padding: 0 20rem;
          .num {
            font-size: 28rem;
            color: $blue3;
            line-height: 48rem;
          }
          .add {
            position: absolute;
            right: 20rem;
            bottom: 8rem;
            font-size: 16rem;
            color: $yellow;
            &::before {
              content: "";
              display: inline-block;
              width: 12rem;
              height: 12rem;
              background-image: url("../../../public/static/img/icons/icon_add.png");
              background-size: 100% 100%;
              margin-right: 3rem;
            }

            &::after {
              content: "";
              display: inline-block;
              width: 12rem;
              height: 3rem;
              background-color: $blue3;
              position: absolute;
              bottom: -8rem;
              right: -20rem;
            }
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
  mounted() {
    let length = this.chartData.length;
    this.mapData = data.features.map(val => {
      for (let i = 0; i < length; i++) {
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
    const chart = this.$echarts.init(this.$refs.map);
    let index = -1;
    let me = this;
    // 定时器回调函数
    var fn = function() {
      // 隐藏提示框
      chart.dispatchAction({
        type: "hideTip",
        seriesIndex: 0,
        dataIndex: index % length
      });
      // 显示提示框
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: (index + 1) % length
      });
      // 取消高亮指定的数据图形
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index % length
      });
      // 高亮指定的数据图形
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: (index + 1) % length
      });
      index++;
      me.showCity.name = data.features[index % length].properties.name;
      me.showCity.index = index % length;
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
            shadowOffsetY: 15
          }
        }
      },
      series: [
        {
          type: "map",
          roam: false,
          scaleLimit: {
            max: 1.1,
            min: 1.1
          },

          label: {
            normal: {
              show: true,
              formatter({ data }) {
                return data.name + '\n' + "{icon|" + ' ' + "}";
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
                      image: `${require("../../../public/static/img/imgs/fanzha/icon_mappoint.png")}`
                    }
                  }
                }
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
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>