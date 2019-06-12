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
import storageUtil from '@/util/storageUtil.js'

environmentUtil.setAdaptive()

Vue.use(Clipboard)
Vue.use(MintUI)
Vue.use(VCharts)

Vue.config.productionTip = false

Vue.prototype.$http = Http

Vue.prototype.addPV = function (name) {
  const userInfo = storageUtil.getUserInfo()
  const isAdmin = userInfo.name === 'wx_4' || userInfo.name === '17681824125'
  // 不能是开发环境，也不能是管理员账户
  if (window._hmt && location.hostname !== 'localhost' && !isAdmin) {
    const loginTag = userInfo.name ? '用户' : '游客'
    window._hmt.push(['_trackPageview', `/${loginTag}-${name}`])
  }
}

Vue.prototype.numberClass = function (number) {
  if (!number) {
    return ''
  }
  return number < 0 ? 'green-text' : 'red-text'
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
