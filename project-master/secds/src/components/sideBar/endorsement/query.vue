<template>
	<div class="query">
		<el-row>
			<el-col :span="24">
			<card title="汇总信息" icon-name="userinfo">
				<template slot="card_body">
					<user-info></user-info>
				</template>
			</card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" style="margin-top:25px;">
				<endorse-data :data-list="endorseList" @transfer="getId" @detail="draftDetail"></endorse-data>
			</el-col>
			<el-col :span="24" style="margin-top:25px;">
				<el-button size="small" type="danger" style="float:left;" @click="revoke()">撤 销</el-button>
				<page-index :page-no="page_no" :page-size="page_size" :page-sizes="page_sizes" :total="count" v-on:getCurrentIndex="getIndex"
				v-on:getSize="getPageSize" style="float:right;"></page-index>
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
	import userInfo from '../../tmp/userinfo'
	import card from '../../tmp/card'
	import iconSvg from '../../tmp/icon-svg'
	import endorseData from './components/endorsegrid'
	import pageIndex from '../../tmp/pagination'
	import detail from '../../tmp/detail'
	export default{
		components:{
			'user-info':userInfo,
			'icon':iconSvg,
			'endorse-data':endorseData,
			'page-index':pageIndex,
			'card':card,
			'detail':detail
		},
		data(){
			return{
				host:_const.host,
				endorseList:[],
				id:'',
				count:0,
				page_no:1,
				page_size:10,
				page_sizes:[10,20,30,40],
				detailShow:false,
			}
		},
		mounted(){
			this.loginStatus()
			this.dataList()
		},
		methods:{
			dataList(){
				this.axios.get(`${this.host}/secds/drafts/endorsement/action`,{
					params:{
						page_no: this.page_no-1,
						page_size: this.page_size
					},
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.endorseList=res.data.data 
						this.count=res.data.count
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('dataList')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			getId(id){
				this.id=id
			},
			//获取currentpage
			getIndex(index){
				this.page_no=index
				this.acceptanceList()
			},
			//获取pagesize
			getPageSize(size){
				this.page_size=size
				this.acceptanceList()
			},
			//撤销
			revoke(){
				if (this.id!=='') {
					this.axios.delete(`${this.host}/secds/drafts/endorsement/action/${this.id}`,{
						headers:{
							token:this.cookie.get('token')
						}
					}).then(res=>{
						if (res.data.code==='OK') {
							this.notice('success','操作成功')
						} else {
							this.notice('warning',res.data.msg)
						}
					})
				} else {
					this.g_alert()
				}
			}
		}
	}
</script>
