<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
				<img src="../../assets/images/logo.png" height="27" width="40" alt="">电子汇票仿真系统
			</el-col> 
			<el-col :span="10">
				<div class="tools" @click="collapse">
					<div id="no-mode-translate-demo" class="demo">
						<div class="no-mode-translate-demo-wrapper">
							<transition name="no-mode-translate-fade">
								<div v-if="on" key="on" @click="on = false">
									<iconSvg iconStyle="menu" iconClass="menu-collapse"></iconSvg>
								</div>
								<div v-else key="off" @click="on = true">
									<iconSvg iconStyle="menu" iconClass="menu"></iconSvg>
								</div>
							</transition>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6" class="userinfo">
				<el-dropdown trigger="click" class="userinfo-inner" @command="handleCommand">
					<span class="el-dropdown-link">
						<iconSvg iconStyle="avatar" iconClass="avatar"></iconSvg>{{user_name}}，您好<i class="el-icon-caret-bottom el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="editInfo"><iconSvg iconStyle="settingmenu" iconClass="personal"></iconSvg>修改信息</el-dropdown-item>
						<el-dropdown-item command="editPwd"><iconSvg iconStyle="settingmenu" iconClass="password"></iconSvg>修改密码</el-dropdown-item>
						<el-dropdown-item command="createData"><iconSvg iconStyle="settingmenu" iconClass="data"></iconSvg>数据生成</el-dropdown-item>
						<el-dropdown-item command="logout"><iconSvg iconStyle="settingmenu" iconClass="logout"></iconSvg>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>

		<el-col :span="24" class="main">
			<aside :class="isCollapse?'menu-collapsed':'menu-expanded'">
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" 
				unique-opened router theme="dark">
					<template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+ ''" v-if="!item.leaf">
							<template slot="title">
								<iconSvg :iconStyle="style" :iconClass="item.iconCls"></iconSvg>
								<span slot="title">{{item.name}}</span>
							</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
								<span slot="title">{{child.name}}</span>
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
							<iconSvg :iconStyle="style" :iconClass="item.iconCls"></iconSvg>
							<span slot="title">{{item.children[0].name}}</span>
						</el-menu-item>
					</template>
				</el-menu>
			</aside>

			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="el-fade-in-linear" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>

		<!-- 修改个人信息 -->
		<el-dialog :title="dialogTitle" :visible.sync="userEdit" size="tiny">
			<el-form :model="userdata" :rules="infoRules" ref="userdata" label-width="100px" class="demo-ruleForm">
				<el-form-item label="真实姓名" prop="user_name">
					<el-input v-model="userdata.user_name" placeholder="请输入真实姓名"></el-input>
				</el-form-item>
				<el-form-item label="所在省份" prop="province">
					<el-input v-model="userdata.province" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="所在城市" prop="city">
					<el-input v-model="userdata.city" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="所在公司" prop="company">
					<el-input v-model="userdata.company" placeholder="请输入所在公司"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="userEdit = false">取 消</el-button>
				<el-button type="primary" @click="edit('userdata')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog :title="dialogTitle" :visible.sync="passwordEdit" size="tiny">
			<el-form :model="pwdata" :rules="pwdRules" ref="pwdata" label-width="100px" class="demo-ruleForm">
				<el-form-item label="手机号码" prop="user_id">
					<el-input v-model="pwdata.user_id" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="user_passwd">
					<el-input type="password" v-model="pwdata.user_passwd" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="conpwd">
					<el-input type="password" v-model="pwdata.conpwd" placeholder="请再次输入密码"></el-input>
				</el-form-item>
				<el-form-item label="图片验证码" prop="captchaPic">
					<el-input v-model="pwdata.captchaPic" placeholder="请输入图片验证码">
						<template slot="append">
							<el-tooltip class="item" effect="dark" content="点击图片可刷新验证码" placement="top">
								<div class="captchaPic" @click="picode(pwdata.user_id)"><img :src="src"></div>
							</el-tooltip>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="短信验证码" prop="captcha">
					<el-input v-model="pwdata.captcha" placeholder="请输入短信验证码">
						<template slot="append">
							<div class="captcha" @click="smscode(pwdata.captchaPic, pwdata.user_id)"><span>获取验证码</span></div>
						</template>
					</el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="passwordEdit = false">取 消</el-button>
				<el-button type="primary" @click="edit('pwdata')">确 定</el-button>
			</span>
		</el-dialog>
	</el-row>
