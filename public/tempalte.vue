<template>
  <div class="app">
    <el-button type="primary" @click="onDemo">加载中</el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "",
  components: {},
  computed: {
    ...mapState("user", {}),
    ...mapGetters("user", ["routes"])
  },
  filters: {},
  methods: {},
  async mounted() {
    //
  }
});
</script>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>
