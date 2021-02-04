import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Splash from '../views/splash/index.vue'
import store from '../store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: string) {
  //@ts-ignore
  return originalPush.call(this, location).catch((err: any) => err)
}
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Splash',
    component: Splash,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/global',
    name: 'global',
    component: () => import('../views/global/index.vue'),
  },
  {
    path: '/ci',
    name: 'ci',
    component: () => import('../views/ci/index.vue'),
  },
]

const router = new VueRouter({
  // hash(default) | history
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

let enabelSplash: boolean = (localStorage.getItem('setting-enable-splash') || 'true') == 'true'
let homePage: string = localStorage.getItem('setting-home-page') || 'home'

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (from.path == '/' && to.path == '/') {
    if (enabelSplash) {
      next()
    } else {
      next({ path: homePage })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {})

export default router
