<template>
  <div id="test" ref="test"></div>
</template>

<style lang="less" scoped>
#test {
  background-color: red;
  width: 500px;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
<script>
export default {
  mounted() {
    var dom = document.getElementById("test");
    var myChart = echarts.init(dom);
    let option = null;
    // 散点在地图上的坐标
    var geoCoordMap = {
      国家级基地1: [94.12, 39.66],
      国家级基地2: [97.2, 39.55],
      国家级基地3: [95.28, 40.29],
      省级基地1: [98.36, 40.19],
      省级基地2: [97.88, 39.49],
      省级基地3: [95.77, 40.59],
      市级基地1: [102.66, 38.89],
      市级基地2: [101.23, 37.79],
      市级基地3: [99.4, 39.69]
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
          { min: 300, label: "国家级基地", color: "#e3bf4c" },
          { min: 200, max: 300, label: "省级基地", color: "#be4f51" },
          { min: 100, max: 200, label: "市级基地", color: "#60c2cc" }
        ],
        color: ["#e3bf4c", "#be4f51", "#60c2cc"]
      },
      geo: {
        map: "甘肃",
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: "#323c48",
            borderColor: "#111"
          },
          emphasis: {
            areaColor: "#2a333d"
          }
        }
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: convertData([
            { name: "国家级基地1", value: 110 },
            { name: "国家级基地2", value: 110 },
            { name: "国家级基地3", value: 110 },
            { name: "省级基地1", value: 210 },
            { name: "省级基地2", value: 210 },
            { name: "省级基地3", value: 210 },
            { name: "市级基地1", value: 310 },
            { name: "市级基地2", value: 310 },
            { name: "市级基地3", value: 310 }
          ]),
          symbolSize: 12,
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