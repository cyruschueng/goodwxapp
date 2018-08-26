import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// import getters from './getters'

Vue.use(Vuex)
const state = {
  menus: {},
  isMenuLoaded: false,
  deviceType: {
    '1': {
      name: '2:1全景',
      key: 1,
      len: 1
    },
    '2': {
      name: '无人机拼接',
      key: 2,
      max_count: 32,
      min_count: 24,
      len: [24, 32],
      status: [{
        text: '素材就绪',
        key: 0
      }, {
        text: '已完成',
        key: 1
      }, {
        text: '拼接中',
        key: 2
      }, {
        text: '请确认补天图片',
        key: 3
      }, {
        text: '拼接失败',
        key: 4
      }, {
        text: '待融合',
        key: 5
      }, {
        text: '融合中',
        key: 6
      }]
    },
    '3': {
      name: '鱼眼拼接',
      key: 3,
      len: 9, // -1失败,0:未开始,1:成功, 2:处理中
      status: [{
        text: '拼接失败',
        key: -1
      }, {
        text: '准备就绪',
        key: 0
      }, {
        text: '拼接完成',
        key: 1
      }, {
        text: '处理中',
        key: 2
      }]
    }
  },
  userInfo: {
    'departmentId': '',
    'departmentName': '',
    'email': '',
    'isValid': '',
    'lastEditTime': '',
    'createTime': '',
    'password': '',
    'phone': '',
    'roleId': '',
    'userId': '',
    'userName': '',
    'unique_id': '',
    'token': ''
  },
  userPermissions: {
    isValid: false,
    _origin: [],
    uriPattern: {}
  },
  departmentList: [],
  /**
   * poi列表
   * 场景：如入库单时关联全景和poi
   */
  poilists: {},
  /**
   * 存储编辑的全景信息
   * panoId: {}
   */
  panoInfos: {},
  /**
   * 地理列表缓存
   */
  zone: {
    'province': '省',
    'city': '市',
    'country': '区',
    'area': '地区'
  },
  /**
   * 保存配置信息
   */
  config: {
    panoMaxTags: 5,
    pageSize: 10,
    shunDeCode: [
      {
        code: '',
        name: '全部',
        img: ''
      },
      {
        code: '44060601',
        name: '伦教',
        img: 'lunjiao.png'
      },
      {
        code: '44060602',
        name: '勒流',
        img: 'leliu.png'
      },
      {
        code: '44060603',
        name: '大良',
        img: 'daliang.png'
      },
      {
        code: '44060604',
        name: '容桂',
        img: 'ronggui.png'
      },
      {
        code: '44060605',
        name: '陈村',
        img: 'chencun.png'
      },
      {
        code: '44060606',
        name: '北滘',
        img: 'beiyao.png'
      },
      {
        code: '44060607',
        name: '乐从',
        img: 'lecong.png'
      },
      {
        code: '44060608',
        name: '龙江',
        img: 'longjiang.png'
      },
      {
        code: '44060609',
        name: '杏坛',
        img: 'xintan.png'
      },
      {
        code: '44060610',
        name: '均安',
        img: 'junan.png'
      }
    ],
    coordsys: [
      {
        value: 1,
        label: '高德',
        picker: 'http://lbs.amap.com/console/show/picker'
      },
      {
        value: 2,
        label: '腾讯',
        picker: 'http://lbs.qq.com/tool/getpoint/'
      }
    ],
    // 拍摄方式 枚举 1 无人机 2手持高杆 3相机
    cameraType: [
      {
        value: 1,
        label: '无人机'
      },
      {
        value: 2,
        label: '手持高杆'
      },
      {
        value: 3,
        label: '相机'
      }
    ],
    // -1:失败,0:未开始,1:成功, 2:处理中
    mosaicStatus: [{
      text: '待拼接',
      key: '*',
      chooseNable: true
    }, {
      text: '待拼接',
      key: -1,
      chooseNable: true
    }, {
      text: '待拼接',
      key: 0,
      chooseNable: true
    }, {
      text: '拼接成功',
      key: 1,
      chooseNable: false
    }, {
      text: '全力拼接中',
      key: 2,
      chooseNable: false
    }]
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
  // getters
})
