<template>
  <div class="home-main">
    <span>home-main</span>
    <div>
      <router-link :to="'/helloWorld'">hello-world</router-link>
    </div>
    <div>
      <router-link :to="'/testRoles/main'">test-roles-main</router-link>
      <router-link :to="'/testRoles/mine'">test-roles-mine</router-link>
    </div>
    <div>
      <router-link :to="'/testMenu/main'">test-menu-main</router-link>
      <router-link :to="'/testMenu/mine'">test-menu-mine</router-link>
    </div>
    <div>
      <router-link :to="'/toImageDemo'">toImageDemo</router-link>
    </div>
    <van-count-down v-if="time" :time="time" format="DD 天 HH 时 mm 分 ss 秒" >
    </van-count-down>
  </div>
</template>

<script>
import openCountDown from '@/util/openCountDown'
export default {
  name: 'HomeMain',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      time: 0
    }
  },
  created () {
    const time = openCountDown.marketOpenDayCountDown()
    if (time) {
      this.time = time
    } else {
      this.time = 0
    }
    console.log(time)
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
