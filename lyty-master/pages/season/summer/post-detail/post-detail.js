var postsData = require('../../../../data/summer/posts-data.js')//此处用的是
Page({
    data: {

    },
    onLoad: function (option) {
        var postId = option.id;
        this.setData({
            currentPostId: postId
        })
        var postData = postsData.postList[postId];
        this.setData({
            //this.setData来进行数据绑定
            postData: postData

        })
        // var postsCollected = {
        //     1:"true",
        //     2:"false",
        //     3:"true"
        // }

        var postsCollected = wx.getStorageSync('posts_collected')
        if (postsCollected) {
            var poostCollected = postsCollected[postId]//拿到该id的缓存信息
            this.setData({
                collected: postsCollected
            })
        } else {
            var postsCollected = {}
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }



    },
    onCollectionTap: function (event) {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.setData.currentPostId];
        //收藏变不收藏不收藏变收藏
        postCollected = !postCollected;
        postsCollected[this.setData.currentPostId] = postCollected;

        //更新文章是否收藏的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        //更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })
        wx.showToast({
            title:postCollected?"收藏成功":"取消收藏",
            duration:1000,
            icon:"success"
        })
    }
})