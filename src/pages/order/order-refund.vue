<template>
  <page :better-scroll="false">
    <order-none text="目前没有任何订单哦~" v-if="list.length<1"></order-none>
    <cube-scroll
      ref="scroll"
      :scrollEvents="['scroll']"
      @scroll="onScroll"
      :data="list"
      :options="scrollOptions"
      @pulling-up="onPullingUp">
      <refund-order-cell v-if="list.length>0" v-for="item in list" :key="item.goodsId" @getList="getList" :item="item" ></refund-order-cell>
    </cube-scroll>
  </page>
</template>

<script type="text/ecmascript-6">
import orderNone from './common/order-none'
import refundOrderCell from './common/refund-order-cell'
export default{
  data () {
    return {
      type: this.$route.query.from?parseInt(this.$route.query.from):-1,
      list:[],
      offset:0,
      limit:8,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据',
    }
  },
  components: {
    orderNone,
    refundOrderCell
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
    },
  },
  created(){
    this.getList()
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
      this.request(this.api.ServiceOrder, {offset:offset,limit:this.limit}).then(res => {
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
    currentType (n) {
      this.type = n
      this.offset=0
      this.getList()
    }
  },

}
</script>
