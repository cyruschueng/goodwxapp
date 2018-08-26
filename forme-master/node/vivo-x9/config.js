var eventOptions = {
  eventId : 1908,
  eventName: 'vivo-x9',                               // 活动
  eventStartTime: new Date('2017-05-31T10:00:00+0800'),    // 活动开始时间
  eventEndTime: new Date('2017-06-09T23:59:59+0800'),      // 活动结束时间
  eventRandomNum: 4,                                       // 加入是系数
  eventData: {
    rankLot_start:new Date('2017-06-10T00:00:00+0800'),//排行榜抽奖开始时间
    rankLot_end: new Date('2017-06-16T23:59:59+0800'), //排行榜抽奖结束时间
    mcode:'mm719',//勋章的code
    testmcode: 'mm442'
  },
  eventRole: "商务运营",
  eventNick: "vivo活力蓝不住",
  isClosed: false
};
module.exports = eventOptions;
