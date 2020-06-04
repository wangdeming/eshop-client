<template>
  <page :better-scroll="false" page-background="white">
    <goods-list  :listurl="this.api.listShopGoods" :urlparams="urlparams"></goods-list>
  </page>
</template>

<script type="text/ecmascript-6">
import goodsList from './goods-list'
export default {
  data () {
    return {
      listShopGoods:[],
    }
  },
  computed:{
    urlparams(){
      return {limit:14,offset:0,shopId:this.$route.query.id};
    }
  },
  components: {
    goodsList
  },
}
</script>
