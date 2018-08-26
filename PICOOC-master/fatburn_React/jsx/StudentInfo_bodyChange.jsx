var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");

var SWoDeGeRenZhuYe={
    SWoDeGeRenZhuYe_ChaKanTiZhong:5061204,//查看体重
    SWoDeGeRenZhuYe_ChaKanZhiFang:5061205,//查看脂肪
    SWoDeGeRenZhuYe_ChaKanYaoWei:5061206,//查看腰围
};

//折线图相关方法
var Fc_bindChartImg = require("./Fc_bindChartImg.jsx");

var train={};
var StudentInfo_bodyChange = React.createClass({
	getInitialState:function(){
        var me = this;
        //me.getBodyChange(publicData.targetRoleId);
        train.jumpStudentBody=this.jumpStudentBody;
        return {
        	bodyChange:[],
        	weightNum:[],
			fatNum:[],
			waistNum:[]
        }
    },
    btnClick:function(event){
		$(".info-tab-btn").removeClass("active");
		$(event.currentTarget).addClass("active");
		if($(event.currentTarget).hasClass("tag-weight")){
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanTiZhong);
			$(".weightContent").css("display","block");
			$(".fatContent").css("display","none");
			$(".waistContent").css("display","none");
		}else if($(event.currentTarget).hasClass("tag-fat")){
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanZhiFang);
			$(".weightContent").css("display","none");
			$(".fatContent").css("display","block");
			$(".waistContent").css("display","none");
		}else{
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanYaoWei);
			$(".weightContent").css("display","none");
			$(".fatContent").css("display","none");
			$(".waistContent").css("display","block");
		}
	},
	getBodyChange:function(targetRoleId){
		var me = this;
		/*var chartName = me.props.chartName;*/
		//alert(chartName);
		var host=window.location.protocol+"//"+window.location.host;
		var finalUrl=host+"/v1/api/camp/getBodyChange"+window.location.search+"&targetRoleId="+targetRoleId;
		/*var finalUrl=host+"/v1/api/camp/getBodyChange?roleId="+roleId;*/
		console.info(finalUrl);
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					//画图区域--开始
					if(data.resp.fat.length >0 || data.resp.weight.length >0 || data.resp.bodyMeasure.length >0){
						$(".chartContent").css("display","block");
						$(".message").css("display","none");
						$(".message").css("bodyMessage","none");
						//画图区域--开始
						$(".line").css("height",$(window).width()/750*120);
						$(".lineNum").css("height",$(window).width()/750*158);
						$("#weight").css("width",$(".chartBottom").width()*0.8);
						$("#fat").css("width",$(".chartBottom").width()*0.8);
						$("#waist").css("width",$(".chartBottom").width()*0.8);
						//体重折线图
						var weightArr=data.resp.weight;
						var weightEntity={
							"originArr":weightArr,             //初始数组		
							"chartID":"weight",					//折线canvas的id名称
							"chartNumID":"weightNum",			//折线点的区域的名称
							"lineFillColor":"#c1e9fb",			//折线填充颜色
							"lineStrokeColor":"#1daffa",		//折线颜色
							"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
							"dotFillColor1":"#d2effe",			//折线点的外圈颜色
							"dotFillColor2":"#1daffa",			//折线点的内圈颜色
							"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
							"waveHeight":(2*parseFloat($("html").css("font-size")))
						};
						Fc_bindChartImg.getLineChart(weightEntity);

						//体脂折线图
						var fatArr=data.resp.fat;
						var fatEntity={
							"originArr":fatArr,            		//初始数组		
							"chartID":"fat",					//折线canvas的id名称
							"chartNumID":"fatNum",			//折线点的区域的名称
							"lineFillColor":"#c1e9fb",			//折线填充颜色
							"lineStrokeColor":"#1daffa",		//折线颜色
							"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
							"dotFillColor1":"#d2effe",			//折线点的外圈颜色
							"dotFillColor2":"#1daffa",			//折线点的内圈颜色
							"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
							"waveHeight":(2*parseFloat($("html").css("font-size")))
						};
						Fc_bindChartImg.getLineChart(fatEntity);

						//体围（胸围）折线图
						var waistArr=data.resp.bodyMeasure;
						var waistEntity={
							"originArr":waistArr,            		//初始数组		
							"chartID":"waist",					//折线canvas的id名称
							"chartNumID":"waistNum",			//折线点的区域的名称
							"lineFillColor":"#c1e9fb",			//折线填充颜色
							"lineStrokeColor":"#1daffa",		//折线颜色
							"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
							"dotFillColor1":"#d2effe",			//折线点的外圈颜色
							"dotFillColor2":"#1daffa",			//折线点的内圈颜色
							"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
							"waveHeight":(2*parseFloat($("html").css("font-size")))
						};
						var chart = Fc_bindChartImg.getLineChart(waistEntity);
						me.setState({
					       	weightNum:chart.weightNum,
					       	fatNum:chart.fatNum,
					       	waistNum:chart.waistNum
					    });
						/*console.info("取值");
						console.info(Fc_bindChartImg.getLineChart(waistEntity,chartName));*/
						//画图区域--结束
					}else{
						$(".chartContent").css("display","none");
						$(".message").css("display","block");
						$(".bodyMessage").css("display","block");
					}
					me.setState({bodyChange:data});

				}else{
		                $(".error-main-t").html("服务器开小差了～");
		                $(".errorAlert").css("display","block");
		                $(".error-main").css("margin-top",-$(".error-main").height()/2);
					$(".bodyChange").css("display","none");
				}
			}
		});
	},
	jumpBodyChange:function(){
		var bodyUrl='bodyChange.html'+location.search;
		setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_GengDuoZhiBiaoBianHua);
		this.openNewWebview(bodyUrl);
	},
	openNewWebview:function(url){
        url=absoluteUrl+url;
        console.info(url);
        var getPageInfo = function (){
            var data = {
                link:url,
                animation: 1//默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };

		var deviceType=isMobile();
		if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
			appFc.openWebview(getPageInfo());
		}else{
			window.location.href=url;
		}
    },
    jumpStudentBody:function(){
    	var data = this.state.bodyChange;
    	var targetRoleId = getParamByUrl("targetRoleId");

    	if(data.resp.pictureCount && data.resp.pictureCount==1){
			var deviceType=isMobile();//判断是不是app的方法
			if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
				var data1={
					link:absoluteUrl+"photoAlbumTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId,
				    animation: 1//默认1从右到左，2从下到上
				};
				data1=JSON.stringify(data1);

				appFc.openWebview(data1);
			}else{
				$(".changeList-main2").attr("href","photoAlbumTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId);
			}
			event.stopPropagation();
		}else{
			var deviceType=isMobile();//判断是不是app的方法
			if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
				var data2={
					link:absoluteUrl+"figureContrastTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId,
				    animation: 1//默认1从右到左，2从下到上
				};
				data2=JSON.stringify(data2);
				appFc.openWebview(data2);
			}else{
				$(".changeList-main2").attr("href","figureContrastTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId);
			}
			event.stopPropagation();	
		}
    },
	render:function (){
    	var me = this;
    	console.info("---------");
    	console.info(me.state.bodyChange);
    	var data = me.state.bodyChange;
    	var wFlagSrc="";
		var wChangePar="";
		var fFlagSrc="";
		var fChangePar="";
    	if(typeof data.resp != "undefined"){
			//体重变化--开始
    		
			if(data.resp.wChange == "--"){
				$(".wFlag").css("display","none");
				wChangePar = <span className="wChangePar"><span className="wChange">{data.resp.wChange}</span></span>;
			}else{

				
				if(data.resp.wFlag == "1"){
					wFlagSrc = "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png";
					wChangePar = <span className="wChangePar" style={{color:"#fb5562"}}><span className="wChange">{data.resp.wChange}</span>KG</span>;
					/*$(".wChangePar").css("color","#fb5562");*/
				}else if(data.resp.wFlag == "2" || data.resp.wChange == "0"){
					wFlagSrc = "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png";
					wChangePar = <span className="wChangePar" style={{color:"#75cc2c"}}><span className="wChange">{data.resp.wChange}</span>KG</span>;
					/*$(".wChangePar").css("color","#75cc2c");*/
				}
			}

			if(data.resp.fChange == "--"){
				$(".fFlag").css("display","none");
				fChangePar = <span className="fChangePar"><span className="fChange">{data.resp.fChange}</span></span>;
			}else{
				
				
				if(data.resp.fFlag == "1"){
					$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
					fChangePar = <span className="fChangePar" style={{color:"#fb5562"}}><span className="fChange">{data.resp.fChange}</span>%</span>;
				}else if(data.resp.fFlag == "2" || data.resp.fChange == "0"){
					$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png");
					fChangePar = <span className="fChangePar" style={{color:"#75cc2c"}}><span className="fChange">{data.resp.fChange}</span>%</span>;
				}
			}
			//体重变化--结束

			//判断是否为教练，如果是教练，展示Ta的方案和Ta的身材
			var myRoleId=getParamByUrl("roleId");
			var coachRoleId=data.resp.coachRoleId;
			var targetRoleId = getParamByUrl("targetRoleId");
			var changeArea;
			var trainUrl = 'trainPlan.html'+location.search;
			//var changeList2Jump=me.jumpStudentBody;
			if( myRoleId == coachRoleId ){
				changeArea =    <article className="row change" style={{display:"block"}}>
									<div className="col-xs-6 col-sm-6 changeList changeList1">
										<a className="row changeList-main1" href={trainUrl}>
											<div className="col-xs-12 col-sm-12 changeList-icon">
												<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/plan.png" />
											</div>
											<div className="col-xs-12 col-sm-12 changeList-p myPlan">Ta的方案</div>
										</a>
									</div>
									<div className="col-xs-6 col-sm-6 changeList changeList2">
										<a className="row changeList-main2" onClick={train.jumpStudentBody}>
											<div className="col-xs-12 col-sm-12 changeList-icon">
												<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/body.png" />
											</div>
											<div className="col-xs-12 col-sm-12 changeList-p myBody">Ta的身材</div>
										</a>
									</div>
								</article>	;		
			}else{
				changeArea = <i></i> ;
			}

			
    	}
    	return (
            <div className="row page3">
                <div className="row chartTop">
					<div className="row top">
						<div className="col-xs-6 col-sm-6 chartTag-item">
							<div>体重变化</div>
							<div>
								<img className="wFlag" src={wFlagSrc} />
								{wChangePar}
							</div>
						</div>
						<div className="col-xs-6 col-sm-6 chartTag-item">
							<div>脂肪变化</div>
							<div>
								<img className="fFlag" src={fFlagSrc} />
								{fChangePar}
							</div>
						</div>
					</div>
					<div className="userBody" onClick={me.jumpBodyChange}>
						<span>更多指标变化</span>
						<img src="image/studentInfo/right.png" />
					</div>
				</div>
				<div className="row chartContent">
					<div className="row chartTag">
						<span className="col-xs-4 col-sm-4 tag-weight info-tab-btn active" data-index="0" onClick={me.btnClick}>体重</span>
						<span className="col-xs-4 col-sm-4 tag-fat info-tab-btn" data-index="1"  onClick={me.btnClick}>脂肪</span>
						<span className="col-xs-4 col-sm-4 tag-waist info-tab-btn" data-index="2"  onClick={me.btnClick}>腰围</span>
					</div>
					<div className="row chartBottom weightContent">
						<canvas className="line" id="weight" width="100px" height="100px"></canvas>
						<div id="weightNum" className="lineNum">{this.state.weightNum}</div>
					</div>
					<div className="row chartBottom fatContent">
						<canvas className="line" id="fat" width="100px" height="100px"></canvas>
						<div id="fatNum" className="lineNum">{this.state.fatNum}</div>
					</div>
					<div className="row chartBottom waistContent">
						<canvas className="line" id="waist" width="100px" height="100px"></canvas>
						<div id="waistNum" className="lineNum">{this.state.waistNum}</div>
					</div>
				</div>
				{changeArea}

            </div>
        );     
    }
});
module.exports = StudentInfo_bodyChange;