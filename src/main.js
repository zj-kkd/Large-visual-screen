import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/router';
import store from './store/store';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

import echarts from 'echarts';
import 'echarts-gl';


import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';




import chartConfig from './js/chart_config';
// import 'lib-flexible';
// import axios from './axios/axios';

import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './js/background';
import './js/iconfont';

Vue.use(ElementUi);
Vue.use(vuescroll);
Vue.prototype.$http = axios;
Vue.prototype.$chartConfig = chartConfig;
Vue.prototype.$message = ElementUi.Message
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
