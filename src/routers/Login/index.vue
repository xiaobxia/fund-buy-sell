<template>
  <div class="page-login">
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
            <input type="text" v-model="name" placeholder="请输入微信号">
          </div>
          <div class="input-item">
            <input type="text" v-model="password" placeholder="请输入密码">
          </div>
          <mt-button type="primary" @click="loginHandler">登录</mt-button>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <div class="input-wrap">
          <div class="warn">为了避免不必要的麻烦，请务必使用真实微信号</div>
          <div class="input-item">
            <input type="text" v-model="name" placeholder="请输入微信号">
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
  },
  methods: {
    initPage () {
    },
    loginHandler () {
      const info = storageUtil.getDeviceInfo()
      this.$http.post('auth/customerLogin', {
        name: this.name,
        device_id: info.device_id,
        password: this.password
      }).then((data) => {
        if (data.success) {
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          this.$router.replace('/')
          storageUtil.initUserInfo({
            ...data.data,
            isLogin: true
          })
          ToastBig.success('登录成功')
        } else {
          ToastBig.error(data.message, 2000)
        }
      })
    },
    registerHandler () {
      const info = storageUtil.getDeviceInfo()
      this.$http.post('auth/customerRegister', {
        name: this.name,
        device_id: info.device_id,
        password: this.password
      }).then((data) => {
        if (data.success) {
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          this.$router.replace('/')
          storageUtil.initUserInfo({
            ...data.data,
            isLogin: true
          })
          ToastBig.success('注册成功')
        } else {
          ToastBig.error(data.message, 2000)
        }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
