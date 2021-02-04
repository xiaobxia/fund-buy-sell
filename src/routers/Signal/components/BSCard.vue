<template>
  <div class="bs-card">
    <van-row>
      <van-col span="8">
        <div class="s-w">
          <div class="title">仓位</div>
          <div class="de">
            <van-progress
              :percentage="75"
              pivot-text="紫色"
              pivot-color="#7232dd"
              color="linear-gradient(to right, #be99ff, #7232dd)"
            />
          </div>
        </div>
      </van-col>
      <van-col span="8">
        <div class="s-w c-t">span: 8</div>
      </van-col>
      <van-col span="8">
        <div class="s-w">
          <div class="title">信号</div>
          <div class="de">
            <div>1122</div>
          </div>
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
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
  .bs-card {
    margin-top: 10px;
    .title {
      text-align: center;
      line-height: 20px;
      font-size: 12px;
    }
    .de {
      position: relative;
      height: 30px;
    }
    .s-w {
      text-align: center;
      height: 50px;
    }
    .c-t {
      border: 1px solid #bbb;
      border-top: none;
      border-bottom: none;
    }
    /deep/ {
      .van-progress {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
      }
    }
  }
</style>
