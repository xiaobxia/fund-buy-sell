<template>
  <div class="index-rate grey-page-full">
    <van-nav-bar class="p-h op-nav-bar" title="波段信号" left-arrow @click-left="backHandler" />
    <div v-if="userInfo.email_active">
      <img src="../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%;top: 0;left: 0">
      <div class="con-w b-10">
        <div class="h-t">信号日期：<span v-if="list.length > 0">{{tradeDate}}</span></div>
        <div class="h-d">信号将在每个交易日的14:30更新并持续输出，越接近收盘时间，输出的信号也越准确。</div>
        <div v-if="open">
          <div v-if="list.length > 0">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="title-info-block round shadow lock-tag-block-bottom"
              :class="{'t-10': index !== 0, 'b-10': index !== list.length -1}"
            >
              <div class="title-wrap">
                <span class="title-icon"></span>
                <span class="t-t">{{nameKeyMap[item.key]}}</span>
                <span style="float: right" :class="$stockNumberClass(item.rate)">{{item.rate}}%</span>
              </div>
              <div>
                <b-s-card :info="item"/>
              </div>
              <template v-if="index !== list.length -1">
                <lock-tag/>
                <lock-tag/>
              </template>
            </div>
          </div>
          <div v-else>
            <div class="title-info-block round shadow lock-tag-block-bottom n-t" style="margin-bottom: 0">
              <div class="l-w">
                <van-loading type="spinner" color="#E2684D" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="title-info-block round shadow lock-tag-block-bottom n-w" style="margin-bottom: 0">
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
import BSCard from './components/BSCard'

const nameMap = {}
const nameKeyMap = {}
const codeKeyMap = {}
indexList.forEach((v) => {
  codeKeyMap[v.key] = v.code
  nameMap[v.code] = v.name
  nameKeyMap[v.key] = v.name
})

export default {
  name: 'IndexBuySell',
  components: {
    LockTag,
    SignalCountDown,
    BSCard
  },
  data () {
    return {
      list: [],
      listGreen: [],
      tradeDate: '',
      noUpdate: false,
      noUpdateText: '',
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
        const list = signalDada.band_record || []
        const newList = []
        list.forEach((v) => {
          if (v.flag !== undefined) {
            v.rate = map[this.codeKeyMap[v.key]]
            newList.push(v)
          }
        })
        this.list = newList
      })
    },
    setListData (data) {
      this.list = data.band_record || []
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
  .n-t {
    min-height: calc(100vh - 170px);
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
  .n-w {
    min-height: calc(100vh - 170px);
  }
  .l-w {
    margin-top: 10vh;
    text-align: center;
  }
</style>
