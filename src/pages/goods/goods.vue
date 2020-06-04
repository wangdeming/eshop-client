<template>
	<div class="page">
	  <div class="page-top">
	    <goods-details v-if="scrollToUp!=0" :activeOrNot="activeOrNot" v-on:goodsDetailClick="goodsDetailClick" v-on:goodsEvaluateClick="goodsEvaluateClick"></goods-details>
	  </div>
	  <div class="page-middle page-better-scroll">
	    <cube-scroll
	      ref="scroll"
		  :scrollEvents="scrollEvents"
	      @scroll="scroll">
	      <goods-header></goods-header>
	      <goods-swipper :swipperList="swipperList"></goods-swipper>
	      <goods-info :infoObj="infoObj"></goods-info>
	      <goods-spec v-if="noGoods==1"></goods-spec>
	      <goods-instructions :deliveryType="deliveryType"></goods-instructions>
	      <goods-shop :shop="shop" v-on:jumpShop="jumpShop"></goods-shop>
	      <goods-details v-if="scrollToUp==0" :activeOrNot="activeOrNot" v-on:goodsDetailClick="goodsDetailClick" v-on:goodsEvaluateClick="goodsEvaluateClick"></goods-details>
	      <div id="goodsContent" class="goodsContent"></div>
	      <goods-evaluate :goodsId="goodsId"></goods-evaluate>
	    </cube-scroll>
	  </div>
	  <div class="page-bottom">
	    <goods-action :cartNums="cartnum" :noGoods="noGoods" v-on:jumpCart="jumpCart" v-on:jumpShop="jumpShop" v-if="receiveData==1"></goods-action>
	  </div>
	</div>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'
