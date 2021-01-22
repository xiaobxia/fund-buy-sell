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
          @click="registerHandler"
        >注册</van-button>
      </div>
    </div>
    <div class="r-b theme-text">
      <span @click="toPath('/login')">登录</span>
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
    registerHandler () {
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
