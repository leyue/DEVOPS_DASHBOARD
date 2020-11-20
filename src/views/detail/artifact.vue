<template>
  <div class="tab">
    <div>
      <el-button type="primary">编译</el-button>
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
  async mounted() {},
})
</script>

<style lang="less" scoped>
.tab {
  height: 100%;
  overflow: auto;
}
</style>
