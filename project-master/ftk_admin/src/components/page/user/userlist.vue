<template>
	<el-row>
		<!-- usertable -->
		<el-col :span="24">
			<user-table :user-data="userData" @roles="assignRoles" @business="toBusiness"></user-table>
		</el-col>
		<!-- pagination -->
		<el-col :span="24" style="margin-top:25px;">
			<page :page-no="page_no" :page-size="page_size" :total="total" @getIndex="pageNo" @getSize="pageSize" style="float:right;"></page>
		</el-col>

		<!-- roleEdit -->
		<el-dialog title="修改用户角色" :visible.sync="roleEdit">
			<el-form v-model="roleForm" label-width="100px">
				<el-form-item label="用户角色：">
					<el-radio-group v-model="roleForm.role" @change="roleChange">
						<el-radio :label="1">注册用户</el-radio>
						<el-radio :label="2">初审员</el-radio>
						<el-radio :label="3">复核员</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="可审业务：" v-show="fundShow">
					<template>
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="CheckAllChange">全选</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="checkedfunds" @change="fundsChange">
							<el-checkbox v-for="funds in funds_type" :label="funds" :key="funds">{{funds}}</el-checkbox>
						</el-checkbox-group>
					</template>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="roleEdit=false">取 消</el-button>
				<el-button type="primary" @click="confirmRole">确 定</el-button>
			</div>
		</el-dialog>

	</el-row>
</template>

<script>
	import userTable from './usertable'
	import pageIndex from '../../tmp/page'
	import bus from '../../../assets/js/eventBus'
	export default{
		components:{
			'user-table':userTable,
			'page':pageIndex
		},
		data(){
			return{
				myOption:'mixin',
				host:_const.host,
				userData:[],
				page_no: 1,
				page_size: 10,
				total: 0,
				src:'../../assets/avatar.jpg',
				roleEdit:false,
				roleForm:{
					role:undefined
				},
				user_id:'',
				role:'',
				checkAll:true,
				isIndeterminate: true,
				fundShow:false,
				checkedfunds:['保证金代存', '敞口代还', '信用证代付', '信易贷', '流贷倒贷', '短融过桥', '融易贷', '时点存款', '特需摆账', '应收保理', '反向保理'],
				funds_type:['保证金代存', '敞口代还', '信用证代付', '信易贷', '流贷倒贷', '短融过桥', '融易贷', '时点存款', '特需摆账', '应收保理', '反向保理'],
				selected:[],
			}
		},
		mounted(){
			this.ifLogin()
			this.userList()
		},
		methods:{
			//pagination
			pageNo(index){
				this.page_no=index
				this.userList()
			},
			pageSize(size){
				this.page_size=size
				this.userList()
			},
			//userList
			userList(){
				this.axios.get(`${this.host}/ftk/companys/users/auth`,{
					params:{
						page_no:this.page_no-1,
						page_size:this.page_size
					},
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.userData=res.data.data
						this.total=res.data.count
					} else if(res.data.code==='TOKEN_INVLID') {
						this.token('userList')
					} else if(res.data.code==='USER_UNAUTHORIZED') {
						this.errMsg('error', res.data.msg)
						this.logout()
					} else {
						this.$message.error({message:res.data.msg, duration:2000})
					}
				})
			},
			//assignRoles
			assignRoles(row,){
				this.roleForm.role=row.role
				this.role=row.role
				this.user_id=row.id
				this.roleEdit=true
				this.judgement(row.role)
			},
			roleChange(index,){
				this.role=index
				this.judgement(index)
			},
			judgement(role){
				if (role<=1 || role>=4) {
					this.fundShow=false
				} else {
					this.fundShow=true
				}
			},
			//确认修改
			confirmRole(){
				let risk_funds_type=this.transfer()
				this.axios.post(`${this.host}/ftk/companys/users/${this.user_id}/role`,{
					role:this.role,
					risk_funds_type:risk_funds_type
				},{
					headers:{
						'Content-Type':'application/json',
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.roleEdit=false
						this.$notify({type:'success', message:'设置成功', duration:2000})
						this.userList()
						this.selected=[]
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('confirmRole')
					} else if(res.data.code==='USER_UNAUTHORIZED') {
						this.errMsg('error', res.data.msg)
						this.logout()
					} else {
						this.$notify.error({message:res.data.msg, duration:2000})
					}
				})
			},
			//跳转到资金业务页面
			toBusiness(row){
				bus.$emit('user_id', row.id)
				this.$router.push({
					path:'/uBusiness',
					query:{
						user_id:row.id
					}
				})
			},
			CheckAllChange(event){
				this.checkedfunds = event.target.checked ? this.funds_type : []
				this.isIndeterminate = false
			},
			fundsChange(value){
			 	let checkedCount = value.length;
    			this.checkAll = checkedCount === this.funds_type.length;
    			this.isIndeterminate = checkedCount > 0 && checkedCount < this.funds_type.length;
			},
			transfer(){
				let funds=this.checkedfunds
				for(let i=0; i<funds.length; i++){
					if (funds[i]=='保证金代存') {
						this.selected.push(1)
					} else if (funds[i]=='敞口代还') {
						this.selected.push(2)
					} else if (funds[i]=='信用证代付') {
						this.selected.push(3)
					} else if (funds[i]=='信易贷') {
						this.selected.push(4)
					} else if (funds[i]=='流贷倒贷') {
						this.selected.push(5)
					} else if (funds[i]=='短融过桥') {
						this.selected.push(6)
					} else if (funds[i]=='融易贷') {
						this.selected.push(7)
					} else if (funds[i]=='时点存款') {
						this.selected.push(8)
					} else if (funds[i]=='特需摆账') {
						this.selected.push(9)
					} else if (funds[i]=='应收保理') {
						this.selected.push(10)
					} else {
						this.selected.push(11)
					}
				}
				return this.selected
			}
		}
	}
</script>
