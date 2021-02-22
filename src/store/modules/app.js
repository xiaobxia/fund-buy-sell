const app = {
  state: {
    wxList: [],
    infoList: []
  },
  mutations: {
    SET_wxList: (state, info) => {
      state.wxList = info
    },
    SET_infoList: (state, info) => {
      state.infoList = info
    }
  },
  actions: {
  }
}

export default app
