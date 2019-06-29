<template>
  <div>
    <router-view v-if="subPath"/>
    <template v-else>
      <fund v-if="tabSelect === 'fund'"/>
      <configCenter v-if="tabSelect === 'configCenter'"/>
      <mine v-if="tabSelect === 'mine'"/>
      <square v-if="tabSelect === 'square'"></square>
      <mt-tabbar v-model="tabSelect" :fixed="true">
        <mt-tab-item id="fund">
          <img src="./assets/fund.png" alt="" slot="icon">
          <!--<i class="fas fa-donate" slot="icon"></i>-->
          <p>基金</p>
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img src="./assets/my.png" alt="" slot="icon">
          <!--<i class="far fa-user" slot="icon"></i>-->
          <p>我的</p>
        </mt-tab-item>
      </mt-tabbar>
    </template>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import Mine from '@/tabViews/Mine/index.vue'
import Index from '@/tabViews/Index/index.vue'
import Fund from '@/tabViews/Fund/index.vue'
import ConfigCenter from '@/tabViews/ConfigCenter/index.vue'
import Square from '@/tabViews/Square/index.vue'
import environmentUtil from '@/util/environmentUtil.js'

export default {
  name: 'App',
  data () {
    return {
      subPath: false
    }
  },
  watch: {
    tabSelect (val) {

    }
  },
  computed: {
    tabSelect: {
      get () {
        return this.$store.state.tabSelect || 'fund'
      },
      set (val) {
        storageUtil.setAppConfig('homeTabSelect', val)
        this.$store.dispatch('setTabSelect', val)
      }
    }
  },
  components: {Index, Mine, Fund, ConfigCenter, Square},
  created () {
    environmentUtil.createDeviceInfo()
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.checkSubPath(this.$router.history.current.path)
      // 刷新的时候before和after都不会执行
      this.$router.beforeEach((transition, from, next) => {
        if (this.checkAuthPath(transition)) {
        }
        this.checkSubPath(transition.path)
        next()
      })
      // after只有真正进入了页面才会执行
      this.$router.afterEach((transition) => {
        // 验证路由过去是否需要登录状态
        if (this.checkAuthPath(transition)) {
        }
        this.checkSubPath(transition.path)
      })
    },
    checkSubPath (path) {
      this.subPath = path !== '/'
      // this.subPath = path.startsWith('/page')
    },
    checkAuthPath (current) {
      const now = current || this.$router.history.current
      // 需要鉴权的才转登录
      return now.meta && now.meta.auth === true
    },
    checkPermissionPath (current) {
      const now = current || this.$router.history.current
      // 需要鉴权的才转登录
      return now.meta && now.meta.roles
    },
    checkIn (userRoles, roleList) {
      for (let i = 0; i < userRoles.length; i++) {
        const userRole = userRoles[i]
        for (let j = 0; j < userRoles.length; j++) {
          const roleItem = roleList[j]
          if (roleItem === userRole) {
            return true
          }
        }
      }
    },
    checkPermission (userRoles, roleMap) {
      // roles :{include, exclude}
      if (roleMap) {
        let permission = true
        const include = roleMap.include
        const exclude = roleMap.exclude
        // 存在于include
        if (include) {
          permission = this.checkIn(userRoles, include)
        }
        // 存在于exclude
        if (exclude && this.checkIn(userRoles, exclude)) {
          permission = false
        }
        // exclude有决定权
        return permission
      } else {
        // 没有权限要求
        return true
      }
    },
    checkUser (user, transition) {
      if (user.isLogin !== true) {
        // 不强制要求登录
      } else {
        const roles = this.checkPermissionPath(transition)
        if (roles) {
          if (!this.checkPermission(user.roles, roles)) {
            // 替换为404
            this.$router.replace('/noPermission')
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
