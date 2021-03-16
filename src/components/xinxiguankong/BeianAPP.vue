<template>
<!-- app备案 -->
  <div class="com-icp">
    <div class="charts" ref="charts_icp"></div>
  </div>
</template>
<style lang="scss" scoped>
.com-icp {
  width: 100%;
  .charts {
    width: 100%;
    height: 180rem;
  }
}
</style>
<script>
export default {
  props: ["chartData"],

  mounted() {

    const charts_icp = this.$echarts.init(this.$refs.charts_icp);
    var data = this.chartData;

    var titleArr = [],
      seriesArr = [];
    let colors = [
      ["#397870", "#2f3535"],
      ["#83472b", "#2f3535"],
      ["#ffc257", "#2f3535"],
    ];
    data.forEach(function (item, index) {
      titleArr.push({
        text: item.name,
        left: index * 35 + 13 + "%",
        top: "75%",
        textAlign: "center",
        textStyle: {
          fontWeight: "normal",
          fontSize: "13",
          color: "#B3B3B3",
          textAlign: "center",
        },
      });
      if (index !== 2) {
        seriesArr.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: [34, 40],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          center: [index * 35 + 14 + "%", "45%"],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value;
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "13",
                    color: "#fff",
                  },
                },
              },
            },
            {
              value: data[0].value + data[1].value - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: colors[index][1],
                },
                emphasis: {
                  color: colors[index][1],
                },
              },
            },
          ],
        });
      } else {
        seriesArr.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: [34, 40],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          center: [index * 35 + 14 + "%", "45%"],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + "%";
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "16",
                    color: "#fff",
                  },
                },
              },
            },
            {
              value: 100 - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: colors[index][1],
                },
                emphasis: {
                  color: colors[index][1],
                },
              },
            },
          ],
        });
      }
    });

    let option = {
      title: titleArr,
      series: seriesArr,
    };
    charts_icp.setOption(option);
    window.addEventListener("resize", () => {
      charts_icp.resize();
    });
  },
};
</script>