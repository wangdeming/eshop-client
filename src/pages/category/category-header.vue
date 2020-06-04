<template>
  <div class="category-header">
    <div class="header-search" @click="$go('/search')">
      <svg class="icon icon-search" ><use xlink:href="#icon-search"></use></svg>
      <span>商品搜索</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import '../../static/less/index';
  .category-header{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 1.8rem;
    padding:0 0.35rem;
    background: white;
    .header-search{
      flex:1;
      font-size: 0.4rem;
      line-height: 0.85rem;
      border-radius:50px;
      background: #f4f4f4;
      color:#999;
    }
  }
</style>
