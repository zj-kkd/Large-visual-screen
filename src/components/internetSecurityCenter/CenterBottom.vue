<template>
  <div class="center-bottom">
    <div class="chart-bar">
      <Title title="我省网站篡改情况TOP10"></Title>
      <WebsiteDefacement></WebsiteDefacement>
    </div>
    <div class="visit-top">
      <Title title="我省行业漏洞趋势"></Title>
      <BugTrend></BugTrend>
    </div>
  </div>
</template>

<script>
import Title from "../../components/Title";
import WebsiteDefacement from '../../components/internetSecurityCenter/WebsiteDefacement';
import BugTrend from '../../components/internetSecurityCenter/BugTrend';

export default {
  components: { Title, WebsiteDefacement, BugTrend },
};
</script>

<style lang="scss" scoped>
.center-bottom {
  display: flex;
  justify-content: space-between;
  & > div {
    width: 48%;
    height: 305rem;
  }
}
</style>