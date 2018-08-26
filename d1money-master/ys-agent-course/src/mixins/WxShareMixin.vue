<!--工具类-->
<script>
    export default {
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            weixinShare({title, desc, link, imgUrl}) {
                return new Promise((resolve, reject) => {
                    // 分享到朋友圈
                    this.$wechat.onMenuShareTimeline({
                        title, // 分享标题
                        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            resolve(0)
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            reject()
                        }
                    })
                    // 分享给朋友
                    this.$wechat.onMenuShareAppMessage({
                        title, // 分享标题
                        desc,
                        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            resolve(1)
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            reject()
                        }
                    })
                    // 分享给QQ
                    this.$wechat.onMenuShareQQ({
                        title, // 分享标题
                        desc,
                        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            resolve(2)
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            reject()
                        }
                    })
                    // 分享给QQ空间
                    this.$wechat.onMenuShareQZone({
                        title, // 分享标题
                        desc,
                        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            resolve(3)
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            reject()
                        }
                    })
                })
            }
        }
    }
</script>
