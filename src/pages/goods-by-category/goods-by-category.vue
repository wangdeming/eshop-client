<template>
  <page :better-scroll="false" page-background="white">
    <!--<goods-by-category-header-->
        <!--slot="top"-->
        <!--:subCategory="subCategory"-->
        <!--:sid="sid" ></goods-by-category-header>-->
      <goods-list  :listurl="this.api.listShopGoods" :urlparams="urlparams"></goods-list>
  </page>
</template>
<script type="text/ecmascript-6">
import goodsByCategoryHeader from './goods-by-category-header'
import goodsList from './goods-list'
export default {
  data () {
    return {
      urlparams: {shopId:1,offset:0,limit:8},
      subCategory:'',
      sid:''
    }
  },
  components: {
    goodsByCategoryHeader,
    goodsList
  },
  created(){
    this.listurl=this.api.listShopGoods
  }

}
</script>
