import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user'
import { branch } from './branch'
import { product } from './product'
import { node } from './node'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async demo({ commit, state, rootState }, app) {
      await $func.mSleep(1000)
      console.log(3)
    },
  },
  modules: { user, branch, product, node },
})
