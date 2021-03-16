<template>
  <div class="page-mc" v-if="controlData">
    <div class="main">
      <div class="left">
          <div class="part">
              <Title title="浙江省网站/IP活跃趋势"></Title>
              <WebIPActiveTrend></WebIPActiveTrend>
          </div>
          <div class="part">
              <Title title="网站行业分布TOP10"></Title>
              <WebTradeTop :chartData="controlData.website_distribution" :title="title1"></WebTradeTop>
          </div>
          <div class="part">
              <Title title="IP数量TOP10运营商"></Title>
              <IPTop :chartData="controlData.IP_number"></IPTop>
          </div>
      </div>

      <div class="center">
        <div class="part">
          <IPNum :chartData="controlData.IP_statistics"></IPNum>
        </div>
        <div class="part">
          <ZheJiangMap :chartData="controlData.data_map"></ZheJiangMap>
        </div>
        <div class="part">
          <CenterBottom></CenterBottom>
        </div>
      </div>

      <div class="right">
          <div class="part">
              <Title title="异常网站数量与分布"></Title>
              <YiChangWangZhanShuLiang :height="'250rem'" :chartData="controlData.abnormal_website_number"></YiChangWangZhanShuLiang>
          </div>
          <div class="part">
              <Title title="备案情况"></Title>
              <ICP :chartData="[controlData.ICP_record_number, controlData.APP_record_number, controlData.rating_record_number]"></ICP>
          </div>
          <div class="part">
              <Title title="网站访问排名TOP10"></Title>
              <WangZhanFangWenTop10></WangZhanFangWenTop10>
          </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-mc {
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
      // overflow: hidden;
    }
    .center {
      padding: 0 20rem;
      height: calc(100vh - 90rem);
      width: 56%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      // border: 1rem solid red;
      .part {
        width: 100%;
      }
    }
  }
}
</style>
<script>
import Title from '../components/Title'
import WebIPActiveTrend from '../components/xinxiguankong/WebIPActiveTrend'
import WebTradeTop from '../components/xinxiguankong/WebTradeTop'
import IPTop from '../components/xinxiguankong/IPTop'
import YiChangWangZhanShuLiang from '../components/xinxiguankong/YiChangWangZhanShuLiang'
import ZheJiangMap from '../components/xinxiguankong/ZheJiangMap'
import ICP from '../components/xinxiguankong/ICP'
import WangZhanFangWenTop10 from "../components/xinxiguankong/WangZhanFangWenTop10"
import IPNum from "../components/xinxiguankong/IPNum"
import CenterBottom from "../components/xinxiguankong/CenterBottom"
export default {
  
  components: {
   Title,
   WebIPActiveTrend,
   WebTradeTop,
   IPTop,
   YiChangWangZhanShuLiang,
   ZheJiangMap,
   ICP,
   WangZhanFangWenTop10,
   IPNum,
   CenterBottom
  },
  data() {
    return {
      controlData: '',
      title1: ['网站数', '网站类型', '网站类型', '网站数']
    }
  },  
  created() {
    this.$http.get("/showData/getData/control_info").then(({ data }) => {
      data.nameSpace = "controlData";
      this.$store.commit("setData", data);
      this.controlData = this.$store.state.controlData;
      console.log(999, this.controlData)
    });
    setInterval(() => {
      this.$http.get("/showData/getData/control_info").then(({ data }) => {
        data.nameSpace = "controlData";
        this.$store.commit("setData", data);
        this.controlData = this.$store.state.controlData;
      });
    }, 5000);
  },
};
</script>