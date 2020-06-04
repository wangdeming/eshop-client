<template>
  <page page-background="white" :better-scroll="true">
    <div class="account">
      <m-cell
          title="头像"
          :is-link="false">
        <div class="account-avatar">
          <cube-upload
            ref="upload"
            :action="action"
            @file-success="addedHandler"
            @file-error="errHandler">
            <div class="clear-fix">
              <!--<cube-upload-file   :file="myfile" ></cube-upload-file>-->
              <cube-upload-btn :multiple="false">
                <img class="ignore" :src="profile.avatar | avatar">
              </cube-upload-btn>
            </div>
          </cube-upload>
        </div>
      </m-cell>
      <m-cell
          title="昵称"
          :value="profile.nickname"
          :is-link="true"
          @click.native="showAlert"></m-cell>
      <m-cell
        title="性别"
        :value="sexarr[profile.sex]"
        :is-link="true"
        @click.native="showSexPicker"></m-cell>
      <m-cell
          title="生日"
          :value="profile.birthday"
          :is-link="true"
          @click.native="showDatePicker"></m-cell>
      <div class="pca border-1px-bottom">
        <span>地区</span>
        <div class="pcaright">
          <p-c-a :value="profile.addressids" @input="upaddress"></p-c-a>
          <svg class="icon icon-next"><use xlink:href="#icon-my_icon_more"></use></svg>
        </div>
      </div>
    </div>
  </page>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'
import PCA from '../common/area'
import Cookies from 'js-cookie'
import {API_BASE_URL, TOKEN_KEY} from '@/config/app'
export default {
  components:{
    PCA,
  },

  data(){
    return {
      sexarr:['保密',  '男', '女'],
    }
  },
  computed: {
      action(){
        return {
          target: process.env.API_HOST + this.api.imageUpload,
          headers: {"X-Nideshop-Token":localStorage.getItem('token')},
          withCredentials:true,
        }
      },
    ...mapState('user', ['profile'])
  },

  methods: {
    upaddress(r){
        this.updateUserInfo({
          id: this.profile.id,
          provinceId: r[0],
          cityId: r[1],
          districtId: r[2],
        });
    },
    ...mapActions('user', ['logout','updateUserInfo']),
    addedHandler(f) {
        this.updateUserInfo({
          id: this.profile.id,
          avatar: f.response.data.path,
        });
    },
    errHandler(file) {
      this.$createToast({
        type: 'warn',
        txt: 'Upload fail',
        time: 1000
      }).show()
    },
    showAlert() {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: '修改昵称',
        prompt: {
          value: this.profile.nickname,
          placeholder: '请输入昵称',
          maxlength: 15,
        },
        onConfirm: (e, promptValue) => {
          this.updateUserInfo({
            id: this.profile.id,
            nickname: promptValue,
          });
        }
      }).show()
    },
    showSexPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '请选择性别',
          data:  [[{ text: '保密', value: 0}, { text: '男', value: 1 },{ text: '女', value: 2 }]],
          onSelect: this.sexselectHandle,
        })
      }
      this.picker.show()
    },
    sexselectHandle(selectedVal, selectedIndex, selectedText) {

      this.updateUserInfo({
        id: this.profile.id,
        sex: selectedVal.join(''),
      });
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择日期',
          min: new Date(1950, 1, 1),
          max: new Date(2018, 12, 12),
          value: new Date(this.profile.birthday),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.updateUserInfo({
        id: this.profile.id,
        birthday: selectedVal.join('/'),
      });
    },
    cancelHandle() {
    }
  }
}
</script>

<style lang="less" scoped>
  .account{
    padding: 0.4rem;
    .account-avatar {
      display: inline-block;
      height: 104px;
      width: 104px;
      .ignore {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .pca{
      display: flex;
      justify-content: space-between;
      font-size: 0.45rem;
      line-height: 1.6rem;
      height:1.6rem;
      color:#303643;
      .pcaright{
        color:#999;
         .icon-next{
           padding-left: 0.44rem;
           width: 0.4rem;
         }
       }

    }
  }

</style>
