var React=require("react");
var ReactDOM = require("react-dom");
var PubSub = require("pubsub-js");

var Fc_bindChartImg={};
var chart={
	weightNum:[],
	fatNum:[],
	waistNum:[]
}
var key=0;

//绑定折线图相关方法
Fc_bindChartImg.getLineChart=function(chartEntity){
	//画折线
	//$("#"+chartEntity.chartNumID).empty();
	var dateIsSame=false;
	var noData= chartEntity.originArr.length==0?true:false;
	var hPercentArr=[];
	var wPercentArr=[];
	//小于7的时候是7天数据，补全后面数据
	var originArr2=[];
	if(noData){
		originArr2=[50,50,50,50,50,50,50];
	}else{
		originArr2=chartEntity.originArr.concat();
	}

	//补充数据
	while(originArr2.length < 7){
		originArr2.push(chartEntity.originArr[chartEntity.originArr.length-1]);
	}
	var canScale=window.devicePixelRatio;
	//获得数组最大值
	var maxWeight= chartEntity.originArr.length == 0 ? originArr2[0]:Math.max.apply(null, chartEntity.originArr);
	//获得数组最大值的下标
	var maxWeightIndex=chartEntity.originArr.lastIndexOf(maxWeight);
	//获得数组最小值
	var minWeight= chartEntity.originArr.length == 0 ? originArr2[0]:Math.min.apply(null, chartEntity.originArr);
	//获得数组最小值的下标
	var minWeightIndex=chartEntity.originArr.lastIndexOf(minWeight);
	//获得最大值最小值差值
	var weightDef= maxWeight-minWeight;

	var minHeight=2*parseFloat($("html").css("font-size"));


	//获取每天间隔
	var dateArr=[];
	var date=0;
	var dateLength=0;
	if(chartEntity.originArr.length > 7){
		dateLength=chartEntity.originArr.length;
	}else{
		dateLength=7;
	}
	for(var i=0;i<dateLength;i++){
		if(i == 0){
			dateArr.push(0);
		}else{
			date+=1/(dateLength-1);
			dateArr.push(date);
		}
		
	}

	//最大值最小值一样
	if(weightDef == 0){
		weightDef = 1;
		dateIsSame=true;
	}

	//初始坐标数据处理
	for(var i=0;i<originArr2.length;i++){
		hPercentArr[i] = (maxWeight-originArr2[i])/weightDef*chartEntity.waveHeight*canScale+minHeight;
		wPercentArr[i] = dateArr[i]*($("#"+chartEntity.chartID).width()-15)*canScale+15;
	}
	var diffWidth=(wPercentArr[1]-wPercentArr[0])/canScale;

	console.info(canvas);
	//画布初始化
	var canvas=document.getElementById(chartEntity.chartID);
	var context=canvas.getContext("2d");
	canvas.width=$("#"+chartEntity.chartID).width()*canScale;
	canvas.height=$("#"+chartEntity.chartID).height()*canScale;

	//小于7个点
	if(chartEntity.originArr.length <= 7){
		console.info("originArr2.length"+originArr2.length);
		//画线
		for(var i=0;i<originArr2.length;i++){
			if(dateIsSame){
				$("#"+chartEntity.chartID).css("marginTop","1.75rem");
			}
			context.lineTo(wPercentArr[i],hPercentArr[i]);
			if(i < chartEntity.originArr.length){
				if(dateIsSame){
					chart[chartEntity.chartNumID].push(<div className="weightNum-item" key={key} style={{position:"absolute",top:(hPercentArr[i]/canScale-15),left:(wPercentArr[i]/canScale-5)}}>{chartEntity.originArr[i]}</div>);
				}else{
					chart[chartEntity.chartNumID].push(<div className="weightNum-item" key={key} style={{position:"absolute",top:(hPercentArr[i]/canScale-25),left:(wPercentArr[i]/canScale-10)}}>{chartEntity.originArr[i]}</div>);
				}
			}
			key++;
		}
		if(chartEntity.originArr.length < 7){
			context.strokeStyle = chartEntity.lineStrokeColor2;
		}else{
			context.strokeStyle = chartEntity.lineStrokeColor;
		}
		context.lineWidth = 1*canScale;
		context.stroke();
		//描点
		for(var i=0;i<originArr2.length;i++){
			context.lineWidth=1*canScale;
			context.beginPath();
			context.arc(wPercentArr[i],hPercentArr[i],4*canScale,0,2*Math.PI);
			context.closePath();
			context.fillStyle= chartEntity.dotFillColor1;
			context.fill();

			context.beginPath();
			context.arc(wPercentArr[i],hPercentArr[i],2*canScale,0,2*Math.PI);
			context.closePath();
			

			if(i < chartEntity.originArr.length){
				context.fillStyle= chartEntity.dotFillColor2;
			}else{
				context.fillStyle= chartEntity.dotFillColor3;
			}
			context.fill();
		}

	}else{
		for(var i=0;i<chartEntity.originArr.length;i++){
			context.lineTo(wPercentArr[i],hPercentArr[i]);
			var hNumPosition=0;
			//用户数据不变
			if(dateIsSame){
				$("#"+chartEntity.chartID).css("marginTop","1.75rem");
				if(i == chartEntity.originArr.length-1){
					chart[chartEntity.chartNumID].push(<div className='weightNum-item' key={key} style={{position:"absolute",top:(hPercentArr[i]/canScale-15),left:(wPercentArr[i]/canScale-5)}} >{chartEntity.originArr[i]}</div>);
				}
			}else{
			//用户数据变化
				hNumPosition=hPercentArr[i]/canScale;
					if(i == maxWeightIndex){
				//最高点
					if((chartEntity.originArr.length-1-maxWeightIndex)*diffWidth <= 24){
						chart[chartEntity.chartNumID].push(<div className='weightNum-item' key={key} style={{position:"absolute",top:(hNumPosition-25),left:(wPercentArr[chartEntity.originArr.length-1]/canScale-10-24)}}>{chartEntity.originArr[i]}</div>);
					}else{
						chart[chartEntity.chartNumID].push(<div className='weightNum-item' key={key} style={{position:"absolute",top:(hNumPosition-25),left:(wPercentArr[i]/canScale-10)}}>{chartEntity.originArr[i]}</div>);
					}
				}else if(i == minWeightIndex){
					//最低点
					chart[chartEntity.chartNumID].push(<div className='weightNum-item' key={key} style={{position:"absolute",top:(hNumPosition+8),left:(wPercentArr[i]/canScale-16)}}>{chartEntity.originArr[i]}</div>);
				}
				//最后一点
				if(i == chartEntity.originArr.length-1 && minWeight != chartEntity.originArr[chartEntity.originArr.length-1] && maxWeight != chartEntity.originArr[chartEntity.originArr.length-1]){
					//当前一个点比最后一个点高，这时候数据应该展示在折线下方
					if(hPercentArr[i] > hPercentArr[i-1]){
						chart[chartEntity.chartNumID].push(<div className='weightNum-item' key={key} style={{position:"absolute",top:(hNumPosition+8),left:(wPercentArr[i]/canScale-16)}}>{chartEntity.originArr[i]}</div>);
					}else{
						chart[chartEntity.chartNumID].push(<div className='weightNum-item' key={key} style={{position:"absolute",top:(hNumPosition-25),left:(wPercentArr[i]/canScale-16)}}>{chartEntity.originArr[i]}</div>);
					}
					
				}
			}
			key++;
			
			
		}
		context.strokeStyle = chartEntity.lineStrokeColor;
		context.lineWidth = 1*canScale;
		context.stroke();

		/*PubSub.publish('chart', chart);*/
	}
	return chart;
};

module.exports = Fc_bindChartImg; 