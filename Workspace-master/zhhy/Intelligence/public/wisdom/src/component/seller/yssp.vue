<template>
	<div class="page-yssp">
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="1" style="padding-bottom: 2rem;">
			<div class="goodList">
				<ul>
					<li v-for="(item,index) in preSetGoodsList">
						<div class="left fl" @click="ViewTemplate(item.Id)">
							<span style="font-size:0.28rem">{{item.ProductName}}</span>
							<div class="specifications">
								<span>{{item.ProductClass}}</span> <span>单位: {{item.Unit}}</span><span>￥{{item.Price}}/{{item.Unit}}</span>  
							</div>
						</div>
						<div class="right">
							<span style="color: #a4dee5">{{item.mubanClass}}</span>
							<span class="del_icon" @click="deletePreSetPro(index,item.ListId)"></span>
						</div>
						<!-- <div class="selectedIconWrap fr">
							<span class="noselectedIcon" @click="selectedPreSetproduct(item.ListId,$event)"></span>
						</div> -->
					</li>
				</ul>

				<div class="add">
					<div class="add_icon" @click="toSpbjPage"></div>
					<span @click="toSpbjPage">增加自设模板</span>
				</div>
			</div>

			<div class="saveBtn" @click="SaveTanwei">
				<btn btnTitle="我的摊位" linkTo="">
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	
</style>

<script type="text/javascript">
	import  btn from '../../component/btnComponet.vue'
	import  topNav from '../../component/topNav.vue'

	export default {
	  	data () {
	    	return {
	    		loading: false,
	      		preSetGoodsList: [],
	      		SelectedIconURL:{
	      			selected: "selectedIcon",
	      			nosSelected: "noselectedIcon')",
	      			flag: true,
	      			preSetProIds: []
	      		},
	      		pageIndex: 0,
	      		userID: window.localStorage.getItem('zhhy_user_id')
	    	}
	  	},
	  	components: { btn,topNav },
	  	methods: {
	  		// 添加预设
		  	toSpbjPage: function(){
		  		this.$router.push({name: 'spbj'})
		  	},
		  	// 查询数据
		  	Query: function(){
		  		let vm = this;
		  		commom.getDataList("ysh/GetUserProducttplList",{
		  			User_id: vm.userID,
		  			pageindex: 0,
  					pagesize: (vm.pageIndex+1)*6-1
		  		},function(d){
		    		if(d.aaData && d.aaData.length > 0){
		    			for(let v of d.aaData){
		    				if(v.MobleClass==1){
		    					v.mubanClass="公用模板";
		    				} else {
		    					v.mubanClass="自设模板";
		    				}
		    			}
		    			vm.preSetGoodsList = d.aaData;
		    		}
		    	})
		  	},
		  	// 查看模板
		  	ViewTemplate: function(d){
		  		this.$router.push({name: 'spbj',query:{id:d,action:"view"}})
		  	},
		  	// 删除预设
		  	deletePreSetPro: function(index,id){
		  		let vm = this;
		  		vm.preSetGoodsList.splice(index, 1)
		  		commom.getDataList("ysh/DeleteUserProduct",{ListId: id},function(d){
		  			if(d.status==0){
		  				commom.msg('删除成功');
		  			} else {
		  				commom.msg('删除失败');
		  			}
		  		})
		  	},
		  	// 选中预设商品
		  	selectedPreSetproduct: function(id,e){
		  		let vm = this;
		  		let ids = vm.SelectedIconURL.preSetProIds;
		  		let classAttr = $(e.target).attr("class");
		  		if(classAttr=="noselectedIcon"){
		  			$(e.target).attr("class","selectedIcon")
		  			if($.inArray(id,ids)<0){
						ids.push(id)
		  			}
		  		} else {
		  			$(e.target).attr("class","noselectedIcon")
		  			ids.splice($.inArray(id,ids),1); 
		  		}
		  	},
		  	// 我的摊位
		  	SaveTanwei: function(){
		  		let vm = this;
				vm.$router.push({name: 'seller_twsm'})

		  		// let vm = this;
		  		// let ids = vm.SelectedIconURL.preSetProIds.join(",");
		  		// let param = new Object;
		  		// param.user_id = vm.userID;
		  		// param.listId = ids; 
		  		// if(vm.SelectedIconURL.preSetProIds.length==0){
		  		// 	commom.msg("请选择模板")
		  		// } else {
		  		// 	commom.getDataList("ysh/AddUserProduct",param,function(d){
		  		// 		console.log(d)
			  	// 		if(d.status == 0){
			  	// 			commom.msg("保存摊位成功");
			  	// 			setTimeout(function(){
			  	// 				vm.$router.push({name: 'seller_twsm'})
			  	// 			},1000)
			  	// 		} else {
			  	// 			commom.msg("保存摊位失败")
			  	// 		}
			  	// 	})
		  		// }
		  	},
		  	loadMore: function(){
		  		var vm = this
      			vm.loading = true
      			setTimeout(function(){
      				commom.getDataList("ysh/GetUserProducttplList",{
      					User_id: vm.userID,
      					pageindex: vm.pageIndex*6,
      					pagesize: 6
      				},function(d){
			    		if(d.aaData && d.aaData.length > 0){
			    			for(let v of d.aaData){
			    				if(v.MobleClass==1){
			    					v.mubanClass="公用模板";
			    				} else {
			    					v.mubanClass="自设模板";
			    				}
			    				vm.preSetGoodsList.push(v)
			    			}
			    			vm.loading = false
		            		vm.pageIndex++
			    		}
			    	})
		      	}, 500)
		  	}
	  	},
	  	beforeMount: function(){
	    	// this.Query();
	  	},
	  	mounted: function(){
	  		
	  	}
	}
</script>
