module("main.xml","common.js", function(render) {

    /**
     * 分享配置
     */
    window.shareInfo = {
        url:window.location.href,
        title:document.title,
        desc:window.location.href,
        img:""
    }
    window.shareConfig = function(){
        getShareInfoSub(shareInfo.url, shareInfo.title, shareInfo.desc, shareInfo.img);
    }
    shareConfig();

    var loginUrl = "/common/login";
    var isLoading = false;

    var page = render();

    var loginBtn = page.$("loginBtn");
    var forgetPwdBtn = page.$("forgetPwdBtn");
    var usernameInput = page.$("usernameInput");
    var passwordInput = page.$("passwordInput");
    var errorHintBox = page.$("errorHintBox");
    var errorHint = page.$("errorHint");
    var loginBtnCover = page.$("loginBtnCover");

    var userData;

    page.onPageWillShown = function () {
        document.title="登录";

        initOnClickEvent();
        setTimeout(function () {
            if(util.getCookie("curUserName") != null && util.getCookie("curUserName") != ""){  //用户已登录
          //if(false){
                page.forwardTo("/pages/TaskListPage.js");
                setTimeout(function () {
                    window.hideLoading();
                },500);
            }else{
                window.hideLoading();
            }
        },1000);
    }

    function initOnClickEvent() {
        forgetPwdBtn.setOnClick(function () {
            page.forwardTo("/pages/ForgetPwdPage.js");
        });

        usernameInput.setOnInputCallback(function () {
            if(usernameInput.getText() != ""){
                if(passwordInput.getText() != ""){
                    loginBtnCover.setVisible(false);
                }
                errorHintBox.setVisible(false);
            }else{
                loginBtnCover.setVisible(true);
            }
        });
        passwordInput.setOnInputCallback(function () {
            if(passwordInput.getText() != ""){
                if(usernameInput.getText() != ""){
                    loginBtnCover.setVisible(false);
                }
                errorHintBox.setVisible(false);
            }else{
                loginBtnCover.setVisible(true);
            }
        })

        loginBtn.setOnClick(function () {
            if(isLoading){
                return;
            }
            var username = usernameInput.getText();
            var password = passwordInput.getText();
            if(username == "" && password == ""){
                errorHint.setText("请输入用户名和密码");
                errorHintBox.setVisible(true);
                return;
            }
            if(username == ""){
                errorHint.setText("用户名不能为空");
                errorHintBox.setVisible(true);
                return;
            }
            if(password == ""){
                errorHint.setText("密码不能为空");
                errorHintBox.setVisible(true);
                return;
            }

            var postData = {}
            postData.email = username;
            postData.password = password;
            //验证用户名和密码
            util.postHttp(util.baseUrl+loginUrl,
                function (response) {
                    isLoading = false;
                    console.log(response);
                    if(response.code == 0){
                        userData = response.data;
                        sessionStorage.userInfo = JSON.stringify(userData);
                      console.log(sessionStorage.userInfo)
                        sessionStorage.email = response.data.email;
                        util.setCookie("curUserName","name="+userData.name,2*24*60*60*1000);
                        page.forwardTo("/pages/TaskListPage.js");
                    }else{
                        errorHint.setText(response.msg);
                        errorHintBox.setVisible(true);
                    }
                },
                function (response) {
                    isLoading = false;
                    console.log("error"+response);
                },
                postData
            );
            isLoading = true;
        })
    }

    return page;

});
