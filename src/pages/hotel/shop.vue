<template>
  <page :better-scroll="false">
    <page-header slot="false"></page-header>
    <div class="banner" :style="{background:`url(${ShopInfo.logo}) center center no-repeat`}">
      <div class="score"> {{ShopInfo.score}}分</div>
    </div>
    <div class="desc">
      <div class="title">{{ShopInfo.frontName}}</div>
      <div class="location">
        <p class="p1">
          <svg class="icon licon">
            <use xlink:href="#icon-my_place"></use>
          </svg>
          <span>{{ShopInfo.address}}</span>
        </p>
        <p class="distance" @click="$go('/hotel/amap?lat='+ShopInfo.latitude+'&lng='+ShopInfo.longitude)">距离景区{{ShopInfo.distanceLingshan}}
          <svg class="icon">
            <use xlink:href="#icon-my_icon_more"></use>
          </svg>
        </p>
      </div>
      <div class="phone" @click="callphone">
        <p>
          <svg class="icon licon">
            <use xlink:href="#icon-002dianhua"></use>
          </svg>
          {{ShopInfo.phone}}
        </p>
        <svg class="icon" style="width: 0.35rem">
          <use xlink:href="#icon-my_icon_more"></use>
        </svg>
      </div>
    </div>
    <div class="room">
      <dpicker :type="3"  @getlist="getroomlist"></dpicker>
      <div class="rlabel">
        <span @click="roomfilter('order')" :class="{'active':order}">可订</span>
        <span @click="roomfilter('breakfast')" :class="{'active':breakfast}">含早餐</span>
        <span @click="roomfilter('window')" :class="{'active':window}">有窗</span>
        <span @click="roomfilter('canCancel')" :class="{'active':canCancel}">免费取消</span>
      </div>
      <div class="list">
          <room-cell-h :list="list" :hotelId="id"></room-cell-h>
      </div>
    </div>
    <div class="rate">
      <div class="ratetit">
        <span>用户点评&nbsp;&nbsp;{{ShopInfo.evaluateCount}}条</span>
        <span class="lrm" @click="isshowmoreval">查看全部<svg class="icon" style="width: 0.35rem"><use xlink:href="#icon-my_icon_more"></use></svg></span>
      </div>
      <div class="ratelist"  v-for="(item, key) in pageevaluate"  :key="key" v-if="key<3 || (key>=3 && showmoreval)">
        <div class="pic">
          <img :src="item.avatar">
        </div>
        <div class="content">
          <div class="ctop">
            <span>{{item.nickname}}</span>
            <span class="rtime">{{item.createdTime}}</span>
          </div>
          <div class="xing">
            {{item.score}}分
            <div class="cra">
              <cube-rate  v-model="item.score"  disabled="disabled"></cube-rate>
            </div>
            <span>{{item.roomName}}</span>
          </div>
          <div class="con">
            {{item.content}}
            <div class="pics">
              <div class="pic"  v-for="img in item.images">
                <img :src="img">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>
