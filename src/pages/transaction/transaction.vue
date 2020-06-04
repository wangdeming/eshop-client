<template>
  <page>
    <div class="transaction">
			<div class="imageDiv">
				<svg class="icon" ><use xlink:href="#icon-sce"></use></svg>
			</div>
			<div class="titleDiv">支付成功</div>
			<div class="payWay">支付方式：微信支付</div>
			<div class="checkOrder" @click="checkOrder">查看订单</div>
			<p class="orderTip">温馨提示：商家不会以商品或订单异常为由要求您点击任何链接或提供个人信息进行退款操作。</p>
		</div>
  </page>
</template>

<script type="text/ecmascript-6">
export default {
	data () {
		return {
		  
		}
	},
	methods: {
		checkOrder () {
			this.$go('/order');
		},
	  },
	created() {
		
	}
}
</script>
<style lang="less" scoped>
  .transaction{
		width: 100%;
		height: 100%;
		position: relative;
		background: #ffffff;
		.imageDiv{
			position: absolute;
			width: 100%;
			height: 144px;
			top: 200px;
			left: 0;
			text-align: center;
			.icon{
				width: 144px;
				height: 144px;
				display: inline-block;
			}
		}
		.titleDiv{
			width: 100%;
			height: 45px;
			line-height: 45px;
			position: absolute;
			top: 380px;
			left: 0;
			text-align: center;
			font-size: 36px;
			color: #C9AB5D;
		}
		.payWay{
			width: 100%;
			height: 45px;
			line-height: 45px;
			position: absolute;
			top: 450px;
			left: 0;
			text-align: center;
			font-size: 36px;
			color: #999999;
		}
		.checkOrder{
			width: calc(100%-108px);
			height: 80px;
			line-height: 80px;
			background: #C9AB5D;
			border-radius: 40px;
			font-size: 34px;
			color: #FFFFFF;
			text-align: center;
			position: absolute;
			top: 600px;
			left: 54px;
		}
		.orderTip{
			width: calc(100%-108px);
			line-height: 40px;
			font-size: 26px;
			color: #999999;
			text-align: center;
			position: absolute;
			top: 720px;
			left: 54px;
		}
	}
</style>