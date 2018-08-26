<template>
	<el-table ref="draftList" :data="draftData" border style="width: 100%" highlight-current-row>
		<el-table-column type="" label=" " width="53" :resizable="false">
			<template scope="scope">
				<el-radio :label="scope.$index" v-model="radio" @change.native="handleChange(scope.$index, scope.row)"></el-radio>
			</template>
		</el-table-column>
		<el-table-column label="电子票据票号" width="300">
			<template scope="scope">
				<span  class="draft-hover" @click="detail(scope.$index, scope.row)">{{ scope.row.draft_id}}</span>
			</template>
		</el-table-column>
		<el-table-column label="票据类型">
			<template scope="scope">{{ scope.row.draft_type==1 ? '银承' : '商承' }}</template>
		</el-table-column>
		<el-table-column property="draft_value" label="票面金额"></el-table-column>
		<el-table-column property="draft_start_date" label="出票日"></el-table-column>
		<el-table-column property="draft_end_date" label="到期日"></el-table-column>
		<el-table-column label="转让标识">
			<template scope="scope">{{ scope.row.draft_restrictive==0 ? '可转让' : '不可转让' }}</template>
		</el-table-column>
		<!-- <el-table-column property="draft_restrictive" label="转让标识"></el-table-column> -->
		<el-table-column property="drawer_name" label="出票人名称"></el-table-column>
		<el-table-column property="payee_name" label="收款人名称"></el-table-column>
	</el-table>
</template>

<script>
	export default{
		name:'data-grid',
		props:['draftData'],
		data(){
			return{
				radio:'',
				id:2
			}
		},
		methods:{
			handleChange(index,row) {
				this.id=row.id
				this.$emit('getid',this.id)
			},
			detail(index, row){
				this.$emit('detail')
				this.cookie.set('id', row.id)
			}
		}
	}
</script>
