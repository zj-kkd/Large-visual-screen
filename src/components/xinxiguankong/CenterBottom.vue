<template>
  <div class="center-bottom">
    <div class="visit-top">
      <Title title="近30天机房被访问量TOP10"></Title>
      <ul>
        <li v-for="item in $store.state.controlData.visit_engine_room_number" :key="item.name">
          <span class="type">{{item.name}}</span>
          <span class="bg">
            <span class="data" :style="{width: `${item.value/$store.state.controlData.visit_engine_room_number[0].value * 100 + '%'}`}"></span>
          </span>
          <span class="num">{{item.value + '万'}}</span>
        </li>
      </ul>
    </div>
    <div class="chart-bar">
      <Title title="我省网民访问网站总量趋势变化"></Title>
      <WebVisitChange></WebVisitChange>
    </div>
  </div>
</template>

<script>
import Title from "../../components/Title";
import WebVisitChange from '../../components/xinxiguankong/WebVisitChange'
export default {
  
  components: {
    Title,
    WebVisitChange,
  }
};
</script>

<style lang="scss" scoped>
.center-bottom {
  display: flex;
  justify-content: space-between;
  & > div {
    width: 48%;
    height: 280rem;
    // border: 1rem solid red;
  }
  .visit-top {
    ul {
      padding-left: 10rem;
      height: calc(100% - 30rem);
      width: 100%;
      display: flex;
      align-content: space-around;
      flex-wrap: wrap;
      li {
        width: 100%;
        font-size: 12rem;
        justify-content: space-between;
        display: flex;
        height: 12rem;
        align-items: center;
        .type {
          width: 30%;
          color: #b9babc;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .bg {
          border: 1rem solid #133036;
          width: 50%;
          height: 15rem;
          position: relative;
          overflow: hidden;
          .data {
            margin: 2rem;
            height: 9rem;
            position: absolute;
            left: 0;
            background-image: url("../../../public/static/img/imgs/chart_bar_bg.png");
            animation: show 1.2s forwards;
            @keyframes show {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(0%);
              }
            }
          }
        }
        .num {
          width: 20%;
          text-align: right;
          color: #b9babc;
          font-size: 12rem;
        }
      }
    }
  }
}
</style>