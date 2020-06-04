<template>
  <page>
    <category-header slot="top"></category-header>
    <div  class="banner">
    <cube-slide :data="banner">
      <cube-slide-item v-for="(item, index) in banner" :key="index">
        <div @click="goAdTarget(item.type,item.relationVal)">
          <img class="ignore" :src="item.img" >
        </div>
      </cube-slide-item>
    </cube-slide>
    </div>
    <specialty-section :items="items" ></specialty-section>
    <specialty-recommend :list="goodsByCategory" title="推荐商品"></specialty-recommend>
  </page>
</template>
<style lang="less" scoped>
  @import '../../static/less/index';
   .banner{
     background: #ffffff;
     height: 3rem;
     padding: 0 0.4rem;
     .ignore{
       width: 100%;
       height: 100%;
     }
   }
</style>
<script type="text/ecmascript-6">
import {mapState, mapGetters, mapActions} from 'vuex'
import specialtyRecommend from './specialty-recommend'
import specialtySection from './specialty-section'
import categoryHeader from '../category/category-header'
export default {
  components: {
    specialtyRecommend,
    specialtySection,
    categoryHeader,
  },
  created () {
    this.request(this.api.secGoodsCategory).then(res => {
      if (res.code == 200) {
        this.items = res.data
      }
    });
    this.request(this.api.listRecommendGoods).then(res => {
      if (res.code == 200) {
        this.goodsByCategory = res.data
      }
    });
    this.request(this.api.adManager,{adPosition:'shopGoodsAd'}).then(res => {
      if (res.code === 200) {
        this.banner = res.data
      }
    })
  },
  data(){
    return {
      items: [],
      goodsByCategory: [],
      banner:[]
    }
  }
}
</script>
