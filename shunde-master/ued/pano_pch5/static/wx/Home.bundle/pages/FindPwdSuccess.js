/**
 * Created by Drzhang on 2017/8/14.
 */
module("FindPwdSuccess.xml",function (render) {

    var View = com.vizengine.view.View;

    return function () {

        var page = render();
        var goLoginBtn = page.$("goLoginBtn");

        document.title="修改成功";
        goLoginBtn.setOnClick(function () {
            page.forwardTo("../main.js");
        })



        return page;
    }
})