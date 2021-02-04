<template>
  <div class="tab">
    <div>
      <el-timeline>
        <el-timeline-item v-for="(item, idx) in doc" :timestamp="item.time" placement="top">
          <el-card>
            <h4>{{ item.name }}</h4>
            <p>{{ item.status }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  name: '',
  components: {},
  data() {
    return {
      ctx: null,
      doc: [
        {
          name: '编译等待1',
          status: 'finished',
          time: moment().format('YYYY.MM.DD-HH:mm:ss'),
        },
        {
          name: '编译等待2',
          status: 'finished',
          time: moment().format('YYYY.MM.DD-HH:mm:ss'),
        },
        {
          name: '编译等待3',
          status: 'finished',
          time: moment().format('YYYY.MM.DD-HH:mm:ss'),
        },
        {
          name: '编译等待4',
          status: 'finished',
          time: moment().format('YYYY.MM.DD-HH:mm:ss'),
        },
      ],
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {},
  async mounted() {
    console.log(this.doc)
  },
})
</script>

<style lang="less" scoped>
.tab {
  width: 100%;
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
  flex-wrap: wrap;
}
</style>
