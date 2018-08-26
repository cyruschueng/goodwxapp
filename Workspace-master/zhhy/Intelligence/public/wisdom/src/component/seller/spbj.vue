   <template>
	<div class="page-spbj">
		<div class="banner_bg"></div>

		<div class="editInputs">
			<ul>
				<li>
					<div class="nameImg"></div>
					
					<div class="inputWrap">
						<input type="text" readonly="readonly" v-model="UserInputs.goodsName" v-if="pageType == 'view'">
						<input type="text" maxlength="8" placeholder="商品名" v-model="UserInputs.goodsName" v-else>
					</div>
				</li>
				<li id="goodsClassBg">
					<div class="classImg"></div>
					<div class="inputWrap1">
						<div id="goodsClass" v-if="pageType == 'view'">{{UserInputs.goodsClass}}</div>
						<div id="goodsClass" v-else @click="toGoodsType">{{UserInputs.goodsClass}}</div>
					</div>
				</li>
				<li>
					<div class="priceImg"></div>
					<div class="inputWrap">
						<input  v-if="pageType == 'view'" type="text" readonly="readonly" v-model="UserInputs.goodsPrice">
						<input v-else type="text" maxlength="6" placeholder="价格" v-model="UserInputs.goodsPrice" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
					</div>
				</li>
				<li>
					<div class="explanImg"></div>
					<div class="inputWrap" >
						<input type="text" v-if="pageType == 'view'" readonly="readonly" v-model="UserInputs.goodsExplain">
						<input type="text" v-else placeholder="产品说明" v-model="UserInputs.goodsExplain" >
					</div>
					
				</li>
			</ul>
		</div>

		<!-- 上传质检报告 -->
	<!-- 	<div class="upload_zjbg">
			<span class="folderImg"></span>
		   	<input type="file" id="uploadInputHid">
		</div>
		<div id="showUploadImg"></div> -->

		<div class="saveBtn" v-if="pageType == 'view'" @click="back">
			<btn btnTitle="返回预设">
		</div>
		<div class="saveBtn" v-else @click="save">
			<btn btnTitle="保存模板">
		</div>
		
		<mt-actionsheet
	      	:actions="actions"
	      	v-model="sheetVisible"
	      	cancelText="">
	    </mt-actionsheet>
	</div>
</template>

