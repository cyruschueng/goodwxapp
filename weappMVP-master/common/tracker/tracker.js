export default class tracker {
    track(eventKey, eventParam) {
        wx.reportAnalytics(eventKey, eventParam);
    }
}