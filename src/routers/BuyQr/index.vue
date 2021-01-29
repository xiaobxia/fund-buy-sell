<template>
  <div class="page-buyqr">
    <van-nav-bar title="支付二维码" left-arrow @click-left="backHandler" />
    <div v-if="code">
      <van-steps direction="vertical" :active="0">
        <van-step>
          <div class="v-s-t">复制6位支付令牌</div>
          <div class="c-t-w">
            <span class="c-t">{{code}}</span>
            <span
              v-clipboard:copy="code"
              v-clipboard:success="copySuccess"
              class="c-b theme-text"
            >一键复制</span>
          </div>
        </van-step>
        <van-step>
          <div class="v-s-t">扫描二维码完成支付<span class="theme-text">(付款时,请备注6位支付令牌)</span></div>
          <div class="qr-img">
            <img v-if="day === '20'" src="../../assets/payQr/20d.jpg" alt="">
          </div>
        </van-step>
        <van-step>
          <div class="v-s-t">付款成功后，工作人员将在半小时内处理订单，请耐心等待</div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'vant'

export default {
  name: 'BuyQr',
  data () {
    return {
      code: '',
      day: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    const query = this.$route.query
    this.day = query.days
    this.$http.post('fbsServer/user/createPayCode', {
      email: this.userInfo.email
    }).then((res) => {
      this.code = res.data.code
    })
  },
  methods: {
    copySuccess () {
      Toast.success('复制成功！')
    },
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .page-buyqr {
    /deep/ {
      .van-step__icon {

      }
      .van-step__circle {

      }
      .van-step__icon--active {
        color: #E2684D;
      }
      .van-step__title--active {
        /*color: #E2684D;*/
      }
    }
    .v-s-t {
    }
  }
  .c-t-w {
    margin-top: 10px;
    line-height: 30px;
    color: #303133;
  }
  .c-t {
    vertical-align: middle;
    font-size: 24px;
  }
  .c-b {
    vertical-align: middle;
    margin-left: 30px;
  }
  .qr-img {
    margin-top: 15px;
    img {
      width: 300px
    }
  }
</style>
