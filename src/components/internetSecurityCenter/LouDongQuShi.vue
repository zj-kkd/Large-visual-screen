<template>
  <div class="com-web-security">
    <div class="part">
      <div class="chart1" ref="chart1"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.com-web-security {
  border: 1px solid red;
  height: 130px;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  width: 100%;
  align-content: space-between;
  .part {
    width: 100%;
    .chart1 {
      width: 100%;
      height: 130px;
    }
  }
}
</style>
<script>
export default {
  props: ["data", "title"],
  data() {
    return {
      data1: [
        { name: "系统漏洞", value: 1000, percentage: "25%", add: 100 },
        { name: "网站木马", value: 1000, percentage: "25%", add: 100 },
        { name: "Web漏洞", value: 1000, percentage: "25%", add: 100 },
        { name: "网站篡改", value: 1000, percentage: "25%", add: 100 }
      ],
      data2: [
        { num: 20, color: "#329a93" },
        { num: 30, color: "#1d5759" },
        { num: 40, color: "#4b5962" }
      ],
      data3: [
        { name: "国家安全", value: 40, add: 2 },
        { name: "国家安全", value: 30, add: 2 },
        { name: "国家安全", value: 20, add: 2 },
        { name: "国家安全", value: 50, add: 2 },
        { name: "国家安全", value: 60, add: 2 },
        { name: "国家安全", value: 30, add: 2 },
        { name: "国家安全", value: 20, add: 2 },
        { name: "国家安全", value: 10, add: 2 },
        { name: "国家安全", value: 20, add: 2 }
      ]
    };
  },

  mounted() {
    let colorList1 = [ '#7b645c', '#3b616e', '#284f4c', '#505d65']
    const chart1 = this.$echarts.init(this.$refs.chart1);
    let option = {
      title: {
        textAlign: 'center',
        text: "4000件\n漏洞数",
        left: "48.5%",
        top: "35%",
        textStyle: {
          fontSize: 11,
          color: "#f7f7f7",
          lineHeight: 15,
          fontWeight: "normal"
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{c}  ({d}%)",
        textStyle: {
          align: "left",
          fontSize: 12
        }
      },

      series: [
        {
          hoverAnimation: false,
          type: "pie",
          avoidLabelOverlap: true,
          startAngle: 45,
          radius: ["60%", "70%"],
          center: ["50%", "center"],
          label: {
            position: "outer",
            alignTo: "edge",
            margin: "10%",
            show: true,
            textStyle: {
              rich: {
                title: {
                  fontSize: 11,
                  color: '#f7f7f7'
                },
                icon: {
                  width: 12,
                  height: 12,
                  backgroundColor: {
                    image: `${require("../../../public/static/img/icons/icon_add.png")}`
                  }
                },
                num: {
                  color: '#f7f7f7',
                  lineHeight: 15,
                  fontSize: 11
                }
              }
            },
            formatter: function({ data }) {
              return (
                "{title|" +
                data.name +
                "}" +
                "\n" +
                "{num|" +
                data.value +
                "件" +
                "}" +
                "\n" +
                "{num|" +
                data.percentage +
                "}"
              );
            }
          },
          data: this.data1.slice(2),
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList1[params.dataIndex + 2];
              }
            }
          },
        },
        {
          hoverAnimation: false,
          type: "pie",
          avoidLabelOverlap: true,
          radius: ["40%", "50%"],
          center: ["50%", "center"],
          startAngle: -45,
          selectedOffset: 5,
          label: {
            position: "outer",
            alignTo: "edge",
            margin: "10%",
            show: true,
            textStyle: {
              rich: {
                title: {
                  fontSize: 11,
                  color: '#f7f7f7'
                },
                icon: {
                  width: 12,
                  height: 12,
                  backgroundColor: {
                    image: `${require("../../../public/static/img/icons/icon_add.png")}`
                  }
                },
                num: {
                  color: '#f7f7f7',
                  fontSize: 11,
                  lineHeight: 15
                }
              }
            },
            formatter: function({ data }) {
              return (
                "{title|" +
                data.name +
                "}" +
                "\n" +
                "{num|" +
                data.value +
                "件" +
                "}" +
                "\n" +
                "{num|" +
                data.percentage +
                "}"
              );
            }
          },
          data: this.data1.slice(0, 2),
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList1[params.dataIndex];
              }
            }
          },
        }
      ]
    };
    chart1.setOption(option);
    window.addEventListener("resize", () => {
      chart1.resize();
    });
  }
};
</script>