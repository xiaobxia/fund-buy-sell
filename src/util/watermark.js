let watermark = {}
let id = '1.23452384164.123412415'

let setWatermark = (str) => {
  let can = document.createElement('canvas')
  can.width = 200
  can.height = 120

  let cans = can.getContext('2d')
  cans.rotate(-20 * Math.PI / 180)
  cans.font = '40px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, 0.20)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, 0, can.height / 1.25)

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth + 'px'
  div.style.height = document.documentElement.clientHeight + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
  setTimeout(() => {
    setWatermark(str)
  }, 300)
  return id
}

watermark.remove = (id) => {
  document.body.removeChild(document.getElementById(id))
}

export default watermark
