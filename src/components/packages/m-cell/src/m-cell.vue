<template>
  <div class="m-cell border-1px-bottom">
    <div class="cell-left">
      <span>{{title}}</span>
    </div>
    <div class="cell-right">
      <span>{{value}}</span>
      <slot></slot>
      <svg class="icon icon-next" v-if="isLink"><use xlink:href="#icon-my_icon_more"></use></svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  name: 'm-cell',
  props: ['title', 'value', 'isLink']
}
</script>

<style lang="less" scoped>
  .m-cell{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 133px;
    .cell-left{
      display: flex;
      align-items: center;
      span{
        font-size: 0.45rem;
        color:#303643;
        width:2.96rem;
        height:1.6rem;
        line-height:1.6rem;
        letter-spacing:0.005rem;
      }
    }
    .cell-right{
      display: flex;
      align-items: center;
      font-size: 30px;
      color:#999;
      span{
        width:2.7rem;
        height:1.6rem;
        font-size:0.45rem;
        color:#999;
        display:inline-block;
        line-height:1.6rem;
        text-align:right;
        letter-spacing:0.01rem;
      }
      .icon-next{
        padding-left: 0.44rem;
        width: 0.4rem;
      }
    }
  }
</style>
