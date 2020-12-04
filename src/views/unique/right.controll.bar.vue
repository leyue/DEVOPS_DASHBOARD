<template>
  <div class="app column" v-show="showRightControllBar">
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
    <el-popover
      placement="left"
      width="250"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <div class="content">
        <div class="line">
          <div
            style="width: 100px; flex-shrink: 0; color: #0aaff1; font-size: 16px;"
          >
            显示引导页:
          </div>
          <el-switch
            size="mini"
            :width="50"
            v-model="splash"
            @change="onSplashChanged"
          >
          </el-switch>
        </div>
        <div class="line" style="margin-top: 30px;">
          <div
            style="width: 100px; flex-shrink: 0; color: #0aaff1; font-size: 16px;"
          >
            引导页跳转:
          </div>
          <div>
            <el-radio-group v-model="homePage" @change="onHomePageChanged">
              <el-radio style="" label="/home">云测主页</el-radio>
              <el-radio style="margin-top: 10px;" label="/global"
                >全球场测</el-radio
              >
              <el-radio style="margin-top: 10px;" label="/ci"
                >云测仪表盘</el-radio
              >
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
      splash: true,
      homePage: '/home',
      items: [
        {
          tip: '点击进入视频主页',
          icon: 'el-icon-picture',
          enable: true,
          selected: false,
          path: '/',
        },
        {
          tip: '点击进入云测主页',
          icon: 'el-icon-s-home',
          enable: true,
          selected: true,
          path: '/home',
        },
        {
          tip: '点击进入全球场测展示',
          icon: 'el-icon-picture-outline-round',
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
    ...mapState({
      showRightControllBar: (state: any) => {
        return state.rightControllBar
      },
    }),
  },
  watch: {
    '$route.path'(newV, oldV) {
      this.items.forEach((item) => {
        item.selected = item.path == newV
      })
    },
  },

  filters: {
    itemClass(doc: any) {
      return `${doc.icon} item ${doc.selected ? 'selected' : ''}`
    },
  },
  methods: {
    onJump(doc: any) {
      this.$router.push(doc.path)
    },
    onSplashChanged(val: boolean) {
      localStorage.setItem('setting-enable-splash', `${val}`)
    },
    onHomePageChanged(val: string) {
      localStorage.setItem('setting-home-page', val)
    },
  },
  async mounted() {
    this.splash =
      (localStorage.getItem('setting-enable-splash') || 'true') == 'true'
    this.homePage = localStorage.getItem('setting-home-page') || 'home'
  },
})
</script>

<style lang="less" scoped>
.app {
  position: fixed;
  right: 10px;
  top: 200px;
  height: 350px;
}

.column {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
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
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  margin: 0;
}
</style>
