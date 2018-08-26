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
				<el-form-item label="汇票金额：" prop="draft_value" >
					<el-checkbox-group v-model="fundsForm.draft_value" @change="valueChange">
						<el-checkbox v-for="(value, index) in value" :label="index+1" :key="value">{{value}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="承兑人：" prop="acceptance_type">
					<el-checkbox-group v-model="fundsForm.acceptance_type" @change="typeChange">
						<el-checkbox v-for="(type, index) in type" :label="index+1" :key="type">{{type}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="汇票期限：" prop="draft_term">
					<el-checkbox-group v-model="fundsForm.draft_term" @change="termChange">
						<el-checkbox v-for="(term, index) in term" :label="index+1" :key="term">{{term}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="交易地点：" prop="address" style="width:400px;">
					<el-input v-model="fundsForm.address"></el-input>
				</el-form-item>
				<el-form-item label="票据备注：" prop="draft_comment" style="width:400px;">
					<el-input v-model="fundsForm.draft_comment"></el-input>
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
				draft_value: [1],
				acceptance_type: [1],
				draft_term: [1],
				draft_comment: '',
				address: ''
			},
			fundsRules: {
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
                	{ pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
				],
				draft_type: [
					// { required: true, message: '请填写汇票类型', trigger: 'change' },
				],
				draft_value: [
					{ type:'array', required: true, message: '选择择业务金额', trigger: 'change' },
				],
				acceptance_type: [
					{ type:'array', required: true, message: '选择择承兑人', trigger: 'change' },
				],
				draft_term: [
					{ type:'array', required: true, message: '选择择期限', trigger: 'change' },
				],
				address: [
					// { required: true, message: '请填写交易地点', trigger: 'blur' },
				],
				draft_comment: [
					// { required: true, message: '请填写备注', trigger: 'blur' },
				],
			},
			value: ['不限', '5万', '10万', '20万', '50万', '100万', '200万', '500万', '1000万'],
			type: ['不限', '大商', '国股', '城商', '农商', '财司'],
			term: ['不限', '1个月', '3个月', '6个月', '1年']
		}
	},
	watch:{
		value_unlimit: function() {

		}
	},
	mounted(){},
	methods:{
		submitForm(form){
			this.$refs[form].validate(valid => {
				if (valid) {
					this.axios.post(`${this.host}/dtk/dummy/drafts/buy`,{
						mobile: this.fundsForm.mobile,
						draft_type: this.fundsForm.draft_type,
						draft_value: this.fundsForm.draft_value,
						acceptance_type: this.fundsForm.acceptance_type,
						address: this.fundsForm.address,
						draft_term: this.fundsForm.draft_term,
						draft_comment: this.fundsForm.draft_comment,
					},{
						headers:{
							"code": "www.dlyunzhi.com",
							"Content-Type": "application/json"
						}
					}).then(res => {
						if (res.data.code === 'OK') {
							this.notice('success', res.data.msg)
							this.resetForm(form)
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
		valueChange(val){
			if (val[0] == 1 && val.length > 1) {
				val.splice(0,1)
			} else if (val.indexOf(1) == val.length-1) {
				this.fundsForm.draft_value = [1]
			} else if (val.length == 0) {
				this.fundsForm.draft_value = [1]
			} else {
				this.fundsForm.draft_value = val
			}
		},
		typeChange(val){
			if (val[0] == 1 && val.length > 1) {
				val.splice(0,1)
			} else if (val.indexOf(1) == val.length-1) {
				this.fundsForm.acceptance_type = [1]
			} else if (val.length == 0) {
				this.fundsForm.acceptance_type = [1]
			} else {
				this.fundsForm.acceptance_type = val
			}
		},
		termChange(val){
			if (val[0] == 1 && val.length > 1) {
				val.splice(0,1)
			} else if (val.indexOf(1) == val.length-1) {
				this.fundsForm.draft_term = [1]
			} else if (val.length == 0) {
				this.fundsForm.draft_term = [1]
			} else {
				this.fundsForm.draft_term = val
			}
		},
		handleOpen(){
			this.display = true
		},
		handleClose() {
			this.display = false
		},
		onVisibleChange(val) {
			this.display = val
		},
		zzz(e){
			console.log(e)
		}
	}
}
</script>