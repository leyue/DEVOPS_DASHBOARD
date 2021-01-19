<template>
  <div class="home-project">
    <div class="box">
      <div ref="chart" :style="{ width: '100%', height: '100%' }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import * as echarts from 'echarts'

interface IData {
  chart: any
  opts: echarts.EChartsOption
}

export default Vue.extend({
  name: '',
  components: {},
  data(): IData {
    return {
      chart: null,
      opts: {
        title: {
          text: '项目统计',
          subtext: '纯属虚构',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['SC9832', 'ROC5G'],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
            ],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'SC9832',
            type: 'bar',
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
            ],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          {
            name: 'ROC5G',
            type: 'bar',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3,
            ],
            markPoint: {
              data: [
                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
        ],
      },
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {},
  async mounted() {
    this.chart = echarts.init(this.$refs.chart as HTMLElement)
    //@ts-ignore
    this.chart.setOption(this.opts)
  },
})
</script>

<style lang="less" scoped>
.home-project {
  box-sizing: border-box;
  margin: 0 0 0 0px;
  padding: 0 0 0 10px;
  width: 60%;
  .box {
    box-sizing: border-box;
    width: 100%;
    height: 400px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 20px 15px 0 15px;
  }
}
</style>
