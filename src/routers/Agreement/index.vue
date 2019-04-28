<template>
  <div class="page-agreement">
    <mt-header title="服务协议" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <h3></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Agreement',
  data () {
    return {
    }
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
