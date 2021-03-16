<template>
  <div class="data_S">
    <div class="fanzha-title">
      <p>企业分布</p>
    </div>
    <div class="title-tab-btn">
      <strong>≥</strong>
      <span :class="isCheck == '0'? 'active': '' " @click="changeTab('0')">Ⅰ</span>
      <span :class="isCheck == '1'? 'active': '' " @click="changeTab('1')">Ⅱ</span>
      <span :class="isCheck == '2'? 'active': '' " @click="changeTab('2')">Ⅲ</span>
      <span :class="isCheck == '3'? 'active': '' " @click="changeTab('3')">Ⅳ</span>
      <span :class="isCheck == '4'? 'active': '' " @click="changeTab('4')">Ⅴ</span>
    </div>
    <div class="chart_top" ref="chart_top"></div>
    <div class="chart_bottom" ref="chart_bottom">
      <div class="item">
        <AutoChart :chartData="chartData1[0].slice(1)" :type="'地市'"></AutoChart>
      </div>
      <div class="item">
        <AutoChart :chartData="chartData1[1].slice(1)" :type="'机房'"></AutoChart>
      </div>
      <div class="item">
        <AutoChart :chartData="chartData1[2].slice(1)" :type="'接入商'"></AutoChart>
      </div>
      <div class="item">
        <AutoChart :chartData="chartData1[3].slice(1)" :type="'行业'"></AutoChart>
      </div>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.data_S {
  height: 50vh;
  .fanzha-title {
    width: 100%;
  }
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  position: relative;
  width: 100%;
  .title-tab-btn {
    strong {
      font-weight: normal;
      font-size: 18rem;
      line-height: 10rem;
      color: #8a8a8a;
    }
  }
  .chart_top {
    width: 100%;
    height: 40%;
  }
  .chart_bottom {
    width: 100%;
    height: 45%;
    margin-top: 20rem;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      height: 50%;
    }
  }
}
</style>

<script>
import AutoChart from "../dataSecurity/AutoChart";
export default {
  components: { AutoChart },
  props: ["chartData"],
  data() {
    return {
      colorList: ["#3c475b", "#566175", "#768195"],
      colorList1: [
        "#7374bb",
        "#c18e6e",
        "#b8b96d",
        "#c7666e",
        "#50bfaf",
        "#207d93",
        "#ffa12f",
        "#ffdf3a",
        "#006aef",
        "#00d4fc",
        "#00fffd",
      ],
      isCheck: "0",
      chartData1: [],
    };
  },

  methods: {
    changeTab(e) {
      this.isCheck = e;
      this.initChart();
    },
    initChart() {
      let fontColor = "rgba(255, 255, 255, .5)";
      let lineColor = "#1c2844";

      let chart = this.$echarts.init(this.$refs.chart_top);

      let {
        axisLabel,
        axisLine,
        axisTick,
        splitLine,
        nameTextStyle,
      } = this.$chartConfig.lineStyle;

      let tooltip = this.$chartConfig.tooltip[0];

      let option = {
        grid: {
          left: "10",
          right: "12%",
          top: "25%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip,

        legend: {
          data: ["个人信息", "知识产权", "其他"],
          // orient: "vertical",
          right: 0,
          top: "6%",
          itemGap: 15,
          icon: "rect",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "rgba(255, 255, 255, .5)",
            rich: {
              name: {
                fontSize: 10,
                width: 50,
                height: 10,
                align: "left",
              },
              value: {
                width: 40,
                height: 10,
                fontSize: 10,
                align: "right",
              },
            },
          },
          // formatter(name) {
          //   let data = option.series[0].data;
          //   let allData = data.reduce((prev, item) => +item.value + +prev, 0);
          //   let num = 0;
          //   num = "{name|" + name + "}" + "{value|" + allData + "}";
          //   return num;
          // }
        },

        xAxis: [
          {
            name: "等级",
            nameTextStyle,

            type: "category",
            // boundaryGap: true,
            // boundaryGap: ['10%', '10%'],
            axisLabel: {
              interval: 0,
              color: fontColor,
              fontSize: 10,
            },
            axisLine,
            axisTick,
            splitLine,
            data: this.chartData.type1
              .map((item) => item.name)
              .slice(this.isCheck),
          },
        ],
        yAxis: [
          {
            name: "数量",
            nameTextStyle,
            type: "value",
            axisLabel,
            axisLine,
            axisTick,
            splitLine,
          },
        ],
        series: [
          {
            name: "个人信息",
            type: "bar",
            stack: "总量",
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: this.colorList[2],
              },
            },
            data: this.chartData.type1.slice(this.isCheck),
          },
          {
            name: "知识产权",
            type: "bar",
            stack: "总量",
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: this.colorList[1],
              },
            },
            data: this.chartData.type2.slice(this.isCheck),
          },
          {
            name: "其他",
            type: "bar",
            stack: "总量",
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: this.colorList[0],
              },
            },
            data: this.chartData.type3.slice(this.isCheck),
          },
        ],
      };

      chart.setOption(option, true);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
  },

  mounted() {
    this.initChart();
  },

  created() {
    this.chartData1 = [
      this.$store.state.dataSecurityData.major_data_source_internet,
      this.$store.state.dataSecurityData.major_data_source_engine_room,
      this.$store.state.dataSecurityData.major_data_source_access_provider,
      this.$store.state.dataSecurityData.major_data_source_industry,
    ];

    console.log(9998877, this.chartData1)
  },
};
</script> 