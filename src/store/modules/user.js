const user = {
  state: {
    userInfo: {},
    buyActive: 20
  },
  mutations: {
    SET_userInfo: (state, info) => {
      state.userInfo = info
    },
    SET_buyActive: (state, info) => {
      state.buyActive = info
    }
  },
  actions: {
  }
}

export default user
