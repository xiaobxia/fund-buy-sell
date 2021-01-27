<template>
  <div class="warning-active-email">
    <div class="s-w">
      <img src="../../assets/result/警告.png" alt="">
      <p>您的邮箱未验证验证，请进行验证！</p>
      <div class="p-b">
        <van-button
          :loading="loading"
          round
          block
          type="primary"
          class="liner-bg"
          @click="sendHandler"
        >发送验证邮件</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'ShouldActiveEmail',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
  },
  methods: {
    sendHandler () {
      this.loading = true
      this.$http.post('fbsServer/auth/sendActiveEmail', {
        email: this.userInfo.email
      }).then(() => {
        this.loading = false
        Toast.success('邮件已发送，请注意查收！')
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .s-w {
    margin-top: 10vh;
    text-align: center;
    font-size: 18px;
    img {
      width: 125px;
      margin-bottom: 20px;
    }
  }
  .warning-active-email {
    padding: 0 24px;
  }
  .liner-bg {
    position: relative;
    margin: auto;
    width: 260px;
    margin-top: 40px;
  }
</style>
