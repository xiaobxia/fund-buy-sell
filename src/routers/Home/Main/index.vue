<template>
  <div class="home-main">
    <van-button type="primary" @click="openCountDownShow">主要按钮</van-button>
    <van-dialog v-model="countDownShow" :show-cancel-button="false">
      <div class="c-d-w">
        <div class="c-d-w-h">购买开放倒计时</div>
        <van-count-down v-if="time" :time="time">
          <template #default="timeData">
            <div class="c-d-w-t">
              <span class="t-w theme-bg">{{ timeData.hours }}</span>
              <span class="theme-text">:</span>
              <span class="t-w theme-bg">{{ timeData.minutes }}</span>
              <span class="theme-text">:</span>
              <span class="t-w theme-bg">{{ timeData.seconds }}</span>
            </div>
          </template>
        </van-count-down>
        <div class="d-t">
          <div>开放时间：</div>
          <div>非交易日（9:00 - 22:00）</div>
          <div>交易日（9:00 - 14:00，15:00 - 22:00）</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import openCountDown from '@/util/openCountDown'
export default {
  name: 'HomeMain',
  data () {
    return {
      countDownShow: false,
      time: 0
    }
  },
  created () {
    const time = openCountDown.marketOpenDayCountDown()
    if (time) {
      this.time = time
    } else {
      this.time = 0
    }
  },
  methods: {
    openCountDownShow () {
      this.countDownShow = true
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
</style>
