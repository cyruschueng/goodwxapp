const
  constants = require('../config/constants'),
  utils = require('../utils/index')

const addUser = () => {
  let
    tableID = constants.TABLE_ID.USER,
    User = new wx.BaaS.TableObject(tableID),
    user = User.create(),
    userInfo = wx.BaaS.storage.get('userinfo')

    userInfo = {
      name: userInfo.nickName,
      avatar_url: userInfo.avatarUrl,
      uid: userInfo.id,
      groups: null,
    }

    return user.set(userInfo).save()
}

const updateUser = (opt) => {
  let
    tableID = constants.TABLE_ID.USER,
    recordID = opt.recordID,
    groupID = opt.groupID,
    groupInfo = JSON.stringify(opt.groupInfo),
    User = new wx.BaaS.TableObject(tableID),
    user = User.getWithoutData(recordID)

    /**
   * 将用户进入的群 id 和群信息分别记录在 groups_id 和 groups_info 字段中
   */
  user.uAppend('groups_id', groupID)
  user.uAppend('groups_info', groupInfo)

  return user.update()
}

const getUser = (opt) => {
  let
    tableID = constants.TABLE_ID.USER,
    uid = opt.uid,
    User = new wx.BaaS.TableObject(tableID),
    query = new wx.BaaS.Query()
  
  query.compare('uid', '=', uid)
  
  return User.setQuery(query).find()
}



module.exports = {
  addUser,
  updateUser,
  getUser,
}