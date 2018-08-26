<template>
	<div class="discount">
		<el-row>
			<el-col :span="24">
				<data-grid :data-list="list" @transfer="getId" @detail="draftDetail"></data-grid>
			</el-col>
			<el-col :span="24" style="margin:15px 0;">
				<page :page-no="page_no" :page-size="page_size" :page-sizes="page_sizes" :total="count" v-on:getCurrentIndex="getIndex"
				v-on:getSize="getPageSize" style="float:right;"></page>	
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<card :title="card_title" icon-name="userinfo">
					<template slot="card_body">
						<el-form :model="discountForm" :rules="rules" ref="discountForm" label-width="150px" class="demo-ruleForm">
							<el-form-item label="贴入人名称：" prop="endorsee_name">
								<el-input v-model="discountForm.endorsee_name" style="width:192px;"></el-input>
							</el-form-item>
							<el-form-item label="贴入人账号：" prop="endorsee_account">
								<el-input v-model="discountForm.endorsee_account" style="width:192px;" :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="贴入人开户行：" prop="endorsee_bank_name">
								<el-autocomplete class="inline-input" v-model="discountForm.endorsee_bank_name" :fetch-suggestions="bankSearch"  @select="payeeBank"
									:trigger-on-focus="true" style="width:192px;"></el-autocomplete>
							</el-form-item>
							<el-form-item label="贴入人开户行行号：" prop="endorsee_bank_account">
								<el-input v-model="discountForm.endorsee_bank_account" style="width:192px;" :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="资金扣划方式：">
								<span>票款对付</span>
							</el-form-item>
							<el-form-item label="贴现类型：">
								<el-radio-group v-model="discountForm.endorse_type">
									<el-radio :label="2">买断式</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="贴现利率（%）：">
								<el-input v-model="discountForm.lv" style="width:192px;"></el-input>
							</el-form-item>
							<el-form-item label="转让标识：">
								<el-radio-group v-model="discountForm.endorse_restrictive">
									<el-radio :label="0">可转让</el-radio>
									<el-radio :label="1">不可转让</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submit('discountForm')">提交</el-button>
							</el-form-item>
						</el-form>
					</template>
				</card>	
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" class="draft-detail">
				<el-dialog :visible.sync="detailShow" size="small">
					<detail></detail>
				</el-dialog>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import iconSvg from '../../tmp/icon-svg'
import pageIndex from '../../tmp/pagination'
import dataGrid from './components/datagrid'
import card from '../../tmp/card'
import bankList from '../../../assets/data/bankList'
import detail from '../../tmp/detail'
import {contact} from '../../../mixin/localMethods'
export default{
	mixins:[contact],
	components:{
		'icon':iconSvg,
		'page':pageIndex,
		'data-grid':dataGrid,
		'card':card,
		'detail':detail
	},
	data(){
		return{
			list:[],
			id:'',
			count:0,
			page_no:1,
			page_size:10,
			page_sizes:[10,20,30,40],
			card_title:'贴现申请信息',
			discountForm:{
				endorsee_name:'',
				endorsee_account:'0',
				endorsee_bank_name:'',
				endorsee_bank_account:'',
				endorse_type:2,
				lv:'',
				endorse_restrictive:0
			},
			rules:{
				endorsee_name:[
					{ required:true, message:'请填写贴入人名称', trigger:'change' }
				],
				endorsee_account:[
					{ required:true, message:'请填写贴入人账号', trigger:'change' }
				],
				endorsee_bank_name:[
					{ required:true, message:'请填写贴入人名称', trigger:'change' }
				],
				endorsee_bank_account:[
					{ required:true, message:'请填写贴入人名称', trigger:'change' }
				]
			},
			bankList:bankList,
			timeout:null,
			detailShow:false
		}
	},
	mounted(){
		this.loginStatus()
		this.draftlist()
	},
	methods:{
		getId(id){
			this.id=id
		},
		//获取currentpage
		getIndex(index){
			this.page_no=index
			this.draftlist()
		},
		//获取pagesize
		getPageSize(size){
			this.page_size=size
			this.draftlist()
		},
		draftlist(){
			this.axios.get(`${_const.host}/secds/drafts/discount`,{
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
					this.token('draftlist')
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		//检索银行
		bankSearch(queryString, cb){
			var bank=this.bankList
			var results = queryString ? bank.filter(this.createFilter(queryString)) : bank
    		// 调用 callback 返回建议列表的数据
    		cb(results);
		},
		createFilter(queryString) {
			return (bank) => {
				return (bank.value.indexOf(queryString.toLowerCase()) === 0)
			};
		},
		//设置行号
		payeeBank(bank){
			this.discountForm.endorsee_bank_name=bank.value
			this.discountForm.endorsee_bank_account=bank.id
		},
		//贴现申请
		submit(form){
			this.$refs[form].validate(valid=>{
				if (valid) {
					if (this.id==='') {
						this.g_alert()
					} else {
						this.discount()
					}
				} else {
					return false
				}
			})
		},
		discount(){
			this.axios.post(`${_const.host}/secds/drafts/${this.id}/discount`,{
				endorse_restrictive:this.discountForm.endorse_restrictive,
				endorsee_account:this.discountForm.endorsee_account,
				endorsee_bank_account:this.discountForm.endorsee_bank_account,
				endorsee_name:this.discountForm.endorsee_name,
				endorsee_bank_name:this.discountForm.endorsee_bank_name
			},{
				headers:{
					'Content-Type':'application/json',
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.draftlist()
					this.notice('success', res.data.msg)
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('discount')
				} else {
					this.notice('warning', res.data.msg)
				}
			})
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
			this.discountForm.endorsee_name=contact.value
			this.discountForm.endorsee_account=contact.contact_account
			this.discountForm.endorsee_bank_name=contact.contact_bank_name
			this.discountForm.endorsee_bank_account=contact.contact_bank_account
		},
	}
}
</script>
