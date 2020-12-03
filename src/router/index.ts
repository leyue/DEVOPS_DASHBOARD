import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Splash from '../views/splash/index.vue'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Splash',
    component: Splash,
  },
  {
    path: '/ci',
    name: 'CI',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ci/index.vue'),
  },
]

const router = new VueRouter({
  // hash(default) | history
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  switch (to.path) {
    case '/':
      store.commit('showRightControllBar', false)
      break
    default:
      store.commit('showRightControllBar', true)
      break
  }
})

export default router
