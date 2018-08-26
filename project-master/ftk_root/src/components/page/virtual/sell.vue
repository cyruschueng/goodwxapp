<template>
	<el-row>
		<el-col :span="24">
			<el-form :model="fundsForm" :rules="fundsRules" ref="fundsForm" label-width="160px" class="demo-ruleForm">
				<el-form-item label="手机号码：" prop="mobile" style="width:400px;">
					<el-input v-model="fundsForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="汇票类型：" prop="draft_type">
					<el-radio-group v-model="fundsForm.draft_type">
						<el-radio :label="1">银承纸票</el-radio>
						<el-radio :label="2">商承纸票</el-radio>
						<el-radio :label="3">银承电票</el-radio>
						<el-radio :label="4">商承电票</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="总金额（元）：" prop="draft_value" style="width:400px;">
					<el-input v-model="fundsForm.draft_value"></el-input>
				</el-form-item>
				<el-form-item label="汇票张数：" prop="draft_count" style="width:400px;">
					<el-input v-model="fundsForm.draft_count"></el-input>
				</el-form-item>
				<el-form-item label="到期时间：" prop="draft_end_date" style="width:400px;">
					<el-date-picker type="date" placeholder="选择日期" v-model="fundsForm.draft_end_date" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="售价（元）：" prop="sell_price" style="width:400px;">
					<el-input v-model="fundsForm.sell_price"></el-input>
				</el-form-item>
				<el-form-item label="标签信息：" prop="tags" style="width:400px;">
					<el-input v-model="fundsForm.tags" placeholder="以中文半角；分隔"></el-input>
				</el-form-item>
				<el-form-item label="承兑人：" prop="acceptance" style="width:400px;">
					<el-input v-model="fundsForm.acceptance"></el-input>
				</el-form-item>
				<el-form-item label="交易地点：" prop="address" style="width:400px;">
					<el-input v-model="fundsForm.address"></el-input>
				</el-form-item>
				<el-form-item label="汇票图片：" prop="pics">
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
				<el-form-item>
					<el-button type="primary" @click="submitForm('fundsForm')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24">
			<dialog-box :visible="display" :mobile="fundsForm.mobile" @isVisible="handleClose" @visibleChange='onVisibleChange'></dialog-box>
		</el-col>
	</el-row>
</template>

<script>
import format from '../../../assets/js/format'
import dialogBox from './components/dialog.vue'
import localMethods from '../../../mixin/localMethods.js'
export default{
	mixins: [localMethods],
	components:{
		'dialog-box': dialogBox
	},
	data(){
		return{
			host: _const.dtk_host,
			display: false,
			fundsForm: {
				mobile: '',
				draft_type: 1,
				draft_value: '',
				draft_count: '',
				draft_end_date: '',
				sell_price: '',
				tags: '',
				acceptance: '',
				pics: '',
				address: ''
			},
			fundsRules: {
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
                	{ pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
				],
				draft_value: [
					{ required: true, message: '请填写业务金额', trigger: 'blur' },
				],
				draft_count: [
					{ required: true, message: '请填写汇票张数', trigger: 'blur' },
				],
				draft_end_date: [
					{ type:'date', required: true, message: '请选择到期日期', trigger: 'change' },
				],
				sell_price: [
					// { required: true, message: '请输填写售价', trigger: 'blur' },
				],
				tags: [
					// { required: true, message: '请填写标签信息', trigger: 'blur' },
				],
				acceptance: [
					// { required: true, message: '请填写承兑人', trigger: 'blur' },
				],
				address: [
					// { required: true, message: '请填写交易地点', trigger: 'blur' },
				],
			},
			base: '',
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
			fileList:[],
		}
	},
	computed: {
		pics: function() {
			let picList = []
			this.fileList.forEach(value => {
				picList.push(`${this.base}/${value}`)
			})
			return picList
		},
		tags: function() {
			return this.fundsForm.tags.split('；')			
		}
	},
	mounted(){
		this.get_sign()
	},
	methods:{
		submitForm(form){
			this.$refs[form].validate(valid => {
				if (valid) {
					this.axios.post(`${this.host}/dtk/dummy/drafts/sell`,{
						mobile: this.fundsForm.mobile,
						draft_type: Number(this.fundsForm.draft_type),
						draft_value: Number(this.fundsForm.draft_value),
						draft_count: Number(this.fundsForm.draft_count),
						draft_end_date: format(this.fundsForm.draft_end_date),
						sell_price: Number(this.fundsForm.sell_price),
						tags: this.tags,
						acceptance: this.fundsForm.acceptance,
						pics: this.pics,
						address: this.fundsForm.address
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
							this.notice('success', res.data.msg)
						} else if (res.data.code === 'DUMMYUSER_NOT_EXIST') {
							this.boxOpen()
						}  else {
							this.errMsg('error', res.data.msg)
						}
					})
				} else {
					return false
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
		},
		handleOpen(){
			this.display = true
		},
		handleClose() {
			this.display = false
		},
		onVisibleChange(val) {
			this.display = val
		}
	}
}
</script>