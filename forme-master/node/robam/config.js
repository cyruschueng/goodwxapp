var eventOptions = {
  eventId : 1909,
  eventName: 'robam',                               // 活动
  eventStartTime: new Date('2017-06-08T00:00:00+0800'),    // 活动开始时间
  eventEndTime: new Date('2017-06-17T23:59:59+0800'),      // 活动结束时间
  eventRandomNum: 4,                                       // 加入是系数
  eventData: {
    mediaStartTimeArr:[
      '2017-06-08',//炫耀达人勋章
      '2017-06-11',//真爱粉勋章
      '2017-06-14',//小黄人勋章
      '2017-06-17',//卡路里达人勋章
    ],
    mediaEndTimeArr:[
      '2017-06-17',//炫耀达人勋章
      '2017-06-13',//真爱粉勋章
      '2017-06-16',//小黄人勋章
      '2017-06-17',//卡路里达人勋章
    ],
    walk_timeArr:[
      '2017-06-09',
      '2017-06-10',
      '2017-06-12',
      '2017-06-13',
      '2017-06-15',
      '2017-06-16',
    ],
  },
  eventRole: "商务运营",
  eventNick: "疯狂卡路里",
  isClosed: false
};
module.exports = eventOptions;
