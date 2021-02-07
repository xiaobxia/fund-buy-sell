<template>
  <div class="disclaimer">
    <p>【养基定投波段】提供的任何信息或意见仅供参考，并不构成任何人的投资建议。投资者不得直接据此作出买入或卖出判断，否则自行承担投资风险。</p>
    <p>温馨提示:基金有风险，投资需谨慎。</p>
  </div>
</template>

<script>
export default {
  name: 'Disclaimer',
  data () {
    return {
      activeQA: ''
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
  .disclaimer {
    font-size: 10px;
    text-align: left;
    p {
      margin-bottom: 0;
    }
  }
</style>
