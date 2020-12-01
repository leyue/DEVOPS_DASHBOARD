<template>
  <div class="app" ref="app">
    <video id="v1" autoplay loop muted>
      <source src="@/assets/home.mp4" type="video/mp4" />
    </video>
    <header-bar></header-bar>
    <content-body></content-body>
    <docker-bar></docker-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import headerBar from './header.bar.vue'
import contentBody from './content.vue'
import dockerBar from './docker.bar.vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'index',
  components: { headerBar, contentBody, dockerBar },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  methods: {},
  async mounted() {},
})
</script>

<style lang="less" scoped>
#app {
  overflow-x: auto;
}
video {
  position: fixed;
  right: 0px;
  bottom: 0px;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  filter: blur(10px);
  -webkit-filter: grayscale(100%);
  filter: grayscale(90%);
  z-index: -1;
}
source {
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}
</style>
