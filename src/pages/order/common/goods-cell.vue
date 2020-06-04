<template>
  <div class="order-cell">

    <div class="cell-goods">
      <div class="goods-item" >
        <div class="item-pic">
          <img class="ignore" :src="goods.goodsImg" alt="">
        </div>
        <div class="item-info">
          <div class="info-name">
            <h3>{{goods.goodsName}}</h3>
            <span>{{goods.goodsSpecs}}</span>
          </div>

        </div>
        <div class="item-price-num"  v-if="goods.unitPrice" >
          <span class="single-price">￥{{goods.unitPrice}}</span>
          <span class="num">x{{goods.nums}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['goods'],
    methods:{
    }
  }
</script>
<style lang="less" scoped>
  .order-cell{
    padding:0 28px;
    background: white;
    .cell-time-status{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 90px;
      .cell-time{
        line-height: 0.7rem;
        .shoplogo{
          width: 0.8rem;
          height: 0.8rem;
          vertical-align: bottom;
          border-radius: 1rem;
        }
        span{
          color:#666;
        }
      }
      .cell-status{
        span{
          color:#C9AB5D;
        }
      }
    }
    .cell-goods{
      .goods-item{
        display: flex;
        padding-top: 0.3rem ;
        .item-pic{
          flex-basis: 166px;
          height: 166px;
          .ignore{
            width:100%;
            height:100%;
          }
        }
        .item-info{
          flex:1;
          .info-name{
            padding:0.3rem;
            h3{
              color:#333;
              font-size:0.35rem;
            }
            span{
              font-size: 0.35rem;
              display: block;
              margin-top: 0.2rem;
              color:#999;
            }
          }
        }
        .item-price-num{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-basis: 70px;
          .single-price{
            padding-top:20px;
            color:#333;
            font-size:0.37rem;
          }
          .num{
            padding-top:20px;
            color:#999;
            font-size:0.35rem;
          }
        }
      }
    }
    .cell-price{
      .price-total{
        padding-top:35px;
        p{
          text-align: right;
          color:#333;
          span{
            font-size: 28px;

          }
        }
      }
      .price-transfer{
        padding:20px 0;
        text-align: right;
        color:#333;
      }
    }
    .cell-action{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 113px;
      .expire-time{
        color:#666;
      }
      .action-btns{
        display: flex;
        align-items: center;
        span{
          display: inline-block;
          width:170px;
          height: 60px;
          box-sizing: border-box;
          line-height: 60px;
          text-align: center;
          border-radius: 3rem;
          border:1px solid rgb(204, 204, 204);
          color:#666;
          &:not(:first-child){
            margin-left:20px;
          }
          &:last-child{
            color:#C9AB5D ;
            border-color:#C9AB5D ;
          }
        }
      }
    }

  }
</style>
