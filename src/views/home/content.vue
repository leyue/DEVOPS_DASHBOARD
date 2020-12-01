<template>
  <div class="app">
    <div class="logo">
      <div style="font-size: 130px;font-weight: 100;">@</div>
      <div style="margin-top: 10px; font-weight: bold; font-size: 25px;">
        SPRD.lABORATORY
      </div>
      <div style="margin-top: 5px;">CI</div>
    </div>
    <div class="float-controll-bar">
      <div style="font-size: 28px; text-align: left;">
        梦幻实验室
      </div>
      <div style="text-align: left; width: 70%;">
        虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进，它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎。
      </div>
      px
      <div
        class="button"
        style="width: 200px; height: 40px;  line-height: 40px; "
      >
        了解详情
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
  color: #fefefe;
  text-align: center;

  font-size: 14px;
  width: 100%;
  position: fixed;
  top: 52px;
  bottom: 0px;
  background-color: #6666;
  z-index: 0;
  .logo {
    margin-top: 30px;
  }
  .float-controll-bar {
    position: fixed;
    left: 50px;
    bottom: 200px;
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
