<template>
  <div class="page-About">
    <van-nav-bar title="关于" left-arrow @click-left="backHandler" />
    <div class="grey-page">
      <div class="c-w">
        <div class="c-w-c">11</div>
      </div>
      <div class="c-w-g">
        <div class="title-info-block">
          <div class="title-wrap">
            <span class="title-icon"></span>
            <span class="t-t">常见问题</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
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
    padding-top: 20px;
    margin-bottom: 10px;
    .c-w-c {
      background-color: #fff;
    }
  }
</style>
