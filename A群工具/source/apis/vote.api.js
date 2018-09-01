import { ApiConfig } from "apiconfig.js";

export class VoteApi{
  create(json, callback, showLoading = true) {

    if (showLoading)
    ApiConfig.ShowLoading();
    
    var header=ApiConfig.GetHeader();
    console.log(header);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'vote/create',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        callback(false);
      },
      complete: function (res) {
        console.log(res);

        if (showLoading)
        ApiConfig.CloseLoading();
      }
    })
  }
  vote(json, callback, showLoading = true) {

    if (showLoading)
      ApiConfig.ShowLoading();

    var header = ApiConfig.GetHeader();
    console.log(header);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'vote/vote',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function (res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        callback(false);
      },
      complete: function (res) {
        console.log(res);

        if (showLoading)
          ApiConfig.CloseLoading();
      }
    })
  }
}