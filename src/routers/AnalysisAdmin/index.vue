<template>
  <div class="page-AnalysisAdminIndex">
    <van-nav-bar title="统计" left-arrow @click-left="backHandler" />
    <div>
      <van-cell>
        <div>
          <span>今日注册</span>
          <span style="float: right">{{count.register}}</span>
        </div>
      </van-cell>
      <van-cell>
        <div>
          <span>今日活跃</span>
          <span style="float: right">{{count.active}}</span>
        </div>
      </van-cell>
      <van-cell>
        <div>
          <span>今日注册激活</span>
          <span style="float: right">{{count.register_active}}</span>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalysisAdminIndex',
  data () {
    return {
      count: {}
    }
  },
  created () {
    this.$http.get('fbsServer/analysis/getUserCount').then((res) => {
      this.count = res.data || {}
    })
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
