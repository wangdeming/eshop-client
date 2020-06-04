<template>
  <div class="goods-shop" @click="jumpShop">
    <div class="shop-avatar">
      <img class="ignore" :src="shop.shopLogo" alt="">
    </div>
    <div class="shop-info">
      <h3>{{shop.shopName}}</h3>
    </div>
    <div class="shop-link">
      <span>进入店铺</span>
      <svg class="icon" ><use xlink:href="#icon-my_icon_more"></use></svg>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: ['shop'],
	data () {
	  return {
			
	  }
	},
	methods: {
		jumpShop () {
			this.$emit('jumpShop');
		}
	},
}
</script>
<style lang="less" scoped>
  .goods-shop{
    display: flex;
    align-items: center;
    height: 100px;
    padding:0 27px;
    margin-bottom: 10px;
    background: white;
    .shop-avatar{
      flex-grow: 0;
      .ignore{
        width:1.0666rem;
        height:1.0666rem;
				border-radius: 50%;
      }
    }
    .shop-info{
      flex:1;
      padding-left:20px;
      h3{
        font-size: 28px;
        font-weight: 600;
        color:#333;
      }
    }
    .shop-link{
      flex-grow: 0;
      color:#aa8a59;
      .icon{
        width:18px;
      	height: 36px;
        display: inline-block;
      }
    }
  }
</style>
