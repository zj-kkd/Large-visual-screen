<template>
  <div class="com-header">
    <h2>{{title}}</h2>
    <router-link to="/ip">
      <div class="btn">
        <img src="../../public/static/img/icons/icon_ip_btn.png" alt />
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.com-header {
  margin-top: 10rem;
  position: relative;
  width: 100%;
  height: 60rem;
  background-image: url("../../public/static/img/imgs/top.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  .btn {
    position: absolute;
    right: 10rem;
    top: 8rem;
    bottom: 0;
    margin: auto;
    padding: 0rem 10rem;
    height: 25rem;
    border: 1rem solid $blue2;
    border-radius: 3rem;
    &:hover {
      background-color: rgba(9, 152, 195, 0.26);
    }
    img {
      height: 70%;
      margin-top: 15%;
    }
  }
  h2 {
    font-size: 36rem;
    font-weight: 400;
    color: #fff;
    text-shadow:2px 3px 4px rgba(177,217,250,0.59);
  }
}
</style>
<script>
export default {
  props: ["title"]
};
</script>