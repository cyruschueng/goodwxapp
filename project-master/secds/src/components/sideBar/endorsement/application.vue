<template>
	<el-row>
		<el-col :span="24">
			<data-grid :draft-data="list" v-on:getid="getId" @detail="draftDetail"></data-grid>
		</el-col>
		<el-col :span="24" style="margin-top:25px;">
			<page-index :page-no="page_no" :page-size="page_size" :page-sizes="page_sizes" :total="count" v-on:getCurrentIndex="getIndex"
			v-on:getSize="getPageSize" style="float:right;"></page-index>
		</el-col>
		<el-col :span="24" style="margin-top:25px;">
			<card title="背书转让申请信息" icon-name="userinfo">
				<template slot="card_body">
					<el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="170px" class="demo-ruleForm">
						<el-form-item label="转让标识：" prop="">
							<el-radio-group v-model="applyForm.endorse_restrictive" @change="restrictive">
								<el-radio :label="0">可转让</el-radio>
								<el-radio :label="1">不可转让</el-radio>
								</el-radio-group>
						</el-form-item>
						<el-form-item label="被背书人名称：" prop="endorsee_name">
							<el-autocomplete class="inline-input" v-model="applyForm.endorsee_name" :fetch-suggestions="contactSearch"  @select="setendorsee" 
							:trigger-on-focus="true" style="width:193px;"></el-autocomplete>
						</el-form-item>
						<el-form-item label="被背书人账号：" prop="endorsee_account">
							<el-input v-model="applyForm.endorsee_account" style="width:193px;"></el-input>
						</el-form-item>
						<el-form-item label="被背书人开户行：" prop="endorsee_bank_name">
							<el-autocomplete class="inline-input" v-model="applyForm.endorsee_bank_name" :fetch-suggestions="bankSearch" :trigger-on-focus="true" @select="bankSelect" style="width:193px;"></el-autocomplete>
						</el-form-item>
						<el-form-item label="被背书人开户行行号：" prop="endorsee_bank_account">
							<el-input v-model="applyForm.endorsee_bank_account" style="width:193px;"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="endorseSubmit('applyForm')">提交</el-button>
						</el-form-item>
					</el-form>
				</template>
			</card>
		</el-col>
		<el-col :span="24" class="draft-detail">
			<el-dialog :visible.sync="detailShow" size="small">
				<detail></detail>
			</el-dialog>
		</el-col>
	</el-row>
</template>

<script>
	import iconSvg from '../../tmp/icon-svg'
	import dataGrid from '../../tmp/datagrid_1'
	import pageIndex from '../../tmp/pagination'
	import bankData from '../../../assets/data/bankList'
	import card from '../../tmp/card'
	import detail from '../../tmp/detail'
	import {contact} from '../../../mixin/localMethods.js'
	export default{
		mixins:[contact],
		components:{
			'icon': iconSvg,
			'data-grid': dataGrid,
			'page-index': pageIndex,
			'card':card,
			'detail':detail
		},
		data(){
			return{
				host:_const.host,
				id:'',
				list:[],
				count:0,
				page_no:1,
				page_size:10,
				page_sizes:[10,20,30,40],
				bankList: bankData,
				timeout:null,
				applyForm:{
					endorse_restrictive:0,
					endorsee_account:'',
					endorsee_bank_account:'',
					endorsee_bank_name:'',
					endorsee_name:''
				},
				rules:{
					endorsee_account:[
						{ required:true, message:'请填写被背书人账号', trigger:'change' }
					],
					endorsee_bank_account:[
						{ required:true, message:'请填写被背书人开户行行号', trigger:'change' }
					],
					endorsee_bank_name:[
						{ required:true, message:'请填写被背书人开户行', trigger:'change' }
					],
					endorsee_name:[
						{ required:true, message:'请填写被背书人名称', trigger:'change' }
					],
				},
				detailShow:false
			}
		},
		mounted(){
			this.loginStatus()
			this.endorseList()
		},
		methods:{
			//draftlist
			endorseList(){
				this.axios.get(`${this.host}/secds/drafts/endorsement`,{
					params:{
						page_no:this.page_no-1,
						page_size:this.page_size
					},
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.list=res.data.data
						this.count=res.data.count
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('endorseList')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			//获取子组件传递的id
			getId(id) {
				this.id=id
			},
			//获取currentpage
			getIndex(index){
				this.page_no=index
				this.acceptanceList()
			},
			//获取pagesize
			getPageSize(size){
				this.page_size=size
				this.acceptanceList()
			},
			//是否不可转让
			restrictive(value){
				this.applyForm.endorse_restrictive=value
				console.log(this.applyForm.endorse_restrictive)
			},
			//input搜索
			bankSearch(queryString, cb){
				var bank = this.bankList
				var results = queryString ? bank.filter(this.createFilter(queryString)) : bank
		        cb(results)
			},
			createFilter(queryString){
				return bankList=>{
					return (bankList.value.indexOf(queryString.toLowerCase())===0)
				}
			},
			bankSelect(item){
				this.applyForm.endorsee_bank_name=item.value
				this.applyForm.endorsee_bank_account=item.id
			},
			//提交背书转让申请
			endorseSubmit(form){
				if (this.id!=='') {
					this.$refs[form].validate(valid=>{
						if (valid) {
							this.application()
						} else{
							return false
						}
					})
				} else {
					this.g_alert()
				}
			},
			//背书转让申请
			application(){
				this.axios.post(`${this.host}/secds/drafts/${this.id}/endorsement`,{
					endorse_restrictive:this.applyForm.endorse_restrictive,
					endorsee_account:this.applyForm.endorsee_account,
					endorsee_bank_account:this.applyForm.endorsee_bank_account,
					endorsee_bank_name:this.applyForm.endorsee_bank_name,
					endorsee_name:this.applyForm.endorsee_name

				},{
					headers:{
						'content-Type':'application/json',
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.notice('success', res.data.msg)
						this.reset('applyForm')
						this.endorseList()
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('application')
					} else {
						this.notice('warning', res.data.msg)
					}
				})
			},
			//重置
			reset(formName){
				this.$refs[formName].resetFields()
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
			setendorsee(contact){
				this.applyForm.endorsee_name=contact.value
				this.applyForm.endorsee_account=contact.contact_account
				this.applyForm.endorsee_bank_name=contact.contact_bank_name
				this.applyForm.endorsee_bank_account=contact.contact_bank_account
			},
		}
	}
</script>
