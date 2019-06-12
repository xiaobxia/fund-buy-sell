<template>
  <div class="tab-view-mine has-bar">
    <div class="info-wrap">
      <div class="user-img-wrap">
        <img src="../../assets/头像.png" alt="">
      </div>
      <h3 class="user-name">{{userData.name || '养基小伙伴'}}</h3>
      <template v-if="userData.name" >
        <template v-if="isVip" >
          <img class="vip" src="../../assets/皇冠.png" alt="">
          <div class="buy-type-wrap">
            <div>{{userData.buy_type}}套餐</div>
            <div>剩余{{userData.can_use_day}}天</div>
          </div>
        </template>
        <template v-else >
          <img class="vip" src="../../assets/皇冠1.png" alt="">
          <div class="buy-type-wrap">
            <div>波段套餐</div>
            <div>剩余0天</div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="no-logo">
          <div>未登录</div>
        </div>
      </template>
    </div>
    <div class="my-info-wrap simple">
      <mt-cell-swipe v-if="userData.if_test" :to="'/page/recharge'" is-link>
        <div slot="title">
          <h3><i class="fas fa-hand-holding-usd"></i>去续期</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe  v-else-if="userData.can_use_day<=1" :to="'/page/getTest'" is-link>
        <div slot="title">
          <h3><i class="fas fa-gift"></i>去试用</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe  :to="'/page/question'" is-link>
        <div slot="title">
          <h3><i class="fas fa-question-circle"></i>常见问题</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe  :to="'/page/aboutUs'" is-link>
        <div slot="title">
          <h3><i class="fas fa-users"></i>关于我们</h3>
        </div>
      </mt-cell-swipe>
      <!--<mt-cell-swipe :to="'/page/invitation'" is-link>-->
        <!--<div slot="title">-->
          <!--<h3><i class="fas fa-gift"></i>邀请有礼</h3>-->
        <!--</div>-->
      <!--</mt-cell-swipe>-->
    </div>
    <div class="btn-wrap">
      <mt-button v-if="userData.name" type="primary" @click="okHandler" class="main-btn">退出登录</mt-button>
      <mt-button v-else type="primary" @click="toLoginHandler" class="main-btn">去登录 / 注册</mt-button>
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
    this.addPV('我的首页')
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
          storageUtil.setAppConfig('homeTabSelect', 'fund')
          window.location.reload()
        } else {
          Toast.error('操作失败')
        }
      })
    },
    toLoginHandler () {
      this.$router.push('/page/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
