var React=require("react");
var Fc_MsgTotol=require("./Fc_right_MsgTotol.jsx");
var Fc_comment=require("./Fc_comment.jsx");

var targetCampId=-1;
//点赞列表和评论列表
var RightStrMsgTotol=React.createClass({
	render:function (){
		var getList1type_partleft_item=this.props.getList1type_partleft_item;

		var getListPartIndex=this.props.getListPartIndex;
		if((getList1type_partleft_item.praises.length!=0) || (getList1type_partleft_item.evaluate.id!=null) || (getList1type_partleft_item.replys.length!=0)){
			return (
			<div className="col-xs-12 col-sm-12 partRight-msg">
					<RightStrZan getList1type_partleft_item={getList1type_partleft_item} getListPartIndex={getListPartIndex}  />

					<RightStrCoachComment getList1type_partleft_item={getList1type_partleft_item} getListPartIndex={getListPartIndex}  />

					<RightStrMsg getList1type_partleft_item={getList1type_partleft_item} getListPartIndex={getListPartIndex}  />
			</div>
			)
		}
		else{
			return (
				<div className="col-xs-12 col-sm-12 partRight-msg partRight-msg2"></div>
			);
		}
		return <i></i>

	}
})
//右边部分点赞列表处理
var RightStrZan=React.createClass({
	render:function (){

		var getList1type_partleft_item=this.props.getList1type_partleft_item;
		
		var getListPartIndex=this.props.getListPartIndex;
		var strZan=[];
		if(getList1type_partleft_item.praises.length!=0){
			var arrMsgZan=["msgZanName1","msgZanName2"];
			var key=0;
			for(var j=0;j<getList1type_partleft_item.praises.length;j++){
				var msgZanBtn=0;
				if(getList1type_partleft_item.praises[j].isCoach){
					msgZanBtn=1;
					if(j==getList1type_partleft_item.praises.length-1){
						strZan.push(<a className={'zanSize '+arrMsgZan[msgZanBtn]} key={key} data-target_role_id={getList1type_partleft_item.praises[j].praiseRoleId} data-target_camp_id={targetCampId}><span>{getList1type_partleft_item.praises[j].praiseRoleName}</span></a>);
					}
					else{
						strZan.push(<a className={'zanSize '+arrMsgZan[msgZanBtn]} key={key} data-target_role_id={getList1type_partleft_item.praises[j].praiseRoleId} data-target_camp_id={targetCampId}><span>{getList1type_partleft_item.praises[j].praiseRoleName}</span><span className="dot">，</span></a>);
					}
				}
				else{
					if(j==getList1type_partleft_item.praises.length-1){
						strZan.push(<a className={'zanSize '+arrMsgZan[msgZanBtn]} key={key} data-target_role_id={getList1type_partleft_item.praises[j].praiseRoleId} data-target_camp_id={targetCampId} onClick={Fc_MsgTotol.bindStudentInfo}><span>{getList1type_partleft_item.praises[j].praiseRoleName}</span></a>);
					}
					else{
						strZan.push(<a className={'zanSize '+arrMsgZan[msgZanBtn]} key={key} data-target_role_id={getList1type_partleft_item.praises[j].praiseRoleId} data-target_camp_id={targetCampId} onClick={Fc_MsgTotol.bindStudentInfo}><span>{getList1type_partleft_item.praises[j].praiseRoleName}</span><span className="dot">，</span></a>);
					}
				}
				key++;
			}
			var msgZanNone="";
			if(getList1type_partleft_item.replys.length==0){
				msgZanNone="msgZanNone";
			}
			return (
				<div className={"row msgZan "+msgZanNone}>
					<img src="https://cdn2.picooc.com/web/res/fatburn/image/cardShare/notDianZan.png" />{strZan}
				</div>
			);
		}
		return <i></i>;
		/*if(strZan!="" || strMsg!=""){
			strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg">'+strZan+strMsg+'</div>';
		}
		else{
			strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg partRight-msg2"></div>';
		}*/
	}
})
//中间教练评价
var RightStrCoachComment=React.createClass({
	render:function (){
		var getList1type_partleft_item=this.props.getList1type_partleft_item;
		var getListPartIndex=this.props.getListPartIndex;




		var coachComment = getList1type_partleft_item.evaluate;

		/*var coachCommentNone="";
		if(getList1type_partleft_item.replys.length==0){
			coachCommentNone="coachCommentNone";
		}*/


		//如果有教练评价
		//alert(coachComment.id);
		//alert(coachComment.id != null);
		if(coachComment.id != null){

			//星星显示规则
			var haveStar = coachComment.starLevel;
			var starShow = [];
			if(haveStar > 0){
			for(var i=0; i<haveStar; i++){
				starShow.push(
					<img className="star" src="https://cdn2.picooc.com/web/res/fatburn/image/student/haveStar.png" alt="" key={i}/>
				)
			}
			for(var j=0; j<(5-haveStar); j++){
				starShow.push(
					<img className="star" src="https://cdn2.picooc.com/web/res/fatburn/image/student/noStar.png" alt="" key={j+5}/>
				)
			}
			}
			//标签字符串
			var labelStr =
				((coachComment.proteinText != null) && (coachComment.proteinText != '')? coachComment.proteinText+'，':'')+
				((coachComment.waterText != null) && (coachComment.waterText != '')? coachComment.waterText+'，':'')+
				((coachComment.fatText != null) && (coachComment.fatText != '')? coachComment.fatText+'，':'')+
				((coachComment.vegetablesText != null) && (coachComment.vegetablesText != '')? coachComment.vegetablesText+'，':'')+
				((coachComment.performanceText != null) && (coachComment.performanceText != '')? coachComment.performanceText+'，':'')+
				((coachComment.cookingText != null) && (coachComment.cookingText != '')? coachComment.cookingText+'，':'');
			labelStr = labelStr.substring(0, labelStr.length-1);
			//console.log('教练评价', coachComment);

			//data-check_id={getList1type_partleft_item.id} data-reply_id={getList1type_partleft_item.replys[j].id} data-reply_role_id={getList1type_partleft_item.replys[j].roleId} data-part_index={parseInt(getListPartIndex)} data-comment_index={j} data-role_name={getList1type_partleft_item.replys[j].roleName}
			return (
				<div className={"coachComment"} data-check_id={coachComment.checkId} data-apptype='1' data-reply_id={coachComment.id} data-reply_role_id={coachComment.replyRoleId} data-part_index={parseInt(getListPartIndex)} data-role_name={coachComment.replyRoleName}  onClick={Fc_comment.bindMsg}>
					<div className="aboutSay">
						<div className="comments">
							<span className="key">{coachComment.replyRoleName}教练回复：</span>
							<span className="haveStarWrap" style={{'display':(haveStar > 0)? 'inline-block':'none'}}>{starShow}</span>
							<span className="number" style={{'display':(haveStar > 0)? 'inline-block':'none'}}>{haveStar+'.0'}</span>
						</div>
						<div className="desc">
							{labelStr}
						</div>
						<div className="desc">
							{coachComment.content}
						</div>
					</div>
				</div>
			);
		}else{
			return <i></i>;
		}
	}
});


