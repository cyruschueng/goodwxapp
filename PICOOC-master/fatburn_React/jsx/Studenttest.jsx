var React=require("react");
var ReactDOM=require("react-dom");
var PubSub = require("pubsub-js");
var StudentTop=require("./StudentTop.jsx");
var StudentMsgType1=require("./StudentMsgType1.jsx");
var pageIndex=1;
var joinDate=0;
var tabBtn=true;
var objImg={};
var card1=require("./card1.js");
var tt=0;
var time=0;
var pageIndex2=0;
card1();
window.q=function(){
	tt=2;
}

var Student=React.createClass({
	getInitialState:function(){
		this.aaa();
		var me=this;
		/*$("body").click(function(){
			me.aaa();
		});*/
        return {
            b:{},
            dd:tt
        }
    },
    componentDidMount:function(){
        PubSub.subscribe("delect",function(){
            //b.resp.checkList=b.resp.checkList.splice(0,1);
            var c=this.state.b;
            c.resp.checkList.splice(0,1);
            this.setState({b:c});
        }.bind(this)); 
    },
    ccc:function(){
    	alert("ccc");
    },
	aaa:function(){
		var me=this;
		var ajaxStr2;
		if(pageIndex2==0){
			ajaxStr2="&count="+5;
		}
		else{
			ajaxStr2="&count="+5+"&time="+time;
		}
		var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&type=1&targetRoleId=964235&checkType=9"+ajaxStr2;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					console.log(typeof data.resp.checkList);
					if(pageIndex2>0){
						data.resp.checkList=me.state.b.resp.checkList.concat(data.resp.checkList);
					}
					pageIndex2++;
					time=data.resp.time;

					
					me.setState({b:data});
					console.log(data);

				}
				else{
					me.setState({b:data});
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
	},
	render:function (){
		console.log(this.state.dd);
		
		
		return (
			<div className="row">
				<StudentTop b={this.state.b} />
				<StudentMsgType1 />
			</div>
		);
	}
})
ReactDOM.render(
    <Student />,
    document.getElementById('main')
);



