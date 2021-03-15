<template>
  <div class="app" ref="rightContent">
    <div class="left" :style="{ position: 'fixed', top: `${lefBarTop}px` }">
      <div
        :class="{ 'left-line': true, 'left-line-selected': item.selected }"
        v-for="(item, idx) in doc.node"
        :key="idx"
        :tabindex="idx + 1"
        @focus="onItemNodeClick($event, -1, item)"
        @click="showDetailTray($event)"
      >
        <div class="hline line">
          <div class="logo">
            <i class="el-icon-link"></i>
          </div>
          <div class="text-nowrap node-info">
            <div class="text-nowrap item">
              {{ item.id }}
            </div>
            <div class="text-nowrap item">
              {{ item.time }}
            </div>
            <div class="text-nowrap item">View Changes</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-row" v-for="(item, idx) in doc.node" :key="idx">
        <div class="hline line">
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
              <i class="el-icon-download dowload"></i>
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
          return `item-build text-nowrap ongoing ${item.selected ? 'build-selected' : ''}`
        case 'Build Fail':
        case 'Scan Fail':
        case 'Test Fail':
          return `item-build text-nowrap failed ${item.selected ? 'build-selected' : ''}`
        case 'Finished':
          return `item-build text-nowrap passed ${item.selected ? 'build-selected' : ''}`
        default:
          return `item-build text-nowrap none ${item.selected ? 'build-selected' : ''}`
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

.left {
  .left-line {
    box-sizing: border-box;
    width: 215px;
    height: 51px;
    line-height: 51px;
    padding: 0;
    margin: 0 0 4px 0;
    background-color: #303030;
  }
  .logo {
    height: 98%;
    width: 20px;
    background-color: #5f6368;
    i {
      color: #afb1b3;
    }
    // margin: 3px 0px 3px 0px;
  }
  .node-info {
    font-size: 12px;
    color: #c6cdd8;
    padding-left: 5px;
    // margin: 3px 3px 3px 0;
    width: 100%;
    .item {
      height: 33%;
      line-height: 12px;
      margin: 3px;
    }
  }
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
    .dowload {
      color: #ffffff;
      margin-top: 30px;
      margin-left: 55px;
    }
  }
}

.line {
  height: 100%;
  width: 100%;
  justify-content: flex-start;
}

.column {
  width: 100%;
  height: 100%;
  align-items: flex-start;
  align-content: flex-start;
}

.passed {
  background-color: #55c991;
}

.ongoing {
  background-color: #e2b571;
  color: #5c5d5f;
}

.failed {
  background-color: #c71717;
  color: #fff;
}

.none {
  background-color: #aeaaaa;
}

.left-line-selected {
  border: 3.3px solid rgb(7, 77, 117);
}

.build-selected {
  border: 3px solid rgb(7, 77, 117);
}
</style>
