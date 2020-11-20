interface IDoc {
  total: number
  node: Array<any>
}

const node = {
  namespaced: true,
  state: {
    doc: {},
    idx: 0,
    item: {},
  },
  mutations: {
    clearAllSelected(state: any) {
      for (let [idx, srcItem] of state.doc.node.entries()) {
        srcItem.selected = false
        for (let [subIdx, subSrcItem] of srcItem.products.entries()) {
          subSrcItem.selected = false
        }
      }
    },
    setCurrentItem(state: any, { idx, item }: any) {
      console.log(state, idx, item)
      state.idx = idx
      state.item = item
    },
  },
  actions: {
    async getDoc({ commit, state, rootState }: any, name: string) {
      $ax.setJenkinsUrl()
      let srcDoc: IDoc = await $ax.ctx.get(`/jenkins/node?name=${name}`)
      let doc: IDoc = {
        total: srcDoc.total,
        node: [],
      }
      for (let [idx, srcItem] of srcDoc.node.entries()) {
        let item: any = {
          id: srcItem.id,
          time: srcItem.time,
          selected: false,
          products: [],
        }
        for (let [subIdx, subSrcItem] of srcItem.products.entries()) {
          item.products.push({ ...subSrcItem, selected: false })
        }
        doc.node.push(item)
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

export { node }
