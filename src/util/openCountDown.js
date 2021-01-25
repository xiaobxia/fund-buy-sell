import dateUtil from '@/util/dateUtil'
function marketOpenDayCountDown () {
  const d = dateUtil.getDate()
  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  const hour = d.getHours()
  // const minute = d.getMinutes()
  // const second = d.getSeconds()
  if (hour < 9) {
    const open = (new Date(year, month, day, 9)).getTime()
    return open - d.getTime()
  }
  if (hour === 16) {
    const open = (new Date(year, month, day, 17)).getTime()
    return open - d.getTime()
  }
  if (hour >= 22) {
    const open = (new Date(year, month, day + 1, 9)).getTime()
    return open - d.getTime()
  }
  return false
}

export default {
  marketOpenDayCountDown
}
