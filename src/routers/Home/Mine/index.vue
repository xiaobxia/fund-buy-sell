<template>
  <div class="home-mine">
    <div class="u-i-w">
      <img src="../../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%">
      <div class="u-i-c">
        <img src="../../../assets/user-img.png" alt="">
        <div class="d-t">
          <div class="d-t-e">{{userInfo.email}}</div>
          <div class="d-t-s">
            <template>
              <div v-if="userInfo.email_active">
                <span class="icon-wrap"><van-icon name="gem-o" /></span>
                <span>会员剩余{{userInfo.vip_days}}个交易日</span>
              </div>
              <div v-else>
                <span>未完成邮箱验证</span>
                <span style="vertical-align: top">
                <van-tag type="primary" @click="sendActiveEmail">去验证</van-tag>
              </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="m-l">
      <van-cell v-if="userInfo.email_active" :title="`${userInfo.vip_days ? '续费':'购买'}会员`" is-link to="/vipBuy" />
      <van-cell is-link to="/invitation">
        <div slot="title">
          <span>邀请好友</span>
          <van-tag type="danger">赢奖励</van-tag>
        </div>
      </van-cell>
      <van-cell title="关于我们" is-link to="/about" />
      <template v-if="isAdmin">
        <van-cell title="VIP管理" is-link to="/vipAdmin" />
        <van-cell title="定时任务手动" is-link to="/schedule" />
        <van-cell title="用户管理" is-link to="/userAdmin" />
        <van-cell title="统计" is-link to="/analysisAdmin" />
        <van-cell title="消息发送" is-link to="/chat" />
      </template>
    </div>
    <div class="p-b">
      <van-button
        round
        block
        type="primary"
        class="liner-bg"
        @click="logoutHandler"
      >退出账号</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
import storageUtil from '@/util/storageUtil'

export default {
  name: 'HomeMine',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    isAdmin () {
      const roles = this.userInfo.roles
      return roles && (roles.indexOf('admin') !== -1)
    }
  },
  created () {
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    logoutHandler () {
      storageUtil.setData('UserInfo', {
        isLogin: false
      })
      Toast.success('退出成功！')
      this.$router.replace('/login')
      setTimeout(() => {
        window.location.reload()
      }, 200)
    },
    sendActiveEmail () {
      this.$http.post('fbsServer/auth/sendActiveEmail', {
        email: this.userInfo.email
      }).then(() => {
        Toast.success('邮件已发送，请注意查收！')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .u-i-w {
    position: relative;
    height: 100px;
    overflow: hidden;
    .u-i-c {
      margin: 20px;
      z-index: 100;
      position: relative;
      img {
        height: 60px;
      }
      .d-t {
        display: inline-block;
        color: #fff;
        vertical-align: top;
        margin-left: 10px;
        .d-t-e {
          margin: 7px 0 7px 0;
          font-size: 20px;
        }
        .d-t-s {
          font-size: 12px;
        }
      }
    }
  }
  .p-b {
    margin-top: 60px;
    padding: 0 20px;
  }
  .m-l {
    /deep/ {
      .van-cell::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 0;
        bottom: 0;
        left: 0.42667rem;
        border-bottom: 0.02667rem solid #ebedf0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
      }
    }
  }
  .c-icon {
    color: red;
    font-size: 20px;
    /deep/ {
      .van-icon {
        vertical-align: middle;
      }
    }
  }
  .icon-wrap {
    font-size: 12px;
    /deep/ {
      .van-icon {
        position: relative;
        top: -1px;
        vertical-align: middle;
      }
    }
  }
</style>
