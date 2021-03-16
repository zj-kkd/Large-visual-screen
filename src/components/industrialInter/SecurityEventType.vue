<template>
  <div class="com-device-qty">
    <div class="fanzha-title">
      <p>{{type.name}}</p>
    </div>
    <div class="chart">
      <div class="chart-pie" ref="chart"></div>
      <div class="label">
        <li v-for="(item, index) in chartData.slice(1)" :key="index">
          <span class="point" :style="{backgroundColor: colorList[index]}"></span>
          <span class="name">{{item.name}}</span>
          <span class="value">{{item.value + '%'}}</span>
          <span class="line"></span>
        </li>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-device-qty {
  width: 100%;
  .chart {
    width: 100%;
    height: 250rem;
    display: flex;
    .chart-pie {
      width: 40%;
      height: 100%;
    }
    .label {
      width: 100%;
      height: 100%;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      padding: 20rem 30rem;
      li {
        padding: 0 10rem;
        position: relative;
        margin: 6rem 0;
        width: 100%;
        color: rgba(179, 179, 179, 1);
        display: flex;
        justify-content: center;
        height: 25rem;
        background: rgba(36, 52, 79, 0.4);
        border-bottom: 1px solid rgba(149, 149, 149, 0.3);
        line-height: 25rem;
        .point {
          width: 12rem;
          height: 9rem;
          margin-top: 8rem;
        }
        .name {
          padding-left: 10rem;
          text-align: left;
          flex: 1;
        }
        .value {
          text-align: right;
          width: 20%;
        }
        .line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 6rem;
          height: 1rem;
          background: rgba(149, 151, 153, 1);
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: ["chartData", "type"],
  watch: {
    showLabel(a, b) {
      if (a !== b) {
        this.initChart();
      }
    },
  },
  data() {
    return {
      colorList: ["#3d6981", "#545180", "#3e6b72", "#686b57", "#455d80"],
      showLabel: true,
    };
  },

  methods: {
    initChart() {
      let me = this;
      const chart = this.$echarts.init(this.$refs.chart);
      chart.on("mousemove", (e) => {
        me.showLabel = false;
      });
      chart.on("mouseout", (e) => {
        me.showLabel = true;
      });
      let tooltip = this.$chartConfig.tooltip[0];
      let option = {
        // tooltip,
        //   legend: {
        //     backgroundColor: 'red',
        //     orient: "vertical",
        //     icon: "pin",
        //     top: "center",
        //     left: '40%',
        //     height: "100%",
        //     itemWidth: 10,
        //     itemHeight: 5,
        //     itemGap: 8,
        //     textStyle: {
        //       color: "rgba(255, 255, 255, 0.6)",
        //       fontSize: "10 ",
        //       rich: {
        //         name: {
        //           padding: [0, 10, 0, 5],
        //           align: "left",
        //         },
        //         value: {
        //           padding: [0, 10, 0, 10],
        //           align: "right",
        //         },
        //       },
        //     },
        //     formatter(name) {
        //       let data = option.series[0].data;
        //       let num = 0;
        //       let cur_nums = 0;
        //       let rate = 0;
        //       for (let i = 0; i < data.length; i++) {
        //         if (name == data[i].name) {
        //           cur_nums = data[i].value;
        //           rate = data[i].rate;
        //         }
        //       }
        //       num = "{name|" + name + "}" + "{value|" + rate + '%' + "}";
        //       return num;
        //     },
        //   },
        series: [
          {
            name: this.type.name1,
            type: "pie",
            radius: ["50%", "85%"],
            roseType: this.type.type,
            itemStyle: {
              borderColor: "rgba(255, 255, 255, .2)",
              borderWidth: 1,
            },

            label: {
              normal: {
                show: this.showLabel,
                position: "center",
                color: "rgba(204, 204, 204, 1)",
                fontSize: 12,
                lineHeight: 16,
                formatter: function (e) {
                  return "总数" + "\n" + me.chartData[0].value;
                },
              },
              emphasis: {
                show: true,
                formatter: function (e) {
                  return `\n${e.data.name + "\n" + e.data.value + "%"}`;
                },
                position: "center",
                textStyle: {
                  fontSize: 12,
                  color: "rgba(204, 204, 204, 1)",
                  fontWeight: "normal",
                  lineHeight: 16,
                },
              },
            },

            color: this.colorList,
            center: ["50%", "50%"],
            data: this.chartData.slice(1),
          },
        ],
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