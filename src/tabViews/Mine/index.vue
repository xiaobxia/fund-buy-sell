<template>
  <div class="tab-view-mine has-bar">
    <div class="info-wrap">
      <div class="user-img-wrap">
        <img src="../../assets/头像.png" alt="">
      </div>
      <h3 class="user-name">养基小伙伴</h3>
    </div>
    <div class="my-info-wrap simple">
      <mt-cell-swipe  :to="'/page/question'" is-link>
        <div slot="title">
          <h3><i class="fas fa-question-circle"></i>常见问题</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe  :to="'/page/aboutUs'" is-link>
        <div slot="title">
          <h3><i class="fas fa-users"></i>关于我们</h3>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import Http from '@/util/httpUtil.js'
import Toast from '@/common/toast.js'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'Mine',
  data () {
    return {
      userName: ''
    }
  },
  computed: {
  },
  mounted () {
    this.initPage()
    this.addPV('我的首页')
  },
  methods: {
    initPage () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
