<template>
  <div class="home-main">
    <van-notice-bar
      v-if="buyWarn"
      left-icon="volume-o"
      :text="`您的会员还有${userInfo.vip_days}个交易日到期。`"
    />
    <div class="h-c">
      <div class="p-t">策略工具</div>
      <div class="e-card c-1"   @click="toToday">
        <div class="card-title">
          <div class="m-t">涨跌幅度</div>
          <div class="d-t">swrwerwsss</div>
        </div>
        <img src="../../../assets/card/涨幅.png" alt="">
      </div>
      <div class="e-card c-2" @click="openCountDownShow">
        <div class="card-title">
          <div class="m-t">风险分布</div>
          <div class="d-t">swrwerwsss</div>
        </div>
        <img src="../../../assets/card/分布.png" alt="">
      </div>
      <div class="e-card c-3" @click="toFixBuy">
        <div class="card-title">
          <div class="m-t">定投信号</div>
          <div class="d-t">swrwerwsss</div>
        </div>
        <img src="../../../assets/card/我的定投.png" alt="">
      </div>
      <div class="e-card c-4" @click="toBuySell">
        <div class="card-title">
          <div class="m-t">波段信号</div>
          <div class="d-t">swrwerwsss</div>
        </div>
        <img src="../../../assets/card/波段.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeMain',
  data () {
    return {
      countDownShow: false,
      time: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    buyWarn () {
      return this.userInfo.vip_days === 1 || this.userInfo.vip_days === 2
    }
  },
  created () {
  },
  methods: {
    openCountDownShow () {
      this.$router.push('/signal/indexRisk')
    },
    toToday () {
      this.$router.push('/signal/indexTodayRate')
    },
    toBuySell () {
      this.$router.push('/signal/buySell')
    },
    toFixBuy () {
      this.$router.push('/signal/fixBuy')
    },
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $original--color-white: #FFFFFF !default;
  .oo {
    color: mix($original--color-white, #FFCC00, 40%);
  }
  .c-d-w {
    text-align: center;
    padding: 24px;
    /deep/ {
      .van-count-down {
        font-size: 20px;
      }
    }
    .c-d-w-t {
      font-weight: bold;
    }
    .t-w {
      display: inline-block;
      width: 1.6em;
      color: #fff;
      padding: 3px 0;
      border-radius: 6px;
    }
    .c-d-w-h {
      margin-bottom: 20px;
    }
    .d-t {
      margin-top: 20px;
      font-size: 12px;
    }
  }
  .home-main {
    .h-c {
      padding: 10px 10px;
      padding-bottom: 100px;
    }
  }
  .p-t {
    font-size: 26px;
  }
  .e-card {
    width: 100%;
    border-radius: 8px;
    height: 120px;
    position: relative;
    margin: 12px 0;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    img {
      position: absolute;
      display: block;
      top: 0;
      bottom: 0;
      margin: auto;
      right: 20px;
      height: 80px;
      width: 80px;
    }
    color: #fff;
    &.c-1 {
      color: rgb(135, 56, 0);
      background-color: rgb(255, 204, 0);
    }
    &.c-2 {
      background-color: rgb(255, 102, 52);
    }
    &.c-3 {
      background-color: rgb(63, 162, 255);
    }
    &.c-4 {
      background-color: rgb(166, 77, 255);
    }
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      bottom: -140px;
      content: '';
      display: block;
      box-shadow: 0 0 100px 100px #fff;
      width: 20px;
      height: 20px;
    }
    .card-title {
      margin-top: 10px;
    }
    .m-t {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .d-t {

    }
  }
</style>
