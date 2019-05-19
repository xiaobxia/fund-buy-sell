<template>
  <div class="component-fold-card" @click="switchCard">
    <div class="header"><div class="title"><i :class="['fas', open ? 'fa-angle-down': 'fa-angle-right']"></i><slot name='title'></slot></div></div>
    <div v-if="open" class="content"><slot name='content'></slot></div>
  </div>
</template>

<script>
export default {
  name: 'FoldCard',
  data () {
    return {
      open: false
    }
  },
  mounted () {
  },
  methods: {
    switchCard () {
      this.open = !this.open
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
