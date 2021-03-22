<template>
  <div>
    <div v-if="showLayout" class="app-layout">
      <div class="router-wrap" :class="{showTabbar: showTabbar}">
        <router-view :key="key"/>
      </div>
      <van-tabbar v-if="showTabbar" v-model="active" active-color="#E2684D" :fixed="true">
        <van-tabbar-item name="/home/main" replace to="/home/main">
          <span>主页</span>
          <template #icon="props">
            <van-icon v-if="props.active" name="wap-home"/>
            <van-icon v-else name="wap-home-o" />
          </template>
        </van-tabbar-item>
        <!--<van-tabbar-item name="/home/chat" replace to="/home/chat">-->
          <!--<span>消息</span>-->
          <!--<template #icon="props">-->
            <!--<van-icon v-if="props.active" name="comment"/>-->
            <!--<van-icon v-else name="comment-o" />-->
          <!--</template>-->
        <!--</van-tabbar-item>-->
        <!--<van-tabbar-item name="/home/gzh" replace to="/home/gzh">-->
          <!--<span>公众号</span>-->
          <!--<template #icon="props">-->
            <!--<van-icon v-if="props.active" name="photo"/>-->
            <!--<van-icon v-else name="photo-o" />-->
          <!--</template>-->
        <!--</van-tabbar-item>-->
        <van-tabbar-item name="/home/mine" replace to="/home/mine">
          <span>我的</span>
          <template #icon="props">
            <van-icon v-if="props.active" name="manager"/>
            <van-icon v-else name="manager-o" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div v-else class="full-loading">
      <van-loading type="spinner" color="#E2684D"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      active: 'main',
      showLayout: false
    }
  },
  computed: {
    key () {
      return this.$route.path
    },
    showTabbar () {
      const path = this.$route.path
      return path.startsWith('/home')
    }
  },
  watch: {
    '$route.path' (value) {
      this.active = value
    }
  },
  created () {
    this.active = this.$route.path
    this.showLayout = false
    this.$http.get('fbsServer/user/getUserByToken').then((res) => {
      const data = res.data || {}
      if (data.roles && data.roles.indexOf('admin') !== -1) {
        window.userRoles = 'admin'
      }
      this.$store.commit('SET_userInfo', res.data || {})
      this.showLayout = true
    }).catch((err) => {
      console.log(err)
      this.$router.replace('/login')
    })
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .router-wrap {

  }
</style>
