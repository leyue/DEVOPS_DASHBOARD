import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user'
import { video } from './splash/video'
import { branch } from './ci/branch'
import { product } from './ci/product'
import { node } from './ci/node'
import { team } from './home/team'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    demo(state: any) {},
  },
  actions: {
    async demo({ commit, state, rootState }, app) {
      await $func.mSleep(1000)
      console.log(3)
    },
  },
  modules: { user, video, branch, product, node, team },
})
