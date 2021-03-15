<template>
  <div class="pm-distribution">
    <h3 class="title">项目分布</h3>
    <div class="container" id="container" :style="{ height: containerHeight }">
      <div class="left">
        <div class="top">
          <!--行政区域-->
          <div class="item fl">
            <el-select
              filterable
              clearable
              v-model="districtType"
              style="width: 140px; margin-left: 5px"
            >
              <el-option
                v-for="item in districtTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <!--项目类型-->
          <div class="item fl">
            <el-select filterable clearable v-model="buildType" style="width: 140px">
              <el-option
                v-for="item in buildTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="item fl" style="margin-left: 10px">
            <el-select filterable clearable v-model="buildId" style="width: 190px">
              <el-option
                v-for="item in buildOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </div>
          <!--查询-->
          <div class="item query-submit fl" @click="search">
            <i class="el-icon-search"></i> 查 询
          </div>
        </div>
        <div class="header">
          共{{ markers.length }}个项目<span style="float: right; margin-right: 15px">今日能耗</span>
        </div>
        <div class="list" :style="{ height: leftHeight }">
          <div class="list-context">
            <div ref="box" class="list-scroll bmr-y-scroll" :style="{ height: leftHeight }">
              <!-- 项目列表-->
              <div class="listItemDIV">
                <div
                  class="row"
                  v-for="marker of markers"
                  :key="marker.code"
                  @click="lookDetail(marker, 'left')"
                  :class="{ active: activeName == marker.name }"
                >
                  <div class="head-title" v-text="marker.name" :title="marker.name"></div>
                  <div class="row-content">
                    <span class="item fl"
                      ><i class="iconfont nhjc-dianli electricity"></i>{{ marker.energy }}kWh</span
                    >
                    <span class="item fl"
                      ><i class="iconfont nhjc-shui water"></i>{{ marker.water }}m³</span
                    >
                    <span class="item fl"
                      ><i class="iconfont nhjc-qi air"></i>{{ marker.air }}m³</span
                    >
                  </div>
                </div>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-context" id="right-context">
        <baidu-map
          :style="{ width: map.width, height: map.height }"
          class="map"
          ak="这里填你的百度秘钥"
          :zoom="map.zoom"
          :center="{ lng: map.center.lng, lat: map.center.lat }"
          @ready="handler"
          :scroll-wheel-zoom="true"
        >
          <!--比例尺控件-->
          <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
          <!--缩放控件-->
          <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
          <!--聚合动态添加的点坐标-->
          <bm-marker-clusterer :averageCenter="true">
            <bm-marker
              v-for="marker of markers"
              :key="marker.code"
              :position="{ lng: marker.lng, lat: marker.lat }"
              @click="lookDetail(marker)"
            ></bm-marker>
          </bm-marker-clusterer>
          <!--信息窗体-->
          <bm-info-window
            :position="{ lng: infoWindow.info.lng, lat: infoWindow.info.lat }"
            :title="infoWindow.info.name"
            :show="infoWindow.show"
            @close="infoWindowClose"
            @open="infoWindowOpen"
          >
            <p>
              <span class="left">单位面积能耗：</span
              ><span class="right">{{ infoWindow.info.areaEnergy }}kWh/㎡</span>
            </p>
            <p>
              <span class="left">建筑面积：</span
              ><span class="right">{{ infoWindow.info.area }}㎡</span>
            </p>
            <p>
              <span class="left">电耗：</span
              ><span class="right">{{ infoWindow.info.energy }}kWh</span>
            </p>
            <p>
              <span class="left">水耗：</span
              ><span class="right">{{ infoWindow.info.water }}m³</span>
            </p>
            <p>
              <span class="left">气耗：</span><span class="right">{{ infoWindow.info.air }}m³</span>
            </p>
          </bm-info-window>
        </baidu-map>
      </div>
    </div>
  </div>
</template>

<script>
import {
  buildTypeOptionsData,
  districtTypeOptionsData,
  buildOptionsData,
} from '../views/energyAnalysis/energyConsumptionRanking/energyConsumptionRanking'
import { getProgramsType } from '../assets/js/bmr-request'
import GlobalUtil from '../utils/globalUtil'
import PmDistributionService from '../services/pmDistributionService'

//百度地图
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'

