<template>
  <div v-if="ifAdmin">
    <mt-header title="操作信号" :fixed="true">
    </mt-header>
    <div v-if="ifWait()" class="main-body">
      <div style="text-align: center">今日信号在<span class="red-text">14:45</span>更新，请耐心等待</div>
    </div>
    <div v-else class="main-body">
      <div style="text-align: center">交易日：{{trade_date}}</div>
      <!--<div class="title">定投信号</div>-->
      <div>
        <div>
          <mt-cell-swipe class="buy" v-for="(item, index) in fix_record" :key="index" v-if="item.name">
            <div slot="title">
              <h3>
                <span class="name">{{item.name}}</span>
                <span style="float: right">买入: {{item.buyNum}}</span>
              </h3>
            </div>
          </mt-cell-swipe>
        </div>
      </div>
      <div v-if="!ifAdmin" class="info">公众号：养基定投波段，信号工具永久免费</div>
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
    ifAdmin () {
      return this.$route.query.type === 'tt'
    }
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
        } else {

        }
      })
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  .main-body {
    padding: 20px 10px;
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
