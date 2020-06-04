<template>
  <div>
    <div class="order-status">
        <p class="status">{{order.statusName}}</p>
        <!--状态（1-待付款；2-待发货；3-待收货；4-已收货（待评价）；5-已取消；6-退款中；7-交易关闭；8-已完成；）-->
        <p class="statusdesc" v-if="order.status==1">请于{{this.payEndTime}}内完成付款，超时订单将自动关闭</p>
        <p class="statusdesc" v-if="order.status==2">商家将于{{this.payEndTime}}内确认订单</p>
        <p class="statusdesc" v-if="order.status==3">请在当日去酒店前台办理入住！</p>
        <p class="statusdesc" v-if="order.status==4">感谢您的入住，欢迎再次预订！</p>
        <p class="statusdesc" v-if="order.status==5">订单已取消，您可以重新预订！</p>
    </div>

    <div class="order-cell">
      <div class="cell-time-status">
        <div class="cell-time" @click="$go('/hotel/shop?id='+hotel.id)">
          <div class="shoplogo">
            <img class="ignore" :src="hotel.logo">
          </div>
          <span>{{hotel.frontName}}</span>
          <svg class="icon" style="width: 0.35rem">
            <use xlink:href="#icon-my_icon_more"></use>
          </svg>
        </div>
        <div>
          <span @click="$go('/hotel/amap?lat='+hotel.latitude+'&lng='+hotel.longitude)"><img class="ignore" src="../../static/images/home/daohang.svg"></span>
          <span @click="showMerchants" style="margin-left: 12px;"><img class="ignore" src="../../static/images/home/lianxi.svg"></span>
        </div>
      </div>
      <div class="cell-goods" @click="updateGoodsSpec(room.id)">
        <div class="goods-item">
          <div class="item-pic">
            <img class="ignore" :src="hotel.cover" alt="">
          </div>
          <div class="item-info">
            <div class="info-name">
              <h3>{{room.name}}&emsp;{{order.roomNumber}}间</h3>
              <span class="num">{{order.checkInDate}}至{{order.checkOutDate}}</span>
              <div class="desc"><span>{{room.breakfastName}}</span><span>{{order.canCancelName}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="cell-price">
        <div class="price-total">
          <p>在线支付：<span class="price">￥{{order.totalAmount}}</span></p>
        </div>
      </div>
    </div>
    
    <div class="order-bottom">
      <div class="tit">预订信息</div>
      <div class="item" v-if="users">
        <span class="font-color">入住人</span><span><span v-for="item in users">&emsp;{{item.realname}}</span></span>
      </div>
      <div class="item" v-if="order.mobile">
        <span class="font-color">联系方式</span><span>{{order.mobile}}</span>
      </div>
    </div>
    <div class="order-bottom">
      <div class="tit">订单信息</div>
      <div class="item" v-if="order.orderNo">
        <span class="font-color">订单编号</span><span>{{order.orderNo}}</span>
      </div>
      <div class="item" v-if="order.createdTime">
        <span class="font-color">创建时间</span><span>{{order.createdTime}}</span>
      </div>
    </div>
    <div class="order-bottom" v-if="order.payDatetime && order.status == 5">
      <div class="tit">退款信息</div>
      <div class="item">
        <span class="font-color">退款状态</span><span>退款成功</span>
      </div>
      <div class="item">
        <span class="font-color">退款金额</span><span style="color: #c9ab5d;">￥{{order.totalAmount}}</span>
      </div>
    </div>

    <div class="order-bottom">
      <div class="item">
        <span class="font-color">发票</span><span>如需发票，请向酒店前台索取</span>
      </div>
      <div class="item" v-if="(order.status==1 || order.status==2) && order.canCancel==0">
        <span class="font-color">扣款说明</span><span style="width:80%;">该订单确认后不可被取消，若未入住将收取您全额房费，订单需等酒店确认后生效，订单确认结果将以短信通知到您</span>
      </div>
      <div class="item" v-if="(order.status==1 || order.status==2) && order.canCancel==1">
        <span class="font-color">扣款说明</span><span style="width:80%;">该订单在入住当天14点前可免费取消，订单需等酒店确认后生效，订单确认结果将以短信通知到您</span>
      </div>
    </div>
    <div style="position: sticky;bottom: 0;width: 100%;">
      <div class="botbtn">
        <div class="action-btns"  >
          <!--(（1-待付款；2-待发货；3-待收货；4-已收货（待评价）；5-已取消；6-退款中；7-交易关闭；）；)-->
          <span v-if="order.status==1 || order.status==2 || order.status==3" @click="cancel">取消订单</span>
          <span v-if="order.status==1" @click="payForGoods">支付</span>
          <span v-if="order.status==4 || order.status==5" @click="$go('/hotel/shop?id='+hotel.id)">再次预订</span>
        </div>
      </div>
    </div>
    <div>
    </div>
    <room-panel ref="room" from="checkout" :roomId="roomId" :hotelId="hotel.id" :detailGoods="detailGoods"></room-panel>
  </div>
</template>
<style lang="less" scoped>
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
        align-items: center;
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
            padding:0.3rem 0 0.2rem 0.3rem;
            color: #252932;
            font-size: 0.35rem;
            span{
              color: #999999;
              line-height: 1rem;
            }
            .desc{
              color: #333333;
              span{
                font-size: 0.3rem;
                border: 1px solid #CCCCCC;
                border-radius: 24px;
                padding: 8px 16px;
                margin-right: 16px;
              }
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
        border-top: 1px solid #ccc;
        p{
          text-align: right;
          color: #252932;
          span{
            font-size: 0.37rem;
          }
          .price{
            font-size: 0.42rem;
            color: #C9AB5D;
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
      line-height: 0.6rem;
      margin-top: 0.2rem;
      font-size: 0.35rem;
      .font-color{
        color: #666;
      }   
      span:nth-child(2){
        color: #252932;
        text-align: right;
      }     
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
  import HotelCell from "./common/hotel-cell";
  import CheckoutPay from "../checkout/checkout-pay";
  import roomPanel from './room-panel.vue'
  import { clearInterval, setInterval } from 'timers';

export default{
  data () {
    return {
      isEnd:false,//倒计时是否结束
      endTime:'',
      payEndTime: '',
      orderId: this.$route.query.id,
      hotel: '',
      room: '',
      order:'',
      users: '',
      shopPhone: '',
      list: [],
      pickervalue: '',
      hackReset:false,
      surplusTime: '',
      detailGoods:JSON.parse(sessionStorage.getItem("detailGoods")),
      roomId:0
    }
  },
  components: {
    HotelCell,
    CheckoutPay,
    roomPanel,
  },
  created () {
    this.getdetail();
  },
  destroyed() {
    clearTimeout(this._inter)
  },
  beforeDestroy(){
      clearInterval(this.timer);
  },
  mounted(){
    if(sessionStorage.getItem('checkInDate')){
      this.pickervalue=[sessionStorage.getItem('checkInDate'),sessionStorage.getItem('checkOutDate')]
    }else{
      var day1 = new Date();
      day1.setDate(day1.getDate() +1);
      this.pickervalue=[new Date(),day1]
    }
  },
   computed: {
      //时间转换
      remaining: function (){
        var date = (new Date(this.order.surplusTime)) - (new Date());
          let minute = parseInt(date / 1000 / 60 % 60, 10);
          if (minute < 10) {
              minute = '0' + minute;
          }
          let second = parseInt(date / 1000 % 60, 10);
          if (second < 10) {
              second = '0' + second;
          }
          return minute + ' : ' + second;
      }
  },
  methods: {
    setEndTime(){
      var that = this;
      var date = (new Date(that.order.surplusTime)) - (new Date()); //计算剩余的毫秒数
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
      this.remainingTime();
  },
    getPhone () {
      if (this.hotel.officePhone == '' && this.hotel.officeTelphone != '') {
        this.shopPhone = this.hotel.officeTelphone
      } else if (this.hotel.officePhone != '' && this.hotel.officeTelphone == '') {
        this.shopPhone = this.hotel.officePhone
      } else if (this.hotel.officePhone != '' && this.hotel.officeTelphone != '') {
        this.shopPhone = this.hotel.officePhone
      }
    },
    payForGoods() {
      let postparam={
        TotalAmount: this.order.totalAmount,
        checkInDate: this.order.checkInDate.substring(0,this.order.checkInDate.length-5),
        checkOutDate: this.order.checkOutDate.substring(0,this.order.checkInDate.length-5),
        orderId:this.order.id,
        roomNumber:this.order.roomNumber,
        shopAndRoomName: this.hotel.frontName+'('+this.room.name+')',
        surplusTime: this.order.surplusTime
      }
      this.$go('/hotel/pay?orderId='+this.order.id)
    },
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
          this.request(this.api.HotelOrderCancel,{orderId:this.$route.query.id}).then(res => {
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
    getdetail(){
      this.request(this.api.HotelOrderDetail, {orderId: this.orderId}).then(res => {
        if(res.code==200){
          this.order=res.data.order;
          this.hotel=res.data.hotel;
          this.room=res.data.room;
          this.users=res.data.users;
          this.order.isdetail=true;
          if (this.order.status == 1) {
            this.setEndTime();
          }
          this.getTime()
          this.getPhone()
        }else{
          this.$toast(res.message,'error')
        }
      })
    },
     //倒计时
    remainingTime(){
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.payEndTime == '00:00') {
                clearInterval(this.timer);
                this.getdetail()
            }
            this.setEndTime()
        }, 1000);
    },
    getTime() {
        let fdate=new Date(this.pickervalue[0])
        let tdate=new Date(this.pickervalue[1])
        let temp=new Date(this.datefmt(tdate,'Y-M-d'))  -  new Date(this.datefmt(fdate,'Y-M-d'))
        this.daycount  =  parseInt(Math.abs(temp)  /  1000  /  60  /  60  /24)
        let weekstr=['日','一','二','三','四','五','六']
        sessionStorage.setItem('checkInDate',this.datefmt(fdate,'Y-M-d'))
        sessionStorage.setItem('checkOutDate',this.datefmt(tdate,'Y-M-d'))
    },
    datefmt(dateobj,fmt){
        var o = {
          "M+" : dateobj.getMonth()+1>9?dateobj.getMonth()+1:"0"+(dateobj.getMonth()+1),                 //月份
          "d+" :dateobj.getDate()>9?dateobj.getDate():"0"+dateobj.getDate(),                    //日
          "h+" : dateobj.getHours(),                   //小时
          "m+" : dateobj.getMinutes(),                 //分
          "Y+" : dateobj.getFullYear(),
          "s+" : dateobj.getSeconds(),                 //秒
          "q+" : Math.floor((dateobj.getMonth()+3)/3), //季度
          "S"  : dateobj.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
          fmt=fmt.replace(RegExp.$1, (dateobj.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
          if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      },
    showMerchants() {
        this.$createDialog({
            type: 'confirm',
            title: '提示',
            content: '确定拨打商家电话：'+this.shopPhone,
            confirmBtn: {
            text: '确认',
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
                this.callPhone(this.shopPhone)
            },
        }).show()
    },
    // 调用拨号功能
    callPhone (phoneNumber) {
      window.location.href = 'tel:' + phoneNumber
    },
     updateGoodsSpec (roomId) {
        this.request(this.api.Hoteltroom, {
          hotelId: this.hotel.id,
          roomId: this.room.id,
          checkInDate: sessionStorage.getItem('checkInDate'),
          checkOutDate: sessionStorage.getItem('checkOutDate')
        }).then(res => {
          if (res.code == 200) {
            this.$refs.room.showpop=true
            sessionStorage.setItem("detailGoods", JSON.stringify(res.data));
            this.detailGoods=res.data
          } else {
            this.$toast(res.message,'error')
          }
        })
    }
  }
}
</script>
