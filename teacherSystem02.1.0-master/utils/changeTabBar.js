function changeTabBar(datasetId,tabBarArr,obj){
    switch (datasetId){
      case 0:
        tabBarArr[0] = {id:0,txt:'录入',iconSrc:'../images/write1.gif',changeTextColor:'#1FBB1C',isChange: true};
        tabBarArr[1] = {id:0,txt:'查询',iconSrc:'../images/search.gif',changeTextColor:'#525252',isChange: false};
        tabBarArr[2] = {id:0,txt:'工具',iconSrc:'../images/setting.gif',changeTextColor:'#525252',isChange: false};
        obj.setData({tabBarArr:tabBarArr});
        wx.redirectTo({url: '/pages/writeIndex/writeIndex'});
        break;
      case 1:
        tabBarArr[0] = {id:0,txt:'录入',iconSrc:'../images/write.gif',changeTextColor:'#525252',isChange: false};
        tabBarArr[1] = {id:0,txt:'查询',iconSrc:'../images/search1.gif',changeTextColor:'#1FBB1C',isChange: true};
        tabBarArr[2] = {id:0,txt:'工具',iconSrc:'../images/setting.gif',changeTextColor:'#525252',isChange: false};
        obj.setData({tabBarArr:tabBarArr});
        wx.redirectTo({url: '/pages/searchIndex/searchIndex'});
        break;
      case 2:
        tabBarArr[0] = {id:0,txt:'录入',iconSrc:'../images/write.gif',changeTextColor:'#525252',isChange: false};
        tabBarArr[1] = {id:0,txt:'查询',iconSrc:'../images/search.gif',changeTextColor:'#525252',isChange: false};
        tabBarArr[2] = {id:0,txt:'工具',iconSrc:'../images/setting1.gif',changeTextColor:'#1FBB1C',isChange: true};
        obj.setData({tabBarArr:tabBarArr});
        wx.redirectTo({url: '/pages/settingIndex/settingIndex'});
        break;
    }
}
module.exports = {
    changeTabBar: changeTabBar
}