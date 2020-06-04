<template>
  <page ref="scroll" @scroll="scroll">
    <cart-header slot="top"
				:cartModel="cartModel"
				:cartDefault="cartDefault"
				v-on:changeModel="changeModel"></cart-header>
    <cart-default v-if="cartDefault"></cart-default>
    <cart-main :normalList="normalList"
				:cartModel="cartModel"
				:selectGoodsList="selectGoodsList"
				v-if="cartMainShow"
				v-on:minusNum="minusNum"
				v-on:addNum="addNum"
				v-on:selectAll="selectAll"
				v-on:selectOne="selectOne"
				ref="child"></cart-main>
	<cart-expire :expireList="expireList"
				v-if="cartExpireShow"
				v-on:cleanExpireGoods="cleanExpireGoods"></cart-expire>
	<cart-checkout slot="bottom"
					v-if="!cartDefault"
					:cartModel="cartModel"
					:goodsNum="goodsNum"
					:goodsPriceAmount="goodsPriceAmount"
					:selectAllGoodsShow="selectAllGoodsShow"
					:selectGoodsList="selectGoodsList"
					v-on:selectAllGoodsChange="selectAllGoodsChange"
					v-on:deleteGoods="deleteGoods"
					v-on:checkout="checkout"></cart-checkout>
  </page>
</template>

