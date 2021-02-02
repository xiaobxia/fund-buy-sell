// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import App from './App'
import './style/main.scss'
import Vant from 'vant'
import moment from 'moment'
// import '../static/web-fonts-with-css/css/fontawesome-all.css'
import environmentUtil from './util/environmentUtil'
import Http from '@/util/httpUtil.js'
import Clipboard from '@/directive/clipboard'
import store from './store'
import './permission'
import fileUtil from '@/util/fileUtil.js'
import numberUtil from '@/util/numberUtil.js'

Vue.use(Vant)

Vue.use(Clipboard)

Vue.config.productionTip = false

Vue.prototype.$http = Http

Vue.prototype.$formatToDay = function (day) {
  if (!day) {
    return ''
  }
  return moment(day).format('YYYY-MM-DD')
}

Vue.prototype.$formatToDateTime = function (day) {
  if (!day) {
    return ''
  }
  return moment(day).format('YYYY-MM-DD HH:mm:ss')
}

function registerUtil (util) {
  for (const key in util) {
    if (util.hasOwnProperty(key)) {
      Vue.prototype['$' + key] = util[key]
    }
  }
}

// 文件工具
registerUtil(fileUtil)
// 数字工具
registerUtil(numberUtil)

Vue.prototype.$stockNumberClass = function (number) {
  if (!number) {
    return ''
  }
  return number < 0 ? 'green-text' : 'red-text'
}

environmentUtil.setAdaptive()

Vue.prototype.$webUrl = 'http://funduse.xiaobxia.com/#'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
