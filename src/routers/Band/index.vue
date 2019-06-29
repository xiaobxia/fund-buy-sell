<template>
  <div class="operating-info">
    <mt-header title="波段策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="main-warn new-main-warn">
        <div class="yellow-warn">
          <div>越接近收盘，信号越准确，推荐在14:45以后15:00之前操作</div>
          <div>不能简单根据信号操作，建议结合操作建议使用</div>
        </div>
        <div class="blue-warn">
          <div>仓位建议：<span style="font-weight: 600;">{{positionContent || 0}}%</span></div>
          <div>操作建议：{{marketWarn || '未更新'}}</div>
        </div>
      </div>
      <mt-cell-swipe v-for="(item) in list" :key="item.code" :class="[
      item.detail.buySell[0] === '买'?'buy':item.detail.buySell[0] === '卖'?'sell':'',
      'should-' + getShouldDo(item.detail.kline, item.detail.buySell)
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
                  :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem === '买'?'买': subItem === '卖'?'卖':''}}</span>
          </p>
          <p class="target">推荐标的：{{item.fundCode}} {{item.fundName}}</p>
        </div>
      </mt-cell-swipe>
      <div class="ad-block" v-if="ifShowAd()">
        <img :src="ad_url" alt="">
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
import ToastBig from '@/common/toast.js'

export default {
  name: 'Band',
  data () {
    return {
      watermarkId: '',
      list: [],
      positionContent: '',
      marketWarn: '',
      ad_url: ''
    }
  },
  computed: {
  },
  beforeDestroy () {
  },
  mounted () {
    this.initPage()
    this.addPV('波段策略')
    setTimeout(() => {
      this.getAdUrl()
    }, 700)
  },
  methods: {
    initPage () {
      const deviceId = storageUtil.getDeviceInfo('device_id')
      this.$http.get('customerCommon/getBand', {
        device_id: deviceId,
        type: 'band'
      }).then((data) => {
        if (data.success) {
          this.$http.get('customerCommon/getBandContent').then((data) => {
            if (data.success) {
              this.positionContent = data.data.positionContent
              this.marketWarn = data.data.marketWarn
            }
          })
          const list = data.data
          list.sort((a, b) => {
            return a.sortIndex - b.sortIndex
          })
          this.list = list
        } else {
          ToastBig.error(data.message, 1000)
        }
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    getShouldDo (kline, buySellList) {
      let ifBuy = false
      let ifSell = false
      let firstFlag = ''
      let firstFlagIndex = 0
      // 首先今天是没有出信号的
      if (buySellList[0] !== '') {
        return ''
      }
      // 获取之后的第一个信号
      for (let i = 1; i < buySellList.length; i++) {
        if (buySellList[i] !== '') {
          firstFlagIndex = i
          firstFlag = buySellList[i]
          break
        }
      }
      // 今天没信号，之前有卖出，并且连续跌1天及以上，那就提示卖出
      if (firstFlag === '卖') {
        if (firstFlagIndex >= 1) {
          let allDown = true
          for (let i = 0; i < firstFlagIndex; i++) {
            if (kline[i].netChangeRatio > 0) {
              allDown = false
              break
            }
          }
          if (allDown) {
            ifSell = true
          }
        }
      }
      // 今天没信号，之前有买入，并且连续涨1天及以上，那就提示买入
      if (firstFlag === '买') {
        if (firstFlagIndex >= 1) {
          let allUp = true
          for (let i = 0; i < firstFlagIndex; i++) {
            if (kline[i].netChangeRatio < 0) {
              allUp = false
              break
            }
          }
          if (allUp) {
            ifBuy = true
          }
        }
      }
      // 今天没信号，之前有卖出，卖出信号第二天涨了，但是涨得少，之后都跌了也应该卖出
      if (firstFlag === '卖') {
        if (firstFlagIndex >= 2) {
          const changeRatio = kline[firstFlagIndex - 1].netChangeRatio
          // 卖出信号第二天涨了，但是涨得少
          if (changeRatio > 0 && changeRatio < 0.5) {
            let allDown = true
            for (let i = 0; i < (firstFlagIndex - 1); i++) {
              if (kline[i].netChangeRatio > 0) {
                allDown = false
                break
              }
            }
            if (allDown) {
              ifSell = true
            }
          }
        }
      }
      // 今天没信号，之前有卖出，之后只有一天涨了（但不是今天）而且涨的很少也应该卖出
      if (firstFlag === '卖') {
        if (firstFlagIndex >= 3) {
          // 今天是跌的
          if (kline[0].netChangeRatio < 0) {
            let upCount = 0
            let upIndex = 0
            for (let i = 0; i < firstFlagIndex; i++) {
              if (kline[i].netChangeRatio > 0) {
                upCount++
                upIndex = i
              }
            }
            // 只有一天是上涨的
            if (upCount === 1) {
              const changeRatio = kline[upIndex].netChangeRatio
              // 但是涨得少
              if (changeRatio > 0 && changeRatio < 0.5) {
                ifSell = true
              }
            }
          }
        }
      }
      if (ifSell) {
        return 'sell'
      }
      if (ifBuy) {
        return 'buy'
      }
      return ''
    },
    getAdUrl () {
      const type = this.showAdType()
      this.$http.get('customerCommon/getAdvertisements', {
        current: 1,
        pageSize: 10,
        type: type,
        status: 1
      }).then((data) => {
        let list = data.data.list || []
        let index = this.getAdIndex(0, list.length)
        let urlData = list[index] || {}
        this.ad_url = urlData.img_url
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
