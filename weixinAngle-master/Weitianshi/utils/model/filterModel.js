import { httpPost } from './httpModel.js'
let app = getApp();
let url_common = app.globalData.url_common;
//searchData
let data = {
  firstTime: true,
  tab: [
    { type: 1, name: '领域', label: 'industry', itemId: 'industry_id', itemName: 'industry_name', longCheckBox: false },
    { type: 1, name: '轮次', label: "stage", itemId: 'stage_id', itemName: 'stage_name', longCheckBox: false },
    { type: 1, name: '金额', label: "scale", itemId: 'scale_id', itemName: 'scale_money', longCheckBox: true },
    { type: 1, name: '地区', label: "hotCity", itemId: 'area_id', itemName: 'area_title', longCheckBox: false }
  ],
  labelToId: {
    'industry': 'industry_id',
    'stage': 'stage_id',
    'scale': 'scale_id',
    'hotCity': 'area_id',
    'label_industry': 'industry_id',
    'label_area': 'area_id',
    'label_style': 'style_id',
    'label_type': 'type_id',
    'label_time': 'time_id'
  },
  currentIndex: 99,
  searchData: {
    industry: [],
    stage: [],
    scale: [],
    hotCity: [],
    label_industry: [],
    label_area: [],
    label_style: [],
    label_type: [],
    label_time: [],
    search: "",
  },
  industryArr: [],
  stageArr: [],
  scaleArr: [],
  hotCityArr: [],
  // label_industryArr: [],
  label_areaArr: [],
  label_styleArr: [],
  label_typeArr: [],
  label_timeArr: [],
  industry: wx.getStorageSync('industry'),
  stage: wx.getStorageSync('stage'),
  scale: wx.getStorageSync('scale'),
  hotCity: wx.getStorageSync('hotCity'),
  // label_industry: label_industry || wx.getStorageSync('label_industry'),
  label_area: wx.getStorageSync('label_area'),
  label_style: wx.getStorageSync('label_style'),
  label_type: wx.getStorageSync('label_type'),
  label_time: wx.getStorageSync('label_time')
}
let _label_industry = []
let _linkDataShow = {
  selectData: [],
  firstStair: [],
  secondStair: '',
}

//----------------------------------缓存---------------------------------------------------------------
function getCache() {
  // 获取旧式领域,地区,阶段,金额,热门城市缓存
  wx.request({
    url: url_common + '/api/category/getProjectCategory',
    method: 'POST',
    success: function (res) {
      let thisData = res.data.data;
      thisData.area.forEach((x) => { x.check = false })
      thisData.industry.forEach((x) => { x.check = false })
      thisData.scale.forEach((x) => { x.check = false })
      thisData.stage.forEach((x) => { x.check = false })
      thisData.hotCity.forEach(x => x.check = false)
      wx.setStorageSync("area", thisData.area)
      wx.setStorageSync("industry", thisData.industry)
      wx.setStorageSync("scale", thisData.scale)
      wx.setStorageSync("stage", thisData.stage)
      wx.setStorageSync("hotCity", thisData.hotCity)
      wx.setStorageSync('tran_area', [])
      wx.setStorageSync('tran_industry', [])
      wx.setStorageSync('tran_scale', [])
      wx.setStorageSync('tran_stage', [])
      wx.setStorageSync('tran_hotCity', [])
      data.industry = thisData.industry;
      data.stage = thisData.stage;
      data.scale = thisData.scale;
      data.hotCity = thisData.hotCity;
    },
  })
  //非联动标签的check设置
  function dealLabel(variable, str) {
    variable.forEach(x => {
      x.check = false;
    })
    // console.log(str, variable)
    wx.setStorageSync(str, variable)
  }
  //联动标签的check设置
  function dealLabelChild(variable, str) {
    variable.forEach(x => {
      x.check = false;
      x.child.forEach(y => {
        y.check = false;
      })
    })
    variable[0].check = true;
    // console.log(str, variable)
    wx.setStorageSync(str, variable)
  }
  // 获取新式领域,风格,类型,地区缓存
  httpPost({
    url: url_common + '/api/investment/industrylist',
    data: {}
  }).then(res => {
    let label_industry = res.data.data.industry_list;
    dealLabelChild(label_industry, 'label_industry');
    httpPost({
      url: url_common + '/api/investment/arealist',
      data: {}
    }).then(res => {
      let label_area = res.data.data.area_list;
      dealLabel(label_area, 'label_area');
      data.label_area = label_area;
      httpPost({
        url: url_common + '/api/investment/stylelist',
        data: {}
      }).then(res => {
        let label_style = res.data.data.style_list;
        dealLabel(label_style, 'label_style');
        data.label_style = label_style;
        httpPost({
          url: url_common + '/api/investment/typelist',
          data: {}
        }).then(res => {
          let label_type = res.data.data.type_list;
          dealLabel(label_type, 'label_type');
          data.label_type = label_type;
          // 时间筛选项
          wx.setStorageSync('label_time', [{ time_id: 0, time_name: '近一年', check: false }, { time_id: 1, time_name: '近三年', check: false }, { time_id: 2, time_name: '全部', check: false }])
          initGroup();
        })
      })
    })
  }).catch(error => console.log(error))
}

