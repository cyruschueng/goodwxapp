<template>
	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="pageSizes" :page-size="pageSize" 
	layout="prev, pager, next" :total="total">
	</el-pagination>
</template>

<script>
	export default{
		name:'page-index',
		props:['pageNo', 'pageSize', 'pageSizes', 'total'],
		data(){
			return{}
		},
		methods:{
			handleCurrentChange(index){
				this.$emit('getCurrentIndex', index)
			},
			handleSizeChange(size){
				this.$emit('getSize', size)
			},
		}
	}
</script>