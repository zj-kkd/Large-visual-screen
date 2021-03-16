<template>
  <div class="com-child-header">
    <h2>{{title}}</h2>
    <nav>
      <router-link v-for="item in navList" :key="item.name" :to="item.router">
        <li :class="item.router ==showPage ? 'check': ''">{{item.name}}</li>
      </router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.com-child-header {
  // background-color: #fff;
  width: 100%;
  height: 77rem;
  background-image: url("../../public/static/img/imgs/child_header_bg1.png");
  background-size: 100% 80%;
  background-repeat: no-repeat;
  text-align: center;
  display: flex;
  h2 {
    width: 28%;
    font-size: 36rem;
    font-weight: 400;
    color: #fff;
    line-height: 55rem;
  }
  nav {
    margin-left: 200rem;
    align-items: center;
    margin-top: -15rem;
    flex: 1;
    display: flex;
    justify-content: space-around;
    li {
      width: auto;
      background-image: url("../../public/static/img/icons/navbg_normal.png");
      background-size: 100% 100%;
      font-size: 14rem;
      padding: 0 20rem;
      line-height: 30rem;
      height: 30rem;
      color: #b3b3b3;
      &:hover, &.check {
        background-image: url("../../public/static/img/icons/navbg_click.png");
        color: $yellow
      }
    }
  }
}
</style>
<script>
export default {
  props: ["showPage"],
  data() {
    return {
      navList: [
        { name: "首页", router: "/home" },
        { name: "管控信息中心", router: "/managementControl" },
        { name: "网络安全中心", router: "/internetSecurity" },
        { name: "信息安全中心", router: "/infoSecurityCenter" },
        { name: "工业互联网", router: "/industrialInter" },
        { name: "反诈中心", router: "/antifraud" },
        { name: "数据安全", router: "/dataSecurity" },
        { name: "IP汇聚", router: "/ip" },
      ],
      title: ""
    };
  },
  watch: {
    showPage() {
      this.pageName()
    }
  },
  methods: {
    pageName() {
      this.navList.forEach(item => {
      if (item.router == this.showPage) {
        this.title = item.name;
      }
    });
    }
  },
  mounted() {
    this.pageName()
  }
};
</script>