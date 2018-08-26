<template>
	<el-row class="register-container">
		<el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="" class="demo-ruleForm">
			<h3 class="title">用户注册</h3>
			<el-form-item label="" prop="user_id">
				<el-input v-model="registerForm.user_id" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item label="" prop="user_passwd">
				<el-input v-model="registerForm.user_passwd" placeholder="密码" type="password"></el-input>
			</el-form-item>
			<el-form-item label="" prop="confirmPwd">
				<el-input v-model="registerForm.confirmPwd" placeholder="确认密码" type="password"></el-input>
			</el-form-item>
			<el-form-item label="" prop="user_name">
				<el-input v-model="registerForm.user_name" placeholder="真实姓名"></el-input>
			</el-form-item>
			<el-form-item label="" prop="location">
				<el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange" style="width:100%;"></el-cascader>
			</el-form-item>
			<el-form-item label="" prop="company">
				<el-input v-model="registerForm.company" placeholder="所在公司"></el-input>
			</el-form-item>

			<el-form-item label="" prop="captchaPic" v-if="picshow">
				<el-input placeholder="图片验证码" v-model="registerForm.captchaPic">
					<template slot="append">
						<el-tooltip class="item" effect="dark" content="点击图片可刷新验证码" placement="right">
							<div class="captchaPic" @click="picode(registerForm.user_id)"><img :src="src"></div>
						</el-tooltip>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label="" prop="captcha">
				<el-input placeholder="短信验证码" v-model="registerForm.captcha">
					<template slot="append">
						<div class="captcha" @click="picShow"><span>获取验证码</span></div>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click="handleRegister('registerForm')">注册</el-button>
            </el-form-item>
            <el-form-item>
            	<router-link to="/" class="login">已有账号？立即登录</router-link>
            	<router-link to="/pwdEdit" class="pwdEdit">忘记密码？</router-link>
            </el-form-item>
		</el-form>
	</el-row>
</template>

<script>
	import { provinceAndCityData, CodeToText } from 'element-china-area-data'
	import {localMethods} from '../../mixin/localMethods'
	import iconSvg from '../tmp/icon-svg.vue'
	export default{
		mixins:[localMethods],
		components:{iconSvg},
		data(){
			var confirmPwd=(rule, value, callback)=>{
				if (value==='') {
					callback(new Error('请再次输入密码'));
				} else if (value!==this.registerForm.user_passwd) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return{
				host:_const.host,
				loading:false,
				registerForm:{
					user_id:'',
					captcha:'',
					user_passwd:'',
					confirmPwd:'',
					captchaPic:'',
					location:'',
					user_name:'',
					company:''
				},
				rules:{
					user_id:[
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
                		{ pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
					],
					user_passwd:[
						{ required: true, message: '请输入密码', trigger: 'blur'}
					],
					confirmPwd:[
						{ validator: confirmPwd ,trigger: 'blur'},
					],
					captchaPic:[
						{ required: true, message: '请输入图片验证码', trigger: 'blur' }
					],
					captcha:[
						{ required: true, message: '请输入短信验证码', trigger: 'blur' },
						// { type: 'number', message: '短信验证码为数字' }
					],
					user_name:[
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					/*location:[
						{ required: true, message: '请输入所在地', trigger: 'blur' }
					],*/
					company:[
						{ required: true, message: '请输入所在公司', trigger: 'blur' }
					]
				},
				picshow:false,
				base:'data:image/png;base64,',
				src:'',
				options: provinceAndCityData,
				selectedOptions: ["210000", "210200"],
				CodeToText: CodeToText
			}
		},
		mounted(){
			//判断用户是否选择了区域
			if (this.registerForm.location==='') {
				this.registerForm.location=["210000", "210200"]
			}

		},
		methods:{
			//注册用户
			handleRegister(form){
				this.$refs[form].validate(valid=>{
					if (valid) {
						this.loading=true
						//区域码转换成汉字
						let location=this.registerForm.location
						let province=this.CodeToText[location[0]]
						let city=this.CodeToText[location[1]]

						this.axios.post(`${this.host}/secds/users`,{
							captcha :this.registerForm.captcha,
							user_id: this.registerForm.user_id,
							user_passwd: this.registerForm.user_passwd,
							city: city,
							province: province,
							user_name: this.registerForm.user_name,
							company: this.registerForm.company
						},{
							headers:{'Content-Type':'application/json'}
						}).then(res=>{
							if (res.data.code==="OK") {
								this.$message({type:'success', message:'注册成功'})
								this.cookie.set('token', res.data.token, 1)
								this.cookie.set('swap', res.data.swap, 1)
								this.cookie.set('user_id', this.registerForm.user_id, 1)
								setTimeout(()=>this.$router.push('/home'), 1000)
							} else if (res.data.code==='USER_ALREADY_EXISTED') {
								this.loading=false
								this.notice('error', res.data.msg)
								this.resetForm('registerForm')
							} else {
								this.$message.error({message:res.data.msg, duration:2000})
							}
						})
					} else {
						return false
					}
				})
			},
			//监听省市联动
			handleChange(value){
				/*console.log(this.CodeToText['210000'])
				var province=value[0]
				var city=value[1]
				console.log(typeof province, city)*/
				this.registerForm.location=value
				console.log(this.registerForm.location)
			},
			//显示图片验证码
			picShow(){
				if (this.registerForm.user_id==='') {
					this.$message.error({message:'请输入手机号', duration:2000})
					this.picshow=false
				} else {
					if (this.picshow) {
						if (this.registerForm.captchaPic!=='') {
							this.smscode(this.registerForm.captchaPic, this.registerForm.user_id)
						} else {
							this.$message.error({message:'请输入图片验证码', duration:2000})
						}
					} else {
						this.picode(this.registerForm.user_id)
						this.picshow=true
					}
				}
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style lang="scss" scoped>
.register-container{
	position: absolute;
	top: 0;
	left: 0;
	bottom:0;
	width: 100%;
	background-color: #F7F6F2;
	.el-form{
		width: 400px;
		margin: 100px auto;
		.title{
			text-align: center;
			color: rgb(80, 163, 255);
			font-size: 24px;
			margin-bottom: 16px;
		}
		.el-input-group__append{
			padding:0;
			.captchaPic{
				cursor: pointer;
				img{
					width: 70px;
					height: 34px;
					vertical-align: middle;
				}
			}
			.captcha{
			// width: 80px;
			height: 34px;
			line-height:34px;
			text-align: center;
			cursor: pointer;
			span{
				display: inline-block;
				height:100%;
				width:100%;
			}
		}
		}
		
		.login, .pwdEdit{
			color: rgb(32, 160, 255);
		}
		.login{
			float: right;
		}
		.pwdEdit{
			float: left;
		}
	}
}
</style>