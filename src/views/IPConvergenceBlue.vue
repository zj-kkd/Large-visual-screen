<template>
  <div class="page-ip-Convergence">
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
        <div class="ip-chart">
            <div class="mark1" @click="clickIp(1)"></div>
            <div class="mark2" @click="clickIp(2)"></div>
            <div class="mark3" @click="clickIp(3)"></div>
            <img :src="require(`../../public/static/img/imgs/ip/ip_info${bg}.png`)" alt />
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
              <dd v-for="(item1, index1) in item.data" :key="index1">{{item1.name + '：' + item1.value}}</dd>
            </dl>
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
          border: 1rem solid $blue1;
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
          border: 1rem solid $blue1;
          border-radius: 0 3rem 3rem 0;
          background: rgba(95, 113, 217, 0.2);
          img {
            width: 20rem;
            margin: 5rem 10rem;
            line-height: 30rem;
          }
        }
      }


      .ip-chart {
          width: 1446rem;
          height: 830rem;
          margin-top: 50rem;
        position: relative;
        .mark1,
        .mark2,
        .mark3 {
          position: absolute;
          width: 100rem;
          height: 100rem;
          // border: 1rem solid red;
          opacity: .1;
        }
        .mark1 {
          width: 200rem;
          height: 200rem;
          left: 45.5%;
          top: 44%;
          z-index: 12;
        }
        .mark2 {
          width: 100rem;
          height: 100rem;
          left: 23%;
          top: 18.5%;
          z-index: 11;
        } 
        .mark3 {
          z-index: 10;
          width: 80rem;
          height: 80rem;
          left: 28%;
          top: 0%;
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
        // .bar {
        //   width: 4rem;
        //   border-radius: 2rem;
        //   position: absolute;
        //   background-color: #34605e;
        //   opacity: 0;
        //   height: calc(100%);
        //   right: 8rem;
        // }
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
export default {
  data() {
    return {
      searchData: "",
      check: "left",
      bg: 1,
      showData: "",
       ops: {
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false,
          background: "#34605e",
          // opacity: 0.3,
          size: "4rem"
        }
      },
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
  created() {
    this.showData = this.data.data1.ipInfoLeft;
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