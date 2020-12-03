<template>
  <div class="right-controll-bar column" v-show="showRightControllBar">
    <el-popover
      placement="left"
      width="0"
      trigger="hover"
      content="点击进入视频主页"
    >
      <i slot="reference" class="el-icon-picture item"></i>
    </el-popover>
    <el-popover
      placement="left"
      width="0"
      trigger="hover"
      content="点击进入云测主页"
    >
      <i slot="reference" class="el-icon-s-home item"></i>
    </el-popover>
    <el-popover
      placement="left"
      width="0"
      trigger="hover"
      content="点击进入全球场测展示"
    >
      <i slot="reference" class="el-icon-picture-outline-round item"></i>
    </el-popover>
    <el-popover
      placement="left"
      width="0"
      trigger="hover"
      content="点击进入云测仪表盘"
    >
      <i slot="reference" class="el-icon-s-help item"></i>
    </el-popover>
    <div style="flex: 2"></div>
    <el-popover
      placement="left"
      width="250"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <div class="content">
        <div class="line">
          <div
            style="width: 100px; flex-shrink: 0; color: #0aaff1; font-size: 16px;"
          >
            显示引导页:
          </div>
          <el-switch size="mini" width="50" v-model="splash"> </el-switch>
        </div>
        <div class="line" style="margin-top: 20px;">
          <div
            style="width: 100px; flex-shrink: 0; color: #0aaff1; font-size: 16px;"
          >
            引导页跳转:
          </div>
          <div>
            <el-radio
              style="margin-bottom: 5px; margin-top: 0px;"
              v-model="homePage"
              label="1"
              >云测主页</el-radio
            >
            <el-radio
              style="margin-bottom: 5px; margin-top: 10px;"
              v-model="homePage"
              label="2"
              >全球场测</el-radio
            >
            <el-radio
              style="margin-bottom: 5px; margin-top: 10px;"
              v-model="homePage"
              label="3"
              >云测仪表盘</el-radio
            >
          </div>
        </div>
      </div>
      <i slot="reference" class="el-icon-setting item"></i>
    </el-popover>
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
      splash: true,
      homePage: '1',
    }
  },
  computed: {
    ...mapState({
      showRightControllBar: (state: any) => {
        return state.rightControllBar
      },
    }),
  },
  filters: {},
  methods: {},
  async mounted() {},
})
</script>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: #000;
  box-sizing: border-box;
}

.right-controll-bar {
  position: absolute;
  right: 10px;
  top: 200px;
  width: 70px;
  height: 400px;
}

.column {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.item {
  width: 50px;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 30px;
  margin: 13px 0 0 0;
  background-color: #fff;
  font-size: 23px;
  text-align: center;
  line-height: 50px;
  &:hover {
    background-color: #0aaff1;
    color: #fff;
  }
}

.content {
  padding: 0;
}

.line {
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  margin: 0;
}
</style>
