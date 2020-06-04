<template>
    <div :class="refundDetail.dclass?refundDetail.dclass:'refund-status'">
        <!-- 未发货 -->
        <!-- 处理退款 -->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 1">
            <h1>退款申请待商家处理</h1>
            <p>您已成功发起退货退款申请，商家将在<span>{{this.refundDetail.offTime}}</span>内处理。</p>
        </div>
        <!-- 同意退款 -->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 4">
            <h1>商家同意退款</h1>
            <p>退款金额将在3个工作日内返回您的支付账户，请注意查收到账信息。</p>
        </div>
        <!-- 拒绝退款-->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 3">
            <h1 class="refuse">商家拒绝退款</h1>
            <p>您可以通过底部联系方式和商家进行进一步沟通，然后重新申请。</p>
        </div>
        <!-- 撤销退款 -->
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 6">
            <h1>退款关闭</h1>
            <p>申请已撤销。如后续有问题，您可在订单页面再次发起退款申请。</p>
        </div>
        <!-- 未发货 -->
        <!-- 已发货 -->
        <!-- 处理退款 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 1">
            <h1>退货退款申请待商家处理</h1>
            <p>您已成功发起退货退款申请，商家将在<span>{{refundDetail.offTime}}</span>内处理。</p>
        </div>
        <!-- 同意退款 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 2 && refundDetail.logistics.status == 1">
            <h1>商家同意退货退款</h1>
            <p>您必须在<span>{{refundDetail.offTime}}</span>内响应，将商品退货到下方地址，并填写退货物流。逾期未处理本次申请将自动撤销。</p>
        </div>
        <!-- 逾期未填写退货物流 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 7">
            <h1>逾期未填写退货物流，系统自动撤销申请</h1>
            <p>您可以通过底部联系方式和商家进行进一步沟通，然后重新申请。</p>
        </div>
        <!-- 等待收货 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 2 && refundDetail.logistics.status == 2">
            <h1>等待商家确认收货并退款</h1>
            <p>您已退货，商家将在<span>{{refundDetail.offTime}}</span>内处理。</p>
        </div>
        <!-- 拒绝收货 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 8 && refundDetail.logistics.status == 4">
            <h1 class="refuse">商家拒绝收货，不同意退款</h1>
            <p>您可以通过底部联系方式和商家进行进一步沟通，然后重新申请。</p>
        </div>
        <!-- 退款成功 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 4 && refundDetail.logistics.status == 3">
            <h1>商家已确认收货并退款</h1>
            <p>退款金额将在3个工作日内返回您的支付账户，请注意查收到账信息。</p>
        </div>
        <!-- 审核不通过-->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 3">
            <h1 class="refuse">商家拒绝退款</h1>
            <p>您可以通过底部联系方式和商家进行进一步沟通，然后重新申请。</p>
        </div>
        <!-- 撤销退款 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 6">
            <h1>退款关闭</h1>
            <p>申请已撤销。如后续有问题，您可在订单页面再次发起退款申请。</p>
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
