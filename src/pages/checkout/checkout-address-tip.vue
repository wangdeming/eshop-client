<template>
  <div class="checkout-address-top">
    <p>配送至：{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.address}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
	props:['addressInfo']
}	
</script>
<style lang="less" scoped>
  .checkout-address-top{
    display: flex;
    align-items: center;
    height: 45px;
    padding-left:28px;
    background: #C9AB5D;
    p{
			font-size: 26px;
			color: #FFFFFF;
    }
  }
</style>
