<template>
  <div class="ISMSTop" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <p class="tab-bar-2">
      <span :class="tab == 'left' ? 'active': ''" @click="showChart('left')">不良信息网站访问TOP10</span>
      <span :class="tab == 'right' ? 'active': ''" @click="showChart('right')">网站访问流量异常</span>
    </p>
    <ul>
      <li>
        <span class="top">排名</span>
        <span class="url">{{tab == 'left' ? '不良信息网站': '流量异常网站'}}</span>
        <span class="num">访问量</span>
      </li>
      <li v-for="(item, index) in data" :key="index">
        <span class="top">{{index + 1}}</span>
        <span class="url">{{item.name}}</span>
        <span class="num">{{item.value.toLocaleString()}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      tab: "left"
    };
  },
  components: {},
  created() {
    this.data = this.$store.state.infoSecurityData.unhealthy_info_website_visit;
  },
    mounted() {
    this.timer = setInterval(() => {
      if (this.tab == "left") {
        this.showChart("right");
      } else {
        this.showChart("left");
      }
    }, 4000);
  },
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
        case "left":
          this.data = this.$store.state.infoSecurityData.unhealthy_info_website_visit;
          break;
        case "right":
          this.data = this.$store.state.infoSecurityData.abnormal_flow_website_visit;
          break;
      }
    }
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
    li:nth-of-type(odd) {
      background-color: rgba(134, 154, 166, .1);
    }
    li {
      width: 100%;
      font-size: 12rem;
      justify-content: space-between;
      display: flex;
      height: 30rem;
      margin: 2rem 0;
      align-items: center;
      color: #b9babc;
      .top {
        width: 20%;
        // color: rgba(128, 128, 128, 1);
        margin-right: 10rem;
        text-align: center;
      }
      .url {
        width: 50%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .num {
        width: 20%;
        text-align: right;
        font-size: 11rem;
        padding-right: 10rem;
      }
    }
  }
}
</style>