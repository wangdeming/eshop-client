<template>
  <div class="goods-by-category-list-goods">
    <div class="goods-pic" data-ratio="1:1"  @click="$go('/goods/'+info.id)">
      <img :src="info.img">
      <div class="nostock" v-if="info.stock<1">
        <p>售罄</p>
      </div>
    </div>
    <div class="goods-name"  @click="$go('/goods/'+info.id)">
      <h4>{{info.name}}</h4>
    </div>
    <div class="goods-price">
      <span class="price">￥{{info.price}}</span>
      <span class="oldprice" v-if="info.referPrice>0">￥{{info.referPrice}}</span>
      <svg class="icon icon-next change"  @click="updateGoodsSpec"><use xlink:href="#icon-shopping_cart"></use></svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import goodsSpecPanel from '../../goods/goods-spec-panel'
  export default {
    components: {
      goodsSpecPanel
    },
    props: ['info'],
    methods: {
      updateGoodsSpec () {
        this.request(this.api.DetailGoods,{goodsId:this.info.id}).then(res => {
          if (res.code == 200) {
            if(res.data.stock<1){
                return this.$toast('该商品已售罄', 'error');
            }
            sessionStorage.setItem("islist", true);
            sessionStorage.setItem("goodsMainImg", res.data.goodsMainImg);
            sessionStorage.setItem("price", res.data.price);
            sessionStorage.setItem("referPrice", res.data.referPrice);
            sessionStorage.setItem("specsList", res.data.specsList);
            sessionStorage.setItem("stock", res.data.stock);
            sessionStorage.setItem("goodsId", res.data.goodsId);
            sessionStorage.setItem("shopId", res.data.shop.shopId);
            this.getGoodsSkuNumMap(res.data.goodsId)
            this.$mPopup({
              mask: true
            }, (h) => {
              return h(goodsSpecPanel);
            })
          }
        });
      },
      getGoodsSkuNumMap (goodsId) {
        var skuNumMapData=[]
        this.request(this.api.GoodsSkuNumMap,{goodsId:goodsId}).then(res => {
          if (res.code == 200) {
            var tempKeysArr = Object.keys(res.data);
            for (var i = 0;i < tempKeysArr.length;i++) {
              if (res.data[tempKeysArr[i]] == 0) {
                var tempObj = JSON.parse(tempKeysArr[i]);
                var tempKeys = Object.keys(tempObj);
                var tempValue = tempObj[tempKeys[0]];
                skuNumMapData.push(tempValue);
              }
            }
            sessionStorage.setItem("skuNumMapData",JSON.stringify(skuNumMapData));
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  .goods-by-category-list-goods{


    .goods-pic {
      position: relative;
      width:100%;
      &[data-ratio="1:1"] {
        padding-top:calc(100% * 1 / 1);
      }
      *{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        border-radius: 0.15rem;
      }
      .nostock{
        position: absolute;
        top:0;
        background-color:rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        p{
          background: rgba(248,248,248,0.90);
          margin-top: 25%;
          margin-left: 25%;
          width: 50%;
          height: 50%;
          font-size: 0.45rem;
          line-height: 2.2rem;
          text-align: center;
          border-radius: 50%;
          opacity:1;
        }
      }
    }

    .goods-name{
      padding-top:0.32rem;
      h4{
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.4rem;
        color:#333;
        letter-spacing:0.004rem;
        line-height:0.56rem;
        overflow:hidden;
        width:4.2rem;
        height:0.56rem;
      }
    }
    .goods-price{
      padding:0.2rem 0;
      .price{
        color:#DD3C3C;
        font-size:0.4rem;
        letter-spacing:0.004rem;
        line-height:0.56rem;
      }
      .oldprice{
        text-decoration:line-through;
        color:  #999999;
        padding-left: 0.27rem;
        font-size:0.35rem;
        line-height:0.48rem;
        letter-spacing:0.004rem;
      }
        .change {
          display: inline-block;
          width: 0.4rem;
          height: 0.6rem;
          float:right;
      }
    }
  }
</style>
