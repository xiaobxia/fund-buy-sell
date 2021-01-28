<template>
  <div class="page-Feedback">
    <van-nav-bar title="意见反馈" left-arrow @click-left="backHandler" />
    <van-field
      v-model="message"
      rows="4"
      autosize
      label=""
      type="textarea"
      maxlength="200"
      placeholder="请输入意见"
      show-word-limit
      class="f-w"
    />
    <div class="p-b">
      <van-button
        round
        block
        :loading="loading"
        type="primary"
        class="liner-bg"
        @click="submitHandler"
      >提交</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapGetters } from 'vuex'

export default {
  name: 'Feedback',
  data () {
    return {
      message: '',
      loading: false
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
    submitHandler () {
      if (!this.message) {
        Toast.fail('请输入内容！')
        return false
      }
      this.loading = true
      this.$http.post('fbsServer/feedback/addFeedback', {
        email: this.userInfo.email,
        content: this.message
      }).then(() => {
        Toast.success({
          message: '提交成功！',
          duration: 1000 * 3
        })
        this.loading = false
        this.backHandler()
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
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
  .c-w {
    padding-top: 10px;
    margin-bottom: 10px;
    .c-w-c {
      background-color: #fff;
    }
    img {
      width: 100%;
    }
  }
  .f-w {
    margin-top: 10px;
    /deep/ {
      .van-cell__value {
        border: 1px solid #E9E9E9;
        border-radius: 4px;
      }
    }
  }
</style>
