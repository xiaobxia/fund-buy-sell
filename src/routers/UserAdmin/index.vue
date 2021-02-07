<template>
  <div class="page-UserAdminIndex">
    <van-nav-bar title="用户管理" left-arrow @click-left="backHandler" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.email">
        <div>
          <span>{{item.email}}</span>
          <van-tag type="success" v-if="item.email_active">激活</van-tag>
          <van-tag v-else type="danger">未激活</van-tag>
          <span style="float: right">{{ $formatToDateTime(item.create_at) }}</span>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'UserAdminIndex',
  data () {
    return {
      current: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      this.queryList()
    },
    queryList () {
      this.current = this.current + 1
      this.loading = true
      this.$http.get('fbsServer/user/getRecords', {
        current: this.current,
        pageSize: 20
      }).then((res) => {
        const data = res.data || {}
        const total = parseInt(data.count || 0) || 0
        this.list = this.list.concat(data.list || [])
        this.loading = false
        if (this.list.length >= total) {
          this.finished = true
        }
      }).catch(() => {
        this.loading = false
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    homeHandler () {
      this.$router.replace('/')
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
    padding-top: 10px;
    margin-bottom: 10px;
    .c-w-c {
      background-color: #fff;
    }
    img {
      width: 100%;
    }
  }
</style>
