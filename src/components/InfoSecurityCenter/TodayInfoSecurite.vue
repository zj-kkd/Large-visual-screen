<template>
  <div class="unhealthy-info">
    <div class="chart2" ref="chart2"></div>
  </div>
</template>

<style lang="scss" scoped>
.unhealthy-info {
  height: 300rem;
  width: 100%;
  font-size: 13rem;
  .chart2 {
    width: 100%;
    height: 100%;
  }
}
</style>
<script>
export default {
  props: ["chartData"],

  mounted() {
    console.log(999999999, this.chartData)
    let colorList = [
       "#c62b30",
      "#6c7374",
      "#bfa29c",
      "#ca8438",
      "#72a284",
      "#91c8ae",
      "#d77f6d",
      "#61a2a7",
      "#2e4554",
    ];
    const chart2 = this.$echarts.init(this.$refs.chart2);
    let option2 = {
      tooltip: this.$store.state.tooltip[0],
      title: {
        text: `${this.chartData
          .map(item => item.value)
          .reduce((prev, item) => prev + item, 0)}`,
          top: 'center',
          left: 'center',
          textStyle: {
            fontWeight: "normal",
          color: "#739B9C",
          fontSize: 15
          }
      },
    
      series: [
        {
          name: "事件类型",
          // minShowLabelAngle: 20,
          startAngle: 120,
          avoidLabelOverlap: true,
          type: "pie",
          radius: ["25%", "55%"],
          center: ["50%", "50%"],
          roseType: "radius",
          label: {
            show: true,
            textStyle: {
              rich: {
                title: {
                  fontSize: 11
                },
                icon: {
                  width: 10,
                  height: 10,
                  backgroundColor: {
                    image: `${require("../../../public/static/img/icons/icon_add.png")}`
                  }
                },
                num: {
                  fontSize: 11
                }
              }
            },
            formatter: function(e) {
              return (
                "{title|" +
                e.data.name +
                "}" +
                "\n" +
                "{num|" +
                e.data.value +
                "}" +
                "  " +
                "{icon|" +
                "   " +
                "}" +
                "{num|" + ' '
                +
                e.data.add + 
                "}" + '\n' + 
                "{num|" +
                e.data.rate + "%" +
                "}"
              );
            }
          },
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList[params.dataIndex];
              }
            }
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: this.chartData.map(item => {
            return { value: item.value, name: item.name, add: item.add, rate: item.rate };
          })
        }
      ]
    };
    chart2.setOption(option2);
    window.addEventListener("resize", () => {
      chart2.resize();
    });
  }
};
</script>