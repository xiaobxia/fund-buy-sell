<template>
  <div class="page-question">
    <mt-header title="常见问题" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <fold-card>
        <div slot="title">1.什么时候开始出信号？</div>
        <div slot="content">在交易日的9:40以前就会出信号了，信号是实时计算更新的，一直持续到收盘。</div>
      </fold-card>
      <fold-card>
        <div slot="title">2.什么时候给出当天的仓位建议和操作建议？</div>
        <div slot="content">在交易日的14:45左右就会给出当天的仓位建议和操作建议。</div>
      </fold-card>
      <fold-card>
        <div slot="title">3.如何申请试用？</div>
        <div slot="content">搜索并添加客服微信号"fund_buy_sell"，向客服提供您注册时的手机号，就能获得10个交易日的试用权限。关注我们的动态，节假日我们也会有赠送使用时间的活动的！</div>
      </fold-card>
      <fold-card>
        <div slot="title">4.试用完如何续期？</div>
        <div slot="content">
          <img src="../../assets/pay.jpg" alt="">
          <div class="l-1">搜索并添加客服微信号"fund_buy_sell"提交续期申请或咨询</div>
          <p class="l-2">订的越久，每个交易日的单价就越便宜。以套餐一为例，总价是120元，可以用60个交易日，折合每个交易日是2元。60个交易日可以用多久呢？一个月平均是21个交易日，60个交易日相当于3个月，也就是说120元可以用3个月。那贵吗？帮大家算一笔账，假如您持有1支基金1万元，它一天跌了1.2%，那也就是说您亏了120元。但是如果您使用系统后提前躲过了下跌，只要躲过1次，您就少亏了120，您就收回成本了。</p>
        </div>
      </fold-card>
      <fold-card>
        <div slot="title">5.您们推荐的基金费率高吗？</div>
        <div slot="content">
          <div>我们推荐的标的都是同个品种当中费率最低的。如果您分步建仓，再分步卖出是可以实现几乎零费率操作的。</div>
          <table width="100%" cellspacing="1" cellpadding="20">
            <tr>
              <th>指数</th>
              <th>申购费率</th>
              <th>持有7日后卖出费率</th>
            </tr>
            <tr>
              <td>天弘上证50指数C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>广发沪深300指数增强C</td>
              <td>0%</td>
              <td>0.1%</td>
            </tr>
            <tr>
              <td>广发中证500ETF联接C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>广发中证1000指数C</td>
              <td>0%</td>
              <td>0.1%</td>
            </tr>
            <tr>
              <td>天弘创业板C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>天弘中证银行指数C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>南方房地产ETF联接C</td>
              <td>0%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>方正富邦保险主题指数分级</td>
              <td>0.08%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>南方中证全指证券ETF联接C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>招商中证白酒指数分级</td>
              <td>0.1%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>招商中证煤炭等权指数分级</td>
              <td>0.1%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>南方有色金属ETF联接C</td>
              <td>0%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>鹏华钢铁分级</td>
              <td>0.12%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>汇添富中证互联网医疗指数C</td>
              <td>0%</td>
              <td>0.1%</td>
            </tr>
            <tr>
              <td>汇添富中证生物科技指数C</td>
              <td>0%</td>
              <td>0.1%</td>
            </tr>
            <tr>
              <td>天弘中证医药100C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>天弘中证计算机主题指数C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>广发信息技术联接C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>天弘中证电子指数C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>广发中证传媒ETF联接C</td>
              <td>0%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>广发中证军工ETF联接C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>广发中证环保ETF联接C</td>
              <td>0%</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>广发中证基建工程指数C</td>
              <td>0%</td>
              <td>0.1%</td>
            </tr>
            <tr>
              <td>广发中证全指汽车指数C</td>
              <td>0%</td>
              <td>0.1%</td>
            </tr>
          </table>
        </div>
      </fold-card>
      <fold-card>
        <div slot="title">6.怎么降低买卖时的费率？</div>
        <div slot="content">
          解决的方法是分步买入，然后分步卖出。确保每次卖出时卖出的份额是持有了7天及以上的。
        </div>
      </fold-card>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import FoldCard from '../../markComponents/FoldCard/index.vue'
export default {
  name: 'Question',
  components: {FoldCard},
  data () {
    return {
      msg: ''
    }
  },
  component: {FoldCard},
  mounted () {
    this.addPV('常见问题')
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    clipboardSuccessHandler () {
      Toast({
        message: '复制成功',
        duration: 1000
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
