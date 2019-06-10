/**
 * Created by xiaobxia on 2018/4/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
const lazyLoading = (path, index = true) => () => System.import(`@/routers/${path}${index ? '/index' : ''}.vue`)

Vue.use(Router)

const routers = [
  {
    name: 'Index',
    path: '/',
    component: null
  },
  {
    name: 'HelloWorld',
    path: '/page/helloWorld',
    component: lazyLoading('HelloWorld'),
    meta: {
      auth: true,
      roles: {
        include: ['admin']
      }
    }
  },
  {
    name: 'Login',
    path: '/page/login',
    component: lazyLoading('Login')
  },
  {
    name: 'ResetPassword',
    path: '/page/resetPassword',
    component: lazyLoading('ResetPassword')
  },
  {
    name: 'NoPermission',
    path: '/noPermission',
    component: lazyLoading('NoPermission')
  },
  {
    name: 'Band',
    path: '/page/band',
    component: lazyLoading('Band')
  },
  {
    name: 'HighBand',
    path: '/page/highBand',
    component: lazyLoading('HighBand')
  },
  {
    name: 'FixedInvestment',
    path: '/page/fixedInvestment',
    component: lazyLoading('FixedInvestment')
  },
  {
    name: 'Recharge',
    path: '/page/recharge',
    component: lazyLoading('Recharge')
  },
  {
    name: 'GetTest',
    path: '/page/getTest',
    component: lazyLoading('GetTest')
  },
  {
    name: 'Agreement',
    path: '/page/agreement',
    component: lazyLoading('Agreement')
  },
  {
    name: 'AboutUs',
    path: '/page/aboutUs',
    component: lazyLoading('AboutUs')
  },
  {
    name: 'Question',
    path: '/page/question',
    component: lazyLoading('Question')
  },
  {
    name: 'TodayRank',
    path: '/page/todayRank',
    component: lazyLoading('TodayRank')
  },
  {
    name: 'MonthRank',
    path: '/page/monthRank',
    component: lazyLoading('MonthRank')
  },
  {
    name: 'Valuation',
    path: '/page/valuation',
    component: lazyLoading('Valuation')
  },
  {
    name: '404',
    path: '*',
    component: lazyLoading('NotMatch')
  }
]

console.log(`路由数量：${routers.length}`)

export default new Router({
  // hash, history
  mode: 'hash',
  linkActiveClass: 'is-active',
  // 这个功能只在 HTML5 history 模式下可用
  scrollBehavior: () => ({y: 0}),
  routes: routers
})
