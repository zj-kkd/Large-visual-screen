<template>
  <div class="com-icp" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="tab">
      <span :class="checkTab == 'icp'? 'active': ''" @click="showChart('icp')">ICP备案</span>
      <span :class="checkTab == 'app'? 'active': ''" @click="showChart('app')">app备案</span>
      <span :class="checkTab == 'level'? 'active': ''" @click="showChart('level')">定级备案</span>
    </div>
    <div class="charts" ref="charts_icp" v-if="checkTab =='icp'">
      <BeianICP :chartData="chartData[0]"></BeianICP>
    </div>
    <div class="charts" ref="charts_app" v-if="checkTab =='app'">
      <BeianAPP :chartData="chartData[1].slice(1)"></BeianAPP>
    </div>
    <div class="charts" ref="charts_level" v-if="checkTab =='level'">
      <BeianILevel :chartData="chartData[2].slice(1)"></BeianILevel>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-icp {
  width: 100%;
  .charts {
    width: 100%;
    height: 180rem;
  }
  .tab {
    margin-top: 20rem;
    height: 25rem;
    display: flex;
    font-size: 12rem;
    text-align: center;
    & span:nth-child(2) {
      border-left: none;
      border-right: none;
    }
    span {
      line-height: 25rem;
      border: 1rem solid rgba(255, 255, 255, 0.274);
      color: $fff05;
      flex: 1;
      &.active {
        border: 1rem solid $blue2;
        color: $blue2;
      }
    }
  }
}
</style>
<script>
import BeianAPP from "./BeianAPP";
import BeianICP from "./BeianICP";
import BeianILevel from "./BeianILevel";
export default {
  components: {
    BeianAPP,
    BeianICP,
    BeianILevel,
  },
  props: ["chartData"],
  data() {
    return {
      checkTab: "icp",
      timer: null,
      timerIndex: 0,
    };
  },
  mounted() {
    // this.timer = this.timerFn();
    this.timer = setInterval(() => {
      if (this.checkTab == "icp") {
        this.checkTab = "app";
      } else if (this.checkTab == "app") {
        this.checkTab = "level";
      } else if (this.checkTab == "level") {
        this.checkTab = "icp";
      }
    }, 4000);
  },

  methods: {
    showChart(e) {
      this.checkTab = e;
    },
    mouseLeave() {
      clearInterval(this.timer);
      //  this.timer = this.timerFn();
      this.timer = setInterval(() => {
        if (this.checkTab == "icp") {
          this.checkTab = "app";
        } else if (this.checkTab == "app") {
          this.checkTab = "level";
        } else if (this.checkTab == "level") {
          this.checkTab = "icp";
        }
      }, 4000);
    },
    mouseEnter() {
      clearInterval(this.timer);
    },
    timerFn() {
      setInterval(() => {
        if (this.checkTab == "icp") {
          this.checkTab = "app";
        } else if (this.checkTab == "app") {
          this.checkTab = "level";
        } else if (this.checkTab == "level") {
          this.checkTab = "icp";
        }
      }, 4000);
    },
  },
};
</script>