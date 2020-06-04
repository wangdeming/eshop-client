<template>
    <div>
        <div class="refund-audit">
            <div class="content">
                <p>退换方式</p>
                <p>{{refundDetail.refundType}}</p>
            </div>
            <div class="content">
                <p>退款原因</p>
                <p>{{refundDetail.reason}}</p>
            </div>
            <div class="content">
                <p>退款金额</p>
                <p><span>￥{{refundDetail.amount}}</span>（含运费￥{{refundDetail.expressFee}}）</p>
            </div>
            <div class="content">
                <p>退款单号</p>
                <p>{{refundDetail.refundOrderNo}}</p>
            </div>
            <div class="content">
                <p>申请时间</p>
                <p>{{refundDetail.createdTime}}</p>
            </div>
            <div class="content" v-if="refundDetail.refundRemark">
                <p>退款说明</p>
                <p>{{refundDetail.refundRemark}}</p>
            </div>
            <div class="content" v-if="refundDetail.imgList">
                <p>申请凭证</p>
                <p><img class="ignore" :src="index" alt="" v-for="index in refundDetail.imgList"></p>
            </div>
        </div>
    </div>
</template>

<style  lang="less" scoped>
    .refund-audit{
        font-size: 30px;
        border-bottom: 1px solid #ccc;
        padding: 20px;
        .content{
            display: flex;
            padding: 8px 0;
            line-height: 40px;
            p:nth-child(1){
                color: #666666;
                flex-basis: 196px;
            }
            p:nth-child(2){
                flex: 1;
                span{
                    color: #DD3C3C;
                }
            }
            .ignore{
                width: 1.9rem;
                height: 1.9rem;
                margin: 0 .24rem .24rem 0;
                border-radius: 4px;
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: ['refundDetail'],
        data () {
            return {
            }
        }
    }
</script>
