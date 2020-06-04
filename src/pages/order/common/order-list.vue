<template>
    <cube-scroll
      ref="scroll"
      :scrollEvents="['scroll']"
      @scroll="onScroll"
      :data="list"
      :options="scrollOptions"
      @pulling-up="onPullingUp">
      <order-cell v-if="list.length>0" v-for="item in list" :key="item.id" @getList="getList" :item="item" ></order-cell>

    </cube-scroll>
</template>
<script type="text/ecmascript-6">
  import orderCell from './order-cell'

  export default {
    props: ['listurl', 'urlparams'],
    data () {
      return {
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
        this.getlist();
      }
    },
    components: {
      orderCell,
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
        this.offset+=this.urlparams.limit;
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 1000)

      },
      getList(){
        const _this=this;
        this.urlparams.offset=this.offset==0?0:this.offset+1;
        this.request(this.listurl,this.urlparams).then(res => {
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
      this.getList();
    }
  }
</script>
