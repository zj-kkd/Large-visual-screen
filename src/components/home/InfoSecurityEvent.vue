<template>
<!-- 信安接入商top -->
  <div class="com-info-security">
    <li v-for="(item, index) in chartData" :key="index" :class="'top10'">
      <span :class="(index <= 2) ? 'topColor': '' + 'top' " :style="{backgroundColor: colorList[index] || '#354044'}">{{index + 1}}</span>
      <span class="idc text-overfllow">{{item.IDC}}</span>
      <span class="num2">
        <span class="right-data" :style="{width: `${item.number/1500 * 100 + '%'}`}"></span>
      </span>
      <span class="right-num">{{item.number}}</span>
    </li>
  </div>
</template>
<script>
export default {
  props: ["chartData", "title"],
  data() {
    return {
      colorList: ['#966546', '#918a25', '#577e75'] 
    }
  }
};
</script>

<style lang="scss" scoped>
.com-info-security {
  margin-top: 20rem;
  width: 100%;
  position: relative;
  font-size: 14rem;
  line-height: 12rem;
  .top10 {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 8rem;
    
    .num2 {
      margin-top: 5rem;
      border-radius: 2rem;
      height: 4rem;
      background-color: rgba(80, 80, 80, 0.4);
      width: 40%;
      position: relative;
      overflow: hidden;
      .right-data {
        border-radius: 2rem;
        background-color: #4E4745;
        display: block;
        height: 4rem;
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
    .right-num {
      width: 15%;
      color: rgba(255, 255, 255, .5);
      margin-top: 2rem;
      text-align: right;
    }
    .idc {
      width: 25%;
      color: #999 ;
      height: 16rem;
      line-height: 16rem;
    }
    .top {
      font-size: 10rem;
      width: 20%;
      color: rgb(202, 202, 202);
      height: 20rem;
      width: 20rem;
      border-radius: 1rem;
      text-align: center;
      line-height: 20rem;
    }
    .topColor {
      font-size: 10rem;
      color: #fff;
      height: 20rem;
      width: 20rem;
      border-radius: 1rem;
      text-align: center;
      line-height: 20rem;
    }
  }
}
</style>