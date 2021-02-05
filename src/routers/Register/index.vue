<template>
  <div class="l-p-p">
    <!--<van-nav-bar left-arrow @click-left="backHandler" />-->
    <div class="b-b">
      <van-button plain type="primary" size="small" @click="toPath('/login')">登录</van-button>
    </div>
    <div class="w-t">
      <h2>您好，</h2>
      <p>欢迎来到<span class="theme-text">养基定投波段</span></p>
    </div>
    <div>
      <van-form ref="form">
        <van-field
          v-model="email"
          placeholder="请输入邮箱"
          maxlength="50"
          :rules="[
            { required: true, message: '请输入邮箱' },
            { validator: emailValidator, message: '邮箱格式不正确' }
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码，8-16位数字和字母"
          maxlength="16"
          :rules="[
            { required: true, message: '请输入密码' },
            { validator: passwordValidator, message: '8-16位数字和字母' }
          ]"
        />
      </van-form>
      <div class="p-b">
        <van-button
          :loading="loading"
          round
          block
          class="liner-bg"
          type="primary"
          @click="registerHandler"
        >注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import { Toast } from 'vant'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  computed: {},
  created () {
  },
  methods: {
    toPath (path) {
      this.$router.push(path)
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    initPage () {
    },
    emailValidator (val) {
      const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
      return reg.test(val)
    },
    passwordValidator (val) {
      const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      return pwdReg.test(val)
    },
    registerHandler () {
      this.$refs.form.validate().then(() => {
        const query = this.$route.query
        this.loading = true
        this.$http.post('fbsServer/auth/registerWidthEmail', {
          email: this.email,
          password: this.password,
          inviter_email: query.inv || ''
        }).then((data) => {
          this.loading = false
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          storageUtil.setData('UserInfo', {
            ...data.data
          })
          this.toPath('/home')
          Toast.success('注册成功！')
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  .p-t {
    text-align: center;
    margin-top: 110px;
    margin-bottom: 60px;
  }
  .p-b {
    margin-top: 40px;
  }
  .r-b {
    margin-top: 20px;
    text-align: left;
  }
  .l-p-p {
    padding: 0 25px;
  }
  .b-b {
    text-align: right;
    margin: 20px 0;
  }
  .w-t {
    h2 {
      margin-bottom: 10px;
    }
    p {
      color: #909399;
      margin-bottom: 40px;
    }
  }
</style>
