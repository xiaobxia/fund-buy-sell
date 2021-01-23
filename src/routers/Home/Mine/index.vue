<template>
  <div class="home-mine">
    <div class="u-i-w">
      <img src="../../../assets/img-h-bg.png" alt="" style="position: absolute">
      <div class="u-i-c">
        <img src="../../../assets/user-img.png" alt="">
        <div class="d-t">
          <div class="d-t-e">{{userInfo.email}}</div>
        </div>
      </div>
    </div>
    <div class="m-l">
      <van-cell is-link to="/invitation" >
        <div slot="title">
          <span>邀请好友</span>
          <span class="c-icon">
            <van-icon name="fire"/>
          </span>
        </div>
      </van-cell>
      <van-cell title="关于我们" is-link to="/about" />
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
    ])
  },
  created () {
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    logoutHandler () {

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
          margin: 7px 0 10px 0;
          font-size: 20px;
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
</style>
