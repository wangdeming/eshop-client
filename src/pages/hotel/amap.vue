<template>
  <div class="con">
    <div class="back" @click="$back()">
      <svg class="icon">
        <use xlink:href="#icon-back"></use>
      </svg>
    </div>
    <div id="container" class="map"></div>
  </div>
</template>
<style lang="less" scoped>
  .con {
    width: 100%;
    height: 100%;
    .back{
      position: absolute;
      background: #fff;
      z-index: 9999;
      padding: 0.2rem;
      top: 0.5rem;
      left: 0.4rem;
    }
    .map {
      width: 100%;
      height: 100%;
      margin: 0px;
    }
  }
</style>
<script>
  import AMap from 'AMap'
  export default {
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
        let map = new AMap.Map('container', {
          center: [this.$route.query.lng, this.$route.query.lat],
          resizeEnable: true,
          zoom: 10
        })
        var marker = new AMap.Marker({
          position: new AMap.LngLat(this.$route.query.lng, this.$route.query.lat),
        });
        map.add(marker);
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })
      }
    }
  }
</script>
