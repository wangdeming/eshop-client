<template>
  <div class="category-content">
    <category-content-list
        :list="list"
        @selectList="selectList"></category-content-list>
    <category-content-sub-list
        :subList="cursublist"
        @selectSubList="selectSubList"></category-content-sub-list>
  </div>
</template>

<script type="text/ecmascript-6">
import categoryContentList from './category-content-list'
import categoryContentSubList from './category-content-sub-list'
export default{
  props: ['list'],
  data () {
    return {
      currentList: null,
      cursublist:null,
    }
  },
  watch: {
    list: function() {
      this.list[0] && this.getsublist(this.list[0].id)
    }
  },
  components: {
    categoryContentList,
    categoryContentSubList
  },
  methods: {
    selectList (o) {
      this.currentList = o;
      this.getsublist(this.currentList.id);

    },
    getsublist(id){
      this.request(this.api.getSecCategoryById,{id:id}).then(res => {
        if (res.code == 200) {
          this.cursublist=res.data
        }
      });
    },
    selectSubList (o) {
      this.$emit('selectSubList', o)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../static/less/index';
  .category-content{
    position: absolute;
    top:0;
    bottom:0;
    width:100%;
    background: white;
  }
</style>
