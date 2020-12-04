<template>
  <div id="app" ref="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <router-view />
    <right-controll-bar class="rightControllBar"></right-controll-bar>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import rightControllBar from '@/views/unique/right.controll.bar.vue'

export default Vue.extend({
  name: '',
  components: { rightControllBar },
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
