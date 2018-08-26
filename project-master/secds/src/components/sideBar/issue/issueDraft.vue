<template>
	<el-row>
		<el-col :span="24">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<iconSvg iconStyle="meunicon" iconClass="issueDraft"></iconSvg>
					<span>出票申请</span>
				</div>
				<div class="card-content">
					<div class="userinfo item top" style="padding:0 0 12px 0;">
						<div class="headline"><span>出票人信息</span></div>
						<user-info user-style="infoList"></user-info>
					</div>
					<div class="draftinfo">
						<el-form :model="info" :rules="infoRules" ref="info" label-width="160px">
							<div class="headline"><span>票据信息</span></div>
							<div class="item">
								<el-form-item label="票据类型：">
									<el-radio-group v-model="info.draft_type" @change="draftType">
										<el-radio :label="1">银承</el-radio>
										<el-radio :label="2">商承</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="票面金额：" prop="draft_value">
									<el-input v-model="info.draft_value" @change="upper" style="width:193px;"></el-input> 元
								</el-form-item>
								<el-form-item label="票面金额（大写）：">
									<p style="color:#1f2d3d;display:inline;"><span style="font-weight:bold;letter-spacing:3px;">{{capital}}</span> 整</p>
								</el-form-item>
								<el-form-item label="出票日期：" prop="draft_start_date">
									<el-date-picker v-model="info.draft_start_date" type="date" placeholder="选择日期" :picker-options="pickerOptions0" 
									@change="startdate"></el-date-picker>
								</el-form-item>
								<el-form-item label="到期日期：" prop="draft_end_date">
									<el-date-picker v-model="info.draft_end_date" type="date" placeholder="选择日期" :picker-options="pickerOptions0"
									@change="endate"></el-date-picker>
								</el-form-item>
								<el-form-item label="是否不可转让：">
									<el-radio-group v-model="info.draft_restrictive" @change="restrictive">
										<el-radio :label="0">可转让</el-radio>
										<el-radio :label="1">不可转让</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="业务功能选择：" style="margin-bottom:0;">
									<el-radio-group v-model="info.draft_auto" @change="functions">
										<el-radio :label="0">手动承兑</el-radio>
										<el-radio :label="1">自动承兑</el-radio>
										<el-radio :label="2">自动承兑及收票</el-radio>
									</el-radio-group>
								</el-form-item>
							</div>
							
							<div class="headline"><span>收款人信息</span></div>
							<div class="item">
								<el-form-item label="收款人姓名：" prop="payee_name">
									<el-autocomplete class="inline-input" v-model="info.payee_name" :fetch-suggestions="contactSearch"  @select="setpayer" 
									:trigger-on-focus="true" style="width:193px;"></el-autocomplete>
								</el-form-item>
								<el-form-item label="收款人账号：" prop="payee_account">
									<el-input v-model="info.payee_account" style="width:193px;"></el-input>
								</el-form-item>
								<el-form-item label="收款人开户行" prop="payee_bank_name">
									<el-autocomplete class="inline-input" v-model="info.payee_bank_name" :fetch-suggestions="bankSearch"  @select="payeeBank" 
									:trigger-on-focus="true" style="width:193px;"></el-autocomplete>
								</el-form-item>
								<el-form-item label="收款人开户行行号：" prop="payee_bank_account" style="margin-bottom:0;">
									<el-input v-model="info.payee_bank_account" style="width:193px;" :disabled="account"></el-input>
								</el-form-item>
							</div>
							
							<div class="headline"><span>承兑人信息</span></div>
							<div class="item bottom">
								<el-form-item label="承兑人名称：" prop="payer_name">
									<el-input v-model="info.payer_name" style="width:193px;" :disabled="isBusiness"></el-input>
								</el-form-item>
								<el-form-item label="承兑人账号：" prop="payer_account">
									<el-input v-model="info.payer_account" style="width:193px;" :disabled="isBank"></el-input>
								</el-form-item>
								<el-form-item label="承兑人开户行：" prop="payer_bank_name">
									<el-autocomplete class="inline-input" v-model="info.payer_bank_name" :fetch-suggestions="bankSearch"  @select="payerBank" 
									:trigger-on-focus="true" :disabled="isBusiness" style="width:193px;"></el-autocomplete>
								</el-form-item>
								<el-form-item label="承兑人开户行行号：" prop="payer_bank_account" style="margin-bottom:0;">
									<el-input v-model="info.payer_bank_account" style="width:193px;" :disabled="account"></el-input>
								</el-form-item>
							</div>

							<el-form-item style="text-align:center;margin-top:20px;">
								<el-button type="primary" @click="submitForm('info')">出票</el-button>
								<el-button @click="resetForm('info')">重置</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
	import iconSvg from '../../tmp/icon-svg'
	import userInfo from '../../tmp/userinfo'
	import bankList from '../../../assets/data/bankList.js'//银行信息
	import capital from '../../../assets/js/capital.js'//人民币大写
	import {contact} from '../../../mixin/localMethods.js'//常用联系人
	export default{
		mixins:[contact],
		components:{
			'iconSvg':iconSvg, 
			'user-info':userInfo
		},
		data(){
			var value_limit=(rule, value, callback)=>{
				if (!value) {
					callback(new Error('请填写票面金额'));
				} else if (parseInt(value)>1000000000) {
					callback(new Error('票面金额不能超过10亿'));
				} else {
					callback()
				}
			}
			return{
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				host:_const.host,
				userinfo:{},
				bankList:bankList,
				contactList:[],
				timeout:null,
				capital:'零元',
				info:{
					draft_type:1,
					draft_value:'',
					capital:'',
					draft_start_date:'',
					draft_end_date:'',
					draft_restrictive:0,
					draft_auto:0,
					payee_name:'',
					payee_account:'',
					payee_bank_name:'',
					payee_bank_account:'',
					payer_name:'',
					payer_account:'0',
					payer_bank_name:'',
					payer_bank_account:''
				},
				infoRules:{
					draft_type:[
						{ required: true, message: '请选择票据类型', trigger:'change'}
					],
					draft_value:[
						{ validator: value_limit, trigger:'change'},
					],
					draft_start_date:[
						{ required: true, message: '请填写出票日期', trigger:'change'}
					],
					draft_end_date:[
						{ required: true, message: '请填写到期日期', trigger:'change'}
					],
					draft_restrictive:[
						{ required: true, message: '请选择是否不可转让', trigger:'change'}
					],
					draft_auto:[
						{ required: true, message: '请选择业务功能', trigger:'change'}
					],
					payee_name:[
						{ required: true, message: '请填写收款人姓名', trigger:'change,blur'}
					],
					payee_account:[
						{ required: true, message: '请填写收款人账号', trigger:'change'}
					],
					payee_bank_name:[
						{ required: true, message: '请填写收款人开户行', trigger:'change'}
					],
					payee_bank_account:[
						{ required: true, message: '请填写收款人开户行行号', trigger:'change'}
					],
					payer_name:[
						{ required: true, message: '请填写承兑人姓名', trigger:'blur'}
					],
					payer_account:[
						{ required: true, message: '请填写承兑人账号', trigger:'blur'}
					],
					payer_bank_name:[
						{ required: true, message: '请填写承兑人开户行', trigger:'change'}
					],
					payer_bank_account:[
						{ required: true, message: '请填写承兑人开户行行号', trigger:'blur'}
					]
				},
				isBusiness:false,
				isBank:true,
				account:true
			}
		},
		mounted(){
			this.loginStatus()
			this.info.draft_start_date=new Date()
			this.info.draft_end_date=this.end_date
		},
		computed:{
			//当前时间加一年
			end_date:function(){
				let date=new Date()
				date.setYear(date.getFullYear()+1)
				return date
			}
		},
		methods:{
			//监听票据类型
			draftType(type){
				this.info.draft_type=type
				if (type==2) {
					let user=JSON.parse(this.cookie.get('userinfo'))
					this.isBusiness=true
					this.isBank=true
					this.info.payer_name=user.user_name
					this.info.payer_account=user.user_account
					this.info.payer_bank_name=user.bank_name
					this.info.payer_bank_account=user.bank_account
					this.info.draft_auto=1
				} else {
					this.isBusiness=false
					this.isBank=true
					this.info.payer_name=''
					this.info.payer_account='0'
					this.info.payer_bank_name=''
					this.info.payer_bank_account=''
					this.info.draft_auto=0
				}
			},
			restrictive(type){
				this.info.draft_restrictive=type
			},
			functions(type){
				this.info.draft_auto=type
			},
			startdate(date){
				this.info.draft_start_date=date
			},
			endate(date){
				this.info.draft_end_date=date
			},
			//检索银行
			bankSearch(queryString, cb){
				var bank=this.bankList
				var results = queryString ? bank.filter(this.createFilter(queryString)) : bank
        		// 调用 callback 返回建议列表的数据
        		cb(results);
			},
			//检索联系人
			contactSearch(queryString, cb){
				var contact=this.contact()
				var results = queryString ? contact.filter(this.createFilter(queryString)) : contact
				clearTimeout(this.timeout)
        		this.timeout=setTimeout(()=>{
        			cb(results);
        		}, 500)
			},
			//收款人银行检索
			payeeBank(bank){
				this.info.payee_bank_name=bank.value
				this.info.payee_bank_account=bank.id
			},
			//收款人银行检索
			payerBank(bank){
				this.info.payer_bank_name=bank.value
				this.info.payer_bank_account=bank.id
			},
			setpayer(contact){
				this.info.payee_name=contact.value
				this.info.payee_account=contact.contact_account
				this.info.payee_bank_name=contact.contact_bank_name
				this.info.payee_bank_account=contact.contact_bank_account
			},
			//确认出票
			submitForm(form){
				this.$refs[form].validate(valid=>{
					if (valid) {
						this.axios.post(`${this.host}/secds/drafts`,{
							draft_auto:this.info.draft_auto,
							draft_start_date:this.info.draft_start_date,
							draft_end_date:this.info.draft_end_date,
							draft_type:this.info.draft_type,
							draft_restrictive:this.info.draft_restrictive,
							draft_value:this.info.draft_value,
							payee_account:this.info.payee_account,
							payee_bank_account:this.info.payee_bank_account,
							payee_bank_name:this.info.payee_bank_name,
							payee_name:this.info.payee_name,
							payer_account:this.info.payer_account,
							payer_bank_account:this.info.payer_bank_account,
							payer_bank_name:this.info.payer_bank_name,
							payer_name:this.info.payer_name
						},{
							headers:{
								'Content-Type':'application/json',
								token:this.cookie.get('token')
							}
						}).then(res=>{
							if (res.data.code==='OK') {
								this.notice('success', '出票成功')
								this.resetForm(form)
								this.capital='零元'
							} else if(res.data.code==='TOKEN_INVLID') {
								this.token('submitForm',form)
							} else {
								this.errMsg('error', res.data.msg)
							}
						})
					} else {
						return false
					}
				})
			},
			//重置
			resetForm(form){
				this.$refs[form].resetFields()
			},
			upper(value){//string
				this.capital=capital(this.info.draft_value)
			}
		}
	}
