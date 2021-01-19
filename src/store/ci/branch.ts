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
      let doc: any = await $ax.ctx.get(
        // 'http://review.source.unisoc.com/mfservice/rest/verify/buildlist',
        'http://cmverify.unisoc.com:8080/jenkins/branch'
        // {
        //   token,
        //   user: 'bm',
        // }
      )
      console.log(doc)
      state.doc = doc
      state.current = doc.row[0].branch
    },
  },
  getters: {
    branch() {
      //
    },
  },
}

export { branch }
