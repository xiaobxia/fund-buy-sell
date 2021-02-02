<template>
  <div class="home-main">
    <div class="p-t">策略工具</div>
    <van-button type="primary" @click="openCountDownShow">指数风险</van-button>
    <van-button type="primary" @click="toToday">今日涨跌幅</van-button>
    <van-button type="primary" @click="toBuySell">买卖信号</van-button>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',
  data () {
    return {
      countDownShow: false,
      time: 0
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
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
    padding: 10px 10px;
  }
  .p-t {
    font-size: 26px;
  }
</style>
