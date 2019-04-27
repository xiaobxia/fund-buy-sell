/**
 * Created by xiaobxia on 2018/5/31.
 */
import { Toast } from 'mint-ui'

const duration = 500

export default {
  success (text) {
    Toast({
      message: text,
      iconClass: 'icon far fa-check-circle',
      className: 'big success',
      duration: duration
    })
  },
  error (text, duration) {
    Toast({
      message: text,
      iconClass: 'icon far fa-frown',
      className: 'big error',
      duration: duration || 1000
    })
  }
}
