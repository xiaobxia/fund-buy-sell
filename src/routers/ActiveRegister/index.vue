<template>
  <div class="page-ActiveRegister">
    <span>hello-world</span>
  </div>
</template>

<script>
export default {
  name: 'ActiveRegister',
  data () {
    return {
    }
  },
  created () {
    const query = this.$route.query
    this.$http.get('', {
      activeToken: query.activeToken
    })
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
