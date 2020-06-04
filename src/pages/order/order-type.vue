<template>
  <div class="order-top">
    <div class="category">
    </div>
      <div id="wrap" class="category">
          <div v-for="(list,index) in navLists" class="nav" :class="{ red:changeRed == index}" @click="reds(index)">{{list.text}}</div>
      </div>
    <div class="order-type" v-if="this.changeRed == 0">
      <div class="type-item" :class="{'type-item-active': currentType === -1}" @click="changeType(-1)">
        <span>全部订单</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentType === 1}" @click="changeType(1)">
        <span>待付款</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentType === 2}" @click="changeType(2)">
        <span>待发货</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentType === 3}" @click="changeType(3)">
        <span>待收货</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentType === 4}" @click="changeType(4)">
        <span>待评价</span>
      </div>
    </div>
    <div class="order-type" v-if="this.changeRed == 1">
      <div class="type-item" :class="{'type-item-active': currentHotelType === -1}" @click="changeHotelType(-1)">
        <span>全部</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentHotelType === 1}" @click="changeHotelType(1)">
        <span>待付款</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentHotelType === 2}" @click="changeHotelType(2)">
        <span>待确认</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentHotelType === 3}" @click="changeHotelType(3)">
        <span>待使用</span>
      </div>
      <div class="type-item" :class="{'type-item-active': currentHotelType === 4}" @click="changeHotelType(4)">
        <span>待评价</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        currentType: this.type,
        isShow: 1,
        currentHotelType: -1,
        navLists:[
            {
                "text":"特产"                     
            },
            {
                "text":"酒店"                     
            },
            {
                "text":"门票"                        
            }
        ],
        changeRed:0
      }
    },
    props: ['type'],
    methods: {
      reds(index){
          this.changeRed = index;
          this.$emit('isShow', this.changeRed)
      },
      changeType(n) {
        // return this.$go('/order?from='+n)
        this.currentType = n
        this.$emit('current-type', n)
      },
      changeHotelType(n) {
        this.currentHotelType = n
        this.hotelType = n
        this.$emit('current-HotelType', n)
      },
    }
  }
</script>

<style lang="less" scoped>
  .box{
      height: 40px;
      background: cyan;
  }
  .nav{
      font-size: 0.35rem;
      color: #C9AB5D;
      justify-content: center;
      border: 1px solid  #C9AB5D;
      position: relative;
      width: 30%;
      line-height: 0.7rem;
      display: flex;
      align-items: center;
      flex-grow: 0;
      &:first-child{
        border-radius: 0.2rem 0 0  0.2rem;
      }
      &:last-child{
        border-radius:0 0.2rem 0.2rem 0;
      }
  }
  .red{
      background: #c9ab5d;
      color: #fff;
  }
  .order-top {
    background: white;
    padding-top: 0.4rem;
    .category {
      display: flex;
      justify-content: center;
      .item {
        font-size: 0.35rem;
        color: #C9AB5D;
        justify-content: center;
        border: 1px solid  #C9AB5D;
        position: relative;
        width: 30%;
        line-height: 0.7rem;
        display: flex;
        align-items: center;
        flex-grow: 0;
        &:first-child{
          background: #C9AB5D;
          color: #ffffff;
          border-radius: 0.2rem 0 0  0.2rem;
        }
        &:last-child{
          border-radius:0 0.2rem 0.2rem 0;
        }
      }
    }
    .order-type {
      display: flex;
      height: 1.33rem;
      justify-content: space-between;
      padding: 0 28px;
      .type-item {
        position: relative;
        display: flex;
        align-items: center;
        flex-grow: 0;
        font-size: 0.4rem;
        span {
          color: #999999;
        }
        &-active {
          span {
            color: #C9AB5D;
          }
          &::after {
            position: absolute;
            content: '';
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            border-bottom: 0.15rem solid #C9AB5D;;
            transform: scaleY(0.5);
          }
        }
      }
    }
  }
</style>
