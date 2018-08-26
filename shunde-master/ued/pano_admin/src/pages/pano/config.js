// 待拼接
export let mosaic = {
  header: {
    btnText: '新增拼接工程',
    search: {
      placeholder: '搜索待拼接全景'
    },
    menus: [{
      text: '待拼接',
      isActive: true,
      path: '/pages/pano/mosaic'
    },
    {
      text: '待入库',
      isActive: false,
      path: '/pages/pano/upload'
    },
    {
      text: '已入库',
      isActive: false,
      path: '/pages/pano/list'
    }]
  },
  lists: [
    {
      choosed: false,
      title: '全景名字',
      loadStyle: '上传中',
      tiles: ['', '', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png']
    },
    {
      choosed: false,
      title: '全景名字',
      loadStyle: '上传中',
      tiles: ['./static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png']
    },
    {
      title: '全景名字',
      choosed: false,
      tiles: ['./static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png', './static/login/img1.png']
    }
  ]
}

export let upload = {
  header: {
    search: {
      placeholder: '搜索待入库全景'
    },
    btnText: '上传全景图', // 街道/镇
    menus: [{
      text: '待拼接',
      isActive: false,
      path: '/pages/pano/mosaic'
    },
    {
      text: '待入库',
      isActive: true,
      path: '/pages/pano/upload'
    },
    {
      text: '已入库',
      isActive: false,
      path: '/pages/pano/list'
    }]
  },
  lists: [{
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: true
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  }]
}

export let list = {
  header: {
    btnText: false,
    search: {
      placeholder: '搜索已入库Poi'
    },
    menus: [{
      text: '待拼接',
      isActive: false,
      path: '/pages/pano/mosaic'
    },
    {
      text: '待入库',
      isActive: false,
      path: '/pages/pano/upload'
    },
    {
      text: '已入库',
      isActive: true,
      path: '/pages/pano/list'
    }]
  },
  lists: [{
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: true
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  },
  {
    name: '德胜大街南路',
    time: '1514096459674',
    img: './static/login/img1.png',
    choosed: false
  }]
}
