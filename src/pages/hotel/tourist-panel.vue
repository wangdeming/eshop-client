<template>
  <div class="tourist">
    <div class="top">添加游客
      <svg class="icon" @click="closepanel">
        <use xlink:href="#icon-close"></use>
      </svg>
    </div>
    <nonepage text="暂无游客" v-if="list.length<1" icon="#icon-site"></nonepage>
    <div class="content">
      <div class="checkout-tourist" v-for="(item, index) in list">
        <div class="tourist-right">
          <span class="checknor" :class="{ 'checkact': selectedids.indexOf(item.id) != -1 }" @click="checkt(item.id)"><i></i></span>
        </div>
        <div class="tourist-left">
          <div class="left-top">
            <h4 v-html="item.name"></h4>
          </div>
          <div class="left-bottom">
            <p v-html="item.id_card_no"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" @click="comfirm">确定</div>
  </div>
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
        selectedids:[],
      }
    },
    methods: {
        closepanel(){
          this.$parent.$parent.showpop=false;
        },
      comfirm(){
        let ckpage=this.$parent.$parent
        let num=1
        ckpage.orderUserList=[];
        this.list.map((item, key) => {
           if(this.selectedids.indexOf(item.id) != -1){
             ckpage.model['idCardNo'+num]=item.name
             ckpage.orderUserList.push({
               userTouristId:item.id,
               realname:item.name
             })
             num++
           }
        })
        ckpage.showpop=false;
      },
      checkt(id){
        let ind=this.selectedids.indexOf(id);
        if(ind != -1){
          this.selectedids.splice(ind, 1)
        }else {
          this.selectedids.push(id);
        }
      },
      getList() {
        this.request(this.api.TouristList).then(res => {
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
  .tourist {
    position: relative;
    height: 13rem;
    background: #fff;
    overflow: scroll;
    .top {

      position: fixed;
      background: #fff;
      width: 100%;
      padding-left: 42%;
      font-size: 0.45rem;
      z-index: 9999;
      line-height: 1.2rem;
      .icon{
        position: fixed;
        padding-top: 0.4rem;
        right: 0.4rem;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    .content {
      margin: 1.2rem 0;
    }
    .checkout-tourist {
      display: flex;
      padding: 0.3rem;
      border-bottom: 0.015rem solid #cccccc;
      .tourist-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 0.3rem;
        flex: 1;
        .left-top {
          display: flex;
          font-size: 0.45rem;
          color: #000;
          span {
            color: #000;
            padding-left: 0.3rem;
            padding-top: 0.1rem;
            font-size: 0.45rem;
          }
        }
        .left-bottom {
          padding-top: 0.3rem;
          font-size: 0.45rem;
          color: #000;
        }
      }
      .tourist-right {
        margin: 0 0.3rem;
        .checknor {
          width: 0.5rem;
          margin-top: 0.3rem;
          height: 0.5rem;
          display: block;
          border-radius: 0.1rem;
          background: rgb(204, 204, 204);
        }
        .checkact {
          background: #C9AB5D;
          position: relative;
          i{
            position: absolute;
            width: 18px;
            height: 9px;
            background: transparent;
            top:0.12rem;
            left: 0.1rem;
            border: 3px solid #fff;
            border-top: none;
            border-right: none;
            -webkit-transform: rotate(-55deg);
            -ms-transform: rotate(-55deg);
            transform: rotate(-55deg);
            z-index: 9;
          }


        }
      }
    }
    .footer{
      position: fixed;
      bottom: 0;
      background: #C9AB5D;
      width: 100%;
      color: #fff;
      text-align: center;
      font-size: 0.45rem;
      line-height: 1.2rem;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    }
  }

  .footer {
    border-top: 1px solid #cccccc;
    button {
      display: block;
      background: none;
      border: 1px solid #C9AB5D;
      color: #C9AB5D;
      height: 1.2rem;
      margin: 0.3rem auto;
      border-radius: 0.7rem;
      width: 80%;
      outline: none;
      font-size: 0.45rem;
      line-height: 1.2rem;
    }
  }
</style>
