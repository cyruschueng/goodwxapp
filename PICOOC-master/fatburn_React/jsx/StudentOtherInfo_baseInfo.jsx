var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");

var StudentInfo_baseInfo =React.createClass({

	componentDidUpdate:function(){

	},
	/*changeInfo:function(){
		var itemValue=$(this).children("input").val();
        var index=$(".noJump").index(this);
        console.info(index);
        console.info($(this).children("input").val());
        updateInfo(index,itemValue);
	},*/
	updateInfo: function(index){
		var itemValue=$(this).children("input").val();
		console.info(index);
        console.info(itemValue);
	    var updateName="";
	    var birth=itemValue;
	    if(itemIndex == 0){
	    //身高数据设置
	        updateName="height";
	        if(itemValue.length == 5){
	            itemValue=itemValue.substring(0,3);
	        }else{
	            itemValue=itemValue.substring(0,2);
	        }
	    }else if(itemIndex == 1){
	    //生日数据设置
	        updateName="birthday";
	        birth=birth.substring(0,4)+""+birth.substring(5,7)+""+birth.substring(8,10);
	        itemValue=itemValue.substring(0,4)+"-"+itemValue.substring(5,7)+"-"+itemValue.substring(8,10);
	        /*itemValue=itemValue.substring(0,4)+"/"+itemValue.substring(5,7)+"/"+itemValue.substring(8,10);
	        itemValue=new Date(itemValue);*/
	        console.info(itemValue);
	    }else if(itemIndex == 2){
	    //生理期数据设置
	        updateName="physicalPeriod";
	        itemValue=(new Date().getYear()+1900)+"-"+itemValue.substring(0,2)+"-"+itemValue.substring(3,5);
	    }else if(itemIndex == 3){
	    //测量时段数据设置
	        updateName="weightPeriod";
	        /*if(itemValue == "凌晨 (00:00-04:00)"){
	            itemValue = 0 ;
	        }else */
	        if(itemValue == "上午时段 (04:00-12:00)"){
	            itemValue = 1 ;
	        }else if(itemValue == "下午时段 (12:00-16:00)"){
	            itemValue = 2 ;
	        }else if(itemValue == "傍晚时段 (16:00-20:00)"){
	            itemValue = 3 ;
	        }else if(itemValue == "夜晚时段 (20:00-24:00)"){
	            itemValue = 4 ;
	        }
	        /*alert(itemValue);*/
	    }
	    var host=window.location.protocol+"//"+window.location.host;
	    var finalUrl=host+"/v1/api/campStu/updateStudentInfo"+window.location.search+"&"+updateName+"="+itemValue;
	    console.info(finalUrl);
	    $.ajax({
	        type:"get",
	        url:finalUrl,
	        dataType:"json",
	        success:function(data){
	            if(data.code == 200){
	                if(itemIndex == 0){
	                    getDataSame(itemValue,"");
	                }else if(itemIndex == 1){
	                    getDataSame("",birth);
	                }
	            }else{
	                // alert("服务器开小差了～");
	                $(".error-main-t").html("服务器开小差了～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
	            }
	        }
	    });
	},
	render:function (){
    	var me = this;
    	var data = me.props.baseInfo;
    	console.info(data);
    	var heightHtml=[];
	    for(var i=50;i<=220;i++){
	        heightHtml.push(<li data-val={i+"CM"} key={i}><p>{i}cm</p></li>);
	    }
	    var weightTime=data.resp.weightPreiod;
		var weightTimeText="";
		if(weightTime == 1){
			weightTimeText="上午时段 (04:00-12:00)";
		}else if(weightTime == 2){
			weightTimeText="下午时段 (12:00-16:00)";
		}else if(weightTime == 3){
			weightTimeText="傍晚时段 (16:00-20:00)";
		}else if(weightTime == 4){
			weightTimeText="夜晚时段 (20:00-24:00)";
		}
	    
        return (
            <div className="row page4">
				<div className="col-xs-12 col-sm-12 info-item height">
					<span>身高</span>
					<span>{data.resp.height}</span>
				</div>
				<div className="col-xs-12 col-sm-12 info-item age">
					<span>生日</span>
					<span>{data.resp.birthday}</span>
				</div>
				<div className="col-xs-12 col-sm-12 info-item career">
					<span>职业</span>
					<span>{data.resp.career == "" ? "暂无":data.resp.career}</span>
				</div>
				<div className="col-xs-12 col-sm-12 info-item area">
					<span>所在地</span>
					<span>{data.resp.area == "" ? "暂无":data.resp.area}</span>
				</div>
			</div>
        );
    }
});
module.exports = StudentInfo_baseInfo;