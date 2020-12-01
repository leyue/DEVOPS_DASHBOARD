<template>
  <div class="sub" :style="{ 'overflow-y': 'false', height: `${height}px` }">
    <video
      ref="video"
      autoplay
      loop
      :muted="false"
      controls
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
    >
      <source :src="src" type="video/mp4" />
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
      src: '',
      duration: 1,
      currentTime: 0,
      formatTime: '',
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {
    loadMovie(name: string) {
      this.src = `https://nats-sh.unisoc.com/download/logs/temp/${name}.mp4`
      let domVideo: any = this.$refs.video
      domVideo.pause()
      domVideo.load()
      domVideo.play()
    },
    onLoadedmetadata() {
      let domVideo: any = this.$refs.video
      console.log(domVideo.duration)
      this.duration = domVideo.duration
      this.currentTime = domVideo.currentTime
    },
    onTimeupdate() {
      let domVideo: any = this.$refs.video
      this.currentTime = domVideo.currentTime
      let mo = moment.duration(this.currentTime, 'seconds')
      this.formatTime = `${
        mo.minutes() > 0 ? `${mo.minutes()}m:` : ''
      }${mo.seconds()}s`
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
