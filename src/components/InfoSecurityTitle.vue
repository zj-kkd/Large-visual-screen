<template>
  <div class="com-title">
    <span class="title">{{title}}</span>
    <div class="more" v-if="showMore">更多>></div>
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    showMore: {
      default: false
    },
  },
  
};
</script>
<style lang="scss" scoped>
.com-title {
  padding-left: 10rem;
  position: relative;
  width: 100%;
  height: 30rem;
  font-size: 18rem;
  line-height: 30rem;
  color: #fff;
  .more {
  color: $blue1;
    font-size: 14rem;
    float: right;
    position: absolute;
    right: 0;
    top: -5px;
  }
  .img {
    position: absolute;
    left: 0;
    top: 0;
    height: 90%;
    width: 100%;
    background-image: url("../../public/static/img/imgs/xin_an/img_titlebg2.png");
    background-repeat: no-repeat;
    background-size: auto 90%;
  }
}
</style>