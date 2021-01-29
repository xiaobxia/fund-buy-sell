<template>
  <div class="l-p-p">
    <van-nav-bar title="找回密码" />
    <div class="w-t">
      <h2>请重新设置密码</h2>
    </div>
    <div>
      <van-form ref="form">
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
          @click="submitHandler"
        >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'

export default {
  name: 'FindPassword',
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
    submitHandler () {
      this.$refs.form.validate().then(() => {
        const query = this.$route.query
        this.loading = true
        this.$http.post('fbsServer/auth/resetPassword', {
          code: query.activeToken,
          password: this.password
        }).then(() => {
          this.loading = false
          Dialog.alert({
            message: '密码重置成功！',
            confirmButtonText: '去登陆'
          }).then(() => {
            this.toPath('/login')
          })
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
    margin-top: 40px;
    h2 {
      margin-bottom: 20px;
    }
    p {
      color: #909399;
      margin-bottom: 40px;
    }
  }
</style>
