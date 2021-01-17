<template>
  <div>
    <van-nav-bar left-arrow @click-left="backHandler" />
    <div class="p-t">邮箱登录注册</div>
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
        <van-button square block type="primary">注册</van-button>
      </div>
    </div>
    <div class="r-b theme-text">
      <span @click="toPath('/login')">登录</span>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'Register',
  data () {
    return {
      account: '',
      password: ''
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
      this.$http.post('auth/login', {account: this.account, password: md5(this.password), platform: 'pc'}).then((data) => {
        if (data.success) {
          window._token = data.data.token
          localStorage.setItem('token', data.data.token)
          storageUtil.setData('UserInfo', {
            ...data.data,
            // 菜单模式
            menu: ['/testMenu/main'],
            isLogin: true
          })
          // 通过roles的方式
          // this.$store.dispatch('generateRoutes', { roles: data.data.roles || [] }).then(() => {
          //   console.log('生成路由')
          //   // router里面原本只有基础的路由，是后来添加的有权限的路由
          //   this.$router.addRoutes(this.$store.getters.addRouters)
          //   this.$router.replace('/')
          // })
          // 通过menu的方式
          this.$store.dispatch('generateRoutesWithMenu', { menu: ['/testMenu/main'] }).then(() => {
            console.log('生成路由')
            // router里面原本只有基础的路由，是后来添加的有权限的路由
            this.$router.addRoutes(this.$store.getters.addRouters)
            this.$router.replace('/')
          })
        } else {
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  .p-t {
    text-align: center;
    font-size: 40px;
    margin-top: 20px;
    margin-bottom: 60px;
  }
  .p-b {
    margin-top: 40px;
  }
  .r-b {
    margin-top: 60px;
    text-align: center;
  }
  .l-p-p {
    padding: 0 80px;
  }
</style>
