<template>
  <div class="com-visittop" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="chart" ref="chart"></div>
    <div class="x">访问量</div>
    <div class="ctrl">
      <p class="tab-bar-2">
        <span :class="tab == 'left' ? 'active': ''" @click="showChart('left')">本省接入网站访问排名</span>
        <span :class="tab == 'right' ? 'active': ''" @click="showChart('right')">本省主体网站访问排名</span>
      </p>
      <ul>
        <li>
          <img
            @click="showChart('day')"
            :src="require(`../../../public/static/img/icons/icon_day_${iconCheck == 'day'? 'click': 'normal'}.png`)"
            alt
          />
        </li>
        <li>
          <img
            @click="showChart('week')"
            :src="require(`../../../public/static/img/icons/icon_week_${iconCheck == 'week'? 'click': 'normal'}.png`)"
            alt
          />
        </li>
        <li>
          <img
            @click="showChart('month')"
            :src="require(`../../../public/static/img/icons/icon_month_${iconCheck == 'month'? 'click': 'normal'}.png`)"
            alt
          />
        </li>
        <li>
          <img
            @click="showChart('quarter')"
            :src="require(`../../../public/static/img/icons/icon_quarter_${iconCheck == 'quarter'? 'click': 'normal'}.png`)"
            alt
          />
        </li>
        <li>
          <img
            @click="showChart('year')"
            :src="require(`../../../public/static/img/icons/icon_year_${iconCheck == 'year'? 'click': 'normal'}.png`)"
            alt
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-visittop {
  padding-top: 20rem;
  height: 350rem;
  width: 100%;
  position: relative;
  .chart {
    width: 100%;
    height: 100%;
  }
  .x {
    position: absolute;
    bottom: 1%;
    right: 0;
    color: #909196;
  }
  .ctrl {
    ul {
      position: absolute;
      top: 80rem;
      li {
        img {
          width: 100%;
          height: 100%;
        }
        margin-left: 5rem;
        display: block;
        width: 25rem;
        height: 25rem;
        margin-bottom: 10rem;
      }
    }
    .tab-bar-2 {
      width: 100%;
      position: absolute;
      top: 25rem;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      tab: "left",
      iconCheck: "day",
      chartData: "",
      timer: null
    };
  },
  mounted() {
    this.chartData = this.$store.state.controlData.access_website_visit_day;
    this.initChart();
    this.timer = setInterval(() => {
      if (this.tab == "left") {
        this.showChart("right");
      } else {
        this.showChart("left");
      }
    }, 4000);
  },
  methods: {
    mouseLeave() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.tab == "left") {
          this.showChart("right");
        } else {
          this.showChart("left");
        }
      }, 4000);
    },
    mouseEnter() {
      clearInterval(this.timer);
    },
    showChart(chartType) {
      if (chartType == "left" || chartType == "right") {
        this.tab = chartType;
      } else {
        this.iconCheck = chartType;
      }
      if (this.tab == "left") {
        switch (this.iconCheck) {
          case "day":
            this.chartData = this.$store.state.controlData.access_website_visit_day;
            console.log("left1", this.chartData);
            break;
          case "week":
            this.chartData = this.$store.state.controlData.access_website_visit_week;
            console.log("left2", this.chartData);
            break;
          case "month":
            this.chartData = this.$store.state.controlData.access_website_visit_month;
            console.log("left3", this.chartData);
            break;
          case "quarter":
            this.chartData = this.$store.state.controlData.access_website_visit_quarter;
            console.log("left4", this.chartData);
            break;
          case "year":
            this.chartData = this.$store.state.controlData.access_website_visit_year;
            console.log("left5", this.chartData);
            break;
        }
      } else {
        switch (this.iconCheck) {
          case "day":
            this.chartData = this.$store.state.controlData.main_website_visit_day;
            break;
          case "week":
            this.chartData = this.$store.state.controlData.main_website_visit_week;
            break;
          case "month":
            this.chartData = this.$store.state.controlData.main_website_visit_month;
            break;
          case "quarter":
            this.chartData = this.$store.state.controlData.main_website_visit_quarter;
            break;
          case "year":
            this.chartData = this.$store.state.controlData.main_website_visit_year;
            break;
        }
      }
    },
    initChart() {
      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine
      } = this.$chartConfig.lineStyle;
      let chart = this.$echarts.init(this.$refs.chart);
      let option = {
        grid: {
          left: "14%",
          right: "13%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: false
          },
          axisLine,
          axisTick,
          splitLine
        },
        yAxis: {
          data: this.chartData.map(item => item.name),
         axisLabel,
          axisLine,
          axisTick,
          splitLine,
          type: "category"
        },
        series: [
          {
            barWidth: 10,
            name: "访问量",
            type: "bar",
            itemStyle: {
              color: "#214b5d"
            },
            data: this.chartData,
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#a7a7a9"
              }
            }
          }
        ]
      };
      chart.setOption(option, true);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  },
  watch: {
    chartData(a, b) {
      if (a !== b) {
        this.initChart();
      }
    }
  }
};
</script>