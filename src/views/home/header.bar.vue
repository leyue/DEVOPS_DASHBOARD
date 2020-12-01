<template>
  <div class="app">
    <div class="line">
      <p style="margin-left: 15px;">@</p>
      <p style="margin-left: 15px; font-weight: bold; font-size: 17px; ">
        SPRD-lABORATORY
      </p>
      <div style="flex: 2;"></div>
      <div
        class="button"
        style="width: 100px; height: 100%; line-height: 52px; "
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
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {},
  async mounted() {
    //
  },
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
