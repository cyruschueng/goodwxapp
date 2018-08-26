
import moment from './npm/moment';
import { flattenDeep, groupBy } from './npm/lodash-wx';
import * as appConfig from '../app-config';

// 酒店基本信息
export function formatHotelInfo(info) {
  return {
    hotelName: info.name,
    hotelScore: info.reputationLevel ? info.reputationLevel : 0,
    // hotelComments: 10,
    hotelLocation: info.address,
    hotelDescription: info.descreption,
    hotelPhonecall: info.tel,
    hotelBgimg: info.img.split(','),
    hotelGoodReputation: info.goodReputation + '%'
  }
}

// 宴会厅
export function formatBallrooms(list) {
  return list.map(item => this.formatBallroomsItem(item))
}
export function formatBallroomsItem(item) {
  return {
    ballroomId: item.banquetHallId,
    imgUrl: item.image,
    name: item.name,
    level: item.floorNum,
    tabNums: item.minTable + '~' + item.maxTable,
    highLevel: item.floorHeight
  }
}
// 单个宴会厅 详情 浏览图片
export function fomatBallroomInfo (item) {
  return {
    banquetHallId: item.banquetHallId,
    name: item.name,
    level: item.floorNum + 'F',
    tabNums: item.minTable + '~' + item.maxTable + '桌',
    minTable: item.minTable ? item.minTable : 0,
    maxTable: item.maxTable ? item.maxTable : 0,
    tabNumsText: item.minTable ? item.minTable : 0,
    highLevel: item.floorHeight + 'm',
    area: item.area + '㎡',
    imgUrl: item.img,
    imgUrls: item.img.split(',')
  }
}
// 宴会厅 等 评论列表
// export function formatHotelCommentList(list) {
//   return list.map(item => this.formatHotelCommentListItem(item))
// }
// export function formatHotelCommentListItem(item) {
//   return {
//     avatar: item.headimg ? item.headimg : '../../images/menu_personal_inactive.png',
//     name: item.nickName ? item.nickName : '某某',
//     desc: item.commentContent ? item.commentContent : '好！',
//     score: item.compLevel ? this.getScoreStart(item.compLevel) : this.getScoreStart(5)
//   }
// }

// 首页婚礼人才
export function formatHomeTalent (list) {
  return list.map(item => this.formatHomeTalentItem(item))
}
export function formatHomeTalentItem (item) {
  return item.talentList.length >= 2 ? this.formatHomeTalentList(this.getTheTopN(item.talentList, 2)) : this.formatHomeTalentList(item.talentList)
}
export function formatHomeTalentList (list) {
  return list.map(item => this.formatHomeTalentListItem(item))
}
export function formatHomeTalentListItem (item) {
  return {
    talentid: item.weddingTalentId,
    name: item.name,
    occupation: item.occupation,
    headImg: item.headImg,
    goodReputation: item.goodReputation + '%',
    experience: item.chosenCount
  }
}

// 婚礼人才
export function formatWeddingTalentLeftTab (result) {
  var arr = [];
  result.forEach((res) => {
    arr.push(res.occupation);
  })
  return arr;
}
export function formatWeddingTalent (list, talentname) {
  return list.map(item => this.formatWeddingTalentItem(item, talentname))
}
export function formatWeddingTalentItem (item, talentname) {
  return {
    title: '婚礼人才',
    talentname: talentname,
    talentid: item.weddingTalentId,
    imgUrl: item.headImg,
    name: item.name,
    praise: item.goodReputation + '%好评',
    transaction: item.chosenCount ? '交易:' + item.chosenCount + '次' : '交易:0次',
    price: item.isShowPrice == '定价' ? item.price : '价格面议',
    selected: false,
    freeStatus: item.freeStatus
  }
}

