/**
 * Created by Drzhang on 2017/8/14.
 */
module("ForgetPwdPage.xml",function (render) {

    var View = com.vizengine.view.View;

    return function () {

        var getVerifyCodeUrl = "/common/passport/sendSmsCode";
        var checkVerifyCodeUrl = "/common/passport/checkSmsCode";
        var isLoading = false;
        var getCode = true;

        var page = render();
        var phoneNumInput = page.$("phoneNumInput");
        var getVerifyCodeBtn = page.$("getVerifyCodeBtn");
        var verifyCodeInput = page.$("verifyCodeInput");
        var nextBtn = page.$("nextBtn");
        var nextBtnCover = page.$("nextBtnCover");
        var errorHintBox = page.$("errorHintBox");
        var errorHint = page.$("errorHint");
        var delayGetCodeInterval = null;

        document.title="忘记密码";
        initOnClickEvent();

        function initOnClickEvent() {
            
            phoneNumInput.setOnInputCallback(function () {
                if(phoneNumInput.getText() != ""){
                    if(verifyCodeInput.getText() != ""){
                        nextBtnCover.setVisible(false);
                    }
                    errorHintBox.setVisible(false);
                }else {
                    nextBtnCover.setVisible(true);
                }
            })

            verifyCodeInput.setOnInputCallback(function () {
                if(verifyCodeInput.getText() != ""){
                    if(phoneNumInput.getText() != ""){
                        nextBtnCover.setVisible(false);
                    }
                    errorHintBox.setVisible(false);
                }else {
                    nextBtnCover.setVisible(true);
                }
            })
            
            getVerifyCodeBtn.setOnClick(function () {
                if(isLoading){ return }
                if(!getCode){ return }
                if(phoneNumInput.getText() == ""){
                    errorHint.setText("请输入手机号");
                    errorHintBox.setVisible(true);
                    return;
                }
                if(!checkPhone(phoneNumInput.getText())){
                    errorHint.setText("请输入正确格式的手机号");
                    errorHintBox.setVisible(true);
                    return;
                }

                var data = {};
                data.phone = phoneNumInput.getText();
                util.postHttp(util.baseUrl+getVerifyCodeUrl,
                    function (response) {
                        isLoading = false;
                        if(response.code == 0 && response.msg == "success"){
                            getCode = false;
                            var time = 60
                            setTimeout(function(){ getCode = true }, 60*1000)
                            delayGetCodeInterval = setInterval(function(){
                                time--;
                                getVerifyCodeBtn.setText("获取验证码("+time+"S)")
                                getVerifyCodeBtn.setFontColor("#999999")
                                if (getCode) {
                                    getVerifyCodeBtn.setText("获取验证码")
                                    getVerifyCodeBtn.setFontColor("#333333")
                                    clearInterval(delayGetCodeInterval)
                                }
                            }, 1000)
                        }else{
                            errorHint.setText("该用户不存在");
                            errorHintBox.setVisible(true);
                        }
                    },
                    function (response) {
                        isLoading = isLoading;
                        console.log("error" + response);
                    },
                    data
                );
                isLoading = true;
            })

            nextBtn.setOnClick(function () {

                if(phoneNumInput.getText() == ""){
                    errorHint.setText("请输入手机号");
                    errorHintBox.setVisible(true);
                    return;
                }
                if(verifyCodeInput.getText() == ""){
                    errorHint.setText("请输入验证码");
                    errorHintBox.setVisible(true);
                    return;
                }

                if(isLoading){
                    return;
                }
                var data = {};
                data.phone = phoneNumInput.getText();
                data.smsCode = verifyCodeInput.getText();
                util.http(util.baseUrl+checkVerifyCodeUrl+"?phone="+data.phone+"&smsCode="+data.smsCode,
                    function (response) {
                        isLoading = false;
                        if(response.code == 0){
                            //校验成功，保存手机号和验证码
                            util.setCookie("smsCode",data.smsCode);
                            util.setCookie("phone",data.phone)
                            clearInterval(delayGetCodeInterval)
                            getVerifyCodeBtn.setText("获取验证码")
                            getVerifyCodeBtn.setFontColor("#333333")
                            page.forwardTo("NewPwdPage.js");
                        }else{
                            errorHint.setText("验证码输入错误");
                            errorHintBox.setVisible(true);
                        }
                    },
                    function (response) {
                        isLoading = false;
                        console.log("error" + response);
                    }
                );
                isLoading = true;
            })
        }

        function checkPhone(phoneNum){
            if(!(/^1[34578]\d{9}$/.test(phoneNum))){
                return false;
            }else {
                return true;
            }
        }

        return page;

    }
})