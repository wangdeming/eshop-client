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
    <search-default
        :hot="hot"
        :history="history"
        @select-hot="selectHot"
        @select-history="selectHistory"
        @clear-history="clearHistory"
        v-if="step === 1"></search-default>
    <goods-list  :listurl="this.api.queryGoods" :urlparams="urlparams" v-if="step === 3"></goods-list>
  </page>
</template>

<script type="text/ecmascript-6">
import searchHeader from './search-header'
import searchDefault from './search-default'
import goodsList from '../goods-by-category/goods-list'
export default {
  data () {
    return {
      step: 1,
      hot: [],
      history: [],
      recommend: null,
      searchKey: '',
      searchList: [],
      sid:this.$route.query.sid,
      sort:'viewNum',
      order:'desc',
      offset:0,
    }
  },
  components: {
    searchHeader,
    searchDefault,
    goodsList
  },
  computed:{
    urlparams(){
      return {limit:8,offset:this.offset,keyword:this.searchKey,sort:this.sort,order:this.order};
    }
  },
  methods: {
    change (key) {
      this.offset=0
      this.searchKey=key;
    },
    changesort (key,orderdec) {
      let sortval=['viewNum','saleNum','price']
      this.sort=sortval[key];
      this.order=orderdec?'desc':'asc'
      this.offset=0
    },
    search (val) {
      if (val) {
        this.step = 3
      } else {
        this.$toast('搜索关键字不能为空', 'warn')
      }
    },
    selectHot(o){
//
      this.change(o.name)
      this.step = 3
    },
    selectHistory(o){
//      this.urlparams.keyword=o.keyword
      this.change(o.keyword)
      this.step = 3
    },
    clearHistory () {
      this.history = []
    },
    init () {
      this.request(this.api.searchHistoryList).then(res => {
        if (res.code == 200) {
          this.history = res.data
        }
      });
      this.request(this.api.hotRecommendInSearching).then(res => {
        if (res.code == 200) {
          this.hot = res.data
        }
      });
    }
  },
  created () {
    this.init()
  }
}
</script>
