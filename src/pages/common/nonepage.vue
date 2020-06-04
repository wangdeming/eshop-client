<template>
  <div class="order-none">
    <svg class="icon"><use :xlink:href="icon"></use></svg>
    <p>{{text}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['text','icon']
}
</script>

<style lang="less" scoped>
  .order-none{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:220px;
    .icon{
      width:1.73rem;
      height: 1.73rem;
    }
    p{
      padding-top:34px;
      color: #CCCCCC;
      font-size: 0.4rem;
    }
  }
</style>
