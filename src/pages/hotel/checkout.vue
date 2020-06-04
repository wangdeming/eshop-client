<template>
  <div class="checkout">
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
    <div class="info">
      <div class="top">
        <span class="title">{{detailGoods.name}}</span>
        <span class="rdetail"  @click="getroomPanel">房间详情</span>
      </div>

      <dpicker :type="4" ref="dp"></dpicker>
      <div class="labels">
        <span>{{detailGoods.breakfastName}}</span>
        <span>{{detailGoods.windowName}}</span>
        <span>{{detailGoods.canCancelName}}</span>
      </div>
    </div>
    <div class="room">
      <p class="tit">预订信息</p>
      <div class="myfield">
        <div class="numcon">
          <cube-form-item :field="fields[0]"></cube-form-item>
          <div class="goodsNumAction">
            <span class="buy-num-minus" @click="minusNum">-</span>
            <span id="buyNum" class="buy-num-num">{{num}}</span>
            <span class="buy-num-add" @click="addNum">+</span>
          </div>
        </div>
        <div class="tourists">
          <div>
            <cube-form-item :field="fields[2]"></cube-form-item>
            <cube-form-item v-for="(item,k) in fields" :key="k" :field="item" v-if="k>2"></cube-form-item>
            <cube-form-item :field="fields[1]"></cube-form-item>
          </div>
          <svg class="icon"  @click="gettouristPanel">
            <use xlink:href="#icon-tongxunlu"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="invoice">
      <div class="left">
        发票<br/><br/>
        扣款说明
      </div>
      <div class="right">
        如需发票，请向酒店前台索取<br/><br/>
        <span v-if="detailGoods.canCancel==0">
          该订单确认后不可被取消，若未入住将收
          取您全额房费，订单需等酒店确认后生效，
          订单确认结果将以短信通知到您。
        </span>
        <span v-else>
          该订单在入住当天14点前可免费取消，订单需等酒店确认后生效，
          订单确认结果将以短信通知到您。
        </span>
      </div>
    </div>
    <div class="panel-footer">
      <div class="join-cart">￥{{detailGoods.price* num*dcount}}</div>
      <button class="buy-now" type="submit">提交订单</button>
    </div>
    </cube-form>
    <Popup v-model="showpop"><tourist-panel></tourist-panel></Popup>
    <room-panel ref="room" from="checkout" :roomId="roomId"></room-panel>
  </div>
</template>
<style lang="less" scoped>
.checkout{
  .cube-form{
    background: none;
    .cube-form-item{
      padding: 0;
    }
  }
  background-image: linear-gradient(-180deg, #C9AB5D 0%, #FFFFFF 100%);
  border-radius: 1px;
  height: 100%;
  font-size: 0.4rem;
  padding: 0.4rem 0.3rem;
  color: #333;
  .info{
    background: #fff;
    border-radius: 0.2rem;
    padding: 0.4rem;
    .top{
      display: flex;
      justify-content: space-between;
      .title{
        font-size: 0.5rem;
        font-weight: 600;
      }
      .rdetail{
        font-size: 0.34rem;
        color: #C9AB5D;
      }
    }
    .times{
      line-height: 1.3rem;
    }
    .labels{
      padding: 0.1rem 0;
      span{
        border: 0.015rem solid #ccc;
        padding: 0.1rem 0.2rem;
        border-radius: 0.3rem;
        margin-right: 0.2rem;
        font-size: 0.37rem;
      }
    }
  }
  .room {
    background: #fff;
    border-radius: 0.2rem;
    margin-top: 0.3rem;
    padding: 0.4rem;
    .tit{
      font-size: 0.45rem;
      font-weight: 500;
    }
    .myfield{
      .numcon{
        display: flex;
        justify-content: space-between;
        .goodsNumAction{
          margin-top: 0.2rem;
          width: 3.27rem;
          height: 48px;
          line-height: 48px;
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
            background: #C9AB5D;
            border-radius: 6px;
            font-size: 38px;
            color: #fff;
            line-height: 48px;
            text-align: center;
          }
        }
      }
      .tourists{
        display: flex;
        .icon{
          margin-top: 0.25rem;
          margin-left: 0.3rem;
        }
      }
    }
  }
  .invoice{
    display: flex;
    background: #fff;
    border-radius: 0.2rem;
    margin-top: 0.3rem;
    padding: 0.4rem;
    .left{
      width: 6rem;
      color: #666;
    }
    .right{
      color: #000;
    }
  }
  .panel-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 90px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    width: 100%;
    .join-cart {
      width: 50%;
      float: left;
      font-weight: 600;
      font-size: 0.45rem;
      background: #fff;
      color: #DD3C3C;
      height: 100%;
      text-indent: 0.3rem;
      line-height: 90px;
    }
    .buy-now {
      width: 50%;
      float: left;
      text-align: center;
      background: #DD3C3C;
      font-size: 30px;
      border: none;
      color: #FFFFFF;
      height: 100%;
      line-height: 90px;
    }
  }
}
</style>
<script type="text/ecmascript-6">
  import Dpicker from './dpicker'
