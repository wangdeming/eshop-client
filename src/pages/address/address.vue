<template>
  <page page-background="#fff">
  <div class="address">
    <nonepage text="未添加收货地址" v-if="list.length<1 && isgetdata" icon="#icon-site"></nonepage>
    <div class="checkout-address" v-for="(item, index) in list" :key="index">
      <div class="address-left" @click="addressClick(item.id)">
        <div class="left-top">
          <h4 v-html="item.consignee_name"></h4>
          <span v-html="item.consignee_phone"></span>
          <span class="default" v-if="item.is_default">默认</span>
        </div>
        <div class="left-bottom">
          <p  v-html="item.province+item.city+item.district+item.address"></p>
        </div>
      </div>
      <div class="address-right">
        <svg class="icon" @click="$go('/address/update?id='+item.id)"><use xlink:href="#icon-edit"></use></svg>
      </div>
    </div>
  </div>
    <template slot="bottom" v-if="list.length<15">
      <div class="footer">
        <button @click="$go('/address/update')">新增地址</button>
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
        isgetdata:false,
				type:this.$route.query.type,
      }
    },
    methods: {
      getList() {
        this.request(this.api.AddressList).then(res => {
          this.isgetdata=true
          if (res.code == 200) {
            this.list = res.data
          }
        })
      },
			addressClick (addressId) {
				if (this.type == null) {
					return;
				} else{
					sessionStorage.setItem("addressId",addressId);
					this.$router.go(-1);
				}
			}
    },
    created() {
      this.getList()
    }
  }
</script>
<style lang="less" scoped>
  .address{
    .checkout-address{
    display: flex;
    padding:0.5rem 0.3rem;
    border-bottom: 1px solid #cccccc;
    .address-left{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex:1;
      .left-top{
        display: flex;
        font-size: 0.5rem;
        color:#333;
        span{
          color:#999999;
          padding-left: 0.3rem;
          padding-top: 0.1rem;
          font-size: 0.4rem;
        }
        .default{
          color: rgb(219,64,59);
          background: rgb(251,235,235);
          padding: 0.1rem 0.25rem;
          margin-left: 0.3rem;
        }
      }
      .left-bottom{
        padding-top:20px;
        font-size: 28px;
        color:#333;
      }
    }
    .address-right{
      display: flex;
      align-items: center;
      flex-grow: 0;
      padding-left:20px;
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
      height: 0.9rem;
      margin: 0.3rem auto;
      border-radius: 0.7rem;
      width: 80%;
      outline: none;
    }
  }
</style>
