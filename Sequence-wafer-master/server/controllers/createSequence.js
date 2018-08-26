const { mysql } = require('../qcloud')
const pinyin = require("pinyin")
const uuid = require('node-uuid')

/**
  * 创建接龙
  * title:"",
  * firstIdiom:"",
  * type:"",
  * creator:{}
  */
module.exports = async ctx => {
  var params = ctx.request.body
  var creator = params.creator
  // 转换拼音
  var idiomPinyin = await pinyin(params.firstIdiom, {
    style: pinyin.STYLE_NORMAL,    // 普通风格，即不带声调
    heteronym: true,               // 启用多音字模式
    // segment: true                  // 启用分词，以解决多音字问题  使用后占用内存会增加
  })
  // 创建接龙
  var sequenceId = uuid.v1()
  var date = new Date()
  var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  var todayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  var sequence = {
    id: sequenceId,
    title: params.title,
    type: params.type,
    creatorId: creator.id,
    creator: JSON.stringify(creator),
    lastIdiom: params.firstIdiom,
    lastIdiomCreatorId: creator.id,
    lastIdiomCreator: JSON.stringify(creator),
    idiomCount: 1,
    joinCount: 1,
    groupId: "",
    today: today,
    todayCount: 1,
    imgList: JSON.stringify([creator.img])
  }
  await mysql("Sequence").insert(sequence)
  // 创建成语
  var idiom = {
    id: uuid.v1(),
    value: params.firstIdiom,
    creatorId: creator.id,
    creator: JSON.stringify(creator),
    pinyin: JSON.stringify(idiomPinyin),
    idiomNum: 1,
    sequenceId: sequenceId
  }
  await mysql("Idiom").insert(idiom)
  // 获取用户信息
  var user = await mysql("cSessionInfo").select("idiomCount", "today", "todayCount").where({ open_id: creator.id }).first()
  // 查询用户总成语数量
  var userAllIdiom = await mysql("Idiom").count("* as count").where({ creatorId: creator.id }).first()
  // 查询用户今日成语数量
  var userTodayIdiom = await mysql("Idiom").count("* as count").where({ creatorId: creator.id }).andWhere("createdAt", ">", todayDate).first()
  // 更新用户信息
  var updateUser = {
    idiomCount: userAllIdiom.count,
    todayCount: userTodayIdiom.count,
    formId: params.formId,
    last_visit_time: date
  }
  if (user.today != today) {
    updateUser.today = today
  }
  await mysql("cSessionInfo").update(updateUser).where({ open_id: creator.id })
  // 建立用户和接龙关系
  var userSequenceMap = {
    id: uuid.v1(),
    userId: creator.id,
    sequenceId: sequence.id,
    joinStatus: true
  }
  await mysql("UserSequenceMap").insert(userSequenceMap)
  ctx.state.data = sequence
}