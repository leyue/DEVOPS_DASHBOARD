<template>
  <div class="app">
    <div class="content line">
      <div class="left"></div>
      <div class="right">
        <div>
          <div
            class="item-product"
            :style="item | getItemProductWidth"
            v-for="(item, idx) in doc.product"
            :key="idx"
          >
            {{ item.name }}
          </div>
        </div>
        <div>
          <div v-for="(item, idx) in doc.product" :key="idx" style="display: inline">
            <div class="item-user" v-for="(subItem, subIdx) in item.user" :key="subIdx">
              {{ subItem }}
            </div>
          </div>
        </div>
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
    ...mapState('product', {
      doc: (state: any) => {
        return state.doc
      },
    }),
  },
  filters: {
    getItemProductWidth(item: any) {
      let width = 85 * item.weight + (item.weight - 1) * 4
      return `width: ${width}px`
    },
  },
  methods: {},
  async mounted() {
    //
  },
})
</script>

<style lang="less" scoped>
.app {
  box-sizing: border-box;
  height: 75px;
  width: 100%;
  background-color: #c6e2e6;
  .content {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    .left {
      box-sizing: border-box;
      display: inline-block;
      width: 215px;
      height: 100%;
      // background-color: #6ec0d4;
      flex-shrink: 0;
    }
    .right {
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      background-color: #c6e2e6;
      flex-shrink: 0;
      padding-bottom: 5px;
      font-size: 12px;
      .item-product {
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        margin: 2px;
        width: 85px;
        display: inline-block;
        background-color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
      }
      .item-user {
        box-sizing: border-box;
        height: 33px;
        line-height: 33px;
        margin: 2px;
        width: 85px;
        display: inline-block;
        background-color: #57bb8a;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
      }
    }
  }
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

.passed {
  background-color: #57bb8a;
}

.failed {
  background-color: #d13232;
}
</style>