getCache();
//-------------------------------------------------------------------------------------------------

// 将label_industry分组
function initGroup() {
  let originalData = wx.getStorageSync('label_industry');
  originalData.forEach((x, index) => {
    _label_industry.push(x)
    _linkDataShow.firstStair.push({
      industry_id: x.industry_id,
      industry_name: x.industry_name,
      check: false
    })
  })
  _linkDataShow.firstStair[0].check = true;
  _linkDataShow.secondStair = _label_industry[0].child;
}
// label=>itemIdStr
function labelToId(label) {
  if (typeof label != 'string') {
    throw Error('labelToId的参数必须为字符串')
  }
  return data.labelToId[label];
}
//更改搜索模块初始化设置
function reInitSearch(that, data) {
  let SearchInit = that.data.SearchInit;
  if (typeof data != 'object') {
    throw Error('reInitSearch的第二个参数类型必须为对象');
    return
  }
  for (let key in data) {
    SearchInit[key] = data[key];
  }
  that.setData({
    SearchInit: SearchInit
  })
}
// 下拉框
function move(e, that) {
  let SearchInit = that.data.SearchInit;
  let index = e.currentTarget.dataset.index;
  let label = e.currentTarget.dataset.label;
  let currentIndex = SearchInit.currentIndex;
  let linkDataShow = that.data.linkDataShow;

  // 清除未保存的选中标签
  if (label == 'label_industry') {
    linkDataShow = Object.assign({}, _linkDataShow);
    linkDataShow.secondStair.forEach(x => {
      x.check = false;
    })
    linkDataShow.selectData = SearchInit.searchData.label_industry;
    // 给二级菜单挂上勾号
    linkDataShow.secondStair.forEach((x, index) => {
      linkDataShow.selectData.forEach(y => {
        if (y == x.industry_id) {
          x.check = true;
        }
      })
    })
    that.setData({
      linkDataShow: linkDataShow
    })
  } else {
    this.initItem(label, that, SearchInit)
  }

  if (currentIndex != index) {
    SearchInit.currentIndex = index;
    that.setData({
      SearchInit: SearchInit
    })
  } else {
    SearchInit.currentIndex = 99;
    that.setData({
      SearchInit: SearchInit
    })
  }
}
// 获取dropDown
function getOffset(that) {
  let query = wx.createSelectorQuery();
  query.select('.dropDown').fields({
    dataset: true,
    size: true,
  }, function (res) {
    res.dataset    // 节点的dataset
    res.width      // 节点的宽度
    res.height     // 节点的高度
  }).exec()
}
// 初始化所有check值
function initData(that) {
  let SearchInit = that.data.SearchInit;
  let tab = SearchInit.tab;
  tab.forEach(x => {
    this.initItem(x.label, that, SearchInit)
  })
}
// 初始化某项check值(辅助函数)
function initItem(str, that, SearchInit) {
  let itemStr = str;
  let itemArrStr = str + 'Arr';
  let item = SearchInit[itemStr];
  let itemArr = SearchInit[itemArrStr]
  let searchData = SearchInit.searchData;
  let itemIdStr = '';
  let tab = SearchInit.tab;

  itemIdStr = SearchInit.labelToId[itemStr]
  itemArr = [];
  // 有联动关系的下拉表和无联动关系的下拉表
  if (item) {
    if (item[0].child) {
      item.forEach((x, index) => {
        x.child.forEach((y, index2) => {
          y.check = false;
          if (searchData[itemStr].indexOf(y[itemIdStr]) != -1) {
            y.check = true;
            itemArr.push(y)
          }
        })
      })
    } else {
      item.forEach(x => {
        x.check = false;
        if (searchData[itemStr].indexOf(x[itemIdStr]) != -1) {
          x.check = true;
          itemArr.push(x)
        }
      })
    }
  }
  SearchInit[itemStr] = item;
  SearchInit[itemArrStr] = itemArr;

  that.setData({
    SearchInit: SearchInit,
  })
}
// 选择一级标签
function firstLinkCheck(e, that) {
  let SearchInit = that.data.SearchInit;
  let label = e.currentTarget.dataset.label; // 联动标签在tab中的label名
  let tabIndex = e.currentTarget.dataset.tabindex; //联动标签在tab中的index
  let firstIndex = e.currentTarget.dataset.firstindex;  //点击的一级标签的index
  let tab = SearchInit.tab;

  //一级标签背景变色
  SearchInit[label].forEach(x => {
    x.check = false;
  })
  SearchInit[label][firstIndex].check = true;

  tab[tabIndex].page = firstIndex;
  that.setData({
    SearchInit: SearchInit
  })
}
// 联动标签选择全部
function linkCheckAll(e, that) {
  let SearchInit = that.data.SearchInit;
  let label = e.currentTarget.dataset.label;
  let firstLink = e.currentTarget.firstindex;
  let page = e.currentTarget.dataset.page;
  let itemArr = SearchInit[label + 'Arr'];

  SearchInit[label][page].child.forEach(x => {
    x.check = true;
    itemArr.push(x)
  })
  that.setData({
    SearchInit: SearchInit
  })

}
// 标签选择
function tagsCheck(e, that) {
  let str = e.currentTarget.dataset.str;
  let itemIdStr = e.currentTarget.dataset.itemidstr;
  let SearchInit = that.data.SearchInit;
  let itemStr = str;
  let itemArrStr = str + 'Arr';
  let item = SearchInit[itemStr];
  let itemArr = SearchInit[itemArrStr];
  let target = e.currentTarget.dataset.item;
  let index = e.currentTarget.dataset.index;
  let firstIndex = e.currentTarget.dataset.firstindex;
  let secondIndex = e.currentTarget.dataset.secondindex;

  // 有联动关系的下拉表
  if (item[0].child) {
    let linkItem = item[firstIndex].child[secondIndex];
    app.log(that,linkItem)
    if (linkItem.check == false) {
      linkItem.check = true;
      linkItem.firstIndex = firstIndex;
      linkItem.secondIndex = secondIndex;
      itemArr.push(linkItem)
    } else {
      linkItem.check = false;
      itemArr.forEach((x, index) => {
        if (linkItem[itemIdStr] == x[itemIdStr]) {
          itemArr.splice(index, 1)
        }
      })
    }
  } else {
    // 无联动关系的下拉表  
    if (target.check == false) {
      if (str == "label_time") {
        item.forEach(x => {
          x.check = false;
        })
        item[index].check = true;
        itemArr[0] = target;
      } else {
        if (itemArr.length < 5) {
          item[index].check = true;
          itemArr.push(target)
        } else {
          app.errorHide(that, '不能选择超过5个标签', 3000)
        }
      }
    } else {
      item[index].check = false;
      itemArr.forEach((y, index) => {
        if (target[itemIdStr] == y[itemIdStr]) {
          itemArr.splice(index, 1)
        }
      })
    }
  }
  that.setData({
    SearchInit: SearchInit
  })
}
// 筛选重置 
function reset(that) {
  let currentIndex = that.data.SearchInit.currentIndex;
  let SearchInit = that.data.SearchInit;
  let str = SearchInit.tab[currentIndex].label;
  // 区别处理label_industry和其他
  if (str == 'label_industry') {
    linkReset(that)
  } else {
    this.itemReset(str, that)
  }
}
function allReset(that) {
  let SearchInit = that.data.SearchInit;
  let tab = SearchInit.tab;
  // tab.forEach(x => {
  //   this.itemReset(x.label, that)
  // })
  let _newSearchInit = Object.assign({}, data)
  _newSearchInit.tab = SearchInit.tab;
  that.setData({
    SearchInit: _newSearchInit
  })
}
function itemReset(str, that) {
  let SearchInit = that.data.SearchInit;
  let itemStr = str;
  let itemArrStr = str + 'Arr';
  let item = SearchInit[itemStr];
  let itemArr = SearchInit[itemArrStr];
  let searchData = SearchInit.searchData;
  item.forEach(x => {
    x.check = false;
  })
  if (item[0].child) {
    item.forEach(x => {
      x.child.forEach(y => {
        y.check = false;
      })
    })
  }
  SearchInit[itemArrStr] = [];
  searchData[itemStr] = [];
  that.setData({
    SearchInit: SearchInit
  })
}
// 筛选确定
function searchCertain(that) {
  let SearchInit = that.data.SearchInit;
  let tab = SearchInit.tab;
  let currentIndex = that.data.SearchInit.currentIndex;
  let searchData = that.data.SearchInit.searchData;
  let linkDataShow = that.data.linkDataShow;
  // 区别是不是从展示列表进行删除的  99:从展示列表调用 非99:正常调用
  if (currentIndex == 99) {
    tab.forEach((x, index) => {
      let newArr = [];
      let label = x.label;
      let itemArrStr = x.label + 'Arr';
      let itemId = x.itemId;
      if (label == "label_industry") {
        searchData.label_industry = linkDataShow.selectData;
      } else {
        SearchInit[itemArrStr].forEach(y => {
          newArr.push(y[itemId])
        })
        searchData[label] = newArr;
      }
    })
  } else {
    let newArr = [];
    let label = tab[currentIndex].label;
    let itemArrStr = tab[currentIndex].label + 'Arr';
    let itemId = tab[currentIndex].itemId;
    // 区别处理label_industry和其他
    if (label == 'label_industry') {
      linkSearchCertain(that)
    } else {
      SearchInit[itemArrStr].forEach(x => {
        newArr.push(x[itemId])
      })
      searchData[label] = newArr;
    }
  }
  that.setData({
    SearchInit: SearchInit,
    requestCheck: true,
    currentPage: 1,
    page_end: false
  })

  SearchInit.currentIndex = 99;
  that.setData({
    SearchInit: SearchInit
  })
  return searchData;

  //发送筛选请求
  wx.request({
    url: url_common + '/api/project/getMyProjectList',
    data: {
      user_id: that.data.user_id,
      filter: searchData
    },
    method: 'POST',
    success: function (res) {
      this.initData(that);
      let SerachInit = that.data.SearchInit;
      SearchInit.currentInit = 99;
      if (res.data.data.length == 0) {
        that.setData({
          SearchInit: SearchInit,
          myProject: res.data.data,
          notHave: 0
        })
      } else {
        let SerachInit = that.data.SearchInit;
        SearchInit.currentInit = 99;
        that.setData({
          SearchInit: SearchInit,
          myProject: res.data.data
        })
      }
    }
  });
}
// 展示标签删除
function labelDelete(e, that) {
  let SearchInit = that.data.SearchInit;
  // console.log(SearchInit.label_type,SearchInit.label_typeArr,SearchInit.searchData)
  this.tagsCheck(e, that);
  this.searchCertain(that);
  // console.log(SearchInit.label_type, SearchInit.label_typeArr, SearchInit.searchData)
}
// 页面间跳转传值筛选
function detialItemSearch(label, itemId, that, callBack) {
  let SearchInit = that.data.SearchInit;
  let itemIdStr = labelToId(label);
  let item = SearchInit[label];
  let itemStrArr = label + 'Arr';
  let itemArr = SearchInit[itemStrArr];
  let linkDataShow = that.data.linkDataShow;
  if (label == 'label_industry') {
    linkDataShow.selectData.push(itemId)
  } else {
    //判断是否是有联动关系 
    if (item[0].child) {
      item.forEach(x => {
        x.child.forEach(y => {
          if (y[itemIdStr] == itemId) {
            y.check = true;
            itemArr.push(y)
          }
        })
      })
    } else {
      item.forEach(x => {
        if (x[itemIdStr] == itemId) {
          x.check = true;
          itemArr.push(x)
        }
      })
    }
  }

  SearchInit.searchData = searchCertain(that);
  that.setData({
    SearchInit: SearchInit,
    linkDataShow: linkDataShow
  })
  callBack(SearchInit.searchData);
}
// 点击modal层
function modal(that) {
  let SearchInit = that.data.SearchInit;
  SearchInit.currentIndex = 99;
  that.setData({
    SearchInit: SearchInit
  })
}
//搜索
function searchSth(that, str, callBack) {
  let user_id = that.data.user_id;
  if (!callBack) {
    app.href('/pages/search/search3/search3?user_id=' + user_id + '&&entrance=' + str)
  } else {
    callBack()
  }

}

