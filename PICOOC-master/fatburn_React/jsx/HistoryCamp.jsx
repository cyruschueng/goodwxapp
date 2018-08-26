var React=require("react");
var ReactDOM=require("react-dom");
var Public_error = require('./Public_error.jsx');
var CampStateContainer=React.createClass({

	getInitialState:function(){
		var me=this;
		me.historyCampFun();
		var titleData = {
			title:"历史燃脂营",
			color:"",
			opacity:"",
			backgroundColor:"",
			backgroundOpacity:""
		};
		titleData=JSON.stringify(titleData);
		appFc.controlTitle(titleData);

		return {
			historyCampData:{}
		}
	},


    historyCampFun:function(){
        var me = this;
        var historyCampUrl = ajaxLink + "/v1/api/campStu/getCampHistory" + window.location.search;
        //var historyCampUrl = "http://172.17.1.233:8080/v1/api/campStu/getCampHistory" + window.location.search;
        $.ajax({
            type:'get',
            url:historyCampUrl,
            success:function(data){
                if(data.code == 200){
                    console.log(historyCampUrl);
                    console.log('历史燃脂营', data);
                    me.setState({
                        historyCampData: data
                    });
                }else{
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                }

				$('.common .right').each(function(index){
					$('.common .right').eq(index).css('height',$('.common .right').eq(index).siblings('.left').height());
				});
			},
			error : function (){
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display","block");
				$(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		});
	},



    render:function(){
        var me = this;
        var data= me.state.historyCampData;
        if(typeof me.state.historyCampData.resp != "undefined"){
			var historyArr = data.resp;
			var historyList = [];
			historyArr.map(function (item, index) {
				historyList.push(
					<aside className="row common marginBottom"  key={index} onClick={me.goToHistory} data-id={item.id}>
						<div className="col-xs-6 col-sm-6 left">
							<span className="leftText">{item.name}</span>
						</div>
						<div className="col-xs-6 col-sm-6 right">
							<div className="rightInner"><span className="rightText">{item.beginTime}-{item.endTime}</span><img className="rightImg" src="https://cdn2.picooc.com/web/res/fatburn/image/sell/confirmOrder/more.png"/></div>
						</div>
					</aside>
				)
			});

			var myFatBurnStr=
				<section className="container" style={{display:"block"}}>
					{historyList}
				</section>;

		}
		return (
			<div>{myFatBurnStr}</div>
		);

	},
	componentDidMount:function(){
		var me = this;
	},

	goToHistory:function(event){

		var me = this;
		var data= me.state.historyCampData;
		var id = event.currentTarget.getAttribute("data-id");
		var url = "student.html" + window.location.search + "&targetCampId="+id + "&campId=" + id;
		if(isOutApp() || getParamByUrl("testtype")=="tanchao"){
			window.location.href=url;
		}
		else{
			var data2={
				link:absoluteUrl+"student.html" + window.location.search + "&targetCampId="+id + "&campId=" + id,
				animation: 1//默认1从右到左，2从下到上
			};
			data2=JSON.stringify(data2);
			appFc.openWebview(data2);
		}
		//window.location.href = "student.html" + window.location.search + "&targetCampId="+id + "&campId=" + id;
		
	}
});

var Component=React.createClass({
	render:function (){
		return (
			<div>
				<CampStateContainer />
				<Public_error />
			</div>
		);
	}
});

ReactDOM.render(
	<Component />,document.getElementById('campStateBox')
);