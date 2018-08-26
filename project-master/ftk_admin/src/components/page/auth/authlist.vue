<template>
	<div class="auth">
		<el-row>
			<el-col :span="24">
				<user-table :user-data="authData" @agree="agree" @refuse="tip"></user-table>
			</el-col>
			<el-col :span="24" style="margin-top:25px;">
				<page :page-no="page_no" :page-size="page_size" :total="total" @getIndex="pageNo" @getSize="pageSize" style="float:right;"></page>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24"></el-col>
		</el-row>
	</div>
</template>

<script>
import userTable from './usertable'
import pageIndex from '../../tmp/page'
export default {
	components:{
		'user-table':userTable,
		'page':pageIndex
	},
	data(){
		return{
			host:_const.host,
			authData:[],
			page_no:1,
			page_size:10,
			total:0,
		}
	},
	mounted(){
		this.ifLogin()
		this.authList()
	},
	methods:{
		//pagination
		pageNo(index){
			this.page_no=index
			this.authList()
		},
		pageSize(size){
			this.page_size=size
			this.authList()
		},
		//authlist
		authList(){
			this.axios.get(`${this.host}/ftk/companys/users`,{
				params:{
					page_no:this.page_no-1,
					page_size:this.page_size
				},
				headers:{
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.authData=res.data.data
					this.total=res.data.count
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('authList')
				} else if(res.data.code==='USER_UNAUTHORIZED') {
					this.errMsg('error', res.data.msg)
					this.logout()
				} else {
					this.$message.error({message:res.data.msg, duration:2000})
				}
			})
		},
		//同意
		agree(row){
			this.axios.post(`${this.host}/ftk/companys/users/${row.id}/auth/agree`,{},{
				headers:{
					'Content-Type':'application/json',
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.$notify({type:'success', message:'操作成功', duration:2000})
					this.authList()
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('agree')
				} else if(res.data.code==='USER_UNAUTHORIZED') {
					this.errMsg('error', res.data.msg)
					this.logout()
				} else {
					this.$notify.error({message:res.data.msg, duration:2000})
				}
			})
		},
		//拒绝
		refuse(row){
			this.axios.post(`${this.host}/ftk/companys/users/${row.id}/auth/refuse`,{},{
				headers:{
					'Content-Type':'application/json',
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.$notify({type:'success', message:'操作成功', duration:2000})
					this.authList()
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('refuse')
				} else if(res.data.code==='USER_UNAUTHORIZED') {
					this.errMsg('error', res.data.msg)
					this.logout()
				} else {
					this.$notify.error({message:res.data.msg, duration:2000})
				}
			})
		},
		//拒绝提示
		tip(row){
			this.$confirm('此操作将拒绝改用户的认证, 是否继续?', '提示', {
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'wraning'
			}).then(()=>{
				this.refuse(row)
			}).catch(()=>{})
		},
	}
}
</script>

<style scoped>
.avatar{
	width: 40px;
	height: 40px;
	border-radius: 100%;
	overflow: hidden;
	vertical-align: middle;
}
</style>