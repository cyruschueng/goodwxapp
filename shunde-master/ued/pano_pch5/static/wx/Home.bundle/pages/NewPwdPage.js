/**
 * Created by Drzhang on 2017/8/14.
 */
module("NewPwdPage.xml",function (render) {

    var View = com.vizengine.view.View;

    return function () {

        var resetPwdUrl = "/common/passport/resetPasswordByPhone";
        var isLoading = false;

        var page = render();
        var newPwdInput = page.$("newPwdInput");
        var newPwdConfirmInput = page.$("newPwdConfirmInput");
        var resetPwdBtn = page.$("resetPwdBtn");
        var resetBtnCover = page.$("resetBtnCover");
        var errorHintBox = page.$("errorHintBox");
        var errorHint = page.$("errorHint");

        document.title="修改密码";
        initOnClickEvent();

        function initOnClickEvent() {

            newPwdInput.setOnInputCallback(function () {
                if(newPwdInput.getText() != ""){
                    if(newPwdConfirmInput.getText() != ""){
                        resetBtnCover.setVisible(false);
                    }
                    errorHintBox.setVisible(false);
                }else {
                    resetBtnCover.setVisible(true);
                }
            })

            newPwdConfirmInput.setOnInputCallback(function () {
                if(newPwdConfirmInput.getText() != ""){
                    if(newPwdInput.getText() != ""){
                        resetBtnCover.setVisible(false);
                    }
                    errorHintBox.setVisible(false);
                }else{
                    resetBtnCover.setVisible(true);
                }
            })

            resetPwdBtn.setOnClick(function () {
                if(isLoading){
                    return;
                }
                if(newPwdInput.getText() == ""){
                    errorHint.setText("请输入手机号");
                    errorHintBox.setVisible(true);
                    return;
                }
                if(newPwdConfirmInput.getText() != newPwdInput.getText()){
                    errorHint.setText("前后两次密码不一致");
                    errorHintBox.setVisible(true);
                    return;
                }

                var data = {};
                data.phone = util.getCookie("phone");
                data.smsCode = util.getCookie("smsCode");
                data.password = newPwdInput.getText();
                util.postHttp(util.baseUrl+resetPwdUrl,
                    function (response) {
                        isLoading = false;
                        console.log(response);
                        if(response.code == 0){
                            console.log("修改密码成功")
                            page.forwardTo("FindPwdSuccess.js");
                        }else{
                            errorHint.setText("修改密码失败");
                            errorHintBox.setVisible(true);
                        }

                    },
                    function (response) {
                        isLoading = false;
                        console.log("error" + response);
                    },
                    data
                );
                isLoading = true;
            })


        }

        return page;
    }
})