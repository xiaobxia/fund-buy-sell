<template>
  <div>
    <!--<van-nav-bar left-arrow @click-left="backHandler" />-->
    <div class="p-t">app_name</div>
    <div class="l-p-p">
      <van-form>
        <van-field
          v-model="email"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请输入邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-form>
      <div class="p-b">
        <van-button
          :loading="loading"
          square
          block
          type="primary"
          @click="loginHandler"
        >登录</van-button>
      </div>
    </div>
    <div class="r-b theme-text">
      <span @click="toPath('/register')">注册</span>
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
      this.loading = true
      this.$http.post('fbsServer/auth/login', {
        email: this.email,
        password: this.password
      }).then((data) => {
        this.loading = false
        window._token = data.data.token
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  .p-t {
    text-align: center;
    font-size: 46px;
    margin-top: 110px;
    margin-bottom: 60px;
  }
  .p-b {
    margin-top: 60px;
  }
  .r-b {
    margin-top: 60px;
    text-align: center;
  }
  .l-p-p {
    padding: 0 25px;
  }
</style>
