<template>
  <div class="cart-checkout">
		<div class="check-all-div">
			<div v-if="selectAllGoodsShow" class="selectAll" @click="selectAllGoodsChange">
				<svg class="iconSvg"><use xlink:href="#icon-tick_pre"></use></svg>
			</div>
			<div v-else class="selectAll" @click="selectAllGoodsChange">
				<svg class="iconSvg"><use xlink:href="#icon-Path"></use></svg>
			</div>
			<span>全选</span>
		</div>
		<div v-if="cartModel" class="deleteDiv" @click="deleteGoods">删除</div>
		<div v-else class="checkout-info">
			<div class="checkoutDiv" @click="checkout">去结算({{goodsNum}})</div>
			<div class="info-right">
			  <div class="right-price">合计：￥{{goodsPriceAmount | numFilter}}</div>
			  <div class="right-fare">不含运费</div>
			</div>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['cartModel','selectAllGoodsShow','selectGoodsList','goodsNum','goodsPriceAmount'],
  methods: {
    selectAllGoodsChange () {
		var tempList = this.$props.selectGoodsList;
		if (this.$props.selectAllGoodsShow) {
			for (var i=0;i<this.$props.selectGoodsList.length;i++) {
				for (var j=0;j<this.$props.selectGoodsList[i].length;j++) {
					tempList[i][j] = 0;
				}
			}
		} else{
			for (var i=0;i<this.$props.selectGoodsList.length;i++) {
				for (var j=0;j<this.$props.selectGoodsList[i].length;j++) {
					tempList[i][j] = 1;
				}
			}
		}
        this.$emit('selectAllGoodsChange',tempList);
    },
    deleteGoods () {
      this.$emit('deleteGoods');
    },
    checkout () {
      this.$emit('checkout');
    }
  },
  filters: {
    numFilter(value) {
  	let realVal = parseFloat(value).toFixed(2)
  	return realVal;
    }
  }
}
</script>

<style lang="less" scoped>
  .cart-checkout{
		width: 100%;
		height: 90px;
		background: #ffffff;
		.check-all-div{
			height: 90px;
			margin-left: 45px;
			width: 150px;
			float: left;
			position: relative;
			.selectAll{
				width: 32px;
				height: 32px;
				position: absolute;
				top: 27px;
				left: 0;
				.iconSvg{
					width: 32px;
					height: 32px;
				}
			}
			span{
				display: inline-block;
				width: 80px;
				height: 90px;
				line-height: 90px;
				margin-left: 40px;
				font-size: 30px;
				color: #999999;
			}
		}
		.checkout-info{
			width: calc(100%-195px);
			height: 90px;
			float: right;
			.checkoutDiv{
				width: 200px;
				height: 90px;
				line-height: 90px;
				background: #DD3C3C;
				font-size: 30px;
				color: #FFFFFF;
				text-align: center;
				float: right;
			}
			.info-right{
				width: calc(100%-218px);
				height: 90px;
				float: left;
				margin-right: 18px;
				.right-price{
					width: 100%;
					height: 45px;
					line-height: 45px;
					font-size: 30px;
					color: #DD3C3C;
					text-align: right;
					float: right;
				}
				.right-fare{
					width: 100%;
					height: 45px;
					line-height: 45px;
					font-size: 24px;
					color: #666666;
					text-align: right;
					float: right;
				}
			}
		}
		.deleteDiv{
			width: 200px;
			height: 90px;
			line-height: 90px;
			background: #DD3C3C;
			font-size: 30px;
			color: #FFFFFF;
			text-align: center;
			float: right;
		}
  }
</style>
