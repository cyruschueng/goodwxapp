<template>
	<div class="application">
		<el-row>
			<el-col :span="24">
				<data-grid :draft-data="list" v-on:getid="getId" v-on:detail="draftDetail"></data-grid>
			</el-col>
			<el-col :span="24" style="margin-top:25px;">
				<div style="float:left;">
					<el-button size="small" type="info" @click="accept">承 兑</el-button>
				</div>
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
	import iconSvg from '../../tmp/icon-svg'
	import dataGrid from '../../tmp/datagrid_1'
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
				count:0,
				page_no:1,
				page_size:10,
				page_sizes:[10,20,30,40],
				detailShow:false
			}
		},
		mounted(){
			this.loginStatus()
			this.acceptanceList()
		},
		methods:{
			//取得全部可以提示承兑的汇票
			acceptanceList(){
				this.axios.get(`${this.host}/secds/drafts/acceptance`,{
					params:{
						page_no:this.page_no-1,
						page_size:this.page_size,
					},
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.list=res.data.data
						this.count=res.data.count
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('acceptanceList')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			//获取子组件传递的id
			getId(id) {
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
			//承兑汇票
			accept(){
				if (this.id!=='') {
					this.axios.post(`${this.host}/secds/drafts/${this.id}/acceptance`,{},{
						headers:{
							token:this.cookie.get('token')
						}
					}).then(res=>{
						if (res.data.code==='OK') {
							this.notice('success', res.data.msg)
							this.acceptanceList()
						} else if (res.data.code==='TOKEN_INVLID') {
							this.token('accept')
						} else {
							this.notice('warning', res.data.msg)
						}
					})
				} else {
					this.g_alert()
				}
			},
			//汇票详细
			draftDetail(){
				//先在detail组件中完成id的赋值，在调用vuex中的票据详细接口
				setTimeout(()=>{
					this.$store.dispatch('GET_DRAFT_INFO')
					this.detailShow=true
				},50)
			},
		}
	}
</script>
