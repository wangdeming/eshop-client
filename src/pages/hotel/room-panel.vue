<template>
  <Popup v-model="showpop">
  <div class="goods-spec-panel" v-if="showpop">
    <div class="top">
      {{detailGoods.name}}
      <svg class="icon" @click="closepanel">
        <use xlink:href="#icon-close"></use>
      </svg>
    </div>
    <div class="banner"  v-if="showpop">
      <cube-slide ref="slide" :data="detailGoods.roomImgList">
        <cube-slide-item v-for="(item,index) in detailGoods.roomImgList" :key="index" >
          <div class="goods-img">
            <img :src="item.img" class="ignore" width="100%">
          </div>
        </cube-slide-item>
      </cube-slide>
    </div>
    <div class="panel-goods">
      <div class="goods-info">
        <label>早餐</label><span>{{detailGoods.breakfastName}}</span>
      </div>
      <div class="goods-info">
        <label>宽带</label><span>{{detailGoods.broadbandName}}</span>
      </div>
      <div class="goods-info">
        <label>窗户</label><span>{{detailGoods.windowName}}</span>
      </div>
      <div class="goods-info">
        <label>面积</label><span>{{detailGoods.area}}㎡</span>
      </div>
      <div class="goods-info">
        <label>床宽</label><span>{{detailGoods.bedWidth}}m</span>
      </div>
      <div class="goods-info">
        <label>可住</label><span>{{detailGoods.person}}人</span>
      </div>
      <div class="goods-info">
        <label>取消方式</label><span>{{detailGoods.canCancelName}}</span>
      </div>
    </div>
    <div class="desc goodsContent" v-html="detailGoods.intro">

    </div>
    <div class="panel-footer" v-if="from!='checkout'">
      <div class="join-cart">￥{{detailGoods.price}}</div>
      <div class="buy-now" @click="buyNow">预订</div>
    </div>
  </div>
  </Popup>
</template>
<script type="text/ecmascript-6">
  import { Popup } from 'vux'
  export default {
    props: ['from','roomId'],
    data () {
      return {
        showpop:false,
        detailGoods:JSON.parse(sessionStorage.getItem("detailGoods")),
      }
    },
    components: {
      Popup,
    },
    methods: {
      closepanel(){
        this.showpop=false;
      },
      buyNow () {
          this.$go('/hotel/checkout')
      },
    },
    watch: {
      roomId: function (val) {
        let hotelId=this.$route.query.id?this.$route.query.id:this.detailGoods.shopId
        this.request(this.api.Hoteltroom, {
          hotelId: hotelId,
          roomId: val,
          checkInDate: sessionStorage.getItem('checkInDate'),
          checkOutDate: sessionStorage.getItem('checkOutDate')
        }).then(res => {
          if (res.code == 200) {
              sessionStorage.setItem("detailGoods", JSON.stringify(res.data));
              this.detailGoods=res.data
          }
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  @import '../../static/less/index';
  .goods-spec-panel {
    height: 12.7rem;
    background: white;
    font-size: 0.4rem;
    position: relative;
    overflow: scroll;

    .top {
      font-size: 0.45rem;
      line-height: 1.2rem;
      padding-left: 0.3rem;
      font-weight: 500;
      position: fixed;
      background: #fff;
      width: 100%;
      z-index: 999;
      .icon{
        position: fixed;
        padding-top: 0.4rem;
        right: 0.4rem;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .banner{
      width: 100%;
      height: 7rem;
      margin-top: 0.8rem;
    }
    .goods-img {
      width: 100%;
      height: 7rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .panel-goods {
      display: flex;
      padding: 0.4rem;
      line-height: 0.8rem;
      flex-wrap: wrap;
      border-bottom: 0.015rem solid #ccc;
      .goods-info {
        width: 50%;
        font-size: 0.4rem;
        label{
          color: #999;
        }
        span{
          padding-left: 0.4rem;
        }
      }
    }
    .desc{
      padding: 0.4rem;
      color: #999;
      margin-bottom: 1rem;
    }
    .panel-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      height: 90px;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
      width: 100%;
      .join-cart {
        width: 50%;
        float: left;
        font-weight: 600;
        font-size: 0.45rem;
        color: #DD3C3C;
        height: 100%;
        text-indent: 0.3rem;
        background: #fff;
        line-height: 90px;
      }
      .buy-now {
        width: 50%;
        float: left;
        text-align: center;
        background: #DD3C3C;
        font-size: 30px;
        color: #FFFFFF;
        height: 100%;
        line-height: 90px;
      }
    }
  }
</style>
