<template>
  <div class="app">template</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: '',
  components: {},
  data() {
    return {}
  },
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
.app {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
</style>
