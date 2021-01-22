<template>
  <div class="app-layout">
    <div class="router-wrap" :class="{showTabbar: showTabbar}">
      <router-view :key="key"/>
    </div>
    <van-tabbar v-if="showTabbar" v-model="active">
      <van-tabbar-item name="/home/main" icon="home-o" replace to="/home/main">主页</van-tabbar-item>
      <van-tabbar-item name="/home/mine" icon="setting-o" info="20" replace to="/home/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      active: 'main'
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
    this.$http.get('fbsServer/user/getUserByToken').then((res) => {
      this.$store.commit('SET_userInfo', res.data || {})
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
