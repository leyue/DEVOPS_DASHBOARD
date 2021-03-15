<template>
  <div class="app">
    <div class="content">
      <div class="hline line">
        <i class="el-icon-s-unfold"></i>
        <p class="tile">Devops CI</p>
        <div class="select">
          <el-autocomplete
            class="inline-input"
            v-model="v0"
            :fetch-suggestions="onFetchSuggestion"
            placeholder="Enter a branch name."
            @select="onBranchSelect"
          >
            <i class="el-icon-close el-input__icon" slot="suffix" @click="onBranchClear"> </i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </div>
        <el-checkbox>与我相关的</el-checkbox>
        <div>
          <el-tooltip class="item" effect="dark" content="Help" placement="bottom-end">
            <i class="el-icon-question help"></i>
          </el-tooltip>
        </div>
        <div class="login">登陆</div>
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
        return item.name.toLowerCase().indexOf(queryString.trim().toLowerCase()) >= 0
      })
      cb(results)
    },
    async onBranchSelect(val: any) {
      this.v0 = val.name
      await this.$store.commit('branch/setCurrent', this.$store.state.branch.current)
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
  justify-content: flex-start;
  .tile {
    margin-left: 20px;
    min-width: 90px;
    font-weight: bold;
    font-size: 18px;
  }
  .select {
    margin-left: 78px;
    flex: 2;
    min-width: 150px;
    .el-autocomplete {
      width: 100%;
    }
  }
  .el-checkbox {
    margin-left: 15px;
  }
  .help {
    margin-left: 55px;
  }
  .login {
    margin-left: 40px;
    color: #68a3f0;
    font-size: 16px;
  }
}
</style>
