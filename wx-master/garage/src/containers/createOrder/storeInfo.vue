<style lang="less">
	#storeInfo {
		.buttons {
			display: flex;
			flex-direction: row;
			.dlgBtn {
				flex: 1;
				height: 1rem;
				line-height: 1rem;
				font-size: 0.4rem;
			}
			.dlgBtn:nth-child(1) {
				color: #888888;
			}
			.dlgBtn:nth-child(2) {
				color: #368fdb;
				border-left: 1px solid #D9D9D9;
				box-sizing: border-box;
			}
		}
		.weui-cell .weui-cell__ft {
			max-width: 7rem;
		}
		.garageNameDlg .weui-cell {
			color: #a9a9a9;
		}
		.weui-select {
			direction: rtl;
		}
	}
	#storeInfo .weui-cell {
	    padding: 0.333333rem 0 !important;
	    margin: 0 0.4rem;
	}
	#storeInfo .weui-cell:before{
		left: 0 !important
	}
	.garageTypeButtons,
	.serviceHourButtons {
		display: flex;
		justify-content: space-between;
		div {
			display: inline-block;
			color: #368FDB;
			font-size: 0.4rem;
			margin: 0.2rem;
		}
	}
</style>

<style lang="less" scoped>
	[v-cloak] {
		display: none;
	}
	
	.main {
		/*margin-top: 1.066666rem;*/
	}
	.showRedPoint{
		width:9px;
		height: 9px;
		padding:0;
		font-size:0.026666rem;
		color:transparent;
		background: #f74c31;
      	border-radius: 50px;
	}
</style>
<template>
	<div id="storeInfo">
		<!--<x-header :left-options="{showBack: true,backText:'',preventDefault:true}">
			<div class="header-title">填写门店信息</div>
		</x-header>-->
		<Scroller :height='scrollerHeight' :lockX="true" ref="scroller" class="main">
			<div>
				<!--<group>
					<cell title="门店名称" :value="garageInfo.garageInfoDTO.garageName" is-link @click.native="modGarageName = garageInfo.garageInfoDTO.garageName;;garageNameDlgShow=!garageNameDlgShow"></cell>
					<cell title="修理厂类型" :value="garageTypeName" is-link @click.native="garageTypePopupShow=!garageTypePopupShow;"></cell>
					<cell title="营业面积" is-link @click.native="setStoreArea">
						<span slot="value" style="float: right;margin-left: 0.2rem;">{{area}}</span>
						<badge v-show="showConfigPoint" class="showRedPoint"></badge>
					</cell>
					<cell title="营业时间" :value="garageServiceHour" is-link @click.native="garageServiceHourShow=!garageServiceHourShow;"></cell>
					<cell title="门店地址" :value="address" is-link @click.native="goSetPosition"></cell>
				</group>-->
				<group>
					<cell title="门店名称" :value="garageInfo.garageInfoDTO.garageName" is-link @click.native="modGarageName = garageInfo.garageInfoDTO.garageName;;garageNameDlgShow=!garageNameDlgShow"></cell>
					<cell title="门店地址" :value="address" is-link @click.native="goSetPosition"></cell>
				</group>
				<group>
					<cell title="修理厂类型" :value="garageTypeName" is-link @click.native="garageTypePopupShow=!garageTypePopupShow;"></cell>
					<cell title="营业面积" is-link @click.native="setStoreArea">
						<span slot="value" style="float: right;margin-left: 0.2rem;">{{area}}</span>
						<badge v-show="showSellingArea" :text="0" class="showRedPoint"></badge>
					</cell>
				</group>
				<group>
					<cell title="营业时间" :value="garageServiceHour" is-link @click.native="garageServiceHourShow=!garageServiceHourShow;"></cell>
				</group>
			</div>
		</Scroller>
		<!--控件-->
		<x-dialog v-model="garageNameDlgShow" class="garageNameDlg">
			<group title="门店名称">
				<x-textarea :max="30" placeholder="请输入门店名称" v-model="modGarageName"></x-textarea>
			</group>
			<div class="buttons">
				<div class="dlgBtn" @click="garageNameDlgShow=false;modGarageName = garageInfo.garageInfoDTO.garageName;">取消</div>
				<div class="dlgBtn" @click="doModGarageName">确定</div>
			</div>
		</x-dialog>
		<div v-transfer-dom>
			<popup v-model="garageTypePopupShow" @on-hide="" @on-show="">
				<div class="garageTypeButtons">
					<div @click="garageTypePopupShow=false">取消</div>
					<div @click="doModGarageType">确定</div>
				</div>
				<picker :data='garageTypes' :fixed-columns="2" :columns=3 v-model='modGarageType'></picker>
			</popup>
		</div>
		<div v-transfer-dom>
			<popup v-model="garageServiceHourShow" @on-hide="" @on-show="">
				<div class="serviceHourButtons">
					<div @click="garageServiceHourShow=false">取消</div>
					<div @click="doModServiceHour">确定</div>
				</div>
				<picker :data='[serviceHours,serviceHours]' v-model='modServiceHour'></picker>
			</popup>
		</div>
	</div>
