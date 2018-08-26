const
  constants = require('../config/constants'),
  utils = require('../utils/index')

const getPlayerData = (opt) => {
  let
    tableID = constants.TABLE_ID.PLAY,
    Play = new wx.BaaS.TableObject(tableID),
    uid = opt.uid || '',
    gid = opt.gid || '',
    orderBy = opt.orderBy || '',
    limit = opt.limit || 1000,
    zeroTimestamp = utils.getTodayTimestampFromZero(),
    eveTimeStamp = zeroTimestamp + 24 * 60 * 60,
    query1 = new wx.BaaS.Query(),
    query2 = new wx.BaaS.Query(),
    query3 = new wx.BaaS.Query()

  let andQuery

  query1.compare('created_at', '>=', zeroTimestamp)
  query2.compare('created_at', '<=', eveTimeStamp)

  if (uid && !gid) {
    /**
     * 获取用户当天在所有群组中的生崽数数据
     */
    query3.compare('uid', '=', uid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3)
  } else if (gid && uid) {
    /**
     * 获取用户当天在特定群组中的敲木鱼数据
     */
    query3.compare('uid', '=', uid)
    let query4 = new wx.BaaS.Query().compare('gid', '=', gid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3, query4)
  } else if (gid && !uid) {
    /**
     * 获取当日特定群组的所有用户
     */
    query3.compare('gid', '=', gid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3)
  } else {
    /**
     * 获取当日所有的用户
     */
    andQuery = wx.BaaS.Query.and(query1, query2)
  }
  
  return Play.setQuery(andQuery).orderBy(orderBy).limit(limit).find()
}

const addPlayerData = opt => {
  let
    tableID = constants.TABLE_ID.PLAY,
    Play = new wx.BaaS.TableObject(tableID),
    play = Play.create(),
    uid = opt.user.uid,
    user = JSON.stringify(opt.user),
    gid = opt.gid,
    counts = opt.counts,
    data = {
      uid,
      user,
      gid,
      counts,
    }
    return play.set(data).save()
}

const updatePlayerData = (opt) => {
  let
    tableID = constants.TABLE_ID.PLAY,
    recordID = opt.recordID,
    Play = new wx.BaaS.TableObject(tableID),
    play = Play.getWithoutData(recordID),
    counts = opt.counts

  play.incrementBy('counts', counts)

  return play.update()
}



module.exports = {
  getPlayerData,
  addPlayerData,
  updatePlayerData,
}