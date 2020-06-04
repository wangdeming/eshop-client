<template>
  <div class="checkout-goods-details">
    <div class="checkout-goods" v-for="(item,index) in orderdetail" :key="index">
			<div class="shopTitle" @click="jumpShop(item.shop.id)">
				<div class="shopIcon">
					<img :src="item.shop.logo" />
				</div>
				<div class="shopName">
					{{item.shop.name}}
				</div>
			</div>
			<div class="goodsContent" v-for="(goodItem,goodIndex) in item.goodsList" :key="goodIndex">
				<div class="goodsIcon">
					<img :src="goodItem.image" />
				</div>
				<div class="goodsInfo">
					<div class="goodsNameAndPrice">
						<div class="goodsName">{{goodItem.name}}</div>
						<div class="goodsPriceAndNum">
							<div class="goodsPrice">￥{{goodItem.price | numFilter}}</div>
							<div class="goodsNum">x{{goodItem.nums}}</div>
						</div>
					</div>
					<div class="goodsSpecs">{{goodItem.sku}}</div>
				</div>
			</div>
			<div class="goodsMethods">
				<span>配送方式</span>
				<span>商家快递￥{{item.expressFee | numFilter}}</span>
			</div>
			<div class="goodsCheckout">
				<span>¥{{item.price | numFilter}}</span>
				<span>合计：</span>
				<span>共{{item.nums}}件商品</span>
			</div>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	props:['orderdetail'],
	methods:{
		jumpShop (shopId) {
			this.goshop(shopId);
		},
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
  .checkout-goods-details{
    width: calc(100%-36px);
	background-color: rgb(246, 246, 246);
    margin: 0 18px 20px;
		.checkout-goods{
			width: 100%;
			margin-bottom: 20px;
			background: #ffffff; 
			.goodsCheckout{
				width: 100%;
				height: 90px;
				margin-top: 20px;
				border-top: 1px solid #999999;
				span{
					display: inline-block;
					height: 90px;
					line-height: 90px;
					float: right;
					text-align: right;
					&:nth-child(1){
						font-size: 30px;
						color: #C9AB5D;
						margin-right: 27px;
					}
					&:nth-child(2){
						font-size: 30px;
						color: #252932;
						margin-left: 20px;
					}
					&:nth-child(3){
						font-size: 30px;
						color: #252932;
					}
				}
			}
			.goodsMethods{
				width: calc(100%-54px);
				height: 32px;
				margin-top: 27px;
				padding: 0 27px;
				span{
					display: inline-block;
					height: 32px;
					line-height: 32px;
					font-size: 26px;
					color: #333333;
					&:nth-child(1){
						float: left;
					}
					&:nth-child(2){
						float: right;
						text-align: right;
					}
				}
			}
			.goodsContent{
				width: 100%;
				height: 162px;
				padding: 0 27px;
				margin-top: 30px;
				.goodsIcon{
					width: 162px;
					height: 162px;
					float: left;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.goodsInfo{
					width: calc(100%-189px);
					height: 162px;
					float: left;
					padding-left: 27px;
					.goodsNameAndPrice{
						width: 100%;
						height: 70px;
						.goodsName{
							width: calc(100%-204px);
							height: 70px;
							line-height: 35px;
							float: left;
							font-size: 26px;
							color: #333333;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.goodsPriceAndNum{
							width: 150px;
							float: left;
							.goodsPrice{
								width: 100%;
								height: 35px;
								font-size: 28px;
								color: #333333;
								text-align: right;
							}
							.goodsNum{
								width: 100%;
								height: 35px;
								font-size: 26px;
								color: #999999;
								text-align: right;
							}
						}
					}
					.goodsSpecs{
						width: 100%;
						height: 32px;
						line-height: 32px;
						margin-top: 16px;
						font-size: 26px;
						color: #999999;
					}
				}
			}
			.shopTitle{
				width: 100%;
				height: 38px;
				padding-top: 27px;
				.shopIcon{
					margin-left: 27px;
					margin-right: 10px;
					width: 32px;
					height: 32px;
					float: left;
					border-radius: 16px;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.shopName{
					height: 38px;
					line-height: 38px;
					font-size: 30px;
					color: #333333;
					float: left;
				}
			}
		}
  }
</style>
