<template>
  <div>
    <mt-header title="操作信号" :fixed="true">
    </mt-header>
    <div v-if="ifWait()" class="main-body">
      <div style="text-align: center">今日信号在14:45更新，请耐心等待</div>
    </div>
    <div v-else class="main-body">
      <div style="text-align: center">交易日：{{trade_date}}</div>
      <div class="title">定投信号</div>
      <div>
        <mt-cell-swipe v-if="!ifHasFix()">
          <div slot="title">
            <h3>
              <span class="name">无</span>
            </h3>
          </div>
        </mt-cell-swipe>
        <div v-else>
          <mt-cell-swipe class="buy" v-for="(item) in fix_record" :key="item.key" v-if="item.buy > 0">
            <div slot="title">
              <h3>
                <span class="name">{{getName(item.key)}}</span>
                <span style="float: right">买入{{item.buy}}</span>
              </h3>
            </div>
          </mt-cell-swipe>
        </div>
      </div>
      <div class="title tw">波段信号</div>
      <div>
        <mt-cell-swipe class="blue">
          <div slot="title">
            <h3>
              <span class="name">公众号</span>
              <span style="float: right">养基定投波段</span>
            </h3>
          </div>
        </mt-cell-swipe>
        <mt-cell-swipe v-for="(item) in band_record" :class="{buy: item.flag==='加仓' || item.flag==='小幅加仓', sell: item.flag==='减仓'}" :key="item.key">
          <div slot="title">
            <h3>
              <span class="name">{{getName(item.key)}}</span>
              <span style="float: right">{{item.flag || '无'}}</span>
            </h3>
          </div>
        </mt-cell-swipe>
      </div>
      <div class="info">公众号：养基定投波段，信号工具永久免费</div>
    </div>
  </div>
</template>

<script>
import indexListAll from '@/common/indexListAll'
export default {
  name: 'App',
  data () {
    return {
      trade_date: '',
      fix_record: [],
      band_record: [],
      ifOpen: false,
      ifShowWait: false
    }
  },
  watch: {
  },
  computed: {
  },
  created () {
    // console.log(indexListAll)
    this.initPage()
  },
  mounted () {
    this.addPV('操作信号')
  },
  methods: {
    ifHasFix () {
      for (let i = 0; i < this.fix_record.length; i++) {
        if (this.fix_record[i].buy) {
          return true
        }
      }
      return false
    },
    ifWait () {
      if (this.ifOpen) {
        const d = this.$getDate()
        const hour = d.getHours()
        const minute = d.getMinutes()
        if (hour > 14) {
          return false
        }
        if (hour === 14) {
          if (minute >= 45) {
            return false
          }
        }
        return true
      }
      return false
    },
    getName (key) {
      for (let i = 0; i < indexListAll.length; i++) {
        if (indexListAll[i].key === key) {
          return indexListAll[i].name
        }
      }
      return ''
    },
    initPage () {
      this.$http.get('http://47.98.140.76:3020/fundServer/stock/getStockMarketOpen').then((res) => {
        this.ifOpen = res.data.open || false
      })
      this.$http.get('signal/getLastSignal').then((res) => {
        const data = res.data || {}
        if (data.trade_date) {
          this.trade_date = data.trade_date
          this.fix_record = data.fix_record || []
          this.band_record = data.band_record || []
        } else {

        }
      })
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  .main-body {
    padding: 20px 30px;
  }
  .title {
    font-size: 40px;
  }
  .info {
    font-size: 28px;
    text-align: center;
    padding: 20px 0 20px 0;
  }
</style>
