<template>
  <div class="page-ActiveRegister">
    <van-nav-bar title="养基定投波段" />
    <div class="d-c">
      <div v-if="status === 'success'">
        <img src="../../assets/result/成功.png" alt="">
        <p>邮箱验证成功</p>
      </div>
      <div v-if="status === 'error'">
        <img src="../../assets/result/失败.png" alt="">
        <p>{{text}}</p>
      </div>
    </div>
    <span></span>
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .d-c {
    margin-top: 20vh;
    text-align: center;
    font-size: 18px;
    img {
      width: 125px;
      margin-bottom: 50px;
    }
  }
</style>
