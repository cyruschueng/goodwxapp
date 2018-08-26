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
						<div class="good" v-for="d in jyshData">
							<span style="margin-right: 0.5rem">{{d.ProductName}}</span>
							<span>￥{{ d.Price }}/{{ d.Unit }}</span>
							<span class="find_icon" @click="tospxq(d.ProductId)"></span>
						</div>
					</div>
				</div>
				<div class="price" style="border-bottom:none;">
					<div class="fl">订单明细 : </div>
					<div class="fl right">
						<div class="good" v-for="d in jyshData">
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

		<div class="buyerJyshBtns">
			<div class="okbtn fl">
		        <span class="enter_btn" @click="OKbtn">确认</span>
			</div>
			<div class="rejectBtn fl">
		        <span class="enter_btn" @click="turnDownbtn">驳回</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import  btn from '../../component/btnComponet.vue'
import  topNav from '../../component/topNav.vue'

export default {
  	data () {
    	return {
      		jyshData: [],
      		jyOrderNumber: "",
      		jyDatetimes: "",
      		userInfo: {},
      		imgHead: config.picURL.head,
      		sesskey: GetRequest().sesskey,
      		PayStatus:0,
      		User_id: Number(window.localStorage.getItem('zhhy_user_id')),
      		ordnumber: GetRequest().ordnumber,
    	}
  	},
  	components: { btn,topNav },
  	methods:{
		tospxq: function(id){
			this.$router.push({name: 'buyer_spxq',query:{ProductId:id}})
		},
		// 确认
		OKbtn: function(){
			var vm = this
			var params = {
				sesskey: vm.sesskey,
				value:3
			}
			vm.AfterSweepingCode(params);
			vm.UpdateOrderInfoEwm(1)
			commom.getDataList('ysh/AddUserProductFromOrder',{
				OrderNumber: vm.ordnumber,
				user_id:vm.User_id
			},function(d){
				if(d.status==0){
					$.ajax({
						url: config.apiURL + 'proAmount',
						type: 'post',
						data: {OrderNumber: vm.ordnumber},
						success: function(d){
							// console.log(d)
						}
					})
					vm.$router.push({name: 'seller_twsm'})
				} else {
					alert(JSON.stringify(d))
				}
			})
		},
		// 驳回
		turnDownbtn: function(){
			let vm = this;
			commom.msg("驳回")
			var params = {
				sesskey: vm.sesskey,
				value:4
			}
			vm.AfterSweepingCode(params);
			vm.UpdateOrderInfoEwm(0)
			setTimeout(function(){
				vm.$router.push({name: 'buyer_jylb'})
			},1500)
		},
		// 当前页二维码
		makeCode: function(){
			var url = window.location.href
			var qrcode = new QRCode('qrcode', {});
			qrcode.clear()
    		qrcode.makeCode(url)
		},
		// 扫码之后调用
		AfterSweepingCode: function(params, callback){
			$.ajax({
				url: config.apiURL + 'websocker',
				type: 'post',
				data: params,
				success: function(d){
					if(isFn(callback)) callback()
				}
			})
		},
		// 修改pay状态
		UpdateOrderInfoEwm: function(PayStatus){
			var vm = this 
			commom.getDataList('ysh/UpdateOrderInfoEwm', {
	        	user_idd: vm.User_id,
	        	PayStatus: PayStatus,
	        	OrderNumber: vm.ordnumber
	        }, function(d){
				
	        })
		}
  	},
  	mounted (){
	    var vm = this;
	    vm.UpdateOrderInfoEwm(1)	
    	var params = {
			sesskey: vm.sesskey,
			value:2
		}
		// 扫码之后
		vm.AfterSweepingCode(params, function(){
			// 查询数据
			var param = new Object;
			param.OrderNumber = vm.ordnumber;
			param.sesskey = vm.sesskey;
			commom.getDataList("ysh/GetOrderItemInfo",param,function(d){
				if(d && d.aaData && d.aaData.length > 0){
					var PayStatus = d.aaData[0].PayStatus
					vm.PayStatus = PayStatus
				}
				// console.log(d)
				if(d.status==0 && d.aaData.length != 0){
					vm.jyshData = d.aaData
					vm.jyOrderNumber = d.aaData[0].OrderNumber
					vm.jyDatetimes = d.aaData[0].datetimes
					// alert(vm.User_id)
					// alert(d.aaData[0].ToMarket)
					if(vm.User_id != d.aaData[0].ToMarket){
						$('.page-jyxq').html('<p>该二维码在在使用</p>')
					}
					commom.getDataList("ysh/GetUserInfo",{User_id:d.aaData[0].User_id},function(d){
						vm.userInfo = d.aaData[0]
					});
					commom.getDataList('GetUserInfo', {userid: d.aaData[0].User_id}, function(d){
			         	var wxData = d.aaData[0]
			          	vm.imgHead = wxData.headimgurl
			        })
				} 
			});	
		});		
		// 当前页二维码
		vm.makeCode();	
	}
}
</script>