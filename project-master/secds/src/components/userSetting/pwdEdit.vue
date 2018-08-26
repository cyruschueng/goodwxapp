<template>
	<el-row class="register-container">
		<el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="" class="demo-ruleForm">
			<h3 class="title">找回密码</h3>
			<el-form-item label="" prop="user_id">
				<el-input v-model="registerForm.user_id" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item label="" prop="user_passwd">
				<el-input v-model="registerForm.user_passwd" placeholder="新密码" type="password"></el-input>
			</el-form-item>
			<el-form-item label="" prop="captchaPic" v-if="picshow">
				<el-input placeholder="图片验证码" v-model="registerForm.captchaPic">
					<template slot="append">
						<el-tooltip class="item" effect="dark" content="点击图片可刷新验证码" placement="right">
							<div class="captchaPic" @click="picode(registerForm.captchaPic)"><img :src="src"></div>
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
                <el-button type="primary" style="width:100%;" :loading="loading" @click="password('registerForm')">立即找回</el-button>
            </el-form-item>
		</el-form>
	</el-row>
</template>

<script>
	import iconSvg from '../tmp/icon-svg'
	import {localMethods} from '../../mixin/localMethods'
	export default{
		components:{iconSvg},
		mixins:[localMethods],
		data(){
			return{
				host:_const.host,
				loading:false,
				registerForm:{
					user_id:'',
					captcha:'',
					user_passwd:'',
					confirmPwd:'',
					captchaPic:''
				},
				rules:{
					user_id:[
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
                		{ pattern:/^1[34578]\d{9}$/, message: '手机号码格式不正确'}
					],
					user_passwd:[
						{ required: true, message: '请输入密码', trigger: 'blur'}
					],
					captchaPic:[
						{ required: true, message: '请输入图片验证码', trigger: 'blur' }
					],
					captcha:[
						{ required: true, message: '请输入短信验证码', trigger: 'blur' },
						// { type: 'number', message: '短信验证码为数字' }
					]
				},
				picshow:false,
				base:'data:image/png;base64,',
				src:'',
			}
		},
		methods:{
			//重置密码
			password(form){
				this.$refs[form].validate(valid=>{
					if (valid) {
						this.loading=true
						this.axios.post(`${this.host}/secds/users/password`,{
							captcha:this.registerForm.captcha,
							user_id:this.registerForm.user_id,
							user_passwd:this.registerForm.user_passwd
						},{
							headers:{'Content-Type':'application/json'}
						}).then(res=>{
							if (res.data.code==="OK") {
								this.notice('success', '重置密码成功')
								setTimeout(()=>this.$router.push('/'), 1000)
							} else if (res.data.code==='TOKEN_INVLID') {
								this.token('password')
							} else {
								this.errMsg('error', res.data.msg)
							}
						})
					} else {
						return false
					}
				})
			},
			//显示图片验证码
			picShow(){
				if (this.registerForm.user_id==='') {
					this.notice('warning', '请输入手机号')
					this.picshow=false
				} else {
					if (this.picshow) {
						if (this.registerForm.captchaPic!=='') {
							this.smscode(this.registerForm.captchaPic, this.registerForm.user_id)
						} else {
							this.notice('warning', '请输入图片验证码')
						}
					} else {
						this.picode(this.registerForm.user_id)
						this.picshow=true
					}
				}
			},
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