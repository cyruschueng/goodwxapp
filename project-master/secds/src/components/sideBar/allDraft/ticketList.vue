<template>
	<el-row class="draft-container">
		<el-col :span="24" class="draft-list">
			<template>
				<el-table ref="draftList" :data="draftData" border style="width: 100%" highlight-current-row>
					<el-table-column type="" label=" " width="53" :resizable="false">
						<template scope="scope">
							<el-radio :label="scope.$index" v-model="radio" @change.native="handleChange(scope.row)"></el-radio>
						</template>
					</el-table-column>
					<el-table-column label="电子票据票号" width="300">
						<template scope="scope">
							<span class="draft-hover" @click="draftDetail(scope.$index, scope.row)">{{ scope.row.draft_id}}</span>
						</template>
					</el-table-column>
					<el-table-column label="票据类型">
						 <template scope="scope">{{ scope.row.draft_type==1 ? '银承' : '商承' }}</template>
					</el-table-column>
					<el-table-column property="draft_value" label="票面金额"></el-table-column>
					<el-table-column property="draft_start_date" label="出票日"></el-table-column>
					<el-table-column property="draft_end_date" label="到期日"></el-table-column>
					<el-table-column label="转让标识">
						<template scope="scope">{{ scope.row.draft_restrictive==0 ? '可转让' : '不可转让' }}</template>
					</el-table-column>
					<el-table-column label="票据状态" width="200">
						<template scope="scope">
							<span v-if="scope.row.draft_status==='010004'">出票已登记</span>
							<span v-else-if="scope.row.draft_status==='020001'">提示承兑待签收</span>
							<span v-else-if="scope.row.draft_status==='020006'">提示承兑已签收</span>
							<span v-else-if="scope.row.draft_status==='030001'">提示收票待签收</span>
							<span v-else-if="scope.row.draft_status==='030006'">提示收票已签收</span>
							<span v-else-if="scope.row.draft_status==='000002'">票据已作废</span>
							<span v-else-if="scope.row.draft_status==='100001'">背书待签收</span>
							<span v-else-if="scope.row.draft_status==='100006'">背书已签收</span>
							<span v-else-if="scope.row.draft_status==='110101'">买断式贴现待签收</span>
							<span v-else-if="scope.row.draft_status==='110106'">买断式贴现已签收</span>
							<span v-else-if="scope.row.draft_status==='200001'">提示付款待签收</span>
							<span v-else>提示付款已签收待清算</span>
						</template>
					</el-table-column>
					<el-table-column property="drawer_name" label="出票人名称"></el-table-column>
					<el-table-column property="payee_name" label="收款人名称"></el-table-column>
				</el-table>
			</template>
		</el-col>
		<el-col :span="24" class="draft-pagination" style="margin-top:25px;">
			<div style="float:left;">
				<el-button size="small" type="danger" @click="untread">未用退回</el-button>
			</div>
			<el-pagination style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="index" :page-sizes="page_size" :page-size="size" layout="prev, pager, next" :total="count">
			</el-pagination>
		</el-col>
		<el-col :span="24" class="draft-detail">
			<el-dialog :visible.sync="detailShow" size="small">
				<detail></detail>
			</el-dialog>
		</el-col>
	</el-row>
</template>

<script>
	import iconSvg from '../../tmp/icon-svg.vue'
	import detail from '../../tmp/detail.vue'
	export default{
		components:{
			'iconSvg':iconSvg,
			'detail':detail
		},
		data(){
			return{
				host:_const.host,
				draftData:[],
				currentRow:null,
				id:'',
				page_size:[10,20,30,40,50],
				index: 1,
				count: 0,
				size: 10,
				radio:'',
				detailShow:false,
				user_account: this.cookie.get('user_account')
			}
		},
		mounted(){
			this.loginStatus()
			this.draftList()
		},
		methods:{
			//pagination
			handleCurrentChange(index){
				this.index=index
				this.draftList()
			},
			handleSizeChange(size){
				this.size=size
				this.draftList()
			},
			//selsction
			handleChange(row) {
				this.id=row.id
			},
			//draft-list
			draftList(){
				this.axios.get(`${this.host}/secds/drafts`,{
					params:{
						page_no: this.index-1,
						page_size: this.size
					},
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.draftData=res.data.data
						this.count=res.data.count
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('draftList')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			untread(){
				if (this.id!=='') {
					this.axios.delete(`${this.host}/secds/drafts/${this.id}`,{
						headers:{
							token: this.cookie.get('token')
						}
					}).then(res=>{
						if (res.data.code==='OK') {
							this.notice('success', res.data.msg)
							this.draftList()
						}else if (res.data.code==='TOKEN_INVLID') {
							this.token('untread')
						}  else {
							this.notice('warning', res.data.msg)
						}
					})
				} else {
					this.g_alert()
				}
			},
			draftDetail(index, row){
				this.cookie.set('id', row.id)
				setTimeout(()=>{
					this.$store.dispatch('GET_DRAFT_INFO')
					this.detailShow=true
				},50)
			}
		}
	}
</script>
