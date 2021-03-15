<template>
  <div class="splash-header" :style="{ 'margin-top': `${top}px` }">
    <div class="hline line">
      <img class="logo" src="@/assets/icon/紫光展锐-反白.png" alt="" />
      <div style="flex: 2"></div>
      <div class="button jump-home" @click="onJumpHome">进入主页</div>
    </div>
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
      top: -52,
    }
  },
  computed: {
    ...mapState({
      show: (state: any) => {
        return state.video.control
      },
    }),
  },
  watch: {
    show(newV, oldV) {
      this.top = newV ? 0 : -52
    },
  },
  filters: {},
  methods: {
    onJumpHome() {
      let homePage = localStorage.getItem('setting-home-page') || '/home'
      this.$router.push(homePage)
    },
  },
  async mounted() {},
})
</script>

<style lang="less" scoped>
// @import '~@/glob/index.less';

.splash-header {
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  background-color: @lightBlack;
  color: #fefefe;
  text-align: center;
  transition: margin-top 0.5s cubic-bezier(0.42, 0, 0.58, 1) 0s;
}
.line {
  width: 100%;
  height: 100%;
  line-height: 61px;
  justify-content: flex-start;
  .logo {
    margin-left: 15px;
    width: 120px;
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }
  .jump-home {
    width: 100px;
    height: 100%;
    line-height: 52px;
  }
}

.button {
  background-color: #0aaff1;
  border-radius: 1px;
  &:hover {
    background-color: #008dc5;
  }
}
</style>
