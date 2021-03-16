<template>
<!--  home > 数据安全事件 -->
  <div class="data_S">
    <div class="chart_bottom">
      <ul>
        <div class="all">
          <img
            class="out"
            src="../../../public/static/img/imgs/shujuanquan/img_outsiderotate.png"
            alt
          />
          <img
            class="in"
            src="../../../public/static/img/imgs/shujuanquan/img_insiderotate.png"
            alt
          />
          <p class="all-name">{{chartData[0].name}}</p>
          <p class="all-num">{{chartData[0].value}}</p>
        </div>
        <li v-for="(item, index) in chartData.slice(1)" :key="index">
          <p class="name">{{item.name}}</p>
          <p class="num">{{item.value}}</p>
        </li>
      </ul>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.data_S {
  position: relative;
  width: 100%;
  .fanzha-title {
    &.t-bottom {
      margin-top: 30rem;
    }
  }
  .chart_top {
    width: 100%;
    height: 250rem;
  }
  .chart_bottom {
    width: 100%;
    height: 170rem;
    padding: 0 10rem;
    ul {
      margin-top: 35rem;
      position: relative;
      font-size: 14rem;
      color: #7ea4b5;
      width: 100%;
      height: 100%;
      background-image: url("../../../public/static/img/imgs/shujuanquan/img_datarightbg.png");
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      flex-wrap: wrap;

      .all {
        padding-top: 25rem;
        margin-left: 1rem;
        position: absolute;
        width: 96rem;
        height: 96rem;
        left: 50%;
        top: 50%;
        margin-left: -48rem;
        margin-top: -48rem;
        color: #95d8ff;
        text-align: center;
        .all-num {
          font-family: "font-Family-self";
          font-size: 32rem;
          line-height: 25rem;
        }
        .out,
        .in {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .in {
          animation: in 6s linear infinite;
          @keyframes in {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
        .out {
          animation: out 6s linear infinite;
          @keyframes out {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        }
      }
      & li:nth-of-type(even) {
        padding-right: 30rem;
        text-align: right;
      }
      & li:nth-of-type(odd) {
        padding-left: 30rem;
        text-align: left;
      }
      li {
        padding-top: 15rem;
        width: 50%;
        height: 50%;
        .num {
          font-family: "font-Family-self";
          font-size: 35rem;
          line-height: 30rem;
        }
      }
    }
  }
}
</style>

<script>
export default {
 props: ['chartData'],
};
</script>  