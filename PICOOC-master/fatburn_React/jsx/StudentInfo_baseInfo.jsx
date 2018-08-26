var React=require("react");
var ReactDOM=require("react-dom");

var PubSub = require("pubsub-js");
var mobiscroll = require('../jsv2/mobiscroll.react.min');
//身高
var HeightInfo = React.createClass({
	setHeight:function(event,inst){
		var itemValue = inst.getVal();
        if(itemValue.length == 5){
            itemValue=itemValue.substring(0,3);
        }else{
            itemValue=itemValue.substring(0,2);
        }
        this.props.updateInfo("height",itemValue,"");
	},
    render: function() {
    	var heightArr=[];
    	var heightIndex;
    	var data=this.props.baseInfo;
		for(var i=50;i<=220;i++){
			heightIndex=parseInt(i-50);
			heightArr.push(<option key={heightIndex} value={i+"CM"}>{i+"CM"}</option>);
		}
        return (
            <div className="col-xs-12 col-sm-12 info-item height noJump">
				<span>身高</span>
				<div>
	                <mobiscroll.Select
	                    ref="select"
	                    theme="android-holo-light"
	                    lang="zh"
	                    display="bottom"
	                    name="Height"
	                    cancelText=""
        				setText=""
        				headerText="身高"//设置滚动区域头部标题
        				value={data.resp.height}//设置未选择数据的默认值
        				onSet={this.setHeight}//当数据进行设置之后，调用setHeight方法
	                >
	                	{heightArr}//滚动区域数据设置
	                </mobiscroll.Select>
	            </div>
				<img src="image/studentInfo/right1.png" className="info-img" />
			</div>
        );
    }    
});
//生日
var BirthdayInfo= React.createClass({
	setBirthday:function(event,inst){
		//var itemValue = inst.getVal();
		var itemValue = $(".age").find("input:eq(0)").val();
		var birth = itemValue;
        //生日数据设置
        birth=birth.substring(0,4)+""+birth.substring(5,7)+""+birth.substring(8,10);
        itemValue=itemValue.substring(0,4)+"-"+itemValue.substring(5,7)+"-"+itemValue.substring(8,10);
        this.props.updateInfo("birthday",itemValue,birth);
	},
	componentDidMount :function(){
		var data=this.props.baseInfo;
		$(".age").find("input:eq(0)").val(data.resp.birthday);
	},
    render: function() {
    	var now = new Date(),
        max = new Date(now.getFullYear() -2, now.getMonth(), now.getDate()),
        min = new Date(now.getFullYear() -80, now.getMonth(), now.getDate());
        var data=this.props.baseInfo;
        var birth=data.resp.birthday;
   		var birthday= new Date(birth.substring(0,4),parseInt(birth.substring(5,7)-1),birth.substring(8,10));
   		console.info(birthday);//Tue Jan 13 1987 00:00:00 GMT+0800 (中国标准时间)
        return (
            <div className="col-xs-12 col-sm-12 info-item age noJump">
				<span>生日</span>
	            <div>
                	<mobiscroll.Date 
	                    ref="date" //模式为date
	                    theme="android-holo-light" 
	                    lang="zh" //语言为中文
	                    display="bottom"
	                    dateWheels="yyyy mm  dd" //滚动区域日期格式
        				dateFormat="yyyy年mm月dd日" //input展示区域日期格式
        				yearSuffix="年"  //年滚动区域文本
        				monthSuffix="月"
        				daySuffix="日"
        				headerText="生日"
        				cancelText=""
        				setText=""
	                    max={max}  //滚动区域最大时间范围
	                    min={min}  //滚动区域最小时间范围
	                    onSet={this.setBirthday} //在选择时间确认后调用setBirthday方法
	                    defaultValue={birthday}   //默认时间设置
	                    
	                ></mobiscroll.Date>
           	    </div>
				<img src="image/studentInfo/right1.png" className="info-img" />
			</div>
        );
    }    
});
//测量时段
var WeightTimeInfo = React.createClass({
	setWeightTime:function(event,inst){
		var itemValue = inst.getVal();
        this.props.updateInfo("weightPeriod",itemValue,"");
	},
    render: function() {
    	var data=this.props.baseInfo;
        return (
            <div className="col-xs-12 col-sm-12 info-item periodDesc noJump">
				<span>习惯测量</span>
				<div>
	                <mobiscroll.Select
	                    ref="select"
	                    theme="android-holo-light"
	                    lang="zh"
	                    display="bottom"
	                    name="Height"
	                    cancelText=""
        				setText=""
        				headerText="习惯测量"
        				value={data.resp.weightPreiod}
        				onSet={this.setWeightTime}
	                >
	                	<option value="1">上午时段 (04:00-12:00)</option>
	                    <option value="2">下午时段 (12:00-16:00)</option>
	                    <option value="3">傍晚时段 (16:00-20:00)</option>
	                    <option value="4">夜晚时段 (20:00-24:00)</option>
	                </mobiscroll.Select>
	            </div>
				<img src="image/studentInfo/right1.png" className="info-img" />
			</div>
        );
    }    
});
//生理期
var PhysicalPeriodInfo= React.createClass({
	setPhysicalPeriod:function(event,inst){
		//var itemValue = inst.getVal();
		var itemValue = $(".physicalPeriod").find("input:eq(0)").val();
		itemValue=(new Date().getYear()+1900)+"-"+itemValue.substring(0,2)+"-"+itemValue.substring(3,5);
        this.props.updateInfo("physicalPeriod",itemValue,"");
	},
	componentDidMount :function(){
		var data=this.props.baseInfo;
		//$(".physicalPeriod").find("input:eq(0)").val(data.resp.physicalPeriod);
		if(data.resp.title.sex == 1){
			$(".physicalPeriod").css("display","none");
		}else{
			$(".physicalPeriod").find("input:eq(0)").val(data.resp.physicalPeriod);
		}
	},
    render: function() {
    	var now = new Date(),
        max = new Date(now.getFullYear() -2, now.getMonth(), now.getDate()),
        min = new Date(now.getFullYear() -80, now.getMonth(), now.getDate());
        var data=this.props.baseInfo;
        var physicalPeriod=data.resp.physicalPeriod;
        //console.log(physicalPeriod.substring(0,2));
        //console.log(physicalPeriod.substring(4,5));
        
   		var physicalPeriodDay= new Date(2017,parseInt(physicalPeriod.substring(0,2))-1,parseInt(physicalPeriod.substring(4,5)));
        //console.log(physicalPeriodDay);
        // var physicalPeriodDay=new Date(2017,4,5);
        // console.log(physicalPeriodDay);
        return (
            <div className="col-xs-12 col-sm-12 info-item physicalPeriod noJump">
				<span>上次生理期</span>
	            <div>
                	<mobiscroll.Date 
	                    ref="date" 
	                    theme="android-holo-light" 
	                    lang="zh" 
	                    display="bottom"
	                    dateWheels="mm dd"
        				dateFormat="mm月dd日"
        				yearSuffix="年"
        				monthSuffix="月"
        				daySuffix="日"
        				headerText="上次生理期"
        				cancelText=""
        				setText=""
	                    onSet={this.setPhysicalPeriod}
	                    defaultValue={physicalPeriodDay}   //默认时间设置
	                ></mobiscroll.Date>
           	    </div>
				<img src="image/studentInfo/right1.png" className="info-img" />
			</div>
        );
    }    
});
var StudentInfo_baseInfo =React.createClass({
	updateInfo:function(updateName,itemValue,birth){
		var me=this;
		var host=window.location.protocol+"//"+window.location.host;
	    var finalUrl=host+"/v1/api/campStu/updateStudentInfo"+window.location.search+"&"+updateName+"="+itemValue;
	    console.info(finalUrl);
		$.ajax({
	        type:"get",
	        url:finalUrl,
	        dataType:"json",
	        success:function(data){
	            if(data.code == 200){
	                if(updateName == "height"){
	                    me.getDataSame(itemValue,"");
	                }else if(updateName == "birthday"){
	                    me.getDataSame("",birth);
	                }
	            }else{
	                $(".error-main-t").html("服务器开小差了～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
	            }
	        }
	    });
	},
	//同步数据
	getDataSame:function (height,birth){
	   /* var getPageInfo = function (){
	        var data = {
	            roleHeight:height,
	            roleBirth:birth
	        };
	        return JSON.stringify(data);
	    }
	    if(getParamByUrl("os")=="android" && (typeof mobileApp != "undefined")){
			mobileApp.makeDataAccord(getPageInfo());
	  	}else if(getParamByUrl("os")=="iOS" && (typeof window.webkit != "undefined")){
			window.webkit.messageHandlers.makeDataAccord.postMessage(getPageInfo());
		}*/

		var data = {
            roleHeight:height,
            roleBirth:birth
        };
        data=JSON.stringify(data);
		appFc.makeDataAccord(data);
	},
	jumpOtherPage:function(index){
		var itemName = $(".jumpItem:eq("+index+")").children("span:eq(0)").text();
		var itemValue= $(".jumpItem:eq("+index+")").children("span:eq(1)").text();
		//var url="editInfo.html"+window.location.search+"&itemName="+itemName+"&index="+index+"&itemValue="+itemValue;
		if(!this.props.isPersonInfo){
			setCookie("baseInfo",1,1);
		}
        window.location.href="editInfo.html"+window.location.search+"&itemName="+itemName+"&index="+index+"&itemValue="+itemValue;
	},
	render:function (){
    	var me = this;
    	var data = me.props.baseInfo;
    	console.info(data.length);
    	/*if(typeof data != "undefined"){
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
    	}*/
    	if(data.length != 0){
    		return (
	            <div className={me.props.isPersonInfo == false ? "row page4":"row infoEdit"}>
	                <div className="col-xs-12 col-sm-12 info-item name jumpItem" onClick={this.jumpOtherPage.bind(this,0)}>
						<span>昵称</span>
						<span className="text-item">{data.resp.title.name}</span>
						<img src="image/studentInfo/right1.png" className="info-img" />
					</div>
					<HeightInfo baseInfo={data} updateInfo={this.updateInfo} />
					<BirthdayInfo baseInfo={data} updateInfo={this.updateInfo} />
					<WeightTimeInfo baseInfo={data} updateInfo={this.updateInfo} />
					<PhysicalPeriodInfo baseInfo={data} updateInfo={this.updateInfo} />
					<div className="col-xs-12 col-sm-12 info-item career jumpItem" onClick={this.jumpOtherPage.bind(this,1)}>
						<span>职业</span>
						<span className="text-item">{data.resp.career}</span>
						<img src="image/studentInfo/right1.png" className="info-img"/>
					</div>
					<div className="col-xs-12 col-sm-12 info-item area jumpItem" onClick={this.jumpOtherPage.bind(this,2)}>
						<span>所在地</span>
						<span className="text-item">{data.resp.area}</span>
						<img src="image/studentInfo/right1.png" className="info-img"/>
					</div>
	            </div>
	        );
		}else{
			return (<i></i>);
		}
        
    }
});
module.exports = StudentInfo_baseInfo;