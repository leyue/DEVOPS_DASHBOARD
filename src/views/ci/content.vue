<template>
  <div class="app" ref="rightContent">
    <div :style="{ position: 'fixed', top: `${lefBarTop}px` }">
      <div
        :class="{ 'item-node': true, 'node-selected': item.selected }"
        v-for="(item, idx) in doc.node"
        :key="idx"
        :tabindex="idx + 1"
        @focus="onItemNodeClick($event, -1, item)"
        @click="showDetailTray($event)"
      >
        <div class="line">
          <div style="width: 20px; background-color: #5f6368">
            <i class="el-icon-link" style="color: #afb1b3"></i>
          </div>
          <div class="column node text" style="padding-left: 5px; padding-top: 5px; width: 100%">
            <div class="text" style="height: 30%; width: 100%; line-height: 12px">
              {{ item.id }}
            </div>
            <div class="text" style="height: 30%; line-height: 12px">
              {{ item.time }}
            </div>
            <div class="text" style="height: 30%; line-height: 12px">View Changes</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-row" v-for="(item, idx) in doc.node" :key="idx">
        <div class="line">
          <div
            :class="subItem | getItemBuildClass"
            v-for="(subItem, subIdx) in item.products"
            :key="subIdx"
            :tabindex="(idx + 1) * 100 + (subIdx + 1)"
            @focus="onItemBuildClick($event, subIdx, item)"
            @click="showDetailTray($event)"
          >
            {{ subItem.status == 'Finished' || subItem.status == 'NA' ? '' : subItem.status }}
            <div v-if="subItem.status == 'Finished'">
              <i
                style="color: #ffffff; margin-top: 30px; margin-left: 55px"
                class="el-icon-download"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div v-show="detailTray" :style="{ height: `${detailTrayHeight + 20}px` }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
const left_offset = 136

export default Vue.extend({
  name: '',
  components: {},
  computed: {
    ...mapState('node', {
      doc: (state: any) => {
        return state.doc
      },
    }),
  },
  data() {
    return {
      lefBarTop: left_offset,
      detailTrayHeight: 400,
      detailTray: false,
    }
  },
  filters: {
    getItemBuildClass(item: any) {
      // 'status|1': ['success', 'popped', 'building', 'syncing', 'none'],
      switch (item.status) {
        case 'Build Waiting':
        case 'Build Syncing':
        case 'Building':
        case 'Test Waiting':
        case 'Test Syncing':
        case 'Testing':
          return `item-build text ongoing ${item.selected ? 'build-selected' : ''}`
        case 'Build Fail':
        case 'Scan Fail':
        case 'Test Fail':
          return `item-build text failed ${item.selected ? 'build-selected' : ''}`
        case 'Finished':
          return `item-build text passed ${item.selected ? 'build-selected' : ''}`
        default:
          return `item-build text none ${item.selected ? 'build-selected' : ''}`
      }
    },
  },
  methods: {
    async onItemNodeClick(ev: FocusEvent, idx: number, item: any) {
      this.$store.commit('node/setCurrentItem', { idx, item })
      this.$store.commit('node/clearAllSelected')
      item.selected = true
      for (let product of item.products) {
        product.selected = true
      }
    },
    async onItemBuildClick(ev: FocusEvent, idx: number, item: any) {
      this.$store.commit('node/setCurrentItem', { idx, item })
      this.$store.commit('node/clearAllSelected')
      item.products[idx].selected = true
    },
    async showDetailTray(ev: MouseEvent) {
      this.detailTray = true
      let offset = ev.clientY - window.innerHeight + this.detailTrayHeight
      let scrollLeft = document.documentElement.scrollLeft
      let scrollTop = document.documentElement.scrollTop
      // console.log({ offset, scrollLeft, scrollTop })
      window.scrollTo(scrollLeft, scrollTop)
      //@ts-ignore
      this.$parent.$refs.detailTray.show = true
      await this.$func.mSleep(30)

      let distance = offset > 0 ? offset + 51 : 0
      for (let i = 0; i < 10; i++) {
        scrollTop += distance / 10
        window.scrollTo(scrollLeft, scrollTop)
        await this.$func.mSleep(30)
      }
    },
  },
  async mounted() {
    //
    // setInterval(async () => {
    //   let branch = this.$store.state.branch.current
    //   await this.$store.dispatch('node/getDoc', branch)
    // }, 113000)
    window.addEventListener('scroll', (e: any) => {
      let scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop
      this.lefBarTop = left_offset - scrollTop
      // console.log(`${this.lefBarTop * 75} -- ${scrollTop}`)
    })
  },
})
</script>0

<style lang="less" scoped>
.app {
  box-sizing: border-box;
  width: 100%;
}

.item-node {
  box-sizing: border-box;
  width: 215px;
  height: 51px;
  line-height: 51px;
  padding: 0;
  margin: 0 0 4px 0;
  background-color: #303030;
}

.right {
  box-sizing: border-box;
  margin-top: 61px;
  margin-left: 215px;
  .right-row {
    height: 51px;
    // line-height: 51px;
    padding: 0px;
    margin: 0 0 4px 0;
    .item-build {
      box-sizing: border-box;
      width: 85px;
      height: 51px;
      line-height: 51px;
      padding: 0 5px;
      margin: 0 0 0 4px;
      text-align: center;
      font-size: 13px;
      flex-shrink: 0;
    }
  }
}

.line {
  height: 100%;
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.column {
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
}

.node {
  font-size: 12px;
  color: #c6cdd8;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.passed {
  background-color: #57bb8a;
}

.ongoing {
  background-color: #f5af80;
  color: #72757a;
}

.failed {
  background-color: #c00000;
  color: #e1e3e5;
}

.none {
  background-color: #aeaaaa;
}

.node-selected {
  background-color: rgb(7, 77, 117);
}

.build-selected {
  border: 3.5px solid rgb(7, 77, 117);
}
</style>