// ---------------------联动操作---------------------------------------------
// 联动一级菜单
function linkFirstStair(e, that) {
  let label_industry = that.data.label_industry;
  let linkDataShow = that.data.linkDataShow;
  let firstStair = linkDataShow.firstStair;
  let secondStair = linkDataShow.secondStair;
  let selectData = that.data.linkDataShow.selectData;
  let index = e.currentTarget.dataset.index;
  // console.log("selectData",selectData)
  // console.log("linkDataShow",linkDataShow)
  // console.log("_label_industry", _label_industry)
  // 改变一级菜单样式
  firstStair.forEach(x => {
    x.check = false
  })
  firstStair[index].check = true;
  // 更改二级菜单取值
  that.data.linkDataShow.secondStair = label_industry[index].child
  // 给二级菜单挂上勾号
  that.data.linkDataShow.secondStair.forEach(x => {
    x.check = false;
  })
  that.data.linkDataShow.secondStair.forEach((x, index) => {
    selectData.forEach(y => {
      if (y == x.industry_id) {
        x.check = true;
      }
    })
  })
  that.setData({
    linkDataShow: linkDataShow
  })
}
// 联动二级菜单 
function linkSecondStair(e, that) {
  let id = e.currentTarget.dataset.id;
  let index = e.currentTarget.dataset.index;
  let linkDataShow = that.data.linkDataShow;
  let secondStair = linkDataShow.secondStair;
  let selectData = linkDataShow.selectData;
  // 对selectData进行处理
  if (secondStair[index].check == false) {
    selectData.push(secondStair[index].industry_id)
  } else {
    selectData.forEach((x, idx) => {
      if (x == secondStair[index].industry_id) {
        selectData.splice(idx, 1)
      }
    })
  }
  secondStair[index].check = !secondStair[index].check;
  that.setData({
    linkDataShow: linkDataShow
  })
}
// 联动二级菜单全部
function linkCheckAll(e, that) {
  let linkDataShow = that.data.linkDataShow;
  let secondStair = linkDataShow.secondStair;
  let selectData = linkDataShow.selectData;
  // 检查是否已经全选了
  function isCheckedAll() {
    for (let x of secondStair) {
      if (x.check == false) return false
    }
    return true
  }
  // 进行或者取消全选
  if (isCheckedAll()) {
    secondStair.forEach(x => {
      x.check = false
    })
    // 遍历数组删除有坑
    let idArray = []
    secondStair.forEach(x => {
      idArray.push(x.industry_id)
    })
    let difference = selectData.concat(idArray).filter(x => !idArray.includes(x))
    linkDataShow.selectData = difference;
  } else {
    secondStair.forEach(x => {
      x.check = true;
      if (selectData.includes(x.industry_id) == false) {
        selectData.push(x.industry_id)
      }
    })
  }
  that.setData({
    linkDataShow: linkDataShow
  })
}
// 联动重置
function linkReset(that) {
  let linkDataShow = that.data.linkDataShow;
  let secondStair = linkDataShow.secondStair;
  let selectData = linkDataShow.secondStair;
  let SearchInit = that.data.SearchInit;
  let searchData = SearchInit.searchData;
  // 清空secondStair,selectData,searchData
  linkDataShow = Object.assign({}, _linkDataShow);
  linkDataShow.secondStair.forEach(x => {
    x.check = false;
  })
  searchData.label_industry = []
  that.setData({
    SearchInit: SearchInit,
    linkDataShow: linkDataShow
  })
}
// 联动确定
function linkSearchCertain(that) {
  let linkDataShow = that.data.linkDataShow;
  let SearchInit = that.data.SearchInit;
  let industry = [];
  linkDataShow.selectData.forEach(x => {
    industry.push(x)
  })
  SearchInit.searchData.label_industry = industry;
  that.setData({
    SearchInit: SearchInit
  })
}

