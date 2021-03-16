<template>
  <div class="today-security">
    <div class="title">{{title}}</div>
    <div class="num">
      <span
        v-for="(item, index) in allNumber.toLocaleString()"
        :key="index"
        :class="item == ',' ? 'douhao': ''"
      >{{item}}</span>
    </div>
    <div class="add">
      <img src="../../public/static/img/icons/icon_center_add.png" alt />
      <span class="add-num">{{add}}</span>
      <span class="add-text">今日新增</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["allNumber", "add", "title"],
};
</script>
<style lang="scss" scoped>
.today-security {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20rem;
  height: 55rem;
  font-size: 20rem;
  color: rgba(179, 179, 179, 1);
  .add {
    width: 100px;
    text-align: center;
    position: relative;
    height: 100%;
    top: -4rem;
    img {
      height: 70%;
      margin-right: 10rem;
      line-height: 50rem;
      position: relative;
      top: 18rem;
      left: -30rem;
    }
    .add-text {
      display: block;
      width: 100%;
      position: absolute;
      font-size: 10rem;
      color: #999;
      position: absolute;
      bottom: -2rem;
      left: 10rem;
      // transform: scale(.8);
    }
    .add-num {
      display: block;
      font-size: 25rem;
      color: #e4da39;
      position: absolute;
      top: 10rem;
      width: 120%;
    }
  }
  .title {
    line-height: 55rem;
    font-size: 18rem;
    color: #e4da39;
  }
  .num {
    text-align: center;
    height: 100%;
    margin: 0 30rem;
    span {
      font-family: "font-Family-number";
      margin: 0 5rem;
      display: inline-block;
      width: 35rem;
      height: 55rem;
      font-size: 45rem;
      color: #e4da39;
      border-radius: 5rem;
      background-color: #2c4f4f;
      // background-color: $color;
      border: 1rem solid #66a794;
      &.douhao {
        background-color: transparent;
        border: 1rem solid transparent;
        margin: 0;
        width: 20rem;
      }
    }
  }
}
</style>