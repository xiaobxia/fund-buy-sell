import axios from 'axios'
import rateLimit from 'axios-rate-limit'
import qs from 'qs'
import storageUtil from '@/util/storageUtil'
import urlUtil from '@/util/urlUtil'
import router from '../router/index'
import { Toast } from 'vant'

const axiosHttp = rateLimit(axios.create(), {
  maxRequests: 20,
  perMilliseconds: 1000 * 10}
)

let basePath = '/'

// 默认连接地址，只在调试时有用
if (process.env.NODE_ENV === 'development') {
  basePath = `/${urlUtil.getQueryStringArgs('pt') || 'online'}${basePath}`
}

axiosHttp.interceptors.request.use(function (config) {
  config.headers.token = window._token || localStorage.getItem('token') || ''
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosHttp.interceptors.response.use(function (response) {
  if (response.data.success === false) {
    if (response.data.code === 401) {
      storageUtil.setData('UserInfo', {
        isLogin: false
      })
      router.replace('/login')
    }
    if (!response.config.noWarn) {
      Toast.fail(response.data.message || '')
    }
    return Promise.reject(new Error(response.data.message))
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

function makeUrl (url) {
  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    // 统计接口
    window.trackEvent('接口', url)
    return `${basePath}${url}`
  }
}

const Http = {
  get (url, query, options) {
    let queryString = ''
    if (query) {
      query.timestamp = new Date().getTime()
    } else {
      query = { timestamp: new Date().getTime() }
    }
    queryString = qs.stringify(query)
    return axiosHttp.get(makeUrl(url + (queryString ? '?' + queryString : '')), options).then(data => data.data)
  },
  getWithCache (url, query, cache, options) {
    let queryString = ''
    let cacheKey = url
    if (query) {
      cacheKey += qs.stringify({
        ...query
      })
      query.timestamp = new Date().getTime()
      queryString = qs.stringify(query)
    } else {
      queryString = qs.stringify({timestamp: new Date().getTime()})
    }
    let cacheData = storageUtil.getQueryCache(cacheKey)
    if (cacheData) {
      let cacheDataRaw = JSON.parse(cacheData)
      // 可以使用缓存
      if (!((Date.now() - cacheDataRaw.time) > cache.interval * 1000)) {
        return new Promise((resolve, reject) => {
          resolve(cacheDataRaw.data)
        })
      }
    }
    return axiosHttp.get(makeUrl(url + (queryString ? '?' + queryString : '')), options).then(data => {
      cacheData = {
        time: Date.now(),
        data: data.data
      }
      storageUtil.setQueryCache(cacheKey, JSON.stringify(cacheData))
      return data.data
    })
  },
  getRaw (url, query, options) {
    let queryString = ''
    if (query) {
      query.timestamp = new Date().getTime()
      queryString = qs.stringify(query)
    } else {
      queryString = qs.stringify({timestamp: new Date().getTime()})
    }
    return axiosHttp.get(makeUrl(url + (queryString ? '?' + queryString : '')), options)
  },
  post (url, param, options) {
    return axiosHttp.post(makeUrl(url), qs.stringify(param), options).then(data => data.data)
  },
  postRaw (url, param, options) {
    return axiosHttp.post(makeUrl(url), qs.stringify(param), options)
  },
  postFormData (url, param, options) {
    return axiosHttp.post(makeUrl(url), param, options).then(data => data.data)
  },
  postFormDataRaw (url, param, options) {
    return axiosHttp.post(makeUrl(url), param, options)
  },
  delete (url, options) {
    return axiosHttp.delete(makeUrl(url), options).then(data => data.data)
  },
  deleteRaw (url, options) {
    return axiosHttp.delete(makeUrl(url), options)
  },
  jsonp (url, options) {
    return axiosHttp.jsonp(makeUrl(url), options)
  },
  generateUrl (url) {
    return makeUrl(url)
  }
}

export default Http
