<template>
  <page :better-scroll="false" page-background="white">
    <search-header
      slot="top"
      :step="step"
      :searchKey="searchKey"
      @search="search"
      :urlparams="urlparams"
      @key-change="change"
      @change-sort="changesort"></search-header>
    <goods-list  :listurl="this.api.queryGoodsInSecCategory" :urlparams="urlparams"></goods-list>
  </page>
</template>

<script type="text/ecmascript-6">
import searchHeader from './search-header'
import goodsList from '../goods-by-category/goods-list'
export default {
  data () {
    return {
      step: 3,
      searchKey: '',
      searchList: [],
      sid:this.$route.query.sid,
      sort:'viewNum',
      order:'desc',
    }
  },
  components: {
    searchHeader,
    goodsList
  },
  computed:{
    urlparams(){
      return {limit:14,offset:0,secCategoryId:this.sid,keyword:this.searchKey,sort:this.sort,order:this.order};
    }
  },
  methods: {
    change (key) {
      this.searchKey=key;
    },
    changesort (key,orderdec) {
      let sortval=['viewNum','saleNum','price']
      this.sort=sortval[key];
      this.order=orderdec?'desc':'asc'
    },
    search (val) {
      if (val) {
        this.step = 3
        session.addHistory(val)
      } else {
        this.$toast('搜索关键字不能为空', 'warn')
      }
    },
  },
}
</script>
