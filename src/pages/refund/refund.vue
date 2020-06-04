<template>
  <page :better-scroll="true">
    <div>
        <refund-goods :orderDetail="orderGoodsDetail" v-on:listenNum="showNum" :order="orderGoods" :orderStatus="orderStatus"></refund-goods>
        <div class="refund">
          <div class="refund-item">
            <div class="refund-left">
              <div class="left-top">
                <h4>退款方式</h4>
              </div>
            </div>
            <div class="refund-right">
              <p v-if="orderGoods.deliveryStatus=='已发货'">退货退款</p>
              <p v-if="orderGoods.deliveryStatus=='待发货'">仅退款</p>
            </div>
          </div>
          <div class="refund-item" @click="showReason">
            <div class="refund-left">
              <div class="left-top">
                <h4>退款原因<span>*</span></h4>
              </div>
            </div>
            <div class="refund-right">
              <div class="reason" :value="reason">{{reason}}</div>
              <img class="ignore" src="../../static/images/center/my_icon_more copy 3.svg" alt="">
            </div>
          </div>
          <div class="refund-item">
            <div class="refund-left">
              <div class="left-top">
                <h4>退款金额<span>*</span></h4>
              </div>
            </div>
            <div class="refund-right">
              <input :protected-selection="protectedSelection" v-model="model.refundMoney"
              @keydown.delete="onDeleteKeyDown" style="color: #dd3c3c;"/>
            </div>
          </div>
          <div class="refund-item">
              <span>最多可退￥{{orderGoods.amount}}（含运费￥{{orderGoods.expressFee}}）</span>
          </div>
          <div class="refund-item">
            <div class="refund-left">
              <div class="left-top">
                <h4>联系方式</h4>
              </div>
            </div>
            <div class="refund-right">
              <input v-model="orderGoods.phone"/>
            </div>
          </div>
          <div class="refund-item explain-space">
            <div class="refund-left">
              <div class="left-top">
                <h4>退款说明</h4>
              </div>
            </div>
            <div class="refund-right">
              <cube-textarea
              v-model="model.refundExplain"
              :placeholder="placeholder"
              :maxlength="maxlength"
              :autofocus="autofocus"
              ></cube-textarea>
            </div>
          </div>
          <div class="refund-item">
            <div class="refund-left top-space">
              <div class="left-top">
                <h4>上传凭证</h4>
              </div>
            </div>
            <div class="refund-right" style="flex-basis: 7rem;">
              <cube-upload
                  :action="action"
                  :max=5
                  v-model="img"
                  :simultaneous-uploads="1" />
            </div>
          </div>
          <div class="space"></div>
        </div>
    </div>
    <template slot="bottom">
      <div class="submit" @click="valid">
          提交
      </div>
    </template>
  </page>
</template>

<style scoped>
  .refund-right >>>textarea{
    text-align: right;
    font-size: 0.4rem;
  }
  .top-space{
    position: relative;
  }
  .top-space .left-top{
    position: absolute;
    top: 0;
  }
</style>

<style lang="less" scoped>
.refund{
    position: relative;
    background: #fff;
    height: 100%;
    .refund-item{
    display: flex;
    padding:0.5rem 0.3rem;
    font-size: 0.4rem;
    .refund-left{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex:1;
      .left-top{
        display: flex;
        color:#333;
        span{
          color: #C9AB5D;
          font-size: 24px;
        }
      }
    }
    .refund-right{
      display: flex;
      align-items: center;
      flex-grow: 0;
      padding-left:20px;
        input {
            outline: none;
            text-align: right;
        }
        .refund-money{
          color: #dd3c3c;
        }
        .reason{
            padding-right: 0.3rem;
        }
    }
    span{
        color: #999999;
        font-size: 0.35rem;
    }
    }
    .explain-space{
      position: relative;
      padding: 0.24rem 0.3rem!important;
    }
    .space{
      padding-bottom: 100px;
    }
  }
  .submit{
    font-size: .4rem;
    color: #ffffff;
    height: 90px;
    line-height: 90px;
    text-align: center;
    background: #C9AB5D;
    width: 100%;
  }
