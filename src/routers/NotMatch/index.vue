<template>
  <div class="page-404">
    <van-nav-bar title="错误" left-arrow @click-left="backHandler" />
    <!-- 通用错误 -->
    <div class="e-w">
      <van-empty image="error" description="您寻找的内容不存在" />
    </div>
    <div class="p-b">
      <van-button
        round
        block
        type="primary"
        class="liner-bg"
        @click="backHandler"
      >返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotMatch',
  data () {
    return {
    }
  },
  methods: {
    backHandler () {
      this.$router.replace('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .page-404 {
    text-align: center;
  }
  .e-w {
    margin-top: 16vh
  }
  .p-b {
    margin-top: 40px;
    padding: 0 120px;
  }
</style>
