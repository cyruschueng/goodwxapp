   <template>
	<div class="page-jyxq">
		<div id="header">
			<topNav title="交易详情 买家" />
		</div>
		<div class="contentBg">
			<div class="fixed"></div>
			<div class="userInfoLine">
				<div class="userInfo">
					<div class="userImg fl"></div>
					<ul class="userName fl">
						<li>熊啸天<span class="tanwei">摊位</span></li>
						<li>18140193877</li>
					</ul>
				</div>
			</div>

			<div class="dealInfo">
				<div class="dealId_time">
					<div>交易单号 : <span style="color:#6c6c6c"> 6246454546776554</span></div>
					<div>交易时间 : <span style="color:#6c6c6c"> 2016-11-22  22:16:12</span></div>
				</div>
				<div class="price">
					<div class="fl">交易单价 : </div>
					<div class="fl right">
						<div class="good">
							<span style="margin-right: 0.5rem">白萝卜</span>
							<span>￥3/kg</span>
							<span class="find_icon"></span>
						</div>
						<div class="good">
							<span style="margin-right: 0.5rem">鸡中翅</span>
							<span>￥3/kg </span>
							<span class="find_icon"></span>
						</div>
					</div>
				</div>
				<div class="price" style="border-bottom:none;">
					<div class="fl">订单明细 : </div>
					<div class="fl right">
						<div class="good">
							<span style="margin-right: 0.5rem">白萝卜</span>
							<span>￥3/kg</span>
						</div>
						<div class="good">
							<span style="margin-right: 0.5rem">鸡中翅</span>
							<span>￥3/kg </span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="okBtn">
			<btn btnTitle="确定" linkTo="/buyer"/>
		</div> -->
	</div>
</template>

<script type="text/javascript">
	import  btn from '../../component/btnComponet.vue'
	import  topNav from '../../component/topNav.vue'

	export default {
	  	data () {
	    	return {
	      		goodList: []
	    	}
	  	},
	  	components: { btn,topNav },
	  	mounted (){
	  		let vm = this;
  			var oderId = this.$route.query.oderId;
  			commom.getDataList('GetUserOrderByUserId',{User_Id: oderId},function(d){
	    		// vm.goodList = d.datalist	
	    		console.log(d)
	    	})
	  	},
	}
</script>
