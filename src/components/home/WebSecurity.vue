<template>
<!-- 网络安全 -->
  <div class="com-web-security">
    <div class="chart1" ref="chart1"></div>
  </div>
</template>

<style lang="scss" scoped>
.com-web-security {
  width: 100%;
  height: 180rem;
  .chart1 {
    width: 100%;
    height: 100%;
  }
}
</style>
<script>
export default {
  props: ["type", "chartData"],

  mounted() {
    const chart1 = this.$echarts.init(this.$refs.chart1);
    let { getRem } = this.$chartConfig;

    var axisTickLength = 35; //刻度线宽度
    var value = Math.floor(Math.random() * 100);
    var colorRegionRate = (value / 100).toFixed(2);

    var index = value >= 80 ? 0 : value > 30 ? 1 : 2;
    var startColor = ["#f56c6c", "#34da62", "#fed95f"][index];
    var endColor = ["#f44444", "#14a661", "#ff8e02"][index];

    let seriesArr = [];
    let titleArr = [];

    this.chartData.forEach((item, index) => {
      seriesArr.push(
        {
          detail: {
            formatter() {
              return item.rate + "%";
            },
            offsetCenter: [0, "10%"],
            textStyle: {
              color: "#fff",
              fontSize: getRem(13),
            },
          },
          type: "gauge",
          center: [12 + 25 * index + "%", "30%"],
          name: "内部",
          radius: "23%",
          startAngle: "225",
          endAngle: "-45",
          splitNumber: "100",
          pointer: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [
                // 有数值的部分
                [
                  1,
                  new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "rgba(72, 164, 186, .2)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(72, 164, 186, 1)", // 100% 处的颜色
                    },
                  ]),
                ],
                // 底色
                [
                  1,
                  new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "rgb(17, 68, 96)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgb(17, 68, 96)", // 100% 处的颜色
                    },
                  ]),
                ],
              ],
              width: 3,
              opacity: 0.5,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        {
          center: [12 + 25 * index + "%", "30%"],
          type: "gauge",
          name: "外部",
          radius: "35%",
          startAngle: "225",
          endAngle: "-45",
          splitNumber: 4,
          pointer: {
            show: true,
            length: "53%",
          },
          // 仪表盘指针样式。
          itemStyle: {
            color: "rgba(1,1,1,0)",
          },
          data: [
            {
              value: this.chartData[index].value,
            },
          ],
          title: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [
                // 有数值的部分
                [
                  item.rate / 100,
                  new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "rgba(72, 164, 186, .5)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(72, 164, 186, 1)", // 100% 处的颜色
                    },
                  ]),
                ],
                // 底色
                [
                  1,
                  new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: "rgb(17, 68, 96)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgb(17, 68, 96)", // 100% 处的颜色
                    },
                  ]),
                ],
              ],
              width: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          detail: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          animationDuration: 2000,
        }
      );

      titleArr.push({
        text:
          "{title|" +
          item.name +
          "}" +
          "\n" +
          "{title|" +
          item.value +
          "件" +
          "}" +
          "\n" +
          (item.add ? "{icon|" + "}" + "{add|" + " " + item.add + '件' + "}" : ""),
        left: 11 + 25 * index + "%",
        top: "48%",
        textAlign: "center",
        textStyle: {
          fontWeight: "normal",
          color: "#fff",
          fontSize: getRem(15),
          lineHeight: getRem(20),
          rich: {
            title: {
              fontSize: getRem(13),
              align: "center",
              color: "rgba(255, 255, 255, .8)",
            },
            add: {
              fontSize: getRem(13),
              height: getRem(12),
              lineHeight: getRem(13),
              color: "rgb(227, 219, 79)",
            },
            icon: {
              width: getRem(10),
              height: getRem(10),
              backgroundColor: {
                image: `${require("../../../public/static/img/icons/icon_add.png")}`,
              },
            },
          },
        },
      });
    });

    let option = {
      series: seriesArr,
      title: titleArr,
    };
    chart1.setOption(option);
    window.addEventListener("resize", () => {
      chart1.resize();
    });
  },
};
</script>