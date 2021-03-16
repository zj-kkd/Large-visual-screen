<template>
  <div class="page-antifraud" v-if="IndustrialInterData">
    <div class="main">
      <div class="left">
        <div class="part">
          <IndustrialInterDate
            :chartData="[IndustrialInterData.industrial_internet_data, IndustrialInterData.industrial_industryt_top5]"
          ></IndustrialInterDate>
        </div>
        <div class="part">
          <DeviceQty
            :chartData="[IndustrialInterData.network_equipment_top5, IndustrialInterData.cloud_platform_top5]"
          ></DeviceQty>
        </div>
        <div class="part">
          <SecurityEventType
            :chartData="IndustrialInterData.security_incident_categories"
            :type="type1"
          ></SecurityEventType>
        </div>
      </div>

      <div class="center">
        <div class="part">
          <DefraudTypeNumber :chartData="IndustrialInterData.data_statistics"></DefraudTypeNumber>
        </div>
        <div class="part">
          <DefraudMap :chartData="IndustrialInterData.industrial_data_map"></DefraudMap>
        </div>
        <div class="part center-bottom">
          <SecurityEventTop
            :title="'安全事件数TOP10'"
            :chartData="topData.event"
            :colorList="['rgba(77, 104, 150, .5)', 'rgba(77, 104, 150, .3)']"
          ></SecurityEventTop>
          <SecurityEventTop
            :title="'安全漏洞数TOP10'"
            :chartData="topData.bug"
            :colorList="['rgba(205,177,109,0.5)', 'rgba(205,177,109,0.3)']"
          ></SecurityEventTop>
        </div>
      </div>

      <div class="right">
        <div class="part">
          <TogetherInfo
            :chartData="[IndustrialInterData.collaborative_linkage_info, IndustrialInterData.detection_order_issuance]"
          ></TogetherInfo>
        </div>
        <div class="part">
          <SecurityEventType
            :chartData="IndustrialInterData.security_loophole_categories"
            :type="type2"
          ></SecurityEventType>
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
      .part {
        width: 100%;
      }
    }
    .right {
      .part {
      }
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
        &.center-bottom {
          margin-bottom: 0;
          display: flex;
          & div:first-of-type {
            margin-right: 20rem;
          }
        }
      }
    }
  }
}
</style>
<script>
import IndustrialInterDate from "../components/industrialInter/IndustrialInterDate";
import DeviceQty from "../components/industrialInter/DeviceQty";
import SecurityEventType from "../components/industrialInter/SecurityEventType";
import TogetherInfo from "../components/industrialInter/TogetherInfo";
import SecurityEventTop from "../components/industrialInter/SecurityEventTop";

import DefraudTypeNumber from "../components/antiFraud/DefraudTypeNumber";
import DefraudMap from "../components/antiFraud/DefraudMap";
// import DefraudMsg from "../components/antiFraud/DefraudMsg";

export default {
  components: {
    DefraudTypeNumber,
    DefraudMap,
    TogetherInfo,
    // DefraudMsg,
    IndustrialInterDate,
    DeviceQty,
    SecurityEventType,
    SecurityEventTop,
  },
  data() {
    return {
      IndustrialInterData: "",
      antifraudData: "",
      topData: {
        event: {
          left: [],
          right: [],
        },
        bug: {
          left: [],
          right: [],
        },
      },

      type1: { name: "安全事件类别占比", name1: "事件类型", type: "radius" },
      type2: { name: "安全漏洞类型占比", name1: "漏洞类型", type: "" },

    };
  },
  created() {
    this.$http.get("/showData/getData/industrial_internet").then(({ data }) => {
      data.nameSpace = "IndustrialInterData";
      this.$store.commit("setData", data);
      this.IndustrialInterData = this.$store.state.IndustrialInterData;
      this.topData.event.left = [
        data.security_incidents_top10_today,
        data.security_incidents_top10_month,
        data.security_incidents_top10_year,
      ];
      this.topData.event.right = [
        data.security_industryt_top10_today,
        data.security_industryt_top10_month,
        data.security_industryt_top10_year,
      ];

      this.topData.bug.left = [
        data.security_loophole_top10_today,
        data.security_loophole_top10_month,
        data.security_loophole_top10_year,
      ];
      this.topData.bug.right = [
        data.security_loophole_industryt_top10_today,
        data.security_loophole_industryt_top10_month,
        data.security_loophole_industryt_top10_year,
      ];
      console.log(333, this.IndustrialInterData.data_map)
    });
    setInterval(() => {
      this.$http
        .get("/showData/getData/industrial_internet")
        .then(({ data }) => {
          data.nameSpace = "IndustrialInterData";
          this.$store.commit("setData", data);
          this.IndustrialInterData = this.$store.state.IndustrialInterData;
        });
    }, 5000);
  },
};
</script>