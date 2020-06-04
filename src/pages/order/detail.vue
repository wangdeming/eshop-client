<template>
  <page :better-scroll="true">
    <div class="order-status">
        <p class="status">{{order.statusName}}</p>
      <!--状态（1-待付款；2-待发货；3-待收货；4-已收货（待评价）；5-已取消；6-退款中；7-交易关闭；8-已完成；）-->
        <p class="statusdesc" v-if="order.status==1">请于{{payEndTime}}内完成付款，超时订单将自动关闭</p>
        <p class="statusdesc" v-if="order.status==2">等待卖家发货</p>
        <p class="statusdesc" v-if="order.status==3">等待买家收货</p>
        <p class="statusdesc" v-if="order.status==4 ||  order.status==7 ||order.status==8"></p>
        <p class="statusdesc" v-if="order.status==5">请重新下单</p>
        <p class="statusdesc" v-if="order.status==6">订单内商品已申请售后</p>
        <div class="statusline" v-if="order.status!=5">
          <ul class="time-horizontal">
            <li class="user-buy"><b  class="trade_pending" :class="{'trade_user':order.status>1}"></b><span class="change">买家付款</span></li>
            <li ><b class="trade_over" :class="{'trade_user':isshipped}"></b>商家发货</li>
            <li class="over_user"><b class="trade_over"  :class="{'trade_user':(order.status==8||order.status==4)}"></b><span class="change_over">交易完成</span></li>
          </ul>
        </div>
    </div>
    <div class="logistics_information" v-if="order.transportTime">
      <div class="logistics_logo">
        <img class="ignore" src="../../static/images/common/logistics.svg" alt="物流图标">
      </div>
      <div class="message" @click="$go('/order/logistic?id='+order.id)">
        <p class="message_change">{{order.transportType}}{{order.transportContent}}</p>
        <p class="update">{{order.transportTime}}</p>
      </div>
    </div>

    <div class="checkout-address">
      <div class="address-left">
        <img class="ignore" src="../../static/images/common/palce.svg" alt="地址图标">
        <div class="rig">
          <div class="left-top">
            <h4 class="user-name">{{order.consigneeName}}</h4>
            <span class="phone">{{order.consigneePhone}}</span>
          </div>
          <div class="left-bottom">
            <p>{{order.province}}{{order.city}}{{order.district}}{{order.address}}</p>
          </div>
        </div>
      </div>
    </div>
    <order-cell :item="order"></order-cell>
    <div class="order-bottom">
      <div class="tit">订单信息</div>
      <div class="item" v-if="order.orderNo">
        <span>订单编号</span><span>{{order.orderNo}}</span>
      </div>
      <div class="item" v-if="order.createdTime">
        <span>创建时间</span><span>{{order.createdTime}}</span>
      </div>
      <div class="item" v-if="order.cancelTime">
        <span>取消时间</span><span>{{order.cancelTime}}</span>
      </div>
      <div class="item" v-if="order.paymentTime">
        <span>付款时间</span><span>{{order.paymentTime}}</span>
      </div>
      <div class="item" v-if="order.deliveryTime">
        <span>发货时间</span><span>{{order.deliveryTime}}</span>
      </div>
      <div class="item" v-if="order.receiveTime">
        <span>完成时间</span><span>{{order.receiveTime}}</span>
      </div>
    </div>
    <template slot="bottom">
      <div class="botbtn">
        <div class="action-btns" v-if="isgetdata" >
          <!--(（1-待付款；2-待发货；3-待收货；4-已收货（待评价）；5-已取消；6-退款中；7-交易关闭；）；)-->
          <span v-if="order.status==1" @click="cancel">取消</span>
          <span v-if="order.status==1" @click="payForGoods">付款</span>
          <span v-if="(order.status==4 ||order.status==8) && order.isEvaluated==0" @click="$go('/order/rate?id='+order.id)">评价</span>
          <span v-if="order.isEvaluated==1" @click="$go('/order/ratedetail?id='+order.id)">查看评价</span>
          <span v-if="order.status==2 || order.status==3 || order.status==4"
                @click="$go('/order/logistic?id='+order.id)">查看物流</span>
          <span v-if="order.status==3"  @click="confirm">确认收货</span>
          <span v-if="order.status!=1" @click="addtocar">再来一单</span>
        </div>
      </div>

    </template>

  </page>
