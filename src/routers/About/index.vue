<template>
  <div class="page-About">
    <van-nav-bar title="关于" left-arrow @click-left="backHandler" />
    <div class="grey-page">
      <div class="c-w">
        <div class="c-w-c">
          <div>
            <img src="../../assets/gzh-s.png" alt="">
          </div>
        </div>
      </div>
      <van-cell title="意见反馈" is-link to="/feedback" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      activeQA: ''
    }
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    homeHandler () {
      this.$router.replace('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .e-w {
    margin-top: 16vh
  }
  .p-b {
    margin-top: 40px;
    padding: 0 120px;
  }
  .c-w {
    padding-top: 10px;
    margin-bottom: 10px;
    .c-w-c {
      background-color: #fff;
    }
    img {
      width: 100%;
    }
  }
</style>
