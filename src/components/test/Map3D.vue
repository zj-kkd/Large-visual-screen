<template>
  <div class="com-weiwen" id="map3d" ref="map3d"></div>
</template>

<style lang="scss" scoped>
.com-weiwen {
  width: 100%;
  height: 100vh;
}
</style>
<script>
import data from "echarts/map/json/province/zhejiang.json";
export default {
  mounted() {
    const chart = this.$echarts.init(this.$refs.map3d);
    const coord = data.features.map(val => {
      return {
        name: val.properties.name,
        value: val.properties.cp.concat(
          +(Math.random() * Math.random() * 150).toFixed(0)
        )
      };
    });
    console.log(222, coord);
    // const lines_coord = [];

    // coord.forEach((v, index) => {
    //   index > 0 &&
    //     lines_coord.push({
    //       coords: [v.value, coord[0].value]
    //     });
    // });
    let option = {
             visualMap: [{
        type: 'continuous',
        seriesIndex: 0,
        text: ['bar3D'],
        calculable: true,
        max: 300,
        inRange: {
            color: ['#87aa66', '#eba438', '#d94d4c']
        }
    }, {
        type: 'continuous',
        seriesIndex: 1,
        text: ['scatter3D'],
        left: 'right',
        max: 100,
        calculable: true,
        inRange: {
            color: ['#000', 'blue', 'purple']
        }
    }],
      geo3D: {
        map: data,
        label: {
          show: true,
          distance: 20,
          textStyle: {
            color: "red",
            backgroundColor: "rgba(1,1,1,0)"
          }
        },

        itemStyle: {
          borderWidth: 1
        }
      },
      series: [
        {
          type: "bar3D",
          coordinateSystem: "geo3D",
          shading: "lambert",
          data: coord,
          barSize: 1,
          minHeight: 0.2,
          silent: true,
          itemStyle: {
            color: "orange"
          }
        },
        {
          type: "scatter3D",
          coordinateSystem: "geo3D",
          symbolSize: 20,
        //   symbolSize: 50,
        //   rippleEffect: {
        //     period: 4,
        //     brushType: "stroke",
        //     scale: 4
        //   },
        //   itemStyle: {
        //     color: "#FFB800",
        //     opacity: 1
        //   },
          data: coord
        }
      ]
    };
    chart.setOption(option);
  }
};
</script>