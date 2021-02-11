<template>
  <div class="l-p-p">
    <div class="b-b">
      <!--<van-button plain type="primary" size="small" @click="toPath('/register')">注册</van-button>-->
    </div>
    <div class="l-n theme-text">
      <span>养基定投波段</span>
    </div>
    <div>
      <van-form ref="form">
        <van-field
          v-model="email"
          maxlength="50"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请输入邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          maxlength="16"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-form>
      <div class="p-b">
        <van-button
          :loading="loading"
          round
          block
          type="primary"
          class="liner-bg"
          @click="loginHandler"
        >登录</van-button>
        <van-button
          round
          block
          plain
          type="info"
          class="info-bt"
          @click="toPath('/register')"
        >去注册</van-button>
      </div>
    </div>
    <div class="r-b">
      <span @click="toPath('/forgetPassword')">忘记密码</span>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import { Toast } from 'vant'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  computed: {},
  created () {
    this.initPage()
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
    loginHandler () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        this.$http.post('fbsServer/auth/login', {
          email: this.email,
          password: this.password
        }).then((data) => {
          this.loading = false
          window._token = data.data.token
          if (data.data.roles && data.data.roles.indexOf('admin') !== -1) {
            window.userRoles = 'admin'
          }
          localStorage.setItem('token', data.data.token)
          storageUtil.setData('UserInfo', {
            ...data.data
          })
          this.toPath('/home')
          Toast.success('登录成功！')
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
    color: #606266;
  }
  .l-p-p {
    padding: 0 25px;
  }
  .b-b {
    text-align: right;
    margin: 20px 0;
    height: 40px;
  }
  .ic-w {
    position: relative;
    margin: 10px auto 40px auto;
    width: 80px;
    height: 80px;
    border-radius: 24px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .l-n {
    margin-top: 10px;
    margin-bottom: 40px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    line-height: 60px;
  }
  .info-bt {
    margin-top: 10px;
  }
</style>
