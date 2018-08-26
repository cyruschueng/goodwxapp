<template>
	<div class="dialog">
		<el-row>
			<el-col :span="24">
				<el-dialog title="注册虚拟用户" :visible.sync="myVisible" width="30%">
					<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="160px" class="demo-ruleForm">
						<el-form-item label="真实姓名：" prop="name" style="width:400px;">
							<el-input v-model="addForm.name"></el-input>
						</el-form-item>
						<el-form-item label="手机号码：" prop="mobile" style="width:400px;">
							<el-input v-model="mobile"></el-input>
						</el-form-item>
						<el-form-item label="工作地点：" prop="address" style="width:400px;">
							<el-input v-model="addForm.address"></el-input>
						</el-form-item>
						<el-form-item label="公司名称：" prop="company" style="width:400px;">
							<el-input v-model="addForm.company"></el-input>
						</el-form-item>
						<el-form-item label="性别：" prop="gender">
							<el-radio-group v-model="addForm.gender">
								<el-radio :label="0">未知</el-radio>
								<el-radio :label="1">男</el-radio>
								<el-radio :label="2">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="头像：" prop="avatar">
							<el-upload 
								ref="upload"
								:action="base" 
								list-type="picture-card"
								:before-upload="handleUpload" 
								:data="params"
								>
								<i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="isVisible">取 消</el-button>
						<el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
					</span>
				</el-dialog>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default{
	name: 'dialog',
	props: ['visible','mobile'],
	data() {
		return {
			myVisible: this.visible,
			host: _const.dtk_host,
			base: '',
			addForm:{
				name: '',
				address: '',
				company: '',
				gender: 0,
				mobile: '13333333333',
				avatar: ''
			},
			addRules:{
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: 'change' },
                	{ pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
				],
				name: [
					{ required: true, message: '请填写真实姓名', trigger: 'blur' },
				],
				address: [
					{ required: true, message: '请填写工作地点', trigger: 'blur' },
				],
				company: [
					{ required: true, message: '请填写公司名称', trigger: 'blur' },
				],
				avatar: [
					// { required: true, message: '请填写头像地址', trigger: 'blur' },
				]
			},
			list: [],
			upload_dir:'',
			filename:'',
			suffix:'',
			params:{
				key:'',
				OSSAccessKeyId:'',
				policy:'',
				signature:'',
				expire:'',
				success_action_status:'200',
			},
			fileList:[]
		}
	},
	watch: {
		visible(val) {
			this.myVisible = val
		},
		myVisible(val) {
			this.$emit('visibleChange', val)
		}
	},
	mounted(){
		this.get_sign()
	},
	methods: {
		isVisible(){
			this.$emit('isVisible')
		},
		submitForm(form){
			this.$refs[form].validate(valid => {
				if (valid) {
					this.axios.post(`${this.host}/dtk/dummy/users`,{
						name: this.addForm.name,
						address: this.addForm.address,
						company: this.addForm.company,
						gender: this.addForm.gender,
						mobile: this.mobile,
						avatar: this.addForm.avatar
					},{
						headers:{
							"code": "www.dlyunzhi.com",
							"Content-Type": "application/json"
						}
					}).then(res => {
						if (res.data.code === 'OK') {
							this.resetForm(form)
							this.fileList = []
							this.$refs.upload.clearFiles()
							this.myVisible = false
							this.notice('success', res.data.msg)
						} else {
							this.errMsg('error', res.data.msg)
						}
					})
				} else {
					return false;
				}
			})
		},
		resetForm(form) {
			this.$refs[form].resetFields();
		},
		//取得头像上传签名
		get_sign(){
			this.axios.get(`${this.host}/dtk/news/pic/sign`).then(res=>{
				if (res.data.code!=='OK') {
					this.g_message('error', res.data.msg)
					console.log('error')
					return false
				} else {
					this.base=res.data.sign.host
					this.upload_dir=res.data.sign.upload_dir
					this.filename=res.data.sign.filename
					this.params.OSSAccessKeyId=res.data.sign.accessid
					this.params.policy=res.data.sign.policy
					this.params.signature=res.data.sign.signature
					this.params.expire=res.data.sign.expire
				}
			})
		},
		handleUpload(file){
			this.get_sign()
			let filename=file.name
			let namesplit=filename.split('.')
			let suffix=namesplit[1]

			this.params.key=`${this.upload_dir}${this.filename}.${suffix}`
			this.fileList.push(this.params.key)
			this.addForm.avatar = `${this.base}/${this.fileList[0]}`
		}
	}
}
</script>