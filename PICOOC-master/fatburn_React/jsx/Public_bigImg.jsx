var React=require("react");
var Fc_bindBigImg=require("./Fc_bindBigImg.jsx");
//图片放大预览方法，需要单独引入Fc_bindBigImg.jsx
//引入方法
// PubSub.subscribe("bigImgData",function(evName,bigImgData){
//         	//添加大图预览
//           	this.setState({bigImgArr:bigImgData});
//         }.bind(this));
//bigImgArr为数组
// objImg:{
	
// }
var Public_bigImg=React.createClass({
	render:function (){
		var bigImgArr=this.props.bigImgArr;
		var list=[];
		var paginationList=[];
		console.log(publicData.objImg);
		for(var i=0;i<bigImgArr.length;i++){
			list.push(<div className="col-xs-12 col-sm-12 swiper-slide bigImg-li"  key={i} data-index={i} style={{backgroundImage:'url('+bigImgArr[i].url+')'}} onTouchStart={Fc_bindBigImg.imgTouchStart.bind(this)} onTouchMove={Fc_bindBigImg.imgTouchMove.bind(this)} onTouchEnd={Fc_bindBigImg.imgTouchEnd.bind(this)}></div>);
		}
		if(bigImgArr.length>1){
			for(var i=0;i<bigImgArr.length;i++){
				paginationList.push(<span className="swiper-pagination-bullet" key={i}></span>);
			}
			
		}	

		return (
			<div className="row">
				<aside className="row swiper-container swiper-container-bigImg bigImg">
					<div className="row swiper-wrapper bigImg-main">
						{list}
					</div>
					<div className="swiper-pagination swiper-pagination-bigImg swiper-pagination-report">{paginationList}</div>
				</aside>
				<div className="saveImg-ceng" onTouchStart={Fc_bindBigImg.saveImgCengTouchStart}>
					<aside className="row saveImg">
						<div className="col-xs-12 col-sm-12 saveImg-btn saveImg-item" onTouchStart={Fc_bindBigImg.saveImgBtnTouchStart}>保存图片</div>
						<div className="col-xs-12 col-sm-12 cancelImg-btn saveImg-item" onTouchStart={Fc_bindBigImg.cancelImgBtnTouchStart}>取消</div>
					</aside>
				</div>
			</div>
		);
	}
})
module.exports = Public_bigImg; 




