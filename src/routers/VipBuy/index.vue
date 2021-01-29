<template>
  <div class="page-VipBuy">
    <van-nav-bar title="app_name会员" left-arrow @click-left="backHandler" />
    <div v-if="userInfo.email_active" class="v-w">
      <van-row>
        <van-col v-for="(card, index) in cardList" :key="index" span="8">
          <div class="m-card" :class="{active: card.day === active}" @click="selectCard(card.day)">
            <div class="ti">{{card.day}}个交易日</div>
            <div class="money">
              <span>￥</span>
              <span class="money-t">{{$formatMoney(card.money)}}</span>
            </div>
            <span class="d-text">111</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div v-else>
      <should-active-email/>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
import ShouldActiveEmail from '@/components/ShouldActiveEmail/index.vue'

export default {
  name: 'VipBuy',
  components: {ShouldActiveEmail},
  data () {
    return {
      message: '',
      loading: false,
      cardList: [
        {day: 1, money: 2},
        {day: 20, money: 2},
        {day: 60, money: 2},
        {day: 120, money: 2},
        {day: 240, money: 2}
      ],
      active: 20
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    homeHandler () {
      this.$router.replace('/')
    },
    selectCard (day) {
      this.active = day
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
      margin-top: 5px;
    }
    .money {
      color: rgb(220,176,130);
    }
    .money-t {
      font-size: 24px;
    }
  }
</style>