<script type="text/javascript">
	import  btn from '../../component/btnComponet.vue'
	import  topNav from '../../component/topNav.vue'

	export default {
	  	data () {
	    	return {
	    		UserInputs: {
	    			goodsName: this.$store.state.spbjInput.goodsName || '',
		      		goodsClass: "商品分类",
		      		classID: GetRequest().id,
		      		goodsPrice: this.$store.state.spbjInput.goodsPrice || '',
		      		goodsExplain: this.$store.state.spbjInput.goodsExplain || ''
		      	},
	      		actions: [],
	      		sheetVisible: false,
	      		pageType:"",
	      		userID: window.localStorage.getItem('zhhy_user_id')
	      	}
	  	},
	  	components: { btn,topNav },
	  	methods: {
	  		showType: function(){
		      	this.sheetVisible = true
		    },
		    // 跳转选择商品分类
		    toGoodsType: function(){
		    	var vm = this
		    	vm.$store.commit('saveSpbjInput', {
			        goodsName: vm.UserInputs.goodsName,
			        goodsPrice: vm.UserInputs.goodsPrice,
			        goodsExplain: vm.UserInputs.goodsExplain
		      	})
		    	vm.$router.push({name: 'seller_spfl'})
		    },
		    // 绑定输入数据
		    choseType: function(name, id){
		     	this.UserInputs.goodsClass = name
		      	this.UserInputs.classID = id
		      	this.UserInputs.sheetVisible = false
		    },
		    // 确定添加
		    save: function(){
		    	let vm = this;
		    	let picUrlId = $("#showUploadImg").attr("insertId");
		    	let param = new Object;
	    		param.ProductName = vm.UserInputs.goodsName;
	    		param.Class = vm.UserInputs.classID;
	    		param.Price = vm.UserInputs.goodsPrice;
	    		param.FullRemark = vm.UserInputs.goodsExplain;
	    		// param.Picture = picUrlId;
	    		param.UserId = vm.userID;
				if(param.ProductName.length <= 0 || param.Class == "" || param.Price.length <= 0 || param.FullRemark.length <= 0){
		    		commom.msg('请填写完整信息');
		    	} else {
		    		commom.getDataList("ysh/AddProductModle",param,function(d){
		    			if(d.status==0){
    						vm.$router.push({name: 'seller_yssp'})
		    			} else {
		    				commom.msg('请求错误');
		    			}
		    		})
		    	}
		    },
		    // 返回预设
		    back:function(){
		    	this.$router.push({name: 'seller_yssp'})
		    },
		    // 查询
		    Query:function(){
		    	let vm = this;
		  		commom.getDataList('ysh/GetProductClassList',{},function(d){
		  			if(d.aaData && d.aaData.length > 0){
		  				for(let v of d.aaData){
		  					let o = new Object;
		  					o.name = v.ProductClass
		  					o.method = function(){
				              	vm.choseType(v.ProductClass, v.Id)
				            }
				            vm.actions.push(o);
		  				}
		  			}
		  		})
		    },
	  	},
	  	beforeMount: function(){
	  		this.Query();
	  		var vm = this
	  		commom.getDataList('ysh/getProClassById',{id:vm.UserInputs.classID},function(d){
	  			vm.UserInputs.goodsClass = d.aaData[0].ProductClass
	  		})
	  	},
	  	mounted: function(){
	  		// 查看模板信息
	  		var vm = this;
	  		var action = GetRequest().action;
			var id = GetRequest().id;
			if(action){
				vm.pageType = action
				commom.getDataList('ysh/GetProMouldInfo',{mouldId:id},function(d){
					if (d.aaData && d.aaData != 0) {
						vm.UserInputs.goodsName=d.aaData[0].ProductName
						vm.UserInputs.goodsClass=d.aaData[0].ProductClass
						vm.UserInputs.goodsPrice=d.aaData[0].Price+'/'+d.aaData[0].Unit
						vm.UserInputs.goodsExplain=d.aaData[0].FullRemark
					}
				})
			}

	  		// 输入框选中
	  		const inputEles = $(".inputWrap").children();
	  		inputEles.each(function() {
  				$(this).on("click",function(){
  					$(this).css("background","#fff");
  					$(this).parent().parent().css("background","#fff");
  				});
  				$(this).on("blur",function(){
  					$(this).css("background","#eae8e4");
  					$(this).parent().parent().css("background","#eae8e4");
  				})
	  		});

	  		// 上传质检报告
	  		$("#uploadInputHid").uploadifive({
		        uploadScript: 'http://f.yshfresh.com/upload',
		        buttonText:"上传质检报告", 
		        multi:false,
		        'auto': true,
		        'fileSizeLimit': '8MB',
		        simUploadLimit:1,
		        // 'fileType': 'image/*',
		        onUploadComplete : function(file, data) {
		        	var obj = jQuery.parseJSON(data);
		            var html = '<div><img class="media-object" id="headImg" src="http://f.yshfresh.com' + obj.aaData[0].fileurl+'"></div>'; 
		            $("#showUploadImg").css("display","block").html(html);
		            $(".complete").remove(); // 上传完成删除上传进度条

		            let param = new Object;
		            param.picUrl = obj.aaData[0].fileurl
		            param.picType = 1 // 质检图片
		            $.ajax({
		            	type:"POST",
		            	data:param,
		            	url: config.apiURL + "filepath",
		            	success: function(d){
		            		$("#showUploadImg").attr("insertId", d.insertId)
		            		
		            	}
		            })
		        },
            });
	  	}
	}
</script>
<style type="text/css">
	#showUploadImg{
		margin:0 auto;
		width:4rem;
		display: none;
	}
	#showUploadImg img{
		width: 100%;
	}
	.uploadifive-button{
		font-size: 0.33rem;
	    color: #49c2d2;
	    text-align: center;
	    float: right;
	    height: 0.5rem;
	    padding-top: 0.02rem;
	}
</style>