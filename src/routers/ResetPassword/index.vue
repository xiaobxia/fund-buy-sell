<template>
  <div class="page-login">
    <h3>重置密码</h3>
    <div class="input-wrap">
      <div class="input-item">
        <input type="text" v-model="name" placeholder="请输入手机号">
      </div>
      <div class="input-item">
        <input type="text" v-model="password" placeholder="请输入密码">
      </div>
      <mt-button type="primary" @click="resetHandler">重置</mt-button>
    </div>
    <div class="to-register">
      <div class="content">频繁被要求登录？</div>
      <div class="content">亲，这边建议您选择“在浏览器中打开”，并把我们网站添加到桌面呢~~</div>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import ToastBig from '@/common/toast.js'
import { Toast } from 'mint-ui'

export default {
  name: 'ResetPassword',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  computed: {},
  mounted () {
    this.initPage()
    this.addPV('重置密码')
  },
  methods: {
    initPage () {
    },
    resetHandler () {
      const info = storageUtil.getDeviceInfo()
      this.$http.post('auth/resetPassword', {
        name: this.name.replace(/\s+/g, ''),
        device_id: info.device_id,
        password: this.password.replace(/\s+/g, '')
      }).then((data) => {
        if (data.success) {
          ToastBig.success('重置成功')
          this.$router.push('/page/login')
        } else {
          ToastBig.error(data.message, 2000)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
