<template>
  <div class="goods-instructions">
    配送方式:{{deliveryType}}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['deliveryType']
}
</script>

<style lang="less" scoped>
  .goods-instructions{
    height: 80px;
		line-height: 80px;
		font-size: 30px;
		color: #999999;
		background-color: #ffffff;
		margin-bottom: 20px;
		padding: 0 28px;
		border-top: 0.5px solid #CCCCCC;
  }
</style>
