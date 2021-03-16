<template>
  <div class="chart" ref="chart"></div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  padding: 40rem;
}
</style>

<script>
export default {
  data() {
    return {
      data: ''
    }
  },
  created() {
    this.data = this.$store.state.infoSecurityData.info_security_enterprise;
  },
  mounted() {
    const chart = this.$echarts.init(this.$refs.chart);
    let colorList = [
      '#964a7d',
      '#852288',
      '#5f3c96',
      '#233f8a',
      '#25788c',
      '#1e7049',
      '#688b24',
      '#8f663b',
      '#8f633e',
      '#925447',
    ];
    let option = {
      angleAxis: {
        type: "category",
        data: this.data.map(item => item.name).reverse(),
        clockwise: false,
        // min: 0,
        // max: 10,
        axisLine: {
          show: false
        },
        axisTick: {
          lineStyle: {
            color: "rgba(95, 111, 139, 1)"
          }
        },
        axisLabel: {
          fontSize: 11,
          color: "#999"
        }
      },
      radiusAxis: {
        axisLabel: {
          show: true,
          margin: 3,
          textStyle: {
            fontSize: 10,
            color: '#999'
          },
          color: "#438b75",
          showMinLabel: false,
          showMaxLabel: true
        },
        splitLine: {
          lineStyle: {
            color: "#2c3642"
          }
        }
      },
      polar: {},
      series: [
        {
          type: "bar",
          data: this.data.map(item => item.value).reverse(),
          coordinateSystem: "polar",
          itemStyle: {
              color: e => colorList.reverse()[e.dataIndex]
          }
        }
      ]
    };

    chart.setOption(option);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  }
};
</script>