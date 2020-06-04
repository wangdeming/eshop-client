<template>
  <div class="goods-by-category-list-goods" >
    <div class="goods-pic" @click="$go('/goods/'+info.id)" >
      <img class="ignore" :src="info.img">
      <div class="nostock" v-if="info.stock<1">
        <p>售罄</p>
      </div>
    </div>
    <div class="goods-r">
      <div class="goods-name"  @click="$go('/goods/'+info.id)">
        <h4>{{info.name}}</h4>
      </div>
      <div class="goods-act">
        <div class="goods-price"  @click="$go('/goods/'+info.id)">
          <span class="price" >￥{{info.price}}</span>
          <span class="oldprice" v-if="info.referPrice>0">￥{{info.referPrice}}</span>
        </div>
        <svg class="icon icon-next"  @click="updateGoodsSpec"  ><use xlink:href="#icon-shopping_cart"></use></svg>
      </div>
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
    display: flex;
    .goods-pic {
      justify-content: center;
      width:4.5rem;
      height:2.8rem;
      position: relative;
      img{
        width: 100%;
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
          line-height: 1.4rem;
          text-align: center;
          border-radius: 50%;
          opacity:1;
        }
      }
    }
    .goods-r{
      padding: 0.3rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      .goods-name{
        width: 100%;
        height: 1.8rem;
        line-height: 0.46rem;
        h4{
          white-space: pre-wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.35rem;
          color:#333;
        }
      }
      .goods-act{
        display: flex;
        justify-content:space-between;
        .goods-price{
          .price{
            color:#DD3C3C;
          }
          .oldprice{
            text-decoration:line-through;
            color:  #999999;
            padding-left: 0.3rem;
          }
        }
        .icon{
          margin-top: -0.2rem;
        }

      }

    }

  }
</style>
