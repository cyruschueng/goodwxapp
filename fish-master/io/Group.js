const
  constants = require('../config/constants'),
  utils = require('../utils/index')

const getGroups = opt => {
  let
    tableID = constants.TABLE_ID.GROUP,
    Group = new wx.BaaS.TableObject(tableID),
    zeroTimestamp = utils.getTodayTimestampFromZero(),
    eveTimeStamp = zeroTimestamp + 24 * 60 * 60,
    query1 = new wx.BaaS.Query(),
    query2 = new wx.BaaS.Query(),
    query3 = new wx.BaaS.Query(),
    query4 = new wx.BaaS.Query(),
    gid = opt.gid || ''

  query1.compare('created_at', '>=', zeroTimestamp)
  query2.compare('created_at', '<=', eveTimeStamp)
  query3.compare('counts', '>', 0)

  let andQuery

  if (gid) {
    /**
     * 获取特定群组当日的数据
     */
    query4.compare('gid', '=', gid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3, query4)
  } else {
    /**
     * 获取当日所有群组的数据
     */
    andQuery = wx.BaaS.Query.and(query1, query2, query3)
  }

  return Group.setQuery(andQuery).orderBy('-counts').find()
}

const updateGroup = (opt) => {
  let
    tableID = constants.TABLE_ID.GROUP,
    recordID = opt.recordID,
    Group = new wx.BaaS.TableObject(tableID),
    group = Group.getWithoutData(recordID),
    query = new wx.BaaS.Query(),
    counts = opt.counts,
    name = opt.name

  group.incrementBy('counts', counts)
  group.set('name', name)
  return group.update()
}

const createGroup = (opt) => {
  let
    tableID = constants.TABLE_ID.GROUP,
    Group  = new wx.BaaS.TableObject(tableID),
    group = Group.create()

  let data = {
    name: opt.name || '未命名群组',
    counts: opt.counts || 0,
    gid: opt.gid,
  }

  return group.set(data).save()
}

module.exports = {
  getGroups,
  updateGroup,
  createGroup,
}