import touristPanel from './tourist-panel.vue'
  import roomPanel from './room-panel.vue'
import { Popup } from 'vux'
export default {
  components: {
    touristPanel,
    Popup,
    Dpicker,
    roomPanel
  },
  data() {
    return {
      detailGoods:JSON.parse(sessionStorage.getItem("detailGoods")),
      showpop:false,
      showroompop:false,
      num:1,
      orderUserList:[],
      dcount:1,
      roomId:0,
      fields: [
        {
          type: "input",
          modelKey: "num",
          label: "房间数",
          props: {
            readonly:"readonly"
          },
          rules: {
            required: true,
          }
        },
        {
          type: "input",
          modelKey: "mobile",
          label: "联系电话",
          props: {
            placeholder: "请输入联系方式"
          },
          rules: {
            required: true,
          }
        },
        {
          type: "input",
          modelKey: "idCardNo1",
          label: "入住人1",
          props: {
            placeholder: "每间需填1人"
          },
          rules: {
            required: true,
          }
        },
      ],
      model:{
        num:'',
        mobile:'',
        idCardNo1:'',
      }
    }
  },
  methods: {
    gettouristPanel () {
        this.showpop=true
    },
    getroomPanel () {
        this.roomId=this.detailGoods.id
        this.$refs.room.showpop=true
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    submitHandler(e) {
      e.preventDefault();
      let templist=[]
      for (var i=0;i<this.num;i++) {
        templist[i]=this.orderUserList[i]
        if(this.orderUserList[i]){
          templist[i].realname=this.model["idCardNo" + (i + 1)]
        }else {
          templist[i] = {'realname': this.model["idCardNo" + (i + 1)]}
        }
      }
      let postparam={
        roomId:this.detailGoods.id,
        checkInDate: sessionStorage.getItem('checkInDate'),
        checkOutDate: sessionStorage.getItem('checkOutDate'),
        roomNumber:this.num,
        mobile:this.model.mobile,
        payType:1,
        wechatPayType:'JSAPI',
        orderUserListString:JSON.stringify(templist)
      }
      this.request(this.api.Hotelcreateorder, postparam).then(res => {
        if (res.code == 200) {
          this.$go('/hotel/pay?orderId='+res.data.orderId)
        }else{
          this.$toast(res.message,'error');
        }
      })
    },
    addNum(){
      if(this.detailGoods.roomNumber<=this.num){
          return this.$toast('房间数已满')
      }
      this.num+=1;
      this.$set(this.model,"idCardNo"+this.num,'')
      this.fields.push({
        type: "input",
        modelKey: "idCardNo"+this.num,
        label: "入住人"+this.num,
        props: {
          placeholder: "每间需填1人"
        },
        rules: {
          required: true,
        }
      })
    },
    minusNum(){
      if(this.num<=1){
        return this.$toast('入住人必填至少一个')
      }
      delete this.model["idCardNo"+this.num];
      this.num-=1;
      this.fields.pop()
    }
  },
  mounted () {
    this.$set(this.model,"num",'剩余'+this.detailGoods.roomNumber+'间')
    let temp=new Date(sessionStorage.getItem('checkOutDate'))-new Date( sessionStorage.getItem('checkInDate'))
    this.dcount  =  parseInt(Math.abs(temp)  /  1000  /  60  /  60  /24)
    document.title=this.detailGoods.shopName
  },
}
</script>
