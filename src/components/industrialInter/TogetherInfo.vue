<template>
  <div class="com-together-info">
    <div class="fanzha-title">
      <p>协同联动信息</p>
    </div>
    <div class="top">
      <li v-for="(item, index) in chartData[0]" :key="index">
        <div class="icon">
          <img
            class="rotate"
            :src="require(`../../../public/static/img/icons/${iconUrl[4]}.png`)"
            alt
          />
          <img
            class="icon-item"
            :src="require(`../../../public/static/img/icons/${iconUrl[index]}.png`)"
            alt
          />
        </div>
        <div class="info">
          <p>{{item.name}}</p>
          <p>{{item.value.toLocaleString()}}</p>
        </div>
      </li>
    </div>
    <div class="chart-line" ref="chart"></div>
  </div>
</template>
<style lang="scss" scoped>
.com-together-info {
  width: 100%;
  margin-top: 15rem;
  .top {
    margin-left: 15rem;
    padding: 15rem 15rem 30rem 0;
    width: 100%;
    height: 200rem;
    display: flex;
    flex-wrap: wrap;
    color: rgba(204, 204, 204, 1);
    font-size: 16rem;
    border-bottom: 1rem dashed rgba(74, 90, 116, 1);
    li {
      display: flex;
      width: 50%;
      margin: 18rem 0;
      .icon {
        position: relative;
        height: 44rem;
        width: 44rem;
        margin-right: 15rem;
        .rotate {
          width: 100%;
          animation: rotate 3s infinite linear;
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
        .icon-item {
          position: absolute;
          width: 36rem;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
      .info {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        p {
          width: 100%;
        }
      }
    }
  }
  .chart-line {
    height: 350rem;
    width: 100%;
  }
}
</style>

<script>
export default {
  props: ["chartData"],
  data() {
    return {
      iconUrl: [
        "icon_zhiwen",
        "icon_weixie",
        "icon_loudong",
        "icon_zichan",
        "img_rotate",
      ],
      data2: [
        { name: "基础资源同步指令", value: 100 },
        { name: "基础资源同步指令", value: 100 },
        { name: "基础资源同步指令", value: 100 },
        { name: "基础资源同步指令", value: 100 },
        { name: "基础资源同步指令", value: 100 },
        { name: "基础资源同步指令", value: 100 },
      ],
      data3: [
        { name: "基础资源同步指令", value: 50 },
        { name: "基础资源同步指令", value: 50 },
        { name: "基础资源同步指令", value: 50 },
        { name: "基础资源同步指令", value: 50 },
        { name: "基础资源同步指令", value: 50 },
        { name: "基础资源同步指令", value: 50 },
      ],
    };
  },
  mounted() {
    let chart = this.$echarts.init(this.$refs.chart);
    let {
      axisLabel,
      axisLine,
      axisTick,
      splitLine,
      nameTextStyle,
    } = this.$chartConfig.lineStyle;
    let option = {
      color: ["RGB(1,255,152)", "RGB(244,191,70)"],
      grid: {
        top: "25%",
        left: "5%",
        bottom: "5%",
        right: "5%",
        containLabel: true,
      },
      legend: {
        show: true,
        top: "8%",
        right: "5%",
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 30,
        icon: "rect",
        data: ["已下发数量", "已反馈数量"],
        textStyle: {
          color: "rgba(204, 204, 204, .8)",
          lineHeight: 14,
        },
      },
      xAxis: [
        {
          type: "category",
          data: this.chartData[1].map((item) => item.name),
          axisTick: {
            alignWithLabel: true,
          },
          nameTextStyle: {
            color: "#fff",
          },
          axisLabel: {
            // rotate: "10",
            interval: 0,
            show: true,
            textStyle: {
              color: "rgba(204, 204, 204, .8)",
              fontSize: 12,
              lineHeight: 14,
            },
            formatter: function (params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 2; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
          },
          axisLine,
          axisTick,
          splitLine,
        },
      ],
      yAxis: [
        {
          name: "数量          ",
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
          name: "已下发数量",
          type: "bar",
          barWidth: "10",
          data: this.chartData[1].map((item) => ({
            name: item.name,
            value: item.value[0],
          })),
          itemStyle: {
            normal: {
              borderColor: "rgba(77, 104, 150, .5)",
              borderWidth: "1",
              barBorderRadius: 3,
              color: "rgba(77, 104, 150, .3)",
            },
          },
        },
        {
          name: "已反馈数量",
          type: "bar",
          barWidth: "10",
          data: this.chartData[1].map((item) => ({
            name: item.name,
            value: item.value[1],
          })),
          itemStyle: {
            normal: {
              borderColor: "rgba(205,177,109,0.5)",
              borderWidth: "1",
              barBorderRadius: 3,
              color: "rgba(205,177,109,0.3)",
            },
          },
        },
      ],
    };

    chart.setOption(option);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  },
};
</script> 