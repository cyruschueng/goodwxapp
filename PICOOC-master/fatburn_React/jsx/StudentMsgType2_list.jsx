var React=require("react");

var StudentMsgType2_list_part=require("./StudentMsgType2_list_part.jsx");
//card2的单个打卡
var StudentMsgType2_list=React.createClass({
	render:function (){
		var getList2type = this.props.getList2type;
		var list=[];
		var noCardList;
		if(typeof getList2type.resp != "undefined"){
			var checkList = getList2type.resp.checkList;
			var xueYuanDaKaIndex = 0;
			for(var i=0,len=getList2type.resp.checkList.length;i<len;i++){
				if(checkList[i].type != 6){
					list.push(<StudentMsgType2_list_part xueYuanDaKaIndex={xueYuanDaKaIndex} getList2type_part={getList2type.resp.checkList[i]} getList2type_index={i} key={i} />);
					xueYuanDaKaIndex++;
				}
			}
			if(!publicData.hasNextBtn2){
				if(getList2type.resp.checkList.length>0){
					noCardList=<div className="cardListMessage" style={{display:"block"}}><span className="cardListLine"></span><br/><span>就这么多了～</span></div>;
				}
				else{
					noCardList=<div className="row noRecord" style={{display:"block"}}><span>暂无相关打卡记录哦～</span></div>;
				}
			}
			return (
				<article className="row list">
					{list}
					{noCardList}
				</article>
			);
		}
		else{
			return <span></span>;
		}
		
	}
})
module.exports = StudentMsgType2_list; 




