<template>
	<div class="smsh-page">
		<!-- header -->
		<div class="banner1">
	      	<img :src="banner1Img">
	    </div>
		<!-- smsh-审核信息 -->
	    <div class="content">
	    	<ul>
	    		<li><span>经营户名称：{{ smshInfo.UserName }}</span></li>
	    		<li><span>经营地址：{{ smshInfo.Address }}</span></li>
	    		<li><span>经营类型：{{ smshInfo.ManageType }}</span></li>
	    		<li><span>负责人：{{ smshInfo.LiablePerson }}</span></li>
	    		<li><span>联系方式：{{ smshInfo.PhoneNum }}</span></li>
	    		<li class="last-li"><span>小二：{{ smshInfo.ServicePhoneNum }}</span></li>
	    	</ul>
	    </div>
		<!-- smsh-buttons -->
	    <div class="buyerJyshBtns" v-if="show">
			<div class="okbtn fl">
		        <span class="enter_btn" @click="Through_sh">通过审核</span>
			</div>
			<div class="rejectBtn fl">
		        <span class="enter_btn" @click="turnDown_sh">驳回审核</span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
	    	return {
      			banner1Img: config.picURL.smrzBanner1,
      			smshInfo:{},
      			show: false,
      			userID: window.localStorage.getItem('zhhy_user_id')
	    	}
	  	},
	  	computed: {
	  		userid: function(){
	  			return GetRequest().userid
	  		}
	  	},
	  	mounted () { 
	  		let vm = this
	  		if(vm.userID === 0){
		      	commom.passPort(vm, function(){
		        	vm.Query()
		      	})
		    } else {
		        vm.Query()
		    }
	  	},
	  	methods: {
		    // 查询
		    Query: function(){
		    	let vm = this
				var userid = GetRequest().userid;

		    	commom.getDataList("ysh/GetUserInfo",{
		    		User_id: userid
		    	},function(d){
		    		if(d && d.aaData && d.aaData.length > 0){
		    			vm.smshInfo = d.aaData[0]
		    			if(d.aaData[0].Status === 0){
		    				vm.show = true
		    			}
		    		}
		    	})
		    },
		    // 通过审核
		    Through_sh: function(){
		    	let vm = this
		    	commom.getDataList("ysh/UpdateUserStatus",{
		    		Statuss: 1,
		    		User_id: GetRequest().userid
		    	},function(d){
	    			if(d.status==0){
	    				commom.msg("操作成功")
	    				commom.getDataList('wxsendmsg', {
		                    env: 2,
		                    userid: vm.userid
		                  }, function(d){
		                    
		                  })
	    				vm.show = false
	    			}
		    	})		    	
		    },
		    // 驳回审核
		    turnDown_sh: function(){
		    	let vm = this
		    	commom.getDataList("ysh/UpdateUserStatus",{
		    		Statuss:2,
		    		User_id: GetRequest().userid
		    	},function(d){
	    			if(d.status==0){
	    				commom.msg("操作成功")
	    				vm.show = false
	    			}
		    	})
		    }
	  	},
	}
</script>