</template>

<script>
	import Common from '../../assets/js/common.js';
	import Colin from '../../assets/js/public.js';
	import {
		XDialog,
		Confirm,
		Scroller,
		Group,
		XTextarea,
		Datetime,
		Toast,
		Popup,
		Selector,
		Picker,
		Badge
	} from '../../components/vux';
	import {
		Cell,
		CellBox,
		CellFormPreview,
		TransferDomDirective as TransferDom
	} from 'vux';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		directives: {
			TransferDom
		},
		components: {
			XDialog,
			XTextarea,
			Confirm,
			Scroller,
			Group,
			Cell,
			CellBox,
			CellFormPreview,
			Datetime,
			Toast,
			Popup,
			Selector,
			Picker,
			Badge
		},
		data() {
			return {
				garageInfo: {
					garageInfoDTO: {
						garageName: null
					}
				},
				garageTypeName: '',
				garageServiceHour: '',
				modGarageName: null,
				modGarageType: [],
				modServiceHour: [],
				address: '',
				//控件用
				status: {
					pullupStatus: 'default'
				},
				origin: Common.origin,
				imgUrl: Common.imgUrl,
				scrollerHeight: '', //高度
				isFirst: true, //是否第一次
				doing: false, //防重复
				garageNameDlgShow: false,
				garageTypePopupShow: false,
				garageServiceHourShow: false,
				storeArea:'',
				area:'',
				showConfigPoint:true,
				showSellingArea:false
			}
		},
		computed: {
			...mapGetters(['garageTypes', 'serviceHours'])
		},
		mounted() {
			this.viewInit();
			this.isFirst = false;
		},
		activated() {
			if(!this.isFirst) {
				this.viewInit();
			}
			this.initData();
		},
		methods: {
			viewInit() {
				//页面初始化
				this.scrollerHeight = Common.vh /*- (1.066666) * Common.fs*/ + 'px';
				this.$nextTick(() => {
					this.$refs.scroller.reset();
				});
				//				//alert
				//				this.$vux.alert.show({
				//					title: '提示',
				//					content: "alertDemo",
				//					onShow() {
				//						console.log("alert:show");
				//					},
				//					onHide() {
				//						console.log("alert:hide");
				//					},
				//					buttonText: "关闭弹框"
				//				});
				//				//toast
				//				this.$vux.toast.show({
				//					text: "toastDemo",
				//					time: 3000,
				//					type: "success" //success,warn,cancel,text
				//				});
				//				//confirm
				//				this.$vux.confirm.show({
				//						title: "提示",
				//						content: "请选择",
				//						onCancel() {
				//							console.log(this) // 非当前 vm
				//						},
				//						onConfirm() {}
				//					})
				//					//loading
				//				this.$vux.loading.show({
				//					text: ''
				//				});
				//				this.$vux.loading.hide();
			},
			initData() {
				var self = this;
				this.$vux.loading.show({
					text: '加载中'
				});
				this.$http.post(Colin.exChangeUrl('/do/garageAdmin/grageInfo/garageInfoInit')).then(data => {
					this.$vux.loading.hide();
					var data = data.data;
					this.garageInfo = data;
					this.renderView();
				});
				this.$http.post(Colin.exChangeUrl('/do/garageAdmin/grageInfo/queryGarageInfoStatistics'),{queryType: '3'}).then(res => {
					var data = res.data;
					if(data.resultCode == "1") {
						this.showSellingArea = data.resultObject.showSellingArea;
					} else {
						this.$vux.alert.show({
							title: '提示',
							content: data.resultMessage,
							buttonText: "确认"
						});
					}
				});
			},
			renderView() {
				var self = this;
				this.modGarageName = this.garageInfo.garageInfoDTO.garageName;
				this.modGarageType = [this.garageInfo.garageInfoDTO.garageType];
				this.garageTypes.forEach(function(garageType) {
					if(garageType.value == self.garageInfo.garageInfoDTO.garageType) {
						self.garageTypeName = garageType.name;
					}
				});
				if(this.garageInfo.garageInfoDTO.serviceHoursStart && this.garageInfo.garageInfoDTO.serviceHoursEnd) {
					this.garageServiceHour = this.garageInfo.garageInfoDTO.serviceHoursStart + "-" + this.garageInfo.garageInfoDTO.serviceHoursEnd;
					this.modServiceHour = [this.garageInfo.garageInfoDTO.serviceHoursStart, this.garageInfo.garageInfoDTO.serviceHoursEnd];
				}
				//地址
				var address = "";
				if(this.garageInfo.garageInfoDTO.provinceName) {
					address += this.garageInfo.garageInfoDTO.provinceName + ",";
				}
				if(this.garageInfo.garageInfoDTO.cityName) {
					address += this.garageInfo.garageInfoDTO.cityName + ",";
				}
				if(this.garageInfo.garageInfoDTO.countyName) {
					address += this.garageInfo.garageInfoDTO.countyName + " ";
				}
				if(this.garageInfo.garageInfoDTO.address) {
					address += this.garageInfo.garageInfoDTO.address;
				}
				if(address.length > 0) {
					this.address = address;
				}
				this.area = this.garageInfo.garageInfoDTO.sellingArea?this.garageInfo.garageInfoDTO.sellingArea+'㎡':'请填写';
				this.storeArea = this.garageInfo.garageInfoDTO.sellingArea;
			},
			doModGarageName() {
				var self = this;
				if(!self.modGarageName) {
					this.$vux.toast.show({
						text: "门店名称有误",
						time: 2000,
						type: "text" //success,warn,cancel,text
					});
					return;
				}
				this.doSave("doModGarageName");
				self.garageNameDlgShow = false;
			},
			doModGarageType() {
				var self = this;
				this.doSave("doModGarageType");
				self.garageTypePopupShow = false;
			},
			doModServiceHour() {
				var self = this;
				var now = new Date(),
					hours0 = self.modServiceHour[0].split(":"),
					hours1 = self.modServiceHour[1].split(":"),
					dateBeg = now.setHours(hours0[0], hours0[1], hours0[2], "0"),
					dataEnd = now.setHours(hours1[0], hours1[1], hours1[2], "0");
				if(dateBeg >= dataEnd) {
					this.$vux.toast.show({
						text: "营业时间有误",
						time: 2000,
						type: "text" //success,warn,cancel,text
					});
					return;
				}
				this.doSave("doModServiceHour");
				self.garageServiceHourShow = false;
			},
			doSave(property) {
				var self = this;
				//校验
				this.$vux.loading.show({
					text: '保存中'
				});
				this.$http.post(Colin.exChangeUrl('/do/garageAdmin/grageInfo/garageInfoInit')).then(data => {
					var data = data.data;
					if(property == "doModGarageName") {
						data.garageInfoDTO.garageName = self.modGarageName;
					} else if(property == "doModGarageType") {
						data.garageInfoDTO.garageType = self.modGarageType[0];
					} else if(property == "doModServiceHour") {
						data.garageInfoDTO.serviceHoursStart = self.modServiceHour[0];
						data.garageInfoDTO.serviceHoursEnd = self.modServiceHour[1];
					}
					data.eventCode='101';
					this.$http.post(Colin.exChangeUrl('/do/garageAdmin/grageInfo/doGarageInfo'),{
							formData: JSON.stringify(data)
						}).then(data1 => {
						this.$vux.loading.hide();
						self.doing = false;
						var data = data1.data;
						if(data.resultCode == "1") {
							//								this.$router.go(-1);
							if(data.resultObject==1){
		                    	this.$vux.toast.show({
			                        type:'success',
			                        text:'<p>完善门店基本信息</p><p>+20汽修币</p>'
			                    })
		                    }
							this.initData();
						} else if(data.resultCode == "0") {
							this.$vux.alert.show({
								title: '提示',
								content: "保存失败，服务器异常"
							});
						}
						this.doing = false;
					});
				});
			},
			goSetPosition() {
				//默认坐标上海市政府
				var gpsX = 121.473657,
					gpsY = 31.230378;
				if(!!this.garageInfo.garageInfoDTO.gpsX&&!!this.garageInfo.garageInfoDTO.gpsY){
					gpsX=this.garageInfo.garageInfoDTO.gpsX;
					gpsY=this.garageInfo.garageInfoDTO.gpsY;
				}
				
				this.$router.push({
					path: '/garageInfo/storePosition',
					query: {
						gpsX: gpsX,
						gpsY: gpsY
					}
				});
			},
			setStoreArea() {
				this.$router.push({
					path: '/garageInfo/storeArea',
					query: {
						storeArea: this.storeArea
					}
				});
			}
		}
	}
</script>