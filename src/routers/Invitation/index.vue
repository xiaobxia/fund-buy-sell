<template>
  <div class="page-About">
    <van-nav-bar title="邀请好友" left-arrow @click-left="backHandler" />
    <div v-if="userInfo.email_active" class="grey-page">
      <div class="c-w">
        <div class="title-info-block">
          <div class="title-wrap">
            <span class="title-icon"></span>
            <span class="t-t">活动说明</span>
          </div>
          <div style="text-align: left" class="w-t">您邀请的好友通过您的专属链接或二维码，成功注册并且完成邮箱验证，您将获得5个交易日的奖励。</div>
        </div>
      </div>
      <div class="c-w-g">
        <div class="title-info-block">
          <div class="title-wrap">
            <span class="title-icon"></span>
            <span class="t-t">我的专属二维码</span>
          </div>
          <div style="text-align: center">
            <img v-if="qrUrl" :src="qrUrl" alt="" class="qr-img">
            <div class="b-w">
            <span
              v-clipboard:copy="invitationUrl"
              v-clipboard:success="copySuccess"
              class="c-b theme-text"
            >复制邀请链接</span>
              <!--<span class="c-b theme-text" @click="downloadQr">保存邀请码</span>-->
            </div>
          </div>
        </div>
      </div>
      <div class="c-w-g">
        <div class="title-info-block">
          <div class="title-wrap">
            <span class="title-icon"></span>
            <span class="t-t">我的邀请记录</span>
          </div>
          <div class="re-w" v-if="list.length > 0">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="re-i"
            >
              <div
                v-if="item.type_name === '激活'"
              >您邀请的好友“<span class="theme-text">{{item.register_email}}</span>”已注册并验证邮箱，您获得5个交易日的奖励！</div>
              <div
                v-else
              >您邀请的好友“<span class="theme-text">{{item.register_email}}</span>”已注册但还未验证邮箱，快提醒他验证！</div>
            </div>
          </div>
          <div v-else class="d-w-s">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'qrcode'
import { Toast } from 'vant'

export default {
  name: 'Invitation',
  components: {
  },
  data () {
    return {
      qrUrl: '',
      invitationUrl: '',
      list: []
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
      const invitationUrl = this.$webUrl + `/register?inv=${encodeURIComponent(this.userInfo.email)}`
      this.invitationUrl = invitationUrl
      QRCode.toDataURL(invitationUrl).then(url => {
        this.qrUrl = url
      })
      this.$http.get('fbsServer/log/getInvitationLogByToken').then((res) => {
        this.list = res.data || []
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
    backHandler () {
      this.$router.history.go(-1)
    },
    homeHandler () {
      this.$router.replace('/')
    },
    copySuccess () {
      Toast.success('复制成功！')
    },
    downloadQr () {
      this.$downloadBase64File('养基定投波段.jpg', this.qrUrl)
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
    padding: 0 120px;
  }
  .c-w-c {
    text-align: center;
    background-color: #fff;
    padding: 12px 12px;
  }
  .c-w {
    padding-top: 10px;
    margin-bottom: 10px;
  }
  .qr-img {
    width: 200px;
  }
  .b-w {
    font-size: 14px;
    .c-b {
      padding-right: 10px;
      border-right: 1px solid #E9E9E9;
      &:last-child {
        padding-left: 10px;
        padding-right: 0;
        border-right: none;
      }
    }
  }
  .d-w-s {
    line-height: 40px;
    color: #C0C4CC;
  }
  .re-w {
    text-align: left;
    .re-i {
      padding: 10px 0;
      font-size: 14px;
      border-bottom: 1px solid #E9E9E9;
      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
  .c-w-g {
    margin-top: 10px;
  }
  .w-t {
    margin-top: 6px;
    font-size: 14px;
  }
</style>
