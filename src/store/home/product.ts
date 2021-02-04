const product = {
  namespaced: true,
  state: {
    total: 100,
    progress: 0,
    products: [],
    selected: [],
    productsInfo: {},
  },
  mutations: {
    async selected(state: any, val: any) {
      localStorage.setItem('home-product-picker-selected', JSON.stringify(val))
      state.selected = val
    },
  },
  actions: {
    async loadProducts({ commit, state, rootState }: any) {
      state.progress = 1
      let res1 = await $ax.ctx.get(`${$cfg.url.ucloud}/v1/thirdAccess/test/select-testproject`)
      state.progress = 30
      let keys: Array<string> = Object.keys(res1.data)
      let res2Paras = `projectIds=${keys.join(',')}`
      let res2 = await $ax.ctx.get(
        `${$cfg.url.ucloud}/v1/rsmanager/display/get–testInfo-by-projects?${res2Paras}`
      )
      state.progress = 90
      let products: Array<any> = []
      let productsInfo: any = {}
      keys.forEach((item: string) => {
        let productName = res1.data[item]
        let findIdx = res2.data.findIndex((value: any, idx: number, arr: any) => {
          return value.test_project == productName
        })
        if (findIdx != -1) {
          products.push({
            label: `${res1.data[item]}`,
            key: +item,
          })
          productsInfo[item] = res2.data[findIdx]
        }
      })
      state.products = products
      state.productsInfo = productsInfo
      let selected: any = localStorage.getItem('home-product-picker-selected') || '[]'
      selected = JSON.parse(selected)
      state.selected = selected
      state.progress = 100
    },
  },
  getters: {
    doc(state: any) {
      let doc: any = []
      state.selected.forEach((item: any) => {
        let productInfo = state.productsInfo[item]
        doc.push({ test_project_id: +item, ...productInfo })
      })
      return doc
    },
  },
}

export { product }