// 人才详情
export function formatTalentDetails(result) {
  return {
    avatar: result.talent.headImg,
    name: result.talent.name,
    occupation: result.talent.occupation,
    experience: result.talent.experience ? '从业' + result.talent.experience + '年' : '从业0年',
    transaction: result.talent.chosenCount ? '交易记录：' + result.talent.chosenCount : '交易记录：0',
    scoreNum: result.talent.comprehensive ? result.talent.comprehensive : '0',
    score: this.getScoreStart(result.talent.comprehensive),
    phonecall: result.talent.tel ? result.talent.tel : null,
    mypics: result.pictureList.length > 0 ? this.getTheTopN(result.pictureList, 3) : [],
    myvideos: result.mediaList.length > 0 ? this.getTheTopN(result.mediaList, 3) : [],
    introduce: result.talent.introduction,
    freeStatus: result.talent.freeStatus,
    perDesc: result.talent.personalDeclaration ? result.talent.personalDeclaration : '婚礼人的一天',
    perTimer: moment().format('YYYY-MM'),
    reservedList: this.formatReservedList(result.tReservedList)
  }
}
// 人才详情 已被占用时间
export function formatReservedList(list) {
  return list.map(item => this.formatReservedItem(item));
}
export function formatReservedItem(item) {
  return item.startTimeString + '-' + item.endTimeString
}

// 人才 详情评论
// export function formatTalentDetailComment (list) {
//   return list.map(comt => this.formatTalentDetailCommentItem(comt));
// }
// export function formatTalentDetailCommentItem (item) {
//   return {
//     avatar: item.img,
//     name: item.nickName,
//     desc: item.commentContent,
//     score: this.getScoreStart(item.compLevel)
//   }
// }
// 人才 更多图片
export function formatTalentMorePic (list) {
  return list.map(item => this.formatTalentMorePicItem(item));
}
export function formatTalentMorePicItem(item) {
  return {
    time: item.dateString,
    urls: item.pictureList
  }
}
export function formatTalentMorePicBrowse (list) {
  var newList = [];
  list.forEach((datepic,i) => {
      datepic.pictureList.forEach((pic,j) => {
        var dic = {
          id: i * 2 + j + 1,
          url: pic.src,
          time: datepic.dateString
        };
        newList.push(dic);
      })
  })
  return newList;
}
// 人才 更多视频
export function formatTalentMoreVideo(list) {
  return list.map(item => this.formatTalentMoreVideoItem(item));
}
export function formatTalentMoreVideoItem(item) {
  return {
    time: item.dateString,
    urls: item.mediaList
  }
}
export function formatTalentMoreVideoBrowse(list) {
  var newList = [];
  list.forEach((datevideo, i) => {
    datevideo.mediaList.forEach((pic, j) => {
      var dic = {
        id: (i + 1) * (j + 1),
        url: pic.vediosrc,
        time: datevideo.dateString
      };
      newList.push(dic);
    })
  })
  return newList;
}
// 人才对比 选择列表
export function formatTalentSelectComp (list) {
  return list.map(item => this.formatTalentSelectCompItem(item));
}
export function formatTalentSelectCompItem (item) {
  return {
    talentId: item.weddingTalentId,
    name: item.name,
    avatar: item.headImg,
    goodCom: item.goodReputation ? item.goodReputation : 0,
    deal: item.chosenCount ? item.chosenCount : 0,
    price: item.isShowPrice == '定价' ? item.price : '价格面议',
    checked: false
  }
}
// 人才对比 
export function formatTalentComparison (item) {
  return {
    // 基础信息
    title: {
      avatar: item.talent.headImg,
      username: item.talent.name,
      identity: item.talent.occupation,
      experience: item.talent.experience,
      transaction: item.talent.chosenCount,
      score: item.talent.comprehensive
    },
    // 个人介绍
    introduce: {
      text: item.talent.introduction,
      introduceHidden: true
    },
    // 策划风格
    style: {
      styles: item.talent.style ? this.getTalentStyle(item.talent.style) : ''
    },
    // 作品展示
    show: {
      showImgHidden: true,
      showImgs: item.pictureList.length > 0 ? this.getTheTopN(this.getTalentShowing(item.pictureList, item.mediaList), 2)  : [],
      allShowImgs: this.getTalentShowing(item.pictureList, item.mediaList).length > 2 ? this.getTalentShowing(item.pictureList, item.mediaList) : []
    },
    // 评论
    comment: {
      showAllComsHidden: false,
      coms: item.talentCommentList.length > 0 ? this.getTheTopN(this.formatCommentList(item.talentCommentList), 3) : [],
      allComs: item.talentCommentList.length > 0 ? this.formatCommentList(item.talentCommentList) : []
    }
  }
}
// 人才对比 策划风格
export function getTalentStyle (style) {
  return style.split(',');
}
// 人才对比 作品展示
export function getTalentShowing (imgs,videos) {
  var newArr = [];
  imgs.forEach(img => {
    var dic = {
      id: img.id,
      imgsrc: img.src,
      time: moment(img.uptime).format('YYYY-MM-DD')
    }
    newArr.push(dic);
  })
  videos.forEach(video => {
    var dic = {
      id: video.id,
      imgsrc: video.imgsrc,
      vediosrc: video.vediosrc,
      time: moment(video.uptime).format('YYYY-MM-DD')
    }
    newArr.push(dic);
  })
  return newArr;
}
// 人才对比 评论
// export function getTalentComment (list) {
//   return list.map(item => this.getTalentCommentItem(item))
// }
// export function getTalentCommentItem (item) {
//   return {
//     username: item.nickName,
//     avarUrl: item.headimg,
//     text: item.commentContent ? item.commentContent : '好！',
//     score: this.getScoreStart(item.compLevel)
//   }
// }

