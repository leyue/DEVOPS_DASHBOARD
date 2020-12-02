const token = '35ae82ffb63cdaa576308df98b79fc426ba096e0e958a5e46c689e3f7e25c50c'

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
      let doc: any = await $ax.ctx.post(
        'http://review.source.unisoc.com/mfservice/rest/verify/buildlist',
        {
          token,
          user: 'bm',
        }
      )
      console.log(doc)
      state.doc = doc
      state.current = doc.result[0].branch
    },
  },
  getters: {
    branch() {
      //
    },
  },
}

export { branch }
