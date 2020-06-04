<template>
  <page :better-scroll="false">
    <template slot="extra-top">
      <order-type
        :type="type"
        @current-type="currentType"
        @isShow="getShow"
        @current-HotelType="currentHotelType"></order-type>
    </template>

      <nonepage text="暂无订单" v-if="list.length<1 && this.isShow == 0" icon="#icon-order"></nonepage>
      <cube-scroll 
        ref="scroll"
        :scrollEvents="['scroll']"
        @scroll="onScroll"
        :data="list"
        :options="scrollOptions"
        @pulling-up="onPullingUp"  v-if="this.isShow == 0">
        <order-cell v-if="list.length>0" v-for="item in list" :key="item.id" @getList="getOffset" :item="item" ></order-cell>
      </cube-scroll>

      <nonepage text="暂无订单" v-if="hotelList.length<1 && this.isShow == 1" icon="#icon-order"></nonepage>
      <cube-scroll
        ref="scroll"
        :scrollEvents="['scroll']"
        @scroll="onScroll"
        :data="hotelList"
        :options="scrollOptions"
        @pulling-up="onPullingUp" v-if="this.isShow == 1">
        <hotel-cell v-if="hotelList.length>0" v-for="item in hotelList" :key="item.id" @getHotelList="getHotelOffset" :item="item" ></hotel-cell>
      </cube-scroll>
  </page>
</template>

<script type="text/ecmascript-6">
import accountWarm from '../common/account-warm'
import orderType from './order-type'
import nonepage from '../common/nonepage'
import orderCell from './common/order-cell'
import hotelCell from './common/hotel-cell'
export default{
  data () {
    return {
      type: this.$route.query.from?parseInt(this.$route.query.from):-1,
      hotelType: 0,
      list:[],
      hotelList: [],
      offset:0,
      limit:8,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据',
      isShow: ''
    }
  },
  components: {
    accountWarm,
    orderType,
    nonepage,
    orderCell,
    hotelCell
  },
  computed:{
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
      this.getList();
      this.getHotelList()
    },
  },
  created(){
    this.getList()
    this.getHotelList()
  },
  methods: {
    onScroll (pos) {
      if (pos.y < -150) {
        this.showWhiteTitle = true;
      } else {
        this.showWhiteTitle = false
      }
    },
    onPullingUp () {
      this.offset+=this.limit;
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)

    },
    getList(){
      let offset=this.offset==0?0:this.offset+1;
      this.request(this.api.OrderList, {orderStatus: this.type,offset:offset,limit:this.limit}).then(res => {
        this.pullUpLoad = false;
        if(res.code==200){
          let data=null;
          if(res.data.hasOwnProperty('rows')){
            data=res.data.rows;
          }else{
            data=res.data;
          }
          if(data.length){
            this.pullUpLoad = true;
          }
          this.list=this.offset==0?data:this.list.concat( data);
        }else{
          this.list=this.offset==0?[]:this.list;
        }

      })
    },
    getHotelList(){
      let offset=this.offset==0?0:this.offset+1;
      this.request(this.api.HotelOrderList, {status: this.hotelType,offset:offset,limit:this.limit}).then(res => {
        this.pullUpLoad = false;
        if(res.code==200){
          let data=null;
          if(res.data.hasOwnProperty('hotelOrderList')){
            data=res.data.hotelOrderList;
          }else{
            data=res.data;
          }
          if(data.length){
            this.pullUpLoad = true;
          }
          this.hotelList=this.offset==0?data:this.hotelList.concat( data);
        }else{
          this.hotelList=this.offset==0?[]:this.hotelList;
        }

      })
    },
    getOffset(){
      this.offset=0
      this.getList()
    },
    getHotelOffset(){
      this.offset=0
      this.getHotelList()
    },
    currentType (n) {
        window.location.href='/#/order?from='+n
      this.type = n
      this.offset=0
      this.getList()
    },
    currentHotelType(n) {
      this.hotelType = n
      this.offset=0
      this.getHotelList()
    },
    getShow (num) {
      this.isShow = num
    }
  },

}
</script>
