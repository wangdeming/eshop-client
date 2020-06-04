<template>
  <div class="goods-spec-panel">
    <div class="panel-goods">
      <div class="goods-img">
        <img :src="goodsMainImg" alt="">
      </div>
      <div class="goods-info">
        <div class="info-price">
          ￥{{price}}
        </div>
        <div class="info-referPrice">
          <span v-if="referPrice!=''">￥</span>{{referPrice}}
        </div>
      </div>
    </div>
		<div class="panel-section-div">
			<div class="panel-section" v-for="(item, index) in Object.keys(specsList)" :key="index">
			  <div class="section-title">
			    <span>{{item}}:</span>
			  </div>
			  <div class="section-content">
			    <span class="sectionValue" @click="categoryItemClick(index1)" v-for="(item1, index1) in specsList[item]" :key="index1" :class="skuNumMapData.indexOf(item1) > -1?'noStock':''">{{item1}}</span>
			  </div>
			</div>
			<div class="buy-num">
				<div class="buy-num-top">
					<div class="buy-num-title">购买数量</div>
					<div class="buy-num-click">
						<span class="buy-num-button" :class="num==1?'buy-num-disabled':''" @click="minusNum">-</span>
						<span id="buyNum" class="buy-num-num">{{num}}</span>
						<span class="buy-num-button" :class="num==stock?'buy-num-disabled':''" @click="addNum">+</span>
					</div>
				</div>
				<div class="buy-num-stock">剩余{{stock}}件</div>
			</div>
		</div>
		<div class="panel-footer">
			<div class="join-cart" @click="addToCart">加入购物车</div>
			<div class="buy-now" @click="buyNow">立即购买</div>
		</div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    data () {
		return {
			goodsMainImg:sessionStorage.getItem("goodsMainImg"),
			price:sessionStorage.getItem("price"),
			referPrice:sessionStorage.getItem("referPrice"),
			specsList:JSON.parse(sessionStorage.getItem("specsList")),
			stock:sessionStorage.getItem("stock"),
			num:1,
			goodsId:sessionStorage.getItem("goodsId"),
			skuId:null,
			shopId:sessionStorage.getItem("shopId"),
			firstStock:sessionStorage.getItem("stock"),
      skuNumMapData:JSON.parse(sessionStorage.getItem("skuNumMapData")),
		}
	},
	methods: {
		minusNum () {
			if (this.num == 1) {
				return;
			} else{
				this.num = this.num - 1;
			}
		},
		addNum () {
			if (this.num == this.stock) {
				return;
			} else{
				this.num = this.num + 1;
			}
		},
		categoryItemClick (index1) {
      if(event.target.className.indexOf('noStock') > -1){
        return false;
      }
			if (this.firstStock == 0) {
				return false;
			}
      if(event.target.className.indexOf('noSelect') > -1){
        return false;
      }
      if (event.target.className.indexOf('spanHover') > -1) {
        event.target.classList.remove("spanHover");
      } else{
        var p = event.target.parentNode.children;
        for (var i=0;i<p.length;i++) {
        	if (i==index1) {
        		p[i].classList.add("spanHover");
        	} else{
        		p[i].classList.remove("spanHover");
        	}
        }
      }
			var a = document.getElementsByClassName("spanHover");
      if (a.length < Object.keys(this.specsList).length) {
        this.price = '';
        this.referPrice = '';
        this.skuId = null;
      }
      if (a.length == 0) {
        this.stock = this.firstStock;
        var spanList = document.getElementsByClassName("sectionValue");
        for (var j = 0;j < spanList.length;j++) {
          spanList[j].classList.remove("noSelect");
        }
        return false;
      }
			if (a.length == Object.keys(this.specsList).length) {
				var specsObj = new Object();
				for (var i=0;i<a.length;i++) {
					specsObj[Object.keys(this.specsList)[i]] = a[i].innerHTML;
				}
				var specs = JSON.stringify(specsObj);
				this.request(this.api.GetGoodsSku,{goodsId:this.goodsId,specs:specs}).then(res => {
				  if (res.code == 200) {
				    this.goodsMainImg = res.data.img;
						this.price = res.data.price;
						this.referPrice = res.data.referPrice;
						this.stock = res.data.stock;
						this.skuId = res.data.skuId;
				  }else{
						this.$toast(res.message);
						this.price = '';
						this.referPrice = '';
						this.stock = '0';
						this.skuId = null;
					}
				});
        if (a.length == 2) {
          var spanList = document.getElementsByClassName("sectionValue");
          for (var j = 0;j < spanList.length;j++) {
            spanList[j].classList.remove("noSelect");
          }
          var mandanObj1 = new Object();
          mandanObj1[Object.keys(this.specsList)[0]] = a[0].innerHTML;
          var specs = JSON.stringify(mandanObj1);
          this.request(this.api.GoodsSkuStockList,{goodsId:this.goodsId,specs:specs}).then(res => {
            if (res.code == 200) {
                for (var j = 0;j < res.data.length;j++) {
                  if (res.data[j].stock == 0) {
                    var dataSpecs = JSON.parse(res.data[j].specs);
                    var dataSpecsValues = Object.values(dataSpecs);
                    if (dataSpecsValues.indexOf(Object.values(mandanObj1)[0]) > -1) {
                      dataSpecsValues.splice(dataSpecsValues.indexOf(Object.values(mandanObj1)[0]),1);
                    }
                    for (var x = 0;x < spanList.length;x++) {
                      if (spanList[x].innerHTML == dataSpecsValues[0]) {
                        spanList[x].classList.add("noSelect");
                      }
                    }
                  }
                }
            }
          });
          var mandanObj2 = new Object();
          mandanObj2[Object.keys(this.specsList)[1]] = a[1].innerHTML;
          var specs = JSON.stringify(mandanObj2);
          this.request(this.api.GoodsSkuStockList,{goodsId:this.goodsId,specs:specs}).then(res => {
            if (res.code == 200) {
                for (var j = 0;j < res.data.length;j++) {
                  if (res.data[j].stock == 0) {
                    var dataSpecs = JSON.parse(res.data[j].specs);
                    var dataSpecsValues = Object.values(dataSpecs);
                    if (dataSpecsValues.indexOf(Object.values(mandanObj2)[0]) > -1) {
                      dataSpecsValues.splice(dataSpecsValues.indexOf(Object.values(mandanObj2)[0]),1);
                    }
                    for (var x = 0;x < spanList.length;x++) {
                      if (spanList[x].innerHTML == dataSpecsValues[0]) {
                        spanList[x].classList.add("noSelect");
                      }
                    }
                  }
                }
            }
          });
        }
        if (a.length == 3) {
          var spanList = document.getElementsByClassName("sectionValue");
          for (var j = 0;j < spanList.length;j++) {
            spanList[j].classList.remove("noSelect");
          }
          var madanObj1 = new Object();
          madanObj1[Object.keys(this.specsList)[0]] = a[0].innerHTML;
          madanObj1[Object.keys(this.specsList)[1]] = a[1].innerHTML;
          var specs1 = JSON.stringify(madanObj1);
          this.request(this.api.GoodsSkuStockList,{goodsId:this.goodsId,specs:specs1}).then(res => {
            if (res.code == 200) {
                for (var j = 0;j < res.data.length;j++) {
                  if (res.data[j].stock == 0) {
                    var dataSpecs = JSON.parse(res.data[j].specs);
                    var noSpecsKey1 = Object.keys(this.specsList)[2];
                    var noSpecsValue1 = dataSpecs[noSpecsKey1];
                    for (var x = 0;x < spanList.length;x++) {
                      if (spanList[x].innerHTML == noSpecsValue1) {
                        spanList[x].classList.add("noSelect");
                      }
                    }
                  }
                }
            }
          });

          var madanObj2 = new Object();
          madanObj2[Object.keys(this.specsList)[1]] = a[1].innerHTML;
          madanObj2[Object.keys(this.specsList)[2]] = a[2].innerHTML;
          var specs2 = JSON.stringify(madanObj2);
          this.request(this.api.GoodsSkuStockList,{goodsId:this.goodsId,specs:specs2}).then(res => {
            if (res.code == 200) {
                for (var j = 0;j < res.data.length;j++) {
                  if (res.data[j].stock == 0) {
                    var dataSpecs = JSON.parse(res.data[j].specs);
                    var noSpecsKey2 = Object.keys(this.specsList)[0];
                    var noSpecsValue2 = dataSpecs[noSpecsKey2];
                    for (var x = 0;x < spanList.length;x++) {
                      if (spanList[x].innerHTML == noSpecsValue2) {
                        spanList[x].classList.add("noSelect");
                      }
                    }
                  }
                }
            }
          });

          var madanObj3 = new Object();
          madanObj3[Object.keys(this.specsList)[0]] = a[0].innerHTML;
          madanObj3[Object.keys(this.specsList)[2]] = a[2].innerHTML;
          var specs3 = JSON.stringify(madanObj3);
          this.request(this.api.GoodsSkuStockList,{goodsId:this.goodsId,specs:specs3}).then(res => {
            if (res.code == 200) {
                for (var j = 0;j < res.data.length;j++) {
                  if (res.data[j].stock == 0) {
                    var dataSpecs = JSON.parse(res.data[j].specs);
                    var noSpecsKey3 = Object.keys(this.specsList)[1];
                    var noSpecsValue3 = dataSpecs[noSpecsKey3];
                    for (var x = 0;x < spanList.length;x++) {
                      if (spanList[x].innerHTML == noSpecsValue3) {
                        spanList[x].classList.add("noSelect");
                      }
                    }
                  }
                }
            }
          });
        }
			}else{
        var specsObj = new Object();
        for (var i=0;i<a.length;i++) {
        	var htmlValue = a[i].innerHTML;
          var specsArr = Object.values(this.specsList);
          for (var j = 0;j < specsArr.length;j++) {
            if (specsArr[j].indexOf(htmlValue) > -1) {
              specsObj[Object.keys(this.specsList)[j]] = htmlValue;
            }
          }
        }
        var specs = JSON.stringify(specsObj);
        this.stock = 0;
        this.request(this.api.GoodsSkuStockList,{goodsId:this.goodsId,specs:specs}).then(res => {
          if (res.code == 200) {
            for (var i = 0;i < res.data.length;i++) {
              this.stock += res.data[i].stock;
            }
            var specsKeys = Object.keys(specsObj);
            var allKeys = Object.keys(this.specsList);
            var tempKeys = [];
            for (var i = 0;i < allKeys.length;i++) {
              if (specsKeys.indexOf(allKeys[i]) == -1) {
                tempKeys.push(allKeys[i]);
              }
            }
            var tempValues = [];
            for (var i = 0;i < tempKeys.length;i++) {
              var specsValue = this.specsList[tempKeys[i]];
              for (var j = 0;j < specsValue.length;j++) {
                tempValues.push(specsValue[j]);
              }
            }
            for (var i = 0;i < tempValues.length;i++) {
              var tempNum = 0;
              for (var j = 0;j < res.data.length;j++) {
                var specs = JSON.parse(res.data[j].specs);
                if (Object.values(specs).indexOf(tempValues[i]) > -1) {
                  tempNum += res.data[j].stock;
                }
              }
              if (tempNum == 0) {
                var spanList = document.getElementsByClassName("sectionValue");
                for (var x = 0;x < spanList.length;x++) {
                  if (spanList[x].innerHTML == tempValues[i]) {
                    spanList[x].classList.add("noSelect");
                  }
                }
              }else{
                var spanList = document.getElementsByClassName("sectionValue");
                for (var x = 0;x < spanList.length;x++) {
                  if (spanList[x].innerHTML == tempValues[i]) {
                    spanList[x].classList.remove("noSelect");
                  }
                }
              }
            }
          }
        });
      }
		},
		addToCart() {
			if (Object.keys(this.specsList).length != 0) {
				if (this.skuId == null) {
					this.$toast("请选择商品规格");
					return;
				}
			}
      if (this.stock == 0){
        this.$toast("库存为0，不能购买");
        return;
      }
			if (this.num == 0) {
				this.$toast("请选择商品数量");
			}else{
				this.request(this.api.ShoppingCartAdd,{goodsId:this.goodsId,skuId:this.skuId,num:this.num}).then(res => {
					if (res.code == 200) {
						this.$toast("已成功添加到购物车");
						this.$parent.close();
						if(!sessionStorage.getItem("islist")){
						  this.$go('/goods/'+this.goodsId);
						}else {
							sessionStorage.removeItem("islist");
						}
					}else{
						this.$toast(res.message);
					}
				});
			}
		},
		buyNow () {
			if (Object.keys(this.specsList).length != 0) {
				if (this.skuId == null) {
					this.$toast("请选择商品规格");
					return;
				}
			}
      if (this.stock == 0){
        this.$toast("库存为0，不能购买");
        return;
      }
			if (this.num == 0) {
				this.$toast("请选择商品数量");
			}else{
				var buyNowData = new Object();
				buyNowData.goodsId = parseInt(this.goodsId);
				buyNowData.skuId = this.skuId;
				buyNowData.shopId = parseInt(this.shopId);
				buyNowData.num = this.num;
				sessionStorage.setItem("buyNowData",JSON.stringify(buyNowData));
				this.$parent.close();
				this.$go('/checkout?type=buyNow');
			}
		},
	}
}
</script>
<style lang="less" scoped>
  @import '../../static/less/index';
  .goods-spec-panel{
    height: 900px;
    background: white;
		position: relative;
    .panel-goods{
      display: flex;
      align-items: center;
      padding:27px;
			position: relative;
      .goods-img{
				position: absolute;
        width: 180px;
        height: 180px;
				top: -40px;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .goods-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
				padding-left: 200px;
        .info-price{
					height: 48px;
          font-size: 34px;
					color: #DD3C3C;
					margin-top: 10px;
        }
        .info-referPrice{
          font-size: 30px;
					color: #CCCCCC;
					height: 42px;
					margin-top: 10px;
					text-decoration: line-through;
        }
      }
    }
		.panel-section-div{
			height: 648px;
			width: 100%;
			overflow-y: scroll;
			overflow-x: hidden;
			.panel-section{
				clear: both;
				width: 100%;
				padding:0 27px;
			  .section-title{
					width: 100%;
			    align-items: center;
			    height: 62px;
			    span{
			      font-size: 30px;
						color: #000000;
			    }
			  }
			  .section-content{
			    width: 100%;
					height: auto;
			    span{
						display: inline-block;
						width: auto;
						float: left;
			      height: 60px;
			      line-height: 60px;
			      margin-right: 30px;
						margin-top: 30px;
						padding: 0 30px;
			      border-radius: 30px;
			      background: #F8F8F8;
			      font-size: 26px;
						color: #333333;
			    }
					.spanHover{
						background: #C9AB5D !important;
						color: #FFFFFF !important;
					}
          .noStock{
            background: #F8F8F8 !important;
            color: #999999 !important;
          }
          .noSelect{
            background: #F8F8F8 !important;
            color: #999999 !important;
          }
			  }
			}
			.buy-num{
				clear: both;
				width: 100%;
				padding-top: 30px;
				.buy-num-top{
					width: 100%;
					height: 48px;
					line-height: 48px;
					.buy-num-title{
						height: 48px;
						line-height: 48px;
						font-size: 30px;
						color: #000000;
						float: left;
						padding-left: 27px;
					}
					.buy-num-click{
						height: 48px;
						line-height: 48px;
						float: right;
						padding-right: 27px;
						.buy-num-button{
							display: inline-block;
							width: 48px;
							height: 48px;
							background: #C29C3E;
							border-radius: 6px;
							font-size: 38px;
							color: #FFFFFF;
							line-height: 43px;
							text-align: center;
							float: left;
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
							float: left;
						}
						.buy-num-disabled{
							background: #F6F6F6 !important;
							color: #878787 !important;
						}
					}
				}
				.buy-num-stock{
					clear: both;
					width: 100%;
					height: 42px;
					line-height: 42px;
					padding-left: 27px;
					font-size: 30px;
					color: #999999;
					margin-top: 10px;
				}
			}
		}
    .panel-footer{
			position: fixed;
			left: 0;
			bottom: 0;
			height: 90px;
			width: 100%;
			.join-cart{
				width: 50%;
				float: left;
				text-align: center;
				background: #E75F5F;
				font-size: 30px;
				color: #FFFFFF;
				height: 100%;
				line-height: 90px;
			}
			.buy-now{
				width: 50%;
				float: left;
				text-align: center;
				background: #DD3C3C;
				font-size: 30px;
				color: #FFFFFF;
				height: 100%;
				line-height: 90px;
			}
		}
  }
</style>
