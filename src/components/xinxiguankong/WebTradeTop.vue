<template>
  <div class="com-wangzhanfenbu">
    <li class="top10" id="title">
      <span class="top"></span>
      <span class="idc">{{title[2]}}</span>
      <span class="num2">{{title[3]}}</span>
    </li>
    <li v-for="(item, index) in chartData" :key="index" :class="'top10'">
      <span :class="(index <= 2) ? 'topColor': '' + 'top' ">{{index + 1}}</span>
      <span class="idc">{{item.name}}</span>
      <span class="num2">
        <span
          class="right-data"
          :style="{width: `${item.value/Math.max(...chartData.map(item => item.value)) * 100 + '%'}`}"
        ></span>
      </span>
      <span class="right-num">{{item.value}}</span>
    </li>
  </div>
</template>
<script>
export default {
  props: ["chartData", "title"]
};
</script>

<style lang="scss" scoped>
.com-wangzhanfenbu {
  width: 100%;
  position: relative;
  font-size: 12rem;
  line-height: 12px;
  .top10 {
    position: relative;
    height: 12px;
    margin: 10rem 0;
    span {
      height: 10rem;
    }
    display: flex;
    justify-content: space-between;
    margin: 12rem 0 12rem 10rem;
    // .num,
    .num2 {
      text-align: right;
      background-color: rgba(80, 80, 80, 0.4);
      width: 50%;
      color: rgb(187, 187, 187);
      position: relative;
      overflow-y: hidden;
    }
    .right-num {
      height: 12px;
      position: absolute;
      right: 2rem;
      top: 0;
      line-height: 10rem;
       color: rgb(187, 187, 187);
    }
    .num2 {
      .right-data {
        background-color: rgb(121, 104, 102);
        display: block;
        height: 100%;
        position: absolute;
        left: 0;
        animation: showright 1.2s forwards;
        @keyframes showright {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      }
    }

    .idc {
      width: 30%;
      color: #87726e;
      height: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .top {
      background-color: #354044;
      color: rgb(202, 202, 202);
      height: 15px;
      width: 15px;
      border-radius: 2px;
      text-align: center;
      line-height: 15px;
    }
    .topColor {
      background-color: #907e4e;
      color: #fff;
      height: 15px;
      width: 15px;
      border-radius: 2px;
      text-align: center;
      line-height: 15px;
    }
  }
  #title {
    span {
      height: 20rem;
    }
    .num,
    .num2 {
      background-color: transparent;
    }
    .top {
      background-color: transparent;
    }
  }
}
</style>    