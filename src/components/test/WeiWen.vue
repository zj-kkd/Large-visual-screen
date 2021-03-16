<template>
  <div class="com-weiwen" id="container" ref="container"></div>
</template>

<style lang="scss" scoped>
.com-weiwen {
  background-color: #fff;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 200px;
}
</style>
<script>
export default {
  mounted() {
    let myChart = this.$echarts.init(this.$refs.container);
    let option = null;
    // 散点在地图上的坐标
    var data = [
      { name: "杭州", value: 84 },
      { name: "杭州1", value: 84 },
      { name: "杭州2", value: 84 },
      { name: "杭州3", value: 84 },
      { name: "杭州4", value: 84 },
      { name: "杭州5", value: 84 },
      { name: "杭州6", value: 84 },
      { name: "杭州7", value: 84 },
      { name: "杭州8", value: 84 },
      { name: "杭州9", value: 84 }
    ];
    var geoCoordMap = {
      杭州: [120.19, 30.6],
      杭州2: [120.19, 30.46],
      杭州3: [120.19, 30.66],
      杭州4: [120.19, 30.86],
      杭州5: [120.19, 30.06],
      杭州6: [120.19, 31.26],
      杭州7: [120.19, 30.46],
      杭州8: [120.19, 30.66],
      杭州9: [120.19, 30.86]
    };
    // 将坐标与值对应并反映在地图上
    var convertData = function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };
    // console.log(convertData(data), 9876543)
    option = {
      tooltip: {
        trigger: "item",
        formatter: function(params) {
          return params.name;
        }
      },
      visualMap: {
        type: "piecewise",
        textStyle: {
          color: "#fff"
        },
        pieces: [
          { label: "国家级基地", color: "#e3bf4c" },
          { label: "省级基地", color: "#be4f51" },
          { label: "市级基地", color: "#60c2cc" }
        ],
        color: ["#e3bf4c", "#be4f51", "#60c2cc"]
      },
      geo: {
        map: "world",
        label: {
          emphasis: {
            // 悬浮显示市区
            show: true,
            fontSize: 12,
            color: '#fff'
          }
        },
        itemStyle: {
          normal: {
            areaColor: "rgba(45,255,228,0.2)",
            // 边界颜色
            borderColor: "#59e7d1"
          },
          emphasis: {
            // 悬浮颜色
            areaColor: "rgba(45,255,228,0.8)"
          }
        }
      },

      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: convertData(data),
          symbolSize: 10,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: "#fff",
              borderWidth: 1
            }
          }
        }
      ]
    };
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  }
};
</script>