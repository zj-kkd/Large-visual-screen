<template>
  <div class="home" v-if="homeData">
    <!-- <Header :title="'浙江省通信大数据综合管理平台'"></Header> -->
    <div class="main">
      <div class="left">
        <div class="part">
          <!-- 网站信息统计 -->
          <Title :title="'网站信息统计'"></Title>
          <div class="web-statistics">
            <ul>
              <li v-for="(item, index) in homeData.website_statistics" :key="index">
                <p class="type">{{item.name}}</p>
                <p class="value">
                  <countTo
                    :startVal="index == 3 ? 0 : (isFirst ? 0: item.value)"
                    :endVal="index == 3 ? +item.value.substr(0, item.value.length - 1) : +item.value"
                    :duration="2000"
                  ></countTo>
                  <span v-if="index == 3">%</span>
                </p>
              </li>
            </ul>
            <div class="web-top10">
              <p class="title">活跃网站TOP5排行</p>
              <ul>
                <li v-for="(item, index) in homeData.active_website.slice(0,5)" :key="index">
                  <span :class="index < 3 ? 'top3 top': 'top'">{{index + 1}}</span>
                  <span class="name text-overfllow">{{item.name}}</span>
                  <span class="url text-overfllow">{{item.ip}}</span>
                  <span class="bg">
                    <span
                      class="data animate-left"
                      :style="{width: item.value / homeData.active_website[0].value * 100 + '%'}"
                    ></span>
                  </span>
                  <span class="line"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="part">
          <Title :title="'IDC/ISP接入企业统计'"></Title>
          <div class="idc-isp">
            <ul>
              <li v-for="(item, index) in homeData.enterprise_statistics" :key="item.type">
                <img :src="require(`../../public/static/img/icons/${IDC[index].url}.png`)" alt />
                <p>
                  <span class="type">{{item.name}}</span>
                  <span class="num">{{item.value}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="part">
          <Map :mapData="homeData.enterprise_distributed_statistics"></Map>
        </div>
      </div>

      <div class="control-center">
        <!-- 主页入口 -->
        <!-- 安全评分 -->
        <div class="part">
          <div class="score">
            <span class="time">{{getTime()}}</span>
            <span>全省网络健康状态</span>
            <el-rate
              v-model="scoreValue"
              disabled
              :colors="['#00FFA0', '#00FFA0', '#00FFA0']"
              disabled-void-color="rgba(255,255,255,0.2)"
            ></el-rate>
          </div> 
        </div>
        <div class="part">
          <Nav></Nav>
        </div>
        <!-- 反诈监测 -->
        <div class="part center-bottom">
          <div class="center-bottom-left">
            <Title :title="'反诈监测情况'"></Title>
            <Monitor></Monitor>
          </div>
          <div class="center-bottom-right">
            <Title :title="'数据安全事件'"></Title> 
            <DataSecurityEvent :chartData="homeData.info_security"></DataSecurityEvent>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="part">
          <Title :title="'网络安全'"></Title>
          <WebSecurity :type="'网安事件'" :chartData="homeData.web_security"></WebSecurity>
        </div>
        <div class="part">
          <div class="jiang-m-r">
            <li v-for="(item, index) in homeData.zombie_creep_statistics" :key="index">
              <div class="value">
                <countTo :startVal="isFirst ? 0: item.value" :endVal="+item.value" :duration="2000"></countTo>
              </div>
              <div class="name">{{item.name}}</div>
            </li>
          </div>
        </div>
        <div class="part">
          <Title :title="'信安事件接入商TOP10'"></Title>
          <WebSecurityEvent :chartData="homeData.unhealthy_info.slice(0,10)"></WebSecurityEvent>
        </div>
        <div class="part">
          <Title :title="'工业互联网行业数据'"></Title>
          <IndustrialInter
            :chartData="homeData.industrial_internet"
          ></IndustrialInter>

        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home {
  padding-top: 10rem;
  width: 100%;
  height: 100%;
  .main {
    padding-top: 10rem; 
    padding-left: 10rem;
    padding-right: 10rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    // border: 1rem solid red;
    .left,
    .right { 
      // border: 1rem solid red;
      display: flex;
      flex-wrap: wrap;
      width: 22%;
      align-content: space-between;
      height: calc(100vh - 90rem);
      .part {
        width: 100%;
        // border: 1rem solid red;
      }
    }
    .right {
      .part {
        .jiang-m-r {
          width: 100%;
          display: flex;
          justify-content: space-between;
          li {
            color: $ccc;
            text-align: center;
            width: 31%;
            .name,
            .value {
              width: 100%;
              background:rgba(27,48,72,0.25);
              border: 1rem solid rgba(255, 255, 255, 0.2);
            }
            .name {
              font-size: 14rem;
              height: 26rem;
              margin-top: 10rem;
              margin-bottom: 15rem;
              line-height: 24rem;
            }
            .value {
              position: relative;
              &::after {
                position: absolute;
                top: 0;
                left: 0;
                content: "";
                display: inline-block;
                width: 0;
                height: 0;
                border: 5rem solid $blue3;
                border-right-color: transparent;
                border-bottom-color: transparent;
              }
              height: 45rem;
              line-height: 45rem;
              font-size: 60rem;
              font-family: "font-Family-self";
            }
          }
        }
      }
    }
    .left {
      .part {
        .web-statistics {
          margin-top: 20rem;
          font-size: 12rem;
          color: #fff;
          ul {
            padding-left: 10rem;
            margin-top: 10rem;
            justify-content: space-between;
            display: flex;
            li {
              width: 23%;
              text-align: center;
              height: 70rem;
              .type {
                border-left: 2rem solid $blue2;
                background: $bg05;
                height: 26rem;
                line-height: 26rem;
              }
              .value {
                font-family: "font-Family-self";
                width: 100%;
                font-size: 40rem;
                color: $ccc;
                line-height: 40rem;
              }
            }
          }
        }
        .web-top10 {
          margin-top: 20rem;
          font-size: 12rem;
          color: #fff;
          padding-left: 10rem;
          ul {
            flex-wrap: wrap;
            padding: 10rem;
            background-image: url("../../public/static/img/imgs/home_top5_outline.png");
            background-size: 100% 100%;
            li {
              border-bottom: 1rem dashed rgba(107, 238, 187, 0.1);
              color: #999;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 40rem;
              position: relative;
              padding-right: 20rem;
              .name {
                width: 20%;
                text-align: left;
              }
              .url {
                width: 30%;
              }
              .line {
                height: 1rem;
                width: 10rem;
                background-color: $blue3;
                position: absolute;
                bottom: 0;
                right: 0;
              }
              .top {
                color: #fff;
                background-color: #414845;
                width: 30rem;
                border-radius: 3rem;
                &.top3 {
                  background-color: #ac702a;
                }
              }
              .bg {
                height: 6rem;
                width: 30%;
                background: rgba(117, 120, 124, 0.26);
                position: relative;
                overflow: hidden;
                .data {
                  position: absolute;
                  left: 0;
                  width: 50%;
                  height: 100%;
                  background: $blue3;
                }
              }
            }
          }
        }
        .idc-isp {
          color: #fff;
          ul {
            padding-left: 10rem;
            display: flex;
            flex-wrap: wrap;
            li {
              display: flex;
              padding: 25rem 0;
              &:nth-child(1),
              &:nth-child(2) {
                border-bottom: 1rem dashed rgba(107, 238, 187, 0.1);
              }
              img {
                width: 50rem;
                height: 50rem;
              }
              p {
                display: flex;
                flex: 1;
                flex-wrap: wrap;
                align-content: space-around;
                span {
                  width: 100%;
                  margin-left: 10rem;
                }
                .type {
                  font-size: 12rem;
                  color: #999;
                }
                .num {
                  font-size: 20rem;
                  color: $ccc;
                }
              }
              width: 50%;
            }
          }
        }
      }
    }
    .control-center {
      // overflow: hidden;
      padding: 0 30rem;
      height: calc(100vh - 90rem);
      width: 56%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .score {
        width: 100%;
        height: 90rem;
        background-image: url("../../public/static/img/imgs/score_bg.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 75% 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18rem;
        color: rgba(255, 255, 255, .8);
        span {
          margin: 0 10rem;
        }
      }
      .part {
        // border: 1rem solid red;
        width: 100%;
        &.center-bottom {
          .center-bottom-left {
            width: 60%;
            margin-right: 30rem;
          }
          .center-bottom-right {
            width: 40%;
          }
          display: flex;
        }
      }
    }
  }
}
</style>
<script>
// import Header from "../components/Header";
import Title from "../components/Title";
import Nav from "../components/home/Nav";
import Map from "../components/home/Map";
// import WebSecurity from "../components/home/WebSecurity1";
import WebSecurity from "../components/home/WebSecurity";
import WebSecurityEvent from "../components/home/InfoSecurityEvent";
import Monitor from "../components/home/Monitor";
import IndustrialInter from "../components/home/IndustrialInter";
import DataSecurityEvent from '../components/home/DataSecurityEvent'

import countTo from "vue-count-to";
export default {
  data() {
    return {
      homeData: "", // 默认数据,
      IDC: [
        { url: "icon_all" },
        { url: "icon_yichang" },
        { url: "icon_weibaobei" },
        { url: "icon_buliang" },
      ],
      isFirst: true,
      scoreValue: 4.5,
    };
  },
  components: {
    // Header,
    Title,
    Nav,
    Map,
    WebSecurity,
    WebSecurityEvent,
    countTo,
    Monitor,
    IndustrialInter,
    DataSecurityEvent
  },
  created() {
    this.$http.get("/showData/getData/main").then(({ data }) => {
      data.nameSpace = "homeData";
      this.$store.commit("setData", data);
      this.homeData = this.$store.state.homeData;
       console.log(999, this.homeData)
    });
  },
  methods: {
    getTime() {
      let date = new Date();
      let time =
        date.getFullYear() + "-" + (date.getMonth() <= 9 ? ('0' + (date.getMonth() + 1)): (date.getMonth() + 1)) + "-" + (date.getMonth() <= 9 ? ('0' + (date.getDate())): (date.getDate()));
      return time;
    }
  },
  
  mounted() {
    setTimeout(() => {
      this.isFirst = false
    }, 1000);
    setInterval(() => {
      this.$http.get("/showData/getData/main").then(({ data }) => {
        data.nameSpace = "homeData";
        this.$store.commit("setData", data);
        this.homeData = this.$store.state.homeData;
      });
    }, 5000);
  }
};
</script>