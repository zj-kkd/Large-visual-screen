<template>
  <div class="page-ip-Convergence">
    <ChildHeader :title="'IP综合汇聚分析'"></ChildHeader>
    <div class="main">
      <div class="left">
        <div class="search-bar">
          <div class="bar">
            <input type="text" v-model="searchData" />
          </div>
          <div class="img">
            <img src="../../public/static/img/icons/icon_search.png" alt />
          </div>
        </div>
        <div class="chart" ref="chart">
          <!-- <img src="../../public/static/img/imgs/ip/ip_info1.png" alt /> -->
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="ip-title">
            <strong>IP</strong>
            <span>192.168.122.5</span>
          </div>
          <div class="ip-tab" v-if="(bg == 1)">
            <div :class="check == 'left' ? 'isCheck': ''" @click="changeTab('left')">基础信息</div>
            <div :class="check == 'right' ? 'isCheck': ''" @click="changeTab('right')">ICP备案</div>
          </div>
        </div>
        <div class="ip-info">
          <div class="bar"></div>
          <vue-scroll :ops="ops">
            <dl v-for="(item, index) in showData" :key="index">
              <dt>{{item.type}}</dt>
              <dd
                v-for="(item1, index1) in item.data"
                :key="index1"
              >{{item1.name + '：' + item1.value}}</dd>
            </dl>
          </vue-scroll>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-ip-Convergence {
  width: 100%;
  .main {
    padding-left: 10rem;
    padding-right: 10rem;
    padding-bottom: 10rem;
    height: calc(100vh - 70rem);
    margin-top: -35rem;
    display: flex;
    .left {
      width: 80%;
      height: 100%;
      .search-bar {
        height: 30rem;
        width: 25%;
        font-size: 13rem;
        color: #fff;
        display: flex;
        .bar {
          height: 30rem;
          background: rgba(95, 217, 187, 0.1);
          border: 1rem solid rgba(99, 150, 138, 1);
          border-radius: 3rem 0 0 3rem;
          border-right: none;
          outline: none;
          color: #fff;
          padding: 0 10rem;
          flex: 1;
          input {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            outline: none;
            color: #fff;
          }
        }
        .img {
          width: 40rem;
          height: 30rem;
          border: 1rem solid rgba(99, 150, 138, 1);
          border-radius: 0 3rem 3rem 0;
          background: rgba(95, 217, 187, 0.2);
          img {
            width: 20rem;
            margin: 5rem 10rem;
            line-height: 30rem;
          }
        }
      }
      .chart {
        width: 100%;
        height: calc(100% - 30rem);
        border: 1rem solid red;
        padding: 50rem 30rem;
        img {
          width: 100%;
          height: 100%;
          border: 1rem solid red;
        }
      }
    }
    .right {
      background-image: url("../../public/static/img/imgs/ip/img_IPbg.png");
      background-size: 100% 100%;
      // padding: 20rem;
      flex: 1;
      height: 100%;
      .top {
        width: 100%;
        padding: 20rem;
      }
      .ip-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60rem;
        background-image: url("../../public/static/img/imgs/ip/img_IPtitlebg2.png");
        background-size: 100% 100%;
        font-size: 15rem;
        color: #b3b3b3;
        strong {
          font-size: 20rem;
          color: #6beebb;
          margin-right: 10rem;
        }
      }
      .ip-tab {
        margin-top: 30rem;
        width: 100%;
        height: 40rem;
        display: flex;
        & > div {
          text-align: center;
          width: 50%;
          height: 100%;
          background-size: 100% 100%;
          font-size: 13rem;
          color: #b3b3b3;
          line-height: 45rem;
          background-image: url("../../public/static/img/imgs/ip/img_IPnormal.png");
          &.isCheck {
            line-height: 40rem;
            font-size: 15rem;
            color: #e4da39;
            background-image: url("../../public/static/img/imgs/ip/img_IPclick.png");
          }
        }
      }
      .ip-info {
        font-size: 13rem;
        margin-top: 10rem;
        width: 100%;
        height: calc(100% - 200rem);
        padding-left: 20rem;
        padding-right: 5rem;
        position: relative;
        &:hover .bar {
          opacity: 0.5;
        }
        dl {
          margin-bottom: 25rem;
          dt {
            color: #62dbae;
            font-size: 15rem;
            margin-bottom: 10rem;
          }
          dd {
            color: #b3b3b3;
            font-size: 13rem;
            margin-bottom: 5rem;
          }
        }
      }
    }
  }
}
</style>
<script>
import ChildHeader from "../components/ChildHeader";
export default {
  data() {
    return {
      ops: {
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false,
          background: "#34605e",
          // opacity: 0.3,
          size: "4px"
        }
      },
      searchData: "",
      check: "left",
      bg: 1,
      showData: "",
      ipData: '',
      data: {
        data1: {
          ipInfoLeft: [
            {
              type: "基本信息",
              data: [
                { name: "所属营运商", value: "浙江·宁波移动" },
                { name: "所属企业", value: "宁波市****" },
                { name: "所属机房", value: "宁波***机房" },
                { name: "所在机房区域", value: "A-13区" },
                { name: "所在机柜", value: "189" },
                { name: "服务器编号", value: "abab123" }
              ]
            },
            {
              type: "来源信息",
              data: [
                { name: "来源单位", value: "宁波移动" },
                { name: "所在城市", value: "浙江宁波" },
                { name: "报备时间", value: "2020年07月03日" },
                { name: "备案状态", value: "已备案" }
              ]
            },
            {
              type: "分配使用信息",
              data: [
                { name: "单位名称", value: "宁波橙点科技有限公司" },
                { name: "单位性质", value: "企业" },
                { name: "所在城市", value: "浙江宁波" },
                { name: "单位分类", value: "********" },
                { name: "单位行政级别", value: "********" },
                { name: "单位所属行业", value: "********" },
                { name: "单位地址", value: "********" },
                { name: "联系人", value: "********" },
                { name: "联系电话", value: "********" },
                { name: "电子邮件", value: "********" },
                { name: "经营许可证编号", value: "********" },
                { name: "分配类型", value: "********" },
                { name: "联系电话", value: "********" },
                { name: "电子邮件", value: "********" },
                { name: "经营许可证编号", value: "********" },
                { name: "分配类型", value: "********" },
                { name: "联系电话", value: "********" },
                { name: "电子邮件", value: "********" },
                { name: "经营许可证编号", value: "********" },
                { name: "分配类型", value: "********" }
              ]
            }
          ],
          ipInfoRight: [
            {
              type: "主体信息",
              data: [
                { name: "单位名称", value: "宁波橙点科技有限公司" },
                { name: "单位性质", value: "企业" },
                { name: "主体备案号", value: "浙ICP备11713090" },
                { name: "单位通信地址", value: "*********" },
                { name: "报备方式", value: "*********" },
                { name: "负责人手机", value: "*********" }
              ]
            },
            {
              type: "网站信息",
              data: [
                { name: "网站名称", value: "橙点科技" },
                { name: "网站域名", value: "*********" },
                { name: "网站备案号", value: "*********" },
                { name: "网站服务类型", value: "*********" }
              ]
            },
            {
              type: "网站接入信息",
              data: [
                { name: "接入商信息", value: "浙江移动" },
                { name: "IP地址", value: "*********" },
                { name: "服务器放置地点", value: "*********" },
                { name: "接入方式", value: "*********" }
              ]
            }
          ]
        },
        data2: [
          {
            type: "信息安全事件1",
            data: [
              { name: "事件类型", value: "******" },
              { name: "发生时间", value: "******" },
              { name: "严重程度", value: "******" },
              { name: "影响范围", value: "******" },
              { name: "所在机房", value: "******" },
              { name: "接入运营商", value: "******" },
              { name: "所属企业", value: "******" }
            ]
          },
          {
            type: "信息安全事件2",
            data: [
              { name: "事件类型", value: "******" },
              { name: "发生时间", value: "******" },
              { name: "严重程度", value: "******" },
              { name: "影响范围", value: "******" },
              { name: "所在机房", value: "******" },
              { name: "接入运营商", value: "******" },
              { name: "所属企业", value: "******" }
            ]
          },
          {
            type: "信息安全事件3",
            data: [
              { name: "事件类型", value: "******" },
              { name: "发生时间", value: "******" },
              { name: "严重程度", value: "******" },
              { name: "影响范围", value: "******" },
              { name: "所在机房", value: "******" },
              { name: "接入运营商", value: "******" },
              { name: "所属企业", value: "******" }
            ]
          },
          {
            type: "信息安全事件4",
            data: [
              { name: "事件类型", value: "******" },
              { name: "发生时间", value: "******" },
              { name: "严重程度", value: "******" },
              { name: "影响范围", value: "******" },
              { name: "所在机房", value: "******" },
              { name: "接入运营商", value: "******" },
              { name: "所属企业", value: "******" }
            ]
          }
        ],
        data3: [
          {
            type: "信息安全事件详情",
            data: [
              { name: "事件类型", value: "******" },
              { name: "发生时间", value: "******" },
              { name: "严重程度", value: "******" },
              { name: "影响范围", value: "******" },
              { name: "所在机房", value: "******" },
              { name: "接入运营商", value: "******" },
              { name: "所属企业", value: "******" }
            ]
          }
        ]
      }
    };
  },
  components: { ChildHeader },

  mounted() {
    const chart = this.$echarts.init(this.$refs.chart);
    
    var lines = [
      { source: 0, target: 1, value: " " },
      { source: 1, target: 2, value: " " },
      { source: 1, target: 3, value: " " },
      { source: 1, target: 4, value: " " },
      { source: 0, target: 5, value: " " },
      { source: 5, target: 6, value: " " },
      { source: 5, target: 7, value: " " },
      { source: 5, target: 8, value: " " },
      { source: 0, target: 9, value: " " },
      { source: 9, target: 10, value: " " },
      { source: 9, target: 11, value: " " },
      { source: 9, target: 12, value: " " }
    ];
    var datas = [
      { name: "项目", draggable: true },
      { name: "人员", category: 0, draggable: true },
      { name: "人员1", category: 0, draggable: true },
      { name: "人员2", category: 0, draggable: true },
      { name: "人dfgdfgfdgdf员3", category: 0, draggable: true },
      { name: "机构", category: 1, draggable: true },
      { name: "机构1", category: 1, draggable: true },
      { name: "机构2", category: 1, draggable: true },
      { name: "机构3", category: 1, draggable: true },
      { name: "文献", category: 2, draggable: true },
      { name: "文献1", category: 2, draggable: true },
      { name: "文献2", category: 2, draggable: true },
      { name: "文献3", category: 2, draggable: true }
    ];
    var option = {
      title: {
        text: ""
      },
      tooltip: {},
      animationDurationUpdate: 1500,
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 12
          }
        }
      },
      series: [
        {
          type: "graph",
          layout: "force", //采用力引导布局
          symbolSize: 100,
          legendHoverLink: true, //启用图例 hover 时的联动高亮。
          focusNodeAdjacency: true, //在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
          roam: true,
          label: {
            normal: {
              show: true,
              position: "inside",
              textStyle: {
                fontSize: 12
              }
            }
          },
          force: {
            repulsion: 2000
          },
          edgeSymbolSize: [4, 50],
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 40
              },
              formatter: "{c}"
            }
          },
          categories: [
            {
              itemStyle: {
                normal: {
                  color: "orange"
                }
              }
            },
            {
              itemStyle: {
                normal: {
                  color: "blue"
                }
              }
            },
            {
              itemStyle: {
                normal: {
                  color: "green"
                }
              }
            }
          ],
          data: datas,
          links: lines,
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 1,
              curveness: 0
            }
          }
        }
      ]
    };

    chart.setOption(option);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  },
  created() {
    this.showData = this.data.data1.ipInfoLeft;
     this.$http.get("/showData/getIpInfo/192.168.2.1").then(({data}) => {
       this.ipData = data,
       console.log(this.ipData)
     })
  },
  methods: {
    changeTab(e) {
      this.check = e;
      switch (e) {
        case "left":
          this.showData = this.data.data1.ipInfoLeft;
          break;
        case "right":
          this.showData = this.data.data1.ipInfoRight;
          break;
      }
    },

    clickIp(e) {
      this.bg = e;
      switch (e) {
        case 1:
          if (this.check == "left") {
            this.showData = this.data.data1.ipInfoLeft;
          } else {
            this.showData = this.data.data1.ipInfoRight;
          }
          break;
        case 2:
          this.showData = this.data.data2;
          break;
        case 3:
          this.showData = this.data.data3;
          break;
      }
    }
  }
};
</script>
