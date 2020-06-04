<template>
  <div class="center-order">
    <div class="order-header">
      <div class="header-left">
        <h4>我的订单</h4>
      </div>
      <div class="header-right" @click="$go('/order?from=-1')">
        <span>查看全部</span>
        <svg class="icon icon-next" ><use xlink:href="#icon-my_icon_more"></use></svg>
      </div>
    </div>
    <div class="order-content">
      <div class="content-item" @click="$go('/order?from=1')">
        <svg class="icon" ><use xlink:href="#icon-my_unpaid"></use></svg>
        <span>待付款</span>
        <span class="tip" v-if="ordernum.waitPay">{{ordernum.waitPay}}</span>
      </div>
      <div class="content-item" @click="$go('/order?from=2')">
        <svg class="icon" ><use xlink:href="#icon-my_deliver"></use></svg>
        <span>待发货</span>
        <span class="tip" v-if="ordernum.waitDelivery">{{ordernum.waitDelivery}}</span>
      </div>
      <div class="content-item" @click="$go('/order?from=3')">
        <svg class="icon" ><use xlink:href="#icon-my_take"></use></svg>
        <span>待收货</span>
        <span class="tip" v-if="ordernum.waitReceive">{{ordernum.waitReceive}}</span>
      </div>
      <div class="content-item" @click="$go('/order?from=4')">
        <svg class="icon" ><use xlink:href="#icon-my_evaluate"></use></svg>
        <span>待评价</span>
        <span class="tip" v-if="ordernum.waitEvaluate">{{ordernum.waitEvaluate}}</span>
      </div>
      <div class="content-item" @click="$go('/order-refund')">
        <svg class="icon" ><use xlink:href="#icon-my_sale"></use></svg>
        <span>退款/售后</span>
        <span class="tip" v-if="ordernum.cancelService">{{ordernum.cancelService}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .center-order{
    padding:0 28px;
    background: white;
    .order-header{
      border-radius: 0.2rem;
      margin-top: -0.5rem;
      background: #ffffff;
      position: relative;
      height: 104px;
      .header-left {
        position: absolute;
        top: 50%;
        left:  0.4rem;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        h4{
          font-size:0.4rem;
          font-weight: 600;
          color:#333;
        }
      }
      .header-right {
        position: absolute;
        top: 50%;
        right:  0.3rem;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 0.35rem;
        svg{
          width: 0.3rem;
        }
      }
    }
    .order-content{
      display: flex;
      .content-item{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-basis: calc(25% - 1rem / 5);
        font-size: 0.35rem;
        color: #666666;
        height: 166px;
        .tip{
          display: inline-block;
          position: absolute;
          padding: 0.07rem 0.15rem;
          border-radius: 1rem;
          font-size: 0.3rem;
          top: 0.3rem;
          left: 0.8rem;
          background: #DD3C3C;
          color: #fff;
        }
        .icon{
          width: 1rem;
          height: 0.8rem;
        }
        span{
          padding-top:10px;
          color:#666;
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default {
    props: ['ordernum'],
  }
</script>
