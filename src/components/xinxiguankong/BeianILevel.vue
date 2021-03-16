<template>
<!-- 定级备案 -->
  <div class="com-device-qty">
    <div class="chart">
      <div class="chart-pie" ref="chart"></div>
      <div class="label">
        <li v-for="(item, index) in chartData" :key="index">
          <span class="point" :style="{backgroundColor: colorList[index]}"></span>
          <span class="name">{{item.name}}</span>
          <span class="value">{{item.value + '件'}}</span>
          <span class="rate">{{item.rate + '%'}}</span>
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
    height: 180rem;
    padding: 0 10rem;
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
      padding-left: 20rem;
      li {
        position: relative;
        margin: 6rem 0;
        width: 100%;
        color: rgba(179, 179, 179, 1);
        display: flex;
        justify-content: center;
        height: 15rem;
        // background: rgba(36, 52, 79, 0.4);
        line-height: 25rem;
        .point {
          width: 12rem;
          height: 9rem;
          margin-top: 8rem;
        }
        .name {
          padding-left: 10rem;
          text-align: left;
        //   flex: 1;
        width: 40%;
        }
        .value {
            width: 40%;
        }
        .rate {
            width: 30%;
            text-align: right;
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
    //   chart.on("mousemove", (e) => {
    //     me.showLabel = false;
    //   });
    //   chart.on("mouseout", (e) => {
    //     me.showLabel = true;
    //   });
      let tooltip = this.$chartConfig.tooltip[0];
      let option = {
       
        series: [
          {
            type: "pie",
            radius: ["30%", "70%"],
            roseType: '',
            itemStyle: {
              borderColor: "rgba(255, 255, 255, .2)",
              borderWidth: 1,
            },
            label: {
                show: false
            },
            color: this.colorList,
            center: ["45%", "50%"],
            data: this.chartData,
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