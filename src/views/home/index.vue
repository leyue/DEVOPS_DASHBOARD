<template>
  <div class="app" ref="app">
    <header-bar class="header" />
    <title-bar class="title" />
    <node-content ref="nodeContent" />
    <detail-tray class="bottom-tray" ref="detailTray" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import headerBar from './header.bar.vue'
import titleBar from './title.bar.vue'
import nodeContent from './content.vue'
import detailTray from '../detail/index.vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'index',
  components: { headerBar, titleBar, nodeContent, detailTray },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  methods: {},
  async mounted() {
    await this.$store.dispatch('branch/getDoc')
    await this.$func.mSleep(10)
    let branch = this.$store.state.branch.current
    console.log(branch)
    await this.$store.dispatch('product/getDoc', branch)
    await this.$store.dispatch('node/getDoc', branch)
  },
})
</script>

<style lang="less" scoped>
#app {
  overflow-x: auto;
}
.header {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 100;
}
.title {
  position: sticky;
  top: 61px;
  z-index: 10;
}
.content {
  margin-top: 0px;
}
.bottom-tray {
  position: fixed;
  z-index: 1000;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
