<template>
  <page>
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <div class="address-update">
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
        <cube-form-item :field="fields[3]"></cube-form-item>
      </div>
      <div class="default-address" v-if="listlenth && !curdefault">
        <span>设为默认地址</span>
        <cube-switch v-model="isDefault"></cube-switch>
      </div>
      <div class="btn-group">
        <button type="submit" class="sub">保存并使用</button>
        <button type="button" class="del" @click="del()" v-if="id">删除收货地址</button>
      </div>
    </cube-form>
  </page>
</template>

<script type="text/ecmascript-6">
  import PCA from '../common/area'
  export default {
    data() {
      return {
        id: this.$route.query.id,
				type:this.$route.query.type,
        listlenth:0,
        curdefault:0,
        isDefault:false,
        model: {
          consigneeName: '',
          consigneePhone: '',
          address: '',
          pcaValue: [],
        },
        fields: [
          {
            type: "input",
            modelKey: "consigneeName",
            label: "姓名",
            props: {
              placeholder: "收货人姓名"
            },
            rules: {
              required: true,
              pattern:  /^.{1,15}$/
            }
          },
          {
            type: "input",
            modelKey: "consigneePhone",
            label: "手机号",
            props: {
              placeholder: "收货人手机号"
            },
            rules: {
              required: true,
              pattern: /^((1[3567894]\d{9}))$/
            }
          },
          {
            component: PCA,
            modelKey: "pcaValue",
            label: "所在地区",
            props:{
              value:this.pcaValue
            },
            rules: {
              required: true
            },
          },
          {
            type: "textarea",
            modelKey: "address",
            label: "详细地址",
            props: {
              placeholder: "街道门牌、楼层房间等信息，至少5个字",
              maxlength:200,
            },
            rules: {
              required: true,
              pattern:  /^.{5,200}$/
            }
          },
        ]
      }
    },
    methods: {
      submitHandler(e) {
        e.preventDefault();
        this.uri = this.api.AddressAdd;
        this.postparam = this.model;
        this.postparam.provinceId=this.model.pcaValue[0];
        this.postparam.cityId=this.model.pcaValue[1];
        this.postparam.districtId=this.model.pcaValue[2];
        this.postparam.isDefault=0;

        if(this.isDefault){
          this.postparam.isDefault=1;
        }
        if (this.id) {
          this.uri = this.api.AddressUpdate;
          this.postparam.id = this.id
        }
        this.request(this.uri, this.postparam).then(res => {
          if (res.code == 200) {
						if (this.type == 'selectAddress') {
							this.$router.go(-1);
						} else{
							this.$back()
						}
          } else {
            this.$toast(res.message, 'error');
          }
        })
      },
      validateHandler(result) {
        this.validity = result.validity;
        this.valid = result.valid;
      },
      del() {
        this.request(this.api.AddressDelete, {addressId: this.id}).then(res => {
          if (res.code == 200) {
            this.$back()
          } else {
            this.$toast(res.message, 'error');
          }
        })
      }
    },
    created() {
      if(this.id){
        this.$route.meta.title="编辑收货地址"
      }else{
        this.$route.meta.title="新增收货地址"
      }
      this.request(this.api.AddressDetail,{addressId:this.id}).then(res => {
        this.model.consigneeName = res.consigneeName,
        this.model.consigneePhone = res.consigneePhone,
        this.model.pcaValue = [res.provinceId,res.cityId,res.districtId],
        this.model.address = res.address
        this.isDefault=res.isDefault?true:false
        this.curdefault=res.isDefault
      });
      this.request(this.api.AddressList).then(res => {
        if (res.code == 200) {
          this.listlenth = res.data.length
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  @import '../../static/less/index';

  .cube-form {
    background: none;
    .address-update {
      background: white;
      color: #303643;
      font-size: 0.45rem;
      .cube-btn {
        background: none !important;
      }
    }

    .default-address{
      display: flex;
      justify-content:space-between;
      background: #fff;
      padding: 0.3rem;
      margin-top: 0.3rem;

    }
    .btn-group {
      button {
        display: block;
        width: 80%;
        margin: 0 auto;
        line-height: 0.9rem;
        border: none;
        margin-top: 0.5rem;
        border-radius: 1rem;
        font-size:0.45rem;
      }
      .sub {
        background: #C9AB5D;
        color: #fff;
        margin-top: 1rem;
      }
      .del {
        border: 1px solid #C9AB5D;
        background: #F8F8F8;
        color: #C9AB5D;
      }
    }
  }
</style>
