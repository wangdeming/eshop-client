<template>
    <div :class="refundDetail.dclass?refundDetail.dclass:'refund-status'">
        <!-- 未发货 -->
        <!-- 处理退款 -->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 1">
            <p>退款申请待商家处理，还剩<span>{{this.refundDetail.offTime}}</span>。</p>
        </div>
        <!-- 同意退款 -->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 4">
            <p>商家同意退款退款</p>
        </div>
        <!-- 拒绝退款-->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 3">
            <p>商家拒绝退款</p>
        </div>
        <!-- 撤销退款 -->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 6">
            <p>退款申请已撤销。</p>
        </div>
        <!-- 未发货 -->
        <!-- 已发货 -->
        <!-- 处理退款 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 1">
            <p>退货退款申请待商家处理，还剩<span>{{refundDetail.offTime}}</span></p>
        </div>
        <!-- 同意退款 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 2 && refundDetail.logistics.status == 1">
            <p>商家同意退货退款，请在<span>{{refundDetail.offTime}}</span>内响应。</p>
        </div>
        <!-- 逾期未填写退货物流 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 7">
            <p>逾期未填写退货物流，系统自动撤销申请。</p>
        </div>
        <!-- 等待收货 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 2 && refundDetail.logistics.status == 2">
            <p>您已退货，商家将在<span>{{refundDetail.offTime}}</span>内处理。</p>
        </div>
        <!-- 拒绝收货 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 8 && refundDetail.logistics.status == 4">
            <h1 class="refuse">商家拒绝收货，不同意退款</h1>
            <p>您可以通过底部联系方式和商家进行进一步沟通，然后重新申请。</p>
        </div>
        <!-- 退款成功 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 4 && refundDetail.logistics.status == 3">
            <p>商家已确认收货并退款。</p>
        </div>
        <!-- 审核不通过-->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 3">
            <p>商家拒绝退款。</p>
        </div>
        <!-- 撤销退款 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 6">
          
            <p>退款申请已撤销</p>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .refund-status{
        padding: 40px 24px;
        border-bottom: 1px solid #ccc;
        h1{
            font-size: 32px;
            font-weight: bold;
            padding-bottom: .1rem;
        }
        p{
            font-size: 24px;
            line-height: 32px;
            color: #999999;
            letter-spacing: 0.13px;
            span{
                color: #DD3C3C;
            }
        }
        .refuse{
            color: #DD3C3C;
        }
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: ['refundDetail'],
        data () {
            return {
                status: true
            }
        }
    }
</script>