</script>

<style scoped>
ul,li{
	list-style-type: none;
	padding: 0;
	margin: 0;
}
.meunicon{
	width: 20px;
	height: 20px;
	vertical-align: -0.22em;
	fill: #333;
	overflow: hidden;
}
.el-input__inner{
	height: 21px;
}
.box-card .card-content{
	width: 94%;
	margin: 0 auto;
	overflow: hidden;
}
.box-card .item{
	border-left: 1px solid #20A0FF;
	border-right: 1px solid #20A0FF;
	padding: 18px 0;
}
.box-card .top{
	overflow: hidden;
	border-top: 1px solid #20A0FF;
	border-radius: 4px 4px 0 0;
}
.box-card .bottom{
	overflow: hidden;
	border-bottom: 1px solid #20A0FF;
	border-radius: 0 0 4px 4px;
}
.box-card .headline{
	font-size: 12px;
	color: #fff;
	width: 100%;
	height: 28px;
	line-height: 28px;
	background-color: #58B7FF;
}
.box-card .headline span{
	margin-left: 15px;
}
.infoList{
	font-size: 14px;
}
.infoList li:first-child{
	margin-top: 12px;
}
.infoList li{
	margin-bottom: 12px;
}
.infoList li p{
	display: inline-block;
	width: 150px;
	text-align: right;
	margin: 0 8px 0 0;
}
.el-input-group__append{
	padding: 0;
}
</style>