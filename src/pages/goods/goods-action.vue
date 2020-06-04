<template>
  <div class="goods-action">
		<div v-if="noGoods==0" class="goods-no">商品售罄啦，看看其他商品吧！</div>
    <div class="action-left">
      <div class="left-item" @click="jumpCart">
				<i v-if="cartNums!=0">{{cartNums}}</i>
        <svg class="icon" ><use xlink:href="#icon-my_car"></use></svg>
        <span>购物车</span>
      </div>
      <div class="left-item" @click="jumpShop">
        <svg class="icon" ><use xlink:href="#icon-shop"></use></svg>
        <span>店铺</span>
      </div>
    </div>
    <div v-if="noGoods==1" class="action-right">
			<div class="right-item" @click="updateGoodsSpec">
			  立即购买
			</div>
      <div class="right-item" @click="updateGoodsSpec">
        加入购物车
      </div>
    </div>
		<div v-else class="action-right">
			<div class="right-item-other" @click="jumpShop">
			  查看店铺其他商品
			</div>
		</div>
  </div>
</template>
<script type="text/ecmascript-6">
import goodsSpecPanel from './goods-spec-panel'
export default {
  props: ['noGoods','cartNums'],
	components:{
		goodsSpecPanel,
	},
	data () {
	  return {
			
	  }
	},
	methods:{
		updateGoodsSpec () {
		  this.$mPopup({
		    mask: true
		  }, (h) => {
		    return h(goodsSpecPanel)
		  })
		},
		jumpCart () {
			this.$emit('jumpCart');
		},
		jumpShop () {
			this.$emit('jumpShop');
		}
	}
}
</script>
<style lang="less" scoped>
  .goods-action{
    width: 100%;
    background: white;
		border-top: 1px solid rgb(215, 215, 215);
		.goods-no{
			width: 100%;
			height: 44px;
			line-height: 44px;
			background: #DD3C3C;
			font-size: 26px;
			color: #FFFFFF;
			text-align: center;
		}
    .action-left{
      float: left;
			height: 90px;
			margin-left: 28px;
      .left-item{
				text-align: center;
        height: 100%;
				width: 90px;
				float: left;
				margin-right: 20px;
				position: relative;
				.icon{
					width: 40px;
					height: 40px;
					margin-top: 10px;
				}
				i{
					position: absolute;
					top: 5px;
					right: 5px;
					display: inline-block;
					width: auto;
					min-width: 36px;
					height: 36px;
					border-radius: 18px;
					background: #DD3C3C;
					font-size: 20px;
					color: #FFFFFF;
					text-align: center;
					line-height: 36px;
				}
				span{
					display: inline-block;
					width: 100%;
					height: 30px;
					line-height: 30px;
					text-align: center;
					margin-top: 10px;
				}
      }
    }
    .action-right{
      float: right;
      height: 90px;
      .right-item{
				float: right;
				height: 90px;
				line-height: 90px;
				font-size: 30px;
				color: #FFFFFF;
				text-align: center;
				&:nth-child(1){
					width: 200px;
					background: #DD3C3C;
				}
				&:nth-child(2){
					width: 200px;
					background: #E75F5F;
					margin-right: 2px;
				}
      }
			.right-item-other{
				float: right;
				height: 90px;
				width: 400px;
				line-height: 90px;
				font-size: 30px;
				color: #FFFFFF;
				background: #C9AB5D;
				text-align: center;
			}
    }
  }
</style>
