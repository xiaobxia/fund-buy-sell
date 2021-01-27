<template>
  <div class="home-main">
    <div class="c-l-w">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
        class="a-l-l"
      >
        <div
          v-for="(item, index) in wxList"
          :key="index"
          class="rt-i"
          @click="toOther(item.news_item[0].url)"
        >
          <div>
            <div class="rt-i-i">
              <img :src="item.news_item[0].thumb_url" alt="">
            </div>
            <div class="rt-i-t">
              <h4>{{item.news_item[0].title}}</h4>
              <div class="d-p">{{item.news_item[0].digest}}</div>
              <div class="d-time">{{item.updateTime}}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeGzh',
  data () {
    return {
      accessToken: '',
      current: -1,
      loading: false,
      finished: false
    }
  },
  computed: {
    ...mapGetters([
      'wxList'
    ])
  },
  created () {
  },
  methods: {
    onLoad () {
      if (this.wxList.length === 0) {
        this.queryGzhToken()
      } else {
        this.loading = false
        this.finished = true
      }
    },
    queryGzhToken () {
      this.loading = true
      this.current = this.current + 1
      this.$http.post('fbsServer/articleGzh/getGzhArticle', {
        'type': 'news',
        'offset': this.current,
        'count': 10
      }).then((res) => {
        const data = res.data
        const wxList = []
        data.item.forEach((content) => {
          content.content.updateTime = this.$formatToDateTime(new Date(content.content.update_time * 1000))
          wxList.push(content.content)
        })
        this.$store.commit('SET_wxList', wxList)
        this.loading = false
        this.finished = true
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    toOther (url) {
      window.location = url
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .home-main {
    margin-bottom: 50px;
  }
  .rt-i {
    background-color: #fff;
    padding: 10px 10px;
    border-bottom: 1px solid #E9E9E9;
    &:last-child {
      border-bottom: 0;
    }
    .rt-i-i {
      vertical-align: top;
      width: 80px;
      height: 71px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rt-i-t {
      vertical-align: top;
      display: inline-block;
      width: 260px;
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
