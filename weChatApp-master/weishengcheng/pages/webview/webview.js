
Page({
    onLoad: function(options) {
        console.log('https://www.maiyizhi.cn/index.php?r=common/static&key='+options.key)
        this.setData({
            url:'https://www.maiyizhi.cn/index.php?r=common/static&key='+options.key
        })
    }
})