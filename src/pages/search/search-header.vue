<template>
  <div class="search-header">
    <div class="header-top">
      <div class="top-search">
        <svg class="icon icon-search" ><use xlink:href="#icon-search"></use></svg>
        <input type="search" placeholder="商品搜索" v-model="keyword" @keyup.enter="search">
      </div>
      <div class="top-right" @click="search" v-if="searchBtnVisible">
        <span>搜索</span>
      </div>
    </div>
    <div class="header-bottom" v-if="bottomVisible">
      <div class="bottom-item" :class="{'bottom-item-active': sort === 0}" @click="changeSort(0)">
        <span>综合</span>
      </div>
      <div class="bottom-item" :class="{'bottom-item-active': sort === 1}" @click="changeSort(1)">
        <span>销量</span>
      </div>
      <div class="bottom-item" :class="{'bottom-item-active': sort === 2}" @click="changeSort(2)">
        <span>价格</span>
        <div class="sort" v-if="sort === 2">
          <span class="triangle_border_up" :class="{'up-active':!orderdec}" ></span>
          <span class="triangle_border_down" :class="{'down-active':orderdec}"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      keyword: this.searchKey,
      sort:0,
      orderdec:true,
    }
  },
  props: ['step', 'searchKey'],
  computed: {
    searchBtnVisible () {
      return this.step !== 3
    },
    bottomVisible () {
      return this.step === 3
    }
  },
  methods: {
    search () {
      this.$emit('search', this.keyword)
    },
    clear () {
      this.keyword = ''
      this.$emit('clear')
    },
    changeSort (n) {
      (this.sort==n && n==2) ? (this.orderdec = !this.orderdec ):this.orderdec=true
      this.sort = n
      this.$emit('change-sort', n,this.orderdec)
    }
  },
  watch: {
    'keyword': function (val) {
      this.$emit('key-change', val)
    },
    'searchKey': function (val) {
      this.keyword = val
    }
  }
}
</script>

<style lang="less" scoped>
  .search-header {
    padding: 0 28px;
    background: white;
    .header-top {
      display: flex;
      align-items: center;
      height: 88px;

      .top-search {
        width:80%;
        display: flex;
        align-items: center;
        flex: 1;
        height: 0.75rem;
        border-radius: 0.43rem;;
        background: #F8F8F8;

        .icon-search{
          padding-left: 0.3rem;
        }
        input {
          flex: 1;
          border: none;
          outline: none;
          background:  #F8F8F8;
          padding-left: 0.1rem;
          padding-top: 0.1rem;
          font-size:0.4rem;
          &::-webkit-search-cancel-button {
            display: none;
          }
        }
      }
      .top-right {
        display: flex;
        justify-content: flex-end;
        flex-basis: 85px;
        span {
          color: #333;
          font-size:0.4rem;
        }
      }
    }
    .header-bottom {
      display: flex;
      align-items: center;
      height: 88px;
      .bottom-item {
        display: flex;
        justify-content: center;
        flex: 1;
        color: #666;
        span {
          font-size: 0.38rem;
        }
        .sort{
          padding-left: 0.1rem;
          display: flex;
          flex-direction: column;
          height: 0.5rem;
          .triangle_border_up{
            width:0;
            height:0;
            border-width:0 0.2rem 0.2rem;
            border-style:solid;
            border-color:transparent transparent #cccccc;/*透明 透明  灰*/
            position:relative;
          }
          /*向下*/
          .triangle_border_down{
            width:0;
            height:0;
            margin-top: 0.05rem;
            border-width:0.2rem 0.2rem 0;
            border-style:solid;
            border-color:#cccccc transparent transparent;/*灰 透明 透明 */
            position:relative;
          }
          .up-active{
            border-color:transparent transparent #C9AB5D
          }
          .down-active{
            border-color: #C9AB5D transparent transparent
          }

        }
        &-active {
          color: #C9AB5D;;
        }
      }
    }
  }
</style>
