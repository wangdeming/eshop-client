<template>
  <div class="order-cell">
    <div class="cell-goods">
      <div class="goods-item">
        <div class="item-pic">
          <img class="ignore" :src="orderDetail.goodsImg" alt="">
        </div>
        <div class="item-info">
          <div class="info-name">
            <h3>{{orderDetail.goodsName}}</h3>
          </div>
          <div class="info-number">
            <h3>{{orderDetail.goodsSpecs}}</h3>
            <div>
              <span class="num">x{{orderDetail.num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['orderDetail'],
    data () {
      return {
      }
    }
  }
</script>
<style lang="less" scoped>
  .order-cell{
    padding:28px;
    background: white;
    border-bottom: 1px solid #ccc;
    .cell-goods{
      .goods-item{
        display: flex;
        .item-pic{
          flex-basis: 166px;
          height: 166px;
          .ignore{
            width:100%;
            height:100%;
            border-radius: 4px;
          }
        }
        .item-info{
          flex: 1;
          padding:0.3rem 0 0.3rem 0.3rem;
          .info-name{
            display: flex;
            h3{
              color:#333;
              flex-basis: 320px;
            }
            .single-price{
              flex: 1;
              color:#C9AB5D;
              text-align: right;
            }
          }
          .info-number{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 72px;
          }
        }
      }
    }
  }
</style>
