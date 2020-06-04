<template>
  <div class="cart-main">
    <div class="cart-main-shopList" v-for="(item,index) in normalList" :key="index">
			<div class="shopHeader">
				<div v-if="selectList[index].indexOf(0)>-1" class="selectAll" @click="selectAll(index)">
					<svg class="iconSvg"><use xlink:href="#icon-Path"></use></svg>
				</div>
				<div v-else class="selectAll" @click="selectAll(index)">
					<svg class="iconSvg"><use xlink:href="#icon-tick_pre"></use></svg>
				</div>
				<div class="shopTitle" @click="jumpShop(item.shopId)">
					<div class="shopIcon">
						<img :src="item.shopLogo" />
					</div>
					<div class="shopName">
						{{item.shopName}}
					</div>
				</div>
			</div>
			<div class="cart-main-goodsList" v-for="(goodsItem,goodsIndex) in item.cartGoodsList" :key="goodsIndex">
				<div v-if="selectList[index][goodsIndex]==0" class="selectOne" @click="selectOne(index,goodsIndex,goodsItem.cartId)">
					<svg class="icon"><use xlink:href="#icon-Path"></use></svg>
				</div>
				<div v-else class="selectOne" @click="selectOne(index,goodsIndex,goodsItem.cartId)">
					<svg class="icon"><use xlink:href="#icon-tick_pre"></use></svg>
				</div>
				<div class="goodsContent">
					<div class="goodsIcon">
						<img :src="goodsItem.goodsImg" />
					</div>
					<div class="goodsInfo">
						<div class="goodsName">{{goodsItem.goodsName}}</div>
						<div class="goodsSpecs">{{goodsItem.specs}}</div>
						<div class="goodsPriceAndNum">
							<span class="goodsPrice">￥{{goodsItem.price}}</span>
							<div v-if="cartModel" class="goodsNumAction">
								<span class="buy-num-minus" @click="minusNum(goodsItem.cartId,goodsItem.num)">-</span>
								<span id="buyNum" class="buy-num-num">{{goodsItem.num}}</span>
								<span class="buy-num-add" @click="addNum(goodsItem.cartId)">+</span>
							</div>
							<div v-else class="goodsNum">x{{goodsItem.num}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['normalList','cartModel','selectGoodsList'],
  data () {
	  return {
		  selectList:this.$props.selectGoodsList,
	  }
  },
  methods: {
    minusNum (cartId,num) {
		if (num == 1) {
			this.$toast("不能再减了哦，亲");
		} else{
			this.$emit('minusNum',cartId);
		}
	},
	addNum (cartId) {
		this.$emit('addNum',cartId);
	},
	selectAll (index){
		this.$emit('selectAll',index);
		this.$set(this.selectList,index,this.$props.selectGoodsList[index]);
	},
	selectOne (index,goodsIndex,cartId) {
		this.$emit('selectOne',{index:index,goodsIndex:goodsIndex,cartId:cartId});
		this.$set(this.selectList,index,this.$props.selectGoodsList[index]);
	},
	refreshView () {
		for (var index=0;index<this.selectList.length;index++) {
			this.$set(this.selectList,index,this.$props.selectGoodsList[index]);
		}
	},
	jumpShop (shopId) {
		this.goshop(shopId);
	},
  }
}
</script>
<style lang="less" scoped>
  .cart-main{
		width: 100%;
		margin: 18px 0;
		.cart-main-shopList{
			width: calc(100%-36px);
			margin: 0 18px;
			background: #ffffff;
			padding: 27px 0 40px;
			margin-bottom: 18px;
			.shopHeader{
				height: 38px;
				width: 100%;
				position: relative;
				.selectAll{
					position: absolute;
					top: 0;
					left: 27px;
					width: 32px;
					height: 32px;
					.iconSvg{
						width: 32px;
						height: 32px;
					}
				}
				.shopTitle{
					width: 100%;
					height: 38px;
					.shopIcon{
						margin-left: 86px;
						margin-right: 10px;
						width: 32px;
						height: 32px;
						float: left;
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
			.cart-main-goodsList{
				width: 100%;
				height: 162px;
				margin-top: 36px;
				background: #ffffff;
				position: relative;
				.selectOne{
					position: absolute;
					top: 65px;
					left: 27px;
					width: 32px;
					height: 32px;
					.icon{
						width: 32px;
						height: 32px;
					}
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
								color: #C9AB5D;
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
							.goodsNumAction{
								height: 48px;
								line-height: 48px;
								float: right;
								margin-right: 27px;
								.buy-num-minus{
									display: inline-block;
									width: 48px;
									height: 48px;
									background: #F8F8F8;
									border-radius: 6px;
									font-size: 38px;
									color: #999999;
									line-height: 48px;
									text-align: center;
								}
								.buy-num-num{
									display: inline-block;
									width: auto;
									height: 48px;
									font-size: 38px;
									color: #000000;
									line-height: 48px;
									text-align: center;
									padding: 0 20px;
								}
								.buy-num-add{
									display: inline-block;
									width: 48px;
									height: 48px;
									background: #CCCCCC;
									border-radius: 6px;
									font-size: 38px;
									color: #999999;
									line-height: 48px;
									text-align: center;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