export default {
  name: 'pm-distribution',
  components: {
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmInfoWindow,
  },
  data() {
    return {
      districtType: 0, //行政区域
      districtTypeOptions: GlobalUtil.deepCopy(districtTypeOptionsData), //行政区域选项
      buildType: 0, //项目类型
      buildTypeOptions: buildTypeOptionsData, //项目类型选项
      buildId: '', //项目ID
      buildOptions: buildOptionsData, //项目列表
      searchParams: {
        regions: 0, //区域编号
        proType: 0, //项目类型
        proCode: '', //项目编号
      },
      map: {
        center: { lng: 118.802422, lat: 32.065631 }, //'南京市',
        zoom: 12,
        width: '1000px',
        height: '710px',
      },
      markers: [],
      infoWindow: {
        lng: 0,
        lat: 0,
        show: false,
        info: {
          air: 0,
          area: 12313,
          areaEnergy: 0.64,
          code: '440300A055',
          energy: 7922.66,
          lat: '32.043433',
          lng: '118.784107',
          name: '市人民检察院',
          water: 0,
        },
      },
      activeName: '',
      leftHeight: '540px',
      containerHeight: '700px',
    }
  },
  created() {
    this.districtTypeOptions[0].label = '请选择行政区域'
    this.getBuildTypes()
    this.getSelectPro()
  },
  mounted() {
    this.leftHeight = document.body.clientHeight - 300 + 'px'
    this.containerHeight = document.body.clientHeight - 150 + 'px'
  },
  methods: {
    //查询
    search() {
      this.searchParams.regions = this.districtType
      this.searchParams.proType = this.buildType
      this.searchParams.proCode = this.buildId
      this.getProPositionMap()
    },
    infoWindowClose(e) {
      this.infoWindow.show = false
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true
    },
    //查看详情
    lookDetail(data, target) {
      // console.log('data',data)
      this.infoWindow.show = true
      this.infoWindow.info = data
      this.activeName = data.name
      // let This=this;
      //为弹窗口标题添加title
      this.$nextTick(() => {
        let win = document.querySelector('.BMap_bubble_title')
        win.title = this.activeName
      })
      if (target == 'left') {
        //点击的是左侧列表项，则不需要滚动
        this.map.center = { lng: data.lng, lat: data.lat }
        this.map.zoom = 15
        return
      }
      //滚动到指定元素位置
      this.$nextTick(() => {
        let obj = document.querySelector('.active')
        let scrollTop = obj.offsetTop
        this.$refs.box.scrollTop = scrollTop - 180
      })
    },
    //地图初始化
    handler({ BMap, map }) {
      console.log(BMap, map)
      // this.map.center.lng = 118.802422
      // this.map.center.lat = 32.065631
      // this.map.zoom = 12;
      this.map.width = document.getElementById('container').clientWidth - 330 + 'px'
      this.map.height = document.body.clientHeight - 160 + 'px'
      this.getProPositionMap()
    },
    //获取项目列表
    getSelectPro() {
      PmDistributionService.instance()
        .getSelectPro({})
        .then((res) => {
          if (res.code === 200) {
            console.log('res', res)
            res.data.list.unshift({ code: '', name: '请输入项目名称' })
            this.buildOptions = res.data.list
          } else {
            this.$message({
              message: '获取数据失败',
              type: 'error',
            })
          }
        })
    },
    //项目分布地图
    getProPositionMap() {
      PmDistributionService.instance()
        .getProPositionMap(this.searchParams)
        .then((res) => {
          if (res.code === 200) {
            // console.log('res',res)
            this.markers = res.data.list
          } else {
            this.$message({
              message: '获取数据失败',
              type: 'error',
            })
          }
        })
    },
    //获取项目类型
    getBuildTypes() {
      getProgramsType().then((res) => {
        //获取楼建筑下拉框
        let temArr = []
        temArr.push({ name: '请选择项目类型', id: 0, type: 10 })
        res.array.forEach(function (item, index) {
          temArr.push(item)
        })
        console.log('res.array', res.array)
        this.buildTypeOptions = temArr
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$bgBlueColor: #1881bf;
h3.title {
  box-sizing: border-box;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  font-weight: 600;
  padding: 0 0 0 30px;
  border: 1px #e5eef3 solid;
  color: #2274a4;
  background: #f5f9f9;
  width: 100%;
  text-align: left;
}
.container {
  margin: 0 auto;
  min-width: 1366px;
  padding: 0px;
  min-height: 710px;
  .left {
    width: 320px;
    float: left;
    .header {
      width: 300px;
      clear: left;
      height: 34px;
      line-height: 34px;
      color: black;
      background: #f5f9f9;
      padding-left: 20px;
    }
    .top {
      height: 70px;
      padding: 8px 5px 12px 5px;
    }
  }
  .right-context {
    float: left;
  }
  .item {
    margin: 5px;
    height: 28px;
    line-height: 28px;
    .electricity {
      color: #ffd670;
    }
    .water {
      color: #4eb9db;
    }
    .air {
      color: #f39795;
    }
    .iconfont {
      font-size: 22px;
    }
  }
  .query-submit {
    width: 90px;
    border-radius: 28px;
    background: $bgBlueColor;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .list {
    .item {
      width: 93px;
      height: 30px;
      line-height: 30px;
      display: block;
    }
    .item.fl {
      float: left;
    }
    .list-context {
      border-radius: 5px;
      margin-top: 10px;
      background: white;
      .list-scroll {
        margin-top: 10px;
        overflow-y: auto;
        min-height: 537px;
        overflow-x: hidden;
        .row {
          float: left;
          width: 320px;
          cursor: pointer;
          .head-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            color: #1781bf;
            font-weight: 400;
            padding-left: 20px;
            height: 30px;
            line-height: 30px;
          }
          .row-content {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-bottom: 10px;
            font-size: 12px;
            color: rgb(128, 128, 128);
            border-bottom: 1px solid #eee;
            padding-left: 10px;
          }
        }
        .row.active {
          background-color: #cfddf3;
        }
      }
    }
  }
  .map {
    min-width: 800px;
    width: 1000px;
    height: 710px;
    float: left;
    background: white;
    border-radius: 5px;
    margin-left: 10px;
    .right {
      text-align: left;
    }
    .left {
      width: 100px;
    }
  }
}
</style>
<style lang="scss">
.pm-distribution {
  .BMap_bubble_title {
    color: #2db7f5 !important;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 220px !important;
  }
}
</style>
