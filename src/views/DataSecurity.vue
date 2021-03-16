<template>
  <div class="page-antifraud" v-if="dataSecurityData">
    <div class="main">
      <div class="left">
        <div class="big-title">重要数据资源分布</div>
        <div class="part">
          <DataDistribute
            :chartData="{type1: dataSecurityData.major_data_company_self, type2: dataSecurityData.major_data_company_knowledge, type3: dataSecurityData.major_data_company_others}"
          ></DataDistribute>
        </div>
      </div>
      <div class="center">
        <div class="part">
          <ControlRate></ControlRate>
        </div>
      </div>
      <div class="right">
        <div class="big-title">网络数据安全专项监测</div>
        <div class="part">
          <WebDataSecurity :chartData="{data1: dataSecurityData.APP_illegal_monitor_new, data2: dataSecurityData.data_security_info}"></WebDataSecurity>
        </div>
      </div>
      <div class="bottom">
        <div class="big-title">网络数据安全常规监测</div>
        <div class="b-left">
          <EnterpriseData :chartData="dataSecurityData.data_security_manage" :tab="['已完成', '未完成', '企业数据安全管理概况']"></EnterpriseData>
        </div>
        <div class="b-center">
          <WebData></WebData>
        </div>
        <div class="b-right">
          <EnterpriseData :chartData="dataSecurityData.company_data_security_manage" :tab="['具备', '未具备', '企业数据安全技术能力评估']"></EnterpriseData>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-antifraud {
  width: 100%;
  height: 100%;
  .main {
    .big-title {
      width: 100%;
      text-align: center;
      font-size: 18rem;
      color: #fff;
      position: absolute;
      top: -10rem;
      left: 0;
    }
    padding-top: 25rem;
    padding-left: 15rem;
    padding-right: 15rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .left,
    .right,
    .bottom {
      padding-top: 30rem;
      padding-left: 15rem;
      padding-right: 15rem;
      position: relative;
    }
    .bottom {
      width: 100%;
      height: 32vh;
      background-image: url("../../public/static/img/imgs/shujuanquan/img_databottombg.png");
      background-size: 100% 100%;
      margin-top: 20rem;
      display: flex;
      .b-center {
        height: 100%;
        flex: 1;
        margin: 0 15rem;
      }
      .b-left,
      .b-right,
      .b-center {
        padding-right: 20rem;
        width: 22%;
        height: 100%;
      }
    }
    .left,
    .right {
      background-image: url("../../public/static/img/imgs/shujuanquan/img_datamainbg.png");
      background-size: 100% 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      width: 22%;
      //   height: calc(100vh - 90rem - 360rem - 25rem);
      height: 55vh;
      .part {
        width: 100%;
      }
    }
    .right {
      //   .part {
      //   }
    }
    .center {
      padding: 0 20rem;
      //   height: calc(100vh - 90rem - 360rem - 25rem);
      height:50vh;
      width: 56%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .part {
        width: 100%;
      }
    }
  }
}
</style>
<script>
import DataDistribute from "../components/dataSecurity/DataDistribute";
import WebDataSecurity from "../components/dataSecurity/WebDataSecurity";
import EnterpriseData from "../components/dataSecurity/EnterpriseData";
import WebData from "../components/dataSecurity/WebData";
import ControlRate from "../components/dataSecurity/ControlRate";

export default {
  components: {
    DataDistribute,
    WebDataSecurity,
    EnterpriseData,
    WebData,
    ControlRate,
  },
  data() {
    return {
      dataSecurityData: "",
      data1: {},
    };
  },
  created() {
    this.$http.get("/showData/getData/data_info").then(({ data }) => {
      data.nameSpace = "dataSecurityData";
      this.$store.commit("setData", data);
      this.dataSecurityData = this.$store.state.dataSecurityData;
    });
    setInterval(() => {
      this.$http.get("/showData/getData/data_info").then(({ data }) => {
        data.nameSpace = "dataSecurityData";
        this.$store.commit("setData", data);
        this.dataSecurityData = this.$store.state.dataSecurityData;
      });
    }, 5000);
  },
};
</script>