var React=require("react");


var StudentMsgType1_setcard=React.createClass({
	clickLink:function(event){
		//alert(2);
		event.stopPropagation();
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_WoYaoDaKa);
		window.location.href = 'setcard1.html'+window.location.search;
	},
	render:function (){
		return (
			<aside className="row setcard" onClick={this.clickLink}>
				<div className="setcard-img">
					<img src="http://cdn2.picooc.com/web/res/fatburn/image/student/checkCard.png" />
					<span>我要打卡</span>
				</div>
			</aside>
		);
	}
})
module.exports = StudentMsgType1_setcard; 




