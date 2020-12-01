const video = {
  namespaced: true,
  state: {
    id: -1,
    timeCnt: 0,
    show: false,
  },
  mutations: {
    show(state: any) {
      state.timeCnt = 0
      if (state.show) {
        return
      }
      state.show = true
      state.id = setInterval(() => {
        state.timeCnt++
        if (state.timeCnt >= 3) {
          state.show = false
          state.timeCnt = 0
          clearInterval(state.id)
        }
      }, 1000)
    },
  },
  actions: {},
  getters: {
    routes() {
      return []
    },
  },
}

export { video }
