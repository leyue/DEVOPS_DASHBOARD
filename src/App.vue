<template>
  <div id="app" ref="app">
    <div id="nav">
      <router-link to="/"></router-link>
      <router-link to="/about"></router-link>
    </div>
    <router-view />
  </div>
</template>

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
