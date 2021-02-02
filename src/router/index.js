import Vue from 'vue'
import Router from 'vue-router'
/* AppLayout */
import AppLayout from '@/routers/AppLayout/index'

const lazyLoading = (path, index = true) => () => System.import(`@/routers/${path}${index ? '/index' : ''}.vue`)

Vue.use(Router)

// 都有的路由
export const constantRouterMap = [
  {
    name: 'Login',
    path: '/login',
    component: lazyLoading('Login'),
    meta: {
      auth: false,
      pageName: '登录'
    }
  },
  {
    name: 'ActiveRegister',
    path: '/activeRegister',
    component: lazyLoading('ActiveRegister'),
    meta: {
      auth: false,
      pageName: '注册激活'
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: lazyLoading('Register'),
    meta: {
      auth: false,
      pageName: '注册'
    }
  },
  {
    name: 'ForgetPassword',
    path: '/forgetPassword',
    component: lazyLoading('ForgetPassword'),
    meta: {
      auth: false,
      pageName: '忘记密码'
    }
  },
  {
    name: 'FindPassword',
    path: '/findPassword',
    component: lazyLoading('FindPassword'),
    meta: {
      auth: false,
      pageName: '找回密码'
    }
  },
  {
    name: 'HelloWorld',
    path: '/helloWorld',
    component: lazyLoading('HelloWorld'),
    meta: {
      auth: true
    }
  },
  {
    name: 'NoPermission',
    path: '/401',
    component: lazyLoading('NoPermission'),
    meta: {
      auth: false
    }
  },
  {
    name: 'ToImageDemo',
    path: '/toImageDemo',
    component: lazyLoading('ToImageDemo'),
    meta: {
      auth: false
    }
  },
  {
    path: '',
    redirect: 'home'
  },
  {
    name: '404',
    path: '*',
    component: lazyLoading('NotMatch'),
    meta: {
      auth: false,
      pageName: '404'
    }
  }
]

export const asyncRouterMap = [
  {
    path: '/home',
    component: AppLayout,
    name: 'Home',
    redirect: '/home/main',
    children: [
      {
        path: 'main',
        component: lazyLoading('Home/Main'),
        name: 'HomeMain',
        meta: {
          auth: true,
          pageName: '信号首页'
        }
      },
      {
        path: 'gzh',
        component: lazyLoading('Home/Gzh'),
        name: 'HomeGzh',
        meta: {
          auth: true,
          pageName: '公众号'
        }
      },
      {
        path: 'mine',
        component: lazyLoading('Home/Mine'),
        name: 'HomeMine',
        meta: {
          auth: true,
          pageName: '我的'
        }
      }
    ]
  },
  {
    path: '/about',
    component: AppLayout,
    name: 'About',
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        component: lazyLoading('About'),
        name: 'AboutIndex',
        meta: {
          auth: true,
          pageName: '关于'
        }
      }
    ]
  },
  {
    path: '/feedback',
    component: AppLayout,
    name: 'Feedback',
    redirect: '/feedback/index',
    children: [
      {
        path: 'index',
        component: lazyLoading('Feedback'),
        name: 'FeedbackIndex',
        meta: {
          auth: true,
          pageName: '意见反馈'
        }
      }
    ]
  },
  {
    path: '/invitation',
    component: AppLayout,
    name: 'Invitation',
    redirect: '/invitation/index',
    children: [
      {
        path: 'index',
        component: lazyLoading('Invitation'),
        name: 'InvitationIndex',
        meta: {
          auth: true,
          pageName: '邀请好友'
        }
      }
    ]
  },
  {
    path: '/vipBuy',
    component: AppLayout,
    name: 'VipBuy',
    redirect: '/vipBuy/index',
    children: [
      {
        path: 'index',
        component: lazyLoading('VipBuy'),
        name: 'VipBuyIndex',
        meta: {
          auth: true,
          pageName: '会员购买'
        }
      }
    ]
  },
  {
    path: '/buyQr',
    component: AppLayout,
    name: 'BuyQr',
    redirect: '/buyQr/index',
    children: [
      {
        path: 'index',
        component: lazyLoading('BuyQr'),
        name: 'BuyQrIndex',
        meta: {
          auth: true,
          pageName: '支付二维码'
        }
      }
    ]
  },
  {
    path: '/signal',
    component: AppLayout,
    name: 'Signal',
    children: [
      {
        path: 'indexRisk',
        component: lazyLoading('Signal/indexRisk', false),
        name: 'IndexRisk',
        meta: {
          auth: true,
          pageName: '指数风险'
        }
      },
      {
        path: 'indexTodayRate',
        component: lazyLoading('Signal/indexTodayRate', false),
        name: 'IndexTodayRate',
        meta: {
          auth: true,
          pageName: '今日涨跌幅'
        }
      },
      {
        path: 'buySell',
        component: lazyLoading('Signal/buySell', false),
        name: 'IndexBuySell',
        meta: {
          auth: true,
          pageName: '买卖信号'
        }
      }
    ]
  }
]

export default new Router({
  // hash, history
  mode: 'hash',
  linkActiveClass: 'is-active',
  // 这个功能只在 HTML5 history 模式下可用
  scrollBehavior: () => ({y: 0}),
  routes: [...constantRouterMap, ...asyncRouterMap]
})
