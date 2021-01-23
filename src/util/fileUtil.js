// 保存部分可以用file-saver代替
function base64ToBlob (code) {
  const parts = code.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

const fileUtil = {
  /**
   * 获取文件名后缀
   * @param filename
   * @returns {*}
   */
  getSuffix (filename) {
    if (filename) {
      const lastIndex = filename.lastIndexOf('.')
      return filename.substring(lastIndex + 1)
    }
    return ''
  },
  // 通过base64创建图片
  createBase64Img (type, str) {
    return `data:image/${type};base64,${str}`
  },
  // 下载文件流
  downloadBlob (data, name, type) {
    const blob = new Blob([data])
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = `${name}.${type}` // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  },
  // 创建上传的FormData
  createUploadFormData (target) {
    target = target || {}
    const formData = new FormData()
    // 向 formData 对象中添加文件
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        formData.append(key, target[key])
      }
    }
    return formData
  },
  // 下载base64文件
  downloadBase64File (fileName, content) {
    const aLink = document.createElement('a')
    const blob = base64ToBlob(content) // new Blob([content]);
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))// 兼容火狐
  }
}

export default fileUtil
