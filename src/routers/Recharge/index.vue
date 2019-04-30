<template>
  <div class="page-recharge">
    <mt-header title="充值说明" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <img src="../../assets/pay.jpg" alt="">
      <div class="title">搜索并添加客服微信号"fund_buy_sell"提交充值申请或咨询</div>
      <mt-button type="primary" v-clipboard="'fund_buy_sell'" v-clipboard:success="clipboardSuccessHandler">一键复制微信号</mt-button>
      <img src="../../assets/kefu.jpg" alt="">
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Recharge',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', `/充值说明`])
    }
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    clipboardSuccessHandler () {
      Toast({
        message: '复制成功',
        duration: 1000
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
