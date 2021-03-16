<template>
  <div class="com-website">
    <div class="main">
        <li v-for="item in websiteData" :key="item.status" class="list">
            <div class="title">{{item.status}}</div>
            <div class="num"><countTo :startVal='0' :endVal='+item.num' :duration='3000'></countTo></div>
        </li>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.com-website {
    background-color: red;
    width: 100%;
    .main {
        margin-top: 15px;
        display: flex;
        padding-left: 10px;
        justify-content: space-between;
        .list {
            width: 31%;
            .title {
                height: 26px;
                background-color: #182830;
                border-left: 1px solid #096974;
                font-size: 12px;
                line-height: 26px;
                text-align: center;
                color: #FFFFFF;
            }
            .num {
                font-family: "font-Family-self";
                font-size: 80px;
                color: #4CFDCA;
                text-align: center;
                line-height: 80px;
            }
        }
    }
}
</style>
<script>
import countTo from 'vue-count-to';
export default {
  props: ["websiteData"],
  components: {
      countTo
  }
};
</script>