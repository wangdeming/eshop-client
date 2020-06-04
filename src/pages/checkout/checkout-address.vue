<template>
  <div class="checkout-address" @click="$go('/address?type=selectAddress')" v-if="addressInfo.consigneeName!=null">
    <div class="address-left">
      <div class="left-top">
        <h4>{{addressInfo.consigneeName}}</h4>
        <span>{{addressInfo.consigneePhone}}</span>
      </div>
      <div class="left-bottom">
        <p>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.address}}</p>
      </div>
    </div>
    <div class="address-right">
      <svg class="icon" ><use xlink:href="#icon-my_icon_more"></use></svg>
    </div>
  </div>
	<div class="new-address" @click="$go('/address/update?type=selectAddress')" v-else>
		<div class="addressDiv">
      <div class="jiaDiv"></div>
			<span>新建收货地址</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default{
	props:['addressInfo']
}
</script>

<style lang="less" scoped>
	.new-address{
		width: calc(100%-36px);
		height: 124px;
		margin: 18px;
		background: white;
		text-align: center;
		line-height: 124px;
		position: relative;
		.jiaDiv{
			position: absolute;
			width: 50px;
			height: 50px;
			top: 37px;
      left: calc(50%-140px);
      background-image: url('../../static/images/jia.svg');
      background-size: 100% 100%;
		}
		span{
			font-size: 34px;
			color: #666666;
			margin-left: 60px;
		}
	}
  .checkout-address{
    display: flex;
    height: 124px;
    margin: 18px;
    background: white;
    .address-left{
      display: flex;
      flex-direction: column;
      justify-content: center;
			padding: 0 18px;
      flex:1;
      .left-top{
        display: flex;
        font-size: 28px;
        font-weight: 600;
        color:#333;
				h4{
					margin-right: 18px;
				}
      }
      .left-bottom{
        padding-top:20px;
        font-size: 28px;
        color:#666;
      }
    }
    .address-right{
      display: flex;
      align-items: center;
      flex-grow: 0;
      padding-right:18px;
			.icon{
			  width:18px;
				height: 36px;
			  display: inline-block;
			}
    }
  }
</style>
