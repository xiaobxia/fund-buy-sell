<template>
  <div class="page-VipBuy">
    <van-nav-bar title="养基定投波段会员" left-arrow @click-left="backHandler" />
    <div v-if="userInfo.email_active" class="v-w">
      <div class="p-t">养基定投波段VIP会员</div>
      <div class="p-e">中国股市的股票的交易日为除节假日外的周一至周五。(AM9;30-11;30 , PM13;00-15;00) 一个交易日就是一天,股票的交易日为周一至周五。</div>
      <van-row>
        <van-col v-for="(card, index) in cardList" :key="index" span="8">
          <div class="m-card" :class="{active: card.day === buyActive}" @click="selectCard(card.day)">
            <div class="ti">{{card.day}}个交易日</div>
            <div class="money">
              <span>￥</span>
              <span class="money-t">{{card.money}}</span>
            </div>
            <span class="d-text">{{$keepTwoDecimals(card.money/card.day)}}元/日</span>
          </div>
        </van-col>
      </van-row>
      <div class="buy-block">
        <div class="b-c">
          <van-row>
            <van-col :span="12">
              <div>
                <span>合计:</span>
                <div class="money">
                  <span>￥</span>
                  <span class="money-t">{{getCardItem(buyActive).money}}</span>
                </div>
              </div>
            </van-col>
            <van-col :span="12" style="text-align: right">
              <van-button
                :loading="buyBLoading"
                round
                type="primary"
                class="b-button"
                @click="buyHandler"
              >立即购买</van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div v-else>
      <should-active-email/>
    </div>
    <buy-count-down-dialog ref="buyCountDownDialog" @finish="countDownFinish"/>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
import ShouldActiveEmail from '@/components/ShouldActiveEmail/index.vue'
import BuyCountDownDialog from '@/components/BuyCountDownDialog/index.vue'
import openCountDown from '@/util/openCountDown'

// 未来一定是要提价的，目前先不

export default {
  name: 'VipBuy',
  components: {
    ShouldActiveEmail,
    BuyCountDownDialog
  },
  data () {
    return {
      message: '',
      loading: false,
      cardList: [
        {day: 1, money: 2},
        {day: 20, money: 15},
        {day: 60, money: 40},
        {day: 120, money: 70},
        {day: 240, money: 120}
      ],
      buyBLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'buyActive'
    ])
  },
  methods: {
    getCardItem (day) {
      for (let i = 0; i < this.cardList.length; i++) {
        if (day === this.cardList[i].day) {
          return this.cardList[i]
        }
      }
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    homeHandler () {
      this.$router.replace('/')
    },
    selectCard (day) {
      window.trackEvent('按钮', 'vip天数', day)
      this.$store.commit('SET_buyActive', day)
    },
    buyHandler () {
      window.trackEvent('购买', '点击购买', this.buyActive)
      this.$http.get('fbsServer/user/getMarketOpen').then((res) => {
        const data = res.data || {}
        const open = data.open || false
        let time = openCountDown.marketCloseDayCountDown()
        // 开市的时间
        if (open) {
          time = openCountDown.marketOpenDayCountDown()
        }
        if (time) {
          this.$refs.buyCountDownDialog.open(time)
        } else {
          this.buyWarnHandler()
        }
      })
    },
    countDownFinish () {
      this.buyWarnHandler()
    },
    buyWarnHandler () {
      this.toBuyQr()
    },
    toBuyQr () {
      this.$router.push(`/buyQr/index?days=${this.buyActive}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .e-w {
    margin-top: 16vh
  }
  .p-b {
    margin-top: 40px;
    padding: 0 20px;
  }
  .v-w {
    padding: 0 10px;
  }
  .m-card {
    width: 90px;
    height: 90px;
    border: 2px solid #ccc;
    margin: 10px 10px;
    text-align: center;
    border-radius: 12px;
    &.active {
      border-color: rgb(220,176,130);
      background-color: rgb(250,240,230);
    }
    .ti {
      font-size: 12px;
      margin-top: 8px;
    }
    .money {
      margin: 4px 0;
      color: rgb(220,176,130);
    }
    .money-t {
      font-size: 26px;
    }
    .d-text {
      font-size: 12px;
      color: #909399;
    }
  }
  .p-t {
    margin: 10px 0;
    padding: 0 10px;
    font-size: 20px;
  }
  .p-e {
    padding: 0 10px;
    color: #909399;
    font-size: 10px;
  }
  .buy-block {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgb(250,240,230);
    height: 56px;
    line-height: 56px;
    width: 100%;
    color: #909399;
    .b-c {
      padding: 0 20px;
    }
    .money {
      display: inline-block;
      color: rgb(220,176,130);
    }
    .money-t {
      /*font-size: 26px;*/
    }
  }
  .b-button {
    /deep/ {
      &.van-button--primary {
        background-color: rgb(220,176,130);
        border-color: rgb(220,176,130);
      }
    }
  }
</style>
