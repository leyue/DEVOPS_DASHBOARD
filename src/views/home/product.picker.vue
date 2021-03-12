<template>
  <div class="home-product-picker">
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="selected"
      filterable
      :titles="['被测试过的项目', '最多同时查看10个项目']"
      :button-texts="[]"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      @change="onProductSelectedChanged"
      :data="products"
    >
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
    </el-transfer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default Vue.extend({
  name: '',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('user', {}),
    ...mapState('homeProduct', {
      products: (state: any) => {
        return state.products
      },
    }),
    ...mapGetters('user', ['routes']),
    selected: {
      get() {
        return this.$store.state.homeProduct.selected
      },
      async set(val: any) {
        if (val.length > 10) {
          Message({
            message: '最多同时查看10个项目',
            type: 'warning',
            duration: 3 * 1000,
            offset: 10,
          })
          return
        }
        await this.$store.commit('homeProduct/selected', val)
      },
    },
  },
  filters: {},
  methods: {
    onProductSelectedChanged(val: any) {
      // localStorage.setItem('home-product-picker-selected', JSON.stringify(val))
    },
  },
  async mounted() {},
})
</script>

<style lang="less" scoped>
.home-product-picker {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
</style>
<style lang="less">
.home-product-picker {
  .el-transfer-panel {
    width: 320px;
  }
  .el-transfer__buttons {
    padding: 0 10px;
  }
  .el-transfer__button {
    width: 30px;
    padding: 5px 0;
    text-align: center;
  }
  .el-input__inner {
    height: 28px;
    border-radius: 0px;
  }
  .el-transfer-panel__body {
    height: 350px;
  }
  .el-transfer-panel__list {
    height: 300px;
  }
}
</style>
