<template>
  <div class="order-cell">
    <div class="cell-time-status">
      <div class="cell-time">
        <img class="shoplogo" :src="item.shopLogo">
        <span>{{item.shopName}}</span>
      </div>
      <div class="cell-status">
        <span v-if="item.refundStatus<3">{{item.refundType}}</span>
        <span v-else>{{item.refundType}}</span>
      </div>
    </div>
    <div class="cell-goods" @click="$go('/refund-detail?id='+item.orderGoodsId)">
      <div class="goods-item">
        <div class="item-pic">
          <img class="ignore" :src="item.goodsImg" alt="">
        </div>
        <div class="item-info">
          <div class="info-name">
            <h3>{{item.goodsName}}</h3>
            <span>{{item.goodsSpecs}}</span>
          </div>
        </div>
        <div class="item-price-num">
          <span class="single-price"></span>
          <span class="num">x{{item.num}}</span>
        </div>
      </div>
    </div>
    <div class="desc">
      <refund-status :refundDetail="refundDetail"></refund-status>
    </div>
    <div class="cell-action">
      <div class="expire-time">
      </div>
      <div class="action-btns">
        <span @click="$go('/refund-detail?id='+item.orderGoodsId)">查看详情</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import refundStatus from './refund-status'
  export default {
    props: ['item', 'isRefundable'],
    components: {
      refundStatus
    },
    computed: {
      refundDetail() {
        let detail=this.item;
        detail.logistics ={status: detail.logisticsStatus};
        detail.dclass="refundcell"
        return detail;
      },
    }
  }
</script>
<style lang="less" scoped>
  .order-cell {
    margin-top: 0.25rem;
    padding: 0.3rem 0.4rem;
    background: white;
    .cell-time-status {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cell-time {
        line-height: 0.6rem;
        .shoplogo {
          width: 0.6rem;
          height: 0.6rem;
          vertical-align: bottom;
          border-radius: 1rem;
        }
        span {
          color: #666;
        }
      }
      .cell-status {
        span {
          color: #C9AB5D;
        }
      }
    }
    .cell-goods {
      .goods-item {
        display: flex;
        padding-top: 0.3rem;
        .item-pic {
          flex-basis: 166px;
          height: 166px;
          .ignore {
            width: 100%;
            height: 100%;
          }
        }
        .item-info {
          flex: 1;
          .info-name {
            padding: 0.3rem;
            color: #333;
            span {
              font-size: 0.3rem;
              line-height: 1rem;
            }
          }
        }
        .item-price-num {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-basis: 2rem;
          .single-price {
            padding-top: 20px;
            color: #666;
          }
          .num {
            padding-top: 20px;
            color: #666;
          }
          .refund {
            margin-top: 0.2rem;
            line-height: 0.65rem;
            padding: 0 0.3rem;
            text-align: center;
            border-radius: 3rem;
            border: 1px solid #ccc;
          }
        }
      }
    }
    .desc {
      .refundcell {
        margin-top: 0.3rem;
        border: none;
        color: #DD3C3C;
        letter-spacing: 0.1px;
        line-height: 0.5rem;
        font-size: 0.3rem;
      }
    }
    .cell-action {
      display: flex;
      justify-content: space-between;
      align-items: right;
      .expire-time {
        color: #666;
      }
      .action-btns {
        padding: 0.3rem 0rem 0rem 0rem;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 170px;
          height: 60px;
          box-sizing: border-box;
          line-height: 60px;
          text-align: center;
          border-radius: 3rem;
          border: 1px solid rgb(204, 204, 204);
          color: #666;
          &:not(:first-child) {
            margin-left: 20px;
          }
          &:last-child {
            color: #C9AB5D;
            border-color: #C9AB5D;
          }
        }
      }
    }

  }
</style>
