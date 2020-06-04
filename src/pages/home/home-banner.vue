<template>
  <div data-tag="recommend" class="home-banner">
    <cube-slide :data="list">
      <cube-slide-item v-for="(item, index) in list" :key="index">
        <div @click="goAdTarget(item.type,item.relationVal)">
          <img :src="item.img" class="ignore">
        </div>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      getBanner() {
        this.request(this.api.adManager,{adPosition:'homePageAd'}).then(res => {
          if (res.code === 200) {
            this.list = res.data
          }
        })
      },
    },
    created() {
      this.getBanner()
    }
  }
</script>

<style lang="less" scoped>
  .home-banner {
    .ignore{
      width: 100%;
      height: 100%;
    }
  }
</style>
