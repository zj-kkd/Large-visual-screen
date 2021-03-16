<template>
  <div class="com-ICP">
    <div id="ICPCharts" ref="ICPCharts"></div>
    <div id="ICPTop" ref="ICPTop"></div>
  </div>
</template>

<style lang="scss" scoped>
.com-ICP {
  width: 100%;
  #ICPCharts {
    width: 100%;
    height: 100px;
  }
  #ICPTop {
    width: 100%;
    height: 230px;
    margin-bottom: 10px;
  }
}
</style>
<script>
export default {
  props: ["title", "ICPData"],
  mounted() {
    const ICPCharts = this.$echarts.init(document.getElementById("ICPCharts"));
    const ICPTop = this.$echarts.init(document.getElementById("ICPTop"));
    let ICPData = this.ICPData;
    let option = {
      color: ["#74fbc2", "#253440"],
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        itemGap: 15,
        right: "5%",
        icon: "none",
        top: "center",
        itemWidth: 10,
        itemHeight: 5,
        borderRadius: 10,
        textStyle: {
          rich: {
            a: {
              width: 170,
              padding: [3, 0, 5, 0],
              backgroundColor: "#4E7E7A",
              lineHeight: 20,
              color: "#FFF",
              borderRadius: 3,
              align: "center"
            },
            b: {
              width: 170,
              padding: [3, 0, 5, 0],
              backgroundColor: "#243441",
              color: "#A0A0A0",
              borderRadius: 3,
              align: "center"
            }
          }
        },
        formatter(name) {
          if (name == ICPData[0].name) {
            return `{a|${name}}`;
          }
          return `{b|${name}}`;
        }
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "80%"],
          center: ["55", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderWidth: "2",
            borderColor: "#0b1420"
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: false
            }
          },
          labelLine: {
            show: false
          },
          data: ICPData.slice(0, 2)
        }
      ],
      graphic: {
        elements: [
          {
            type: "image",
            left: "28",
            top: "22%",
            z: 100,
            style: {
              width: 55,
              height: 55,
              image: require("../../../public/static/img/charts_img/circle.png")
            }
          }
        ]
      }
    };
    let option1 = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        top: 20,
        bottom: 0,
        left: "25%",
        right: '3%'
      },
      legend: {
        data: ["ICP许可数量"]
      },
      xAxis: {
        show: false,
        type: "value",
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: "category",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#739B9C",
            fontSize: 12,
            rich: {
              a: {
                padding: [0, 0, 0, 0],
                width: 15,
                height: 15,
                fontSize: 10,
                backgroundColor: "#2b4e5a",
                align: "center"
              }
            }
          },
          formatter(e) {
            let top = ICPData[2].cityList
              .map(item => item.name)
              .reverse()
              .findIndex(item => item == e);
            return `{a| ${top + 1 + ' '}}  ${e} `;
          }
        },
        data: ICPData[2].cityList.map(item => item.name).reverse()
      },
      series: [
        {
          name: "2011年",
          type: "bar",
          barWidth: 10,
          data: ICPData[2].cityList.reverse(),
          itemStyle: {
            color: "#508581"
          },
          label: {
            show: true,
            position: "right",
            textStyle: {
              color: "#739B9C",
              fontSize: "11"
            },
            formatter({ value }) {
              return (
                (
                  (value /
                    ICPData[2].cityList
                      .map(item => item.value)
                      .reduce((cur, num) => +cur + +num)) *
                  100
                ).toFixed(2) + "%"
              );
            }
          }
        }
      ]
    };

    ICPCharts.setOption(option);
    ICPTop.setOption(option1);
    window.addEventListener("resize", () => {
      ICPCharts.resize();
      ICPTop.resize();
    });
  }
};
</script>