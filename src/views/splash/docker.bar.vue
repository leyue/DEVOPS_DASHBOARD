<template>
  <div class="hline splash-docker" :style="{ bottom: `${bottom}px` }">
    <div
      :class="{ scene: true, 'scene-selected': item.selected }"
      v-for="(item, idx) in scenes"
      :key="idx"
      @click="onSceneChanged(idx)"
    >
      {{ item.name }}
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
      bottom: -80,
    }
  },
  computed: {
    ...mapState({
      show: (state: any) => {
        return state.video.control
      },
      scenes: (state: any) => {
        return state.video.scenes
      },
    }),
  },
  watch: {
    show(newV, oldV) {
      this.bottom = newV ? 30 : -80
    },
  },
  filters: {},
  methods: {
    onSceneChanged(idx: number) {
      this.$store.commit('video/playIdx', { idx })
    },
  },
  async mounted() {},
})
</script>

<style lang="less" scoped>
.splash-docker {
  box-sizing: border-box;
  position: fixed;
  left: 100px;
  right: 100px;
  height: 80px;
  background-color: #150d0bbb;
  border-radius: 5px 5px 5px 5px;
  transition: bottom 0.5s cubic-bezier(0.42, 0, 0.58, 1) 0s;
}

.scene {
  box-sizing: border-box;
  font-size: 16px;
  color: #fff;
  height: 100%;
  line-height: 80px;
  width: 15%;
  text-align: center;
  &:hover {
    border-bottom: 3px solid #0aaff1;
  }
}

.scene-selected {
  border-bottom: 3px solid #0aaff1;
}
</style>
