<template>
	<el-row>
		<el-col :span="24">
			<data-grid :draft-data="list" v-on:getid="getId" @detail="draftDetail"></data-grid>
		</el-col>
		<el-col :span="24" style="margin-top:25px;">
			<div style="float:left;">
				<el-button size="small" type="info" @click="sign">签 收</el-button>
				<el-button size="small" type="danger" @click="revoke">驳 回</el-button>
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
	import dataGrid from '../../tmp/datagrid_1'
	import pageIndex from '../../tmp/pagination'
	import detail from '../../tmp/detail'
	export default{
		components:{
			'icon': iconSvg,
			'data-grid': dataGrid,
			'page-index': pageIndex,
			'detail':detail
		},
		data(){
			return{
				host:_const.host,
				id:'',
				count:0,
				list:[],
				page_no:1,
				page_size:10,
				page_sizes:[10,20,30,40],
				detailShow:false
			}
		},
		mounted(){
			this.loginStatus()
			this.signList()
		},
		methods:{
			//获取id
			getId(id){
				this.id=id
			},
			//监听分页
			getIndex(index){
				this.page_no=index
				this.signList()
			},
			getPageSize(size){
				this.page_size=size
				this.signList()
			},
			//取得全部可以提示收票的票据
			signList(){
				this.axios.get(`${this.host}/secds/drafts/reception/sign`,{
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
						this.token('signList')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			//签收
			sign(){
				if (this.id!=='') {
					this.axios.post(`${this.host}/secds/drafts/${this.id}/reception/sign`,{},{
						headers:{
							token:this.cookie.get('token')
						}
					}).then(res=>{
						if (res.data.code==='OK') {
							this.notice('success', res.data.msg)
							this.signList()
						} else if (res.data.code==='TOKEN_INVLID') {
							this.token('sign')
						} else {
							this.notice('warning', res.data.msg)
						}
					})
				} else {
					this.g_alert()
				}
			},
			//驳回
			revoke(){
				if (this.id!=='') {
					this.axios.delete(`${this.host}/secds/drafts/${this.id}/reception/sign`,{
						headers:{
							token:this.cookie.get('token')
						}
					}).then(res=>{
						if (res.data.code==='OK') {
							this.notice('success', res.data.msg)
							this.signList()
						} else if (res.data.code==='TOKEN_INVLID') {
							this.token('revoke')
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