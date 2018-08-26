var ajax = require('../request/request');

class List{
	constructor(props) {
		props = props || {};
		this.setConfig(props);
	}
	setConfig(props){
		this.url = props.url;//请求地址
		this.param = props.param;//请求参数
		this.render = props.render;//渲染函数
		this.isSingle = props.isSingle || false//是否分页，默认为true，
		this.getList = props.getList;
		this.getHasMore = props.getHasMore;

		this.curData = [];//当前新增数据
		this.totalData = [];//全部数据
		this.curPage = 0;//当前页码
		this.isLast = false;
		this.isLock = false;  
	}
	next(){//下一页
		if(this.isLast || this.isLock){
			return;
		}
		this.isLock = true;
		if(!this.isSingle){
			this.curPage = this.curPage + 1;
		}
		var self =this;
		this.getData(this.curPage,function(res){
			self.isLock = false;
			if(res.data ){
				self.curData = res.data.list;
				if(!self.isSingle){
					self.isLast = !res.data.hasMore;
					self.totalData = self.totalData.concat(self.curData);
				}else{
					self.totalData = self.curData;
				}
				if(self.render && typeof self.render==='function'){
					self.render({
						totalData:self.totalData,
						isLast:self.isLast
					});
				}

			}

		});
	}
	update(page){//更新该页一下的数据
		if(this.isSingle){
			this.next();
		}else{
			this.isLock = true;
			this.curPage = page;
			this.totalData = this.totalData.filter((v,k)=>{
				var vPage = JSON.parse(v.eventParam).page;
				return vPage<page; 
			});
			var self = this;
			self.getData(page,function(res){
				self.isLock = false;
				if(res.data ){
					self.curData = res.data.list;
					if(!self.isSingle){
						self.isLast = !res.data.hasMore;
						self.totalData = self.totalData.concat(self.curData);
					}else{
						self.totalData = self.curData;
					}
					if(self.render && typeof self.render==='function'){
						self.render({
							totalData:self.totalData,
						});
					}

				}
			});

		}
	}
	getData(page,callback){
		var param = this.param||{};
		if(!this.isSingle){
			param.currentPage = page;
		}
		var self = this;
		ajax.get({//换ajax。query
			url:this.url,
			data:param,
			withKey:param.withKey,
			onSuccess:function(res){
				var list = self.getList(res)||[];
				list = list.map((v,k)=>{
					v.eventParam= JSON.stringify({
						page:page
					});
					return v;
				});
				var resData = {
					code : res.code,
					data:{
						page:param.currentPage,
						list:list,
						hasMore:self.getHasMore(res)
					}
				}
	
				if(callback && typeof callback === 'function'){
					callback(resData);
				}

			},
			onError:function(res){//没有接口。。。
				var list = self.getList(res)||[];
				list = list.map((v,k)=>{
					v.eventParam= JSON.stringify({
						page:page
					});
					return v;
				});
				var resData = {
					code : res.code,
					data:{
						page:param.currentPage,
						list:list,
						hasMore:self.getHasMore(res)
					}
				}
	
				if(callback && typeof callback === 'function'){
					callback(resData);
				}
			}
		});
	}
}


module.exports = List;