// ---------------------单页面式筛选---------------------------------------------
// 根据缓存重新标定check属性值
function page_tagFilterInit(that) {
  let filterList = that.data.filterList;
  let projectShopFilterCache = wx.getStorageSync('projectShopFilterCache');
  if (projectShopFilterCache) {
    filterList.forEach(x => {
      x.arry = x.arry.map(y => {
        if (projectShopFilterCache[x.name].includes(y[x.tagId])) {
          y.check = true;
        }
        return y;
      })
    })
    that.setData({
      filterList
    })
  }
}
// 点击标签
function page_tagsCheck(e, that) {
  let sort = e.currentTarget.dataset.sort;
  let sortId = e.currentTarget.dataset.sortId;
  let index = e.currentTarget.dataset.index;
  let id = e.currentTarget.dataset.id;
  let filterList = that.data.filterList;
  // 最多选取数量限制
  function _checkLimit(callBack, number = 5) {
    let limitNum = 0;
    filterList[sortId].arry.forEach(x => {
      if (x.check == true) { limitNum++ }
    })
    if (limitNum >= number && filterList[sortId].arry[index].check == false) {
      app.errorHide(that, '最多选择5个', 3000)
      return
    } else {
      callBack();
    }
  }
  _checkLimit(x => {
    filterList[sortId].arry[index].check = !filterList[sortId].arry[index].check;
    that.setData({
      filterList
    })
  })
}
// 重置
function page_reset(that) {
  let filterList = that.data.filterList;
  filterList.forEach((x, index) => {
    x.arry.forEach((y, idx) => {
      y.check = false
    })
  })
  that.setData({
    filterList
  })
}
// 确定
function page_certain(that) {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let prePage = pages[pages.length - 2];
  let searchData = prePage.data.searchData;
  let filterList = that.data.filterList;
  filterList.forEach((x, index) => {
    let arry = [];
    x.arry.forEach((y, idx) => {
      if (y.check == true) {
        arry.push(y[x.tagId])
      }
    })
    searchData[x.name] = arry;
  })
  app.log(that,"tagFilterSearchData", searchData)
  prePage.setData({
    searchData: searchData,
    firstTime: false
  })
  // 存入缓存
  wx.setStorageSync('projectShopFilterCache', searchData)
  wx.navigateBack({
    delta: 1,
  })
}

export {
  data,
  _label_industry,
  _linkDataShow,
  reInitSearch,
  move,
  getOffset,
  initData,
  initItem,
  tagsCheck,
  reset,
  allReset,
  itemReset,
  searchCertain,
  modal,
  searchSth,
  labelDelete,
  firstLinkCheck,
  linkCheckAll,
  detialItemSearch,
  linkFirstStair,
  linkSecondStair,
  page_tagFilterInit,
  page_tagsCheck,
  page_reset,
  page_certain,
} 