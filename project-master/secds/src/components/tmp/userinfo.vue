<template>
	<el-row>
		<el-col :span="24">
			<div class="user-info">
				<ul :class="userStyle">
					<li>
						<p>出票人账户：</p>
						<span>{{userinfo.user_account}}</span>
					</li>
					<li>
						<p>出票人名称：</p>
						<span>{{userinfo.user_name}}</span>
					</li>
					<li>
						<p>出票人开户行行号：</p>
						<span>{{userinfo.bank_account}}</span>
					</li>
					<li>
						<p>出票人开户行：</p>
						<span>{{userinfo.bank_name}}</span>
					</li>
				</ul>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import iconSvg from '../tmp/icon-svg'
	export default {
		name:'user-info',
		components:{
			'icon':iconSvg
		},
		props:['title','userStyle'],
		computed:{
			userinfo(){
				return this.$store.state.userinfo
			}
		}
	}
</script>

<style scoped>
.icon-style{
	width: 20px;
	height: 20px;
	vertical-align: -0.25em;
	fill: #333;
	margin-right: 4px;
}


.user-info {
	font-size: 14px;
}
.user-info  ul li{
	height: 34px;
	line-height: 34px;
}
.user-info  ul p{
	display: inline-block;
	width: 140px;
	text-align: right;
	padding: 0;
	margin: 0;
}
.user-info  ul span{
}

.infoList{
	font-size: 14px;
}
.infoList li:first-child{
	margin-top: 12px;
}
.infoList li{
	margin-bottom: 12px;
}
.infoList li:last-child{
	margin-bottom: 0;
}
.infoList li p{
	display: inline-block;
	width: 150px;
	text-align: right;
	margin: 0 8px 0 0;
	color: #48576a;
}
</style>