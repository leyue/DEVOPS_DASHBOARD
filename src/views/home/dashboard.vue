<template>
  <div class="app">
    <div class="box">
      <div>
        <div class="item line">
          <el-button
            size="mini"
            style="width: 28px; background-color: #1b83c6; color: #fff;"
            circle
            >1
          </el-button>
          -项目总数
          <div style="flex: 2"></div>
          <p style="color: #1b83c6">78个</p>
        </div>
        <div class="item line">
          <el-button
            size="mini"
            style="width: 28px; background-color: #23c6c8; color: #fff;"
            circle
            >2
          </el-button>
          -用例总数
          <div style="flex: 2"></div>
          <p style="color: #23c6c8">242个</p>
        </div>
        <div class="item line">
          <el-button
            size="mini"
            style="width: 28px; background-color: #19b394; color: #fff;"
            circle
            >3
          </el-button>
          -测试总时长
          <div style="flex: 2"></div>
          <p style="color: #19b394">4137719H</p>
        </div>
        <div class="item line">
          <el-button
            size="mini"
            style="width: 28px; background-color: #67C23A; color: #fff;"
            circle
            >4
          </el-button>
          -测试总样本
          <div style="flex: 2"></div>
          <p style="color: #67C23A">42098个</p>
        </div>
        <div class="item line">
          <el-button
            size="mini"
            style="width: 28px; background-color: #f8ac59; color: #fff;"
            circle
            >5
          </el-button>
          -资源数
          <div style="flex: 2"></div>
          <p style="color: #f8ac59">手机: 163台 | 仪表: 47台</p>
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
  data() {
    return {}
  },
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
  box-sizing: border-box;
  color: #a9abab;
  font-size: 16px;
}
.box {
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 100%;
  padding: 15px;
}
.line {
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.item {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.11);
  padding: 0px 0px;
  p {
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
  }
}
</style>
