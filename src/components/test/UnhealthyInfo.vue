<template>
  <div class="unhealthy-info">
    <div class="chart2" ref="chart2"></div>
  </div>
</template>

<style lang="scss" scoped>
.unhealthy-info {
  background-color: #fff;
  // overflow: hidden;
  height: 250rem;
  width: 100%;
  .chart2 {
    background-color: #fff;
    width: 100%;
    height: 100%;
  }
}
</style>
<script>
export default {
  props: ["chartData"],

  mounted() {
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
      series: [
        {
          name: "不良信息",
          // minShowLabelAngle: 20,
          startAngle: 120,
          avoidLabelOverlap: true,
          type: "pie",
          radius: ["20%", "55%"],
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
                  width: 12,
                  height: 12,
                  backgroundColor: {
                    image: `${require("../../../public/static/img/icons/icon_add.png")}`
                  }
                },
                num: {
                  fontSize: 11
                }
              }
            },
            formatter: function({ data }) {
              return (
                "{title|" +
                data.name +
                "}" +
                "\n" +
                "{num|" +
                data.value +
                "}" +
                "  " +
                "{icon|" +
                " " +
                "}" +
                "{num|" +
                data.add +
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
            return { value: item.value, name: item.name, add: item.add };
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