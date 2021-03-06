// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import router from './router/index'
import App from './App'
import './style/main.scss'
import VCharts from 'v-charts'
import '../static/web-fonts-with-css/css/fontawesome-all.css'
import environmentUtil from './util/environmentUtil'
import Http from '@/util/httpUtil.js'
import store from './store'
import numberUtil from '@/util/numberUtil.js'
import Clipboard from 'v-clipboard'
import moment from 'moment'

environmentUtil.setAdaptive()

Vue.use(Clipboard)
Vue.use(MintUI)
Vue.use(VCharts)

Vue.config.productionTip = false

Vue.prototype.$http = Http

Vue.prototype.ifShowAd = function () {
  // const d = new Date()
  // const hour = d.getHours()
  // const minute = d.getMinutes()
  // if (hour >= 14 && hour < 15 && minute > 44 && minute < 60) {
  //   return false
  // }
  return true
}

Vue.prototype.showAdType = function () {
  const d = new Date()
  const hour = d.getHours()
  const minute = d.getMinutes()
  if ((hour >= 7 && hour < 9) || (hour >= 11 && hour < 13) || (hour >= 17 && hour < 19)) {
    return '食品'
  }
  let list = ['宿舍用品', '男士用品', '女士用品', '茶具']
  return list[hour % 4]
}

Vue.prototype.getAdIndex = function (index, length) {
  const d = new Date()
  const day = d.getDay()
  return (index + day) % length
}

Vue.prototype.addPV = function (name) {
  // 不能是开发环境，也不能是管理员账户
  if (window._hmt && location.hostname !== 'localhost') {
    window._hmt.push(['_trackPageview', `/${name}`])
  }
}

Vue.prototype.numberClass = function (number) {
  if (!number) {
    return ''
  }
  return number < 0 ? 'green-text' : 'red-text'
}

Vue.prototype.$getDate = function () {
  // 获得当前运行环境时间
  let d = new Date()
  let currentDate = new Date()
  let tmpHours = currentDate.getHours()
  // 算得时区
  let timeZone = -d.getTimezoneOffset() / 60
  // 少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间（西区时间比东区时间早 所以加时区间隔）
  if (timeZone < 0) {
    timeZone = Math.abs(timeZone) + 8; currentDate.setHours(tmpHours + timeZone)
  } else {
    // 大于0的是东区  东区时间直接跟京八区相减
    timeZone -= 8; currentDate.setHours(tmpHours - timeZone)
  }
  return currentDate
}

Vue.prototype.numberBg = function (number) {
  if (!number) {
    return ''
  }
  return number < 0 ? 'green-bg' : 'red-bg'
}

Vue.prototype.formatFundName = function (name, len) {
  len = len || 12
  if (name.length > len) {
    const lastChart = name.substr(name.length - 1)
    if (lastChart === 'A' || lastChart === 'C') {
      return name.substr(0, (len - 2)) + '...' + lastChart
    }
    return name.substr(0, (len - 1)) + '...'
  } else {
    return name
  }
}

Vue.prototype.dayDate = function (str) {
  return moment(str).format('YYYY-MM-DD')
}

Vue.prototype.keep100 = function (number) {
  return Math.round(number / 100) * 100
}

for (let key in numberUtil) {
  Vue.prototype[key] = numberUtil[key]
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
