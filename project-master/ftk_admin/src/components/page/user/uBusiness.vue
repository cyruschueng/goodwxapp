<template>
	<el-row>
		<el-col :span="24">
			<template>
				<el-table :data="businessData" border style="width: 100%">
					<el-table-column type="index" width="55"></el-table-column>
					<el-table-column label="业务类型">
						<template scope="scope">
							<span v-if="scope.row.funds_type==1">保证金代存</span>
							<span v-else-if="scope.row.funds_type==2">敞口代还</span>
							<span v-else-if="scope.row.funds_type==3">信用证代付</span>
							<span v-else-if="scope.row.funds_type==4">信易贷</span>
							<span v-else-if="scope.row.funds_type==5">流贷倒贷</span>
							<span v-else-if="scope.row.funds_type==6">短融过桥</span>
							<span v-else-if="scope.row.funds_type==7">融易贷</span>
							<span v-else-if="scope.row.funds_type==8">时点存款</span>
							<span v-else-if="scope.row.funds_type==9">投标摆账</span>
							<span v-else-if="scope.row.funds_type==10">应收保理</span>
							<span v-else>反向保理</span>
						</template>
					</el-table-column>
					<el-table-column prop="funds_value" label="业务金额（元）">
					</el-table-column>
					<el-table-column prop="funds_start_date" label="开始时间">
					</el-table-column>
					<el-table-column prop="funds_duration" label="业务期限（天）">
					</el-table-column>
					<el-table-column prop="funds_bank" label="所属银行">
					</el-table-column>
					<el-table-column prop="yield_rate" label="日收益率（‰）">
					</el-table-column>
					<el-table-column label="业务状态">
						<template scope="scope">
							<el-tag type="warning" v-if="scope.row.funds_status===0">未完成 </el-tag>
							<el-tag type="success" v-else-if="scope.row.funds_status===1">交易成功</el-tag>
							<el-tag type="danger" v-else-if="scope.row.funds_status===2">交易失败</el-tag>
							<el-tag type="gray" v-else>业务被删除</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button :plain="true" size="small" type="success" @click="finish(scope.$index, scope.row)">完成</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-col>
		<el-col :span="24" style="margin-top:25px;">
			<page :page-no="page_no" :page-size="page_size" :total="total" @getIndex="pageNo" @getSize="pageSize" style="float:right;"></page>
		</el-col>
		<el-col :span="24">
			<!-- finish -->
			<el-dialog title="业务完成" :visible.sync="complete" size="tiny">
				<el-form ref="finishForm" :model="finishForm" label-width="80px">
					<el-radio-group v-model="finishForm.funds_status" @change="isSuccess">
						<el-radio :label="1">交易成功</el-radio>
						<el-radio :label="2">交易失败</el-radio>
					</el-radio-group>
				</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button @click="complete = false">取 消</el-button>
					<el-button type="primary" @click="confirmFinish">确 定</el-button>
				</span>
			</el-dialog>
		</el-col>
	</el-row>
</template>

<script>
import bus from '../../../assets/js/eventBus'
import pageIndex from '../../tmp/page'
export default{
	components:{
		'page':pageIndex
	},
	data(){
		return{
			host:_const.host,
			user_id:this.$route.query.user_id,
			businessData:[],
			page_no:1,
			page_size:10,
			total:0,
			funds_id:'',
			complete:false,
			finishForm:{
				funds_status:1
			}
		}
	},
	mounted(){
		this.ifLogin()
		this.businessList()
	},
	methods:{
		//pagination
		pageNo(index){
			this.page_no=index
			this.businessList()
		},
		pageSize(size){
			this.page_size=size
			this.businessList()
		},
		//tablelist
		businessList(){
			this.axios.get(`${this.host}/ftk/funds/users/${this.user_id}`,{
				params:{
					page_no:this.page_no-1,
					page_size:this.page_size
				},
				headers:{
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.businessData=res.data.data
					this.total=res.data.count
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('businessList')
				} else if(res.data.code==='USER_UNAUTHORIZED') {
					this.errMsg('error', res.data.msg)
					this.logout()
				} else {
					this.$message.error({message:res.data.msg, duration:2000})
				}
			})
		},
		//监听完成类型
		isSuccess(type){
			this.finishForm.funds_status=type
		},
		//资金业务完成
		finish(index, row){
			this.funds_id=row.id
			this.complete=true
		},
		confirmFinish(){
			if (this.finishForm.funds_status==1||this.finishForm.funds_status==2) {
				this.axios.post(`${this.host}/ftk/funds/${this.funds_id}/complete`,{
					funds_status:this.finishForm.funds_status
				},{
					headers:{
						'Content-Type':'application/json',
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.businessList()
						this.complete=false
						this.$notify({type:'success', message:'操作成功', duration:2000})
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('confirmFinish')
					} else if(res.data.code==='USER_UNAUTHORIZED') {
						this.errMsg('error', res.data.msg)
						this.logout()
					} else {
						this.$notify.error({message:res.data.msg, duration:2000})
					}
				})
			} else {
				this.$message.error({message:'请选择业务状态',duration:2000})
				return false
			}
		}
	}
}
</script>