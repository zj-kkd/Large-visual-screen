<template>
  <div class="com-defraud-from">
    <div class="fanzha-title">
      <p>{{'来源地统计' + (tabCheck == 0 ? '(境内)': '(境外)')}}</p>
    </div>
    <div class="tab">
      <img
        @click="changeTab(0)"
        :src="require(`../../../public/static/img/imgs/fanzha/icon_${tabCheck == 0 ? 'jingnei_click': 'jingnei'}.png`)"
        alt
      />
      <img
        @click="changeTab(1)"
        :src="require(`../../../public/static/img/imgs/fanzha/icon_${tabCheck == 1 ? 'jingwai_click': 'jingwai'}.png`)"
        alt
      />
    </div>
    <div class="chart">
      <div class="tab-bar">
        <span :class="tabBarCheck == 'day' ? 'active': ''" @click="changeTabBar('day')">今日</span>
        <span :class="tabBarCheck == 'month' ? 'active': ''" @click="changeTabBar('month')">本月</span>
        <span :class="tabBarCheck == 'year' ? 'active': ''" @click="changeTabBar('year')">本年</span>
      </div>

      <div class="swiper-container1" v-show="tabCheck == 0">
        <div class="swiper-wrapper">
          <div
            class="chart-info swiper-slide"
            v-for="(item, index) in Math.ceil(chartData[0].data[chartIndex].length / 10)"
            :key="index"
          >
            <li class="title">
              <span>省份</span>
              <span>应答量</span>
              <span>拦截量</span>
              <span>占比</span>
            </li>
            <li
              v-for="(item1, index1) in chartData[0].data[chartIndex].slice(index * 10, (index + 1) * 10)"
              :key="index1"
            >
              <span>{{item1.province}}</span>
              <span>{{item1.response_amount}}</span>
              <span>{{item1.intercept_amount}}</span>
              <span>{{item1.rate + '%'}}</span>
            </li>
          </div>
        </div>
      </div>
      <div class="chart-info swiper-slide" v-show="tabCheck == 1">
        <li class="title">
          <span>国家</span>
          <span>应答量</span>
          <span>拦截量</span>
          <span>占比</span>
        </li>
        <li v-for="(item1, index1) in chartData[1].data[chartIndex]" :key="index1">
          <span>{{item1.country}}</span>
          <span>{{item1.response_amount}}</span>
          <span>{{item1.intercept_amount}}</span>
          <span>{{item1.rate + '%'}}</span>
        </li>
      </div>
    </div>
  </div>
</template> 
<style lang="scss" scoped>
.com-defraud-from {
  margin-top: 15rem;
  position: relative;
  width: 100%;
  .tab {
    height: 38rem;
    position: absolute;
    right: 0;
    top: 0;
    img {
      margin-left: 20rem;
      width: 22rem;
      height: 22rem;
      margin-top: 8rem;
    }
  }
  .chart {
    font-size: 14rem;
    .tab-bar {
      display: flex;
      height: 30rem;
      color: rgba(255, 255, 255, 0.4);
      background: $bg03;
      border: 1px solid rgba(162, 248, 255, 0.2);
      span {
        color: "";
        width: 33.3%;
        line-height: 30rem;
        text-align: center;
        height: 100%;
        &.active {
          background-image: url("../../../public/static/img/imgs/fanzha/img_tabclickbg2.png");
          color: rgba(21, 203, 243, 1);
          background-size: 100% 100%;
        }
      }
    }
    .chart-info {
      width: 100%;
      margin-top: 20rem;
      height: 330rem;
      & li:first-child {
        background: rgba(33, 107, 127, 0.36);
        border: none;
        color: rgba(3, 218, 251, 1);
      }
      li {
        color: rgba(179, 179, 179, 1);
        padding: 0 15rem;
        display: flex;
        justify-content: space-between;
        height: 30rem;
        line-height: 30rem;
        border-bottom: 1rem solid rgba(255, 255, 255, 0.1);
        span {
          width: 25%;
        }
        & span:not(:first-child) {
          text-align: right;
        }
      }
    }
  }
}
</style>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
  data() {
    return {
      mySwiper: "",
      tabCheck: 0,
      tabBarCheck: "day",
      //  123 年月日
      chartIndex: 0,
      chartData: [],
    };
  },
  methods: {
    initSwiper() {
      this.mySwiper = new Swiper(".swiper-container1", {
        speed: 800,
        loop: true,
        autoplay: 3500,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
      });
    },
    // 境内境外
    changeTab(e) {
      this.tabCheck = e;
      e == 1 && this.initSwiper()
    },
    // 时间周期
    changeTabBar(e) {
      this.initSwiper();
      this.tabBarCheck = e;
      switch (e) {
        case "day":
          this.chartIndex = 0;
          break;

        case "month":
          this.chartIndex = 1;
          break;

        case "year":
          this.chartIndex = 2;
          break;
      }
    },
  },
  created() {
    this.chartData = [
      {
        data: [
          this.$store.state.antifraudData.source_statistics_today_in,
          this.$store.state.antifraudData.source_statistics_month_in,
          this.$store.state.antifraudData.source_statistics_year_in,
        ],
      },
      {
        data: [
          this.$store.state.antifraudData.source_statistics_today_out,
          this.$store.state.antifraudData.source_statistics_month_out,
          this.$store.state.antifraudData.source_statistics_year_out,
        ],
      },
    ];
  },
  watch: {
    tabCheck() {
      this.initSwiper()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
    });
  },
};
</script> 