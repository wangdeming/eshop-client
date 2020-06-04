<template xmlns="http://www.w3.org/1999/html">
  <page :better-scroll="false" page-background="white">
    <div class="search-header">
      <div class="header-top">
        <div>上饶</div>
        <dpicker :type="2" @getlist="getlist"></dpicker>
        <div class="top-search">
          <svg class="icon icon-search">
            <use xlink:href="#icon-search"></use>
          </svg>
          <input type="search" placeholder="关键字/位置/酒店名" v-model="key" @keyup.enter="search">
        </div>
      </div>
      <div class="header-bottom">
        <div class="bottom-item" :class="{'bottom-item-active': sort == 1||sort == 2}" @click="changesort(1)">
          <span>距离</span>
          <div class="sort">
            <span class="triangle_border_up" :class="{'up-active':sort ==1}"></span>
            <span class="triangle_border_down" :class="{'down-active':sort ==2}"></span>
          </div>
        </div>
        <div class="bottom-item" :class="{'bottom-item-active': sort == 3||sort == 4}" @click="changesort(3)">
          <span>评分</span>
          <div class="sort">
            <span class="triangle_border_up" :class="{'up-active':sort ==3}"></span>
            <span class="triangle_border_down" :class="{'down-active':sort ==4}"></span>
          </div>
        </div>
        <div class="bottom-item" :class="{'bottom-item-active': sort == 5||sort == 6}" @click="changesort(5)">
          <span>价格</span>
          <div class="sort">
            <span class="triangle_border_up" :class="{'up-active':sort ==5}"></span>
            <span class="triangle_border_down" :class="{'down-active':sort ==6}"></span>
          </div>
        </div>
      </div>
    </div>
    <cube-scroll
      ref="scroll"
      :scrollEvents="['scroll']"
      @scroll="onScroll"
      :data="list"
      :options="scrollOptions"
      @pulling-up="onPullingUp">
      <div class="items">
        <div class="list-item"
             :key="key"
             v-for="(item, key) in list">
          <cell-h :info="item"></cell-h>
        </div>
      </div>
      <div style="height: 3rem;"></div>
      <nonepage text="未搜索到相关内容" v-if="list.length<1" icon="#icon-search1"></nonepage>
    </cube-scroll>
  </page>
</template>

<script type="text/ecmascript-6">
  import nonepage from '../common/nonepage'
  import cellH from './cell-h.vue'
  import Dpicker from './dpicker'
  export default {
    components: {
      cellH,
      nonepage,
      Dpicker
    },
    data () {
      return {
        key: sessionStorage.getItem('key'),
        sort: 1,
        orderdec: true,
        list: [],
        offset: 0,
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
    methods: {
      search () {
        this.getlist()
      },
      changesort (key) {
        this.orderdec = !this.orderdec
        this.sort = this.orderdec + key;
        this.offset = 0;
        this.getlist()
      },
      onScroll (pos) {
        if (pos.y < -150) {
          this.showWhiteTitle = true;
        } else {
          this.showWhiteTitle = false
        }
      },
      onPullingUp () {
        this.offset += 8;
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 1000)

      },
      getlist(){
        const _this = this;
        this.request(this.api.Pagehotel, {
          checkInDate: sessionStorage.getItem('checkInDate'),
          checkOutDate: sessionStorage.getItem('checkOutDate'),
          offset: this.offset,
          limit: 8,
          order: this.sort,
          key: this.key
        }).then(res => {
          _this.pullUpLoad = false;
          let data = null;
          if (res.code == 200) {
            data = res.data.rows;
            if (data.length) {
              _this.pullUpLoad = true;
            }
          }
          this.list = this.offset == 0 ? data : this.list.concat(data);
        });
      },
    },
    created () {
//      this.getlist();
    },
    watch: {
      'key': function (val) {
        this.key = val
      },
      offset: function () {
        this.getlist();
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-header {
    padding: 0.4rem;
    background: white;
    .header-top {
      display: flex;
      align-items: center;

      .top-search {
        display: flex;
        align-items: center;
        flex: 1;
        height: 1rem;
        background: #F8F8F8;
        .icon-search {
          padding-left: 0.3rem;
        }
        input {
          flex: 1;
          border: none;
          outline: none;
          background: #F8F8F8;
          padding-left: 0.1rem;
          font-size: 0.4rem;
          &::-webkit-search-cancel-button {
            display: none;
          }
        }
      }
    }
    .header-bottom {
      display: flex;
      align-items: center;
      padding-top: 0.6rem;
      .bottom-item {
        display: flex;
        justify-content: center;
        flex: 1;
        color: #666;
        span {
          font-size: 0.38rem;
        }
        .sort {
          padding-left: 0.1rem;
          display: flex;
          flex-direction: column;
          .triangle_border_up {
            width: 0;
            height: 0;
            border-width: 0 0.2rem 0.2rem;
            border-style: solid;
            border-color: transparent transparent #cccccc; /*透明 透明  灰*/
            position: relative;
          }
          /*向下*/
          .triangle_border_down {
            width: 0;
            height: 0;
            margin-top: 0.05rem;
            border-width: 0.2rem 0.2rem 0;
            border-style: solid;
            border-color: #cccccc transparent transparent; /*灰 透明 透明 */
            position: relative;
          }
          .up-active {
            border-color: transparent transparent #C9AB5D
          }
          .down-active {
            border-color: #C9AB5D transparent transparent
          }

        }
        &-active {
          color: #C9AB5D;;
        }
      }
    }
  }

  .items {
    padding: 0.4rem;

  }
</style>
