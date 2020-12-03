<template>
  <div class="app" ref="app" @click="onActived" @mousemove="onMousemoved">
    <video-bg ref="videoBg"></video-bg>
    <header-bar ref="header"></header-bar>
    <content-body ref="content"></content-body>
    <docker-bar ref="dockerBar"></docker-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import videoBg from './video.bg.vue'
import headerBar from './header.bar.vue'
import contentBody from './content.vue'
import dockerBar from './docker.bar.vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'index',
  components: { videoBg, headerBar, contentBody, dockerBar },
  data() {
    return {
      actived: false,
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  methods: {
    async onActived() {
      this.$store.commit('video/showControl')
      this.$store.commit('video/muted', { muted: false })
      this.actived = true
    },
    onMousemoved() {
      if (!this.actived) {
        return
      }
      this.$store.commit('video/showControl')
    },
  },
  async mounted() {},
})
</script>

<style lang="less" scoped>
#app {
  overflow: hidden;
}
</style>
