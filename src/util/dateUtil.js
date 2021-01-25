export default {
  // 根据北京时间，而不是系统时间
  getDate () {
    // 获得当前运行环境时间
    let d = new Date()
    let currentDate = new Date()
    let tmpHours = currentDate.getHours()
    // 算得时区
    let timeZone = -d.getTimezoneOffset() / 60
    // 少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间（西区时间比东区时间早 所以加时区间隔）
    if (timeZone < 0) {
      timeZone = Math.abs(timeZone) + 8; currentDate.setHours(tmpHours + timeZone)
    } else {
      // 大于0的是东区  东区时间直接跟京八区相减
      timeZone -= 8; currentDate.setHours(tmpHours - timeZone)
    }
    return currentDate
  }
}
