<template>
	<el-table :data="userData" border style="width: 100%">
		<el-table-column type="index" width="55"></el-table-column>
		<el-table-column prop="name" label="姓名">
		</el-table-column>
		<el-table-column label="性别">
			<template scope="scope">
				<span v-if="scope.row.gender==0">未知</span>
				<span v-else-if="scope.row.gender==1">男</span>
				<span v-else>女</span>
			</template>
		</el-table-column>
		<el-table-column prop="user_id" label="登录账号">
		</el-table-column>
		<el-table-column label="用户角色">
			<template scope="scope">
				<span v-if="scope.row.role===0">未注册用户</span>
				<span v-else-if="scope.row.role===1">注册用户</span>
				<span v-else-if="scope.row.role===2">初审员</span>
				<span v-else-if="scope.row.role===3">复核员</span>
				<span v-else-if="scope.row.role===4">公司管理员</span>
				<span v-else>系统管理员</span>
			</template>
		</el-table-column>
		<el-table-column prop="count" label="业务数量">
		</el-table-column>
		<el-table-column label="认证标识">
			<template scope="scope">
				<el-tag type="danger" v-if="scope.row.auth_flag===0">未认证</el-tag>
				<el-tag type="success" v-else-if="scope.row.auth_flag===1">已认证</el-tag>
				<el-tag type="warning" v-else>等待认证</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="头像">
			<template scope="scope">
				<img :src="scope.row.avatar" class="avatar">
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template scope="scope">
				<el-button :plain="true" size="small" type="info" @click="roles(scope.$index, scope.row)" 
				:disabled="scope.row.role==4 || scope.row.role==5? true : false">分配角色</el-button>
				<el-button :plain="true" size="small" type="info" @click="business(scope.$index, scope.row)">资金业务</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default{
		name:'user-table',
		props:['userData'],
		methods:{
			roles(index, row){
				this.$emit('roles', row)
			},
			business(index, row){
				this.$emit('business', row)
			}
		}
	}
</script>

<style scoped>
.avatar{
	width: 40px;
	height: 40px;
	border-radius: 100%;
	vertical-align: middle;
}
</style>