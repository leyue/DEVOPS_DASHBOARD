<template>
  <div class="home-summary">
    <div class="box">
      <el-progress
        color="#2a2a2acc"
        :text-inside="true"
        :show-text="false"
        :stroke-width="5"
        :percentage="percentage"
        status="success"
      ></el-progress>
      <div class="content">
        <div style="font-size: 18px; font-weight: 600; color: #2a2a2acc; margin-bottom: 20px">
          信息汇总
        </div>
        <div class="item hline">
          <el-button size="mini" style="background-color: #1b83c6" circle>1 </el-button>
          -项目总数
          <div style="flex: 2"></div>
          <p style="color: #1b83c6">{{ projectCnt }}个</p>
        </div>
        <div class="item hline">
          <el-button size="mini" style="background-color: #23c6c8" circle>2 </el-button>
          -用例总数
          <div style="flex: 2"></div>
          <p style="color: #23c6c8">{{ caseCnt }}个</p>
        </div>
        <div class="item hline">
          <el-button size="mini" style="background-color: #19b394" circle>3 </el-button>
          -测试总时长
          <div style="flex: 2"></div>
          <p style="color: #19b394">{{ testTimeDuration }}H</p>
        </div>
        <div class="item hline">
          <el-button size="mini" style="background-color: #67c23a" circle>4 </el-button>
          -测试总样本
          <div style="flex: 2"></div>
          <p style="color: #67c23a">{{ testDutCnt }}个</p>
        </div>
        <div class="item hline">
          <el-button size="mini" style="background-color: #f8ac59" circle>5 </el-button>
          -资源数
          <div style="flex: 2"></div>
          <p style="color: #f8ac59">手机: {{ pcCnt }}台 | 仪表: {{ instrumentCnt }}台</p>
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
    return {
      percentage: 0,
      projectCnt: 0,
      caseCnt: 0,
      testTimeDuration: 0,
      testDutCnt: 0,
      pcCnt: 0,
      instrumentCnt: 0,
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {},

  async mounted() {
    this.percentage = 5
    let doc: any = {}
    doc = await this.$ax.ctx.get(
      `${this.$cfg.url.ucloud}/v1/thirdAccess/display/get–number-projects`
    )
    this.projectCnt = doc.data
    this.percentage = 10

    doc = await this.$ax.ctx.get(`${this.$cfg.url.ucloud}/v1/thirdAccess/display/get–number-cases`)
    this.caseCnt = doc.data
    this.percentage = 30

    doc = await this.$ax.ctx.get(`${this.$cfg.url.ucloud}/v1/thirdAccess/display/get–test-times`)
    this.testTimeDuration = doc.data
    this.percentage = 50

    doc = await this.$ax.ctx.get(`${this.$cfg.url.ucloud}/v1/thirdAccess/display/get–number-duts`)
    this.testDutCnt = doc.data
    this.percentage = 70

    doc = await this.$ax.ctx.get(
      `${this.$cfg.url.ucloud}/v1/thirdAccess/display/get–number-resources?resourceType=0`
    )
    this.pcCnt = doc.data
    this.percentage = 90

    doc = await this.$ax.ctx.get(
      `${this.$cfg.url.ucloud}/v1/thirdAccess/display/get–number-resources?resourceType=1`
    )
    this.instrumentCnt = doc.data
    this.percentage = 100
  },
})
</script>

<style lang="less" scoped>
.home-summary {
  box-sizing: border-box;
  color: #a9abab;
  font-size: 16px;
  // width: 350px;
  height: 320px;
  .box {
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 0px;
    width: 100%;
    height: 100%;
    .content {
      padding: 15px;
      .item {
        width: 100%;
        height: 100%;
        justify-content: flex-start;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.11);
        padding: 0px 0px;
        p {
          font-size: 18px;
          font-weight: bold;
          margin: 10px;
        }
        .el-button {
          width: 28px;
          color: #fff;
        }
      }
    }
  }
}
</style>

<style lang="less">
.home-summary {
  .el-progress-bar__outer {
    border-radius: 1px !important;
    background-color: #fff;
  }
  .el-progress-bar__inner {
    border-radius: 1px !important;
  }
}
</style>
