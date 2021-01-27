<template>
  <div class="page-ActiveRegister">
    <van-nav-bar title="养基定投波段" />
    <div class="d-c">
      <div v-if="status === 'success'">
        <img src="../../assets/result/成功.png" alt="">
        <p>邮箱验证成功</p>
        <div class="p-b">
          <van-button
            round
            block
            type="primary"
            class="liner-bg"
            @click="toLoginHandler"
          >立即登录</van-button>
        </div>
      </div>
      <div v-if="status === 'error'">
        <img src="../../assets/result/失败.png" alt="">
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveRegister',
  data () {
    return {
      status: '',
      text: ''
    }
  },
  created () {
    const query = this.$route.query
    this.$http.get('fbsServer/auth/activeRegister', {
      activeToken: query.activeToken
    }, {noWarn: true}).then(() => {
      this.status = 'success'
    }).catch((err) => {
      this.status = 'error'
      this.text = err.message
      console.log(err.message)
    })
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    toLoginHandler () {
      this.$router.replace('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .d-c {
    margin-top: 15vh;
    text-align: center;
    font-size: 18px;
    img {
      width: 125px;
      margin-bottom: 20px;
    }
  }
  .p-b {
    position: relative;
    margin: auto;
    width: 260px;
    margin-top: 40px;
  }
</style>
