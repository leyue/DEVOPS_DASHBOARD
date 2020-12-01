<template>
  <div class="app">
    <video ref="video" autoplay loop :muted="muted">
      <source :src="src" type="video/mp4" />
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
    return {
      id: 0,
      src: 'https://nats-sh.unisoc.com/download/logs/temp/0.mp4',
      muted: true,
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {
    onActived() {
      this.muted = false
    },
    changeScene(id: number, name: string) {
      console.log(id, name)
      this.src = `https://nats-sh.unisoc.com/download/logs/temp/${id}.mp4`
      let domVideo: any = this.$refs.video
      domVideo.pause()
      domVideo.load()
      domVideo.play()
    },
  },
  async mounted() {},
})
</script>

<style lang="less" scoped>
.app {
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
