<template>
	<div class="sign">
		<el-row>
			<el-col :span="24">
				<data-grid :draft-data="datalist" v-on:getid="getId" @detail="draftDetail"></data-grid>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" style="margin-top:25px;">
				<div style="float:left;">
					<el-button size="small" type="info" @click="sign">签 收</el-button>
					<el-button size="small" type="danger" @click="revoke">驳 回</el-button>
				</div>
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
import dataGrid from '../../tmp/datagrid_1'
import pageIndex from '../../tmp/pagination'
import iconSvg from '../../tmp/icon-svg'
import detail from '../../tmp/detail'
export default{
	components:{
		'icon':iconSvg,
		'page':pageIndex,
		'data-grid':dataGrid,
		'detail':detail
	},
	data(){
		return{
			datalist:[],
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
		this.signData()
	},
	methods:{
		getIndex(index){
			this.page_no=index
			this.signData()
		},
		getPageSize(size){
			this.page_size=size
			this.signData()
		},
		getId(id){
			this.id=id
		},
		signData(){
			this.axios.get(`${_const.host}/secds/drafts/endorsement/sign`,{
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
					this.datalist=res.data.data
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('signData')
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		sign(){
			if (this.id!=='') {
				this.axios.post(`${_const.host}/secds/drafts/${this.id}/endorsement/sign`,{},{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.notice('success','操作成功')
						this.signData()
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
		revoke(){
			if (this.id!=='') {
				this.axios.delete(`${_const.host}/secds/drafts/${this.id}/endorsement/sign`,{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.notice('success','操作成功')
						this.signData()
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('revoke')
					} else {
						this.notice('warning', res.data.msg)
					}
				})
			} else {
				this.g_alert()
			}
		},
	}
}
</script>
