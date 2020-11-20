const branch = {
  namespaced: true,
  state: {
    doc: {},
    current: null,
  },
  mutations: {
    setCurrent(state: any, branch: string) {
      state.current = branch
    },
  },
  actions: {
    async getDoc({ commit, state, rootState }: any) {
      $ax.setJenkinsUrl()
      let doc: any = await $ax.ctx.get('/jenkins/branch', {})
      console.log(doc)
      state.doc = doc
      state.current = doc.row[0].name
    },
  },
  getters: {
    branch() {
      //
    },
  },
}

export { branch }