// 菜品
export function formatWeddingmenu(list) {
  return list.map(item => this.formatWeddingmenuItem(item))
}
export function formatWeddingmenuItem(item) {
  return {
    title: '菜品',
    disId: item.id,
    name: item.name,
    price: item.price,
    imgUrl: item.img,
    selected: false
  }
}
export function formatDishesDetails (item) {
  return {
    name: item.combo.name,
    price: item.combo.price,
    dishesList: item.dishStyleGroupList
  }
}
export function formatDishesDetailsSwiper(dishesList){
  var newList = [];
  dishesList.map(dishes => {
    dishes.list.map(item => {
      newList.push(item);
    })
  })
  return newList
}

//宴会庆典
export function formatBanquet(list) {
  return list.map(item => this.formatBanquetItem(item))
}
export function formatBanquetItem(item) {
  return {
    name: item.name,
    price: item.isShowPrice == '定价' ? item.preprice : '价格面议',
    celebrationid: item.id,
    imgUrl: item.image,
    style: item.style
  }
}
// 宴会庆典详情
export function formatCelebrationDetailsCheckbox (item) {
  return [
    {
      name: item.basename,
      checked: true,
      stage: true,
      notStage: false,
      stagePrice: item.isShowPrice == '定价' ? item.stagePrice : '价格面议',
      value: item.isShowPrice == '定价' ? item.preprice : '价格面议',
      stagevalue: 0
    },
    {
      name: item.comboname,
      checked: false,
      stage: false,
      notStage: false,
      stagePrice: item.isShowPrice == '定价' ? item.stagePrice : '价格面议',
      value: item.isShowPrice == '定价' ? item.price : '价格面议',
      stagevalue: 0
    }
  ]
}
export function formatCelebrationDetails(item) {
  return {
    name: item.name,
    showImgs: item.images,
    styles: item.style,
    theme: item.theme,
    basicPrice: item.isShowPrice == '定价' ? item.preprice : '价格面议',
    comboname: item.comboname,
    luxuryPrice: item.isShowPrice == '定价' ? item.price : '价格面议',
    celeDesc: [
      {
        name: '迎宾区',
        array: item.welcome.split(',')
      },
      {
        name: '仪式区',
        array: item.ceremony.split(',')
      },
      {
        name: '婚宴区',
        array: item.weddingplace.split(',')
      },
      {
        name: '舞台灯光',
        array: item.desklight.split(',')
      }
    ]
  }
}
// 庆典详情 更多图片
export function formatCeleDetailMorePic(list) {
  return list.map(item => this.formatCeleDetailMorePicItem(item));
}
export function formatCeleDetailMorePicItem(item) {
  return {
    time: item.dateString,
    urls: item.celePictureList
  }
}
export function formatCeleDetailMorePicBrowse(list) {
  var newList = [];
  list.forEach((datepic, i) => {
    datepic.celePictureList.forEach((pic, j) => {
      var dic = {
        id: i * 2 + j + 1,
        url: pic.src,
        time: datepic.dateString
      };
      newList.push(dic);
    })
  })
  return newList;
}
// 庆典 更多视频
export function formatCeleDetatilMoreVideo (list) {
  return list.map(item => this.formatCeleDetatilMoreVideoItem(item));
}
export function formatCeleDetatilMoreVideoItem (item) {
  return {
    time: item.dateString,
    urls: item.celeMediaList
  }
}
export function formatCeleMoreVideoBrowse(list) {
  var newList = [];
  list.forEach((datevideo, i) => {
    datevideo.celeMediaList.forEach((pic, j) => {
      var dic = {
        id: (i + 1) * (j + 1),
        url: pic.vediosrc,
        time: datevideo.dateString
      };
      newList.push(dic);
    })
  })
  return newList;
}


