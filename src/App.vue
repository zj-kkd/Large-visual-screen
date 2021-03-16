<template>
  <div id="app">
    <Header :title="'浙江省通信大数据综合管理平台'" v-if="showPage == '/home' || showPage == '/'"></Header>
    <ChildHeader :showPage="showPage" v-else></ChildHeader>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "./base.scss";
@import "./main.scss";
</style>
<script>
import Header from "./components/Header";
import ChildHeader from "./components/ChildHeader";
export default {
  components: { Header, ChildHeader },
  data() {
    return {
      navList: [
        { name: "首页", router: "/home" },
        { name: "管控信息中心", router: "/managementControl" },
        { name: "网络安全中心", router: "/internetSecurity" },
        { name: "信息安全中心", router: "/infoSecurityCenter" },
        { name: "工业互联网", router: "/industrialInter" },
        { name: "数据安全", router: "/dataSecurity" },
        { name: "IP汇聚", router: "/ip" }
      ],
      showPage: '/home'
    };
  },
  updated() {
    this.showPage = window.location.hash.slice(1);
    console.log(111, this.showPage)
  },
  mounted() {
  //  console.log(window.location.hash)
    // this.$http
    //   .get("/showData/getData/main")
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    // this.$http
    //   .get("/isLogin")
    //   .then(res => console.log('login'))
    //   .catch(err => console.log('login_err'));

    // this.$http.allUser('/showData/getData/main')
    // .then(res => {
    //   console.log(res, 111)
    // })
    // .catch(err => console.log(err))

    // test webscoket
    // let ws = new WebSocket("ws://103.44.144.41:9001");
    // ws.onopen = function(e) {
    //   console.log(e);
    //   console.log("Connection open ...");
    //   // ws.send("Hello WebSockets!");
    // };
    // ws.onerror = function(err) {
    //   console.log(err);
    // };
    // var ws = new WebSocket("ws://103.44.144.41:9001");

    // var ws = new WebSocket("ws://103.44.144.41:9001/showData/getData/main");
    // ws.onopen = function() {
    //   console.log("Connection open ...");
    //   ws.send("Hello WebSockets!");
    // };

    // ws.onmessage = function(evt) {
    //   console.log("Received Message: " + evt.data);
    //   ws.close();
    // };

    // ws.onclose = function() {
    //   console.log("Connection closed.");
    // };
  }
};
</script>