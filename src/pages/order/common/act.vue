<template>
  <div class="action-btns" >
    <span v-if="item.status==1" @click="cancel">取消</span>
    <span v-if="item.status==1" @click="$go('/order/detail?id='+orderId)">去支付</span>
    <span v-if="item.status==4" @click="$go('/evaluate?orderId='+orderId)">评价</span>
    <span v-if="item.status==2 || item.status==3 || item.status==4"  @click="$go('/evaluate?orderId='+orderId)">查看物流</span>
    <span v-if="item.status==3"  @click="confirm">确认收货</span>
    <span v-if="item.status==2 || item.status==3 || item.status==4"  @click="addtocar">再来一单</span>
  </div>
</template>

<script>
    export default {
      props: ['orderId'],
      methods:{
        cancel(){
          this.request(this.api.OrderCancel,{orderId:this.orderId}).then(res => {
            if(res.code==200){
              this.$toast(res.message);
              this.$emit('actsuccess')
            }
          })
        },
        confirm(){
          this.request(this.api.OrderConfirm,{orderId:this.orderId}).then(res => {
            if(res.code==200){
              this.$toast(res.message);
              this.$emit('actsuccess')
            }
          })
        },
        addtocar(){
          this.request(this.api.OrderAddToCar,{orderId:this.orderId}).then(res => {
            if(res.code==200){
              this.$go('/cart');
            }
          })
        },
      }
    }
</script>

<style lang="less" scoped>
  .action-btns{
    background: #FFFFFF;
    display: flex;
    box-shadow: inset 0 0 0 0 rgba(0,0,0,0.25);
    align-items: center;
    span{
      display: inline-block;
      width:170px;
      height: 60px;
      box-sizing: border-box;
      line-height: 60px;
      text-align: center;
      border-radius: 3rem;
      border:1px solid rgb(204, 204, 204);
      color:#666;
      &:not(:first-child){
        margin-left:20px;
      }
      &:last-child{
        color:#C9AB5D ;
        border-color:#C9AB5D ;
      }
    }
</style>
