<template>
  <div class="tab">
    <div>
      <iframe class="container" <!-- src="https://www.baidu.com/" -->
        frameborder="0" ></iframe
      >
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
.tab {
  height: 100%;
  overflow: auto;
}
</style>
