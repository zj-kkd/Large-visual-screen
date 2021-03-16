<template>
  <div class="page-internet-security" v-if="webSecurityData">
    <div class="main">
      <div class="left">
        <div class="part">
          <Title title="网络安全事件数"></Title>
          <TodaySecurity
            :chartData="webSecurityData.today_cybersecurity_incident.slice(0,3)"
            :color="color1"
            :max="webSecurityData.today_cybersecurity_incident[0].value"
          ></TodaySecurity>
          <TodaySecurity
            :chartData="webSecurityData.today_cybersecurity_incident.slice(3)"
            :color="color2"
            :max="webSecurityData.today_cybersecurity_incident[0].value"
          ></TodaySecurity>
        </div>
        <div class="part">
          <Title title="恶意程序感染事件分析"></Title>
          <div class="malware">
            <li v-for="item in webSecurityData.malicious_program" :key="item.name">
              <p>{{item.name}}</p>
              <p class="num">{{item.value}}</p>
            </li>
            <div class="all">
              <p>总数</p>
              <p class="num">{{webSecurityData.malicious_program.reduce((prev, item) => prev + item.value, 0)}}</p>
            </div>
          </div>
        </div>
        <div class="part">
          <Title title="近12月僵木蠕安全事件趋势"></Title>
          <div class="hazard-level"></div>
          <JiangMuRu :chartData="webSecurityData.serurity_last_12months"></JiangMuRu>
        </div>
      </div>

      <div class="center">
        <div class="part">
           <AllNumber :title="'网络安全事件总数'" :allNumber="data5" :add="add"></AllNumber>
        </div>
        <div class="part">
          <Map></Map>
        </div>
        <div class="part">
          <CenterBottom></CenterBottom>
        </div>
      </div>

      <div class="right">
        <div class="part">
          <Title title="移动互联网恶意程序样本"></Title>
          <div class="hazard-level">
            <li v-for="item in webSecurityData.malicious_program_type" :key="item.name">
              <span>{{ '【' + item.name + '】'}}</span>
              <span>{{item.value}}</span>
            </li>
          </div>
        </div>
        <div class="part">
          <MaliciousProgram :height="'190rem'" :chartData="webSecurityData.malicious_program_samples.slice(1)"></MaliciousProgram>
        </div>
        <div class="part">
          <Downloads :chartData="webSecurityData.malicious_program_download"></Downloads>
        </div>
        <div class="part">
          <Title title="我省漏洞整体趋势"></Title>
          <LouDongQuShi :type="'漏洞数'" :chartData="webSecurityData.overall_loopholes_type"></LouDongQuShi>
        </div>
        <div class="part">
          <Bug></Bug>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-internet-security {
  width: 100%;
  height: 100%;
  .main {
    padding-left: 10rem;
    padding-right: 10rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .left,
    .right {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      width: 22%;
      height: calc(100vh - 90rem);
      // border: 1rem solid red;
      .part {
        width: 100%;
        // border: 1rem solid red;
        .malware {
          margin-top: 15rem;
          position: relative;
          width: 100%;
          height: 280rem;
          background-image: url("../../public/static/img/imgs/wangan/img_eycxbg.png");
          background-size: 100%;
          background-position: 0 10rem;
          background-repeat: no-repeat;
          font-size: 15rem;
          color: rgba(149, 216, 255, 1);
          // padding-left: 10rem;
          display: flex;
          flex-wrap: wrap;
          text-align: center;
          .all {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -48rem;
            margin-top: -30rem;
            width: 100rem;
            height: 50rem;
            .num {
              font-family: "font-Family-self";
              font-size: 45rem;
              line-height: 30rem;
            }
          }
          li {
            &:nth-of-type(odd) {
              p {
                width: 60%;
                margin-left: 10rem;
              }
            }
            &:nth-of-type(even) {
              p {
                width: 60%;
                margin-left: 55rem;
              }
            }
            height: 50%;
            width: 50%;
            padding-top: 40rem;
            .num {
              font-family: "font-Family-self";
              font-size: 45rem;
              line-height: 40rem;
            }
          }
        }
        .hazard-level {
          margin-top: 15rem;
          font-size: 14rem;
          color: rgba(254, 254, 254, 0.6);
          display: flex;
          justify-content: space-between;
          padding-left: 10rem;
          li {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 31%;
            background-color: $bg05;
            height: 30rem;
            border: 1rem solid $blue1;
            & span:first-child {
              position: relative;
              margin-left: -5rem;
            }
          }
        }
      }
    }
    .right {
      // overflow: hidden;
      // overflow-x: hidden;
    }
    .center {
      padding: 0 20rem;
      height: calc(100vh - 90rem);
      width: 56%; 
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .part {
        width: 100%;
        .today-security {
          display: flex;
          justify-content: center;
          margin-top: 20rem;
          height: 55rem;
          font-size: 13rem;
          color: rgba(179, 179, 179, 1);
          .add {
            position: relative;
            width: 20rem;
            width: 100rem;
            height: 100%;
            top: -4rem;
            img {
              height: 70%;
              margin-right: 10rem;
              line-height: 50rem;
              position: relative;
              top: 18rem;
            }
            .add-text {
              display: block;
              width: 50rem;
              position: absolute;
              font-size: 10px;
              color: #999;
              position: absolute;
              bottom: 0;
              left: 33rem;
            }
            .add-num {
              font-size: 25rem;
              color: #e4da39;
              
            }
          }
          .title {
            line-height: 55rem;
            font-size: 18rem;
            color: #e4da39;
          }
          .num {
            text-align: center;
            height: 100%;
            margin: 0 30rem;
            span {
              font-family: "font-Family-number";
              margin: 0 5rem;
              display: inline-block;
              width: 35rem;
              height: 55rem;
              font-size: 45rem;
              color: #e4da39;
              border-radius: 5rem;
              background-color: #2c4f4f;
              border: 1rem solid #66a794;
              &.douhao {
                background-color: transparent;
                border: 1rem solid transparent;
                margin: 0;
                width: 20rem;
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
import Title from "../components/Title";
import JiangMuRu from "../components/internetSecurityCenter/JiangMuRu";
import Downloads from "../components/internetSecurityCenter/Downloads";
import LouDongQuShi from "../components/home/WebSecurity";
import Bug from "../components/internetSecurityCenter/Bug";
import MaliciousProgram from "../components/xinxiguankong/YiChangWangZhanShuLiang";
import TodaySecurity from "../components/internetSecurityCenter/TodaySecurity";
import Map from "../components/internetSecurityCenter/Map";
import CenterBottom from "../components/internetSecurityCenter/CenterBottom";
// import IPNum from '../components/xinxiguankong/IPNum';
import AllNumber from '../components/AllNumber'
export default {
  components: {
    Title,
    Downloads,
    LouDongQuShi,
    MaliciousProgram,
    TodaySecurity,
    JiangMuRu,
    Bug,
    Map,
    CenterBottom,
    AllNumber
  },
  created() {
    this.$http.get("/showData/getData/internet_security").then(({ data }) => {
      data.nameSpace = "webSecurityData";
      this.$store.commit("setData", data);
      this.webSecurityData = this.$store.state.webSecurityData;
      console.log(23333333, this.webSecurityData);
    });
  },
  mounted() {
    setInterval(() => {
      this.$http.get("/showData/getData/internet_security").then(({ data }) => {
        data.nameSpace = "webSecurityData";
        this.$store.commit("setData", data);
        this.webSecurityData = this.$store.state.webSecurityData;
      });
    }, 5000);
    setInterval(() => {
      this.data5 = this.data5 + 1
      this.add = this.add + 1
    }, 3000);
  },
  data() {
    return {
      webSecurityData: "",
      
      color1: [
        ["#4c7e90", "#2f3535"],
        ["#77302c", "#2f3535"],
        ["#797954", "#2f3535"]
      ],
      color2: [
        ["#594559", "#2f3535"],
        ["#655440", "#2f3535"],
        ["#437878", "#2f3535"]
      ],
      add: 47,
      data5: 29467
      
    };
  }
};
</script>