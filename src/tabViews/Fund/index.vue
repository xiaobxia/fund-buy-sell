<template>
  <div class="tab-view-fund">
    <div class="has-bar">
      <div v-if="ifWechat" class="teach-warn">想知道如何更方便地使用分析工具吗？<div class="teach-btn" @click="toNormalPath('/page/wechatTeach')">去瞧瞧</div></div>
      <div class="info-warn">排行内容</div>
      <div class="img-card" @click="toNormalPath('/page/todayRank')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/今日.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">今日指数排行</div>
        </div>
      </div>
      <div class="img-card" @click="toNormalPath('/page/monthRank')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/月度合同.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">月度指数排行</div>
        </div>
      </div>
      <div class="info-warn">定投内容</div>
      <div class="img-card" @click="toNormalPath('/page/fixedInvestment')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/投币.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">定投策略</div>
        </div>
      </div>
      <div class="img-card" @click="toNormalPath('/page/valuation')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/估值体系.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">定投估值</div>
        </div>
      </div>
      <div class="info-warn">波段内容</div>
      <div class="img-card" @click="toNormalPath('/page/band')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/行情.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">波段策略</div>
        </div>
      </div>
      <div class="img-card" @click="toNormalPath('/page/highBand')">
        <!--<img src="../../assets/timg.jpg" alt="">-->
        <div class="container">
          <div class="content">
            <img src="../../assets/25风险.png" alt="">
            <!--<i class="fas fa-allergies"></i>-->
          </div>
          <div class="bottom">高风偏波段</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import ToastBig from '@/common/toast.js'
import environmentUtil from '@/util/environmentUtil.js'

export default {
  name: 'Fund',
  data () {
    return {
      ifWechat: environmentUtil.ifWechat() || false
    }
  },
  computed: {
  },
  mounted () {
    this.initPage()
    this.addPV('基金首页')
  },
  methods: {
    initPage () {
    },
    toNormalPath (path) {
      this.$router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-body {
    padding: 30px;
  }
</style>
