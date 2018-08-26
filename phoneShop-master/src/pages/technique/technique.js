let that;
Page({
    data: {
        navbar: ['热门资讯', '手机技巧', '故障自查'],
        currentTab: 0, // 导航栏切换索引
    },
    onNavbarTap(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({ currentTab: index });
        // index === 1 ? this.getCollectList() : this.getList();
    },
    // 展示下拉数据
    showPullDown(e) {
        let oldId = that.data.pullDownId || 0;
        let cid = e.currentTarget.dataset.cid;
        that.setData({
            pullDownId: cid,
            pullDown: !that.data.pullDown,
        })

        if (that.data.pullDownId == oldId) { return; }
        if (!that.data.pullDown && that.data.pullDownId != oldId) {
            that.setData({ pullDown: !that.data.pullDown })
        }
        // console.info("that.data.pullDownId", oldId, that.data.pullDown, that.data.pullDownId, cid)
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        that = this;
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})