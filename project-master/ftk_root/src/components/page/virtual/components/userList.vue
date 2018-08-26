<template>
	<el-row>
		<el-col :span="24">
			<el-table :data="listData" border  style="width: 100%">
				<el-table-column type="index" width="55" :resizable="false"></el-table-column>
				<el-table-column property="user_id" label="手机号">
				</el-table-column>
				<el-table-column property="name" label="用户姓名">
				</el-table-column>
				<el-table-column property="address" label="工作地点">
				</el-table-column>
				<el-table-column label="头像">
					<template scope='scope'>
						<img :src="scope.row.avatar" class="avatar"> 
					</template>
				</el-table-column>
				<el-table-column label="性别">
					<template scope="scope">
						<span v-if="scope.row.gender==0">未知</span>
						<span v-else-if="scope.row.gender==1">男</span>
						<span v-else>女</span>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
	</el-row>
</template>

<script>
export default{
	name: 'user-list',
	props: ['listData'],
	methods: {}
}
</script>

<style scoped>
.avatar{
	width: 40px;
	height: 40px;
	border-radius: 100%;
	overflow: hidden;
	vertical-align: middle;
}
</style>