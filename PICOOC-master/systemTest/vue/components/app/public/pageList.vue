<template>
	<div class="publicPageList" v-if="pageCount>0">
		<div class="pageIcon" @click="changePageFirst"><img ref="pageIconImg1"  src="https://cdn2.picooc.com/web/res/system/static/image/icon0.png" /></div>
		<div class="pageIcon"  @click="changePageReduce"><img ref="pageIconImg2" src="https://cdn2.picooc.com/web/res/system/static/image/icon1.png" /></div>
		<div class="pageNum" v-if="pageCount<6">
			<div class="pageNumInfo" v-for="item in pageCount">
				<span  v-if="item==currentPage" class="pageNumActive">{{item}}</span>
				<span  v-else  class="pageNumInfo1" @click="changePage(item)">{{item}}</span>
			</div>
		</div>
		<div class="pageNum" v-else>
			<div class="pageNumInfo" v-for="(item,index) in pageCount">
				<!-- <div v-if="item==1 || (item>pageChangeNum && item<pageChangeNum+4) || item==pageCount || ((pageCount-pageChangeNum)<4 && (pageCount-item)<4)"> -->
				<div v-if="item==1 || (item>=pageChangeNum && item<pageChangeNum+4) || item==pageCount || (pageCount-pageChangeNum<4 && item+4>pageCount)">
					<span  v-if="item==currentPage" class="pageNumActive">{{item}}</span>
					<span  v-else  class="pageNumInfo1" @click="changePage(item)">{{item}}</span>
				</div>
				<div class="pageNumDot" v-else-if="item==pageChangeNum-1 || ((pageCount-pageChangeNum)<4 && (pageCount-item)==4)" @click="pageChangeNumReduce">...</div>
				<div class="pageNumDot" v-else-if="item==pageChangeNum+4" @click="pageChangeNumAdd">...</div>
			</div>
		</div>
		<div class="pageIcon" @click="changePageAdd"><img ref="pageIconImg3" src="https://cdn2.picooc.com/web/res/system/static/image/icon3.png" /></div>
		<div class="pageIcon" @click="changePageLast"><img ref="pageIconImg4" src="https://cdn2.picooc.com/web/res/system/static/image/icon2.png" /></div>
	</div>
	<div v-else></div>
