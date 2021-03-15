<template>
  <div class="sub" :style="{ 'overflow-y': 'false', height: `${height}px` }">
    <video
      ref="video"
      autoplay
      :loop="false"
      :muted="false"
      controls
      @ended="onended"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
    >
      <source :src="scene.res.full" type="video/mp4" />
    </video>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  name: '',
  components: {},
  data() {
    return {
      height: 300,
      duration: 1,
      currentTime: 0,
      formatTime: '',
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters({ scene: 'video/scene' }),
  },
  filters: {},
  methods: {
    play() {
      let domVideo: any = this.$refs.video
      domVideo.pause()
      domVideo.load()
      domVideo.play()
    },
    onended() {
      console.log('onended')
    },
    onLoadedmetadata() {
      // let domVideo: any = this.$refs.video
      // this.duration = domVideo.duration
      // this.currentTime = domVideo.currentTime
    },
    onTimeupdate() {
      // let domVideo: any = this.$refs.video
      // this.currentTime = domVideo.currentTime
      // console.log(this.currentTime)
    },
  },
  async mounted() {
    this.height = window.innerHeight - 150
    window.onresize = () => {
      this.height = window.innerHeight - 150
    }
  },
})
</script>

<style lang="less" scoped>
.sub {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
video {
  object-fit: fill;
  height: 99%;
  width: 100%;

  filter: blur(0px);
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
  z-index: -1;
}
source {
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}
</style>
