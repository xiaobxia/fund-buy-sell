import router from './router'
// import store from './store'
import storageUtil from '@/util/storageUtil'
// import permissionUtil from '@/util/permission'

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  console.log(from)
  console.log(to)
  const userInfo = storageUtil.getData('UserInfo')
  // 添加过路由
  if (to.meta && to.meta.auth === true) {
    // 登陆过的那就会有用户信息，不管你是不是刷新
    if (userInfo.token) {
      // 登入了还去登录，直接转首页
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  console.log('afterEach')
  console.log('from', from)
  console.log('to', to)
  if (to.meta && to.meta.pageName) {

  }
})
