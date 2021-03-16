<template>
  <div class="ISMSTop" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <p class="tab-bar-2">
      <span :class="tab == 'left' ? 'active': ''" @click="showChart('left')">违规类型</span>
      <span :class="tab == 'right' ? 'active': ''" @click="showChart('right')">当前巡检违规机房</span>
    </p>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <span :class="index <= 2 ? 'top mark': 'top'">{{index + 1}}</span>
        <span class="type">{{item.name}}</span>
        <span class="bg">
          <span class="data" :style="{width: (item.value/data[0].value * 100) + '%'}"></span>
        </span>
        <span class="num">{{item.value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      tab: "left",
      timer: null
    };
  },
  created() {
     this.data = this.$store.state.infoSecurityData.ISMS_type_statistics
  },
  components: {},
  methods: {
    mouseLeave() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
      if (this.tab == "left") {
        this.showChart("right");
      } else {
        this.showChart("left");
      }
    }, 4000);

    },
    mouseEnter() {
      clearInterval(this.timer)
    },
    showChart(chartType) {
      this.tab = chartType
      switch (chartType) {
        case 'left':
          this.data = this.$store.state.infoSecurityData.ISMS_type_statistics
          break;
        case 'right':
          this.data = this.$store.state.infoSecurityData.ISMS_engine_room_statistics
          break;
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.tab == "left") {
        this.showChart("right");
      } else {
        this.showChart("left");
      }
    }, 4000);
  }
};
</script>

<style lang="scss" scoped>
.ISMSTop {
  margin-top: 15rem;
  width: 100%;
  padding: 10rem;
  .tab {
    width: 100%;
    margin-bottom: 30rem;
  }
  ul {
    width: 100%;
    margin-top: 20rem;
    li {
      width: 100%;
      font-size: 12rem;
      justify-content: space-between;
      display: flex;
      height: 12px;
      margin: 20rem 0;
      align-items: center;
      .top {
        font-size: 10rem;
        background-color: #3f3f3f;
        color: rgba(128, 128, 128, 1);
        width: 20px;
        height: 16px;
        line-height: 16px;
        margin-right: 10rem;
        text-align: center;
        border-radius: 50%;
        &.mark {
          color: #fff;
          background-color: #995e2c;
        }
      }
      .type {
        width: 40%;
        color: #b9babc;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .bg {
        background-image: url("../../../public/static/img/imgs/chart_bar_bg_op.png");
        width: 50%;
        height: 8rem;
        position: relative;
        overflow: hidden;
        .data {
          width: 55%;
          height: 8rem;
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
        width: 15%;
        text-align: right;
        color: #b9babc;
        font-size: 12rem;
      }
    }
  }
}
</style>