// 转化时间戳
export function formatTimestampToStr(timestamp) {
  return moment(timestamp * 1000).format('YYYY-MM-DD');
}

// 购物车
export function formatShoppingcar(list, localTableNum) {
  return list.map((item, i) => this.formatShoppingcarItem(item, i, localTableNum))
}
export function formatShoppingcarItem(item, i, localTableNum) {
  return {
    shopppingid: i,
    payid: item.content.typeid,
    imgUrl: this.getLocalShoppingImgurl(item.title, item),
    title: item.content.info.talentname ? item.content.info.talentname : item.title,
    name: item.content.info.name ? item.content.info.name : '',
    floor: item.content.info.floorNum ? item.content.info.floorNum + 'F' : '',
    floorHeight: item.content.info.floorHeight ? '层高:' + item.content.info.floorHeight +'m' : '',
    tableNum: item.content.info.minTable ? item.content.info.minTable + '~' + item.content.info.maxTable + '桌' : '',
    price: this.getAllItemPrice(item.content),
    nums: item.content.tableNum ? localTableNum : 1,
    finalTableNum: item.content.tableNum ? localTableNum : null,
    minTable: item.content.info.minTable ? item.content.info.minTable : null,
    maxTable: item.content.info.minTable ? item.content.info.maxTable : null,
    packageStage: item.content.packageStage ? item.content.packageStage : null,
    symbolEdit: 'false',
    checked: true,
  }
    
}
export function formatShoppingcarInStore(list) {
  return list.map(item => this.formatShoppingcarInStoreItem(item))
}
export function formatShoppingcarInStoreItem (item) {
  return {
    title: item.title,
    content: item.content,
    selected: true
  }
}

// 计算 价钱
export function getAllItemPrice(content) {
  var price = content.info.price ? content.info.price : 0;
  if (content.packageStage) {
    price = content.packageStage.packPrice;
    if (price != '价格面议') {
      if (content.packageStage.stage) {
        price = content.packageStage.packPrice + content.packageStage.stageprice
      }
    } else {
      price = 0;
    }
  }
  if (content.info.price == '价格面议') {
    price = 0;
  }
  return price;
}

