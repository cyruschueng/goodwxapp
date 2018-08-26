<template>
	<div class="userlist">
		<el-row>
			<el-col :span="24">
				<user-list :user-data="userData"></user-list>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" style="margin-top:25px;">
				<page :page-no="page_no" :page-size="page_size" :total="total" @getIndex="getNo" @getSize="getSize"></page>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import userList from './usertable'
	import pageIndex from '../../tmp/page'
	export default{
		components:{
			'user-list':userList,
			'page':pageIndex
		},
		data(){
			return{
				host:_const.host,
				userData:[],
				total:0,
				page_no:1,
				page_size:10,
			}
		},
		mounted(){
			this.ifLogin()
			this.users()
		},
		methods:{
			//获取全部用户信息
			users(){
				this.axios.get(`${this.host}/ftk/users`,{
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
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('users')
					} else if (res.data.code==='USER_UNAUTHORIZED') {
						this.errMsg('error', res.data.msg)
						this.logout()
					} else {
						this.$message.error({message:res.data.msg,duration:2000})
					}
				})
			},
			getNo(no){
				this.page_no=no
				this.users()
			},
			getSize(size){
				this.page_size=size
				this.users()
			}
		}
	}
</script>