</template>
<style lang="less" scoped>
  .order-status {
    min-height: 2.5rem;
    background: #C9AB5D;
    text-align: center;
    color: #fff;
    .status{
      padding-top: 0.5rem;
      font-size: 0.45rem;
      line-height: 1rem;
      letter-spacing: 0.07rem;
    }
    .statusdesc{
      letter-spacing: 0.04rem;
    }
    .statusline{
      padding: 0.7rem  0.7rem 1.2rem  0.7rem;
      .time-horizontal {
        list-style-type: none;
        border: 1px solid #E1D1A7;
        padding: 0px;
        margin: 0px;
      }
      .time-horizontal li {
        float: left;
        position: relative;
        text-align: center;
        width: 33%;
        padding-top: 0.3rem;
      }
      .time-horizontal li span.change{
        display:flex;
        flex-flow:row;
        justify-content:space-between;
        position:relative;
        right:0.7rem;
      }
      .time-horizontal li span.change_over{
        display:flex;
        flex-flow:row;
        justify-content:space-between;
        position:relative;
        right:0.9rem;
      }
      .time-horizontal li.user-buy{
        display:flex;
        flex-flow:row;
        justify-content:space-between;
        position:relative;
        right:1.22rem;
      }
      .time-horizontal li.over_user{
        display:flex;
        flex-flow:row;
        justify-content:space-between;
        position:relative;
        left:1.4rem;
      }
      .time-horizontal li b.trade_user:before {
        content: '';
        position: absolute;
        top: -15px;
        left: 42%;
        width: 25px;
        height: 25px;
        border: 2px solid #E1D1A7;
        border-radius: 25px;
        background: #FFF !important;
      }
      .time-horizontal li b.trade_over:before {
        content: '';
        position: absolute;
        top: -15px;
        left: 42%;
        width: 25px;
        height: 25px;
        border: 2px solid #E1D1A7;
        border-radius: 25px;
        background: #E1D1A7;
      }
      .time-horizontal li b.trade_pending:before {
        content: '';
        position: absolute;
        top: -15px;
        left: 42%;
        width: 25px;
        height: 25px;
        border: 2px solid #E1D1A7;
        border-radius: 25px;
        background: #FFF !important;
      }
      .time-horizontal li  b.trade_pending:after{
        content:'';
        position:absolute;
        top:-12px;
        left:47%;
        width:10px;
        height:13px;
        border:3px solid #C9AB5D;
        border-radius:1px;
        border-top:none;
        border-right:none;
        background:transparent;
        transform:rotate(360deg);
      }
      .time-horizontal li  b.trade_user:after{
        content:'';
        position:absolute;
        top:-10px;
        left:44%;
        width:15px;
        height:10px;
        border:3px solid #C9AB5D;
        border-radius:1px;
        border-top:none;
        border-right:none;
        background:transparent;
        transform:rotate(-45deg);
      }
      .time-horizontal li i.font-change{

      }
    }
  }
  .checkout-address{
    display: flex;
    background: #ffffff;
    padding:0.7rem 0.3rem;
    margin-bottom:0.3rem;
    .address-left{
      display: flex;
      justify-content: center;

      .rig{
        margin-left:0.35rem;
      }
      .iconleft{
        display: flex;
        width: 8%;
      }
      .left-top{
        display: flex;
        font-size: 0.5rem;
        color:#333;
        .user-name{
          font-family: PingFang-SC-Medium;
          font-size: 0.375rem;
          color: #333333;
          letter-spacing: 0.19px;
          line-height:0.525rem;
        }
        span.phone{
          color:#999999;
          padding-left: 0.3rem;
          padding-top: 0.1rem;
          font-size: 0.375rem;
          font-family: PingFang-SC-Medium;
          letter-spacing: 0.19px;
        }
      }
      .left-bottom{
        padding-top:20px;
        font-size: 28px;
        color:#333;
        .address{
          font-family: PingFang-SC-Medium;
          font-size: 0.375rem;
          color: #333333;
          letter-spacing: 0.19px;
          line-height:0.525rem;
        }
      }
    }
    .address-right{
      display: flex;
      align-items: center;
      flex-grow: 0;
      padding-left:20px;
    }
  }
  .logistics_information{
    display:flex;
    flex-flow:row;
    height:2.25rem;
    background-color:#FFFFFF;
    text-align:center;
    margin-bottom:0.3rem;
    .logistics_logo{
      float:left;
      width:0.9rem;
      height:0.9rem;
      margin:0.675rem 0.375rem;
    }
    .message{
      float:left;
      width:7.85rem;
      margin:0.35rem 0.5rem 0.85rem 0;
      .message_change{
        width:8.225rem;
        height:1.05rem;
        color:#5070DB;
        font-size:0.375rem;
        letter-spacing:0.19px;
        line-height:0.525rem;
        text-align:left;
      }
      .update{
        display:flex;
        flex-flow:row;
        width:4.325rem;
        height:0.425rem;
        font-size:0.3rem;
        letter-spacing:0.15px;
        line-height:0.425rem;
        color:#999999;
        font-family: PingFang-SC-Medium;
        margin-top:0.075rem;
      }
    }
  }
  .order-bottom{
    background: #fff;
    margin-top: 0.3rem;
    padding: 0.5rem 0.3rem;
    .tit{
      font-size: 0.5rem;
    }
    .item{
      display: flex;
      justify-content: space-between;
      line-height: 0.9rem;
      font-size: 0.35rem;
    }
  }
  .botbtn{
    height: 1.5rem;
    display: flex;
    background: #fff;
    border-top: 1px solid rgb(204, 204, 204);
    display: flex;
    padding-right: 0.3rem;
    flex-direction: row-reverse;
  }
  .action-btns{
    background: #FFFFFF;
    display: flex;
    box-shadow: inset 0 0 0 0 rgba(0,0,0,0.25);
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
</style>
<script type="text/ecmascript-6">
  import OrderCell from "./common/order-cell";
  import CheckoutPay from "../checkout/checkout-pay";

export default{
  data () {
    return {
      orderId: this.$route.query.id,
      order:{},
      min:'',
      sec:'',
      payEndTime: '',
      isshipped:false,
      isgetdata:false
    }
  },
  components: {
    OrderCell,
    CheckoutPay,
  },
  methods: {
    setEndTime(){
      var that = this;
      let offTime=that.order.offTime
      if(!offTime){
          return false
      }
      var interval = setInterval(function timestampToTime(){

        if(that.min == 0 && that.sec == 0){
          that.isEnd = true;
          clearInterval(interval)
        }else{
          if(that.sec==0){
            that.min=that.min-1
            that.sec=60
          }
          that.sec=that.sec-1
          that.payEndTime = that.min+'分'+that.sec+'秒';
        }
      },1000);
    },
    payForGoods () {
        var oid=this.orderId
        this.request(this.api.ShopPayPay,{shopOrderId:this.order.id,payType:1,wechatPayType:'JSAPI'}).then(res => {
          if (res.code == 200) {
            var data = res.data;
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId":data.appId,     //公众号名称，由商户传入
                "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr":data.nonceStr, //随机串
                "package":data.package,
                "signType":data.signType,         //微信签名方式：
                "paySign":data.paySign //微信签名
              },
              function(res){
                  this.getdetail()
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                  window.location.href = "#/order/detail?id="+oid;
                }else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                  window.location.href = "#/order/detail?id="+oid;
                } else {

                }
              });
          }else{
            this.$toast(res.message);
          }
        });

    },
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
          this.request(this.api.OrderCancel,{orderId:this.order.id}).then(res => {
            if(res.code==200){
              this.$toast(res.message);
              this.getdetail()
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
          this.request(this.api.OrderConfirm,{orderId:this.order.id}).then(res => {
            if(res.code==200){
              this.$toast(res.message);
              this.getdetail()
            }else{
              this.$toast(res.message,'error')
            }
          })
        },
        onCancel: () => {}
      }).show()

    },
    addtocar(){
      this.request(this.api.OrderAddToCar,{orderId:this.order.id}).then(res => {
        if(res.code==200){
          let orderaddto = this.order.goods.map((good, key) => {
            return {
              goodsId: good.goodsId,
              shopId: this.order.shopId,
            };
          })
          sessionStorage.setItem('orderaddto',JSON.stringify(orderaddto))
          this.$go('/cart');
        }else{
          this.$toast(res.message,'error')
        }
      })
    },
    getdetail(){
      this.request(this.api.OrderDetail, {orderId: this.orderId}).then(res => {
        this.isgetdata=true
        this.order=res.data[0];
        this.order.isdetail=true;
        this.min=this.order.offTime && this.order.offTime.match(/(\S*)分/)[1]*1;
        this.sec= this.order.offTime && this.order.offTime.match(/分(\S*)秒/)[1]*1;
        this.setEndTime()
        let temp = this.order.goods.map((good, key) => {
          if(good.deliveryStatus>1){
            return true
          }
        })
        if((temp[0] && this.order.status==6) || (this.order.status>2 && this.order.status!=6 && this.order.status!=7)){
            this.isshipped=true
        }
      })
    }
  },
  created () {
    this.getdetail()
  },
}
</script>
