<template>
  <div class="page-login">
    <mt-header title="" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <h3>养基定投波段</h3>
    <div class="nav">
      <span :class="{'active': active === 'tab-container1'}" @click="activeChange('tab-container1')">登录</span>
      <span>|</span>
      <span :class="{'active': active === 'tab-container2'}"  @click="activeChange('tab-container2')">注册</span>
    </div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-container1">
        <div class="input-wrap">
          <div class="input-item">
            <input type="text" v-model="name" placeholder="请输入手机号">
          </div>
          <div class="input-item">
            <input type="text" v-model="password" placeholder="请输入密码">
          </div>
          <mt-button type="primary" @click="loginHandler">登录</mt-button>
        </div>
        <div class="f-p" @click="toResetPassword">忘记密码？</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <div class="input-wrap">
          <!--<div class="warn">为了避免不必要的麻烦，请务必使用真实微信号</div>-->
          <div class="input-item">
            <input type="text" v-model="name" placeholder="请输入手机号">
          </div>
          <div class="input-item">
            <input type="text" v-model="password" placeholder="请输入密码">
          </div>
          <mt-button type="primary" @click="registerHandler">注册</mt-button>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="to-register">
      <div class="content">频繁被要求登录？</div>
      <div class="content">亲，这边建议您选择“在浏览器中打开”，并把我们网站添加到桌面呢~~</div>
      <!--<div class="title">快去搜索并添加客服微信号"fund_buy_sell"申请账户吧！</div>-->
      <!--<mt-button type="primary" v-clipboard="'fund_buy_sell'" v-clipboard:success="clipboardSuccessHandler">一键复制微信号</mt-button>-->
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import ToastBig from '@/common/toast.js'
import { Toast } from 'mint-ui'

export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: '',
      active: 'tab-container1'
    }
  },
  computed: {},
  mounted () {
    this.initPage()
    this.addPV('登录注册')
  },
  methods: {
    initPage () {
    },
    loginHandler () {
      const info = storageUtil.getDeviceInfo()
      this.$http.post('auth/customerLogin', {
        name: this.name.replace(/\s+/g, ''),
        device_id: info.device_id,
        password: this.password.replace(/\s+/g, '')
      }).then((data) => {
        if (data.success) {
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          this.$router.replace('/')
          storageUtil.initUserInfo({
            ...data.data,
            isLogin: true
          })
          this.getUserInfo(data.data.name)
          ToastBig.success('登录成功')
        } else {
          ToastBig.error(data.message, 2000)
        }
      })
    },
    registerHandler () {
      const phonePattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^(([0\+]\d{2,3})?(0\d{2,3}))(\d{7,8})((\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
      if (phonePattern.test(this.name.replace(/\s+/g, '')) === false) {
        Toast({
          message: '手机号格式不正确',
          duration: 2000
        })
        return false
      }
      const info = storageUtil.getDeviceInfo()
      this.$http.post('auth/customerRegister', {
        name: this.name.replace(/\s+/g, ''),
        device_id: info.device_id,
        password: this.password.replace(/\s+/g, '')
      }).then((data) => {
        if (data.success) {
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          this.$router.replace('/')
          storageUtil.initUserInfo({
            ...data.data,
            isLogin: true
          })
          this.getUserInfo(data.data.name)
          ToastBig.success('注册成功')
        } else {
          ToastBig.error(data.message, 2000)
        }
      })
    },
    getUserInfo (name) {
      this.$http.get('customer/getCustomerByName', {
        name: name
      }).then((data) => {
        let isVip = false
        if (data.data.buy_type && data.data.can_use_day > 0) {
          isVip = true
        }
        this.$store.dispatch('initUserInfo', {
          ...data.data,
          isVip
        })
      })
    },
    clipboardSuccessHandler () {
      Toast({
        message: '复制成功',
        duration: 1000
      })
    },
    activeChange (str) {
      this.active = str
    },
    toResetPassword () {
      this.$router.push('/page/resetPassword')
    },
    backHandler () {
      this.$router.replace('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
