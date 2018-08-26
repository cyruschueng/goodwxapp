//MTA统计
require([
    'common/interface',
    'common/util',
], function (inter, util) {
    var args = util.location();
    

    //获取活动基本信息
    if (args.actid) {
      var ceActivityId = args.actid;
      util.setAjax(inter.getApiUrl().getCeActivityPOById,{
        ceActivityId:ceActivityId
      },function (json) {
              if (!json.data.mtaSid) {
                  addMta("500326805","500326806");
              } else {
                  console.log(json);
                  addMta(json.data.mtaSid,json.data.mtaCid);
              }
          }, function () {
              addMta("500326805","500326806");
      },"GET");
    };

    
    

    function addMta(sid,cid) {
        var _mtac = {"senseHash":0,"autoReport":1};
            (function() {
            var mta = document.createElement("script");
            mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.2";
            mta.setAttribute("name", "MTAH5");
            mta.setAttribute("sid", sid);
            if (cid) {
                mta.setAttribute("cid", cid);
            };
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(mta, s);
        })();
        
        if(getUrlParam("actid") && getUrlParam("actid") !="" && typeof(MtaH5) != "undefined"){
            MtaH5.clickStat("actid-"+getUrlParam("actid"));
        }
        
        if(getUrlParam("zanid") && getUrlParam("zanid") !="" && typeof(MtaH5) != "undefined"){
            MtaH5.clickStat("zanid-"+getUrlParam("zanid"));
        }
    }

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
    }

    $("body").on("click","[mta]",function(){ 
      if(typeof(MtaH5) != "undefined")
        var mtas=$(this).attr("mta").split(",");
        for(var i in mtas){
          if(mtas[i]!=""){
              if (mtas[i]=="audio") {
                  if($(this).find(".icon.on").length>0){
                      MtaH5.clickStat(mtas[i]+"-on");
                  }else{
                      MtaH5.clickStat(mtas[i]+"-off");
                  }
              }else{
                  MtaH5.clickStat(mtas[i]);
              }
          }
        }
    });

    
});


