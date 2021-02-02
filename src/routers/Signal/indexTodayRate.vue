<template>
  <div class="index-rate grey-page-full">
    <van-nav-bar class="p-h op-nav-bar" title="指数涨跌幅" left-arrow @click-left="backHandler" />
    <img src="../../assets/img-h-bg.png" alt="" style="position: absolute;width: 100%;top: 0;left: 0">
    <div class="con-w b-10">
      <div class="h-t">数据日期：{{tradeDate}}</div>
      <div class="title-info-block round shadow lock-tag-block-bottom">
        <div class="index-list-wrap">
          <div v-for="(item, index) in list" :key="index" class="index-item">
            <span>{{nameMap[item.code]}}</span>
            <span class="ri-t" :class="$stockNumberClass(item.netChangeRatio)">{{item.netChangeRatio}}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LockTag from '@/components/LockTag'
import { Notify } from 'vant'
import themeUtil from '@/util/themeUtil.js'
import indexList from '@/common/indexList'

const nameMap = {}
indexList.forEach((v) => {
  nameMap[v.code] = v.name
})

export default {
  name: 'IndexTodayRate',
  components: {
    LockTag
  },
  data () {
    return {
      list: [],
      listGreen: [],
      tradeDate: '',
      noUpdate: false,
      noUpdateText: '',
      nameMap
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created () {
    this.$http.get('fbsServer/user/getIndexRate').then((res) => {
      this.setListData(res.data)
    })
  },
  methods: {
    setListData (data) {
      const record = data.record || []
      const list = []
      record.forEach((v) => {
        let r = (Math.abs(v.netChangeRatio) * 20)
        if (r > 90) {
          r = 90
        }
        if (r < 10) {
          r = 10
        }
        r = 100 - r
        v.r = r
        // 越大越淡
        if (v.netChangeRatio > 0) {
          v.color = themeUtil.tintColor('F56C6C', Number((r / 100).toFixed(2)))
          list.push(v)
        } else {
          v.color = themeUtil.tintColor('67C23A', Number((r / 100).toFixed(2)))
          list.push(v)
        }
      })
      list.sort((a, b) => {
        return b.netChangeRatio - a.netChangeRatio
      })
      this.list = list
      this.tradeDate = data.trade_date
    },
    onLoad () {
    },
    getBg (item) {
      return `background-color: ${item}`
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
  .p-h {
    position: relative;
    z-index: 100;
    color: #fff;
  }
  .con-w {
    position: relative;
    z-index: 100;
    padding: 0 10px;
  }
  .c-l-w {
    min-height: calc(100vh - 150px);
  }
  .index-list-wrap {
    margin-top: 10px;
    font-size: 13px;
    color: #484848;
  }
  .index-item {
    overflow: hidden;
    height: 32px;
    line-height: 32px;
    border-radius: 8px;
    padding: 0 10px;
    margin-bottom: 4px;
    background-color: #F1F2F3;
    &:last-child {
      margin: 0;
    }
  }
  .title-info-block {
    margin-bottom: 10px;
  }
  .b-10 {
    padding-bottom: 20px;
  }
  .t-10 {
    padding-top: 20px;
  }
  .h-t {
    color: #fff;
    line-height: 32px;
    font-size: 16px;
  }
  .h-d {
    color: #fff;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .ri-t {
    float: right;
  }
</style>
