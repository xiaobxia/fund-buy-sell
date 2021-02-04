<template>
  <div v-if="countDownShow" class="c-d-w">
    <div class="d-t">信号更新倒计时</div>
    <van-count-down v-if="time" :time="time" @finish="finish">
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
  </div>
</template>

<script>

export default {
  name: 'SignalCountDown',
  data () {
    return {
      countDownShow: false,
      time: 0
    }
  },
  created () {
  },
  methods: {
    open (time) {
      this.time = time || 0
      this.countDownShow = true
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    finish () {
      this.countDownShow = false
      this.$emit('finish')
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
      font-size: 36px;
      font-weight: bold;
    }
    .t-w {
      display: inline-block;
      width: 1.6em;
      color: #fff;
      line-height: 1.6em;
      border-radius: 6px;
    }
    .c-d-w-h {
      margin-bottom: 20px;
    }
    .d-t {
      font-size: 24px;
      text-align: center;
      margin-bottom: 30px;
    }
  }
</style>
