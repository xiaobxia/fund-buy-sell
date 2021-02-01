<template>
  <div class="home-main">
    <van-button type="primary" @click="openCountDownShow">指数风险</van-button>
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
