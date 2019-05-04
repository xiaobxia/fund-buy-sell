<template>
  <div class="tab-view-mine has-bar">
    <div class="info-wrap">
      <div class="user-img-wrap">
        <img src="../../assets/头像.png" alt="">
      </div>
      <h3 class="user-name">{{userName}}</h3>
      <template v-if="isVip" >
        <img class="vip" src="../../assets/vip-1.png" alt="">
        <div class="buy-type-wrap">
          <div>{{userData.buy_type}}套餐</div>
          <div>剩余{{userData.can_use_day}}天</div>
        </div>
      </template>
      <template v-else >
        <img class="vip" src="../../assets/vip-0.png" alt="">
        <div class="buy-type-wrap">
          <div>未购买</div>
          <div>服务</div>
        </div>
      </template>
    </div>
    <div class="my-info-wrap simple">
      <mt-cell-swipe v-if="userData.if_test" :to="'/page/recharge'" is-link>
        <div slot="title">
          <h3><i class="fas fa-hand-holding-usd"></i>去充值</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe  v-else :to="'/page/getTest'" is-link>
        <div slot="title">
          <h3><i class="fas fa-gift"></i>去试用波段策略</h3>
        </div>
      </mt-cell-swipe>
      <!--<mt-cell-swipe :to="'/page/invitation'" is-link>-->
        <!--<div slot="title">-->
          <!--<h3><i class="fas fa-gift"></i>邀请有礼</h3>-->
        <!--</div>-->
      <!--</mt-cell-swipe>-->
    </div>
    <div class="btn-wrap">
      <mt-button type="primary" @click="okHandler" class="main-btn">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import Toast from '@/common/toast.js'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'Mine',
  data () {
    return {
      userName: ''
    }
  },
  computed: {
    userData () {
      return this.$store.state.userInfo || {}
    },
    isVip () {
      const userInfo = this.$store.state.userInfo || {}
      return userInfo.isVip || false
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
    },
    okHandler () {
      Http.get('auth/logout', {token: window._token, platform: 'mobile'}).then((data) => {
        if (data.success) {
          localStorage.removeItem('token')
          storageUtil.initUserInfo({
            isLogin: false
          })
          this.$router.push('/page/login')
        } else {
          Toast.error('操作失败')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
