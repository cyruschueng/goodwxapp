require( function () {
	var isArrayEmpty = function (array) {
		return typeof array == 'undefined' || array == null || array.length == 0;
	};
	var trimStr = function (str){
		if(str){
			return str.replace(/(^\s*)|(\s*$)/g,"");
		}
	}

	var getPanoList = function (album) {
		if(!album) {
			return null;
		}
		var panoList = [];
		if(!isArrayEmpty(album.albumList)) {
			for(var i=0; i < album.albumList.length; i++) {
				var subAlbum = album.albumList[i];
				var subPanoList = getPanoList(subAlbum);
				if(!isArrayEmpty(subPanoList)) {
					panoList = panoList.concat(subPanoList);
				}
			}
		}
		if(!isArrayEmpty(album.panoList)) {
			panoList = panoList.concat(album.panoList);
		}
		if(album.albumInfo) {
			for(var i=0; i < panoList.length; i++) {
				if(!panoList[i].panoInfo) {
					panoList[i].panoInfo = album.albumInfo;
				}
			}
		}
		return panoList;
	};

	var dataProcessor = function (data) {
		dataProcessor.prototype.setData(data);

		return dataProcessor.prototype.getData();
	};

	dataProcessor.prototype = {
		data: null,
		panoList: null,
		setData: function (data) {
			this.data = data;
		},
		getData: function () {
			if(!this.data.albumList && !this.data.panoList){
				return null;
			}
			var rootALbum = this.data;
			for(var i in rootALbum.albumList) {
				var subAlbum = rootALbum.albumList[i];
				subAlbum.panoList = isArrayEmpty(subAlbum.panoList)?[]:subAlbum.panoList;
				if(!isArrayEmpty(subAlbum.albumList)) {
					var subPanoList = getPanoList(subAlbum);
					subAlbum.panoList = subAlbum.panoList.concat(subPanoList);
					subAlbum.albumList=[];
				}
			}
			if(this.data.albumList[0] && this.data.albumList[0].panoList.length == 0){
				this.data.albumList[0].panoList = this.data.panoList;
			}
			this.disposeData();
			return this.data;
		},

		// //将超过两层结构的数据处理为两层
		// limitTwoLevel: function (level) {
		// 	if(level <= 2){
		// 		return;
		// 	}

		// 	for(var i = 0; i < subAlbum.albumList.length; i++){
		// 		subAlbum.panoList = subAlbum.panoList.concat(subAlbum.albumList[i].panoList);
		// 	}
		// 	supAlbum.panoList = supAlbum.panoList.concat(subAlbum.panoList);

		// 	return arguments.callee(level - 1);
		// },

		//通过层级取子相册
		

		disposeData: function () {
			var self = this;
			if(self.data.albumList.length == 0 && self.data.panoList.length != 0){
				self.data.albumList = [{panoList: self.data.panoList, type: "one"}];
			}
			self.data.albumList.forEach(function(item,i){
				if(item.panoList.length == 0){
					self.data.albumList.splice(i,1);
				}
			});
			self.data.albumList.forEach(function(aItem) {
				var panoNameList = [];
				aItem.newPanoList = [];

				aItem.panoList.forEach(function (pItem) {
					if (pItem.albumIncludedId) {
						return;
					}
					var pIndex = panoNameList.indexOf(pItem.panoName);
					//10春、20夏、2夜...
					pItem.time = pItem.season * 10 + Number(pItem.dayNight);

					//检查是否已经出现过相同全景,未出现:则写入panoNameList,出现过:则依据索引，归入对应相同全景列表
					aItem.newPanoList.push({timeIcon: null, timePanoList: [pItem]});
					if (pIndex == -1) {
						panoNameList.push(pItem.panoName);
					} else {
						//self.updataTimeIc(pItem, aItem.newPanoList[pIndex]);
						//self.addTpano(pItem, aItem.newPanoList[pIndex].timePanoList);
					}
				});
			});
		},
		addTpano: function(newTpano, tpanoList){
	        for(var i = 0; i < tpanoList.length; i++){
				if(!newTpano.dayNight && !newTpano.season){
					break;
				}
				if(newTpano.time%10 == 2 && tpanoList[i].time%10 == 2){
					break;
				}
	            if(newTpano.time == tpanoList[i].time){//去重
	                break;
	            }
				if(newTpano.time < tpanoList[i].time){
					if(!tpanoList[0].dayNight && !tpanoList[0].season){
						tpanoList.splice(0,1);
						tpanoList.splice(i-1,0,newTpano);
					}else{
						tpanoList.splice(i,0,newTpano);
					}
					break;
				}
                if(i == tpanoList.length - 1){
					if(!tpanoList[0].dayNight && !tpanoList[0].season){
						tpanoList.splice(0,1);
					}
                    tpanoList.push(newTpano);
                    break;
                }
	        }
	    },
	    updataTimeIc: function (newTpano, curPano) {
	        for(var i = 0; i < curPano.timePanoList.length; i++){
	            if(curPano.timeIcon == "time"){
	                break;
	            }
	            if(newTpano.season != curPano.timePanoList[i].season){
                    curPano.timeIcon = "time";
                    break;
                } 
	            if(curPano.timeIcon != "dayNight" && newTpano.dayNight != curPano.timePanoList[i].dayNight){
                    curPano.timeIcon = "dayNight";
	            }
	        }
	    }
	};

    return {
    	dataProcessor: dataProcessor,
		trimStr: trimStr
    }
});