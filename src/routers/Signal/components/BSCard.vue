<template>
  <div class="bs-card">
    <span>111</span>
  </div>
</template>

<script>
export default {
  name: 'BSCard',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .bs-card {

  }
</style>
