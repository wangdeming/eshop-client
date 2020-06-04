<template>
  <div class="goods-info">
    <div class="info-name">
      <p>{{infoObj.goodsName}}</p>
    </div>
    <div class="info-desc">
      <div>￥{{infoObj.price}}</div>
      <div><span v-if="infoObj.referPrice!=''">￥</span>{{infoObj.referPrice}}</div>
    </div>
    <div class="info-price">
      <div class="price-pay">
        <span>运费：{{infoObj.expressFee}}</span>
        <span>剩余：{{infoObj.stock}}</span>
				<span v-if="infoObj.saleNum!=0">销量：{{infoObj.saleNum}}</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: ['infoObj']
}
</script>
<style lang="less" scoped>
  .goods-info{
		height: auto;
    padding:13px;
    margin-bottom: 10px;
    background: white;
    .info-name{
			margin-bottom: 12px;
      p{
        font-size: 30px;
        color:#333;
				height: auto;
				line-height: 42px;
      }
    }
    .info-desc{
      height: 24px;
			margin-bottom: 32px;
      div{
				display: inline-block;
				&:nth-child(1){
				  font-size: 34px;
					color: #DD3C3C;
					margin-right: 10px;
				}
				&:nth-child(2){
				  font-size: 34px;
					color: #CCCCCC;
					text-decoration: line-through;
				}
			}
    }
    .info-price{
      .price-pay{
				height: 18px;
				width: 100%;
        span{
					display: inline-block;
					font-size: 26px;
					color: #999999;
					width: 32%;
					height: 18px;
          &:nth-child(1){
            text-align: left;
          }
          &:nth-child(2){
            text-align: center;
          }
					&:nth-child(3){
					  text-align: right;
					}
        }
      }
    }
  }
</style>
