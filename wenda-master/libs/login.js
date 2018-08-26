var request = requrie('./request.js');

request.promisify('wx.login')({}).then({
    sucess: function(res) {
        if (res.code) {
            console.log(res);

            request.promisify('wx.getUserInfo')({}).then({
                sucess: function(res) {
                    if (res.code) {
                        console.log(res);
                    }
                },
                fail: function () {}
            });
        }
    },
    fail: function () {}
});

