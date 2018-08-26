<template>
	<el-table :data="fundData" border style="width: 100%">
		<el-table-column type="index" align="center" width="55">
		</el-table-column>
		<el-table-column label="业务类型">
			<template scope='scope'>
				<span v-if="scope.row.funds_type==1">保证金敞口</span>
				<span v-else-if="scope.row.funds_type==2">贸易代付</span>
				<span v-else-if="scope.row.funds_type==3">银行倒贷</span>
				<span v-else-if="scope.row.funds_type==4">信易贷</span>
				<span v-else-if="scope.row.funds_type==5">贸易金融</span>
				<span v-else-if="scope.row.funds_type==6">短融过桥</span>
				<span v-else-if="scope.row.funds_type==7">融易贷</span>
				<span v-else-if="scope.row.funds_type==8">时点存款</span>
				<span v-else-if="scope.row.funds_type==9">商票保贴</span>
				<span v-else-if="scope.row.funds_type==10">信用保函</span>
				<span v-else-if="scope.row.funds_type==11">供应链保理</span>
				<span v-else>票据支付</span>
			</template>
    	</el-table-column>
    	<el-table-column prop="funds_value" label="业务金额（元）">
    	</el-table-column>
    	<el-table-column prop="funds_start_date" label="开始时间">
    	</el-table-column>
    	<el-table-column prop="funds_duration" label="业务期限（天）">
    	</el-table-column>
    	<el-table-column prop="funds_bank" label="所属银行">
    	</el-table-column>
    	<el-table-column prop="yield_rate" label="日收益率（‰）">
    	</el-table-column>
    	<el-table-column label="业务状态">
    		<template scope='scope'>
    			<el-tag v-if="scope.row.funds_status==0" type="warning">未完成</el-tag>
    			<el-tag v-else-if="scope.row.funds_status==1" type="success">交易成功</el-tag>
    			<el-tag v-else-if="scope.row.funds_status==2" type="gray">交易失败</el-tag>
    			<el-tag v-else type="danger">业务被删除</el-tag>
    		</template>
    	</el-table-column>
	</el-table>
</template>

<script>
	export default{
		name:'fund-list',
		props:['fundData'],
	}
</script>