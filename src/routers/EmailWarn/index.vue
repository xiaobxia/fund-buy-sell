<template>
  <div class="page-EmailWarn">
    <van-nav-bar title="邮箱验证" left-arrow @click-left="backHandler" />
    <should-active-email/>
  </div>
</template>

<script>
import ShouldActiveEmail from '@/components/ShouldActiveEmail/index.vue'
export default {
  name: 'EmailWarn',
  components: {
    ShouldActiveEmail
  },
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
