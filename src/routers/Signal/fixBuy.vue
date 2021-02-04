<template>
  <div class="index-rate grey-page-full">
    <van-nav-bar class="p-h op-nav-bar" title="定投参谋" left-arrow @click-left="backHandler" />
    <div v-if="userInfo.email_active">
      <img src="../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%;top: 0;left: 0">
      <div class="con-w b-10">
        <div class="h-t">参谋日期：{{tradeDate}}</div>
        <div class="h-d">信号将在每个交易日的14:30更新并持续输出，越接近收盘时间，输出的信号也越准确。</div>
        <div class="title-info-block round shadow lock-tag-block-bottom">
          <div class="index-list-wrap">
            <div v-for="(item, index) in list" :key="index" class="index-item">
              <span>{{nameKeyMap[item.key]}}</span>
              <span class="ri-t" :class="$stockNumberClass(item.rate)">{{item.rate}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LockTag from '@/components/LockTag'
import moment from 'moment'
import dateUtil from '@/util/dateUtil'
import { Notify } from 'vant'
import indexList from '@/common/indexList'

const nameMap = {}
const nameKeyMap = {}
indexList.forEach((v) => {
  nameMap[v.code] = v.name
  nameKeyMap[v.key] = v.name
})

export default {
  name: 'IndexFixBuy',
  components: {
    LockTag
  },
  data () {
    return {
      list: [],
      listGreen: [],
      tradeDate: '',
      noUpdate: false,
      noUpdateText: '',
      nameMap,
      nameKeyMap
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'isVipUser'
    ])
  },
  created () {
    if (this.isVipUser === true) {
      Promise.all([
        this.$http.get('fbsServer/user/getLastBSTSignal'),
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
    } else {
      this.jump()
    }
  },
  methods: {
    jump () {
      if (!this.userInfo.email_active) {
        this.$router.replace('/emailWarn/index')
      } else if (!this.userInfo.vip_days) {
        this.$router.replace('/vipBuy/index')
      }
    },
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
      this.list = data.fix_record || []
      this.tradeDate = data.trade_date
    },
    onLoad () {
    },
    getBg (item) {
      return `background-color: ${item}`
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
  .title-info-block {
    min-height: calc(100vh - 160px);
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
    background-color: #F1F2F3;
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
