<template>
  <div class="page-VipAdmin">
    <van-nav-bar title="VIP管理" left-arrow @click-left="backHandler" />
    <div>
      <van-field
        v-model="code"
        center
        clearable
        label="支付码"
        placeholder="请输入支付码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="queryCodeRecord">查询</van-button>
        </template>
      </van-field>
      <div v-if="list.length > 0" class="r-w">
        <van-radio-group v-model="userEmail">
          <van-radio v-for="(item, index) in list" :key="index" :name="item.email">
            <div>
              {{item.email}}
            </div>
            <div>
              {{$formatToDateTime(item.create_at)}}
            </div>
          </van-radio>
        </van-radio-group>
      </div>
      <van-field
        readonly
        clickable
        name="picker"
        :value="days"
        label="天数"
        placeholder="点击选择天数"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div class="p-b">
        <van-button
          round
          block
          type="primary"
          class="liner-bg"
          @click="addHandler"
        >添加</van-button>
      </div>
      <div class="p-b">天数：{{userDetail.vip_days}}</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'VipAdmin',
  data () {
    return {
      code: '',
      userEmail: '',
      list: [],
      days: '',
      showPicker: false,
      columns: [1, 20, 60, 120, 240],
      userDetail: {}
    }
  },
  watch: {
    userEmail (value) {
      if (value) {
        this.queryUserInfo()
      }
    }
  },
  methods: {
    queryCodeRecord () {
      this.userEmail = ''
      this.days = ''
      this.$http.get('fbsServer/log/getPayCodeLogByCode', {
        code: this.code
      }).then((res) => {
        this.list = res.data || []
      })
    },
    onConfirm (value) {
      this.days = value
      this.showPicker = false
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    homeHandler () {
      this.$router.replace('/')
    },
    queryUserInfo () {
      this.$http.get('fbsServer/user/getUserByEmail', {
        email: this.userEmail
      }).then((res) => {
        this.userDetail = res.data || {}
      })
    },
    addHandler () {
      this.$http.post('fbsServer/user/addUserVipDays', {
        // 多送一天
        days: this.days,
        email: this.userEmail
      }).then(() => {
        Toast.success('操作成功！')
        this.queryUserInfo()
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
  .r-w {
    padding: 0 20px;
    /deep/ {
      .van-radio {
        margin: 10px 0;
      }
    }
  }
</style>
