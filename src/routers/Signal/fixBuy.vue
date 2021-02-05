<template>
  <div class="index-rate grey-page-full">
    <van-nav-bar class="p-h op-nav-bar" title="定投信号" left-arrow @click-left="backHandler" />
    <div v-if="userInfo.email_active">
      <img src="../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%;top: 0;left: 0">
      <div class="con-w b-10">
        <div class="h-t">信号日期：<span v-if="list.length > 0">{{tradeDate}}</span></div>
        <div class="h-d">信号将在每个交易日的14:30更新并持续输出，越接近收盘时间，输出的信号也越准确。</div>
        <div class="title-info-block round shadow lock-tag-block-bottom" style="margin-bottom: 0">
          <div class="index-list-wrap" v-if="open">
            <div v-if="!loading">
              <div v-if="list.length > 0">
                <div v-for="(item, index) in list" :key="index" class="index-item">
                  <span>{{nameKeyMap[item.key]}}</span>
                  <span class="ri-t" :class="$stockNumberClass(item.rate)">{{item.rate}}%</span>
                  <div class="buy-tag">买入{{item.buyNum}}份</div>
                </div>
              </div>
              <div v-else class="r-i-w">
                <img src="../../assets/result/空.png" alt="">
                <div class="theme-text">无信号</div>
              </div>
            </div>
          </div>
          <signal-count-down ref="signalCountDown" @finish="openReQuery"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LockTag from '@/components/LockTag'
import SignalCountDown from '@/components/SignalCountDown'
import indexList from '@/common/indexList'
import openCountDown from '@/util/openCountDown'

const nameMap = {}
const nameKeyMap = {}
const codeKeyMap = {}
indexList.forEach((v) => {
  codeKeyMap[v.key] = v.code
  nameMap[v.code] = v.name
  nameKeyMap[v.key] = v.name
})

export default {
  name: 'IndexFixBuy',
  components: {
    LockTag,
    SignalCountDown
  },
  data () {
    return {
      list: [],
      loading: false,
      listGreen: [],
      tradeDate: '',
      noUpdate: false,
      noUpdateText: '今日信号未更新，请耐心等待',
      nameMap,
      nameKeyMap,
      codeKeyMap,
      open: false
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
      this.$http.get('fbsServer/user/getMarketOpen').then((res) => {
        // 开盘部分
        const openData = res.data || {}
        return openData.open || false
      }).then((open) => {
        const diff = openCountDown.signalOpenCountDown()
        if (open && diff) {
          this.open = false
          this.$refs.signalCountDown.open(diff)
        } else {
          this.open = true
          this.querySignal()
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
    openReQuery () {
      this.querySignal()
      this.open = true
    },
    querySignal () {
      this.loading = true
      Promise.all([
        this.$http.get('fbsServer/user/getIndexRate'),
        this.$http.get('fbsServer/user/getLastBSSignal')
      ]).then((resList) => {
        const indexRateDada = resList[0].data
        const signalDada = resList[1].data
        this.tradeDate = signalDada.trade_date
        const record = indexRateDada.record || []
        let map = {}
        record.forEach((v) => {
          map[v.code] = v.netChangeRatio
        })
        const list = signalDada.fix_record || []
        list.forEach((v) => {
          v.rate = map[this.codeKeyMap[v.key]]
        })
        this.list = list
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
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
    min-height: calc(100vh - 170px);
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
    position: relative;
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
    .buy-tag {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 22px;
      width: 70px;
      line-height: 22px;
      border-radius: 22px;
      background-color: rgb(244, 51, 60);
      color: #fff;
      font-size: 13px;
      text-align: center;
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
  .r-i-w {
    margin-top: 10vh;
    text-align: center;
    img {
      width: 100px;
    }
  }
</style>
