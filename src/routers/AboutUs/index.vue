<template>
  <div class="page-about-us">
    <mt-header title="关于我们" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body content">
      <h3>养基波段定投</h3>
      <p>专注指数基金定投和波段操作，分享交易信息。拥有专属技术分析工具。</p>
      <mt-button type="primary" v-clipboard="'fund_do'" v-clipboard:success="clipboardSuccessHandler">一键复制公众号</mt-button>
      <img src="../../assets/aboutUs.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data () {
    return {
    }
  },
  mounted () {
    this.addPV('关于我们')
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