// 保存本地购物车 格式
export function formatLocalShoppingcar(item, name, tableNum, packageStage, startTime, endTime) {
  return {
    title: name,
    content: {
      typeid: this.getLocalShoppingId(name, item),
      info: item,
      tableNum: tableNum ? tableNum : null,
      packageStage: packageStage ? packageStage : null,
      startTime: startTime ? startTime : null,
      endTime: endTime ? endTime : null
    },
    selected: true
  }
}
export function getLocalShoppingId(name, item) {
  if (name == '宴会厅') {
    return item.banquetHallId;
  } else if (name == '婚礼人才') { 
    return item.talentid;
  } else if (name == '菜品') {
    return item.id;
  } else if (name == '宴会庆典') {
    return item.id;
  }
}
export function getLocalShoppingImgurl(name, item) {
  if (name == '宴会厅') {
    return item.content.info.image;
  } else if (name == '婚礼人才') {
    return item.content.info.imgUrl;
  } else if (name == '菜品') {
    return item.content.info.img;
  } else if (name == '宴会庆典') {
    return item.content.info.image;
  }
}
// 预付定金
export function formatuploadPrepay(list, reservedDate, customerName, tel, gender, totalPrice, prepayPrice, hallTable, desc, comboStyle, isStage, celePrice, openid) {
  
  var dic = {
    hotelId: +appConfig.hotelId,
    customerName: customerName ? customerName : '',
    tel: tel ? tel : '',
    gender: gender ? gender : '',
    openId: openid ? openid : '',
    reservedDates: reservedDate ? reservedDate : '',
    desc: desc ? desc : '',
    count: totalPrice ? totalPrice : 0,
    prePay: prepayPrice ? prepayPrice : 0
  }
  var talentids = [];

  // console.log(JSON.stringify(dic));

  list.forEach(item => {
    if (item.title == '宴会厅') {
      dic.hall = item.content.typeid;
    } else if (item.title == '婚礼人才') {
      talentids.push(item.content.typeid  + ';' + item.content.startTime + ';' + item.content.endTime);
      dic.talent = talentids.join(",");
    } else if (item.title == '菜品') {
      dic.combo = item.content.typeid;
      dic.hallTable = hallTable;
    } else if (item.title == '宴会庆典') {
      dic.celebration = item.content.typeid;

      if (celePrice == '价格面议') {
        celePrice = 0
      }

      dic.celePrice = celePrice.toString();
      dic.comboStyle = comboStyle;
      dic.isStage = isStage;
    }
  })

  return dic
}

// 我的订单 -- 待付款 -- 预约码 款
export function formatMyorderAppointmentList (list) {
  return list.map(item => this.formatMyorderAppointmentItem(item))
}
export function formatMyorderAppointmentItem (item) {
  return {
    orderId: item.id,
    open: false,
    time: moment(item.reservedDate).format('YYYY-MM-DD'),
    reservationCode: item.vaidateCode,
    reservationCodeImg: item.twoBarCode,
    prePrice: item.prePayPrice ? '¥ ' + item.prePayPrice : 0,
    countPrice: item.count,
    addInfo: '待付款',
    payList: this.formatAppList(item.hall, item.combo, item.celebration, item.talent)
  }
}
export function formatAppList (hall, combo, celebration, talent) {

  var newList = [];

  if (hall) {
    hall.forEach(item => {
      newList.push(this.formatAppListItem(item, '宴会厅', item.banquetHallId));
    })
  }
  if (combo) {
    combo.forEach(item => {
      newList.push(this.formatAppListItem(item, '菜品', item.id));
    })
  }
  if (celebration) {
    celebration.forEach(item => {
      newList.push(this.formatAppListItem(item, '宴会庆典'));
    })
  }
  if (talent) {
    talent.forEach(item => {
      newList.push(this.formatAppListItem(item, '婚礼人才', item.weddingTalentId));
    })
  }

  return newList
}
export function formatAppListItem(item, title, id) {
  return {
    id: item.id ? item.id : id,
    // imgUrl: item.image ? item.image : (item.headImg ? item.headImg : item.img),
    imgUrl: item.imageAll.length > 0 ? item.imageAll[0] : '',
    title: item.occupation ? item.occupation : title,
    name: item.name,
    floor: item.floorNum ? item.floorNum : '',
    floorHeight: item.floorHeight ? '层高：' + item.floorHeight : '',
    price: item.price ? '¥ ' + item.price : '¥ 0',
    nums: item.countTable ? item.countTable : 1,
    actualPrice: item.actualPrice == 0 ? '¥ ' + item.actualPrice : null,
    packageStage: item.comboName ? item.comboName : null,
    stage: item.stage == '是' ? true : false,
    celeName: item.comboName ? item.name : ''
  }
}

