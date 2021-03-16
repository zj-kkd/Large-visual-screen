<template>
  <div class="com-icp">
    <div class="charts" ref="charts"></div>
  </div>
</template>
<style lang="scss" scoped>
.com-icp {
  width: 100%;
  .charts {
    margin-top: 20rem;
    width: 100%;
    height: 110rem;
  }
}
</style>
<script>
export default {
  props: ["chartData", "color", "max"],
  mounted() {
    console.log(this.chartData, this.color, this.max)
    const charts = this.$echarts.init(this.$refs.charts);
    let me = this;
    let data = this.chartData;
    let titleArr = [],
      seriesArr = [];
    let colors = this.color;
    data.forEach(function(item, index) {
      titleArr.push({
        text: item.name,
        left: index * 35 + 13 + "%",
        top: "80%",
        textAlign: "center",
        textStyle: {
          fontWeight: "normal",
          fontSize: "12",
          color: "rgba(255, 255, 255, .5)",
          textAlign: "center"
        }
      });
      seriesArr.push({
        name: item.name,
        type: "pie",
        clockWise: false,
        radius: [27, 30],
        itemStyle: {
          normal: {
            color: colors[index][0],
            shadowColor: colors[index][0],
            shadowBlur: 0,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        center: [index * 35 + 14 + "%", "42%"],
        data: [
          {
            value: item.value,
            label: {
              normal: {
                padding: [5, 0, 0, 0],
                textStyle: {
                  fontWeight: "normal",
                  color: "#fff",
                  fontSize: 15,
                  lineHeight: 20,
                  rich: {
                    title: {
                      fontSize: 15,
                      align: "center",
                      color: "#fff",
                    },
                    add: {
                      fontSize: 12,
                      height: 12,
                      lineHeight: 15,
                      color: 'rgb(227, 219, 79)',
                    },
                    icon: {
                      width: 9,
                      height:9,
                      backgroundColor: {
                        image: `${require("../../../public/static/img/icons/icon_add.png")}`
                      },
                    }
                  }
                },
                formatter: function(params) {
                  if ( item.add) {
                    return (
                      "{title|" +
                      params.value +
                      "}" +
                      "\n" +
                      "{icon|" +
                      "}" +
                      "{add|" + ' ' + 
                      item.add +
                      "}"
                    );
                  } else {
                    return params.value
                  }
                },
                position: "center",
                show: true
              }
            }
          },
          {
            value: me.max - item.value,
            name: "invisible",
            itemStyle: {
              normal: {
                color: colors[index][1]
              },
              emphasis: {
                color: colors[index][1]
              }
            }
          }
        ]
      });
    });

    let option = {
      title: titleArr,
      series: seriesArr
    };
    charts.setOption(option);
    window.addEventListener("resize", () => {
      charts.resize();
    });
  }
};
</script>