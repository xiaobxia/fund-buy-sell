<template>
  <div class="home-main grey-page">
    <div class="p-t">公众号文章</div>
    <img src="../../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%;top: 0;left: 0">
    <div class="con-w">
      <div class="title-info-block round shadow">
        <div class="title-wrap">
          <span class="title-icon"></span>
          <span class="t-t">交易小记</span>
        </div>
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
                <div class="rt-i-i i-w">
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
