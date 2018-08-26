<template>
	<div class="query">
		<el-row>
			<el-col :span="24">
				<data-grid :data-list="list" @transfer="getId" @detail="draftDetail"></data-grid>
			</el-col>
			<el-col :span="24" style="margin:15px 0;">
				<el-button size="small" type="danger" @click="revoke" style="float:left;">撤销</el-button>
				<page :page-no="page_no" :page-size="page_size" :page-sizes="page_sizes" :total="count" v-on:getCurrentIndex="getIndex"
				v-on:getSize="getPageSize" style="float:right;"></page>	
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" class="draft-detail">
				<el-dialog :visible.sync="detailShow" size="small">
					<detail></detail>
				</el-dialog>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import iconSvg from '../../tmp/icon-svg'
import dataGrid from './components/datagrid2'
import page from '../../tmp/pagination'
import detail from '../../tmp/detail'
export default{
	components:{
		'icon':iconSvg,
		'data-grid':dataGrid,
		'page':page,
		'detail':detail
	},
	data(){
		return{
			list:[],
			id:'',
			count:0,
			page_no:1,
			page_size:10,
			page_sizes:[10,20,30,40],
			detailShow:false
		}
	},
	mounted(){
		this.loginStatus()
		this.querylist()
	},
	methods:{
		getId(id){
			this.id=id
		},
		//获取currentpage
		getIndex(index){
			this.page_no=index
			this.querylist()
		},
		//获取pagesize
		getPageSize(size){
			this.page_size=size
			this.querylist()
		},
		querylist(){
			this.axios.get(`${_const.host}/secds/drafts/discount/action`,{
				params:{
					page_no:this.page_no-1,
					page_size:this.page_size
				},
				headers:{
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.list=res.data.data
					this.count=res.data.count
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('querylist')
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		revoke(){
			if (this.id==='') {
				this.g_alert()
			} else {
				this.axios.delete(`${_const.host}/secds/drafts/discount/action/${this.id}`,{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.notice('success', res.data.msg)
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('revoke')
					} else {
						this.notice('warning', res.data.msg)
					}
				})
			}
		},
	}
}
</script>
