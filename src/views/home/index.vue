<template>
  <div class="app">
    <div class="header">云测主页</div>
    <div class="content">
      <div
        class="line"
        :style="{
          'margin-bottom': '10px',
          height: '400px',
        }"
      >
        <com-summary></com-summary>
        <div style="width: 10px"></div>
        <com-team style="flex: 2"></com-team>
      </div>
      <div style="height: 400px">
        <com-project></com-project>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import comSummary from './summary.vue'
import comProject from './project.vue'
import comTeam from './team.vue'

export default Vue.extend({
  name: 'home',
  components: { comSummary, comTeam, comProject },
  data() {
    return {
      height: 500,
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {},
  async mounted() {
    // vue 如果子组件使用了 window.onresize 父组件window.onresize会不生效
    window.addEventListener('resize', () => {}, false)
  },
})
</script>

<style lang="less" scoped>
.app {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px 0 0px 0;
}
.header {
  width: 100%;
  height: 50px;
  background-color: #2a2a2acc;
  color: #fefefe;
  line-height: 50px;
  padding-left: 15px;
  font-size: 20px;
  position: fixed;
  top: 0px;
  z-index: 100;
}
.content {
  margin: 65px 56px 0px 15px;
}
.line {
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}
</style>
