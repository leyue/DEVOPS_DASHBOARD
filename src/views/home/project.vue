<template>
  <div class="home-project">
    <div></div>
    <div class="box">
      <el-progress
        color="#2a2a2acc"
        :text-inside="true"
        :show-text="false"
        :stroke-width="5"
        :percentage="percentage"
        status="success"
      ></el-progress>
      <div class="controll-bar">
        <span style="font-size: 18px; font-weight: 600; color: #2a2a2acc; margin-right: 10px">
          项目统计
        </span>
        <div style="flex: 2"></div>
        <!-- <product-picker class="content"></product-picker> -->
        <el-popover placement="left-start" :offset="300" trigger="hover" content="...">
          <product-picker class="content"></product-picker>
          <el-button
            slot="reference"
            size="mini"
            type="info"
            circle
            icon="el-icon-more"
            @click="onProductSelectClick"
          ></el-button>
        </el-popover>
      </div>
      <div class="chart">
        <div ref="chart" :style="{ width: '100%', height: '100%' }">
          <div style="text-align: center; line-height: 400px">等待数据加载...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import * as echarts from 'echarts'
import { Message } from 'element-ui'
import productPicker from './product.picker.vue'

interface IData {
  chart: any
}

export default Vue.extend({
  name: '',
  components: { productPicker },
  data(): IData {
    return {
      chart: null,
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapState('homeProduct', {
      path: (state: any) => {
        return state.path
      },
      total: (state: any) => {
        return state.total
      },
      progress: (state: any) => {
        return state.progress
      },
      percentage: (state: any) => {
        return (state.progress * 100) / state.total
      },
    }),
    ...mapGetters({ doc: 'homeProduct/doc' }),
  },
  watch: {
    doc(newV, oldV) {
      if (!this.chart) {
        return
      }
      this.drawLinebar()
    },
  },
  filters: {},
  methods: {
    onProductSelectClick() {},
    drawLinebar() {
      let yDatas: any = []
      let sTestCountDatas: any = []
      let sTestTimeDatas: any = []
      let sCaseCountDatas: any = []
      let sRunTestDatas: any = []

      this.doc.forEach((item: any) => {
        yDatas.push(item.test_project)
        sTestCountDatas.push(item.testNumber)
        sTestTimeDatas.push(item.testTimes)
        sCaseCountDatas.push(item.testCaseNumver)
        sRunTestDatas.push(item.runningTestNumber)
      })

      let opts = {
        baseOption: {
          timeline: {
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 5000,
            controlStyle: {
              position: 'left',
            },
            data: [
              '总测试样本数',
              '测试时长',
              { value: '总样本数', symbol: 'diamond', symbolSize: 16 },
              '当前任务数',
            ],
            label: {
              formatter: (s: any) => {
                return s
              },
            },
          },
          title: {
            // subtext: '数据来自云测',
            textStyle: {
              fontSize: 15,
            },
            left: -2,
            top: 2,
            // bottom: 0,
          },
          tooltip: {
            extraCssText: 'z-index: 10',
          },
          visualMap: {
            orient: 'vertical',
            right: 30,
            text: ['H', 'L'],
            dimension: 0,
            itemWidth: 5,
            itemHeight: 60,
            inRange: {
              color: ['#7f99cc', '#1b4fb6'],
            },
          },
          calculable: true,
          padding: [0, 0, 0, 0],
          grid: {
            top: 25,
            bottom: 70,
            x: 200,
            x2: 100,
            y: 0,
            y2: 0,
            containLabel: false,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: function (params: any) {
                    return params.value.replace('\n', '')
                  },
                },
              },
            },
          },
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}',
              },
            },
          ],
          yAxis: [
            {
              type: 'category',
              axisLabel: { interval: 0 },
              data: yDatas,
              splitLine: { show: false },
            },
          ],
        },
        options: [
          {
            title: { text: '总测试样本数(个)' },
            series: [
              {
                name: '总测试样本数',
                type: 'bar',
                data: sTestCountDatas,
                label: {
                  show: true,
                  position: 'right',
                  margin: 10,
                },
              },
            ],
          },
          {
            title: { text: '测试时长(H)' },
            series: [
              {
                name: '测试时长',
                type: 'bar',
                data: sTestTimeDatas,
              },
            ],
          },
          {
            title: { text: '总样本数(个)' },
            series: [
              {
                name: '资源总数',
                type: 'bar',
                data: sCaseCountDatas,
              },
            ],
          },
          {
            title: { text: '当前任务数(个)' },
            series: [
              {
                name: '当前任务数',
                type: 'bar',
                data: sRunTestDatas,
              },
            ],
          },
        ],
      }
      this.chart.setOption(opts)
      // window.onresize = this.chart.resize
      window.addEventListener(
        'resize',
        () => {
          this.chart.resize()
        },
        false
      )
    },
  },
  async created() {},
  activated() {
    this.chart.resize()
  },
  async mounted() {
    await this.$store.dispatch('homeProduct/loadProducts')
    this.chart = echarts.init(this.$refs.chart as HTMLElement)
    this.drawLinebar()
  },
})
</script>

<style lang="less" scoped>
.home-project {
  box-sizing: border-box;
  margin: 0 0px 0 0px;
  padding: 0 0 0 0px;
  width: 100%;
  height: 400px;
}
.box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .chart {
    width: 100%;
    height: 85%;
    padding: 0px 15px 0 15px;
    font-weight: 200;
    z-index: 0;
    canvas {
      top: 0px !important;
      z-index: 0 !important;
    }
  }
}
.controll-bar {
  box-sizing: border-box;
  padding: 10px 10px 0 18px;
  width: 100%;
  z-index: 100;
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

<style lang="less">
.home-project {
  .el-progress-bar__outer {
    border-radius: 1px !important;
    background-color: #fff;
  }
  .el-progress-bar__inner {
    border-radius: 1px !important;
  }
  .el-popover {
    top: 55px !important;
    &.el-popper {
      top: 55px !important;
    }
  }
  canvas {
    top: 0px !important;
  }
}
</style>
