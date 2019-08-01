<template>
  <div class="today-index">
    <mt-header title="定投估值" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="red-warn">
        <div>喜欢的朋友可以以在公众号文章中点广告的方式支持我们！</div>
      </div>
      <mt-cell-swipe>
        <div slot="title" class="tab-title">
          <h3>
            <span class="name">名称</span>
            <span class="index-pe">PE</span>
            <span class="index-pb">PB</span>
          </h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe v-for="(item) in list" :key="item.code">
        <div slot="title">
          <h3>
            <span class="name"><span :class="['valuation-tag', item.guzhi==='偏低'?'low':item.guzhi==='适中'?'normal':'high']">{{item.guzhi || ''}}</span>{{item.name}}</span>
            <span class="index-pe">{{item.PE || 0}}</span>
            <span class="index-pb">{{item.PB || 0}}</span>
          </h3>
        </div>
      </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'Valuation',
  data () {
    return {
      list: []
    }
  },
  beforeDestroy () {
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.queryData()
      this.addPV('定投估值')
    },
    queryData () {
      const deviceId = storageUtil.getDeviceInfo('device_id')
      return this.$http.get(`customerCommon/getIndexValuation`, {
        device_id: deviceId
      }).then((data) => {
        if (data.success) {
          this.list = data.data
        }
      })
    },
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
