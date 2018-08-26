<template>
	<el-table ref="draftList" :data="dataList" border style="width: 100%" highlight-current-row>
		<el-table-column type="" label=" " width="53" :resizable="false">
			<template scope="scope">
				<el-radio :label="scope.$index" v-model="radio" @change.native="handleChange(scope.$index, scope.row)"></el-radio>
			</template>
		</el-table-column>
		<el-table-column label="电子票据票号" width="300">
			<template scope="scope">
				<div v-if="scope.row.bearer_account==user_account || scope.row.sign_account==user_account">
					<span class="draft-hover" @click="detail(scope.$index, scope.row)">{{ scope.row.draft_id}}</span>
				</div>
				<div v-else>
					<span>{{ scope.row.draft_id}}</span>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="票据类型">
			<template scope="scope">{{ scope.row.draft_type==1 ? '银承' : '商承' }}</template>
		</el-table-column>
		<el-table-column property="draft_value" label="票面金额"></el-table-column>
		<el-table-column property="draft_start_date" label="出票日"></el-table-column>
		<el-table-column property="draft_end_date" label="到期日"></el-table-column>
		<el-table-column property="request_name" label="背书人名称"></el-table-column>
		<el-table-column property="response_name" label="被背书人名称"></el-table-column>
		<el-table-column label="票据处理状态">
			<template scope="scope">
				<span v-if="scope.row.process_status===1">待签收</span>
				<span v-else-if="scope.row.process_status===2">已签收</span>
				<span v-else-if="scope.row.process_status===3">驳回</span>
				<span v-else>撤销</span>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
export default {
	name:'endorse-data',
	props:['dataList'],
	data(){
		return{
			radio:'',
			user_account:this.cookie.get('user_account')
		} 
	},
	methods:{
		handleChange(index, row){
			this.$emit('transfer', row.drafts_id)
		},
		detail(index, row){
			this.$emit('detail')
			this.cookie.set('id', row.drafts_id)
		}
	}
}
</script>