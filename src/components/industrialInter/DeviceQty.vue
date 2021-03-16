<template>
  <div class="com-device-qty" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="fanzha-title">
      <p>
        <span :class="isCheck !== 'left' ? 'active' :''" @click="changeTab('left')">联网工控设备数</span>
        <span class="line">|</span>
        <span :class="isCheck !== 'right' ? 'active' :''" @click="changeTab('right')">云平台接入设备数</span>
        <span class="more">更多</span>
      </p>
    </div>
    <div class="chart">
      <ul>
        <li>
          <span>排名</span>
          <span>企业名</span>
          <span>{{isCheck == 'left' ? '联网工控设备数': '云平台接入设备数'}}</span>
        </li>
        <li v-for="(item, index) in chartData[dataIdx]" :key="index">
          <span class="top">
            <span
              :style="{backgroundColor: colorList[index] || 'rgba(85, 95, 97, 1)', color: colorList[index] ? 'black': '#fff'}"
            >{{index + 1}}</span>
          </span>
          <span>{{item.name}}</span>
          <span class="bg">
            <span
              class="data animate-left"
              :style="{width: (item.value/chartData[dataIdx][0].value * 100) + '%'}"
            >{{item.value}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.com-device-qty {
  width: 100%;
  .fanzha-title {
    span {
      &.active {
        color: rgba(128, 128, 128, 1);
      }
    }
    .line {
      margin: 0 10rem;
    }
    .more {
      font-size: 14rem;
      color: $blue3;
      float: right;
    }
  }
  .chart {
    padding-left: 15rem;
    margin-top: 20rem;
    ul {
      line-height: 30rem;
      font-size: 14rem;
      color: rgba(179, 179, 179, 1);
      display: flex;
      flex-wrap: wrap;
      & li:first-child {
        background-color: rgba(89, 110, 147, 0.3);
      }
      li {
        margin: 5rem 0;
        height: 30rem;
        display: flex;
        width: 100%;
        & > span:first-child {
          width: 20%;
          text-align: center;
        }
        & > span:nth-child(2) {
          width: 35%;
        }
        & > span:nth-child(3) {
          flex: 1;
        }
        .top {
          span {
            font-size: 12rem;
            display: block;
            width: 30rem;
            height: 15rem;
            line-height: 15rem;
            color: #fff;
            border-radius: 4rem 0 4rem 0;
            margin: auto;
            margin-top: 7.5rem;
          }
        }
        .bg {
          position: relative;
          overflow: hidden;
          .data {
            padding-left: 5rem;
            line-height: 20rem;
            margin-top: 5rem;
            display: block;
            width: 50%;
            height: 20rem;
            position: absolute;
            left: 0;
            right: 0;
            background-color: rgba(89, 110, 147, 0.3);
            border: 1px solid rgba(89, 110, 147, 0.5);
            border-radius: 2rem;
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: ["chartData"],
  data() {
    return {
      dataIdx: 0,
      isCheck: "left",
      colorList: ["#fbcf3f", "#c47d6f", "#87b0b2"],
      timer: null,
      chartData: [
        { name: "杭州电力", value: 9392 },
        { name: "杭州电力", value: 9392 },
        { name: "杭州电力", value: 9392 },
        { name: "杭州电力", value: 9392 },
        { name: "杭州电力", value: 9392 },
      ],
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.isCheck == "left") {
        this.isCheck = "right";
        this.dataIdx = 0;
      } else {
        this.isCheck = "left";
        this.dataIdx = 1;
      }
    }, 4000);
  },
  methods: {
    mouseLeave() {
      this.timer = setInterval(() => {
        if (this.isCheck == "left") {
          this.isCheck = "right";
          this.dataIdx = 0;
        } else {
          this.isCheck = "left";
          this.dataIdx = 1;
        }
      }, 4000);
    },

    mouseEnter() {
      clearInterval(this.timer);
      this.timer = null;
    },

    changeTab(e) {
      this.isCheck = e;
      if (e == "left") {
        this.dataIdx = 0;
      } else {
        this.dataIdx = 1;
      }
    },
  },
};
</script> 