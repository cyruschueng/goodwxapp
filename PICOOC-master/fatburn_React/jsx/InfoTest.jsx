var React = require("react");
var ReactDOM = require("react-dom");
//数据错误提示
var Public_error=require("./Public_error.jsx");
var Public_loading1 = require("./Public_loading1.jsx");

var ShareInfo = React.createClass({
	getInitialState:function(){
	    var me = this;
	    var titleData = {
            title:"分享",
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        titleData=JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        me.getShare();
	    me.getList();
	    return {
	    	shareArr:[]
	    }
	},
	getShare:function(){
		//右上角
		var iconUrl = "";
		var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
		if (getParamByUrl("os") == "android") {
			iconUrl = iconShare[0];
		}else {
			iconUrl = iconShare[1];
		}
		var getPageInfo2 = function (){
			var data5 = {
				iconType:0,//0走图片逻辑，1走文案逻辑
				rightStr:{
					str:"",
					color:"",
					opacity:"",
					id:"0"
				},
				rightIcon:[{
					type:"1",
					id:"1",
					functionName:"",
					iconUrl:iconUrl,
					iconName:"分享",
					redDotType:"1",
					redDotShow:false,
					redDotNum:"0",
					nativeType:"0",
					content:{
						shareTitle:'有品·燃脂营',
						shareUrl:"",
						shareIcon:"",
						shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
						shareTag:"",
						shareType:2,
						shareBackgroundColor:"",
						shareTypeDesc:"",
						fatBurnName:""
					}
				}]
			};
			return JSON.stringify(data5);
		};
		appFc.controlRight(getPageInfo2());
	},
	componentDidMount  :function(){
		this.pStartLoading();
	},
	componentDidUpdate :function(){
		var os=getParamByUrl("os");
	    if( os == "android" ){
			$(".container").css("minHeight",$(window).height()-70);
		}else{
			$(".container").css("minHeight",$(window).height()-68);
		}

		if($(".cardContainer").height() < (parseInt($(".container").css("minHeight")) - 3*fontHeight) ){
			var marginTop=( parseInt($(".container").css("minHeight")) -$(".cardContainer").height())*0.2;
			$(".cardContainer").css("marginTop",marginTop);
		}else{
			$(".cardContainer").css("marginTop","1.5rem");
			$(".cardContainer").css("marginBottom","1.5rem");
		}

		this.pStopLoading();
		$(".cardContainer").css("display","block");
		if($(".info-content").height() == fontHeight*2){
			$(".info-content").css("text-align","center");
		}
	},
	getList:function(){
		var me = this;
		//me.pStartLoading();
		/*loading();*/
		var finalUrl=ajaxLink+"/v1/api/camp/checkDetail"+window.location.search+"&type=1";
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					me.setState({shareArr:data});
				}else{
		            $(".error-main-t").html(data.result.message);
		            $(".errorAlert").css("display","block");
		            $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
	},
	pStartLoading:function(){
		var me = this;
		me.refs.getLoading.startLoading();
	},
	pStopLoading:function(){
		var me = this;
		me.refs.getLoading.stopLoading();
	},
	render:function (){
		var me = this;
		var data = me.state.shareArr;
		var imgArr = [];
		var cardTop,cardUserInfo,cardInfo,cardBottom;
		if(typeof data.resp != "undefined"){
			//打卡分享头部
			if(data.resp.imgs.length > 0){
				for(var i=0;i<data.resp.imgs.length;i++){	
					var picWidth=$(window).width()-parseInt(3*fontHeight);
					// if(i == 0){
						if(i == 0){
							imgArr.push(<div key={i} className="col-xs-12 col-sm-12 pic-item pic-item-left pic-item-right"><img src={data.resp.imgs[i].url} style={{'width':'100%'}}/></div>);
						}else{
							imgArr.push(<div key={i}  className="col-xs-12 col-sm-12 pic-item" ><img src={data.resp.imgs[i].url} style={{"width":"100%"}}/></div>);
						}
						{/* imgArr.push(<div key={i} className="col-xs-12 col-sm-12 pic-item pic-item-left pic-item-right" style={{backgroundImage:"url("+data.resp.imgs[i].url+")",height:picWidth*0.75}}></div>); */}
					{/* }else{
						imgArr.push(<div key={i} className="col-xs-12 col-sm-12 pic-item" style={{backgroundImage:"url("+data.resp.imgs[i].url+")",height:picWidth*0.75}}></div>);
					} */}
					
				}
				cardTop = <div className="row cardPic_item">{imgArr}</div>;
			}else{
				cardTop = <div className="row cardTop" style={{display: "block"}}></div>
			}
			//打卡分享个人信息部分
			cardUserInfo =  <div className="row cardHeader">
								<img src={data.resp.roleImg} onError={imgError.bind(this,data.resp.roleSex)} />
								<div>{data.resp.roleName}</div>
							</div>;


			if(data.resp.content == "" || data.resp.content == null){
				//打卡分享个人信息部分
				cardUserInfo =  <div className="row cardHeader" style={{backgroundColor:"#00bfb3",color:"#fff"}}>
									<img src={data.resp.roleImg} onError={imgError.bind(this,data.resp.roleSex)} />
									<div className="shareLine">{data.resp.roleName}</div>
								</div>;
			}else{
				//打卡分享个人信息部分
				cardUserInfo =  <div className="row cardHeader">
									<img src={data.resp.roleImg} onError={imgError.bind(this,data.resp.roleSex)} />
									<div>{data.resp.roleName}</div>
								</div>;
				cardInfo =  <div className="row cardInfo">
								<div className="info-quote-left"></div>
								<div className="info-content" dangerouslySetInnerHTML={{__html:data.resp.content}}></div>
								<div className="info-quote-right"></div>
							</div>
			}

			//打卡时间，打卡类型
			var cardType=["早餐","午餐","晚餐","加餐","运动"];
			var cardBottom = 	<div className="row cardBottom">
									<div>有品燃脂营 •&nbsp;<span className="cardType">{cardType[data.resp.type]}</span>打卡</div>
									<div className="cardTime">{data.resp.checkDay+" "+data.resp.checkTime}</div>
								</div>	
		}
		/*me.pStopLoading();
		$(".cardContainer").css("display","block");*/
		return (
			<div className="container">
				<div className="cardContainer">
					<div className="row cardPic">
						{cardTop}
						{cardUserInfo}
					</div>
					{cardInfo}
					{cardBottom}
				</div>
				<Public_loading1 ref="getLoading" />
			</div>
		);
	}
})

var Component = React.createClass({
	render:function (){
		return (
			<div>
				<ShareInfo />
				<Public_error />
			</div>
		);
	}
})

ReactDOM.render(
	<Component />,document.getElementById('infoMain')
);