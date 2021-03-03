<template>
  <div class="app">
    <div class="header">全球场测</div>
    <div class="content">
      <baidu-map
        ref="BMGL"
        class="bm-view"
        center="中国"
        ak="2LgYzVvfGProTEMtXaPwaQ29B3HcGvLF"
        :zoom="0"
        :scroll-wheel-zoom="true"
        :style="{ height: `${mapHeight}px` }"
      >
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
        <bm-marker-clusterer :averageCenter="true">
          <bm-marker
            v-for="item of markers"
            :key="item.code"
            :position="{ lng: item.lng, lat: item.lat }"
            @click="lookDetail(item)"
          ></bm-marker>
        </bm-marker-clusterer>
      </baidu-map>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale.vue'
import BmCityList from 'vue-baidu-map/components/controls/CityList.vue'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
import BmMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer.vue'
import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection.vue'

export default Vue.extend({
  name: 'global',
  components: {
    //@ts-ignore
    BaiduMap,
    //@ts-ignore
    BmScale,
    //@ts-ignore
    BmCityList,
    //@ts-ignore
    BmNavigation,
    //@ts-ignore
    BmMarkerClusterer,
    //@ts-ignore
    BmMarker,
    //@ts-ignore
    BmInfoWindow,
    //@ts-ignore
    BmPointCollection,
  },
  data() {
    return {
      mapHeight: 700,
      markers: [{ name: '', desc: '', lng: 0, lat: 0 }],
      marker: {
        show: false,
        lng: 0,
        lat: 0,
        name: '',
        desc: '',
      },
    }
  },
  computed: {
    ...mapState('user', {}),
    ...mapGetters('user', ['routes']),
  },
  filters: {},
  methods: {
    lookDetail(data: any, target: any) {
      console.log(data, target)
    },
  },
  async mounted() {
    for (let i = 0; i < 100; i++) {
      const position: any = {
        name: 'sh',
        desc: '...',
        lng: Math.random() * 40 + 85,
        lat: Math.random() * 30 + 21,
      }
      //@ts-ignore
      this.markers.push(position)
      //@ts-ignore
      this.mapHeight = window.innerHeight - 80
      window.onresize = () => {
        //@ts-ignore
        this.mapHeight = window.innerHeight - 80
      }
    }
  },
})
</script>

<style lang="less" scoped>
.app {
  box-sizing: border-box;
  margin: 0 0 0 0px;
  padding: 0;
  width: 100%;
}
.header {
  width: 100%;
  height: 50px;
  background-color: #2a2a2acc;
  color: #fefefe;
  line-height: 50px;
  padding-left: 15px;
  font-size: 20px;
  position: fixed;
  top: 0px;
}
.content {
  margin: 65px 56px 0 15px;
}
.bm-view {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 4px;
  background-color: #2a2a2a44;
}
.anchorBL {
  display: none;
}
</style>