<style lang="less" scoped>
  @import '../../static/less/index';

  .banner {
    background-size: 100% 100% !important;
    height: 6.7rem;
    display: flex;
    .score {
      background: #fff;
      height: 0.3rem;
      padding: 0.15rem 0.3rem;
      margin-left: 0.3rem;
      margin-top: 5.6rem;
      border-radius: 1rem;
      color: #C9AB5D;
    }
  }

  .desc {
    background: #fff;
    padding: 0.4rem;
    .licon {
      padding-right: 0.2rem;
      width: 0.45rem;
    }
    .title {
      font-size: 0.53rem;
      font-weight: 600;
    }
    .location {
      display: flex;
      padding-top: 0.5rem;
      justify-content: space-between;
      font-size: 0.37rem;
      .p1{
        width: 64%;
        line-height: 0.47rem;
      }
      .distance {
        color: #999999;
        .icon {
          width: 0.35rem;
        }
      }
    }
    .phone {
      padding-top: 0.5rem;
      display: flex;
      justify-content: space-between;

    }

  }

  .room {
    background: #fff;
    margin-top: 0.3rem;
    .rlabel {
      padding: 0.4rem;
      span {
        background: #f8f8f8;
        padding: 0.15rem 0.3rem;
        border-radius: 0.3rem;
        font-size: 0.34rem;
        margin-right: 0.3rem;
        color: #333;
      }
      .active{
        background:  #C9AB5D;
        color: #fff;
      }
    }
  }

  .list {
    padding: 0.4rem;

  }

  .rate {
    margin-top: 0.3rem;
    background: #fff;
    .ratetit {
      padding: 0 0.3rem;
      line-height: 1.2rem;
      border-bottom: 0.015rem solid #ccc;
      display: flex;
      justify-content: space-between;
      .lrm {
        color: #999;
      }
    }
    .ratelist {
      padding: 0.4rem;
      display: flex;
      .pic {
        width: 0.6rem;
        height: 0.6rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .content {
        width: 100%;
        line-height: 0.8rem;
        padding-left: 0.2rem;
        border-bottom: 0.015rem solid #ccc;
        .ctop {
          display: flex;
          justify-content: space-between;
          &:first-child {
            color: #666;
          }
          .rtime {
            color: #999;
          }
        }
        .xing {
          color: #c9ab5d;
          display: block;
          line-height: 0.5rem;
          .cra {
            margin: 0.3rem;
            display: inline-block;
            width: 2.5rem;

          }
        }
        .con {
          font-size: 0.45rem;
          .pics {
            display: flex;
            .pic {
              margin: 0.4rem 0.3rem 0.4rem 0;
              width: 2rem;
              height: 2rem;
              img {
                width: 100%;
                height: 100%;
                border-radius: 0.3rem;
              }
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import pageHeader from '../common/page-header'
  import roomCellH from './room-cell-h.vue'
  import Dpicker from './dpicker'
  export default {
    components: {
      roomCellH,
      pageHeader,
      Dpicker
    },
    data() {
      return {
        id: 1,
        ShopInfo: [],
        list: [],
        pageevaluate:{},
        offset: 0,
        order:false,
        breakfast:false,
        window:false,
        canCancel:false,
        showmoreval:false,
      }
    },
    methods: {
      isshowmoreval(){
        this.showmoreval=true;
      },
      callphone(){
        if( this.ShopInfo.phone){
          window.location.href = 'tel:' +  this.ShopInfo.phone
        }
      },
      roomfilter(flag){
        if(flag=='order'){
          this.order=!this.order
        }
        if(flag=='breakfast'){
          this.breakfast=!this.breakfast
        }
        if(flag=='window'){
          this.window=!this.window
        }
        if(flag=='canCancel'){
          this.canCancel=!this.canCancel
        }
        this.getroomlist()
      },
      getroomlist(){
        this.request(this.api.Listroom, {
          hotelId: this.$route.query.id,
          checkInDate: sessionStorage.getItem('checkInDate'),
          checkOutDate: sessionStorage.getItem('checkOutDate'),
          order:Number(this.order),
          breakfast:Number(this.breakfast),
          window:Number(this.window),
          canCancel:Number(this.canCancel),
        }).then(res => {
          let data = null;
          if (res.data.hasOwnProperty('rows')) {
            data = res.data.rows;
          } else {
            data = res.data;
          }
          this.list = this.offset == 0 ? data : this.list.concat(data);
        });
      },
    },
    created () {
      this.id = this.$route.query.id
      this.request(this.api.Hotelhotel, {hotelId: this.$route.query.id}).then(res => {
        if (res.code == 200) {
          this.ShopInfo = res.data
          document.title=res.data.frontName
          if(this.ShopInfo.officeTelphone && this.ShopInfo.officePhone){
            this.ShopInfo.phone=this.ShopInfo.officeTelphone
          }else if(this.ShopInfo.officeTelphone && !this.ShopInfo.officePhone){
            this.ShopInfo.phone=this.ShopInfo.officeTelphone
          }else if(this.ShopInfo.officePhone && !this.ShopInfo.officeTelphone){
            this.ShopInfo.phone=this.ShopInfo.officePhone
          }else{
            this.ShopInfo.phone=''
          }
        }
      });
      this.request(this.api.HotelPageevaluate, {hotelId: this.$route.query.id,offset:0,limit:999}).then(res => {
        this.pageevaluate=res.data.rows
      });
    },
  }
</script>
