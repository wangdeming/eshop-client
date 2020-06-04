<template>
  <page :better-scroll="true">
		<checkout-address :addressInfo="addressInfo"></checkout-address>
    <checkout-goods-details :orderdetail="orderdetail"></checkout-goods-details>
		<template slot="bottom">
		  <checkout-address-tip :addressInfo="addressInfo"></checkout-address-tip>
		  <checkout-pay :amountPrice="amountPrice" v-on:payForGoods="payForGoods"></checkout-pay>
		</template>
  </page>
</template>

<script type="text/ecmascript-6">
import checkoutAddress from './checkout-address'
import checkoutPay from './checkout-pay'
import checkoutAddressTip from './checkout-address-tip'
import checkoutGoodsDetails from './checkout-goods-details'
export default{
	components: {
	  checkoutPay,
	  checkoutAddressTip,
	  checkoutGoodsDetails,
		checkoutAddress,
	},
  data () {
    return {
      addressInfo:{},
			shoppingCartIds:this.$route.query.id,
			orderdetail:[],
			amountPrice:0,
			type:this.$route.query.type,
			addressId:sessionStorage.getItem("addressId"),
			shoppingCartIdStr:'',
    }
  },
  methods: {
    getAddressInfo () {
			var addressData = new Object();
			if (this.addressId != null) {<strong></strong>
				addressData.addressId = this.addressId;
			}
			this.request(this.api.ShopOrderAddress,addressData).then(res => {
				if (res.code == 200) {
					if (res.data != '') {
						this.addressInfo = res.data;
						this.addressId = res.data.id;
						sessionStorage.removeItem('addressId');
					}
				}else{
					this.$toast(res.message);
				}
			});
		},
		getOrderdetailfromshoppingcart () {
			if (this.type == "cart") {
				this.request(this.api.Orderdetailfromshoppingcart,{shoppingCartIds:this.shoppingCartIds}).then(res => {
					if (res.code == 200) {
							this.orderdetail = res.data;
							this.amountPrice = 0;
							var shoppingCartIdArr = [];
							for(var i=0;i<res.data.length;i++) {
								this.amountPrice += res.data[i].price;
								for(var j=0;j<res.data[i].goodsList.length;j++) {
									shoppingCartIdArr.push(res.data[i].goodsList[j].shoppingCartId);
								}
							}
							this.amountPrice = this.amountPrice.toFixed(2);
							this.shoppingCartIdStr = shoppingCartIdArr.toString();
					}else{
						this.$toast(res.message);
					}
				});
			} else{
				var buyNowData = sessionStorage.getItem('buyNowData');
				var data = JSON.parse(buyNowData);
				this.request(this.api.OrderdetailfromBuyNow,data).then(res => {
					if (res.code == 200) {
							this.orderdetail = res.data;
							this.amountPrice = 0;
							for (var i=0;i<res.data.length;i++) {
								this.amountPrice += res.data[i].price;
							}
							this.amountPrice = this.amountPrice.toFixed(2);
					}else{
						this.$toast(res.message);
					}
				});
			}
		},
		payForGoods (event) {
			var el = event.currentTarget;
			el.setAttribute('style', 'pointer-events: none');
			if (this.addressId == null) {
				this.$toast("请选择收货地址");
				setTimeout(function(){
					el.removeAttribute("style");
				},300)
				return;
			}
			if (this.type == "cart") {
				this.request(this.api.Insertorderfromshoppingcart,{addressId:this.addressId,shoppingCartIds:this.shoppingCartIdStr,payType:1,wechatPayType:'JSAPI'}).then(res => {
					setTimeout(function(){
						el.removeAttribute("style");
					},300)
					if (res.code == 200) {
						var data = res.data;
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								 "appId":data.appId,     //公众号名称，由商户传入
								 "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
								 "nonceStr":data.nonceStr, //随机串
								 "package":data.package,
								 "signType":data.signType,         //微信签名方式：
								 "paySign":data.paySign //微信签名
							},
							function(res){
							if(res.err_msg == "get_brand_wcpay_request:ok" ){
								window.location.href = "#/transaction";
							}else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
								window.location.href = "#/order";
							} else {
			
							}
						});
					}else{
						this.$toast(res.message);
					}
				});
			} else{
				var buyNowData = sessionStorage.getItem('buyNowData');
				var data = JSON.parse(buyNowData);
				this.request(this.api.InsertorderfromBuyNow,{addressId:this.addressId,goodsId:data.goodsId,skuId:data.skuId,shopId:data.shopId,num:data.num,payType:1,wechatPayType:'JSAPI'}).then(res => {
					setTimeout(function(){
						el.removeAttribute("style");
					},300)
					if (res.code == 200) {
						var data = res.data;
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								 "appId":data.appId,     //公众号名称，由商户传入
								 "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
								 "nonceStr":data.nonceStr, //随机串
								 "package":data.package,
								 "signType":data.signType,         //微信签名方式：
								 "paySign":data.paySign //微信签名
							},
							function(res){
							if(res.err_msg == "get_brand_wcpay_request:ok" ){
								window.location.href = "#/transaction";
							}else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
								window.location.href = "#/order";
							} else {
			
							}
						});
					}else{
						this.$toast(res.message);
					}
				});
			}
		}
  },
  created () {
    this.getAddressInfo();
	this.getOrderdetailfromshoppingcart();
  }
}
</script>
