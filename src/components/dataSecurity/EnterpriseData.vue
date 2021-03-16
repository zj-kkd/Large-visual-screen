<template>
  <div class="data_S">
    <div class="fanzha-title">
      <p>{{tab[2]}}</p>
      <div class="label">
        <span class="done">{{tab[0]}}</span>
        <span class="none">{{tab[1]}}</span>
      </div>
    </div>
    <div class="chart">
      <li v-for="(item, index) in chartData" :key="index">
        <div class="title">{{item.name}}</div>
        <div class="data">
          <span class="left" v-if="item.value" :style="{width: item.value1 && item.value ? ((item.value/(item.value1 + item.value) * 100) + '%'): '100%'}">{{item.value}}</span>
          <span class="icon" v-if="item.value1 && item.value"></span>
          <span class="right" v-if="item.value1">{{item.value1}}</span>
        </div>
      </li>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.data_S {
  .fanzha-title {
    .label {
      position: absolute;
      right: 0;
      top: 0;
    }
    span {
      color: #b2b2b2;
      font-size: 12rem;
      margin-right: 15rem;
    }
    .done::before {
      content: "";
      display: inline-block;
      width: 12rem;
      height: 12rem;
      background-color: $blue3;
      margin-right: 5rem;
      position: relative;
      top: 1rem;
    }
    .none::before {
      content: "";
      display: inline-block;
      width: 12rem;
      height: 12rem;
      background-color: #404856;
      margin-right: 5rem;
      position: relative;
      top: 1rem;
    }
  }
  position: relative;
  width: 100%;
  .chart {
    padding-left: 5rem;
    width: 100%;
    height: 250rem;
    display: flex;
    flex-wrap: wrap;
     & li:nth-last-of-type(odd) {
      //  padding-left: 20%;
      position: relative;
      left: 5%;
     }
    li {
      width: 50%;
      // border: 0.5rem solid red;
      .title {
        width: 90%;
        display: flex;
        align-items: center;
        height: 40rem;
        font-size: 14rem;
        color: #b2b2b2;
      }
      .data {
        text-align: center;
        display: flex;
        width: 90%;
        line-height: 20rem;
        height: 20rem;
        .left,
        .right {
          color: #fff;
        }
        .left {
          // width: 40%;
          height: 100%;
          background-color: #5684ad;
        }
        .right {
          flex: 1;
          height: 100%;
          background-color: #404856;
        }
        .icon {
          height: 20rem;
          width: 15rem;
          background-image: url('../../../public/static/img/imgs/shujuanquan/img_sanjiao.png');
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: ["chartData", 'tab'],
};
</script> 