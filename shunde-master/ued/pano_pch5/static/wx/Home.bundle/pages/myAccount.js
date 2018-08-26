module(function () {

  var View = com.vizengine.view.View;

  return function (page) {
    var v_logout = page.$("logout")



    page.initPage = function(rootPage){
      v_logout.setOnClick(function(){
        util.httpGet(util.baseUrl+ "/common/logout", function(){
          util.setCookie("curUserName", '',2*24*60*60*1000);
          rootPage.forwardTo("../main.js");
        })
      })

      if(!sessionStorage.userInfo){
        return
      }
      var userInfo = JSON.parse(sessionStorage.userInfo)
      page.$("name").setText(userInfo.name)
      page.$("phone").setText(userInfo.phone)
      page.$("e_mail").setText(userInfo.email)
    }

    return page
  }

})
