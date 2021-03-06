<template>
  <div class="vline unique-right" v-show="show">
    <i v-if="false" slot="reference" @click="onDemoClick" class="el-icon-warning-outline item"></i>
    <el-popover
      v-for="(item, idx) in items"
      :key="idx"
      placement="left"
      width="0"
      trigger="hover"
      :content="item.tip"
    >
      <i slot="reference" :class="item | itemClass" @click="onJump(item)"></i>
    </el-popover>
    <div style="flex: 2"></div>
    <el-popover placement="left" width="250" trigger="hover" content="...">
      <div class="content">
        <div class="hline line">
          <div class="label">显示引导页:</div>
          <el-switch
            id="switch0"
            size="mini"
            :width="50"
            active-color="#0aaff1"
            v-model="splash"
            @change="onSplashChanged"
          >
          </el-switch>
        </div>
        <div class="hline line" style="margin-top: 30px">
          <div class="label">引导页跳转:</div>
          <div>
            <el-radio-group v-model="homePage" @change="onHomePageChanged">
              <el-radio style="" label="/home">云测主页</el-radio>
              <el-radio style="margin-top: 10px" label="/global">全球场测</el-radio>
              <el-radio style="margin-top: 10px" label="/ci">云测仪表盘</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <i slot="reference" class="el-icon-setting item"></i>
    </el-popover>
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
      show: false,
      splash: true,
      homePage: '/home',
      items: [
        {
          tip: '点击进入云测',
          icon: 'el-icon-cloudy',
          enable: true,
          selected: false,
          path: '*',
        },
        {
          tip: '点击进入视频展示',
          icon: 'el-icon-picture',
          enable: true,
          selected: false,
          path: '/',
        },
        {
          tip: '点击进入统计汇总',
          icon: 'el-icon-s-home',
          enable: true,
          selected: true,
          path: '/home',
        },
        {
          tip: '点击进入全球场测',
          icon: 'el-icon-location-outline',
          enable: true,
          selected: false,
          path: '/global',
        },
        {
          tip: '点击进入云测仪表盘',
          icon: 'el-icon-s-help',
          enable: true,
          selected: false,
          path: '/ci',
        },
      ],
    }
  },
  computed: {
    ...mapState({}),
  },
  watch: {
    '$route.path'(newV, oldV) {
      this.items.forEach((item) => {
        item.selected = item.path == newV
      })
      switch (newV) {
        case '/':
          this.show = false
          break
        default:
          this.show = true
          break
      }
    },
  },

  filters: {
    itemClass(doc: any) {
      return `${doc.icon} item ${doc.selected ? 'selected' : ''}`
    },
  },
  methods: {
    onJump(doc: any) {
      switch (doc.path) {
        case '*':
          window.open('https://ucloudcenter.unisoc.com/')
          break
        default:
          this.$router.push(doc.path)
          break
      }
    },
    onSplashChanged(val: boolean) {
      localStorage.setItem('setting-enable-splash', `${val}`)
    },
    onHomePageChanged(val: string) {
      localStorage.setItem('setting-home-page', val)
    },
    async onDemoClick() {
      let doc = await this.$ax.ctx.post(
        'http://127.0.0.1:8080/verify/mfservice/rest/verify/buildconfig',
        {
          token: '35ae82ffb63cdaa576308df98b79fc426ba096e0e958a5e46c689e3f7e25c50c',
          user: 'bm',
          name: 'sprdroid10_trunk_19c_widevine_dev',
        }
      )
    },
  },
  async mounted() {
    this.splash = (localStorage.getItem('setting-enable-splash') || 'true') == 'true'
    this.homePage = localStorage.getItem('setting-home-page') || 'home'

    // let dom: HTMLElement | any = document.getElementById('switch0')
    // dom.parentElement.childNodes[2].style['border-radius'] = '3px'
  },
})
</script>

<style lang="less" scoped>
.unique-right {
  box-sizing: border-box;
  position: fixed;
  right: 5px;
  top: 200px;
  height: 450px;
}

.item {
  width: 45px;
  height: 45px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 22px;
  margin: 13px 0 0 0;
  background-color: #fff;
  font-size: 23px;
  text-align: center;
  line-height: 45px;
  outline: 0;
  &:hover {
    background-color: #0aaff1;
    color: #fff;
  }
  &.selected {
    background-color: #0aaff1;
    color: #fff;
  }
}

.content {
  padding: 0;
}

.line {
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  .label {
    width: 100px;
    flex-shrink: 0;
    color: #0aaff1;
    font-size: 14px;
  }
}
</style>

<style lang="less">
.unique-right {
  .el-switch__core {
    border-radius: 0px;
  }
}
</style>
