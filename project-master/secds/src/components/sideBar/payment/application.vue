<template>
	<div class="payment">
		<el-row>
			<el-col :span="24">
				<data-grid :data-list="list" @transfer="getId" @detail="draftDetail"></data-grid>
			</el-col>
			<el-col :span="24" style="margin:15px 0;">
			<el-button size="small" type="info" @click="submit" style="float:left;">提交</el-button>
				<page :page-no="page_no" :page-size="page_size" :page-sizes="page_sizes" :total="count" v-on:getCurrentIndex="getIndex"
				v-on:getSize="getPageSize" style="float:right;"></page>	
			</el-col>
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
import dataGrid from './components/datagrid'
import page from '../../tmp/pagination'
import detail from '../../tmp/detail'
export default {
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
		this.paylist()
	},
	methods:{
		getId(id){
			this.id=id
		},
		//获取currentpage
		getIndex(index){
			this.page_no=index
			this.paylist()
		},
		//获取pagesize
		getPageSize(size){
			this.page_size=size
			this.paylist()
		},
		paylist(){
			this.axios.get(`${_const.host}/secds/drafts/payment`,{
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
					this.token('paylist')
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		submit(){
			if (this.id==='') {
				this.g_alert()
			} else {
				this.axios.post(`${_const.host}/secds/drafts/${this.id}/payment`,{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.notice('success', res.data.msg)
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('submit')
					} else {
						this.notice('warning', res.data.msg)
					}
				})
			}
		}
	}
}
</script>
