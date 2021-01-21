const white_list: Array<string> = [
  '产品工程部',
  '基础软件技术资源部',
  '多媒体集成技术资源部',
  '嵌入式软件技术资源部',
  '工具与版本集成技术资源部',
  '应用与媒体平台测试技术资源部',
  '智能软件技术资源部',
  '通讯测试技术资源部',
]

function checkValidRes(res: any) {
  if (
    !res.data.projectsNumber &&
    !res.data.casesNumver &&
    !res.data.testTimes &&
    !res.data.dutNumber &&
    !res.data.runTestNumbers
  ) {
    return false
  }
  return true
}

const team = {
  namespaced: true,
  state: {
    path: '/',
    total: 1,
    progress: 0,
    doc: [],
  },
  mutations: {},
  actions: {
    // watch path = /*/工具与版本集成技术资源部/tools
    async jumpToPath({ commit, state, rootState }: any, { path }: any) {
      if (state.path == path) {
        return
      }
      state.path = path
      state.total = 1
      state.progress = 1
      let doc: any = []
      let lst: Array<string> = path.split('/').filter((item: string) => {
        return item != ''
      })
      let len = lst.length
      switch (len) {
        case 1: {
          let res = await $ax.ctx.get(
            `${$cfg.url.ucloud}/v1/thirdAccess/depl/get-depl2Info`
          )
          let teamL2s: Array<any> = res.data
          state.total = teamL2s.length
          for (let [idx, teamL2] of teamL2s.entries()) {
            if (
              !teamL2 ||
              (white_list.length != 0 && !white_list.includes(teamL2))
            ) {
              continue
            }
            res = await $ax.ctx.get(
              `${$cfg.url.ucloud}/v1/rsmanager/display/get–info-by-depid?depid2=${teamL2}`
            )
            if (!checkValidRes(res)) {
              continue
            }
            doc.push({ name: teamL2, ...res.data })
            state.progress = idx
          }
          state.progress = state.total
          state.doc = doc
          break
        }
        case 2: {
          let teamL2 = lst[1]
          let res = await $ax.ctx.get(
            `${$cfg.url.ucloud}/v1/thirdAccess/depl/get-depl3Info?depl2=${teamL2}`
          )
          let teamL3s: Array<any> = res.data
          state.total = teamL3s.length
          for (let [idx, teamL3] of teamL3s.entries()) {
            if (!teamL3) {
              continue
            }
            res = await $ax.ctx.get(
              `${$cfg.url.ucloud}/v1/rsmanager/display/get–info-by-depid?depid2=${teamL2}&depid3=${teamL3}`
            )
            // if (!checkValidRes(res)) {
            //   continue
            // }
            doc.push({ name: teamL3, ...res.data })
            state.progress = idx
          }
          state.progress = state.total
          state.doc = doc
          break
        }
      }
      console.log(doc)
    },
  },
  getters: {},
}

export { team }
