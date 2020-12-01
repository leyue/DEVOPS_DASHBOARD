<template>
  <div class="app" :style="{ 'margin-top': `${top}px` }">
    <div class="line">
      <img
        style="margin-left: 15px;width: 120px; height: 100%; -webkit-font-smoothing: antialiased;"
        src="@/assets/icon/紫光展锐-反白.png"
        alt=""
      />
      <div style="flex: 2;"></div>
      <div
        class="button"
        style="width: 100px; height: 100%; line-height: 52px;"
        @click="onJumpDevops"
      >
        进入主页
      </div>
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
    ...mapState('video', {
      show: (state: any) => {
        return state.show
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
    onJumpDevops() {
      this.$router.push('/ci')
    },
  },
  async mounted() {},
})
</script>

<style lang="less" scoped>
.app {
  width: 100%;
  height: 52px;
  background-color: #2a2a2acc;
  color: #fefefe;
  text-align: center;
  font-size: 14px;
  transition: margin-top 0.5s cubic-bezier(0.42, 0, 0.58, 1) 0s;
}
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

.button {
  background-color: #0aaff1;
  border-radius: 1px;
  &:hover {
    background-color: #008dc5;
  }
}
</style>
