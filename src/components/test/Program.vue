<template>
  <div class="com-Program">
    <div class="main">
      <div class="item" v-for="item in programData" :key="item.type">
        <p class="title">{{item.title}}</p>
        <div :id="item.type"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-Program {
  overflow: hidden;
  .main {
    margin-top: 10px; 
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    .item {
      #_id1,
      #_id2,
      #_id3 {
        width: 100%;
        height: 100px;
        background-color: #182830;
        margin-top: 10px;
      }
      display: flex;
      flex-wrap: wrap;
      width: 31%;
      .title {
        width: 100%;
        height: 55px;
        display: flex;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        padding: 0 8px;
        color: #b3b3b3;
        text-align: center;
        background-color: #182830;
        border-left: 1px solid #096974;
      }
    }
  }
}
</style>

<script>
// SecurityData
export default {
  props: ["programData"],
  mounted() {
    const _id1 = this.$echarts.init(document.getElementById("_id1"));
    const _id2 = this.$echarts.init(document.getElementById("_id2"));
    const _id3 = this.$echarts.init(document.getElementById("_id3"));

    let programData = this.programData;
    var colorList = [
      "#f6f7f8",
      "#f6f7f8",
      "#f6f7f8",
      "#f6f7f8",
      "#f6f7f8",
      "#f6f7f8",
      "#78fccd",
      "#78fccd",
      "#78fccd",
      "#78fccd",
      "#78fccd",
      "#78fccd",
      "#78fccd"
    ];

    let option1 = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "-2",
        right: "-2",
        bottom: "0",
        top: "0"
      },
      xAxis: [
        {
          type: "category",
          show: false
        }
      ],
      yAxis: [
        {
          type: "value",
          show: false
        }
      ],
      series: [
        {
          name: "直接访问",
          center: ["0", "50%"],
          type: "bar",
          barWidth: "60%",
          data: programData[0].data,
          itemStyle: {
            color: function(params) {
              //自定义颜色
              return colorList[params.dataIndex];
            },
            barBorderRadius: [5, 5, 0, 0]
          }
        }
      ]
    };
    let option2 = {
      color: ["#209365"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "-2",
        right: "-2",
        bottom: "0",
        top: "0"
      },
      xAxis: [
        {
          type: "category",
          show: false
        }
      ],
      yAxis: [
        {
          type: "value",
          show: false
        }
      ],
      series: [
        {
          name: "直接访问",
          center: ["0", "50%"],
          type: "bar",
          barWidth: "60%",
          data: programData[1].data,
          itemStyle: {
            color: function(params) {
              //自定义颜色
              return colorList[params.dataIndex];
            },
            barBorderRadius: [5, 5, 0, 0]
          }
        }
      ]
    };
    let option3 = {
      color: ["#209365"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "-2",
        right: "-2",
        bottom: "0",
        top: "0"
      },
      xAxis: [
        {
          type: "category",
          show: false
        }
      ],
      yAxis: [
        {
          type: "value",
          show: false
        }
      ],
      series: [
        {
          name: "直接访问",
          center: ["0", "50%"],
          type: "bar",
          barWidth: "60%",
          data: programData[2].data,
          itemStyle: {
            color: function(params) {
              //自定义颜色
              return colorList[params.dataIndex];
            },
            barBorderRadius: [5, 5, 0, 0]
          }
        }
      ]
    };

    _id1.setOption(option1);
    _id2.setOption(option2);
    _id3.setOption(option3);
    window.addEventListener("resize", () => {
      _id1.resize();
      _id2.resize();
      _id3.resize();
    });
  }
};
</script>