</template>
<script>
export default {
	props:["pageCount","currentPage","pageChangeNum"],
	mounted:function(){
		console.log('11',this.$refs.pageIconImg1);
		//alert(this.$refs.pageIconImg1);
		if(this.currentPage==1){
			// console.log('33',this.$refs.pageIconImg1);
			// console.log('33',this.$refs.pageIconImg2);
			this.$refs.pageIconImg1.src="https://cdn2.picooc.com/web/res/system/static/image/icon4.png";
			this.$refs.pageIconImg2.src="https://cdn2.picooc.com/web/res/system/static/image/icon5.png";
		}
		else{
			// console.log('44',this.$refs.pageIconImg1);
			// console.log('44',this.$refs.pageIconImg2);
			this.$refs.pageIconImg1.src="https://cdn2.picooc.com/web/res/system/static/image/icon0.png";
			this.$refs.pageIconImg2.src="https://cdn2.picooc.com/web/res/system/static/image/icon1.png";
		}
		// console.log(this.currentPage,this.pageCount);
		if(this.currentPage==this.pageCount){
			// console.log('55',this.$refs.pageIconImg3);
			// console.log('55',this.$refs.pageIconImg4);
			this.$refs.pageIconImg3.src="https://cdn2.picooc.com/web/res/system/static/image/icon7.png";
			this.$refs.pageIconImg4.src="https://cdn2.picooc.com/web/res/system/static/image/icon6.png";
		}
		else{
			// console.log('66',this.$refs.pageIconImg3);
			// console.log('66',this.$refs.pageIconImg4);
			this.$refs.pageIconImg3.src="https://cdn2.picooc.com/web/res/system/static/image/icon3.png";
			this.$refs.pageIconImg4.src="https://cdn2.picooc.com/web/res/system/static/image/icon2.png";
		}
	},
	updated:function(){
		// console.log(4567)
		if(this.currentPage==1){
			// console.log(1)
			this.$refs.pageIconImg1.src="https://cdn2.picooc.com/web/res/system/static/image/icon4.png";
			this.$refs.pageIconImg2.src="https://cdn2.picooc.com/web/res/system/static/image/icon5.png";
		}
		else{
			// console.log(12)
			this.$refs.pageIconImg1.src="https://cdn2.picooc.com/web/res/system/static/image/icon0.png";
			this.$refs.pageIconImg2.src="https://cdn2.picooc.com/web/res/system/static/image/icon1.png";
		}
		if(this.currentPage==this.pageCount){
			// console.log(123)
			this.$refs.pageIconImg3.src="https://cdn2.picooc.com/web/res/system/static/image/icon7.png";
			this.$refs.pageIconImg4.src="https://cdn2.picooc.com/web/res/system/static/image/icon6.png";
		}
		else{
			// console.log(1234)
			this.$refs.pageIconImg3.src="https://cdn2.picooc.com/web/res/system/static/image/icon3.png";
			this.$refs.pageIconImg4.src="https://cdn2.picooc.com/web/res/system/static/image/icon2.png";
		}
	},
	methods:{
		changePage:function(index){
			//this.currentPage=index;
			this.$emit('changeCurrentPage', index);
			if(index==1){
				this.$emit('changePageChangeNum', index);
			}
			else if(index==this.pageCount){
				this.$emit('changePageChangeNum', parseInt(this.pageCount/4)*4+1);
			}
		},
		changePageFirst:function(){
			/*this.currentPage=1;
			this.getList();*/
			this.$emit('changeCurrentPage', 1);
			this.$emit('changePageChangeNum', 1);
		},
		changePageReduce:function(){
			console.log(this.pageChangeNum,this.currentPage);
			if(this.currentPage>1){
				//this.currentPage--;
				//this.getList();
				let index=this.currentPage-1;
				this.$emit('changeCurrentPage',index);
				if(this.pageChangeNum>=this.currentPage){
					this.$emit('changePageChangeNum', this.pageChangeNum-4);
				}
				else if(this.currentPage-this.pageChangeNum>=4){
					this.$emit('changePageChangeNum', parseInt(this.currentPage/4)*4+1);
				}
			}
			
		},
		changePageAdd:function(){
			console.log(this.pageChangeNum);
			if(this.currentPage<this.pageCount){
				//this.currentPage++;
				//this.getList();
				let index=this.currentPage+1;
				if(index==this.pageChangeNum+4){
					this.$emit('changePageChangeNum', this.pageChangeNum+4);
				}
				else if(this.pageChangeNum-this.currentPage>=4){
					this.$emit('changePageChangeNum', parseInt(this.currentPage/4)*4+1);
				}
				this.$emit('changeCurrentPage',index);
			}
		},
		changePageLast:function(){
			//this.currentPage=this.pageCount;
			//this.getList();
			this.$emit('changeCurrentPage', this.pageCount);
			this.$emit('changePageChangeNum', parseInt(this.pageCount/4)*4+1);
		},
		pageChangeNumAdd:function(){
			console.log(this.pageChangeNum);
			if(this.pageCount-this.pageChangeNum>4){
				//this.pageChangeNum=this.pageChangeNum+3;
				this.$emit('changePageChangeNum', this.pageChangeNum+4);
			}
		},
		pageChangeNumReduce:function(){
			console.log(this.pageChangeNum);
			if(this.pageChangeNum-4>0){
				//this.pageChangeNum=this.pageChangeNum-3;
				this.$emit('changePageChangeNum', this.pageChangeNum-4);
			}
		},
	}
}
</script>
<style lang="less">
@import "../../../public.less";
.tabTop{
	position: relative;
	min-height: 22px;
}
.publicPageList{
	position: absolute;
	right: 0;
	bottom: 0;
	font-size:0;
	height: 22px;
	line-height: 22px;
	.pageIcon{
		display: inline-block;
		width: 22px;
		height: 22px;
		font-size:0;
		vertical-align: top;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.pageNum{
		display: inline-block;
		height: 22px;
		font-size: 12px;
	}
	.pageNumInfo{
		display: inline-block;
		.cursor
	}
	.pageNumInfo1{
		display: inline-block;
		padding: 0 5px;
		height: 18px;
		line-height: 18px;
		vertical-align: middle;
	}
	.pageNumActive{
		display: inline-block;
		padding: 0 5px;
		height: 18px;
		line-height: 18px;
		vertical-align: middle;
		color: #fff;
		background: #C1C7D2;
		.border-radius(11px);
	}
	.pageNumDot{
		padding: 0 5px;
	}
}
</style>
