class Tab{
	constructor(props) {
		this.tabs = props.tabs;
		this.offset = props.offset||0;
		this.num = props.tabs.length;
		this.tabData = [];
		this.hlLeftData = [];
		this.tabs.forEach((v,k)=>{
			this.tabData.push({
				name:v.name,
				style:'width:'+750/this.num+'rpx',
				extra : v.extra,
				param:JSON.stringify({
					index:k
				})
			});
			this.hlLeftData.push(((750/this.num)*k+this.offset)+'rpx');
			if(v.isSelect){
				this.initalIndex = k;
			}
		});
	}
	change(e){
		var ret = this.renderData || {};
		var index = this.initalIndex || 0;
		if(e){
			index = JSON.parse(e.currentTarget.dataset.param).index;
		}
		this.tabData = this.tabData.map((v,k)=>{
			if(k===index){
				v.isCur = true
			}else{
				v.isCur = false
			}
			return v;
		});
		ret = {
			tabData:this.tabData,
			hlLeft:this.hlLeftData[index],
			curData:this.tabs[index].data
		}
		return ret;
	}
}

module.exports = Tab;