<template>
	<el-row>
		<el-col :span="24" class="create-wrapper">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<el-button style="float: right;" type="primary" @click="create">生 成</el-button>
					<iconSvg iconStyle="menu-icon" iconClass="data"></iconSvg>
					<span style="line-height:36px;">数据生成</span>
				</div>
				<div class="card-body">
					<el-form :model="typeForm" ref="typeForm" class="demo-ruleForm">
						<el-form-item prop="type">
							<el-radio-group v-model="typeForm.type" @change="typeChange">
								<el-radio :label="1" style="display:block;margin-left:15px;">创建提示承兑汇票</el-radio>
								<el-radio :label="2" style="display:block;margin-top:15px;">创建提示收票待签收汇票</el-radio>
								<el-radio :label="3" style="display:block;margin-top:15px;">创建背书待签收汇票</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
	import iconSvg from '../tmp/icon-svg'
	export default{
		components:{iconSvg},
		data(){
			return{
				host: _const.host,
				typeForm:{
					type:undefined
				},
			}
		},
		mounted(){
			this.loginStatus()
		},
		methods:{
			/**
			 * 弹出框提示
			 * @param  {string}  type      消息类型
			 * @param  {string}  msg       提示消息
			 * @param  {boolean} cancelbtn 是否显示取消按钮
			 * @param  {boolean} skip      是否跳转
			 * @param  {string}  link      跳转路由
			 */
			errtip(type, msg, cancelbtn, skip, link){
				this.$confirm(msg, '提示', {
					confirmButtonText: '确定',
					showCancelButton: cancelbtn,
					type: type
				}).then(() => {
					if (skip) {
						setTimeout(()=>this.$router.push(link),500)
					}
				}).catch(() => {
				})
			},
			//监听radio值变化
			typeChange(type){
				this.typeForm.type=type
			},
			//生成数据
			create(form){
				let type=this.typeForm.type
				if (type!==undefined) {

					if (type===1) {
						this.createAcceptance()
					} else if (type===2) {
						this.createSign()
					} else {
						this.createEndorse()
					}
				
				} else {
					this.errtip('warning' ,'请选择数据生成类型!', false, false, null)
				}
			},
			//创建提示承兑汇票
			createAcceptance(){
				this.axios.post(`${this.host}/secds/drafts/data/acceptance`,{},{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.errtip('success', `汇票：${res.data.draft_id} 是否前往查看`, true, true, '/acceptanceApplication')
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('createAcceptance')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			//创建提示收票待签收汇票
			createSign(){
				this.axios.post(`${this.host}/secds/drafts/data/reception/sign`,{},{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.errtip('success', `汇票：${res.data.draft_id} 是否前往查看`, true, true, '/receiveSign')
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('createSign')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			},
			//创建背书待签收汇票
			createEndorse(){
				this.axios.post(`${this.host}/secds/drafts/data/endorsement/sign`,{},{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.errtip('success', `汇票：${res.data.draft_id} 是否前往查看`, true, true, '/endorseSign')
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('createEndorse')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			}
		}
	}
</script>

<style scoped>
.menu-icon{
	width: 20px;
	height: 20px;
	vertical-align: -0.21em;
	fill: #333;
	overflow: hidden;
}
</style>