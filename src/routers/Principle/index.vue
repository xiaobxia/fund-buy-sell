<template>
  <div class="page-principle">
    <mt-header title="原理" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Principle',
  data () {
    return {
    }
  },
  mounted () {
    this.addPV('软件原理')
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
