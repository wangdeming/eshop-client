<template>
    <page :better-scroll="true">
        <div class="refund-detail">
            <refund-status :refundDetail="refundDetail"></refund-status>
            <div class="refund-address" v-if="(refundDetail.refundStatus == 2 && refundDetail.refundType == '退货退款' && refundDetail.logistics.status == 1) || refundDetail.refundStatus == 7">
                <div class="left">退货地址：</div>
                <div class="right">
                    <p>{{refundDetail.logistics.consigneeName}}<span>{{refundDetail.logistics.consigneePhone}}</span></p>
                    <p>{{refundDetail.logistics.province}}{{refundDetail.logistics.city}}{{refundDetail.logistics.district}}{{refundDetail.logistics.address}}</p>
                </div>
            </div>
            <refund-logistics :orderDetail="refundGoodsDetail"></refund-logistics>
            <refund-mode :refundDetail="refundDetail"></refund-mode>
            <refund-audit :refundDetail="refundDetail"></refund-audit>
            <!-- 售后说明，退款申请中显示售后说明 -->
            <refund-explain :refundDetail="refundDetail"></refund-explain>
            <!-- 售后说明 -->
            <div class="spacing"></div>
        </div>
        <template slot="bottom">
            <div class="footer">
                <button class="logistics" @click="$go('/refund-delivery?id='+refundDetail.refundId)" v-if="refundDetail.refundStatus == 2 && refundDetail.refundType == '退货退款' && refundDetail.logistics.status == 1">填写物流</button>
                <!-- 商家拒绝显示重新申请 -->
                <button class="logistics" @click="toRefund(orderGoodsId)" v-if="refundDetail.refundStatus == 3 || refundDetail.refundStatus == 7 || refundDetail.refundStatus == 8">重新申请</button>
                <!-- 待商家处理显示撤销申请 -->
                <button @click="showRepeal" v-if="(refundDetail.refundStatus == 1 && refundDetail.applyNum <= 5) || (refundDetail.refundStatus == 2 && refundDetail.logistics.status == 1)">撤销申请</button>
                <button @click="showMerchants"><img class="ignore" src="../../static/images/order/phone.svg">联系商家</button>
            </div>

        </template>
    </page>
</template>



<script type="text/ecmascript-6">
    import refundStatus from './refund-status'
    import refundLogistics from './refund-logistics'
    import refundAudit from './refund-audit'
    import refundMode from './refund-mode'
    import refundExplain from './refund-explain'
    export default{
        components: {
            refundStatus,
            refundLogistics,
            refundAudit,
            refundMode,
            refundExplain
        },
        data () {
            return {
                refundDetail:[],
                refundGoodsDetail: [],
                status: true,
                content: '',
                orderGoodsId: this.$route.query.id
            }
        },
        created(){
            this.getList()
        },
        methods: {
            getList() {
                this.request(this.api.OrderGetRefundDetail, {orderGoodsId: this.orderGoodsId}).then(res => {
                    if (res.code == 200) {
                    this.refundDetail=res.data;
                    this.refundGoodsDetail=res.data.goods;
                    }
                    this.showContent()
                })
            },
            showContent() {
                if (this.refundDetail.applyNum == 5) {
                    this.content='这是您第5次退款申请，本次申请撤销后将不能再次发起退款申请。'
                } else {
                    this.content='撤销退款申请后，本次退款申请将关闭，如后续仍有问题，您可重新发起退款申请。'
                }
            },
            toRefund(data){
                this.request(this.api.OrderGetGoodsInfo4Refund, {orderGoodsId: data}).then(res => {
                if (res.code == 200) {
                    this.$router.push({ name: 'refund', params: { id: data}});
                } else {
                    this.$toast(res.message,'error')
                }
                })
            },
            showRepeal() {
                this.$createDialog({
                    type: 'confirm',
                    title: '',
                    content: this.content,
                    confirmBtn: {
                    text: '确认',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                    },
                    cancelBtn: {
                    text: '暂不撤销',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                    },
                    onConfirm: () => {
                        this.request(this.api.OrderRevoke,{refundId:this.refundDetail.refundId}).then(res => {
                            if(res.code==200){
                                this.$toast(res.message);
                                this.getList()
                            }
                        })
                    },
                }).show()
            },
            showMerchants() {
                this.$createDialog({
                    type: 'confirm',
                    title: '提示',
                    content: '确定拨打商家电话：'+this.refundDetail.shopPhone,
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
                        this.callPhone(this.refundDetail.shopPhone)
                    },
                }).show()
            },
            // 调用拨号功能
            callPhone (phoneNumber) {
                window.location.href = 'tel:' + phoneNumber
            }
        }
    }
</script>
<style lang="less" scoped>
    .refund-detail{
        .refund-address{
            font-size: 30px;
            border-bottom: 1px solid #ccc;
            padding: 20px;
            display: flex;
                .left{
                    flex-basis: 176px;
                    padding: 8px 0;
                }
                .right{
                    flex: 1;
                    p{
                        padding: 8px;
                        span{
                            color: #999999;
                            padding-left: 24px;
                        }
                    }
                }
        }
        .spacing{
            padding-bottom: 126px;
        }
    }
            .footer{
                background-color: #ffffff;
                border-top: 1px solid #cccccc;
                button{
                    display: block;
                    background: none;
                    border: 1px solid #cccccc;
                    color:#333333;
                    height: 0.9rem;
                    margin: 0.3rem 0.3rem 0.3rem 0;
                    border-radius: 0.7rem;
                    width: 24%;
                    float: right;
                    outline: none;
                    img{
                      margin: auto;  
                    }
                }
                .logistics{
                    border: 1px solid #C9AB5D;
                    color: #C9AB5D;
                }
            }
</style>
