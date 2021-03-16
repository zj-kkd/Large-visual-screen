<template>
  <div class="com-child-header" @mouseenter="showButton" @mouseleave="hiddenButton">
    <div class="back" @click="goBack"  v-show="isShow"></div>
    <h2>{{title}}</h2>
  </div>
</template>

<style lang="scss" scoped>
.com-child-header {
  // background-color: #fff;
  width: 100%;
  height: 77rem;
  background-image: url("../../public/static/img/imgs/child_header_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  .back {
    z-index: 10;
    left: 0rem;
    top: -14rem;
    position: absolute;
    width: 50rem;
    height: 55rem;
    background-image: url('../../public/static/img/icons/icon_back.png');
    background-size: 60%;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 50%;
  }
  h2 {
    font-size: 36rem;
    font-weight: 400;
    color: #FFF;
    line-height: 65rem;
  }
}
</style>
<script>
export default {
  props: ["title"],
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    goBack() {
       this.$router.go(-1);
    },
    showButton() {
      this.isShow = true
    },
    hiddenButton() {
      this.isShow = false
    }
  }
};
</script>