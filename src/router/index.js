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
      auth: false
    }
  },
  {
    name: 'ActiveRegister',
    path: '/activeRegister',
    component: lazyLoading('ActiveRegister'),
    meta: {
      auth: false
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: lazyLoading('Register'),
    meta: {
      auth: false
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
      auth: false
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
          auth: true
        }
      },
      {
        path: 'gzh',
        component: lazyLoading('Home/Gzh'),
        name: 'HomeGzh',
        meta: {
          auth: true
        }
      },
      {
        path: 'mine',
        component: lazyLoading('Home/Mine'),
        name: 'HomeMine',
        meta: {
          auth: true
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
          auth: true
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
          auth: true
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
