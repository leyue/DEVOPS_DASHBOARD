<template>
  <div>
    <div class="app" :style="{ opacity }">
      <div class="logo">
        <img
          style="margin-top: 30px; margin-left: 15px;width: 250px;  -webkit-font-smoothing: antialiased;"
          src="@/assets/icon/紫光展锐-反白-en.png"
          alt=""
        />
      </div>
      <div class="float-controll-bar">
        <div style="font-size: 28px; text-align: left;">
          梦幻实验室
        </div>
        <div style="text-align: left; width: 70%;">
          虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进，它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎。
        </div>
        <div
          class="button"
          style="width: 200px; height: 40px;  line-height: 40px; margin-top: 5px;"
          @click="onShowDetail"
        >
          了解详情
        </div>
      </div>
    </div>
    <div>
      <el-dialog
        id="dlg"
        ref="dlg"
        size="mini"
        width="90%"
        top="4vh"
        :modal="true"
        :modal-append-to-body="false"
        :center="true"
        :visible.sync="detail.visable"
        @close="onDetailClose"
        @closed="onDetailClosed"
      >
        <video-detail ref="videoDetail"></video-detail>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import videoDetail from './video.detail.vue'

export default Vue.extend({
  name: '',
  components: { videoDetail },
  data() {
    return {
      opacity: 0,
      detail: {
        visable: false,
      },
    }
  },
  computed: {
    ...mapState('video', {
      show: (state: any) => {
        return state.show
      },
    }),
  },
  watch: {
    show(newV, oldV) {
      this.opacity = newV ? 1 : 0
    },
  },
  filters: {},
  methods: {
    async onShowDetail() {
      // @ts-ignore
      let domVideo: any = this.$parent.$refs.videoBg.$refs.video
      domVideo.pause()
      this.detail.visable = true
      await this.$func.mSleep(10)
      // @ts-ignore
      let domVideoDetail: any = this.$refs.videoDetail
      domVideoDetail.loadMovie('0')
    },
    onDetailClose() {
      // @ts-ignore
      let domVideo: any = this.$refs.videoDetail.$refs.video
      domVideo.pause()
    },
    onDetailClosed() {
      // @ts-ignore
      let domVideo: any = this.$parent.$refs.videoBg.$refs.video
      domVideo.play()
    },
  },
  async mounted() {
    let dlg: any = document.getElementById('dlg')
    // @ts-ignore
    dlg.childNodes[0].style['background-color'] = '#ffffff'
    dlg.childNodes[0].style['padding'] = 0
  },
})
</script>

<style lang="less" scoped>
.app {
  z-index: 0;
  text-align: center;
  font-size: 14px;
  width: 100%;
  position: fixed;
  top: 52px;
  bottom: 0px;
  color: #fff;
  transition: opacity 1.3s cubic-bezier(0.42, 0, 0.58, 1) 0s;
  .logo {
    margin-top: 30px;
  }
  .float-controll-bar {
    position: fixed;
    left: 150px;
    bottom: 150px;
  }
}

.button {
  background-color: #0aaff1;
  border-radius: 1px;
  &:hover {
    background-color: #008dc5;
  }
}
.el-dialog__header {
  padding: 0;
}
dialog {
  background-color: #150d0bbb !important;
  border-radius: 0;
}
</style>
