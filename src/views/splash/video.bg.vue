<template>
  <div class="app">
    <video ref="video" :loop="false" autoplay data-keepplaying :muted="muted" @ended="onended">
      <source :src="scene.res.highlight" type="video/mp4" />
    </video>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: '',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      scenes: (state: any) => {
        return state.video.scenes
      },
      idx: (state: any) => {
        return state.video.currentIdx
      },
      muted: (state: any) => {
        return state.video.muted
      },
      pause: (state: any) => {
        return state.video.pause
      },
    }),
    ...mapGetters({ scene: 'video/scene' }),
  },
  watch: {
    scene(newV, oldV) {
      let domVideo: any = this.$refs.video
      domVideo.pause()
      domVideo.load()
      domVideo.play()
    },
    pause(newV, oldV) {
      let domVideo: any = this.$refs.video
      if (newV) {
        domVideo.pause()
      } else {
        domVideo.play()
      }
    },
  },
  filters: {},
  methods: {
    onended() {
      console.log('onended')
      this.$store.commit('video/playNext')
    },
  },
  async mounted() {},
})
</script>

<style lang="less" scoped>
.app {
  box-sizing: border-box;
  position: fixed;
  right: 0px;
  bottom: 0px;
  z-index: -1;
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
  -webkit-filter: grayscale(10%);
  filter: grayscale(10%);
  z-index: -1;
}
source {
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}
</style>
