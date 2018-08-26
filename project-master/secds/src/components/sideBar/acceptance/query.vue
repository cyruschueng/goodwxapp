<template>
	<el-row>
		<el-col :span="24">
			<data-grid :draft-data="list" type="response_name" heading="承兑人名称" v-on:getid="getId" @detail="draftDetail"></data-grid>
		</el-col>
		<el-col :span="24" style="margin-top:25px;">
			<div style="float:left;">
				<el-button size="small" type="danger" @click="handleDelete">撤 销</el-button>
			</div>
			<page-index :page-no="page_no" :page-size="page_size" :page-sizes="page_sizes" :total="count" v-on:getCurrentIndex="getIndex"
			v-on:getSize="getPageSize" style="float:right;"></page-index>
		</el-col>
		<el-col :span="24" class="draft-detail">
			<el-dialog :visible.sync="detailShow" size="small">
				<detail></detail>
			</el-dialog>
		</el-col>
	</el-row>
</template>

<script>
	import iconSvg from '../../tmp/icon-svg'
	import dataGrid from '../../tmp/datagrid_2'
	import pageIndex from '../../tmp/pagination'
	import detail from '../../tmp/detail'
	export default{
		components:{
			'icon':iconSvg,
			'data-grid':dataGrid,
			'page-index':pageIndex,
			'detail':detail
		},
		data(){
			return{
				host:_const.host,
				id:'',
				list:[],
				count:10,
				page_no:1,
				page_size:10,
				page_sizes:[10,20,30,40],
				detailShow:false
			}
		},
		mounted(){
			this.loginStatus()
			this.acceptList()
		},
		methods:{
			//接收子组件id
			getId(id){
				this.id=id
			},
			//监听分页组件
			getIndex(index){
				this.page_no=index
				this.acceptList()
			},
			getPageSize(size){
				this.page_size=size
				this.acceptList()
			},
			//取得处理提示承兑列表
			acceptList(){
				this.axios.get(`${this.host}/secds/drafts/acceptance/action`,{
					params:{
						page_no:this.page_no-1,
						page_size:this.page_size
					},
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.count=res.data.count
						this.list=res.data.data
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('acceptList')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			//撤销
			handleDelete(){
				if (this.id!=='') {
					this.axios.delete(`${this.host}/secds/drafts/acceptance/action/${this.id}`,{
						headers:{
							token:this.cookie.get('token')
						}
					}).then(res=>{
						if (res.data.code==='OK') {
							this.notice('success', res.data.msg)
						} else if (res.data.code==='TOKEN_INVLID') {
							this.token('handleDelete')
						} else {
							this.notice('warning', res.data.msg)
						}
					})
				} else {
					this.g_alert()
				}
			}
		}
	}
</script>
