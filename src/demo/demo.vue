<template>
  <div class="home">
    <el-button type="primary" @click="onDemo">加载中</el-button>
    <div :class="status | demo"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Home',
  components: {},
  data() {
    return {
      status: 'demo',
    }
  },
  computed: {
    splash: {
      get() {
        let enabelSplash = localStorage.getItem('setting-enable-splash')
        return enabelSplash == null ? true : enabelSplash
      },
      set(val: boolean) {
        debugger
        localStorage.setItem('setting-enable-splash', `${val}`)
      },
    },
  },
  filters: {
    demo(status: string) {
      return status
    },
  },
  methods: {
    async onDemo() {
      await this.$store.dispatch('demo')
    },
  },
  async mounted() {
    await this.$func.mSleep(1000)

    console.log(1)

    let moment = require('moment')

    let time = moment().format('YYYY MMMM Do, h:mm:ss a')
    console.log(time)

    let mo = moment.duration(8.128215, 'seconds')

    console.log(`${mo.minutes()}-${mo.seconds()}`)

    console.log([1, 2, 3].length)
  },
})
</script>

<style lang="less" scoped>
.line {
  width: 100%;
  height: 100%;
  line-height: 61px;
  display: inline-flex;
  flex-direction: row;
  // 主轴对其方式
  justify-content: flex-start;
  // 交叉轴对其方式
  align-items: center;
  // 多根轴线对其方式
  align-content: center;
}
.item {
  // 元素不被flex压缩
  flex-shrink: 0;
}

.el-menu {
  border: 0px;
  &:hover {
    background-color: #ff0;
  }
}
.el-menu-item {
  &:hover {
    background-color: #ff0;
  }
  &:focus {
    background-color: #ff0;
  }
}
</style>
