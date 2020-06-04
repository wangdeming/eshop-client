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
            <span class="single-price">{{order.deliveryStatus}}</span>
          </div>
          <div class="info-number">
            <h3>{{orderDetail.goodsSpecs}}</h3>
            <div v-if="order.shipped">
              <div class="item-price-num" v-if="order.shipped===true">
                <div class="buy-num-click">
                  <span class="buy-num-minus" @click="minusNum">-</span>
                  <span id="buyNum" class="buy-num-num">{{num}}</span>
                  <span class="buy-num-add" @click="addNum">+</span>
                </div>
              </div>
              <span class="num" v-if="order.shipped===false">x{{orderDetail.num}}</span>
            </div>
            <div v-else>
              <span class="num">x{{orderDetail.num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { setTimeout } from 'timers';
  export default {
    props: ['orderDetail', 'order', 'orderStatus'],
    watch: {
      orderDetail(value) {
        this.num =  value.num;
      }
    },
    data () {
      return {
        num: undefined,
      }
    },
    filters: {
      capitalize: function (value) {
        if (value == 2) {
          return '待发货'
        } else if (value == 3) {
          return '待收货'
        } else if (value == 4) {
          return '已收货'
        } else if (value == 8) {
          return '已完成'
        }
      }
    },
    methods:{
      minusNum () {
        if (this.num == 1) {
          this.$toast('不能再减少哟', 'error');
          return;
        } else{
          this.num = this.num - 1;
        }
        this.$emit('listenNum', this.num)
      },
      addNum () {
        if (this.num >= this.orderDetail.num) {
          this.$toast('不能超过购买数量', 'error');
        } else {
          this.num = this.num + 1;
        }
        this.$emit('listenNum', this.num)
      },
    }
  }
</script>
<style lang="less" scoped>
  .order-cell{
    padding:28px;
    background: white;
    border-bottom: 1px solid #ccc;
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
            .item-price-num{
              display: flex;
              flex-direction: column;
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
                .buy-num-minus{
                  display: inline-block;
                  width: 48px;
                  height: 48px;
                  background: #F8F8F8;
                  border-radius: 6px;
                  font-size: 38px;
                  color: #999999;
                  line-height: 48px;
                  text-align: center;
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
                }
                .buy-num-add{
                  display: inline-block;
                  width: 48px;
                  height: 48px;
                  background: #CCCCCC;
                  border-radius: 6px;
                  font-size: 38px;
                  color: #999999;
                  line-height: 48px;
                  text-align: center;
                }
              }
            }
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
