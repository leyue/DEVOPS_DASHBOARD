<template>
  <div>
    <div class="splash-content" :style="{ opacity }">
      <div class="logo">
        <img :src="scene.res.logo" alt="" />
      </div>
      <div class="float-controll-bar">
        <div class="title">
          {{ scene.name }}
        </div>
        <div class="content">
          {{ scene.res.text }}
        </div>
        <div class="button" @click="onShowDetail">了解详情</div>
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
    ...mapState({
      show: (state: any) => {
        return state.video.control
      },
    }),
    ...mapGetters({ scene: 'video/scene' }),
  },
  watch: {
    show(newV, oldV) {
      this.opacity = newV ? 1 : 0
    },
  },
  filters: {},
  methods: {
    async onShowDetail() {
      this.$store.commit('video/pause', { pause: true })
      this.detail.visable = true
      await this.$func.mSleep(10)
      // @ts-ignore
      let domVideoDetail: any = this.$refs.videoDetail
      domVideoDetail.play()
    },
    onDetailClose() {
      // @ts-ignore
      let domVideo: any = this.$refs.videoDetail.$refs.video
      domVideo.pause()
    },
    onDetailClosed() {
      this.$store.commit('video/pause', { pause: false })
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
.splash-content {
  box-sizing: border-box;
  z-index: 0;
  text-align: center;
  width: 100%;
  position: fixed;
  top: 52px;
  bottom: 0px;
  color: #fff;
  transition: opacity 1.3s cubic-bezier(0.42, 0, 0.58, 1) 0s;
  .logo {
    margin-top: 30px;
    img {
      margin-top: 30px;
      margin-left: 15px;
      width: 250px;
      -webkit-font-smoothing: antialiased;
    }
  }
  .float-controll-bar {
    position: fixed;
    left: 150px;
    bottom: 150px;
    .title {
      font-size: 28px;
      text-align: left;
    }
    .content {
      text-align: left;
      width: 70%;
    }
    .button {
      width: 200px;
      height: 40px;
      line-height: 40px;
      margin-top: 5px;
    }
  }
}

.button {
  background-color: #0aaff1;
  border-radius: 1px;
  &:hover {
    background-color: #008dc5;
  }
}
dialog {
  background-color: #150d0bbb !important;
  border-radius: 0;
}
</style>

<style lang="less">
.splash-content {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
