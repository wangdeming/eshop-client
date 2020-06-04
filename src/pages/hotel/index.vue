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
      <div  class="top">
        <div class="location borderbotom">
          上饶市
        </div>
        <dpicker :type="1"   @getlist="getlist"></dpicker>
        <div class="search borderbotom">
          <input v-model="key" placeholder="关键字/位置/酒店名"/>
        </div>
        <div class="btn">
          <button @click="search">酒店查询</button>
        </div>
      </div>
      <m-floor title="推荐酒店" isLink="false" >
        <div slot="content">
          <div class="list-item"
               :key="key"
               v-for="(item, key) in list">
            <cell-h :info="item"></cell-h>
          </div>
        </div>
      </m-floor>
      <nonepage text="未搜索到相关内容" v-if="list.length<1" icon="#icon-search1"></nonepage>
    </cube-scroll>
  </page>
</template>
<style lang="less" scoped>
  @import '../../static/less/index';
  .top{
    padding: 0.74rem 0.53rem;
    .location{
      font-size: 0.59rem;
      color: #333333;
      padding-bottom: 0.45rem;
      text-align: center;
    }

    .borderbotom{
      border-bottom: 0.017rem solid #ccc;
    }
    .search{
      text-align: center;
      input{
        width: 60%;
        margin: 0 auto;
        height: 1.6rem;
        font-size: 0.45rem;
        outline: none;
      }
    }
    .btn{
      text-align: center;
      padding-top: 1.06rem;
      button{
        border: none;
        width: 90%;
        background: #C9AB5D;
        border-radius: 0.58rem;
        line-height:1.17rem;
        color: #fff;
        outline: none;
        font-size: 0.45rem;
      }
    }
  }


</style>
<script type="text/ecmascript-6">
import pageHeader from '../common/page-header'
import nonepage from '../common/nonepage'
import cellH from './cell-h.vue'
import Dpicker from './dpicker'
export default {
  components: {
    cellH,
    pageHeader,
    nonepage,
    Dpicker
  },
  data() {
    return {
        id:1,
        ShopInfo: [],
        key:'',
        list:[],
        offset:0,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据',

    }
  },
  computed: {
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
    search(){
        sessionStorage.setItem('key',this.key)
      this.$go('/hotel/list')
    },
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
      this.request(this.api.Pagehotel,{
        checkInDate: sessionStorage.getItem('checkInDate'),
        checkOutDate: sessionStorage.getItem('checkOutDate'),
        offset: this.offset,
        limit: 8,
        order: 1,
      }).then(res => {
        _this.pullUpLoad = false;
        let data=null;
        if(res.code==200){
          data=res.data.rows;
          if(data.length){
            _this.pullUpLoad = true;
          }
        }
        this.list=this.offset==0?data:this.list.concat( data);
      });
    },
  },
  created () {
    this.id=this.$route.query.id
  },
}
</script>
