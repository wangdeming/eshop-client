<template>
  <page>
    <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
      <div class="address-update">
        <div class="content">
            <cube-form-item :field="fields[0]"></cube-form-item>
            <cube-form-item :field="fields[1]"></cube-form-item>
        </div>
      </div>
      <div class="btn-group">
        <button type="submit">保存</button>
        <button type="button" @click="del()"  v-if="touristId">删除游客</button>
      </div>
    </cube-form>
  </page>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        validity: {},
        valid: undefined,
        touristId: this.$route.query.id,
        uri: null,
        model: {
          name: "",
          idCardNo: "",
        },
        fields: [
          {
            type: "input",
            modelKey: "name",
            label: "游客姓名",
            props: {
              placeholder: "请输入游客姓名"
            },
            rules: {
              required: true
            }
          },
          {
            type: "input",
            modelKey: "idCardNo",
            label: "身份证",
            props: {
              placeholder: "请输入游客身份证号"
            },
            rules: {
              required: true,
              pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            }
          },
        ]
      };
    },
    methods: {
      submitHandler(e) {
        e.preventDefault();
        this.uri = this.api.TouristListAdd;
        if (this.touristId) {
          this.uri = this.api.TouristListUpdate;
          this.model.id = this.touristId
        }
        this.request(this.uri, this.model).then(res => {
          if (res.code == 200) {
            this.$back()
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
        this.request(this.api.TouristListDelete, {touristId: this.touristId}).then(res => {
          if (res.code == 200) {
            this.$back()
          } else {
            this.$toast(res.message, 'error');
          }
        })
      }
    },
    created() {
      if(this.touristId){
        this.$route.meta.title="编辑游客"
      }else{
        this.$route.meta.title="新增游客"
      }
      this.request(this.api.TouristDetail,{touristId:this.touristId}).then(res => {
        if (res.code == 200) {
          this.model.name=res.data.name
          this.model.idCardNo=res.data.idCardNo
        }
      })
    }
  };
</script>
<style lang="less" scoped>
  @import '../../static/less/index';
  .cube-form {
    background: none;
    .address-update {
      padding: 0 1.15rem;
      background: white;
      .update-item {
        position: relative;
        display: flex;
        height: 2.9rem;
        color: #000;
        .item-title {
          display: flex;
          align-items: center;
          flex-basis: 4.6rem;
        }
        .item-text {
          display: flex;
          align-items: center;
          flex: 1;
          input {
            border: none;
            outline: none;
          }
        }
        &:not(:last-child) {
          &::after {
            position: absolute;
            content: '';
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            border-bottom: 1px solid @border-color;
            transform: scaleY(0.5);
          }
        }
      }
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
        font-size:0.4rem;
        &:first-child {
          background: #C9AB5D;
          color: #fff;
          margin-top: 1rem;
        }
        &:last-child {
          border: 1px solid #C9AB5D;
          background: #F8F8F8;
          color: #C9AB5D;
        }
      }
    }
  }
</style>
