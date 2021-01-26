const app = {
  state: {
    wxList: []
  },
  mutations: {
    SET_wxList: (state, info) => {
      console.log(info)
      state.wxList = info
    }
  },
  actions: {
  }
}

export default app
