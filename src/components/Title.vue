<template>
  <div class="com-title">
    <p>
      <span class="icon-line"></span>
      <span class="title">{{title}}</span>
    </p>
    <span class="img"></span>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>
<style lang="scss" scoped>
.com-title {
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  font-size: 18rem;
  line-height: 30rem;
  color: #fff;
  .img {
    flex: 1;
    margin-left: 20rem;
    height: 100%;
    background-image: url("../../public/static/img/imgs/title_bg.png");
    background-repeat: no-repeat;
    background-position: 0 center;
  }
  .icon-line {
    display: inline-block;
    margin-right: 6rem;
    width: 3rem;
    height: 18rem;
    position: relative;
    top: 2rem;
    background-color:$blue1;
  }
}
</style>