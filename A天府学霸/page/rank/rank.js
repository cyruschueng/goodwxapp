var config = require('../../config.js');
var common = require('../../asset/js/common.js');
var Server = config.service;
var Session = common.Session;
var AppPages = common.AppPages;
var UserIdFun = common.UserIdFun;
// 菜单按钮图片
var friendRankMenuImgSrc = {
    "on": "../../asset/image/rank-friendwhite.png",
    "off": "../../asset/image/rank-friendblack.png",
};
var allRankMenuImgSrc = {
    "on": "../../asset/image/rank-allwhite.png",
    "off": "../../asset/image/rank-allblack.png",
};
var rankCurrentPage = 1;
var rankPageSize = 10;
// 处理null值
function fatNullVal(val){
    return (val == null) ? "" : val;
}
// 处理列表数据
function handleListData(dataArr){
    var listArr = [].concat(dataArr);
    var arrSize = listArr.length;
    for(var i=0; i<arrSize; i++){
        var dataObj = listArr[i];
        // 增加皇冠图标
        var hatClass = "no";
        var sortNum = parseInt(dataObj["sort"]);
        switch(sortNum){
            case 1:
                hatClass = "first";
                break;
            case 2:
                hatClass = "second";
                break;
            case 3:
                hatClass = "third";
                break;
        }
        dataObj["usernick"] = fatNullVal(dataObj["usernick"]);
        dataObj.hat = hatClass;
        listArr[i] = dataObj;
    }
    return listArr;
}
// 菜单切换
function rankMenuSwicth(self, menu){
    var isAll = (menu == "all") ? true : false;
    var friendMenuImg = isAll ? friendRankMenuImgSrc["off"] : friendRankMenuImgSrc["on"];
    var allMenuImg = isAll ? allRankMenuImgSrc["on"] : allRankMenuImgSrc["off"];
    self.setData({
        rankPage: menu,
        friendRankMenuImg: friendMenuImg,
        allRankMenuImg: allMenuImg
    });
}
// 请求列表数据
function getRankListData(self, inData, flag){
    var isAll = (String(inData.menu) == "all") ? true : false;
    var reqUrl = isAll ? Server.worldRankUrl : Server.friendRankUrl;
    inData.userId = UserIdFun.get();
    inData.pageSize = rankPageSize;
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: reqUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            var rankList = jsonData;
            var rankMe = "";
            var rankMeShow = "slhide";
            if (isAll){
                rankList = jsonData["top10"];
                rankMe = jsonData["myRank"];
                if (rankMe["inTop10"]){
                    rankMeShow = "slhide";
                }else{
                    rankMeShow = "";
                }
            }
            //排名列表
            var listArr = handleListData(rankList);
            if (listArr.length <= 0) {
                common.wxShowToast({
                    title: '暂无更多排名',
                    flag: "success"
                });
            }
            if (flag == 1){
                var oldRankList = self.data.rankListArr;
                if (listArr.length > 0){
                    listArr = oldRankList.concat(listArr);
                }else{
                    listArr = oldRankList;
                }
            }
            self.setData({
                rankListArr: listArr,
                myRank: rankMe,
                myRankShow: rankMeShow,
            });
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}
// 列表清空
function rankListClear(self) {
    self.setData({
        rankListArr: []
    });
}
// 列表加载
function rankListLoad(self, menu) {
    var isAll = (menu == "all") ? true : false;
    rankCurrentPage = 1;
    var inData = { "menu": menu, currentPage: 1};
    // 请求数据
    getRankListData(self, inData, 0);
}
// 列表追加
function rankListAdd(self, menu) {
    var isAll = (menu == "all") ? true : false;
    rankCurrentPage++;
    var inData = { "menu": menu, currentPage: rankCurrentPage};
    // 请求数据
    getRankListData(self, inData, 1);
}
// 页面内容切换
function rankPageShow(self, menu){
    var menuold = self.data.rankPage;
    if (menuold != menu) {
        // 切换菜单
        rankMenuSwicth(self, menu);
        // 清空列表
        rankListClear(self);
        // 加载列表
        rankListLoad(self, menu);
    }
}

Page({
    data:{
        loadok: 'slhide',
        rankPage: "",
        rankListArr: [],
        myRank: "",
        myRankShow: "slhide",
        friendRankMenuImg: friendRankMenuImgSrc["on"],
        allRankMenuImg: allRankMenuImgSrc["off"]
    },
    onLoad: function (options) {
        var self = this;
        // 默认切换到好友排行
        rankPageShow(self, "friend");
    },
    rankFriendShow: function(e){
        var self = this;
        rankPageShow(self, "friend");
    },
    rankAllShow: function (e) {
        var self = this;
        rankPageShow(self, "all");
    },
    rankListPageAdd: function (e) {
        var self = this;
        var menu = self.data.rankPage;
        rankListAdd(self, menu);
    }
});