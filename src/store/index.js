import Vue from 'vue'
import Vuex from 'vuex'
import storageUtil from '@/util/storageUtil.js'

Vue.use(Vuex)

const defaultTab = 'fund'

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    tabSelect: storageUtil.getAppConfig('homeTabSelect') || defaultTab,
    userInfo: {}
  },
  // getters就是state的计算属性
  getters: {
    // tabSelect: state => {
    //   return state.tabSelect
    // }
  },
  mutations: {
    SET_TAB_SELECT: (state, data) => {
      state.tabSelect = data
    },
    INIT_USER_INFO: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {
    setTabSelect ({commit}, data) {
      return new Promise(resolve => {
        commit('SET_TAB_SELECT', data)
        resolve()
      })
    },
    initUserInfo ({commit}, data) {
      return new Promise(resolve => {
        commit('INIT_USER_INFO', data)
        resolve()
      })
    }
  }
})

export default store
