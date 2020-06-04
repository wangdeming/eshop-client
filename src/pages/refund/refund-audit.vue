<template>
    <div>
        <!-- 未发货 -->
        <!-- 审核通过 -->
        <div class="refund-audit" v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 4">
            <div class="content">
                <p>商家审核</p>
                <p>同意退款</p>
            </div>
            <div class="content">
                <p>审核时间</p>
                <p>{{refundDetail.reviewTime}}</p>
            </div>
        </div>
        <!-- 审核不通过 -->
        <div class="refund-audit" v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 3">
            <div class="content">
                <p>商家审核</p>
                <p>拒绝退款</p>
            </div>
            <div class="content">
                <p>审核时间</p>
                <p>{{refundDetail.reviewTime}}</p>
            </div>
            <div class="content" v-if="refundDetail.reviewRemark">
                <p>拒绝理由</p>
                <p>{{refundDetail.reviewRemark}}</p>
            </div>
        </div>
        <!-- 撤销退款 -->
        <div class="refund-audit" v-if="refundDetail.refundType == '仅退款' && refundDetail.refundStatus == 6">
            <div class="content">
                <p>撤销原因</p>
                <p>{{refundDetail.revokeReason}}</p>
            </div>
            <div class="content">
                <p>撤销时间</p>
                <p>{{refundDetail.revokeTime}}</p>
            </div>
        </div>
        <!-- 已发货 -->
        <!-- 审核通过 -->
        <div class="refund-audit" v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 2 && refundDetail.logistics.status == 1">
            <div class="content">
                <p>商家审核</p>
                <p>同意退货退款</p>
            </div>
            <div class="content">
                <p>审核时间</p>
                <p>{{refundDetail.reviewTime}}</p>
            </div>
        </div>
        <!-- 超时未填写 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 7">
            <div class="refund-audit">
                <div class="content">
                    <p>商家审核</p>
                    <p>同意退货退款</p>
                </div>
                <div class="content">
                    <p>审核时间</p>
                    <p>{{refundDetail.reviewTime}}</p>
                </div>
            </div>
            <div class="refund-audit">
                <div class="content">
                    <p>撤销原因</p>
                    <p>{{refundDetail.revokeReason}}</p>
                </div>
                <div class="content">
                    <p>撤销时间</p>
                    <p>{{refundDetail.revokeTime}}</p>
                </div>
            </div>
        </div>
        <!-- 等待收货 -->
        <div class="refund-audit" v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 2 && refundDetail.logistics.status == 2">
            <div class="content">
                <p>商家审核</p>
                <p>同意退款</p>
            </div>
            <div class="content">
                <p>审核时间</p>
                <p>{{refundDetail.reviewTime}}</p>
            </div>
            <div class="content">
                <p>退货时间</p>
                <p>{{refundDetail.logistics.deliveryTime }}</p>
            </div>
            <div class="content">
                <p>物流公司</p>
                <p>{{refundDetail.logistics.expressCompany}}</p>
            </div>
            <div class="content">
                <p>物流单号</p>
                <p>{{refundDetail.logistics.expressNo}}</p>
            </div>
            <div class="content" v-if="refundDetail.logistics.expressRemark">
                <p>物流说明</p>
                <p>{{refundDetail.logistics.expressRemark}}</p>
            </div>
            <div class="content" v-if="refundDetail.logistics.imgList">
                <p>物流凭证</p>
                <p><img class="ignore" :src="index" alt="" v-for="index in refundDetail.logistics.imgList"></p>
            </div>
        </div>
        <!-- 拒绝收货 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 8 && refundDetail.logistics.status == 4">
            <div class="refund-audit">
                <div class="content">
                    <p>商家审核</p>
                    <p>同意退款</p>
                </div>
                <div class="content">
                    <p>审核时间</p>
                    <p>{{refundDetail.reviewTime}}</p>
                </div>
                <div class="content">
                    <p>退货时间</p>
                    <p>{{refundDetail.logistics.deliveryTime}}</p>
                </div>
                <div class="content">
                    <p>物流公司</p>
                    <p>{{refundDetail.logistics.expressCompany}}</p>
                </div>
                <div class="content">
                    <p>物流单号</p>
                    <p>{{refundDetail.logistics.expressNo}}</p>
                </div>
                <div class="content" v-if="refundDetail.logistics.expressRemark">
                    <p>物流说明</p>
                    <p>{{refundDetail.logistics.expressRemark}}</p>
                </div>
                <div class="content" v-if="refundDetail.logistics.imgList">
                    <p>物流凭证</p>
                    <p><img class="ignore" :src="index" alt="" v-for="index in refundDetail.logistics.imgList"></p>
                </div>
            </div>
            <div class="refund-audit">
                <div class="content">
                    <p>商家审核</p>
                    <p>拒绝收货，不同意退款</p>
                </div>
                <div class="content">
                    <p>审核时间</p>
                    <p>{{refundDetail.logistics.rejectTime}}</p>
                </div>
                <div class="content" v-if="refundDetail.logistics.rejectReason">
                    <p>拒绝理由</p>
                    <p>{{refundDetail.logistics.rejectReason}}</p>
                </div>
            </div>
        </div>
        <!-- 完成退款 -->
        <div v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 4 && refundDetail.logistics.status == 3">
            <div class="refund-audit">
                <div class="content">
                    <p>商家审核</p>
                    <p>同意退款</p>
                </div>
                <div class="content">
                    <p>审核时间</p>
                    <p>{{refundDetail.reviewTime}}</p>
                </div>
                <div class="content">
                    <p>退货时间</p>
                    <p>{{refundDetail.logistics.deliveryTime}}</p>
                </div>
                <div class="content">
                    <p>物流公司</p>
                    <p>{{refundDetail.logistics.expressCompany}}</p>
                </div>
                <div class="content">
                    <p>物流单号</p>
                    <p>{{refundDetail.logistics.expressNo}}</p>
                </div>
                <div class="content" v-if="refundDetail.logistics.imgList">
                    <p>物流说明</p>
                    <p>{{refundDetail.logistics.imgList}}</p>
                </div>
                <div class="content" v-if="refundDetail.logistics.imgList">
                    <p>物流凭证</p>
                    <p><img class="ignore" :src="index" alt="" v-for="index in refundDetail.logistics.imgList"></p>
                </div>
            </div>
            <div class="refund-audit">
                <div class="content">
                    <p>商家审核</p>
                    <p>确认收货并退款</p>
                </div>
                <div class="content">
                    <p>确认收货时间</p>
                    <p>{{refundDetail.receiveTime}}</p>
                </div>
                <div class="content">
                    <p>退款时间</p>
                    <p>{{refundDetail.expectedTime }}</p>
                </div>
            </div>
        </div>

        <!-- 审核不通过 -->
        <div class="refund-audit" v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 3">
            <div class="content">
                <p>商家审核</p>
                <p>拒绝退款</p>
            </div>
            <div class="content">
                <p>审核时间</p>
                <p>{{refundDetail.reviewTime}}</p>
            </div>
            <div class="content" v-if="refundDetail.reviewRemark">
                <p>拒绝理由</p>
                <p>{{refundDetail.reviewRemark}}</p>
            </div>
        </div>
        <!-- 撤销退款 -->
        <div class="refund-audit" v-if="refundDetail.refundType == '退货退款' && refundDetail.refundStatus == 6">
            <div class="content">
                <p>撤销原因</p>
                <p>{{refundDetail.revokeReason}}</p>
            </div>
            <div class="content">
                <p>撤销时间</p>
                <p>{{refundDetail.revokeTime}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
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
                status: true
            }
        }
    }
</script>