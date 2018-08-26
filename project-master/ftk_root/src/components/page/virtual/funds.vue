<template>
	<el-row>
		<el-col :span="24">
			<el-form :model="fundsForm" :rules="fundsRules" ref="fundsForm" label-width="160px" class="demo-ruleForm">
				<el-form-item label="手机号码：" prop="mobile" style="width:400px;">
					<el-input v-model="fundsForm.mobile" placeholder="请填写手机号码"></el-input>
				</el-form-item>
				<el-form-item label="业务类型：" prop="funds_type" style="width:400px;">
				    <el-select v-model="fundsForm.funds_type" placeholder="请选择" style="width:100%;">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="业务金额（元）：" prop="funds_value" style="width:400px;">
					<el-input v-model="fundsForm.funds_value" placeholder="请填写业务金额"></el-input>
				</el-form-item>
				<el-form-item label="开始时间：" prop="funds_start_date" style="width:400px;">
					<el-date-picker type="date" placeholder="选择日期" v-model="fundsForm.funds_start_date" style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
				<el-form-item label="业务期限（天）：" prop="funds_duration" style="width:400px;">
					<el-input v-model="fundsForm.funds_duration" placeholder="请填写期限"></el-input>
				</el-form-item>
				<el-form-item label="日收益（‰）：" prop="yield_rate" style="width:400px;">
					<el-input v-model="fundsForm.yield_rate" placeholder="请填写日收益"></el-input>
				</el-form-item>
				<el-form-item label="所属银行：" prop="funds_bank" style="width:400px;">
					<el-input v-model="fundsForm.funds_bank" placeholder="请输入所属银行"></el-input>
				</el-form-item>
				<el-form-item label="客户名称：" prop="customer_name" style="width:400px;">
					<el-input v-model="fundsForm.customer_name" placeholder="请输入客户名称"></el-input>
				</el-form-item>
				<el-form-item label="交易地点：" prop="address" style="width:400px;">
					<el-input v-model="fundsForm.address" placeholder="请输入交易地点"></el-input>
				</el-form-item>
				<el-form-item label="业务备注：" prop="funds_comment" style="width:400px;">
					<el-input v-model="fundsForm.funds_comment" placeholder="请输入业务备注"></el-input>
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
import format from '../../../assets/js/format' // 日期格式化
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
				funds_type: '',
				funds_value: '',
				funds_start_date: '',
				funds_duration: '',
				yield_rate: '',
				funds_bank: '',
				customer_name: '',
				funds_comment: '',
				address: ''
			},
			fundsRules: {
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
                	{ pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
				],
				funds_value: [
					{ required: true, message: '请填写业务金额', trigger: 'blur' },
				],
				funds_start_date: [
					{ type: 'date', required: true, message: '请选择业务开始时间', trigger: 'change' },
				],
				funds_duration: [
					{ required: true, message: '请输填写业务期限', trigger: 'blur' },
				],
				yield_rate: [
					{ required: true, message: '请填写标预期日收益', trigger: 'blur' },
				],
				funds_bank: [
					// { required: true, message: '请填写所属银行', trigger: 'blur' },
				],
				customer_name: [
					// { required: true, message: '请填写客户名称', trigger: 'blur' },
				],
				funds_comment: [
					// { required: true, message: '请填写业务备注', trigger: 'blur' },
				],
				address: [
					// { required: true, message: '请填写交易地点', trigger: 'blur' },
				],
			},
			options: [{
				value: '时点存款',
			}, {
				value: '保证金代存',
			}, {
				value: '敞口代还',
			}, {
				value: '流贷倒贷',
			}, {
				value: '资金垫付',
			}, {
				value: '票据买断',
			}, {
				value: '贴现代付',
			}, {
				value: '其他',
			}],
		}
	},
	computed: {
		yield_rate:function() {
			return Number(this.fundsForm.yield_rate).toFixed(2)
		}
	},
	mounted(){
	},
	methods:{
		submitForm(form){
			this.$refs[form].validate(valid => {
				if (valid) {
					this.axios.post(`${this.host}/dtk/dummy/funds`,
					{
						mobile: this.fundsForm.mobile,
						funds_type: this.fundsForm.funds_type,
						funds_value: this.fundsForm.funds_value,
						funds_start_date: format(this.fundsForm.funds_start_date),
						funds_duration: this.fundsForm.funds_duration,
						yield_rate: this.yield_rate,
						funds_bank: this.fundsForm.funds_bank,
						customer_name: this.fundsForm.customer_name,
						funds_comment: this.fundsForm.funds_comment,
						address: this.fundsForm.address
					},{
						headers:{
							"code": "www.dlyunzhi.com",
							"Content-Type": "application/json"
						}
					}).then(res => {
						if (res.data.code === 'OK') {
							this.resetForm(form)
							this.notice('success', res.data.msg)
						} else if (res.data.code === 'DUMMYUSER_NOT_EXIST') {
							this.boxOpen()
						} else {
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