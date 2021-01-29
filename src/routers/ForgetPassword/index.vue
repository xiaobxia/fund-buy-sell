<template>
  <div class="l-p-p">
    <!--<van-nav-bar left-arrow @click-left="backHandler" />-->
    <div class="b-b">
      <van-button plain type="primary" size="small" @click="toPath('/login')">登录</van-button>
    </div>
    <div class="w-t">
      <h2>找回密码</h2>
    </div>
    <div>
      <van-form ref="form">
        <van-field
          v-model="email"
          maxlength="50"
          placeholder="请输入邮箱"
          :rules="[
            { required: true, message: '请输入邮箱' },
            { validator: emailValidator, message: '邮箱格式不正确' }
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
          @click="sendHandler"
        >发送找回密码邮件</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'ForgetPassword',
  data () {
    return {
      email: '',
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
    sendHandler () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        this.$http.post('fbsServer/auth/sendForgetEmail', {
          email: this.email
        }).then(() => {
          this.loading = false
          Toast.success('找回密码邮件已发送，请注意查收！')
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
