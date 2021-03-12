<template>
  <div id="app" ref="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <keep-alive :include="cache">
      <router-view />
    </keep-alive>
    <right-controll-bar class="rightControllBar"></right-controll-bar>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import rightControllBar from '@/views/unique/right.controll.bar.vue'

export default Vue.extend({
  name: '',
  components: { rightControllBar },
  data() {
    return {
      cache: ['home', 'global', 'ci'],
    }
  },
  mounted() {
    let doc = document.documentElement
    window.addEventListener('resize', () => {
      if (window.orientation === 180 || window.orientation === 0) {
        console.log('竖屏')
      }
      if (window.orientation === 90 || window.orientation === -90) {
        console.log('横屏')
      }
    })
  },
})
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #72757a;
  margin: 0;
  padding: 0;
}

#nav {
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style lang="less">
@media screen and (orientation: portrait) {
  /*竖屏...*/
}
@media screen and (orientation: landscape) {
  /*横屏...*/
}
@media only screen and (max-width: 1600px) and (min-width: 1280px) {
  html {
    font-size: 14px;
  }
}
@media only screen and (max-width: 1280px) and (min-width: 960px) {
  html {
    font-size: 12px;
  }
}
@media only screen and (max-width: 960px) {
  html {
    font-size: 10px;
  }
}
img {
  content: normal !important;
}
</style>
