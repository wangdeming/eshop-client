<template>
    <div class="refund-explain">
        <div v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 1">
            <h1>售后说明</h1>
            <p>如果商家同意，你的申请将达成并获得退款。</p>
            <p>如果商家拒绝，您可以通过底部联系方式和商家进行进一步沟通。</p>
            <p>如果商家逾期未处理，你的申请会自动达成并获得退款。</p>
        </div>
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 1">
            <h1>售后说明</h1>
            <p>如果商家同意，请按照给出的退货地址退货。</p>
            <p>如果商家拒绝，您可以通过底部联系方式和商家进行进一步沟通。</p>
            <p>如果商家逾期未处理，请按照系统给出的退货地址退货。</p>
        </div>
        <div v-if="refundDetail.logistics">
            <div v-if="refundDetail.refundType == '退货退款' && refundDetail.logistics.status == 2">
                <h1>售后说明</h1>
                <p>如果商家确认收货，将会退款给您。</p>
                <p>如果商家拒绝收货，您可以通过底部联系方式和商家进行进一步沟通。</p>
                <p>如果商家逾期未处理，系统将自动确认收货并退款给您。</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: ['refundDetail'],
        data () {
            return {}
        }
    }
</script>
<style lang="less" scoped>
    .refund-explain{
        font-size: 32px;
        padding: 24px;
        h1{
            font-weight: bold;
            padding-bottom: 24px;
        }
        p{
            font-size: 30px;
            line-height: 40px;
        }
    }
</style>