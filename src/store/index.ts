import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user'
import { video } from './splash/video'
import { branch } from './ci/branch'
import { product } from './ci/product'
import { node } from './ci/node'
import { team } from './home/team'
import { product as homeProduct } from './home/product'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    demoMutation(state: any) {},
  },
  actions: {
    async demoAction({ commit, state, rootState }, app) {
      await $func.mSleep(1000)
      console.log(3)
    },
  },
  getters: {
    demoGetter(state: any) {
      return async () => {
        return null
      }
    },
  },
  modules: { user, video, branch, product, node, team, homeProduct },
})
