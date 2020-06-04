<template>
  <div class="goods-cell">
    <div class="cell-left">
      <span>{{title}}</span>
    </div>
    <div class="cell-mid">
      <slot></slot>
    </div>
    <div class="cell-right">
      <svg class="icon" ><use xlink:href="#icon-my_icon_more"></use></svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
  .goods-cell{
    display: flex;
    min-height: 80px;
    padding:0 28px;
    .cell-left{
      display: flex;
      align-items: center;
      flex-basis: 93px;
      span{
        color:#333333;
				font-size: 30px;
      }
    }
    .cell-mid{
      display: flex;
      align-items: center;
      flex:1;
    }
    .cell-right{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-basis: 40px;
      .icon{
        width:18px;
				height: 36px;
        display: inline-block;
      }
    }
  }
</style>
