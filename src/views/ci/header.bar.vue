<template>
  <div class="app">
    <div class="content">
      <div class=" line">
        <i class="el-icon-s-unfold"></i>
        <p
          style="margin-left: 20px; min-width: 90px; font-weight: bold; font-size: 18px;"
        >
          Devops CI
        </p>
        <div style="margin-left: 75px; flex: 2; min-width: 150px; ">
          <el-autocomplete
            class="inline-input"
            style="width: 100%;"
            v-model="v0"
            :fetch-suggestions="onFetchSuggestion"
            placeholder="Enter a branch name."
            @select="onBranchSelect"
          >
            <i
              class="el-icon-close el-input__icon"
              slot="suffix"
              @click="onBranchClear"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </div>
        <el-checkbox style="margin-left: 15px;">与我相关的</el-checkbox>
        <div>
          <el-tooltip
            class="item"
            effect="dark"
            content="Help"
            placement="bottom-end"
          >
            <i class="el-icon-question" style="margin-left: 55px;"></i>
          </el-tooltip>
        </div>
        <i class="el-icon-s-opportunity" style="margin-left: 15px;"></i>
        <div style="margin-left: 40px; color: #68a3f0; font-size: 16px;">
          登陆
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'header-bar',
  components: {},
  data() {
    return {
      v0: '',
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapState('branch', {
      branch: (state: any) => {
        return state.current
      },
      doc: (state: any) => {
        return state.doc
      },
    }),
    ...mapGetters('user', ['routes']),
  },
  watch: {
    branch(newV, oldV) {
      this.v0 = newV
    },
  },
  methods: {
    onFetchSuggestion(queryString: string, cb: Function) {
      let restaurants: Array<any> = this.doc.row
      let results = restaurants.filter((item, idx, arry) => {
        return (
          item.name.toLowerCase().indexOf(queryString.trim().toLowerCase()) >= 0
        )
      })
      cb(results)
    },
    async onBranchSelect(val: any) {
      this.v0 = val.name
      await this.$store.commit(
        'branch/setCurrent',
        this.$store.state.branch.current
      )
      await this.$store.dispatch('product/getDoc', this.v0)
      await this.$store.dispatch('node/getDoc', this.v0)
    },
    onBranchClear() {
      this.v0 = ''
    },
  },
  async mounted() {
    //
  },
})
</script>

<style lang="less" scoped>
.app {
  background-color: #ffffff;
  height: 61px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .content {
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.line {
  width: 100%;
  height: 100%;
  line-height: 61px;
  display: inline-flex;
  flex-direction: row;
  // 主轴对其方式
  justify-content: flex-start;
  // 交叉轴对其方式
  align-items: center;
  // 多根轴线对其方式
  align-content: center;
}
</style>
