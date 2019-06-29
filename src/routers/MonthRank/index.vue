<template>
  <div class="today-index">
    <mt-header title="指数月收益排行" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <mt-cell-swipe v-for="(item, index) in list" :key="item.code">
        <div slot="title">
          <h3>
            <span class="paiming">{{index + 1}}.</span>
            <span class="name">{{item.name}}</span>
            <span style="float: right" :class="numberClass(item.month_rate)">{{item.month_rate}}%</span>
          </h3>
        </div>
      </mt-cell-swipe>
      <div class="ad-block" v-if="ifShowAd()">
        <img :src="ad_url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'MonthRank',
  data () {
    return {
      list: [],
      ad_url: ''
    }
  },
  beforeDestroy () {
  },
  mounted () {
    this.initPage()
    this.addPV('月度指数排行')
    setTimeout(() => {
      this.getAdUrl()
    }, 500)
  },
  methods: {
    initPage () {
      this.queryData()
    },
    queryData () {
      const deviceId = storageUtil.getDeviceInfo('device_id')
      return this.$http.get(`customerCommon/getMonthRank`, {
        device_id: deviceId
      }).then((data) => {
        if (data.success) {
          this.list = data.data
        }
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    },
    getAdUrl () {
      const type = this.showAdType()
      this.$http.get('customerCommon/getAdvertisements', {
        current: 1,
        pageSize: 10,
        type: type,
        status: 1
      }).then((data) => {
        let list = data.data.list || []
        let index = this.getAdIndex(5, list.length)
        let urlData = list[index] || {}
        this.ad_url = urlData.img_url
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
