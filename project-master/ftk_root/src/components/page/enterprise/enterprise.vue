<template>
	<div class="newly">
		<el-row style="margin-bottom:25px;">
			<el-col :span="24">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span >新增企业</span>
					</div>
					<div class="box-body">
						<el-form :model="newlyForm" :rules="newlyRules" ref="newlyForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="企业名称：" prop="company_name" style="width:400px;">
								<el-input v-model="newlyForm.company_name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="add('newlyForm')">确认</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :sapn="24">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span >设置公司管理员</span>
					</div>
					<div class="box-body">
						<el-form :model="adminForm" :rules="adminRules" ref="adminForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="企业名称：" prop="company_name" style="width:400px;">
								<el-input v-model="adminForm.company_name"></el-input>
							</el-form-item>
							<el-form-item label="手机号：" prop="user_id" style="width:400px;">
								<el-input v-model="adminForm.user_id"></el-input>
							</el-form-item>
							<el-form-item label="默认密码" prop="user_passwd" style="width:400px;">
								<el-input v-model="adminForm.user_passwd"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="setting('adminForm')">确认</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				host:_const.host,
				newlyForm:{
					company_name:''
				},
				newlyRules:{
					company_name:[
						{ required:true, message:'请填写企业名称', trigger:'blur' }
					]
				},
				adminForm:{
					company_name:'',
					user_id:'',
					user_passwd:''
				},
				adminRules:{
					company_name:[
						{ required:true, message:'请填写企业名称', trigger:'blur' }
					],
					user_id:[
						{ required:true, message:'请填写用户手机号', trigger:'blur' },
						{ pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
					],
					user_passwd:[
						{ required:true, message:'请填写默认密码', trigger:'blur' },
					]
				}
			}
		},
		mounted(){
			this.ifLogin()
		},
		methods:{
			//新增企业
			add(form){
				this.$refs[form].validate(valid=>{
					if (valid) {
						this.axios.post(`${this.host}/ftk/companys`,{
							company_name:this.newlyForm.company_name
						},{
							headers:{
								'Content-Type':'application/json',
								token:this.cookie.get('token')
							}
						}).then(res=>{
							if (res.data.code==='OK') {
								this.$notify({type:'success', message:'添加成功', duration:2000})
							} else if (res.data.code==='TOKEN_INVLID') {
								this.token('add',form)
							} else if (res.data.code==='USER_UNAUTHORIZED') {
								this.errMsg('error', res.data.msg)
								this.logout()
							}  else {
								this.$notify.error({message:res.data.msg, duration:2000})
							}
						})
					} else {
						return false
					}
				})
			},
			//设置公司管理员
			setting(form){
				this.$refs[form].validate(valid=>{
					if (valid) {
						this.axios.post(`${this.host}/ftk/users/role/admin`,{
							company_name:this.adminForm.company_name,
							user_id:this.adminForm.user_id,
							user_passwd:this.adminForm.user_passwd
						},{
							headers:{
								'Content-Type':'application/json',
								token:this.cookie.get('token')
							}
						}).then(res=>{
							if (res.data.code==='OK') {
								this.$notify({type:'success', message:'设置成功', duration:2000})
							} else if (res.data.code==='TOKEN_INVLID') {
								this.token('setting', form)
							} else if (res.data.code==='USER_UNAUTHORIZED') {
								this.errMsg('error', res.data.msg)
								this.logout()
							}  else {
								this.$notify.error({message:res.data.msg, duration:2000})
							}
						})
					} else {
						return false
					}
				})
			},
			//重置
			reset(){}
		}
	}
</script>

<style scoped>
.newly{
	padding: 10px 20px;
}
</style>

