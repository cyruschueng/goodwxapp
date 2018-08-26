<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
				丰融通平台管理
			</el-col> 
			<el-col :span="10">
				<div class="tools" @click="collapse"><iconSvg iconStyle="menu" iconClass="menu"></iconSvg></div>
			</el-col>
			<el-col :span="6" class="userinfo">
				<el-dropdown trigger="hover" class="userinfo-inner" @command="handleCommand">
					<span class="el-dropdown-link">
						<span style="margin-right:4px;">{{userinfo.name}}</span>
						<img :src="userinfo.avatar==''?'../../assets/images/avatar.jpg':userinfo.avatar" 
						style="border-radius:100%;vertical-align:middle;width:40px;height:40px;">
					</span>
					<el-dropdown-menu slot="dropdown">
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
						<el-submenu :index="index+''" v-if="!item.leaf">
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
	</el-row>
</template>

<script>
	import iconSvg from '../tmp/icon-svg'
	import bus from '../../assets/js/eventBus.js'
	export default{
		components: {iconSvg},
		data(){
			return {
				host:_const.host,
				userinfo:{},
				isCollapse: false,
				style: 'menuicon',
			}
		},
		mounted(){
			let token_root=this.cookie.get('token')
			if (token_root===undefined) {
				this.$router.push('/')
			} else {
				this.$router.push('/userlist')
				let userinfo=JSON.parse(this.cookie.get('userinfo'))
				this.userinfo=userinfo
			}
			// this.$router.push('/userlist')
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
				}
			}
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
			font-size: 18px;
			padding-left:20px;
			padding-right:20px;
			border-color: rgba(238,241,146,0.3);
			border-right-width: 1px;
			border-right-style: solid;
			img{
				width: 40px;
				float: left;
				margin: 10px 10px 10px 18px;
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
			-webkit-flex:0 0 230px;
			flex: 0 0 230px;
			width: 230px;
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
			.menuicon{
				margin-right: 4px;
			}
		}
		.content-container{
			-webkit-flex: 1;
			flex: 1;
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

</style>