<template>
  <div class="com-industrial-inter">
    <div class="fanzha-title">
      <p>工业互联网行业数据</p>
    </div>
    <div class="top">
      <ul>
        <li v-for="item in chartData[0]" :key="item.name">
          <span class="name">{{item.name}}</span>
          <span class="value">{{item.value}}</span>
        </li>
      </ul>
      <div class="bg">
        <div class="data animate-left" :style="{width: (chartData[0][0].value/chartData[0][1].value) * 100 + '%'}"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="chart" ref="chart"></div>
      <div class="label">
        <li v-for="(item, index) in chartData[1].slice(1)" :key="index">
          <div class="color" :style="{backgroundColor: colorList[index]}"></div>
          <p>
            <span>{{item.name}}</span>
            <span>{{item.value + '%'}}</span>
          </p>
        </li>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-industrial-inter {
  margin-top: 15rem;
  width: 100%;
  color: rgba(204, 204, 204, 1);
  .top {
    padding: 0 15rem;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        .name {
          font-size: 16rem;
          margin-right: 10rem;
        }
        .value {
          font-size: 20rem;
          color: $blue3;
        }
      }
    }
    .bg {
        overflow: hidden;
        position: relative;
      margin-top: 15rem;
      width: 100%;
      height: 14rem;
      background-color: rgba(23, 76, 101, 0.5);
      .data {
        background-color: $blue3;
        height: 100%;
      }
    }
  }

  .bottom {
    width: 100%;
    height: 200rem;
    display: flex;
    .chart {
      width: 30%;
      height: 100%;
    }
    .label {
      padding-left: 10rem;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      li {
        margin: 10rem 0;
        display: flex;
        width: 33%;
        font-size: 13rem;
        p {
          flex: 1;
          span {
            display: block;
            line-height: 20rem;
          }
        }
        .color {
          margin-right: 5rem;
          margin-top: 5rem;
          width: 10rem;
          height: 10rem;
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: ["chartData"],
  data() {
    return {
      colorList: [
        "#f09255",
        "#ba5664",
        "#826a9c",
        "#c4ccd4",
        "#4774ba",
        "#4e9ead",
      ],
    };
  },
  methods: {
    initChart() {
      let me = this;
      let tooltip = this.$chartConfig.tooltip;
      let chart = this.$echarts.init(this.$refs.chart);
      var data = [];
      for (var i = 0; i < this.chartData[1].slice(1).length; i++) {
        data.push(
          {
            value: this.chartData[1].slice(1)[i].value,
            name: this.chartData[1].slice(1)[i].name,
            itemStyle: {
              normal: {
                borderWidth: 3,
                shadowBlur: 0,
                borderColor: this.colorList[i],
                shadowColor: this.colorList[i],
              },
            },
          },
          {
            value: 3,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
      }
      var seriesOption = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: ["82%", "85%"],
          center: ["50%", "50%"],
          hoverAnimation: false,
          label: {
            normal: {
              padding: [5, 0, 0, 0],
              textStyle: {
                fontWeight: "normal",
                color: "rgba(204, 204, 204, 1)",
                fontSize: 13,
                lineHeight: 20,
              },
              formatter: function () {
                return `总数\n${me.chartData[1][0].value}`;
              },
              position: "center",
              show: true,
            },
          },
          data: data,
        },
      ];
      let option = {
        color: this.colorList,

        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: require("../../../public/static/img/imgs/fanzha/img_tjtcircle.png"),
                width: this.$chartConfig.getRem(80),
                height: this.$chartConfig.getRem(80),
              },
              left: "center",
              top: "center",
            },
          ],
        },
        legend: {
          show: false,
        },
        series: seriesOption,
      };
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
  },
  mounted() {
    this.initChart();
  },
};
</script> 