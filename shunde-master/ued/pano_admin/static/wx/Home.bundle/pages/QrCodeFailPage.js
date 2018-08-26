/**
 * Created by Drzhang on 2017/8/14.
 */
module("QrCodeFailPage.xml","TaskListCell.xml",function (render,renderCell) {

    var View = com.vizengine.view.View;

    return function () {

        var listPage = render();
        var reScanBtn = page.$("reScanBtn");

        reScanBtn.setOnClick(function(){

        });


        document.title="二维码不匹配";
        return listPage;
    }
})