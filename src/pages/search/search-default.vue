<template>
  <div class="search-default">
    <search-section title="历史搜索">
      <svg class="icon" slot="right" @click="clearHistory"><use xlink:href="#icon-delet"></use></svg>
      <div class="default">
        <span
          :key="key"
          @click="selectHistory(item)"
          v-for="(item, key) in history">{{item.keyword}}</span>
      </div>
    </search-section>
    <search-section title="热门推荐">
      <div class="default">
        <span
            :key="key"
            v-for="(item, key) in hot"
            @click="selectHot(item)">{{item.name}}</span>
      </div>
    </search-section>
  </div>
</template>

<script type="text/ecmascript-6">
import searchSection from './common/search-section'

export default {
  props: ['hot', 'history'],
  components: {
    searchSection
  },
  methods: {
    selectHot (o) {
      this.$emit('select-hot', o)
    },
    selectHistory (o) {
      this.$emit('select-history', o)
    },
    clearHistory () {
      this.request(this.api.delSearchHistory).then(res => {
        if(res.code==200){
          this.$emit('clear-history')
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../static/less/index';
  .default {
    display: flex;
    flex-wrap: wrap;
    span {
      flex-grow: 0;
      height:0.7rem;
      line-height: 0.7rem;
      padding: 0 0.3rem;
      margin: 0 0.3rem 0.3rem 0;
      color: #333333;
      font-size:0.35rem;
      background: #F8F8F8;
      border-radius: 0.7rem;
    }

  }
</style>
