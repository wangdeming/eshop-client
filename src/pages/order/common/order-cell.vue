<template>
  <div class="order-cell" :class="{'celllist':!item.isdetail}">
    <div class="cell-time-status">
      <div class="cell-time" @click="goshop(item.shopId)">
        <div class="shoplogo">
          <img  class="ignore" :src="item.shopLogo">
        </div>
        <span>{{item.shopName}}</span>
      </div>
      <div class="cell-status"  v-if="!item.isdetail" >
        <span>{{item.statusName}}</span>
      </div>
    </div>
    <div class="cell-goods">
      <div class="goods-item" v-for="(goods, index) in item.goods" v-if="!item.isdetail" @click="$go('/order/detail?id='+item.id)">
        <div class="item-pic">
          <img class="ignore" :src="goods.goodsImg" alt="">
        </div>
        <div class="item-info">
          <div class="info-name">
            <h3>{{goods.goodsName}}</h3>
            <span>{{goods.goodsSpecs}}</span>
          </div>
        </div>
        <div class="item-price-num">
          <span class="single-price">￥{{goods.unitPrice}}</span>
          <span class="num">x{{goods.nums}}</span>
        </div>
      </div>

      <div class="goods-item" v-for="(goods, index) in item.goods" v-if="item.isdetail">
        <div class="item-pic">
          <img class="ignore" :src="goods.goodsImg" alt="">
        </div>
        <div class="item-info">
          <div class="info-name">
            <h3>{{goods.goodsName}}</h3>
            <span>{{goods.goodsSpecs}}</span>
          </div>
        </div>
        <div class="item-price-num">
          <span class="single-price">￥{{goods.unitPrice}}</span>
          <span class="num">x{{goods.nums}}</span>
 <!-- !--(（1-待付款；2-待发货；3-待收货；4-已收货（待评价）；5-已取消；6-退款中；7-交易关闭；）；)-->
          <span class="refund" @click="toRefund(goods.id)" v-if="(goods.serviceStatusName=='无售后' && item.status !== 5 && item.status !== 1 && item.status !== 7 && item.status !== 8) || (goods.serviceStatusName == '退款失败')">申请退款</span>
          <span class="refund" @click="$go('/refund-detail?id='+goods.id)" v-if="goods.serviceStatusName=='退款中'">退款中</span>
          <span class="refund" @click="$go('/refund-detail?id='+goods.id)" v-if="goods.serviceStatusName=='已退款'">已退款</span>
        </div>
      </div>
    </div>
    <div class="cell-price">
      <div class="expressfee" v-if="item.isdetail">
        <span>配送方式</span>
        <span>商家快递￥{{item.expressFee}}</span>
      </div>
      <div class="price-total">
        <p>合计：<span class="price" :class="{'detailcolor':item.isdetail}">￥{{item.orderPrice}}</span><span v-if="!item.isdetail">（含运费￥{{item.expressFee}}）</span></p>
      </div>
    </div>
    <div class="cell-action">
      <div class="expire-time">
      </div>
      <div class="action-btns" v-if="!item.isdetail" >
        <span v-if="item.status==1" @click="cancel">取消</span>
        <span v-if="item.status==1" @click="$go('/order/detail?id='+item.id)">付款</span>
        <span v-if="item.isEvaluated==1" @click="$go('/order/ratedetail?id='+item.id)">查看评价</span>
        <span v-if="(item.status==4 ||item.status==8) && item.isEvaluated==0" @click="$go('/order/rate?id='+item.id)">评价</span>
        <span v-if="item.status==2 || item.status==3 || item.status==4"  @click="$go('/order/logistic?id='+item.id)">查看物流</span>
        <span v-if="item.status==3"  @click="confirm">确认收货</span>
        <span v-if="item.status!=1" @click="addtocar">再来一单</span>
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
          content: '订单还未付款，确定要取消吗？',
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
            this.request(this.api.OrderCancel,{orderId:this.item.id}).then(res => {
              if(res.code==200){
                this.$toast(res.message);
                this.$emit('getList')
              }else{
                this.$toast(res.message,'error')
              }
            })
          }
        }).show()
      },
      confirm(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确认收货后，订单交易完成，钱款将到达商家账户。',
          confirmBtn: {
            text: '确认收货',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.request(this.api.OrderConfirm,{orderId:this.item.id}).then(res => {
              if(res.code==200){
                this.$toast(res.message);
                this.$emit('getList')
              }else{
                this.$toast(res.message,'error')
              }
            })
          },
          onCancel: () => {}
        }).show()

      },
      addtocar(){
        this.request(this.api.OrderAddToCar,{orderId:this.item.id}).then(res => {
          if(res.code==200){
            let orderaddto = this.item.goods.map((good, key) => {
              return {
                goodsId: good.goodsId,
                shopId: this.item.shopId,
              };
            })
            sessionStorage.setItem('orderaddto',JSON.stringify(orderaddto))
            this.$go('/cart');
          }else{
            this.$toast(res.message,'error')
          }
        })
      },
      toRefund(id){
        this.request(this.api.OrderGetGoodsInfo4Refund, {orderGoodsId: id}).then(res => {
          if (res.code == 200) {
            this.$router.push({ name: 'refund', params: { id: id}});
          } else {
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
          flex-basis: 166px;
          height: 166px;
          .ignore{
            width:100%;
            height:100%;
            border-radius: 0.15rem;
          }
        }
        .item-info{
          flex:1;
          .info-name{
            padding-left:0.3rem;
            padding-top: 0.1rem;
            line-height: 0.45rem;
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
            padding-top: 0.1rem;
            color: #252932;
          }
          .num{
            padding-top:20px;
            color: #999999;
          }
		 .refund{
            margin-top: 0.2rem;
            line-height: 0.65rem;
            padding:0 0.26rem;
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
