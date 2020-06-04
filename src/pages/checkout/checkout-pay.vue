<template>
  <div class="checkout-pay">
		<div class="pay-action" @click="payForGoods($event)">
		  提交订单
		</div>
    <div class="pay-info">
      合计:￥{{amountPrice}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	props:['amountPrice'],
  methods: {
    payForGoods (event) {
			this.$emit('payForGoods',event);
		}
  }
}
</script>

<style lang="less" scoped>
  .checkout-pay{
		width: 100%;
    height: 90px;
    background: white;
    .pay-info{
      height: 90px;
			line-height: 90px;
			float: right;
			font-size: 30px;
			color: #DD3C3C;
			margin-right: 20px;
    }
    .pay-action{
      width: 200px;
			height:  90px;
      background: #DD3C3C;
      line-height: 90px;
      text-align: center;
      color:white;
      font-size: 30px;
			float: right;
    }
  }
</style>