<script type="text/ecmascript-6">
import cartHeader from './cart-header'
import cartCheckout from './cart-checkout'
import cartDefault from './cart-default'
import cartMain from './cart-main'
import cartExpire from './cart-expire'
export default {
	data () {
		return {
			cartModel:false,
			cartDefault:false,
			normalList:[],
			expireList:[],
			cartMainShow:true,
			cartExpireShow:true,
			selectGoodsList:[],
			selectAllGoodsShow:false,
			goodsNum:0,
			goodsPriceAmount:0,
			goodsCartId:[],
		}
	},
	components: {
		cartHeader,
		cartCheckout,
		cartDefault,
		cartMain,
		cartExpire
	},
	created() {
		this.getListNormalGoods();
		this.getListExpireGoods();
	},
	methods: {
		scroll (e) {
		  this.scrollY = e.y;
		},
		checkout () {
			if (this.goodsCartId.length == 0) {
				this.$toast("请选择至少一项商品");
				return;
			}
			var cartIds = this.goodsCartId.toString();
      this.request(this.api.Orderdetailfromshoppingcart,{shoppingCartIds:cartIds}).then(res => {
      	if (res.code == 200) {
      			this.$go('/checkout?type=cart&id='+cartIds);
      	}else{
      		this.$toast(res.message);
      	}
      });
		},
		selectAllGoodsChange (tempList) {
			if (this.selectAllGoodsShow) {
				this.selectAllGoodsShow = false;
				this.selectGoodsList = tempList;
			} else{
				this.selectAllGoodsShow = true;
				this.selectGoodsList = tempList;
			}
			this.$refs.child.selectList = this.selectGoodsList;
			this.$refs.child.refreshView();
			this.selectAllGoods();
		},
		selectAllGoods () {
			this.selectAllGoodsShow = true;
			for (var i=0;i<this.selectGoodsList.length;i++) {
				for (var j=0;j<this.selectGoodsList[i].length;j++) {
					if (this.selectGoodsList[i][j] == 0) {
						this.selectAllGoodsShow = false;
					}
				}
			}
			this.goodsNum = 0;
			this.goodsPriceAmount = 0;
			this.goodsCartId = [];
			for (var i=0;i<this.selectGoodsList.length;i++) {
				for (var j=0;j<this.selectGoodsList[i].length;j++) {
					if (this.selectGoodsList[i][j] != 0) {
						this.goodsNum +=1;
						this.goodsPriceAmount += this.normalList[i].cartGoodsList[j].price * this.normalList[i].cartGoodsList[j].num;
						this.goodsCartId.push(this.normalList[i].cartGoodsList[j].cartId);
					}
				}
			}
		},
		selectAll (index) {
			if (this.selectGoodsList[index].indexOf(0)>-1) {
				for (var i=0;i<this.selectGoodsList[index].length;i++) {
					this.selectGoodsList[index][i] = 1;
				}
			} else{
				for (var i=0;i<this.selectGoodsList[index].length;i++) {
					this.selectGoodsList[index][i] = 0;
				}
			}
			this.selectAllGoods();
		},
		selectOne (data) {
			var index = data.index;
			var goodsIndex = data.goodsIndex;
			var cartId = data.cartId;
			if (this.selectGoodsList[index][goodsIndex] == 0) {
				this.selectGoodsList[index][goodsIndex] = 1;
				this.goodsCartId.push(cartId);
			} else{
				this.selectGoodsList[index][goodsIndex] = 0;
				var carIdIndex = this.goodsCartId.indexOf(cartId);
				if (carIdIndex > -1) {
					this.goodsCartId.splice(carIdIndex, 1);
				}
			}
			this.selectAllGoods();
		},
		minusNum (cartId) {
			this.request(this.api.MinusOne,{cartId:cartId}).then(res => {
			  if (res.code == 200) {
					this.$toast(res.message);
					this.request(this.api.ListNormalGoods,{}).then(res => {
					  if (res.code == 200) {
					    this.normalList = res.data.cartList;
					  }
					});
			  }else{
					this.$toast(res.message);
				}
			});
		},
		addNum (cartId) {
			this.request(this.api.AddOne,{cartId:cartId}).then(res => {
			    if (res.code == 200) {
					this.$toast(res.message);
					this.request(this.api.ListNormalGoods,{}).then(res => {
					  if (res.code == 200) {
					    this.normalList = res.data.cartList;
					  }
					});
			    }else{
					this.$toast(res.message);
				}
			});
		},
		changeModel () {
			if (this.cartModel) {
				this.cartModel = false;
				this.selectAllGoods();
			} else{
				this.cartModel = true;
			}
		},
		deleteGoods () {
			this.$createDialog({
				type: 'confirm',
				title: '确定删除所选商品？',
				onConfirm: () => {
				  var cartIds = this.goodsCartId.toString();
				  this.request(this.api.DeleteShoppingCart,{cartIds:cartIds}).then(res => {
				      if (res.code == 200) {
				  		this.$toast(res.message);
              this.selectGoodsList = [];
				  		this.getListNormalGoods();
				      }else{
				  		this.$toast(res.message);
				  	}
				  });
				},
			  }).show();
		},
		cleanExpireGoods () {
			this.request(this.api.CleanExpireGoods,{}).then(res => {
			    if (res.code == 200) {
					this.$toast(res.message);
					this.getListExpireGoods();
			    }else{
					this.$toast(res.message);
				}
			});
		},
		getListNormalGoods () {
			this.request(this.api.ListNormalGoods,{}).then(res => {
			let orderaddto=JSON.parse(sessionStorage.getItem('orderaddto'));
			let orderaddtotemp=[]
			  if (res.code == 200) {
			    this.normalList = res.data.cartList;
				for (var i=0;i<res.data.cartList.length;i++) {
					var tempList = [];
					for (var j=0;j<res.data.cartList[i].cartGoodsList.length;j++) {
						tempList.push(0);
						if(orderaddto){
						  let cartList=res.data.cartList[i];
						  for (var a=0;a<orderaddto.length;a++) {
							if(orderaddto[a].shopId==cartList.shopId && orderaddto[a].goodsId==cartList.cartGoodsList[j].goodsId){
							  orderaddtotemp.push({index:i,goodsIndex:j,cartId:cartList.cartGoodsList[j].cartId})
							}
						  }
						}
					}
					this.selectGoodsList.push(tempList);
          this.$refs.child.selectList = this.selectGoodsList;
				}
				if(orderaddtotemp.length){
				  for (var b=0;b<orderaddtotemp.length;b++) {
					this.selectOne(orderaddtotemp[b])
				  }
				  sessionStorage.removeItem('orderaddto')
				}

				if (res.data.goodsTotal == 0) {
					this.cartMainShow = false;
					if (!this.cartExpireShow) {
						this.cartDefault = true;
					}
				}
			  }
			});
		},
		getListExpireGoods () {
			this.request(this.api.ListExpireGoods,{}).then(res => {
			    if (res.code == 200) {
					for (var i=0;i<res.data.cartList.length;i++) {
						for (var j=0;j<res.data.cartList[i].cartGoodsList.length;j++) {
							this.expireList.push(res.data.cartList[i].cartGoodsList[j]);
						}
					}
			    if (res.data.goodsTotal == 0) {
			    	this.cartExpireShow = false;
					if (!this.cartMainShow) {
						this.cartDefault = true;
					}
			    }
			  }
			});
		}
  }
}
</script>
