<template>
  <div class="com-server">
    <div id="pieCharts" ref="pieCharts"></div>
    <div id="lineCharts" ref="lineCharts"></div>
  </div>
</template>

<style scss scoped>
.com-server {
  width: 100%;
  background-color: #fff;
}
#pieCharts {
  width: 100%;
  height: 130px;
}
#lineCharts {
  width: 100%;
  height: 120px;
  background: url('../../../public/static/img/charts_img/charts_bg.png');
  background-repeat: repeat-x;
  background-position: 18px 35px;
}
</style>
<script>
export default {
  props: ["serverData"],
  mounted() {
    let pieData = this.serverData.pieData;
    let lineData = this.serverData.lineData;

    // 饼状图表
    const pieCharts = this.$echarts.init(this.$refs.pieCharts);
    let option = {
      // 标题
      title: {
        text: "受攻击\n目标分\n布领域",
        textStyle: {
          fontWeight: "normal",
          fontSize: "12",
          color: "#739B9C"
        },
        x: "13%",
        y: "33%"
      },

      tooltip: {
        // transitionDuration: 0,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        textStyle: {
          color: "#fff",
          fontSize: 12
        }
      },

      // 小图标表
      legend: {
        orient: "vertical",
        right: "0",
        top: "center",
        icon: "pin",
        height: "70%",
        itemWidth: 10,
        itemHeight: 5,
        textStyle: {
          color: "#7B949B",
          fontSize: "11"
        },
        formatter(name) {
          let data = option.series[0].data;
          let num = 0;
          let cur_nums = 0;
          let nums = 0;
          for (let i = 0; i < data.length; i++) {
            nums += data[i].value;
            if (name == data[i].name) {
              cur_nums = data[i].value;
            }
          }
          num = name + "  " + ((cur_nums / nums) * 100).toFixed(2) + "%";
          return num;
        }
      },

      // 大图表
      series: [
        {
          name: "目标分布",
          type: "pie",
          radius: ["55%", "80%"],
          center: ["21%", "50%"],
          avoidLabelOverlap: false,
          color: [
            "#575248",
            "#7c6aaa",
            "#f7d656",
            "#7add85",
            "#6ac6d0",
            "#57a0fb",
            "#865451"
          ],
          label: {
            show: false,
            position: "top"
          },
          // 显示文字
          emphasis: {
            label: {
              show: false
            }
          },
          labelLine: {
            show: false
          },
          data: pieData,
          itemStyle: {
            borderWidth: 2,
            borderColor: "#04111F"
          }
        }
      ]
    };

    // 曲线图表
    const lineCharts = this.$echarts.init(this.$refs.lineCharts);
    let option1 = {
      title: {
        x: "3%",
        text: "受攻击目标IP地址数",
        textStyle: {
          color: "#739B9C",
          fontSize: "12"
        }
      },

      grid: {
        left: "5%",
        top: "30%",
        bottom: "20%",
        right: "0%"
      },

      xAxis: {
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#739B9C",
            fontSize: "10"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#739B9C"
          }
        },
        type: "category",
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
      },
      yAxis: {
        type: "value",
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: ""
        },
        axisLine: {
          lineStyle: {
            color: "#739B9C"
          }
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '已发布',
          data: lineData[0].out,
          type: "line",
          smooth: true,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color:'#739B9C',
              lineStyle: {
                color: "#739B9C",
                width: 1,
              }
            }
          }
        },
        {
          name: '已采纳',
          data: lineData[1].use,
          type: "line",
          smooth: true,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#60A4FF',
              lineStyle: {
                color: "#739B9C",
                width: 1,
              }
            }
          }
        },
      ]
    };
    // 初始化
    pieCharts.setOption(option);
    lineCharts.setOption(option1);
    window.addEventListener("resize", () => {
      pieCharts.resize();
      lineCharts.resize();
    });
  }
};
</script>