</template>

<script>
	import iconSvg from '../../components/tmp/icon-svg'
	import {localMethods} from '../../mixin/localMethods'
	export default{
		components: {iconSvg},
		mixins:[localMethods],
		data(){
			var confirmPwd=(rule, value, callback)=>{
				if (value==='') {
					callback(new Error('请再次输入密码'));
				} else if (value!==this.pwdata.user_passwd) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				host:_const.host,
				isCollapse: false,
				style: 'menuicon',
				// user_name:'',
				userdata:[],
				userEdit:false,
				passwordEdit:false,
				dialogTitle:'',
				province:'',
				city:'',
				base:'data:image/png;base64,',
				src:'',
				infoRules:{
					user_name:[
						{ required: true, message: '请输入真实姓名', trigger: 'blur' }
					],
					company:[
						{ required: true, message: '请输入所在公司', trigger: 'blur' }
					]
				},
				pwdata:{
					user_id:this.cookie.get('user_id'),
					user_passwd:'',
					conpwd:'',
					captchaPic:'',
					captcha:''
				},
				pwdRules:{
					user_passwd:[
						{ required: true, message: '请输入新密码', trigger: 'blur' }
					],
					conpwd:[
						{ validator: confirmPwd ,trigger: 'blur'}
					],
					captchaPic:[
						{ required: true, message: '请输入图片验证码', trigger: 'blur' }
					],
					captcha:[
						{ required: true, message: '请输入短信验证码', trigger: 'blur' }
					]
				},
				on:false
			}
		},
		computed:{
			user_name(){
				return this.$store.state.user_name
			}
		},
		mounted(){
			let swap=this.cookie.get('swap')
			if (swap===undefined) {
				this.$router.push('/')
			} else {
				this.$store.dispatch('GET_USER_INFO')
				this.$router.push('/index')
			} 
		},
		methods:{
			//导航菜单折叠
			handleOpen(key, keyPath) {},
			handleClose(key, keyPath) {},
			//导航折叠
			collapse(){
				this.isCollapse=!this.isCollapse
			},
			handleCommand(command){
				if (command==='logout') {
					this.logout()
				} else if (command==='editInfo') {
					this.editInfo()
				} else if (command==='editPwd') {
					this.pwdEdit()
				} else {
					this.$router.push('/createData')
				}
			},
			//修改用户信息
			editInfo(){
				let userdata=JSON.parse(this.cookie.get('userinfo'))
				this.userdata=userdata
				this.dialogTitle='修改个人信息'
				this.userEdit=true
			},
			//修改密码
			pwdEdit(){
				this.dialogTitle='修改密码'
				this.passwordEdit=true
				this.picode(this.pwdata.user_id)
			},
			//确认修改
			edit(formName){
				if (this.userEdit) {
					this.$refs[formName].validate(valid=>{
						if (valid) {
							this.axios.put(`${this.host}/secds/users/user`,{
								company:this.userdata.company,
								user_name:this.userdata.user_name
							},{
								headers:{
									'Content-Type':'application/json',
									token:this.cookie.get('token')
								}
							}).then(res=>{
								if (res.data.code!=='OK') {
									this.$message.error({message:res.data.msg, duration:2000})
								} else if (res.data.code==='TOKEN_INVLID') {
									this.token('edit',formName)
								} else {
									this.$store.dispatch('GET_USER_INFO')
									this.userEdit=false
									this.notice('success','修改成功')
								}
							})
						} else {
							return false
						}
					})
				} else {
					this.$refs[formName].validate(valid=>{
						if (valid) {
							this.axios.put(`${this.host}/secds/users/password`,{
								user_passwd: this.pwdata.user_passwd
							},{
								headers:{
									'Content-Type':'application/json',
									token:this.cookie.get('token')
								}
							}).then(res=>{
								if (res.data.code==='OK') {
									this.passwordEdit=false
									this.notice('success','修改成功')
								} else if (res.data.code==='TOKEN_INVLID') {
									this.token('edit',formName)
								} else {
									this.$message.error({message:res.data.msg, duration:2000})
								}
							})
						} else {
							return false
						}
					})
				}
			},
			//退出登录
			logout(){
				this.cookie.remove('user_id')
				this.cookie.remove('userinfo')
				this.cookie.remove('swap')
				this.cookie.remove('token')
				this.cookie.remove('id')
				this.notice('success', '退出成功')
				setTimeout(()=>this.$router.push('/'), 600)
			},
		}
	}