import goodsHeader from './goods-header'
import goodsSwipper from './goods-swipper'
import goodsInfo from './goods-info'
import goodsSpec from './goods-spec'
import goodsInstructions from './goods-instructions'
import goodsEvaluate from './goods-evaluate'
import goodsShop from './goods-shop'
import goodsDetails from './goods-details'
import goodsAction from './goods-action'
import '@/static/less/wang.less'
var offsetTop;
var contentTop;
var evaluateTop;
var isFirst = true;
export default {
	data () {
		return {
		swipperList: [],
		summary: [],
		scrollY: 0,
		goodsId:this.$route.params.id,
		infoObj:{
			goodsName:'',
			price:'',
			referPrice:'',
			expressFee:'',
			stock:'',
			saleNum:'',
		},
		deliveryType:'',
		shop:{"shopId":0,"shopLogo":'',"shopName":''},
		scrollToUp:0,
		noGoods:1,
    receiveData:0,
		cartNums:0,
		activeOrNot:0,
		scrollEvents: ['scroll'],
    skuNumMapData:[],
		}
	},
	components: {
		goodsHeader,
		goodsSwipper,
		goodsInfo,
		goodsSpec,
		goodsInstructions,
		goodsEvaluate,
		goodsShop,
		goodsDetails,
		goodsAction,
	},
	methods: {
		...mapActions('common', ['getcartnum']),
		scroll (e) {
			this.scrollY = e.y;
			if (isFirst) {
				offsetTop = document.getElementById("evaluateDiv").offsetTop;
        contentTop = document.getElementById("goodsContent").offsetTop;
        evaluateTop = document.getElementById("goodsEvaluateDiv").offsetTop;
				isFirst = false;
			}
			if (Math.abs(this.scrollY) > offsetTop) {
				this.scrollToUp = 1;
			} else{
				this.scrollToUp = 0;
			}
		},
		goodsDetailClick () {
      document.getElementById("goodsEvaluateDiv").style.display = "none";
      document.getElementById("goodsContent").style.display = "block";
			this.$refs.scroll.scrollTo(0,-1-offsetTop,1000);
      this.activeOrNot = 0;
		},
		goodsEvaluateClick () {
      document.getElementById("goodsContent").style.display = "none";
      document.getElementById("goodsEvaluateDiv").style.display = "block";
      this.$refs.scroll.scrollTo(0,-1-offsetTop,1000);
      this.activeOrNot = 1;
		},
		jumpCart () {
			this.$go('/cart');
		},
		jumpShop () {
			this.$go('/shop?id='+this.shop.shopId);
		},
    getGoodsSkuNumMap () {
      this.request(this.api.GoodsSkuNumMap,{goodsId:this.goodsId}).then(res => {
        if (res.code == 200) {
          var tempKeysArr = Object.keys(res.data);
          for (var i = 0;i < tempKeysArr.length;i++) {
            if (res.data[tempKeysArr[i]] == 0) {
              var tempObj = JSON.parse(tempKeysArr[i]);
              var tempKeys = Object.keys(tempObj);
              var tempValue = tempObj[tempKeys[0]];
              this.skuNumMapData.push(tempValue);
            }
          }
          sessionStorage.setItem("skuNumMapData",JSON.stringify(this.skuNumMapData));
        }
      });
    },
		getDetailGoods () {
			this.request(this.api.DetailGoods,{goodsId:this.goodsId}).then(res => {
			  if (res.code == 200) {
        document.getElementById("goodsContent").insertAdjacentHTML("beforeEnd",res.data.goodsIntro);
			  this.swipperList = res.data.goodsImgList;
				this.infoObj.goodsName = res.data.goodsName;
				this.infoObj.price = res.data.price;
				this.infoObj.referPrice = res.data.referPrice;
				this.infoObj.expressFee = res.data.expressFee;
				this.infoObj.stock = res.data.stock;
				if (res.data.stock == 0) {
					this.noGoods = 0;
				}
        this.receiveData = 1;
				this.infoObj.saleNum = res.data.saleNum;
				this.deliveryType = res.data.deliveryType;
				this.shop.shopId = res.data.shop.shopId;
				this.shop.shopLogo = res.data.shop.shopLogo;
				this.shop.shopName = res.data.shop.shopName;
				sessionStorage.setItem("goodsMainImg", res.data.goodsMainImg);
				sessionStorage.setItem("price", res.data.price);
				sessionStorage.setItem("referPrice", res.data.referPrice);
				if (res.data.specsList == '') {
					sessionStorage.setItem("specsList", '{}');
				} else{
					sessionStorage.setItem("specsList", res.data.specsList);
				}
				sessionStorage.setItem("stock", res.data.stock);
				sessionStorage.setItem("goodsId", res.data.goodsId);
				sessionStorage.setItem("shopId", res.data.shop.shopId);
			  }
			});
		},
		getCartNums () {
			this.request(this.api.ListNormalGoods,{}).then(res => {
			  if (res.code == 200) {
					this.cartNums = 0;
					for (var i=0;i<res.data.cartList.length;i++) {
						for (var j=0;j<res.data.cartList[i].cartGoodsList.length;j++) {
							this.cartNums += 1;
						}
					}
			  }
			});
		}
    },
	created () {
    this.getDetailGoods();
	  this.getcartnum();
    this.getGoodsSkuNumMap();
	},
	computed: {
	  ...mapState('common', ['cartnum']),
	},

}
</script>
<style lang="less" scoped>
  body{
		z-index: 0;
		.page{
		  position: relative;
		  display: flex;
		  flex-direction: column;
		  width:100%;
		  height: 100%;
		  .page-top{
		    flex-grow: 0;
		    &-immerse{
		      position: absolute;
		      top:0;
		      left:0;
		      width:100%;
		      z-index: 11;
		    }
		  }
		  .page-middle{
		    position: relative;
		    flex:1;
		    overflow-y: auto;
		  }
		  .page-better-scroll{
		    overflow-y: hidden;
		  }
		  .page-bottom{
		    flex-grow: 0;
		  }
		}
		.goodsContent{
			height: auto;
			background: white;
			margin: 10px 0;
			padding: 27px;
			line-height: 50px;
		}
	}
</style>
