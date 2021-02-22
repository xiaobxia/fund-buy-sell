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
                  <div>111</div>
                  <div>111</div>
                  <div>111</div>
                  <div>删除</div>
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
      'infoList'
    ])
  },
  created () {
  },
  methods: {
    onLoad () {
      if (this.refreshing) {
        this.$store.commit('SET_infoList', [])
        this.refreshing = false;
      }
      this.queryInfoList()
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.current = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
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
    deleteRow(row) {
      Dialog.confirm({
        title: '提示',
        message: '确认删除？',
      })
        .then(() => {
          this.$http.post('fbsServer/infoFlow/deleteRecord', {
            info_id: row.id
          }).then(({ message }) => {
            Toast.success({
              message: '删除成功！',
              duration: 1000 * 3
            })
          })
        })
        .catch(() => {
          // on cancel
        });
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
    background-color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid #E9E9E9;
    &:last-child {
      border-bottom: 0;
    }
    .rt-i-i {
      vertical-align: top;
      width: 100px;
      height: 68px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .i-w {
      overflow: hidden;
      border-radius: 4px;
    }
    .rt-i-t {
      vertical-align: top;
      display: inline-block;
      width: 210px;
      margin-left: 10px;
      h4 {
        margin-top: 0;
        margin-bottom: 0;
        color: #303133;
      }
      .d-p {
        color: #909399;
        overflow:hidden;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        word-wrap: break-word;
        font-size: 12px;
      }
      .d-time {
        margin-top: 2px;
        font-size: 12px;
        text-align: right;
        color: #909399;
      }
    }
  }
</style>
