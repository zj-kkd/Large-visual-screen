import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决当前路由重复点击
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter);

const routes = [
  // { path: '/', component: () => import('../views/Login.vue') },



  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/home', component: () => import('../views/Home.vue') },
  // 管控信息中心
  { path: '/managementControl', component: () => import('../views/ManagementControl.vue') },
  // 网络安全
  { path: '/internetSecurity', component: () => import('../views/InternetSecurity.vue') },
  // 信息安全
  { path: '/infoSecurityCenter', component: () => import('../views/InfoSecurityCenter.vue') },
  // 反诈
  { path: '/antifraud', component: () => import('../views/Antifraud.vue') },
  // 工业互联网
  { path: '/industrialInter', component: () => import('../views/IndustrialInter.vue') },
  // 数据安全
  { path: '/dataSecurity', component: () => import('../views/DataSecurity.vue') },
  // IP汇聚
  { path: '/ip', component: () => import('../views/IPConvergence.vue') },



  // { path: '/fanzha', component: () => import('../views/FanZha.vue') },
  // 测试
  { path: '/map', component: () => import('../components/worldMap.vue') },
  { path: '/map3d', component: () => import('../components/test/Map3D.vue') },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router

// router.beforeEach((to, from, next) => {
//   let isLogin = localStorage.getItem('token')

//   if (to.path == '/') {
//     if (isLogin) {
//       next('/home')
//     } else {
//       next()
//     }
//   } else {
//     if (isLogin) {
//       next()
//     } else {
//       next('/')
//     }
//   }
// })
