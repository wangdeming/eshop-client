<template>
    <div class="refund-logistics">
        <div class="refund-item" @click="showReason">
            <div class="refund-left">
                <div class="left-top">
                <h4>物流公司<span>*</span></h4>
                </div>
            </div>
            <div class="refund-right">
                <div class="reason" :value="model.expressCompany">{{model.expressCompany}}</div>
                <img class="ignore" src="../../static/images/center/my_icon_more copy 3.svg" alt="">
            </div>
        </div>
        <div class="refund-item">
            <div class="refund-left">
                <div class="left-top">
                <h4>物流单号<span>*</span></h4>
                </div>
            </div>
            <div class="refund-right">
                <input type="text" placeholder="请输入物流单号" v-model="model.expressNo"/>
            </div>
        </div>
        <div class="refund-item explain-space">
            <div class="refund-left">
                <div class="left-top">
                <h4>物流说明</h4>
                </div>
            </div>
            <div class="refund-right">
                <cube-textarea
                v-model="model.expressRemark"
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
                    :simultaneous-uploads="1"/>
            </div>
        </div>
        <div class="btn-group">
            <button type="submit" @click="valid">提交</button>
        </div>
    </div>
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
    .refund-logistics{
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
            font-size: .2rem;
        }
        }
        .explain-space{
            position: relative;
            padding: 0.24rem 0.3rem!important;
        }
        .btn-group {
        button {
            display: block;
            width: 80%;
            margin: 0 auto;
            line-height: 0.9rem;
            border: none;
            margin-top: 0.5rem;
            border-radius: 1rem;
            background: #C9AB5D;
            color: #fff;
            margin-top: 1rem;
        }
        }
    }
</style>

<script type="text/ecmascript-6">
import Cookies from 'js-cookie'
import {API_BASE_URL, TOKEN_KEY} from '@/config/app'
  export default {
    data() {
      return {
        value: '',
        placeholder: '最多200字',
        maxlength: 200,
        autofocus: false,
        list: [],
        type:this.$route.query.type,
        money: 89.00,
        expressCompanys: [],
        model: {
          refundId: '',
          expressCompany: '请选择',
          expressNo: '',
          expressRemark: '',
          refundImg: ''
        },
        aaa: '',
        bbb: '',
        imgList: [],
        img: []
      }
    },
    computed: {
        action(){
            return {
            target: process.env.API_HOST + this.api.imageUpload,
            headers: {"X-Nideshop-Token": localStorage.getItem('token')}
            }
        }
    },
    created(){
        this.getList()
    },
    methods: {
        getList() {
            this.request(this.api.OrderListExpressCompanys).then(res => {
                if (res.code == 200) {
                    this.expressCompanys=res.data;
                }
            })
        },
        showReason() {
            if (!this.picker) {
                this.picker = this.$createPicker({
                title: '',
                data:  [this.expressCompanys],
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
            this.model.expressCompany = selectedText.join('')
        },
       valid(){
           if (this.model.expressCompany == '请选择') {
               this.$toast('物流公司不能为空', 'error')
           } else if (this.model.expressNo == '') {
               this.$toast('物流单号不能为空', 'error')
           } else {
               this.submit()
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
                refundId: this.$route.query.id,
                expressCompany: this.model.expressCompany,
                expressNo: this.model.expressNo,
                expressRemark: this.model.expressRemark,
                imgList: this.model.refundImg
            }
            this.request(this.api.OrderAddLogistics, this.postparam).then(res => {
                if (res.code == 200) {
                this.$go('/order')
                } else {
                this.$toast(res.message, 'error');
                }
            })
        }
     }
  }
</script>
