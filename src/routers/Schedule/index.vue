<template>
  <div class="page-Schedule">
    <van-nav-bar title="定时任务" left-arrow @click-left="backHandler" />
    <div>
      <div v-for="(item,index) in tableData" :key="index" class="p-b">
        <van-button
          round
          block
          type="primary"
          class="liner-bg"
          @click="doHandler(item.url)"
        >{{item.name}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Schedule',
  data () {
    return {
      tableData: [
        { name: '验证开盘', url: 'schedule/verifyMarketOpening' },
        { name: '扣减vip天数', url: 'schedule/deleteVipDays' },
        { name: '更新公众号token', url: 'schedule/getGzhToken' },
        { name: '更新指数涨跌幅', url: 'schedule/updateIndexRate' }
      ]
    }
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    homeHandler () {
      this.$router.replace('/')
    },
    doHandler (url) {
      this.$http.get(`fbsServer/${url}`).then((res) => {
        Toast.success('操作成功！')
      })
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
    padding: 0 20px;
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
