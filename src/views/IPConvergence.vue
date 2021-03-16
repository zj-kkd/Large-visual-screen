<template>
  <div class="page-ip-Convergence">
    <div class="main">
      <div class="left">
        <div class="search-bar">
          <div class="bar">
            <input type="text" placeholder="192.168.122.5" v-model="searchData" />
          </div>
          <div class="img">
            <img src="../../public/static/img/icons/icon_search.png" alt />
          </div>
        </div>
        <div class="ip-chart" ref="chart" v-show="check == 'info' || check == 'security'"></div>
        <div class="ip-chart" ref="chart1" v-show="check == 'trace'"></div>
      </div>
      <div class="right">
        <div class="top">
          <div class="ip-title">
            <strong>IP</strong>
            <span>192.168.122.5</span>
          </div>
          <div class="ip-tab">
            <div :class="check == 'info' ? 'isCheck': ''" @click="changeTab('info')">基础信息</div>
            <div :class="check == 'security' ? 'isCheck': ''" @click="changeTab('security')">安全风险</div>
            <div :class="check == 'trace' ? 'isCheck': ''" @click="changeTab('trace')">链路追踪</div>
          </div>
        </div>
        <div class="ip-info">
          <vue-scroll :ops="ops" v-if="check == 'info'">
            <div class="info-part">
              <dl v-for="(item, index) in data.info" :key="index">
                <dt>{{item.type}}</dt>
                <dd
                  v-for="(item1, index1) in item.data"
                  :key="index1"
                >{{item1.name + '：' + item1.value}}</dd>
              </dl>
            </div>
          </vue-scroll>
          <vue-scroll :ops="ops" v-if="check == 'security'" ref="scroll" class="security-part">
            <!-- <div class="security-part"> -->
            <div class="part bug-part">
              <p>{{data.security[0].type}}</p>
              <li>
                <p>漏洞名称</p>
                <p>危险等级</p>
              </li>
              <li v-for="(item, index) in data.security[0].data" :key="index">
                <p>{{item.name}}</p>
                <p>{{item.value}}</p>
                <span class="line"></span>
              </li>
            </div>
            <div class="part info-event">
              <p>{{data.security[1].type}}</p>
              <li>
                <p>事件名称</p>
                <p>时间</p>
              </li>
              <li v-for="(item, index) in data.security[1].data" :key="index">
                <p>{{item.name}}</p>
                <p>{{item.value}}</p>
              </li>
            </div>
            <div class="part web-event">
              <p>{{data.security[2].type}}</p>
              <li>
                <p>漏洞名称</p>
                <p>时间</p>
              </li>
              <li v-for="(item, index) in data.security[2].data" :key="index">
                <p>{{item.name}}</p>
                <p>{{item.value}}</p>
              </li>
              <!-- </div> -->
            </div>
          </vue-scroll>
          <vue-scroll :ops="ops" v-if="check == 'trace'">
            <div class="trace-part">
              <p>{{data.trace[0].type}}</p>
              <li class="label-title">
                <p>事件名称</p>
                <p>链路追踪</p>
              </li>
              <li v-for="(item, index) in data.trace[0].data" :key="index">
                <p class="type">
                  <span class="name">{{item.type}}</span>
                  <span class="time">{{item.name}}</span>
                </p>
                <p class="ip">
                  <span v-for="(item1, index1) in item.ip" :key="index1">{{item1}}</span>
                </p>
                <span class="line"></span>
              </li>
            </div>
          </vue-scroll>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-ip-Convergence {
  .main {
    // border: 1rem solid red;
    padding-left: 10rem;
    padding-right: 10rem;
    padding-bottom: 10rem;
    height: calc(100vh - 85rem);
    display: flex;
    .left {
      width: 80%;
      height: 100%;
      // border: 1rem solid red;
      .search-bar {
        height: 30rem;
        width: 25%;
        font-size: 13rem;
        color: #fff;
        display: flex;
        .bar {
          height: 30rem;
          background: rgba(95, 182, 217, 0.1);
          border: 1rem solid #6096e4;
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
          border: 1rem solid #6096e4;
          border-radius: 0 3rem 3rem 0;
          background: rgba(95, 182, 217, 0.2);
          img {
            width: 20rem;
            margin: 5rem 10rem;
            line-height: 30rem;
          }
        }
      }

      .ip-chart {
        // border: 1rem solid red;
        width: 75vw;
        height: 80vh;
        margin-top: 50rem;
        position: relative;
        margin-left: 50rem;
        .mark1,
        .mark2,
        .mark3 {
          position: absolute;
          width: 100rem;
          height: 100rem;
          // border: 1rem solid red;
          opacity: 0.5;
        }
        .mark1 {
          width: 100rem;
          height: 100rem;
          left: 46.5%;
          top: 50%;
          z-index: 12;
        }
        .mark2 {
          width: 100rem;
          height: 100rem;
          left: 24%;
          top: 43%;
          z-index: 11;
        }
        .mark3 {
          z-index: 10;
          width: 120rem;
          height: 120rem;
          left: 74%;
          top: 52%;
        }
        img {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
    }
    .right {
      // border: 1rem solid red;
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
        height: 80rem;
        background-image: url("../../public/static/img/imgs/ip/img_IPtitlebg2.png");
        background-size: 100% 100%;
        font-size: 24rem;
        color: #b3b3b3;
        strong {
          font-weight: normal;
          font-size: 35rem;
          color: #23ceff;
          margin-right: 10rem;
        }
      }
      .ip-tab {
        margin-top: 40rem;
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
        margin-top: 20rem;
        width: 100%;
        height: calc(100% - 220rem);
        padding-bottom: 20rem;
        padding-left: 15rem;
        position: relative;
        // &:hover .bar {
        //   opacity: 0.5;
        // }

        & .part:not(:last-child) {
          margin-bottom: 30rem;
        }
        .info-part {
          padding-left: 20rem;
          & dl:not(:last-child) {
            margin-bottom: 30rem;
          }
          dl {
            dt {
              color: #62bddb;
              font-size: 18rem;
              margin-bottom: 15rem;
            }
            dd {
              color: #b3b3b3;
              font-size: 16rem;
              margin-bottom: 8rem;
            }
          }
        }

        .security-part {
          .part {
            margin-right: 15rem;
            // padding-right: 10rem;
            &.info-event,
            &.web-event {
              li {
                & p:last-child {
                  display: flex;
                  align-items: center;
                  width: 50%;
                  padding-left: 30rem;
                }
              }
            }

            &.bug-part {
              li {
                position: relative;
                & p:last-of-type {
                  width: 30%;
                  padding-left: 20rem;
                  display: flex;
                  align-items: center;
                }
              }
              & li:not(:first-of-type) {
                padding-top: 8rem;
                padding-bottom: 8rem;
                border-bottom: 1rem dashed #9cbfd341;
                margin: 0;
                .line {
                  width: 10rem;
                  height: 1rem;
                  background-color: $blue3;
                  position: absolute;
                  bottom: -1rem;
                  right: 0;
                }
              }
              & li:last-of-type {
                padding-top: 8rem;
                padding-bottom: 8rem;
                border-bottom: 1rem solid transparent;
                margin: 0;
                .line {
                  opacity: 0;
                }
              }
            }
            & > p {
              padding-left: 20rem;
              font-size: 18rem;
              color: #62bddb;
              margin-bottom: 15rem;
            }
            & > li:first-of-type {
              height: 30rem;
              background: rgba(99, 145, 171, 0.35);
            }
            li {
              padding-left: 20rem;
              display: flex;
              flex-wrap: wrap;
              color: #b3b3b3;
              font-size: 16rem;
              margin-bottom: 8rem;
              & p:first-child {
                display: flex;
                align-items: center;
                flex: 1;
              }
              & p:last-child {
                display: flex;
                align-items: center;
                width: 30%;
                padding-left: 30rem;
              }
            }
          }
        }

        .trace-part {
          margin-right: 15rem;
          font-size: 16rem;
          color: #b3b3b3;
          & > p {
            color: #62bddb;
            font-size: 18rem;
            margin-bottom: 15rem;
            padding-left: 20rem;
          }
          .label-title {
            margin-bottom: 20rem;
            background: rgba(99, 145, 171, 0.35);
            height: 30rem;
            padding: 0;
            padding-left: 20rem;
            line-height: 30rem;
            p {
              color: #b3b3b3;
            }
          }
          & li:not(:first-of-type) {
            position: relative;
            border-bottom: 1rem dashed #9cbfd341;
            .line {
              width: 10rem;
              height: 1rem;
              background-color: $blue3;
              position: absolute;
              bottom: -1rem;
              right: 0;
            }
          }

          & li:last-of-type {
            border-bottom: 1rem dashed transparent;
            .line {
              opacity: 0;
            }
          }
          li {
            padding: 10rem 0;
            padding-left: 20rem;
            display: flex;
            & p:first-child {
              width: 60%;
              display: flex;
              flex-wrap: wrap;
              align-content: flex-start;
              span {
                width: 100%;
                height: 20rem;
                line-height: 20rem;
              }
            }
            & p:last-of-type {
              width: 40%;
              display: flex;
              flex-wrap: wrap;
              align-content: flex-start;
              span {
                width: 100%;
                height: 20rem;
                line-height: 20rem;
                margin: 5rem 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      searchData: "",
      check: "info",
      bg: 1,
      showData: "",
      getRem: null,
      ops: {
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false,
          background: "#234c6d",
          // opacity: 0.3,
          size: "4rem",
        },
      },
      data: {
        info: [
          {
            type: "运营信息",
            data: [
              { name: "所属营运商", value: "宁波移动" },
              { name: "所在地区", value: "宁波市" },
              { name: "所属机房", value: "宁波移动1号机房" },
              { name: "所在区域", value: "A-13区" },
              { name: "所在机柜", value: "189" },
              { name: "服务器编号", value: "D365Y4768" },
              { name: "报备时间", value: "2019年07月30日" },
              { name: "备案状态", value: "已备案" },
            ],
          },
          {
            type: "使用信息",
            data: [
              { name: "单位名称", value: "宁波橙点科技有限公司" },
              { name: "主体备案号", value: "NB767384659" },
              { name: "网站备案号", value: "浙ICP备091183号-25" },
              { name: "单位性质", value: "企业" },
              { name: "所属行业", value: "信息和通信" },
              { name: "详细地址", value: "宁波市鄞州区宁穿路91号" },
              { name: "联系人", value: "李成典" },
              { name: "联系电话", value: "18842428517" },
              { name: "电子邮件", value: "18842428517@163.com" },
              { name: "经营许可证编号", value: "NB578462962" },
              { name: "分配类型", value: "分配且使用" },
            ],
          },
        ],

        security: [
          {
            type: "漏洞风险",
            data: [
              { name: "IBM Watson 跨站脚本漏洞", value: "中危" },
              { name: "IBM Watson 开放重定向漏洞", value: "中危" },
              { name: "CUPS本地化字符串权限提升漏洞", value: "中危" },
              {
                name: "Adobe Flash Player整数溢出任意代码执行漏洞",
                value: "高危",
              },
              {
                name: "IBM Security Network Protection跨站请求伪造漏洞",
                value: "低危",
              },
            ],
          },
          {
            type: "信安事件",
            data: [
              { name: "民族宗教事件", value: "2020年05月30日" },
              { name: "谣言事件", value: "2020年04月10日" },
              { name: "淫秽色情事件", value: "2020年03月13日" },
              { name: "虚假信息事件", value: "2020年02月16日" },
              { name: "其它信安事件", value: "2020年01月30日" },
            ],
          },
          {
            type: "网安事件",
            data: [
              { name: "系统漏洞事件", value: "2020年05月30日" },
              { name: "WEB漏洞事件", value: "2020年04月10日" },
              { name: "可用性事件", value: "2020年03月13日" },
              { name: "网站挂马事件", value: "2020年02月16日" },
              { name: "其它网安事件", value: "2020年01月30日" },
            ],
          },
        ],

        trace: [
          {
            type: "链路追踪",
            data: [
              {
                type: "谣言事件",
                name: "疫情谣言-20/6/13",
                ip: ["178.32.4.2", "167.98.333.2", "12.5.632.67"],
              },
              {
                type: "民族宗教",
                name: "新疆-19/7/18",
                ip: ["178.32.4.2", "167.98.333.2", "12.5.632.67"],
              },
              {
                type: "淫秽色情",
                name: "图片-19/6/13",
                ip: ["178.32.4.2", "167.98.333.2", "12.5.632.67"],
              },
              {
                type: "蠕虫攻击",
                name: "飞客蠕虫-18/5/19",
                ip: ["178.32.4.2", "167.98.333.2", "12.5.632.67"],
              },
            ],
          },
        ],
      },
      chartData: [
        {
          name: "ip\n192.168.122.5",
          child: [
            { name: "信息安全", items: ["1-1", "1-2", "1-3", "1-4", "1-5"] },
            { name: "漏洞风险", items: ["2-1", "2-2", "2-3", "2-4", "2-5"] },
            { name: "网安事件", items: ["3-1", "3-2", "3-3", "3-4", "3-5"] },
          ],
        },
      ],
    };
  },
  created() {
    this.getRem = this.$chartConfig.getRem;
    // this.showData = this.data.data1.ipInfoLeft;
  },
  mounted() {
    this.initChart();
    this.initChart1();
  },
  methods: {
    toTop(e) {
      this.$nextTick(() => {
        // let offsetArr = [];
        // console.log(112233, document.querySelector(".security-part").scrollTop);
        // document.querySelectorAll(".security-part > div").forEach((item) => {
        //   offsetArr.push(item.offsetTop);
        // });
        // info-event
        // bug-part
        // web-event
        if (e == "网安事件") {
          this.$refs["scroll"].scrollIntoView(".web-event", 300);
        } else if (e == "信息安全") {
          this.$refs["scroll"].scrollIntoView(".info-event", 300);
        } else {
          this.$refs["scroll"].scrollIntoView(".bug-part", 300);
        }
      });
    },
    initChart1() {
      const chart1 = this.$echarts.init(this.$refs.chart1);
      let option1 = {
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(0,101,153,.5)",
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
          confine: true,
          // show: true,
          padding: [10, 10],
          formatter(e) {
            return e.data.name;
          },
        },
        animationDurationUpdate: this.getRem(1500),
        animationEasingUpdate: "quinticInOut",
        color: ["#83e0ff", "#45f5ce", "#b158ff"],
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: this.getRem(2000),
              edgeLength: this.getRem(200),
            },
            //  focusNodeAdjacency: true,
            edgeSymbol: ["circle", "circle"], //线2头标记
            edgeSymbolSize: 4,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0,
              },
            },
            roam: true,
            label: {
              normal: {
                show: true,
              },
            },
            data: [
              {
                name: "192.168.122.5",
                symbolSize: this.getRem(150),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/items_icon.png")}`,
                // draggable: true,
                category: 0,
                label: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "167.98.33.2",
                symbolSize: this.getRem(150),
                label: {
                  show: false,
                },
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ip_1.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
                category: 1,
              },
              {
                name: "178.32.4.2",
                symbolSize: this.getRem(150),
                draggable: true,
                label: {
                  show: false,
                },
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ip_2.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
                category: 1,
              },
              {
                name: "12.5.632.67",
                symbolSize: this.getRem(150),
                draggable: true,
                label: {
                  show: false,
                },
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ip_3.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
                category: 1,
              },
            ],
            links: [
              {
                source: "192.168.122.5",
                target: "167.98.33.2",
              },
              {
                source: "192.168.122.5",
                target: "178.32.4.2",
              },
              {
                source: "192.168.122.5",
                target: "12.5.632.67",
              },
            ],
            categories: [{ name: "0" }, { name: "1" }, { name: "2" }],
          },
        ],
      };
      chart1.setOption(option1);
      window.addEventListener("resize", () => {
        chart1.resize();
      });
    },
    initChart() {
      const chart = this.$echarts.init(this.$refs.chart);
      let me = this;
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "rgba(0,101,153,.5)",
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
          confine: true,
          // show: true,
          padding: [10, 10],
          formatter(e) {
            return e.data.name;
          },
        },
        animationDurationUpdate: this.getRem(2000),
        animationEasingUpdate: "quinticInOut",
        color: ["#83e0ff", "#45f5ce", "#b158ff"],
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: this.getRem(800),
              edgeLength: 100,
            },
            //  focusNodeAdjacency: true,
            edgeSymbol: ["circle", "circle"], //线2头标记
            edgeSymbolSize: 4,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0,
              },
            },
            roam: true,
            label: {
              normal: {
                show: true,
              },
            },
            data: [
              {
                name: "192.168.122.5",
                symbolSize: this.getRem(150),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/items_icon.png")}`,
                // draggable: true,
                category: 0,
                label: {
                  show: false,
                },

                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "信息安全",
                symbolSize: this.getRem(150),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ sphere_normal.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
                category: 1,
              },
              {
                name: "民族宗教事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                category: 1,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "谣言事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                category: 1,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "淫秽色情事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                category: 1,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "虚假信息事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                // category: 1,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "其它信安事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                // category: 1,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              // ************************************************************
              {
                name: "漏洞风险",
                symbolSize: this.getRem(150),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ sphere_normal.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "IBM Watson 跨站脚本漏洞",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                // category: 2,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "IBM Watson 开放重定向漏洞",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                // category: 2,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "CUPS本地化字符串权限提升漏洞",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                // category: 2,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "Adobe Flash Player整数溢出任意代码执行漏洞",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                // category: 3,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "IBM Security Network Protection跨站请求伪造漏洞",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                // category: 3,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              // ***************************************
              {
                name: "网安事件",
                symbolSize: this.getRem(150),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ sphere_normal.png")}`,
                category: 2,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "系统漏洞事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "WEB漏洞事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "可用性事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "网站挂马事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
              {
                name: "其它网安事件",
                label: {
                  show: false,
                },
                symbolSize: this.getRem(70),
                draggable: true,
                symbol: `image://${require("../../public/static/img/imgs/ip/img_ball_normal.png")}`,
                itemStyle: {
                  normal: {
                    color: "#001c43",
                  },
                },
              },
            ],
            links: [
              {
                source: "192.168.122.5",
                target: "信息安全",
              },
              {
                source: "192.168.122.5",
                target: "漏洞风险",
              },
              {
                source: "192.168.122.5",
                target: "网安事件",
              },
              // *******************
              {
                source: "信息安全",
                target: "民族宗教事件",
              },
              {
                source: "信息安全",
                target: "虚假信息事件",
              },
              {
                source: "信息安全",
                target: "淫秽色情事件",
              },
              {
                source: "信息安全",
                target: "谣言事件",
              },
              {
                source: "信息安全",
                target: "其它信安事件",
              },
              // ******************
              {
                source: "漏洞风险",
                target: "IBM Security Network Protection跨站请求伪造漏洞",
              },
              {
                source: "漏洞风险",
                target: "Adobe Flash Player整数溢出任意代码执行漏洞",
              },
              {
                source: "漏洞风险",
                target: "CUPS本地化字符串权限提升漏洞",
              },
              {
                source: "漏洞风险",
                target: "IBM Watson 开放重定向漏洞",
              },
              {
                source: "漏洞风险",
                target: "IBM Watson 跨站脚本漏洞",
              },
              // *********************
              {
                source: "网安事件",
                target: "系统漏洞事件",
              },
              {
                source: "网安事件",
                target: "网站挂马事件",
              },
              {
                source: "网安事件",
                target: "可用性事件",
              },
              {
                source: "网安事件",
                target: "WEB漏洞事件",
              },
              {
                source: "网安事件",
                target: "其它网安事件",
              },
            ],
            categories: [{ name: "0" }, { name: "1" }, { name: "2" }],
          },
        ],
      };
      chart.on("click", (e) => {
        if (
          e.data.name == "网安事件" ||
          e.data.name == "信息安全" ||
          e.data.name == "漏洞风险"
        ) {
          me.check = "security";
          me.toTop(e.data.name);
        } else if (e.data.name == "192.168.122.5") {
          me.check = "info";
        }
      });
      chart.setOption(option);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
    changeTab(e) {
      this.check = e;
      if (e == "trace") {
        this.initChart1();
      }
      if (e == "security" || e == "info") {
        this.initChart();
      }
    },

    clickIp() {
      this.check = "security";
    },
  },
};
</script>