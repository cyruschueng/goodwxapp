<template>
	<div class="page-jyxq">
		<div class="contentBg">
			<div class="userInfoLine">
				<div class="userInfo">
					<div class="userImg fl">
						<img :src="imgHead" width="100%" height="100%">
					</div>
					<ul class="userName fl">
						<li>{{userInfo.UserName}}<span class="tanwei">摊位</span></li>
						<li>{{userInfo.PhoneNum}}</li>
					</ul>
				</div>
			</div>

			<div class="dealInfo">
				<div class="dealId_time">
					<div>交易单号 : <span style="color:#6c6c6c"> {{ jyOrderNumber }}</span></div>
					<div>交易时间 : <span style="color:#6c6c6c"> {{ jyDatetimes }}</span></div>
				</div>
				<div class="price">
					<div class="fl">交易单价 : </div>
					<div class="fl right">
						<div class="good" v-for="d in jyxqData">
							<span style="margin-right: 0.5rem">{{d.ProductName}}</span>
							<span>￥{{ d.Price }}/{{ d.Unit }}</span>
							<span class="find_icon" @click="tospxq(d.ProductId)"></span>
						</div>
					</div>
				</div>
				<div class="price" style="border-bottom:none;">
					<div class="fl">订单明细 : </div>
					<div class="fl right">
						<div class="good" v-for="d in jyxqData">
							<span style="margin-right: 0.5rem">{{d.ProductName}}</span>
							<span>{{ d.Amount}}{{ d.Unit }}</span>
						</div>
					</div>
				</div>
			</div>
			<!-- qrcode -->
			<div class="qrcodeImg">
				<div id="qrcode"></div>
			</div>
		</div>
		
		<div class="okBtn" @click="turnDownbtn">
			<btn btnTitle="确定" linkTo="/buyer"/>
		</div>
	</div>
</template>

<script type="text/javascript">
	import  btn from '../../component/btnComponet.vue'
	import  topNav from '../../component/topNav.vue'

	export default {
	  	data () {
	    	return {
	      		jyxqData: [],
	      		jyOrderNumber: "",
	      		jyDatetimes: "",
	      		userInfo: {},
      			imgHead: config.picURL.head,
      			qrcodeImg:config.picURL.wait
	    	}
	  	},
	  	components: { btn,topNav},
	  	methods :{
	  		tospxq: function(id){
				this.$router.push({name: 'buyer_spxq',query:{ProductId:id}})
			},
			turnDownbtn: function(){
				let vm = this;
				vm.$router.push({name: 'seller_jylb'})
			},
			// 生成二维码
			makeCode: function(){
				var url = window.location.href
				var qrcode = new QRCode('qrcode', {});
				qrcode.clear()
	    		qrcode.makeCode(url)
			}
	  	},
	  	mounted (){
	  		var vm = this;
			var ordernumber = GetRequest().ordnumber;
			var param = new Object;
			param.OrderNumber = ordernumber;
			commom.getDataList("ysh/GetOrderItemInfo",param,function(d){
				// console.log(d)	
				if(d.status==0 && d.aaData.length != 0){
					vm.jyxqData = d.aaData
					vm.jyOrderNumber = d.aaData[0].OrderNumber
					vm.jyDatetimes = d.aaData[0].datetimes
					commom.getDataList("ysh/GetUserInfo",{User_id:d.aaData[0].UserId},function(d){
						vm.userInfo = d.aaData[0]
					})
					commom.getDataList('GetUserInfo', {userid: d.aaData[0].UserId}, function(d){
			         	var wxData = d.aaData[1]
			          	vm.imgHead = wxData.headimgurl
			        })
				}
			});
			this.makeCode();
	  	},
	}
</script>
<style type="text/css">

</style>