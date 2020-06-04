<template>
  <page>
    <category-header slot="top"></category-header>
    <category-content
        :list="category"
        @selectSubList="selectSubList"></category-content>
  </page>
</template>

<script type="text/ecmascript-6">

import categoryHeader from './category-header'
import categoryContent from './category-content'
export default{
  data() {
    return {
      category: []
    }
  },
  components: {
    categoryHeader,
    categoryContent
  },
  methods: {
    selectSubList (o) {
      this.$go(`/goods-by-specialty?sid=${o.sub.id}`)
    },
    getlistFirstCategory(){
      this.request(this.api.listFirstCategory).then(res => {
        if (res.code == 200) {
          this.category = res.data
        }
      });
    }
  },
  created () {
    this.getlistFirstCategory();
  }
}
</script>
