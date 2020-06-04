<template>
  <div class="order-cell" :class="{'celllist':!item.isdetail}">
    <div class="cell-time-status"  @click="$go('/hotel/shop?id='+item.shopId)">
      <div class="cell-time">
        <div class="shoplogo">
          <img  class="ignore" :src="item.hotelLogo">
        </div>
        <span>{{item.hotelName}}</span>
      </div>
      <div class="cell-status"  v-if="!item.isdetail" >
        <span>{{item.statusName}}</span>
      </div>
    </div>
    <div class="cell-goods" @click="$go('/order/hotel-fram?id='+item.id)">
      <div class="goods-item">
        <div class="item-pic">
          <img class="ignore" :src="item.hotelCover" alt="">
        </div>
        <div class="item-info">
          <div class="info-name">
            <h3>{{item.roomName}}&emsp;{{item.roomNumber}}间</h3>
            <span class="num">{{item.checkInDate}}至{{item.checkOutDate}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cell-price">
      <div class="price-total">
        <p>在线支付：<span class="price" :class="{'detailcolor':item.isdetail}">￥{{item.totalAmount}}</span></p>
      </div>
    </div>
    <div class="cell-action">
      <div class="expire-time">
      </div>
      <div class="action-btns">
        <span v-if="item.status==1 || item.status==2 || item.status==3" @click="cancel">取消订单</span>
        <span v-if="item.status==1" @click="payForGoods">付款</span>
        <span v-if="item.status==4 || item.status==5"  @click="orderDelete">删除</span>
        <span v-if="item.status==4" @click="$go('/order/hotel-rate?id='+item.id)">评价</span>
        <span v-if="item.status==4 || item.status==5" @click="$go('/hotel/shop?id='+item.shopId)">再次预订</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['item','isRefundable'],
    methods:{
      cancel(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定要取消吗？',
          confirmBtn: {
            text: '再考虑下',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消订单',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {},
          onCancel: () => {
            this.request(this.api.HotelOrderCancel,{orderId:this.item.id}).then(res => {
              if(res.code==200){
                this.$toast(res.message);
                this.$emit('getHotelList')
              }else{
                this.$toast(res.message,'error')
              }
            })
          }
        }).show()
      },
      payForGoods () {
        let postparam={
          TotalAmount: this.item.totalAmount,
          checkInDate: this.item.checkInDate,
          checkOutDate: this.item.checkOutDate,
          orderId:this.item.id,
          roomNumber:this.item.roomNumber,
          shopAndRoomName: this.item.hotelName+'('+this.item.roomName+')',
          surplusTime: this.item.surplusTime
        }
        this.$go('/hotel/pay?orderId='+this.item.id)
      },
      orderDelete(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定要删除吗？',
          confirmBtn: {
            text: '再考虑下',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '删除订单',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {},
          onCancel: () => {
            this.request(this.api.HotelOrderDelete,{orderId:this.item.id}).then(res => {
              if(res.code==200){
                this.$toast(res.message);
                this.$emit('getHotelList')
              }else{
                this.$toast(res.message,'error')
              }
        })
          }
        }).show()
      },
      addtocar(){
        this.request(this.api.OrderAddToCar,{orderId:this.item.id}).then(res => {
          if(res.code==200){
            this.$go('/cart');
          }else{
            this.$toast(res.message,'error')
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .celllist{
    margin: 0.27rem;
    border-radius: 0.16rem;
  }
  .order-cell{
    padding:0.4rem;
    background: white;
    .cell-time-status{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.4rem;
      .cell-time{
        line-height: 0.4rem;
        .shoplogo{
          width: 0.48rem;
          height: 0.48rem;
          display: inline-block;
          vertical-align: bottom;
          .ignore{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
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
          flex-basis: 220px;
          height: 156px;
          .ignore{
            width:100%;
            height:100%;
            border-radius: 0.15rem;
          }
        }
        .item-info{
          flex:1;
          .info-name{
            padding:0.3rem;
            color: #252932;
            font-size: 0.35rem;
            span{
              color: #999999;
              line-height: 1rem;
            }
          }
        }
        .item-price-num{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-basis:2rem;
          .single-price{
          padding-top:20px;
          color: #252932;
          }
          .num{
            padding-top:20px;
            color: #999999;
          }
		 .refund{
            margin-top: 0.2rem;
            line-height: 0.65rem;
            padding:0 0.28rem;
            text-align: center;
            border-radius: 3rem;
            border: 1px solid #ccc;
          }        }
      }
    }
    .cell-price{
      .price-total{
        padding-top:0.27rem;
        p{
          text-align: right;
          color: #252932;
          span{
            font-size: 0.37rem;
          }
          .price{
            font-size: 0.42rem;
          }
          .detailcolor{
            color: #c9ab5d;
          }
        }
      }
      .expressfee{
        display: flex;
        justify-content: space-between;
        color: #333333;
        padding: 0.4rem 0;
        border-bottom: 1px solid #cccccc;
      }
      .price-transfer{
        padding:20px 0;
        text-align: right;
        color:#252932;
      }
    }
    .cell-action{
      display: flex;
      justify-content: space-between;
      align-items: right;
      .expire-time{
        color:#666;
      }
      .action-btns{
        padding: 0.3rem  0rem  0rem  0rem;
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
