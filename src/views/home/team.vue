<template>
  <div class="home-team">
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
      <div class="float-controll-bar">
        <span
          style="font-size: 18px; font-weight: 600; color: #2a2a2acc; margin-right: 10px;"
        >
          团队统计
        </span>
        <el-link
          style="font-size: 16px; padding-top: 0px; font-weight: 600; color: #2a2a2acc"
          type="info"
          v-for="(item, idx) in paths"
          @click="onPathClick($event, item)"
        >
          {{ formatPath(item, idx, paths) }}
        </el-link>
        <div style="flex: 2"></div>
        <div style="font-size: 12px;">点击矩形柱查看三级部门统计信息</div>
      </div>
      <div class="chart">
        <div ref="chart" :style="{ width: '100%', height: '100%' }">
          <div style="text-align: center; line-height: 400px;">
            等待数据加载...
          </div>
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

interface IData {
  chart: any
}

export default Vue.extend({
  name: '',
  components: {},
  data(): IData {
    return {
      chart: null,
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapState('team', {
      path: (state: any) => {
        return state.path
      },
      paths: (state: any) => {
        let lst: Array<string> = state.path
          .split('/')
          .filter((item: string) => {
            return item != ''
          })
        return lst
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
      doc: (state: any) => {
        return state.doc
      },
    }),
    // ...mapGetters({ doc: 'team/doc' }),
  },
  filters: {},
  methods: {
    formatPath(item: string, idx: number, paths: Array<string>) {
      switch (idx) {
        case 0:
          return paths.length > 1 ? `${item}>` : item
        case 1:
          return `${item}`
      }
    },
    drawLinebar() {
      let that = this
      let yDatas: any = []
      let sProductDatas: any = []
      let sCaseDatas: any = []
      let sDutDatas: any = []
      let sRunTestDatas: any = []
      let sTestTimeDatas: any = []
      this.doc.forEach((item: any) => {
        yDatas.push(item.name)
        sProductDatas.push(item.projectsNumber)
        sCaseDatas.push(item.casesNumver)
        sDutDatas.push(item.dutNumber)
        sRunTestDatas.push(item.runTestNumbers)
        sTestTimeDatas.push(item.testTimes)
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
            // controlStyle: {
            //     position: 'left'
            // },
            data: [
              '项目总数',
              'case总数',
              '资源总数',
              { value: '测试数量', symbol: 'diamond', symbolSize: 16 },
              '测试时长',
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
            extraCssText: 'z-index: 0',
          },
          visualMap: {
            orient: 'vertical',
            right: 0,
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
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: function(params: any) {
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
            title: { text: '项目总数(个)' },
            series: [
              {
                name: '项目总数',
                type: 'bar',
                data: sProductDatas,
                label: {
                  show: true,
                  position: 'right',
                  margin: 10,
                },
              },
            ],
          },
          {
            title: { text: 'case总数(个)' },
            series: [
              {
                name: 'case总数',
                type: 'bar',
                data: sCaseDatas,
              },
            ],
          },
          {
            title: { text: '资源总数(台)' },
            series: [
              {
                name: '资源总数',
                type: 'bar',
                data: sDutDatas,
              },
            ],
          },
          {
            title: { text: '测试数量(个)' },
            series: [
              {
                name: '测试数量',
                type: 'bar',
                data: sRunTestDatas,
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
    async onPathClick(event: MouseEvent, item: any) {
      console.log(item)
      if (item != 'UNISOC' || this.total != this.progress) {
        return
      }
      await this.$store.dispatch('team/jumpToPath', { path: '/UNISOC' })
      this.drawLinebar()
    },
  },
  async created() {},
  async mounted() {
    await this.$store.dispatch('team/jumpToPath', { path: '/UNISOC' })
    let that = this
    this.chart = echarts.init(this.$refs.chart as HTMLElement)
    this.chart.on('click', async (item: any) => {
      console.log(item)
      if (that.total != that.progress || !item.seriesId) {
        return
      }
      if (that.paths.length >= 2) {
        Message({
          message: '最小支持到三级部门',
          type: 'warning',
          duration: 3 * 1000,
        })
        return
      }
      await that.$store.dispatch('team/jumpToPath', {
        path: `${that.path}/${item.name}`,
      })
      that.drawLinebar()
    })
    this.drawLinebar()
  },
})
</script>

<style lang="less" scoped>
.home-team {
  box-sizing: border-box;
  margin: 0 0 0 0px;
  padding: 0 0 0 0px;
  height: 100%;
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
    padding: 0px 15px 0px 15px;
    font-weight: 200;
    z-index: 0;
    canvas {
      top: -5px !important;
      z-index: 0 !important;
    }
  }
}
.float-controll-bar {
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
.home-team {
  .el-progress-bar__outer {
    border-radius: 1px !important;
  }
  .el-progress-bar__inner {
    border-radius: 1px !important;
  }
}
</style>
