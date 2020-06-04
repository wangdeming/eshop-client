<template>
  <div id="evaluateDiv" class="goods-details">
		<a class="goods-details-div" :class="activeOrNot==0?'active':''" @click="goodsDetailClick()">商品详情</a>
		<a class="goods-details-div" :class="activeOrNot!=0?'active':''" @click="goodsEvaluateClick()">商品评价</a>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
  props: ['activeOrNot'],
  methods:{
	  goodsDetailClick(){
		  this.$emit('goodsDetailClick');
	  },
	  goodsEvaluateClick(){
		  this.$emit('goodsEvaluateClick');
	  }
  }
}
</script>
<style lang="less" scoped>
	.goods-details{
		width: 100%;
		height: 80px;
		background-color: #ffffff;
		border-bottom: 0.5px solid #cccccc;
		.goods-details-div{
			display: inline-block;
			width: 50%;
			height: 80px;
			line-height: 80px;
			text-align: center;
			font-size: 34px;
			color: #999999;
			float: left;
		}
		.active{
			color: #333333;
		}
	}
</style>
