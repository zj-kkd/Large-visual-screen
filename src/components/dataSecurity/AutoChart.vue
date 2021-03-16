<template>
  <div class="chart" ref="chart"></div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  props: ["chartData", "type"],
  data() {
    return {
      timer: null,
    };
  },
  mounted() {
    let { getRem } = this.$chartConfig;
    let chart = this.$echarts.init(this.$refs.chart);
    let colorList = [
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
    ];
    let me = this;
    // let {
    //   axisLabel,
    //   axisLine,
    //   axisTick,
    //   splitLine,
    //   nameTextStyle,
    // } = this.$chartConfig.lineStyle;

    // let tooltip = this.$chartConfig.tooltip[0];

    // let tipIndex = -1;

    let option = {
      tooltip: {
        //   show: false,
        trigger: "item",
        backgroundColor: "rgba(1, 1, 1, 0)",
        borderColor: "rgba(1, 1, 1, 0)",
        // padding: [10, 20],
        borderWidth: 1,
        position: ["55%", "5%"],
        formatter: function (params) {
          return `
            <div style="background-image: url('${require("../../../public/static/img/imgs/shujuanquan/img_dishibg.png")}'); background-size: 100% 100%;  width:75rem; height: 85rem; line-height: 20rem; font-size: 12rem; color: #23CEFF; padding-left: 8rem; padding-top: 5rem">
           ${(() => {
             let sliceNum = 5;
             let row = Math.ceil(params.data.name.length / sliceNum);
             let arr = [];
             for (let i = 0; i < row; i++) {
               arr.push(
                 params.data.name.slice(i * sliceNum, (i + 1) * sliceNum)
               );
             }
             arr.push(params.data.value);
             return arr.join("<br>");
           })()}
            </div>
            `;
        },
      },
      series: [
        {
          name: "",
          type: "pie",
          color: colorList,
          radius: ["50%", "60%"],
          center: ["30%", "50%"],
          avoidLabelOverlap: false,
          //   color: this.colorList1,
          label: {
            normal: {
              padding: [5, 0, 0, 0],
              textStyle: {
                fontWeight: "normal",
                color: "#CCCCCC",
                fontSize: 13,
                lineHeight: 20,
              },
              formatter: function () {
                return me.type;
              },
              position: "center",
              show: true,
            },
          },
          // 显示文字
          emphasis: {
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          data: this.chartData,
          itemStyle: {
            borderWidth: 2,
            borderColor: "#0e213f",
          },
        },
      ],
    };

    let index = -1;
    // 定时器回调函数
    var fn = function () {
      // 隐藏提示框
      // chart.dispatchAction({
      //   type: "hideTip",
      //   seriesIndex: 0,
      //   dataIndex: index % me.chartData.length,
      // });
      // 显示提示框
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: (index + 1) % me.chartData.length,
      });
      // 取消高亮指定的数据图形
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index % me.chartData.length,
      });
      // 高亮指定的数据图形
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: (index + 1) % me.chartData.length,
      });
      index++;
    };
    setTimeout(() => {
        fn()
    }, 0);
    this.timer = setInterval(fn, 3000);

    chart.on("mousemove", function (e) {
      clearInterval(me.timer);
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
    });

    chart.on("mouseout", function (e) {
      clearInterval(me.timer);
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
      me.timer = setInterval(fn, 3000);
      setTimeout(() => {
        fn();
      }, 0);
    });

    // setInterval(function () {
    //   var dataLen = option.series[0].data.length;
    //   // 取消之前高亮的图形
    //   chart.dispatchAction({
    //     type: "downplay",
    //     seriesIndex: 0,
    //     dataIndex: tipIndex,
    //   });
    //   tipIndex = (tipIndex + 1) % dataLen;
    //   // 高亮当前图形
    //   chart.dispatchAction({
    //     type: "highlight",
    //     seriesIndex: 0,
    //     dataIndex: tipIndex,
    //   });
    //   // 显示 tooltip
    //   chart.dispatchAction({
    //     type: "showTip",
    //     seriesIndex: 0,
    //     dataIndex: tipIndex,
    //   });
    // }, 1000);
    chart.setOption(option, true);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  },
};
</script>