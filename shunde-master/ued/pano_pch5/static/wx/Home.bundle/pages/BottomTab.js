require(
  function() {
    var View = com.vizengine.view.View;
    return function (view) {
      var v_taskHall = view.$("taskHall")
      var v_myTask = view.$("myTask")
      var v_myAccount = view.$("myAccount")
      var activeColor = "#F15A3F"
      var norColor = "#7F8389"
      var activeTabView = v_myTask


      var activeTabFun = function (view,callback) {
        if(activeTabView){
          activeTabView.subViews[0].setSrc(activeTabView.subViews[0].getSrc().replace("_hl",""))
          activeTabView.subViews[1].setFontColor(norColor)
        }
        view.subViews[0].setSrc(view.subViews[0].getSrc().replace(".svg","_hl.svg"))
        view.subViews[1].setFontColor(activeColor)
        activeTabView = view
        if(callback) callback()
      }

      view.initTab = function (v_content) {
        v_taskHall.setOnClick(function(){
          if(activeTabView && this.index == activeTabView.index){
            return
          }
          activeTabFun(this, function(){
            v_content.$("taskHall").setGone(false)
            v_content.$("myAccount").setGone(true)
            v_content.$("myTask").setGone(true)
          })
        })
        v_myAccount.setOnClick(function(){
          if(activeTabView && this.index == activeTabView.index){
            return
          }
          activeTabFun(this, function(){
            v_content.$("taskHall").setGone(true)
            v_content.$("myAccount").setGone(false)
            v_content.$("myTask").setGone(true)
          })
        })
        v_myTask.setOnClick(function(){
          if(activeTabView && this.index == activeTabView.index){
            return
          }
          activeTabFun(this, function(){
            v_content.$("taskHall").setGone(true)
            v_content.$("myAccount").setGone(true)
            v_content.$("myTask").setGone(false)
          })
        })
      }
    }
  })
