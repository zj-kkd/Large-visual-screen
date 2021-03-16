<template>
  <div class="com-BugTrend">
    <div class="ctrl">
      <span :class="check == 'month' ? 'active tab-btn': 'tab-btn'" @click="showChart('month')">近30天</span>
      <span :class="check == 'quarter' ? 'active tab-btn': 'tab-btn'" @click="showChart('quarter')">季度</span>
      <span :class="check == 'year' ? 'active tab-btn': 'tab-btn'" @click="showChart('year')">年度</span>
    </div>
    <div class="right">
      <li class="title top10" id="title">
        <span class="top">排名</span>
        <span class="name">行业</span>
        <span class="bg">漏洞数</span>
      </li>
      <li v-for="(item, index) in chartData" :key="index">
        <!-- <li v-for="item in data" :key="item.top" :class="'top10' + ' ' + 't' + item.top"> -->
        <span class="top">
          <span :class="'t' + (index + 1)">{{index + 1}}</span>
        </span>
        <span class="name text-overfllow">{{item.name}}</span>
        <span class="bg">
          <span class="data" :style="{width: (item.value/chartData[0].value * 100) + '%'}"></span>
          <span class="num">{{item.value}}</span>
        </span>
      </li>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.com-BugTrend {
  line-height: 12px;
  width: 100%;
  height: calc(100% - 30rem);
  display: flex;
  padding-top: 10rem;
  padding-left: 10rem;
  font-size: 12rem;
  margin-top: 10rem;
  .ctrl {
    font-size: 11rem;
    color: #fff;
    height: 80%;
    padding-right: 10rem;
    span {
      display: block;
      text-align: center;
      margin-bottom: 10rem;
      padding: 3rem;
    }
  }
  .right {
    width: 70%;
    height: 98%;
    color: #82888f;
    font-size: 12rem;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .name {
      line-height: 12px;
      width: 25%;
      text-align: left;
    }
    .bg {
      text-align: right;
    }
    li {
      height: 12px;
      display: flex;
      justify-content: space-around;
      width: 100%;
      display: flex;
      &.title {
        height: 16rem;
        line-height: 16rem;
        background-color: $bg05;
        .top,
        .name,
        .bg {
          background-color: rgba(1, 1, 1, 0);
        }
      }
      .top {
        width: 15%;
        span {
          width: 80%;
          height: 100%;
          background-color: #555f61;
          color: #fff;
          border-radius: 3rem 0 3rem 0;
          display: block;
          margin-left: 10%;
          &.t1 {
            background-color: #fbce38;
            color: #3a3a3a;
          }
          &.t2 {
            color: #3a3a3a;
            background-color: #c57c6b;
          }
          &.t3 {
            color: #3a3a3a;
            background-color: #83b4ad;
          }
        }
      }
      .name {
        width: 25%;
        height: 100%;
        //   background-color: orange;
      }
      .bg {
        width: 40%;
        height: 100%;
        //   background-color: blue;
        position: relative;
        overflow: hidden;
        .data {
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background-color: $bg03;
          animation: showright 1.2s forwards;
          @keyframes showright {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(0%);
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 5rem;
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      chartData: "",
      check: "month"
    };
  },
  created() {
    this.chartData = this.$store.state.webSecurityData.industry_loopholes_last_30day;
    // console.log("test", this.chartData);
  },
  computed: {
    getNum() {
      let num = (
        this.data.reduce((prev, item) => prev + +item.num, 0) / 10000
      ).toFixed(0);
      return (num + "").split("");
    }
  },

  methods: {
    showChart(chartType) {
      this.check = chartType;
      switch (chartType) {
        case "month":
          this.chartData = this.$store.state.webSecurityData.industry_loopholes_last_30day;
          break;
        case "quarter":
          this.chartData = this.$store.state.webSecurityData.industry_loopholes_last_quarter;
          break;
        case "year":
          this.chartData = this.$store.state.webSecurityData.industry_loopholes_last_year;
          break;
      }
    }
  }
};
</script>