//右边部分评论列表
var RightStrMsg=React.createClass({
	render:function (){
		var me = this;
		var getList1type_partleft_item=this.props.getList1type_partleft_item;
		//console.log('学员评价',getList1type_partleft_item);
		
		var getListPartIndex=this.props.getListPartIndex;
		var strMsg=[];

		//仅展现最新的两条留言回复，其他的收起为“共*条回复>”；
		//后端提供消息列表需要按照新-旧顺序排列
		if(getList1type_partleft_item.replys.length!=0){

			var moreMsgBtn = <i></i>;

			var messageLength = getList1type_partleft_item.replys.length;

            //在student.html显示“共*条回复>”， 在info页面不显示 （info页面有checkId参数）
			if(messageLength>2 && getParamByUrl('checkId') == 'false'){
				messageLength = 2;
				moreMsgBtn =
					<div className="moreMsg">
						<span className="" onClick={me.goToMoreMsgFun} data-check-id={getList1type_partleft_item.replys[0].checkId}>共 <span className="messageNumber">{getList1type_partleft_item.replys.length}</span>条回复<img src="https://cdn2.picooc.com/web/res/fatburn/image/student/moreMsg2.png" alt="" className="moreMsgImg"/></span>
					</div>
			}
			for(var j=0;j<messageLength;j++){
				var strMsgName=[];
				var arrIsCoach=["msgInfo-name","msgInfo-name2"];
				var arrIsCoachBtn=0;
				var arrIsCoachBtn2=0;
				var headIsCoach="no";
				if(getList1type_partleft_item.replys[j].isCoach){
					arrIsCoachBtn=1;
					headIsCoach="yes";
				}
				if(getList1type_partleft_item.replys[j].isReplyCoach){
					arrIsCoachBtn2=1;
				}
				
				if(getList1type_partleft_item.replys[j].level==1){
					if(arrIsCoachBtn==1){
						strMsgName.push(
							<span className="msgInfo-msg" key={j} data-check_id={getList1type_partleft_item.id} data-reply_id={getList1type_partleft_item.replys[j].id} data-reply_role_id={getList1type_partleft_item.replys[j].roleId} data-part_index={parseInt(getListPartIndex)} data-comment_index={j} data-role_name={getList1type_partleft_item.replys[j].roleName} onClick={Fc_comment.bindMsg}>
								<span className={arrIsCoach[arrIsCoachBtn]} data-head_is_coach="yes" data-target_role_id={getList1type_partleft_item.replys[j].roleId} data-target_camp_id={targetCampId}>{getList1type_partleft_item.replys[j].roleName}<span className="msgInfo-name-dot">：</span></span>
								<span style={{display:"inline"}} dangerouslySetInnerHTML={{__html:getList1type_partleft_item.replys[j].content}}></span>
							</span>
						);
					}
					else{
						strMsgName.push(
							<span className="msgInfo-msg" key={j} data-check_id={getList1type_partleft_item.id} data-reply_id={getList1type_partleft_item.replys[j].id} data-reply_role_id={getList1type_partleft_item.replys[j].roleId} data-part_index={parseInt(getListPartIndex)} data-comment_index={j} data-role_name={getList1type_partleft_item.replys[j].roleName} onClick={Fc_comment.bindMsg}>
								<a className={arrIsCoach[arrIsCoachBtn]} data-target_role_id={getList1type_partleft_item.replys[j].roleId} data-target_camp_id={targetCampId} onClick={Fc_MsgTotol.bindStudentInfo}>{getList1type_partleft_item.replys[j].roleName}<span className="msgInfo-name-dot">：</span></a>
								<span style={{display:"inline"}} dangerouslySetInnerHTML={{__html:getList1type_partleft_item.replys[j].content}}></span>
							</span>
						);
					}
				
				}
				else{
					if(arrIsCoachBtn2==1){
						strMsgName.push(
							<span  className="msgInfo-msg" key={j} data-check_id={getList1type_partleft_item.id} data-reply_id={getList1type_partleft_item.replys[j].id} data-reply_role_id={getList1type_partleft_item.replys[j].roleId} data-part_index={parseInt(getListPartIndex)} data-comment_index={j} data-role_name={getList1type_partleft_item.replys[j].roleName} onClick={Fc_comment.bindMsg}>
								<a className={arrIsCoach[arrIsCoachBtn]} data-target_role_id={getList1type_partleft_item.replys[j].roleId} data-target_camp_id={targetCampId}>{getList1type_partleft_item.replys[j].roleName}</a>
									<span className="msgInfo-name-info">回复</span>
								<span className={arrIsCoach[arrIsCoachBtn2]} data-head_is_coach="yes" data-target_role_id={getList1type_partleft_item.replys[j].replyRoleId} data-target_camp_id={targetCampId}>{getList1type_partleft_item.replys[j].replyRoleName}<span className="msgInfo-name-dot">：</span></span>
								<span style={{display:"inline"}} dangerouslySetInnerHTML={{__html:getList1type_partleft_item.replys[j].content}}></span>
							</span>
						);
					}
					else{
						strMsgName.push(
							<span  className="msgInfo-msg" key={j} data-check_id={getList1type_partleft_item.id} data-reply_id={getList1type_partleft_item.replys[j].id} data-reply_role_id={getList1type_partleft_item.replys[j].roleId} data-part_index={parseInt(getListPartIndex)} data-comment_index={j} data-role_name={getList1type_partleft_item.replys[j].roleName} onClick={Fc_comment.bindMsg}>
								<a className={arrIsCoach[arrIsCoachBtn]} data-target_role_id={getList1type_partleft_item.replys[j].roleId} data-target_camp_id={targetCampId}>{getList1type_partleft_item.replys[j].roleName}</a>
									<span className="msgInfo-name-info">回复</span>
								<a className={arrIsCoach[arrIsCoachBtn2]} data-target_role_id={getList1type_partleft_item.replys[j].replyRoleId} data-target_camp_id={targetCampId}>{getList1type_partleft_item.replys[j].replyRoleName}<span className="msgInfo-name-dot">：</span></a>
								<span style={{display:"inline"}} dangerouslySetInnerHTML={{__html:getList1type_partleft_item.replys[j].content}}></span>
							</span>
						);
					}
					
				}
				strMsg.push(<div className="row msgInfo" key={j}>
								<a className="msgInfo-headerHref" data-head_is_coach={headIsCoach} data-target_role_id={getList1type_partleft_item.replys[j].roleId} data-target_camp_id={targetCampId} onClick={Fc_MsgTotol.bindStudentInfo}><img className="msgInfo-header" src={getList1type_partleft_item.replys[j].roleImg} onError={imgError.bind(this,getList1type_partleft_item.replys[j].roleSex)} /></a>
								<div className="col-xs-12 col-sm-12 msgInfo-mian">
									{strMsgName}
								</div>
							</div>);
			}
			strMsgName.push(
				moreMsgBtn
			);
			return (
				<div className="row">
					{strMsg}
				</div>
			);
		}
		return <i></i>;
	},
	//跳转到打卡详情
	goToMoreMsgFun:function(event){
		event.stopPropagation();
		var checkId = event.currentTarget.getAttribute("data-check-id");
		//打开一个新的webWiew
		var url = absoluteUrl+"info.html"+window.location.search+"&checkId="+checkId;
		var getPageInfo = function () {
			var data = {
				link: url,
				animation: 1//默认1从右到左，2从下到上
			};
			return JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && getParamByUrl("testtype")!="tanchao") {
			appFc.openWebview(getPageInfo());
		} else {
			window.location.href = url;
		}
	}
})
module.exports = RightStrMsgTotol; 




