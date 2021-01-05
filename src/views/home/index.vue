<template>
  <div class="app">
    <div class="header">云测主页</div>
    <div class="content">
      <com-summary></com-summary>
      <div class="line" style="margin-top: 10px;">
        <com-team></com-team>
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
  name: '',
  components: { comSummary, comTeam, comProject },
  data() {
    return {}
  },
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
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
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
}
.content {
  margin: 65px 56px 0 15px;
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
