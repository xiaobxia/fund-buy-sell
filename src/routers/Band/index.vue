<template>
  <div class="operating-info">
    <mt-header title="波段策略" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="main-warn">
        <div class="red-text">越接近收盘，信号越准确，推荐在14:45以后15:00之前根据信号操作</div>
      </div>
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
                  :class="subItem === '买'?'buy':subItem === '卖'?'sell':''">{{subItem === '买'?'买': subItem === '卖'?'卖':''}}</span>
          </p>
          <p class="target">推荐标的：{{item.fundCode}} {{item.fundName}}</p>
        </div>
      </mt-cell-swipe>
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
      list: []
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
      this.$http.get('auth/checkCustomer', {
        name: name,
        device_id: deviceId,
        type: 'band'
      }).then((data) => {
        if (data.success) {
          this.$http.get('customer/getBand').then((data) => {
            if (data.success) {
              const list = data.data
              list.sort((a, b) => {
                return a.sortIndex - b.sortIndex
              })
              this.list = list
            }
          })
          this.$http.get('customer/addTodayQuery', {
            name: name,
            device_id: deviceId,
            type: 'band'
          })
        } else {
          ToastBig.error(data.message, 1000)
        }
      })
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
