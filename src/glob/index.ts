import Vue from 'vue'
import cfg from './cfg'
import func from '../utils/func'
import * as ax from '../utils/ax'

declare global {
  let $cfg: typeof cfg
  let $func: typeof func
  let $ax: typeof ax
}

//@ts-ignore
global.$cfg = cfg
//@ts-ignore
global.$func = func
//@ts-ignore
global.$ax = ax

declare module 'vue/types/vue' {
  interface Vue {
    $cfg: typeof cfg
    $func: typeof func
    $ax: typeof ax
  }
}

Vue.use((Vue: any, options: any) => {
  console.log('declare inject vue')
  Vue.prototype.$cfg = cfg
  Vue.prototype.$func = func
  Vue.prototype.$ax = ax
})
