<template>
  <div class="page-wechat-teach">
    <mt-header title="教程" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <p>小伙伴们一定觉得在微信中使用我们的分析工具很麻烦，因为你首先要找到我们公众号然后点击来，然后点击分析工具，再然后扫描二维码，才能真正进入分析工具。</p>
      <p>而且如果登录了的话，会发现过段时间进来，又得重新登录。</p>
      <p>没有办法，在微信中使用限制就是这么多。所以我们会教大家怎么在微信外使用分析工具，好处就是可以像APP一样一点即开，而且登录一次就不需要再登录了。</p>
      <div v-if="deviceType === '苹果'">
        <h3>步骤1：点击右上角</h3>
        <img src="../../assets/ios-s-1.jpg" alt="">
        <h3>步骤2：点击“在Safari中打开”</h3>
        <img src="../../assets/ios-s-2.jpg" alt="">
        <h3>步骤3：点击分享图标</h3>
        <img src="../../assets/ios-s-3.jpg" alt="">
        <h3>步骤4：点击“添加到主屏幕”</h3>
        <img src="../../assets/ios-s-4.jpg" alt="">
        <h3>步骤5：点击“添加”</h3>
        <img src="../../assets/ios-s-5.jpg" alt="">
        <h3>步骤5：桌面就出现分析工具的链接了</h3>
        <img src="../../assets/ios-s-6.jpg" alt="">
      </div>
      <div v-else>
        <h3>步骤1：点击右上角</h3>
        <img src="../../assets/ad-s-1.jpg" alt="">
        <h3>步骤2：点击“在浏览器打来”</h3>
        <img src="../../assets/ad-s-2.jpg" alt="">
        <h3>步骤3：点击“添加快捷方式”</h3>
        <img src="../../assets/ad-s-3.jpg" alt="">
        <h3>步骤4：添加收藏至桌面，点击确定</h3>
        <img src="../../assets/ad-s-4.jpg" alt="">
        <h3>步骤5：桌面就出现分析工具的图标了</h3>
        <img src="../../assets/ad-s-5.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import environmentUtil from '@/util/environmentUtil.js'
export default {
  name: 'WechatTeach',
  data () {
    return {
      deviceType: environmentUtil.getDeviceType()
    }
  },
  mounted () {
    this.addPV('微信教学')
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
