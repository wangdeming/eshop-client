<template xmlns="http://www.w3.org/1999/html">
  <page :better-scroll="false">
     <div class="info">
       <p class="time">剩余支付时间  {{payEndTime}}</p>
       <p class="price">￥{{createorder.totalAmount}}</p>
       <p class="room">{{createorder.shopAndRoomName}}</p>
       <p class="timedesc"> {{createorder.checkInDate}}日入住{{createorder.checkOutDate}}离店，预订{{createorder.roomNumber}}间</p>
     </div>
    <div class="wechat">
      <div class="left">
        <svg class="icon licon">
          <use xlink:href="#icon-weixin"></use>
        </svg>
        <span>微信支付</span>
      </div>
      <svg class="icon licon">
        <use xlink:href="#icon-sce"></use>
      </svg>
    </div>
    <template slot="bottom">
        <button @click="pay" class="footerbtn">立即支付</button>
    </template>
  </page>
</template>

<script type="text/ecmascript-6">
  import nonepage from '../common/nonepage'
  import cellH from './cell-h.vue'
  export default {
    data () {
      return {
        createorder:{},
        endTime:'',
        payEndTime: '',
      }
    },
    methods: {
      setEndTime(){
        var that = this;
        var interval = setInterval(function timestampToTime(){
          var date = (new Date(that.createorder.surplusTime)) - (new Date()); //计算剩余的毫秒数
          if(date == 0){
            that.isEnd = true;
            clearInterval(interval)
          }else{
            var D = parseInt(date / 1000 / 60 / 60 / 24 , 10);
            var h = parseInt(date / 1000 / 60 / 60 % 24 , 10);
            if(h < 10){
              h = "0" +　h
            }
            var m = parseInt(date / 1000 / 60 % 60, 10);//计算剩余的分钟
            if(m < 10){
              m = "0" +　m
            }
            var s = parseInt(date / 1000 % 60, 10);//计算剩余的秒数
            if(s < 10){
              s = "0" +　s
            }
            that.endTime = D + h + m + s;
            that.payEndTime = that.endTime.substr(3, 2)+':'+that.endTime.substr(5, 2);
            return that.endTime;
          }
        },1000);
      },
        pay(){
          this.request(this.api.HotelPay,{orderId:this.createorder.id,payType:1,wechatPayType:'JSAPI'}).then(res => {
            if (res.code == 200) {
              var data = res.data;
              let orderid=this.createorder.id
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

                  if(res.err_msg == "get_brand_wcpay_request:ok" ){
                     window.location.href = '#/hotel/paysuccess?orderId='+orderid;
                  }else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                     window.location.href = "#/order/hotel-detail?id="+orderid;
                  } else {
                    window.location.href = "#/order/hotel-detail?id="+orderid;
                  }
                });
            }else{
              this.$toast(res.message);
            }
          });

        }
    },
    created () {

      this.request(this.api.HotelOrderDetail, {orderId:this.$route.query.orderId}).then(res => {
        if (res.code == 200) {
            this.createorder=res.data.order
            this.createorder.shopAndRoomName=res.data.hotel.frontName+"("+res.data.room.name+")"
            this.setEndTime()
        }else{
          this.$toast(res.message,'error');
        }
      })
    },
  }
</script>

<style lang="less" scoped>
  .info{
    text-align: center;
    background: #fff;
    padding: 1rem 0;
    line-height: 0.7rem;
    .time{
      font-size: 0.4rem;
      color: #999999;
    }
    .price{
      font-size:0.75rem;
      color: #151515;
      line-height: 1.2rem;
    }
    .room{
      font-size: 0.34rem;
      margin-top: 0.3rem;
      color: #333333;
    }
    .timedesc{
      font-size: 0.34rem;
      color: #151515;
    }
  }
  .wechat{
    background: #fff;
    padding: 0.8rem 0.4rem;
    margin-top: 0.4rem;
    display: flex;
    font-size: 0.45rem;
    justify-content: space-between;
    .left{
      .icon{
        width: 1.2rem;
      }
    }
  }
  .footerbtn{
    background: #DD3C3C;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    width: 100%;
    height: 1.4rem;
    font-size: 0.45rem;
    color: #fff;
    border: none;
  }
</style>
