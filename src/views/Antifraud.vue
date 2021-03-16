<template>
  <div class="page-antifraud" v-if="antifraudData">
    <div class="main">
      <div class="left">
        <div class="part">
          <DefraudFrom></DefraudFrom>
        </div>
        <div class="part">
          <PhoneInterception></PhoneInterception>
        </div>
      </div>

      <div class="center">
        <div class="part">
          <DefraudTypeNumber :chartData='antifraudData.data_statistics'></DefraudTypeNumber>
        </div>
        <div class="part">
          <DefraudMap :chartData ='antifraudData.data_map'></DefraudMap>
        </div>
        <div class="part">
          <DefraudMsg :chartData='antifraudData.scam_SMS_statistics'></DefraudMsg>
        </div>
      </div>

      <div class="right">
         <div class="part">
           <div class="malicious-app">
             <li v-for="(item, index) in antifraudData.malicious_software" :key="index">
               <img class="icon" :src="require(`../../public/static/img/icons/${iconUrl[index]}.png`)"  alt="">
               <div class="info">
                 <p class="title">{{item.name}}</p>
                 <p class=" value-add">
                   <span class="value">{{item.value}}</span>
                   <span class="add">{{item.add}}</span>
                 </p>
               </div>
             </li>
           </div>
        </div>
        <div class="part">
          <MaliciousWebType></MaliciousWebType>
        </div>
        <div class="part">
          <MaliciousEngineRoomTop :chartData="antifraudData.malicious_url_machine_room"></MaliciousEngineRoomTop>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-antifraud {
  width: 100%;
  height: 100%;
  .main {
    padding-left: 10rem;
    padding-right: 10rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .left,
    .right {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      width: 22%;
      height: calc(100vh - 90rem);
      .part {
        width: 100%;
      }
    }
    .right {
      .part {
        .malicious-app {
          padding-left: 15rem;
          margin-top: 15rem;
          width: 100%;
          height: 140rem;
          display: flex;
          flex-wrap: wrap;
           justify-content: space-between;
           align-content: space-between;
          li {
            width: 45%;
            height: 50rem;
            display: flex;
            align-content: center;
            .icon {
              margin-right: 10rem;
              width: 50rem;
              height: 50rem;
            }
            .info {
              position: relative;
              flex: 1;
              color: rgba(204, 204, 204, 1);
              .title {
                font-size: 16rem;
              }
              .value-add {
                width: 100%;
                position: absolute;
                bottom: 0;
                .value {
                  font-size: 16rem;
                }
                .add {
                  color: $yellow;
                  position: absolute;
                  bottom: 0; 
                  right: 25rem;
                  &::before {
                    content: '';
                    display: inline-block;
                    width: 10rem;
                    height: 10rem;
                    background-size: 100%;
                    background-image: url('../../public/static/img/icons/icon_add.png');
                    margin-right: 2rem;

                  }
                }
              }
            }
          }

        }
      }
    }
    .center {
      padding: 0 20rem;
      height: calc(100vh - 90rem);
      width: 56%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .part {
        width: 100%;
      }
    }
  }
}
</style>
<script>
import DefraudTypeNumber from '../components/antiFraud/DefraudTypeNumber'
import MaliciousEngineRoomTop from '../components/antiFraud/MaliciousEngineRoomTop'
import MaliciousWebType from '../components/antiFraud/MaliciousWebType'
import DefraudFrom from '../components/antiFraud/DefraudFrom'
import PhoneInterception from '../components/antiFraud/PhoneInterception'
import DefraudMap from '../components/antiFraud/DefraudMap'
import DefraudMsg from '../components/antiFraud/DefraudMsg'

export default {
  components: {
    DefraudTypeNumber,
    MaliciousEngineRoomTop,
    MaliciousWebType,
    DefraudFrom,
    PhoneInterception,
    DefraudMap,
    DefraudMsg
  },
  data() {
    return {
      antifraudData: '',

      data1: [
        { name: '诈骗反宣传电话拦截量', value: 9485, add: 28 },
        { name: '诈骗反宣传电话拦截量', value: 9485, add: 28 },
        { name: '诈骗反宣传电话拦截量', value: 9485, add: 28 },
        { name: '诈骗反宣传电话拦截量', value: 9485, add: 28 },
        { name: '诈骗反宣传电话拦截量', value: 9485, add: 28 },
      ],

      data2: [
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
        { name: '宁波高新数据中心', value: 20459 },
      ],
      iconUrl: ['icon_app', 'icon_fanzha', 'icon_eyrj', 'icon_smpt']
    }
  },
  created() {
    this.$http.get("/showData/getData/anti_fraud_center").then(({data}) => {
      data.nameSpace = "antifraudData";
      this.$store.commit("setData", data);
      this.antifraudData = this.$store.state.antifraudData;
    });
    setInterval(() => {
      this.$http.get("/showData/getData/anti_fraud_center").then(({ data }) => {
        data.nameSpace = "antifraudData";
        this.$store.commit("setData", data);
        this.antifraudData = this.$store.state.antifraudData;
      });
    }, 5000);
  }
};
</script>