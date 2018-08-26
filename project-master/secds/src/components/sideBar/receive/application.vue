<template>
	<el-row>
		<el-col :span="24">
			<data-grid :draft-data="list" v-on:getid="getId" @detail="draftDetail"></data-grid>
		</el-col>
		<el-col :span="24" style="margin-top:25px;">
			<div style="float:left;">
				<el-button size="small" type="info" @click="reception">提 交</el-button>
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
			this.receiveList()
		},
		methods:{
			//获取id
			getId(id){
				this.id=id
			},
			//监听分页
			getIndex(index){
				this.page_no=index
				this.receiveList()
			},
			getPageSize(size){
				this.page_size=size
				this.receiveList()
			},
			//取得全部可以提示收票的票据
			receiveList(){
				this.axios.get(`${this.host}/secds/drafts/reception`,{
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
						this.token('receiceList')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			//提示收票
			reception(){
				if (this.id!=='') {
					this.axios.post(`${this.host}/secds/drafts/${this.id}/reception`,{},{
						headers:{
							token:this.cookie.get('token')
						}
					}).then(res=>{
						if (res.data.code==='OK') {
							this.notice('success', res.data.msg)
							this.receiveList()
						} else if (res.data.code==='TOKEN_INVLID') {
							this.token('reception')
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
