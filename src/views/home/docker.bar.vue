<template>
  <div class="app line" :style="{ bottom: `${bottom}px` }">
    <div
      :class="{ scene: true, 'scene-selected': item.selected }"
      v-for="(item, idx) in scenes"
      :key="idx"
      @click="onSceneChanged(idx, item)"
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
      scenes: [
        { name: '实验室', selected: true },
        { name: '云测系统', selected: false },
        { name: '仪表自动化', selected: false },
        { name: '稳定性实验室', selected: false },
        { name: '场测介绍', selected: false },
      ],
      bottom: -80,
    }
  },
  computed: {
    ...mapState('video', {
      show: (state: any) => {
        return state.show
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
    onSceneChanged(idx: number, scene: any) {
      this.scenes.map((item) => {
        item.selected = false
      })
      scene.selected = true
      let domVideoBg: any = this.$parent.$refs.videoBg
      domVideoBg.changeScene(idx, scene.name)
    },
  },
  async mounted() {
    //
  },
})
</script>

<style lang="less" scoped>
.app {
  box-sizing: border-box;
  position: fixed;
  left: 100px;
  right: 100px;
  height: 80px;
  background-color: #150d0bbb;
  border-radius: 5px 5px 5px 5px;
  transition: bottom 0.5s cubic-bezier(0.42, 0, 0.58, 1) 0s;
}

.line {
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
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
