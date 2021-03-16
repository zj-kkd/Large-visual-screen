<template>
  <div class="center-bottom">
    <div class="top10">
      <Title title="信安事件企业TOP10" :showMore="true"></Title>
      <InfoSecurityTop></InfoSecurityTop>
    </div>
    <div class="bad-info">
      <Title title="不良信息行业分布"></Title>
      <BadInfo></BadInfo>
    </div>
  </div>
</template>

<script>
import Title from "../../components/InfoSecurityTitle";
import InfoSecurityTop from '../../components/InfoSecurityCenter/InfoSecurityTop';
import BadInfo from '../../components/InfoSecurityCenter/BadInfo';

export default {
  components: { Title, InfoSecurityTop, BadInfo },
};
</script>

<style lang="scss" scoped>
.center-bottom {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  & > div {
    width: 48%;
    height: 330rem;
  }
}
</style>