/**
 * Created by Drzhang on 2017/8/14.
 */
module("TaskListPage.xml","TaskListCell.xml",function (render,renderCell) {

    var View = com.vizengine.view.View;

    return function () {

        var getTaskListUrl = "/task/search";

        var page = render();
        var listView = page.$("taskListView");
      var v_bottomTab = page.$("bottomTab")
      var v_myAccount = page.$("myAccount")

        var data = [];

      page.onPageWillShown = function () {
        v_myAccount.initPage(page)
      }
      v_bottomTab.initTab(page.$("contentContainer"));
        function initData() {
            var postData = {};
            postData.displayStatus = 1;
            util.postHttp(util.baseUrl+getTaskListUrl,
                function (response) {
                    console.log(response);
                    if(response.code == 0){
                        data = response.data.rows;
                        initView();
                    }else if(response.code == 10001){
                      util.setCookie("curUserName", '',2*24*60*60*1000);
                      setTimeout(function(){
                        page.forwardTo("../main.js");
                      },1000)
                    }
                },
                function (response) {
                    console.log("error" + response);
                },
                postData
            );
        }

        function initView() {
            var myAdapter = new Object();
            myAdapter.getCellView = function (reUseView, index) {
                if (reUseView == null ){
                    reUseView = renderCell();
                }
                var currData = data[index];
                if(currData.name && currData.name.length > 10){
                  reUseView.$("taskName").setText(currData.name.substr(0,10) + '...');

                } else {
                  reUseView.$("taskName").setText(currData.name);
                }
                //reUseView.$("taskName").setText("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈".substr(0,10));
                reUseView.$("taskAddress").setText(currData.cityName+currData.countyName);
                reUseView.setOnClick(function () {
                    sessionStorage.currTaskId = currData.id;
                    sessionStorage.currType = currData.type;
                    this.getPage().forwardTo("TaskDetailPage.js?taskId="+currData.id);

                })
                return reUseView;
            };
            myAdapter.getCount = function () {
                return data.length;
            };
            listView.setAdaptor(myAdapter);
        }

        document.title="拍摄中的需求";
        initData();
        // initView();

        return page;

    }
})
