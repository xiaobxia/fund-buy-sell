<template>
  <div class="operating-info">
    <mt-header title="定投策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="main-warn">
        <div class="red-text">越接近收盘，信号越准确，推荐在14:45以后15:00之前根据信号操作</div>
        <div class="purple-text">{{content}}</div>
      </div>
      <div>
        <mt-cell-swipe v-for="(item) in list" :key="item.code" :class="[
      item.detail.buySell[0] === '买'?'buy':item.detail.buySell[0] === '卖'?'sell':''
      ]">
          <div slot="title">
            <h3>
              <span class="index-name">{{item.name}}</span>
              <span style="float: right" :class="numberClass(item.detail.rate)">{{item.detail.rate}}%</span>
            </h3>
            <p class="date">
            <span v-for="(subItem, index) in item.detail.kline" :key="index"
            >{{dayDate(subItem.date)}}</span>
            </p>
            <p class="netChange wn">
            <span v-for="(subItem, index) in item.detail.kline" :key="index"
                  :class="numberClass(subItem.netChangeRatio)">{{subItem.netChangeRatio}}%</span>
            </p>
            <p class="explain">
            <span v-for="(subItem, index) in item.detail.buySell" :key="subItem + index"
                  :class="subItem === '买'?'buy':''">{{subItem === '买'?'买':''}}</span>
            </p>
            <p class="target">标的：{{item.fundCode}} {{item.fundName}}</p>
          </div>
        </mt-cell-swipe>
      </div>
      <div class="exemption">
        <div class="title">风险提示</div>
        <div class="bottom">以上数据均为历史回测表现，不能代表未来发展趋势，每个指标都有他的局限性，在不同的市场环境下可能会出现于回测数据不一致的表现，投资者需要根据不同场景合理应用。</div>
        <div class="bottom">本产品非投资咨询产品，非荐股软件，产品内容仅供参考，不构成投资建议。投资者据此操作，风险自担</div>
      </div>
    </div>
  </div>
</template>

<script>
import Watermark from '@/util/watermark'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'FixedInvestment',
  data () {
    return {
      watermarkId: '',
      list: [],
      content: ''
    }
  },
  computed: {
  },
  beforeDestroy () {
    Watermark.remove(this.watermarkId)
  },
  mounted () {
    this.initPage()
    const userInfo = storageUtil.getUserInfo()
    this.watermarkId = Watermark.set(userInfo.name)
  },
  methods: {
    initPage () {
      const deviceId = storageUtil.getDeviceInfo('device_id')
      const name = storageUtil.getUserInfo('name')
      this.$http.get('customer/getFixedInvestment').then((data) => {
        if (data.success) {
          const list = data.data
          list.sort((a, b) => {
            return a.sortIndex - b.sortIndex
          })
          this.list = list
        }
      })
      this.$http.get('customer/getFixedInvestmentContent').then((data) => {
        if (data.success) {
          this.content = data.data.value
        }
      })
      this.$http.get('customer/addTodayQuery', {
        name: name,
        device_id: deviceId,
        type: 'fixedInvestment'
      })
      // this.$http.get('auth/checkCustomer', {
      //   name: name,
      //   device_id: deviceId,
      //   type: 'fixedInvestment'
      // }).then((data) => {
      //   if (data.success) {
      //     this.$http.get('customer/addTodayQuery', {
      //       name: name,
      //       device_id: deviceId,
      //       type: 'fixedInvestment'
      //     })
      //   } else {
      //     ToastBig.error(data.message, 1000)
      //   }
      // })
    },
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
