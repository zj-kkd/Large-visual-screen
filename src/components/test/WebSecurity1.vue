<template>
  <div class="com-web-security">
      <div class="chart1" ref="chart1"></div>
  </div>
</template>

<style lang="scss" scoped>
.com-web-security {
  width: 100%;
  height: 200rem;
    .chart1 {
      width: 100%;
      height: 100%;
    }
}
</style>
<script>
export default {
props: ['type', 'chartData'],

  mounted() {
    let colorList1 = ["#7b645c", "#3b616e", "#284f4c", "#505d65"];
    const chart1 = this.$echarts.init(this.$refs.chart1);
    let option = {
      title: {
        textAlign: "center",
        text: `${this.type}\n${this.chartData.reduce((prev, item) => prev + item.value, 0)}件`,
        left: "49%",
        top: "40%",
        textStyle: {
          fontSize: 11,
          color: "#f7f7f7",
          lineHeight: 15,
          fontWeight: "normal"
        }
      },
      tooltip: this.$store.state.tooltip[0],

      series: [
        {
          hoverAnimation: false,
          type: "pie",
          avoidLabelOverlap: true,
          startAngle: 90,
          radius: ["40%", "50%"],
          center: ["50%", "center"],
          label: {
            position: "outer",
            alignTo: "edge",
            margin: "10%",
            show: true,
            textStyle: {
              rich: {
                title: {
                  fontSize: 10,
                  color: "#f7f7f7"
                },
                icon: {
                  width: 12,
                  height: 12,
                  backgroundColor: {
                    image: `${require("../../../public/static/img/icons/icon_add.png")}`
                  }
                },
                num: {
                  lineHeight: 15,
                  fontSize: 11,
                  color: "#f7f7f7"
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
                "件" +
                "}" +
                "\n" +
                "{num|" +
                data.rate  + "%" +
                "}" +
                "{icon|" +
                " " +
                "}" +
                "{num|" +
                (data.add || '') +
                "}"
              );
            }
          },
          data: this.chartData,
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList1[params.dataIndex];
              }
            }
          }
        },
      ]
    };
    chart1.setOption(option);
    window.addEventListener("resize", () => {
      chart1.resize();
    });
  }
};
</script>