// 我的订单 待付款 提交
export function formatUploadMyOrderPrepay(list, reservedDate, customerName, tel, totalPrice, prepayPrice, hallTable, desc, comboStyle, isStage, celePrice, openid) {

  var dic = {
    hotelId: +appConfig.hotelId,
    customerName: customerName ? customerName : '',
    tel: tel ? tel : '',
    openId: openid ? openid : '',
    reservedDates: reservedDate ? reservedDate : '',
    desc: desc ? desc : '',
    count: totalPrice ? totalPrice : '',
    prePay: prepayPrice ? prepayPrice : '',
  }
  var talentids = [];

  // console.log(JSON.stringify(dic));

  list.forEach(item => {
    if (item.title == '宴会厅') {
      dic.hall = item.content.typeid;
    } else if (item.title == '婚礼人才') {
      talentids.push(item.content.typeid);
      dic.talent = talentids.join(",");
      console.log('talentid ... ' + dic.talent);
    } else if (item.title == '菜品') {
      dic.combo = item.content.typeid;
      dic.hallTable = hallTable;
    } else if (item.title == '宴会庆典') {
      dic.celebration = item.content.typeid;
      dic.celePrice = celePrice.toString();
      dic.comboStyle = comboStyle;
      dic.isStage = isStage;
    }
  })

  return dic
}

// 我的订单 -- 付尾款
export function formatMyorderPayRetainagePrice (list) {
  return list.map(item => this.formatMyorderPayRetainagePriceItem(item));
}
export function formatMyorderPayRetainagePriceItem (item) {
  return {
    orderId: item.id,
    time: moment(item.reservedDate).format('YYYY-MM-DD'),
    totalPrice: item.count ? item.count : 0,
    prePrice: item.prePayPrice ? item.prePayPrice : 0,
    finalyPrice: item.obligation ? item.obligation : 0,
    checked: true,
    open: false,
    addInfo: '付尾款',
    payList: this.formatAppList(item.hall, item.combo, item.celebration, item.talent)
  }
}

// 我的订单 -- 待评价
export function formatMyorderComments (list) {
  return list.map(item => this.formatMyorderCommentsItem(item));
}
export function formatMyorderCommentsItem (item) {
  return {
    orderId: item.id,
    open: false,
    time: moment(item.reservedDate).format('YYYY-MM-DD'),
    totalPrice: item.count ? item.count : 0,
    addInfo: '待评价',
    titleImg: item.hall[0].img,
    titleName: item.hall[0].name,
    payList: this.formatAppList(item.hall, item.combo, item.celebration, item.talent)
  }
}

// 我的 历史订单
export function formatHistoryorder(list) {
  return list.map(item => this.formatHistoryorderItem(item))
}
export function formatHistoryorderItem(item) {
  return {
    orderId: item.id,
    open: false,
    time: moment(item.reservedDate).format('YYYY-MM-DD'),
    prePrice: item.prePayPrice ? item.prePayPrice : 0,
    totalPrice: item.count,
    addInfo: '历史订单',
    titleImg: item.hall[0].img,
    titleName: item.hall[0].name,
    payList: this.formatAppList(item.hall, item.combo, item.celebration, item.talent)
  }
}

// 我的消息
export function formatMessageList (list) {
  return list.map(item => this.formatMessageListItem(item));
}
export function formatMessageListItem (item) {
  return {
    id: item.messageId,
    title: item.title,
    text: item.commentContent,
    time: moment(item.updateDate).format('YYYY-MM-DD')
  }
}

