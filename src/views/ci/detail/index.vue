<template>
  <div v-show="show" class="app" :style="{ height: `${drag.height}px` }">
    <div class="content">
      <div class="title line" @mousedown="onTitleMouseDown($event)">
        <p style="font-weight: bold; font-size: 14px;">{{ branch }}</p>
        <p style="font-size: 12px; margin-left: 15px;">
          {{ idx == -1 ? item.id : board.id }}
        </p>
        <p style="font-size: 10px; margin-left: 15px;">
          {{ idx == -1 ? item.time : board.time }}
        </p>
        <div style="flex: 2; height: 100%;"></div>
        <p style="font-size: 10px;">按下ESC快速返回</p>
        <el-button
          style="margin-left: 10px"
          type="info"
          circle
          icon="el-icon-close"
          @click="onClose"
        ></el-button>
      </div>
      <div class="tab-pages">
        <el-tabs>
          <el-tab-pane>
            <span slot="label"><div class="tab-pane">编译 (Build)</div></span>
            <div class="page" :style="{ height: `${drag.pageHeight}px` }">
              <build />
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><div class="tab-pane">变更 (Change)</div></span>
            <div class="page" :style="{ height: `${drag.pageHeight}px` }">
              <build />
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><div class="tab-pane">静态扫描</div></span>
            <div class="page" :style="{ height: `${drag.pageHeight}px` }">
              <scan />
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"
              ><div class="tab-pane">测试 (Test Results)</div></span
            >
            <div class="page" :style="{ height: `${drag.pageHeight}px` }">
              <test />
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"
              ><div class="tab-pane">流程监控 (Flow Monitor)</div></span
            >
            <div class="page">
              <flow-monitor />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import build from './build.vue'
import change from './change.vue'
import scan from './scan.vue'
import test from './test.vue'
import flowMonitor from './flow.monitor.vue'

export default Vue.extend({
  name: '',
  components: { build, change, scan, test, flowMonitor },
  data() {
    return {
      // width: 0,
      show: false,
      drag: {
        enable: false,
        height: 400,
        pageHeight: 290,
        startheight: 400,
        startY: 0,
      },
    }
  },
  computed: {
    ...mapState('branch', {
      branch: (state: any) => {
        return state.current
      },
    }),
    ...mapState('node', {
      idx: (state: any) => {
        return state.idx
      },
      item: (state: any) => {
        return state.item
      },
      board: (state: any) => {
        if (state.idx == -1 || !state.item.products) {
          return {}
        }
        return state.item.products[state.idx]
      },
    }),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {
    onClose() {
      this.show = false
      //@ts-ignore
      this.$parent.$refs.nodeContent.detailTray = false
    },
    // vue @mousemove @mouseup 存在严重的不跟手bug
    onTitleMouseDown(ev: MouseEvent) {
      this.drag.enable = true
      this.drag.startY = ev.clientY
      this.drag.startheight = this.drag.height

      document.onmousemove = async (ev: MouseEvent) => {
        if (this.drag.enable) {
          await this.$func.mSleep(1)
          let offsetY = this.drag.startY - ev.clientY
          let height = this.drag.startheight + offsetY
          this.drag.height = height < 200 ? 200 : height
          this.drag.pageHeight = this.drag.height - 110
          //@ts-ignore
          this.$parent.$refs.nodeContent.detailTrayHeight = this.drag.height
        }
      }
      document.onmouseup = (ev: MouseEvent) => {
        this.drag.enable = false
      }
    },
  },
  async mounted() {
    window.onresize = () => {}
    document.onkeydown = (ev: KeyboardEvent) => {
      switch (ev.key) {
        case 'Escape':
          this.onClose()
          break
      }
    }
  },
})
</script>

<style lang="less" scoped>
.app {
  box-sizing: border-box;
  border: 3px solid rgb(134, 141, 148);
  background-color: #ffffff;
  color: #4d4e50;
  min-height: 200px;
  .content {
    width: 100%;
    .title {
      :hover {
        cursor: ns-resize;
      }
      user-select: none;
      box-sizing: border-box;
      height: 47px;
      width: 100%;
      padding: 0 10px 0 20px;
      border-bottom: 1px solid #d6d8db;
      line-height: 47px;
      z-index: 10;
      // position: fixed;
      // bottom: 333px;
      background-color: #ffffff;
    }
    .tab-pages {
      // margin-top: 47px;
      z-index: 0;
      .page {
        padding: 0 20px;
        height: 430px;
        overflow: auto;
      }
    }
  }
}

.line {
  height: 100%;
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.tab-pane {
  padding: 0 20px;
}
</style>
