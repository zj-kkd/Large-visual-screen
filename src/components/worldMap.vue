<template>
  <div class="com-weiwen" id="container" ref="container"></div>
</template>

<style lang="scss" scoped>
.com-weiwen {
  width: 100%;
  height: 100vh;
}
</style>
<script>
import data from 'echarts/map/json/province/zhejiang.json';
export default {
  mounted() {
    const chart = this.$echarts.init(document.getElementById("container"));
        if (data) {
          const coord = data.features.map(val => {
            return {
              name: val.properties.name,
              value: val.properties.cp
            };
          });

          const lines_coord = [];

          coord.forEach((v, index) => {
            index > 0 &&
              lines_coord.push({
                coords: [v.value, coord[0].value]
              });
          });
          console.log(22222, lines_coord)

          this.$echarts.registerMap("zhejiang", data);
          const option = {
            title: {
              text: "浙江省"
            },
            geo: {
              map: "zhejiang",
              zlevel: 10,
              show: true,
              layoutCenter: ["50%", "50%"],
              roam: false,
              layoutSize: "90%",
              zoom: 1,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12,
                    color: "#43D0D6"
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#062031",
                  borderWidth: 1.1,
                  borderColor: "#43D0D6"
                }
              },
              emphasis: {
                areaColor: "#FFB800",
                label: {
                  show: false
                }
              }
            },
            series: [
              {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 15,
                symbolSize: 50,
                rippleEffect: {
                  period: 4,
                  brushType: "stroke",
                  scale: 4
                },
                itemStyle: {
                  color: "#FFB800",
                  opacity: 1
                },
                data: coord.slice(1)
              },
              {
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 15,
                symbolSize: 12,
                rippleEffect: {
                  period: 6,
                  brushType: "stroke",
                  scale: 8
                },
                itemStyle: {
                  color: "#FF5722",
                  opacity: 1
                },
                data: coord.slice(0, 1)
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
                    color: "red"
                  }
                },
                data: lines_coord
              }
            ]
          };
          chart.setOption(option);
        }
  }
};
</script>