</script>

<style scoped lang="scss">
.container{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	.header{
		height: 50px;
		line-height: 50px;
		background: #202529;
		color: #fff;
		.userinfo{
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner{
				cursor: pointer;
				color: #fff;
			}

		}
		.logo{
			height: 50px;
			font-size: 16px;
			border-color: rgba(238,241,146,0.3);
			border-right-width: 1px;
			border-right-style: solid;
			img{
				width: 40px;
				float: left;
				margin: 11px 10px 10px 12px;
			}
		}
		.logo-width{
			width: 200px;
		}
		.logo-collapse-width{
			width: 65px;
			box-sizing: border-box;
		}
		.tools{
			padding: 0px 23px;
			width:14px;
			height: 50px;
			line-height: 50px;
			cursor: pointer;
			float: left;
			.menu{
				width: 20px; 
				height: 20px;
				vertical-align: -0.2em;
				fill: #fff;
				overflow: hidden;
			}
		}
		.breadcrumb-inner{
			width: 80%;
			line-height: 50px;
			float: left;
		}
	}
	.main{
		display: -webkit-box;
    	display: -webkit-flex;
    	display: -ms-flexbox;
    	display: flex;
		position: absolute;
		top: 50px;
		bottom: 0;
		overflow: hidden;
		aside{
			background-color:#324157;
			-webkit-flex:0 0 200px;
			flex: 0 0 200px;
			width: 200px;
			.el-menu{
				border-radius: 0;
				height: 100%;
				.menuicon{
					width: 18px; 
					height: 18px;
					vertical-align: -0.2em;
					fill: #bfcbd9;
					overflow: hidden;
				}
			}
		}
		.menu-collapsed{
			-webkit-flex:0 0 60px;
			flex:0 0 60px;
			width: 60px;
		}
		.menu-expanded{
			-webkit-flex:0 0 200px;
			flex:0 0 200px;
			width: 200px;
			overflow: hidden;
			.menuicon{
				margin-right: 4px;
			}
		}
		.content-container{
			/* -webkit-flex: 1;
			flex: 1; */
			flex-grow:1;
			flex-shrink:1;
			flex-basis:0;
			overflow-y: auto;
			padding: 20px;
			.breadcrumb-container{
				margin-bottom: 15px;
				.title{
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner{
					float:right;
				}
			}
			.content-wrapper{
				background-color: #fff;
				box-sizing: border-box;
			}
		}
	}
	.captchaPic{
		cursor:pointer;
		img{
			width: 70px;
			height:30px;
		}
	}
	.captcha{
		cursor:pointer;
	}
}
.el-dropdown-menu{
	color: #858688;
	.settingmenu{
		width: 18px; 
		height: 18px;
		vertical-align: -0.15em;
		fill: #bfcbd9;
		overflow: hidden;
		margin-right: 8px;
	}
}
.avatar{
	width: 20px;
	height: 20px;
	vertical-align: -0.3em;
	fill: #fff;
	overflow: hidden;
	margin-right: 4px;
}

.el-input-group__append{
	padding: 0;
}

.no-mode-translate-demo-wrapper {
  position: relative;
  height: 18px;
}
.no-mode-translate-demo-wrapper button {
  position: absolute;
}
.no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
  transition: all .5s;
}
.no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
  opacity: 0;
}
.no-mode-translate-fade-enter {
  transform: translateX(10px);
}
.no-mode-translate-fade-leave-active {
  transform: translateX(-10px);
}
</style>