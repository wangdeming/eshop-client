<template>
  <div class="category-content-list">
    <cube-scroll>
      <div class="list-item"
           :class="{'list-item-active': activeList.id === item.id}"
           :key="key"
           v-for="(item, key) in list"
           @click="selectList(item)">
        <span>{{item.frontName}}</span>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  data () {
    return {
      currentList: null
    }
  },
  props: ['list'],
  computed: {
    activeList () {
      if (this.currentList) {
        return this.currentList
      } else {
        return this.list[0]
      }
    }
  },
  methods: {
    selectList (o) {
      this.currentList = o
      this.$emit('selectList', o)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../static/less/index';
  .category-content-list{
    position: absolute;
    top:0;
    bottom:0;
    width:2.93rem;
    background: #f4f4f4;
    .list-item{
      display: flex;
      align-items: center;
      height: 1.3rem;
      span{
        position: relative;
        display: inline-block;
        line-height: 50px;
        text-align: center;
        flex:1;
        color:#333333;
        font-size: 0.4rem;
      }
      &-active{
        background: white;
        span{
          font-size: 0.42rem;
          font-weight: 600;
          &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            height: 100%;
            width: 0;
            border-left: 5px solid #C9AB5D;
          }
        }
      }
    }
  }
</style>
