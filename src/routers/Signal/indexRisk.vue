<template>
  <div class="index-risk grey-page-full">
    <van-nav-bar class="p-h op-nav-bar" title="指数风险" left-arrow @click-left="backHandler" />
    <img src="../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%;top: 0;left: 0">
    <div class="con-w">
      <div class="h-t">信号日期：{{tradeDate}}</div>
      <div class="h-d">信号将在每个交易日的14:30更新并持续输出，越接近收盘时间，输出的信号也越准确。</div>
      <div class="title-info-block round shadow lock-tag-block-bottom b-10">
        <div class="title-wrap">
          <span class="title-icon"></span>
          <span class="t-t">安全区</span>
        </div>
        <div class="index-list-wrap">
          <div v-for="(item, index) in list" :key="index" :style="getBg(item.color)" class="index-item">
            <span>{{item.name}}</span>
            <span class="ri-t">安全系数:{{formatXS(item.netChangeRatio)}}</span>
          </div>
        </div>
        <lock-tag/>
        <lock-tag/>
      </div>
      <div class="title-info-block round shadow t-10">
        <div class="title-wrap">
          <span class="title-icon"></span>
          <span class="t-t">风控区</span>
        </div>
        <div class="index-list-wrap">
          <div v-for="(item, index) in listGreen" :key="index" :style="getBg(item.color)" class="index-item">
            <span>{{item.name}}</span>
            <span class="ri-t">风险系数:{{formatXS(item.netChangeRatio)}}</span>
          </div>
        </div>
      </div>
      <div class="b-10"></div>
    </div>
  </div>
</template>

<script>
import themeUtil from '@/util/themeUtil.js'
import { mapGetters } from 'vuex'
import LockTag from '@/components/LockTag'
import moment from 'moment'
import { Notify } from 'vant'
import dateUtil from '@/util/dateUtil'

export default {
  name: 'IndexRisk',
  components: {
    LockTag
  },
  data () {
    return {
      list: [],
      listGreen: [],
      tradeDate: '',
      noUpdate: false,
      noUpdateText: '今日信号未更新，请耐心等待'
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created () {
    Promise.all([
      this.$http.get('fbsServer/riskSignal/getLastTSignal'),
      this.$http.get('fbsServer/user/getMarketOpen')
    ]).then((resList) => {
      const today = moment().format('YYYY-MM-DD')
      const signalData = resList[0].data
      const record = signalData.record || []
      // 开盘部分
      const openData = resList[1].data || {}
      const open = openData.open || false
      if (open) {
        const d = dateUtil.getDate()
        const hour = d.getHours()
        const minute = d.getMinutes()
        if (hour < 14 || (hour === 14 && minute < 30)) {
          // 主要通知
          this.noUpdate = true
          Notify({
            type: 'danger',
            message: this.noUpdateText,
            duration: 1000 * 3
          })
          const notTodayItem = this.getNotTodayItem(record, today)
          if (notTodayItem) {
            this.setListData(notTodayItem)
          }
        } else {
          const todayItem = this.getTodayItem(record, today)
          if (todayItem) {
            this.setListData(todayItem)
          }
        }
      } else {
        if (record[0]) {
          this.setListData(record[0])
        }
      }
    })
  },
  methods: {
    getTodayItem (record, today) {
      for (let i = 0; i < record.length; i++) {
        const item = record[i]
        if (item.trade_date === today) {
          return item
        }
      }
      return false
    },
    getNotTodayItem (record, today) {
      for (let i = 0; i < record.length; i++) {
        const item = record[i]
        if (item.trade_date !== today) {
          return item
        }
      }
      return false
    },
    setListData (data) {
      const record = data.record || []
      const list = []
      const listGreen = []
      record.forEach((v) => {
        let r = (Math.abs(v.netChangeRatio) * 3) + 10
        if (r > 90) {
          r = 90
        }
        if (r < 10) {
          r = 10
        }
        r = 100 - r
        v.r = r
        // 越大越淡
        if (v.netChangeRatio > 0 && !v.stockIndexPSF) {
          v.color = themeUtil.tintColor('F56C6C', Number((r / 100).toFixed(2)))
          list.push(v)
        } else {
          v.color = themeUtil.tintColor('67C23A', Number((r / 100).toFixed(2)))
          listGreen.push(v)
        }
      })
      list.sort((a, b) => {
        return a.r - b.r
      })
      listGreen.sort((a, b) => {
        return a.r - b.r
      })
      this.list = list
      this.listGreen = listGreen
      this.tradeDate = data.trade_date
    },
    formatXS (value) {
      return Math.abs(value).toFixed(2)
    },
    getBg (item) {
      return `background-color: ${item}`
    },
    onLoad () {
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    toOther (url) {
      window.location = url
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .home-main {
    position: relative;
    height: calc(100vh - 50px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .p-h {
    position: relative;
    z-index: 100;
    color: #fff;
  }
  .con-w {
    position: relative;
    z-index: 100;
    padding: 0 10px;
  }
  .c-l-w {
    min-height: calc(100vh - 150px);
  }
  .index-list-wrap {
    margin-top: 10px;
    font-size: 13px;
    color: #484848;
  }
  .index-item {
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    border-radius: 8px;
    padding: 0 10px;
    margin-bottom: 4px;
    &:last-child {
      margin: 0;
    }
  }
  .title-info-block {
    margin-bottom: 10px;
  }
  .b-10 {
    padding-bottom: 20px;
  }
  .t-10 {
    padding-top: 20px;
  }
  .h-t {
    color: #fff;
    line-height: 32px;
    font-size: 16px;
  }
  .h-d {
    color: #fff;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .ri-t {
    float: right;
  }
</style>
