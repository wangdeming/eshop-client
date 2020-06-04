<template>
  <div class="goods-by-category-list">
    <div class="list-item"
         :key="key"
         v-for="(item, key) in list">
      <goods-by-category-list-goods-h :info="item"></goods-by-category-list-goods-h>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import goodsByCategoryListGoodsH from './common/goods-by-category-list-goods-h'

export default {
  props: ['list'],
  components: {
    goodsByCategoryListGoodsH
  }
}
</script>

<style lang="less" scoped>
  .goods-by-category-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0.3rem;
    .list-item {
      flex-basis: calc(100% - 20px / 2);
      width: 0;
      padding-bottom: 0.2rem;
    }
  }
</style>
