const user = {
  state: {
    userInfo: {},
    buyActive: 20,
    isVipUser: false
  },
  mutations: {
    SET_userInfo: (state, info) => {
      state.userInfo = info
      state.isVipUser = info.email_active === true && (info.vip_days && info.vip_days > 0)
    },
    SET_buyActive: (state, info) => {
      state.buyActive = info
    }
  },
  actions: {
  }
}

export default user
