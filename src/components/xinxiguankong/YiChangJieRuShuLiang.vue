<template>
  <!-- 异常接入数量 -->
  <div class="com-yc-num">
    <div class="item" v-for="item in data" :key="item.id">
      <p class="title">{{item.type}}</p>
      <p class="num"><countTo :startVal='0' :endVal='+item.num' :duration='1000' separator=""></countTo></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.com-yc-num {
  padding-top: 20px;
  padding-left: 10px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  .item {
      padding: 10px 0px;
    width: 31%;
    background-image: url("../../../public/static/img/imgs/yichang_img_outline.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #6beebb;
      text-align: center;
    .title {
      font-size: 12px;
    }
    .num {
        font-family: 'font-Family-number';
        font-size: 24px;
        margin-top: 3px;
    }

  }
}
</style>

<script>
import countTo from 'vue-count-to'
export default {
    components: {
        countTo
    },
  data() {
    return {
      data: [
        { id: 1, type: "未报备企业数", num: "3000" },
        { id: 2, type: "未报备IP数", num: "3000" },
        { id: 3, type: "非法虚拟主机数", num: "800" }
      ]
    };
  }
};
</script>