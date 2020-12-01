<template>
  <div class="app">
    <el-menu
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      @select="onVideoSelected"
      background-color="#1b140c99"
      text-color="#cccccc"
      active-text-color="#fff"
    >
      <el-menu-item index="1">主页视频</el-menu-item>
      <el-submenu index="2">
        <template slot="title">云测七个场景</template>
        <el-menu-item index="2-1">场景1</el-menu-item>
        <el-menu-item index="2-2">场景2</el-menu-item>
        <el-menu-item index="2-3">场景3</el-menu-item>
        <el-menu-item index="2-4">场景4</el-menu-item>
        <el-menu-item index="2-5">场景5</el-menu-item>
        <el-menu-item index="2-6">场景6</el-menu-item>
        <el-submenu index="2-7">
          <template slot="title">场景7</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>全球场测</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://nats-sh.unisoc.com/" target="_blank"
          >NATS</a
        ></el-menu-item
      >
    </el-menu>
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
  methods: {
    onVideoSelected() {},
  },
  async mounted() {
    //
  },
})
</script>

<style lang="less" scoped>
.app {
  position: fixed;
  bottom: 30px;
  left: 100px;
  right: 100px;
  height: 80px;
  // background-color: #1b140c99;
  border-radius: 5px 5px 5px 5px;
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
