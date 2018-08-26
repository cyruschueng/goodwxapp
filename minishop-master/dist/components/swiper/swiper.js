export default function initSwiper (page, { index = 0, size = 5, duration = 300, swiperWidth = 335 } = {}) {
  let distinct = 0
  size = size - 1
  index = parseInt(index)
  const viewportWidth = wx.getSystemInfoSync().screenWidth || 375
  const baseWidth = Math.floor(viewportWidth / 375 * swiperWidth)
  const animation = wx.createAnimation({
    duration
  })

  const getVal = () => {
    let x = -baseWidth * index
    // px -> rpx 不准确，不知为什么，需要测试
    if (viewportWidth !== 375 && viewportWidth !== 320) {
      x = x + index
    }

    return x
  }

  const timeGtMax = (time) => {
    return time > duration ? duration : time
  }

  const move = (spend, x = getVal()) => {
    animation.translate3d(x, 0, 0).step({
      duration: spend
    })
    page.setData({
      animation: animation.export(),
      swiperIndex: index
    })
  }

  const previous = (spend) => {
    if (index > 0) {
      index--
    }
    move(spend)
  }

  const next = (spend) => {
    if (index < size) {
      index++
    }
    move(spend)
  }

  const resume = (spend) => {
    move(spend)
  }

  const end = e => {
    const dis = Math.abs(e.x1 - e.x2)
    const handler = (spend) => {
      if (e.dir === 'left') {
        next(spend)
      } else if (e.dir === 'right') {
        previous(spend)
      }
    }

    // 快速滑动
    if (e.spend < 250 && dis > 30) {
      handler(timeGtMax(e.spend * 2))
    } else if (dis < viewportWidth / 2) {
      resume(timeGtMax(e.spend))
    } else {
      handler(timeGtMax(e.spend))
    }
  }

  page.on('touch:start', e => {
    distinct = getVal()
  })

  page.on('touch:move', e => {
    if (e.dir === 'left' || e.dir === 'right') {
      distinct -= e.xrange
      move(0, distinct)
    }
  })

  page.on('touch:end', end)

  page.on('touch:cancel', end)

  //  初始化
  resume(0)
}
