import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user'
import { video } from './video'
import { branch } from './branch'
import { product } from './product'
import { node } from './node'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rightControllBar: false,
  },
  mutations: {
    showRightControllBar(state: any, visable) {
      state.rightControllBar = visable
    },
  },
  actions: {
    async demo({ commit, state, rootState }, app) {
      await $func.mSleep(1000)
      console.log(3)
    },
  },
  modules: { user, video, branch, product, node },
})
