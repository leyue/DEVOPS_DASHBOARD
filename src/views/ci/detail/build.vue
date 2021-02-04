<template>
  <div class="tab">
    <div>
      <el-collapse v-model="actives">
        <el-collapse-item title="Build Job Info" name="1">
          <div class="line">
            <p style="width: 153px">Build ID:</p>
            <el-link type="info">1452178</el-link>
          </div>
          <div class="line">
            <p style="width: 153px">Build State:</p>
            完成
          </div>
          <div class="line">
            <p style="width: 153px">Branch:</p>
            sprdroidr_trunk
          </div>
          <div class="line">
            <p style="width: 153px">Build Time:</p>
            2020.11.17-20:30:30 --- 2020.11.18-20:30:30
          </div>
        </el-collapse-item>
        <el-collapse-item title="Build Project Info" name="2">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Board" width="180"> </el-table-column>
            <el-table-column prop="name" label="工程名" width="180"> </el-table-column>
            <el-table-column prop="address" label="状态"> </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
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
      actives: ['1', '2'],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  computed: {
    ...mapState('branch', {
      branch: (state: any) => {
        return state.current
      },
    }),
    ...mapState('node', {
      idx: (state: any) => {
        return state.idx
      },
      item: (state: any) => {
        return state.item
      },
    }),
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
.tab {
  height: 100%;
  overflow: auto;
}
.line {
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
</style>
