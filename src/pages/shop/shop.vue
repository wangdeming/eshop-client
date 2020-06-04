<template>
  <page :better-scroll="false" page-background="white">
    <page-header slot="false"></page-header>
    <cube-scroll
      ref="scroll"
      :scrollEvents="['scroll']"
      @scroll="onScroll"
      :data="list"
      :options="scrollOptions"
      @pulling-up="onPullingUp">
      <div  class="banner"  :style="{background:`url(${ShopInfo.coverUrl}) center center no-repeat`}">
        <div class="logo">
          <img class="ignore" :src="ShopInfo.logoUrl">
        </div>
        <div class="decri">
          <p class="title" v-html="ShopInfo.frontName"></p>
          <p  v-html="ShopInfo.intro"></p>
        </div>
      </div>
      <m-floor title="最新商品" isLink="true" >
        <div slot="header-r" @click="$go('/goods-by-shop?id='+id)">
          更多商品
          <svg class="icon" ><use xlink:href="#icon-my_icon_more"></use></svg>
        </div>
        <div class="goods-by-category-list" slot="content">
          <div class="list-item"
               :key="key"
               v-for="(item, key) in list">
            <goods-by-category-list-goods :info="item" ></goods-by-category-list-goods>
          </div>
        </div>
      </m-floor>
      <nonepage text="未搜索到相关内容" v-if="list.length<1" icon="#icon-search1"></nonepage>
    </cube-scroll>
    <div class="all">
      <div class="shop-top" @click="$go('/specialty')">
        <svg class="ignore-img">
          <use xlink:href="#icon-specialty_nor"></use>
        </svg>
        <p>特产</p>
      </div>
      <div class="shop-top" @click="$go('/cart')">
        <span class="tip" v-if="cartnum" v-html="cartnum"></span>
        <svg class="ignore-img">
          <use xlink:href="#icon-my_car"></use>
        </svg>
        <p>购物车</p>
      </div>
    </div>
  </page>
</template>
<style lang="less" scoped>
  @import '../../static/less/index';
   .banner{
     background-size: 100% 100% !important;
     height: 4.7rem;
     display: flex;
     .logo{
       margin: 1rem 0 0  0.5rem;
       width:2.4rem;
       height: 2.4rem;
       .ignore{
         width:100%;
         height:100%;
         border-radius: 50%;
       }
     }
     .decri{
       color: #fff;
       line-height: 0.5rem;
       padding: 1.8rem 0.5rem;
       width: 55%;
       .title{
         font-size: 0.45rem;
         font-weight: 600;
         line-height: 0.7rem;
       }
     }
   }
  .goods-by-category-list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      flex-basis: calc(50% - 20px / 2);
      width: 0;
      padding-bottom: 20px;
      &:nth-child(2n) {
        padding-left: 20px;
      }
    }
  }
  .all {
    position: fixed;
    right: 0;
    bottom: 0.5rem;
    z-index: 2;
    padding: 0 0.75rem;
    .shop-top {
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      background-color: #fff;
      margin-top: 0.53rem;
      border-radius: 50%;
      box-shadow: 0 0.05rem 0.22rem 0 rgba(0, 0, 0, 0.27);
      .tip {
        display: inline-block;
        position: absolute;
        padding: 0.07rem 0.15rem;
        border-radius: 1rem;
        font-size: 0.3rem;
        top: 0.1rem;
        left: 0.7rem;
        background: #DD3C3C;
        color: #fff;
      }
    }
    .ignore-img {
      width: 0.64rem;
      height: 0.61rem;
      margin-left: 0.43rem;
      margin-bottom: -0.55rem;
    }
    p {
      width: 1.28rem;
      height: 0.38rem;
      font-size: 0.27rem;
      color: #999;
      letter-spacing: 0.003rem;
      text-align: center;
      margin-top: 0.65rem;
      margin-left: 0.12rem;
    }

  }
</style>
<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
import pageHeader from '../common/page-header'
import nonepage from '../common/nonepage'
import goodsByCategoryListGoods from '../goods-by-category/common/goods-by-category-list-goods'
export default {
  components: {
    goodsByCategoryListGoods,
    pageHeader,
    nonepage
  },
  data() {
    return {
        id:1,
        ShopInfo: [],
        list:[],
        offset:0,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据',

    }
  },
  computed: {
    ...mapState('common', ['cartnum']),
    scrollOptions () {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: false
      }
    },
    pullUpLoadObj () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    },
  },
  watch: {
    offset: function() {
      this.getlist();
    },
    urlparams:function(){
      this.offset=0;
      this.getlist();
    }
  },
  methods: {
    ...mapActions('common', ['getcartnum']),
    onScroll (pos) {
      if (pos.y < -150) {
        this.showWhiteTitle = true;
      } else {
        this.showWhiteTitle = false
      }
    },
    onPullingUp () {
      this.offset+=8;
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)

    },
    getlist(){
      const _this=this;
      this.request(this.api.listShopGoods,{shopId:this.$route.query.id,offset:this.offset,limit:8}).then(res => {
        _this.pullUpLoad = false;
        let data=null;
        if(res.data.hasOwnProperty('rows')){
          data=res.data.rows;
        }else{
          data=res.data;
        }
        if(data.length){
          _this.pullUpLoad = true;
        }
        this.list=this.offset==0?data:this.list.concat( data);
      });
    },
  },
  created () {
    this.id=this.$route.query.id
    this.request(this.api.ShopInfo,{shopId:this.$route.query.id}).then(res => {
      if (res.code == 200) {
        this.ShopInfo = res.data
      }
    });
    this.getlist();
    this.getcartnum();
  },
}
</script>
