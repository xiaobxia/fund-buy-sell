<template>
  <div class="page-About">
    <van-nav-bar title="邀请好友" left-arrow @click-left="backHandler" />
    <div class="grey-page">
      <div class="c-w">
        <div class="c-w-c">
          <img v-if="qrUrl" :src="qrUrl" alt="" class="qr-img">
          <div class="b-w">
            <span
              v-clipboard:copy="invitationUrl"
              v-clipboard:success="copySuccess"
              class="c-b theme-text"
            >复制邀请链接</span>
            <span class="c-b theme-text" @click="downloadQr">保存邀请码</span>
          </div>
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
  data () {
    return {
      qrUrl: '',
      invitationUrl: '',
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    const invitationUrl = this.$webUrl + `/?register=${this.userInfo.email}`
    this.invitationUrl = invitationUrl
    QRCode.toDataURL(invitationUrl).then(url => {
      this.qrUrl = url
    })
    this.$http.get('fbsServer/log/getInvitationLogByToken').then((res) => {
      this.list = res.data || []
    })
  },
  methods: {
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
      this.$downloadBase64File('app_name.jpg', this.qrUrl)
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
  .c-w {
    padding-top: 20px;
    margin-bottom: 10px;
    .c-w-c {
      text-align: center;
      background-color: #fff;
      padding: 20px 0;
    }
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
</style>
