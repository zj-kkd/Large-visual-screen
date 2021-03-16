<template>
  <div class="com-zj-map">
    <div class="zj-map" ref="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.com-zj-map {
  display: flex;
  width: 100%;
  height: 300rem;
  overflow: hidden;
  .zj-map {
    width: 100%;
    height: 100%;
    background-image: url("../../../public/static/img/imgs/home_img_mapbg.png");
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>

<script>
import data from "echarts/map/json/province/zhejiang.json";
export default {
  props: ["mapData"],
  data() {
    return {
      timer: null
    };
  },
  mounted() {
    const chart = this.$echarts.init(this.$refs.map);
    if (data) {
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
      };
      this.timer = setInterval(fn, 3000);

      chart.on("mousemove", function(e) {
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
      // 地区、坐标、数据
      const coord = data.features.map(val => {
        for (let i = 0; i < this.mapData.length; i++) {
          if (this.mapData[i].name == val.properties.name) {
            return {
              name: val.properties.name,
              value: [val.properties.cp[0], val.properties.cp[1] - 0.15].concat(
                this.mapData[i].value
              )
            };
          }
        }
      });

      this.$echarts.registerMap("zhejiang", data);
      let option = {
        tooltip: {
          confine: true,
          trigger: "item",
          backgroundColor: "rgba(0,101,153,.5)",
          borderColor: "rgba(1, 1, 1, 0)",
          // padding: [10, 20],
          borderWidth: 1,
          // position: [20, 20],
          formatter: function(params) {
            return `
            <div style=" padding: 0px 10px">
                <p style="font-size: 12px">${params.name}</p>
                <p style="font-size: 12px">机房数:  ${params.data.value[2]}</p>
                <p style="font-size: 12px">接入企业数:  ${params.data.value[3]}</p>
            </div>
            `;
          }
        },

        geo: {
          map: "zhejiang",
          zoom: 1.1,
          roam: false,
          itemStyle: {
            normal: {
              //   shadowColor: "#053f40",
              //   shadowOffsetX: 5,
              //   shadowOffsetY: 15
            }
          }
        },
        series: [
          {
            type: "map",
            roam: false,
            scaleLimit: {
              max: 1.1,
              min: 1
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10,
                  color: "rgba(255, 255, 255, .3)"
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
                borderColor: "#356e8f",
                borderWidth: 1,
                areaColor: "#061f3d"
              },
              emphasis: {
                areaColor: "#09437a",
                borderColor: "#356e8f",
                borderWidth: 1
              }
            },
            zoom: 1.1,
            map: "zhejiang",
            data: coord
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            showEffectOn: "render",
            symbolSize: 3,
            rippleEffect: {
              period: 0,
              scale: 0,
              brushType: "fill"
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: "#4bf5d0",
                shadowBlur: 10
              }
            },
            data: coord
          },
          {
            type: "bar",
            coordinateSystem: "geo",
            showEffectOn: "render",
            symbolSize: 3,
            rippleEffect: {
              period: 0,
              scale: 0,
              brushType: "fill"
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: "#4bf5d0",
                shadowBlur: 10
              }
            },
            data: coord
          }
        ]
      };
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>