</style>

<script type="text/ecmascript-6">
import refundGoods from './refund-goods'
import Cookies from 'js-cookie'
import {API_BASE_URL, TOKEN_KEY} from '@/config/app'
export default{
  data () {
    return {
      orderGoodsId: this.$route.params.id,
      orderStatus: this.$route.params.status,
      protectedSelection: '0,1', // 起点为：0，终点为上述 str 初始值的长度：1
      orderGoods:'',
      orderGoodsDetail: '',
      placeholder: '最多200字',
      maxlength: 200,
      autofocus: false,
      list: [],
      reason: '请选择',
      reasonId: '',
      goodsNum: '',
      model: {
        refundMoney: 0,
        refundExplain: '',
        refundImg: ''
      },
      imgList: [],
      img:[]
    }
  },
  computed: {
    action(){
      return {
      target: process.env.API_HOST + this.api.imageUpload,
      headers: {"X-Nideshop-Token":localStorage.getItem('token')}
      }
    },
    protectedSelectionStart () {
      return parseInt(this.protectedSelection.split(',')[0])
    },
    protectedSelectionEnd () {
      return parseInt(this.protectedSelection.split(',')[1])
    }
  },
  components: {
    refundGoods
  },
  created(){
    this.getList()
  },
  methods: {
    showNum:function(data){
      this.goodsNum=data
    },
    onDeleteKeyDown (e) {
      const {target} = e
      // 如果包含不能删除的区域，禁止
      if (this.isContainsProtectedSelection(target.selectionStart, target.selectionEnd)) {
        e.preventDefault()
      }
    },
    isContainsProtectedSelection (start, end) {
      // 第二个或条件这里其实没必要，因为假设不能删除的字符串就在开头
      // 如果字符串位置不固定，那么是需要的，且 props 的 protectedSelection 也需要动态计算
      return !(start > this.protectedSelectionEnd || end < this.protectedSelectionStart)
    },
    getList() {
      this.request(this.api.OrderGetGoodsInfo4Refund, {orderGoodsId: this.orderGoodsId}).then(res => {
        if (res.code == 200) {
          this.orderGoods=res.data;
          this.orderGoodsDetail=res.data.goods;
          this.model.refundMoney='￥'+res.data.amount;
          this.orderGoodsId=res.data.orderGoodsId;
          this.goodsNum=res.data.goods.num
        }
      })
    },
    showReason() {
        if (!this.picker) {
          this.picker = this.$createPicker({
          title: '',
          data:  [this.orderGoods.reasonList],
          alias: {
              value: 'num',
              text: 'name'
          },
          onSelect: this.selectHandle,
          })
        }
        this.picker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
          this.reason = selectedText.join('')
          this.reasonId = selectedVal.join('')
      },
      valid () {
        if (this.model.refundMoney.substr(1) <= this.orderGoods.amount) {
          this.submit()
        } else {
          this.$toast('不能大于最多可退金额', 'error');
        }
      },
      submit() {
        this.imgList=[]
        this.model.refundImg=[]
        for (let index = 0; index < this.img.length; index++) {
          const element = this.img[index];
          this.imgList.push(element.response.data.path)
          this.model.refundImg=this.imgList.join(',');
        }
          this.postparam = {
            orderGoodsId: this.orderGoodsId,
            reasonId: this.reasonId,
            goodsNum: this.goodsNum,
            amount: this.model.refundMoney.substr(1),
            phone: this.orderGoods.phone,
            refundRemark: this.model.refundExplain,
            imgList: this.model.refundImg
          }
          this.request(this.api.OrderApplyRefund, this.postparam).then(res => {
            if (res.code == 200) {
              this.$go('/order')
            } else {
              this.$toast(res.message, 'error');
            }
          })
      }
  },
}
</script>
