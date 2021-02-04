interface IDoc {
  total: number
  name: string
  product: Array<any>
}

const product = {
  namespaced: true,
  state: {
    doc: {},
  },
  mutations: {},
  actions: {
    async getDoc({ commit, state, rootState }: any, name: string) {
      $ax.setJenkinsUrl()
      let srcDoc: IDoc = await $ax.ctx.get(`/jenkins/product?name=${name}`)
      let doc: IDoc = {
        total: srcDoc.total,
        name: srcDoc.name,
        product: [],
      }
      for (let [idx, srcItem] of srcDoc.product.entries()) {
        let name: string = srcItem.name
        let item = doc.product.find((val: any, idx: number, arry: Array<any>) => {
          return val.name == name
        })
        if (!item) {
          doc.product.push({
            name,
            user: [srcItem.user],
            weight: 1,
          })
        } else {
          item.weight++
          item.user.push(srcItem.user)
        }
      }
      console.log(doc)
      state.doc = doc
      if (!state.idx) {
        state.idx = 0
      }
    },
  },
  getters: {
    branch() {
      //
    },
  },
}

export { product }
