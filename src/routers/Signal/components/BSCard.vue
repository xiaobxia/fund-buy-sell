<template>
  <div class="bs-card">
    <van-row>
      <van-col span="12">
        <div class="xs-tag"  :style="getBg(info.color)" >
          <span v-if="info.fb === 'r'">安全系数:{{formatXS(info.qdiff)}}</span>
          <span v-if="info.fb === 'g'">风险系数:{{formatXS(info.qdiff)}}</span>
        </div>
      </van-col>
      <van-col span="12">
        <div>
          <div
            class="bs-tag"
            :class="{'red-bg': info.flag === '加仓', 'green-bg': info.flag === '减仓'}"
          >{{info.flag || '无'}}</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>

export default {
  name: 'BSCard',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
    info () {
      this.init()
    }
  },
  created () {

  },
  methods: {
    formatXS (value) {
      return Math.abs(value).toFixed(2)
    },
    getBg (item) {
      return `background-color: ${item}`
    },
    init () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .bs-card {
    margin-top: 10px;
    .xs-tag {
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      border-radius: 10px;
      display: inline-block;
      width: 9em;
    }
    .bs-tag {
      float: right;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
      border-radius: 10px;
      color: #fff;
      background-color: #ccc;
      width: 4em;
    }
  }
</style>