// 评价
export function formatCommentEditList(hall, combo, celebration, talent) {

  var newList = [];

  if (hall) {
    hall.forEach(item => {
      newList.push(this.formatCommentEditItem(item, '宴会厅', item.banquetHallId));
    })
  }
  if (combo) {
    combo.forEach(item => {
      newList.push(this.formatCommentEditItem(item, '菜品', item.id));
    })
  }
  if (celebration) {
    celebration.forEach(item => {
      newList.push(this.formatCommentEditItem(item, '宴会庆典', item.id));
    })
  }
  if (talent) {
    var dic = {
      title: '婚礼人才',
      talentlist: this.formatCommentTalentlist(talent),
      score: 0,
      commentText: '',
      uploadImgUrls: [],
      uploadImgNums: 0,
      uploadImgBtnHidden: false,
      uploadImgViewHeight: 0
    }
    newList.push(dic)
  }

  return newList
}
export function formatCommentEditItem (item, title, id) {
  return {
    id: id,
    title: item.occupation ? item.occupation : title,
    talentlist: item.occupation ? this.formatCommentTalentlist(item) : null,
    name: item.name,
    icons: ['', '', '', '', ''],
    score: 0,
    commentText: '',
    uploadImgUrls: [],
    uploadImgNums: 0,
    uploadImgBtnHidden: false,
    uploadImgViewHeight: 0
  }
}
export function formatCommentTalentlist (list) {
  return list.map((item,j) => this.formatCommentTalentItem(item,j))
}
export function formatCommentTalentItem (item,j) {
  return {
    id: item.weddingTalentId,
    talentid: j,
    title: item.occupation,
    name: item.name,
    icons: ['', '', '', '', ''],
    score: 0,
  }
}

// 提交评价
export function formatUploadComment(list, orderId, openId, nickName, synthelist, avatarUrl) {

  var comdic = {};
  comdic.orderId = orderId;
  comdic.openId = openId;
  comdic.nickName = nickName;
  comdic.headImg = avatarUrl;
  comdic.syntheCommentLevel = this.formatUploadCommentLevelString(synthelist);
  
  list.forEach(item => {
    var stringdic = {}
    stringdic.commentContent = item.commentText;
    stringdic.compLevel = item.score;
    // item.uploadImgUrls.forEach(img => {
    //   stringdic.img = stringdic.img + ',' + img
    // })

    if (item.title == '宴会厅') {
      stringdic.hallId = item.id;
      comdic.hallComment = JSON.stringify(stringdic);
    }
    if (item.title == '菜品') {
      stringdic.comboId = item.id;
      comdic.comboComment = JSON.stringify(stringdic);
    }
    if (item.title == '宴会庆典') {
      stringdic.celebrationId = item.id;
      comdic.celebrationComment = JSON.stringify(stringdic);
    }
    if (item.title == '婚礼人才') {
      stringdic.compLevel = '';
      stringdic.talentId = '';
      item.talentlist.forEach((talent,i) => {
        if (i == item.talentlist.length-1) {
          stringdic.talentId = stringdic.talentId + talent.id;
          stringdic.compLevel = stringdic.compLevel + talent.score;
        } else {
          stringdic.talentId = talent.id + ',' + stringdic.talentId;
          stringdic.compLevel = talent.score + ',' + stringdic.compLevel;
        }
      })
      comdic.talentComment = JSON.stringify(stringdic);
    } 

  })
  // console.log(JSON.stringify(comdic));
  return comdic;
}
// 计算 综合评分
export function formatUploadCommentLevelString (list) {
  var newScore = 0;
  list.forEach(item => {
    newScore = newScore + item.score;
  })
  return +(newScore / list.length).toFixed(1);
}

// 统一评论格式
export function formatCommentList(list) {
  return list.map(item => this.formatCommentListItem(item))
}
export function formatCommentListItem(item) {
  return {
    avatar: item.headimg ? item.headimg : '../../images/menu_personal_inactive.png',
    name: item.nickName ? item.nickName : '某某',
    desc: item.commentContent ? item.commentContent : '好！',
    score: item.compLevel ? this.getScoreStart(item.compLevel) : this.getScoreStart(5)
  }
}


/*  -------------------- 小方法 ------------------------ */

// 取前N条 
export function getTheTopN(list, n) {
  var newList = [];
  for (var i = 0; i < n; i++) {
    newList.push(list[i]);
  }
  if (list.length >= n) {
    return newList;
  } else {
    return list;
  }
}

// 评分转换星星
export function getScoreStart(score) {
  var starts = ['', '', '', '', ''];
  for (var i = 0; i < score; i++) {
    starts[i] = 'red';
  }
  return starts;
}
