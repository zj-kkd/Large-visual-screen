import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)





export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    page: 'home',
    homeData: '',
    // controlData: data,
    
    // echarts 鼠标移入
    tooltip: [
      {
        trigger: "item",
        backgroundColor: "rgba(0,101,153,.5)",
        textStyle: {
          fontSize: 12,
          color: '#fff'
        },
        confine: true,
        show: true,
        padding: [10, 10],
      },
      {
        confine: true,
        trigger: "axis",
        axisPointer: {
          label: {
            show: false,
          },
          lineStyle: {
            width: 0
          }
        },
        backgroundColor: "rgba(0,101,153,.5)",
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
        padding: [10, 10],
      }
    ],

    // 坐标轴缩放
    dataZoom: [
      {
        type: "inside",
        show: true,
        xAxisIndex: [0],
        start: 1,
        end: 30
      }
    ],


  },
  mutations: {
    token(state, data) {
      state.token = data
    },

    setData(state, value) {
      state[value.nameSpace] = value;
    },
    showPage(state, value) {
      state.page = value
    }
  },
  actions: {
  },
  modules: {
  }
})
