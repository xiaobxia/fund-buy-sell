<template>
  <div class="home-main grey-page">
    <div class="p-t">消息</div>
    <img src="../../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%;top: 0;left: 0">
    <div class="con-w">
      <div class="title-info-block round shadow">
        <div class="c-l-w">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="a-l-l"
            >
              <div
                v-for="(item, index) in infoList"
                :key="index"
                class="rt-i"
              >
                <div>
                  <div class="rt-t-w">
                    <div class="t-x">
                      <img src="../../../assets/头像.png" alt="">
                    </div>
                    <div class="t-t">
                      <div>基哥</div>
                      <div>{{formatTime(item.create_at)}}</div>
                    </div>
                    <div v-if="isAdmin" class="d-button" @click="deleteRow(item)">
                      <van-icon name="delete" />
                    </div>
                  </div>
                  <div class="rt-c-w">
                    <div>{{item.content}}</div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Shanghai')
export default {
  name: 'HomeChat',
  data () {
    return {
      accessToken: '',
      current: 0,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'infoList'
    ]),
    isAdmin () {
      const roles = this.userInfo.roles
      return roles && (roles.indexOf('admin') !== -1)
    }
  },
  created () {
  },
  methods: {
    formatTime (time) {
      // const diffM = moment().diff(moment(time),'minutes')
      return moment(time).format('M-D HH:mm')
    },
    onLoad () {
      if (this.refreshing) {
        this.$store.commit('SET_infoList', [])
        this.refreshing = false
      }
      this.queryInfoList()
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.current = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    queryInfoList () {
      this.loading = true
      this.current = this.current + 1
      this.$http.get('fbsServer/infoFlow/getUserInfoFlow', {
        'current': this.current,
        'pageSize': 10
      }).then((res) => {
        const data = res.data
        const infoList = [
          ...this.infoList,
          ...data.list
        ]
        this.$store.commit('SET_infoList', infoList)
        this.loading = false
        if (infoList.length >= data.count) {
          this.finished = true
        }
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    toOther (url) {
      window.location = url
    },
    deleteRow (row) {
      Dialog.confirm({
        title: '提示',
        message: '确认删除？'
      }).then(() => {
        this.$http.post('fbsServer/infoFlow/deleteRecord', {
          info_id: row.id
        }).then(({ message }) => {
          Toast.success({
            message: '删除成功！',
            duration: 1000 * 3
          })
        })
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .home-main {
    position: relative;
    height: calc(100vh - 50px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .p-t {
    position: relative;
    z-index: 100;
    text-align: center;
    color: #fff;
    line-height: 45px;
    font-size: 18px;
  }
  .con-w {
    position: relative;
    z-index: 100;
    padding: 0 10px;
    padding-bottom: 20px;
  }
  .c-l-w {
    min-height: calc(100vh - 150px);
  }
  .rt-i {
    position: relative;
    background-color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid #E9E9E9;
    &:last-child {
      border-bottom: 0;
    }
    .t-x {
      img {
        height: 40px;
        width: 40px;
      }
      display: inline-block;
      vertical-align: top;
    }
    .t-t {
      margin-left: 10px;
      display: inline-block;
      vertical-align: top;
    }
    .rt-c-w {
      margin-top: 10px;
    }
    .d-button {
      position: absolute;
      right: 0;
      top: 10px;
      color: #000;
      z-index: 100;
      /deep/ {
        .van-icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
