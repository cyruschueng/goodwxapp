/**
 * Created by Drzhang on 2017/8/15.
 */
/**
 * Created by Drzhang on 2017/8/14.
 */
module("ConfirmSuccessPage.xml","TaskListCell.xml",function (render,renderCell) {

    var View = com.vizengine.view.View;

    return function () {

        var page = render();
        var btnBack = page.$("btnBack");
        var taskName = page.$("taskName");

        document.title="确认成功";
        btnBack.setOnClick(function(){
           page.backward();
           document.title="需求详情";
        });

        taskName.setText("瑞吉酒店");


        return page;
    }
})