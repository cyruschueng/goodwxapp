const { mysql } = require('../qcloud')
const pinyin = require("pinyin")
const uuid = require('node-uuid')
const sendTemplateMessage = require('./sendTemplateMessage')
const moment = require('moment')

/**
  * 保存成语
  * creator:{id:"",name:"",img:""},
  * sequence:{id:"",imgList:"",type:""},
  * idiomValue:"",
  * lastIdiomValue:"",
  * formId:""
  */
module.exports = async ctx => {
  var params = ctx.request.body
  var creator = params.creator
  var sequence = params.sequence
  var idiomValue = params.idiomValue
  var date = new Date()
  var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  var todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  // 判断是否已有这个成语
  var hasIdiom = await mysql("Idiom").count("* as count").where({ value: idiomValue, sequenceId: sequence.id }).first()
  if (hasIdiom.count > 0) {
    ctx.state.data = "接龙里面已经有这条成语了"
    return
  }
  //获取最后一条成语
  var lastIdiom = await mysql("Idiom").where({ sequenceId: sequence.id }).orderBy("createdAt", "desc").first()
  if (!lastIdiom.value) {
    ctx.state.code = -1
    return
  }
  lastIdiom.creator = JSON.parse(lastIdiom.creator)
  lastIdiom.pinyin = JSON.parse(lastIdiom.pinyin)
  if (lastIdiom.value != params.lastIdiomValue) {
    ctx.state.data = "列表有更新"
    return
  } else if (lastIdiom.creator.id == creator.id) {
    ctx.state.data = "不能接自己的成语"
    return
  }
  // 转换拼音
  var idiomPinyin = await pinyin(idiomValue, {
    style: pinyin.STYLE_NORMAL,    // 普通风格，即不带声调
    heteronym: true,               // 启用多音字模式
    // segment: true                  // 启用分词，以解决多音字问题  使用后占用内存会增加
  })
  var canConnect = false
  if (idiomPinyin[0] != null && lastIdiom.pinyin[3] != null) {
    idiomPinyin[0].forEach(function (value1) {
      lastIdiom.pinyin[3].forEach(function (value2) {
        if (value1 == value2) {
          canConnect = true
        }
      })
    })
  }
  if (!canConnect) {
    ctx.state.data = "这条成语接不上哦"
    return
  }
  // 查询接龙今日数量
  var sequenceTodayIdiom = await mysql("Idiom").count("* as count").where({ sequenceId: sequence.id }).andWhere("createdAt", ">", todayDate).first()
  // 更新接龙数据
  var updateSequence = {
    lastIdiom: idiomValue,
    lastIdiomCreator: JSON.stringify(lastIdiom.creator),
    idiomCount: lastIdiom.idiomNum + 1,
    today: today,
    todayCount: sequenceTodayIdiom.count + 1,
    updatedAt: date
  }
  if (sequence.type != null && sequence.type == "all") {
    //保存最近的五个接龙用户头像
    if (sequence.imgList == null) {
      sequence.imgList = []
    }
    if (sequence.imgList.includes(creator.img)) {
      var index = sequence.imgList.indexOf(creator.img)
      sequence.imgList.splice(index, 1)
    }
    sequence.imgList.push(creator.img)
    if (sequence.imgList.length > 5) {
      sequence.imgList.splice(0, 1)
    }
    updateSequence.imgList = JSON.stringify(sequence.imgList)
  }
  await mysql("Sequence").update(updateSequence).where({ id: sequence.id })
  // 保存成语
  var idiom = {
    id: uuid.v1(),
    value: idiomValue,
    creatorId: creator.id,
    creator: JSON.stringify(creator),
    pinyin: JSON.stringify(idiomPinyin),
    idiomNum: lastIdiom.idiomNum + 1,
    sequenceId: sequence.id
  }
  await mysql("Idiom").insert(idiom)
  // 查询用户今日数量
  var userTodayIdiom = await mysql("Idiom").count("* as count").where({ creatorId: creator.id }).andWhere("createdAt", ">", todayDate).first()
  // 更新用户成语数量
  var userIdiom = await mysql("Idiom").count("* as count").where({ creatorId: creator.id }).first()
  var user = {
    idiomCount: userIdiom.count,
    today: today,
    todayCount: userTodayIdiom.count,
    formId: params.formId,
    last_visit_time: date
  }
  await mysql("cSessionInfo").update(user).where({ open_id: creator.id })
  if (params.formId) {
    // 给上一条成语用户发送模板消息
    var data = {
      "keyword1": {
        "value": idiomValue,
        "color": "#569de8"
      },
      "keyword2": {
        "value": sequence.title
      },
      "keyword3": {
        "value": creator.name
      }
    }
    sendTemplateMessage(lastIdiom.creator.id, sequence.id, data)
  }
  // 返回成语
  idiom.creator = creator
  idiom.pinyin = idiomPinyin
  moment.locale('zh-cn')
  idiom.date = moment().fromNow()
  ctx.state.data = idiom
}