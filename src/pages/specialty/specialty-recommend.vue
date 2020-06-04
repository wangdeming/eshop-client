<template>
  <m-floor :title="title" isLink="true" >

  <div class="goods-by-category-list" slot="content">

    <div class="list-item"
         :key="key"
         v-for="(item, key) in list">
      <goods-by-category-list-goods :info="item" ></goods-by-category-list-goods>
    </div>

  </div>
  </m-floor>
</template>

<script type="text/ecmascript-6">
  import goodsByCategoryListGoods from '../goods-by-category/common/goods-by-category-list-goods'
  export default {
    props: ['list','title','showAll'],
    components: {
      goodsByCategoryListGoods
    }
  }
</script>

<style lang="less" scoped>
  .goods-by-category-list {

    display: flex;
    flex-wrap: wrap;
    .list-item {
      flex-basis: calc(50% - 20px / 2);
      width: 0;
      padding-bottom: 20px;
      &:nth-child(2n) {
        padding-left: 20px;
      }
    }
  }
</style>
