<template>
	<div class="cart-expire">
		<div class="cart-expire-header">
			<span class="expire-goods-num">失效商品{{expireList.length}}件</span>
			<span class="clean-goods-expire" @click="cleanExpireGoods">清空失效商品</span>
		</div>
		<div class="cart-expire-goodsList" v-for="(item,index) in expireList" :key="index">
			<div class="selectOne">
				失效
			</div>
			<div class="goodsContent">
				<div class="goodsIcon">
					<img :src="item.goodsImg" />
				</div>
				<div class="goodsInfo">
					<div class="goodsName">{{item.goodsName}}</div>
					<div class="goodsSpecs">{{item.specs}}</div>
					<div class="goodsPriceAndNum">
						<span class="goodsPrice">{{item.statusName}}</span>
						<span class="goodsNum">x{{item.num}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['expireList'],
  methods: {
	cleanExpireGoods () {
		this.$emit('cleanExpireGoods');
	}
  }
}
</script>

<style lang="less" scoped>
  .cart-expire{
  	width: calc(100%-36px);
  	margin-bottom: 36px;
	margin-left: 18px;
	padding: 27px 0 40px;
	background: #ffffff;
	.cart-expire-header{
		width: 100%;
		height: 38px;
		background: #ffffff;
		.expire-goods-num{
			display: inline-block;
			height: 38px;
			line-height: 38px;
			font-size: 30px;
			color: #333333;
			margin-left: 27px;
			float: left;
		}
		.clean-goods-expire{
			display: inline-block;
			height: 38px;
			line-height: 38px;
			font-size: 26px;
			color: #C9AB5D;
			margin-right: 27px;
			float: right;
			text-align: right;
		}
	}
  	.cart-expire-goodsList{
  		width: 100%;
  		height: 162px;
  		margin-top: 36px;
  		background: #ffffff;
  		position: relative;
  		.selectOne{
  			position: absolute;
  			top: 63px;
  			left: 10px;
  			width: 65px;
  			height: 36px;
			line-height: 36px;
			border-radius: 18px;
			background: #CCCCCC;
			font-size: 24px;
			color: #FFFFFF;
			text-align: center;
  		}
  		.goodsContent{
  			width: 100%;
  			height: 100%;
  			.goodsIcon{
  				width: 162px;
  				height: 162px;
  				float: left;
  				margin-left: 86px;
  				img{
  					width: 100%;
  					height: 100%;
  				}
  			}
  			.goodsInfo{
  				float: left;
  				margin-left: 27px;
  				height: 100%;
  				width: calc(100%-275px);
  				.goodsName{
  					height: 64px;
  					line-height: 32px;
  					font-size: 26px;
  					color: #252932;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
  				}
  				.goodsSpecs{
  					height: 32px;
  					line-height: 32px;
  					margin-top: 12px;
  					font-size: 26px;
  					color: #999999;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
  				}
  				.goodsPriceAndNum{
  					height: 36px;
  					line-height: 36px;
  					margin-top: 12px;
  					.goodsPrice{
  						display: inline-block;
  						height: 36px;
  						line-height: 36px;
  						font-size: 28px;
  						color: #DD3C3C;
  						float: left;
  					}
  					.goodsNum{
  						display: inline-block;
  						height: 36px;
  						line-height: 36px;
  						font-size: 26px;
  						color: #999999;
  						float: right;
  						text-align: right;
  						margin-right: 27px;
  					}
  				}
  			}
  		}
  	}
  }
</style>
