<template>
  <div class="com-iptop">
    <!-- <div class="left">
      <p class="title">浙江省IP总量</p>
      <p class="num">
        <span v-for="item in getNum" :key="getNum.indexOf(item)" class="number">{{item}}</span>
        <span>万</span>
      </p>
    </div>-->
    <div class="right">
      <li class="title top10" id="title">
        <span class="top">排名</span>
        <span class="name">运营商</span>
        <span class="num">IP数</span>
      </li>
      <li v-for="(item, index) in chartData" :key="index" :class="'top10' + ' ' + 't' + (index + 1)">
        <span class="top">{{index + 1}}</span>
        <span class="name">{{item.name}}</span>
        <span class="num">{{item.value}}</span>
      </li>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.com-iptop {
  display: flex;
  padding-top: 10rem;
  padding-left: 10rem;
  font-size: 12rem;
  line-height: 12px;
  height: 250rem;
  .right {
    width: 100%;
    color: #82888f;
    font-size: 11rem;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .name {
      text-align: left;
      width:30%;
    }
    .num {
      width: 25%;
      text-align: right;
    }
    li {
      display: flex;
      justify-content: space-around;
      width: 100%;
      display: flex;
      height: 12px;
    }
    .top10 {
      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        height: 12px;
        &:first-of-type {
          background-color: #555f61;
          width: 10%;
          border-radius: 5rem 0 5rem 0;
          color: #fff;
        }
      }
      &.t1 {
        :first-of-type {
          background-color: #fbce38;
          color: #3a3a3a;
        }
      }
      &.t2 {
        :first-of-type {
          color: #3a3a3a;
          background-color: #c57c6b;
        }
      }
      &.t3 {
        :first-of-type {
          color: #3a3a3a;
          background-color: #83b4ad;
        }
      }
    }
    #title {
      span {
        background-color: rgba(1, 1, 1, 0);
        color: #82888f;
        height: 18rem;
      }
      .name {
        line-height: 18rem;
      }
      background-color: #132b40;
      margin-bottom: 10rem;
      line-height: 18rem;
      height: 18rem;
    }
  }
}
</style>

<script>
export default {
  props: ['chartData'],
};
</script>
