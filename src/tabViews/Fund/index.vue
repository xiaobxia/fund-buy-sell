<template>
  <div class="tab-view-fund">
    <div class="has-bar">
      <div v-if="showTopWarnTest" class="top-warn">您的套餐只剩1天了哦，快去申请试用吧！</div>
      <div v-if="showTopWarnBuy" class="top-warn">您的套餐只剩1天了哦，快去充值吧！</div>
      <div class="img-card" @click="toPath('/page/fixedInvestment', 'fixedInvestment')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/投币.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">定投策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/band', 'band')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/行情.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">波段策略</div>
        </div>
      </div>
      <div class="img-card" @click="toPath('/page/highBand', 'band')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/25风险.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">高风偏波段</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import ToastBig from '@/common/toast.js'

export default {
  name: 'Fund',
  data () {
    return {}
  },
  computed: {
    userData () {
      return this.$store.state.userInfo || {}
    },
    showTopWarnTest () {
      const userInfo = this.$store.state.userInfo || {}
      if (userInfo.can_use_day === 1 && userInfo.if_test === false) {
        return true
      }
      return false
    },
    showTopWarnBuy () {
      const userInfo = this.$store.state.userInfo || {}
      if (userInfo.can_use_day === 1 && userInfo.if_test === true) {
        return true
      }
      return false
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
    },
    toPath (path, type) {
      if (type === 'fixedInvestment') {
        this.$router.push(path)
        return
      }
      const deviceId = storageUtil.getDeviceInfo('device_id')
      const name = storageUtil.getUserInfo('name')
      this.$http.get('auth/checkCustomer', {
        name: name,
        device_id: deviceId,
        type: type
      }).then((data) => {
        if (data.success) {
          this.$router.push(path)
        } else {
          if (type === 'band' && this.userData.if_test === false) {
            this.$router.push('/page/getTest')
            return
          }
          ToastBig.error(data.message, 1000)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-body {
    padding: 30px;
  }
</style>
