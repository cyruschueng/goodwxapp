<template>
	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10, 20, 30, 40]" 
	:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
</template>

<script>
	export default{
		name:'page-index',
		data(){
			return{}
		},
		props:['pageNo', 'pageSize', 'total'],
		methods:{
			handleCurrentChange(index){
				this.$emit('getIndex', index)
			},
			handleSizeChange(size){
				this.$emit('getSize', size)
			}
		}
	}
</script>