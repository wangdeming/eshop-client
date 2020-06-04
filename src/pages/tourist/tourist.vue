<template>
  <page page-background="#fff">
  <div class="tourist">
    <nonepage text="暂无游客" v-if="list.length<1 && isgetdata" icon="#icon-site"></nonepage>
    <div class="checkout-tourist"  v-for="(item, index) in list">
      <div class="tourist-left">
        <div class="left-top">
          <h4 v-html="item.name"></h4>
        </div>
        <div class="left-bottom">
          <p v-html="item.id_card_no"></p>
        </div>
      </div>
      <div class="tourist-right">
        <svg class="icon change-img" @click="$go('/tourist/update?id='+item.id)"><use xlink:href="#icon-edit"></use></svg>
      </div>
    </div>
  </div>
    <template slot="bottom" v-if="list.length<15">
      <div class="footer">
        <button @click="$go('/tourist/update')">新增游客</button>
      </div>
    </template>
  </page>
</template>
<script type="text/ecmascript-6">
  import nonepage from '../common/nonepage'
  export default {
    components: {
      nonepage,
    },
    data() {
      return {
        list: [],
        isgetdata:false
      }
    },
    methods: {
      getList() {
        this.request(this.api.TouristList).then(res => {
          this.isgetdata=true
          if (res.code == 200) {
            this.list = res.data
          }
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style lang="less" scoped>
  .tourist{
    position: relative;

    .checkout-tourist{
    display: flex;
    padding:0.5rem 0.3rem;
    border-bottom: 1px solid #cccccc;
    .tourist-left{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex:1;
      .left-top{
        display: flex;
        font-size: 0.45rem;
        color:#000;
        span{
          color:#000;
          padding-left: 0.3rem;
          padding-top: 0.1rem;
          font-size: 0.45rem;
        }
      }
      .left-bottom{
        padding-top:0.3rem;
        font-size: 0.45rem;
        color:#000;
      }
    }
    .tourist-right{
      display: flex;
      align-items: center;
      flex-grow: 0;
      padding-left:20px;
      .change-img{
        width:1rem;
        height:0.7rem;
      }
    }
    }

  }
  .footer{
    border-top: 1px solid #cccccc;
    button{
      display: block;
      background: none;
      border: 1px solid #C9AB5D;
      color:#C9AB5D ;
      height: 1.2rem;
      margin: 0.3rem auto;
      border-radius: 0.7rem;
      width: 80%;
      outline: none;
      font-size:0.45rem;
      line-height:1.2rem;
    }
  }
</style>
