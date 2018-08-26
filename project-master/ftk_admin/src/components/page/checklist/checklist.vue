<template>
	<div class="newlist">
		<el-row>
			<el-col :span="24">
				<el-form :model="listForm" ref="listForm" label-width="100px" class="demo-ruleForm">
					<!-- <el-form-item label="公司名称：" prop="company_name" style="width:400px;">
						<el-input v-model="listForm.company_name"></el-input>
					</el-form-item> -->
					<el-form-item label="业务类型：">
						<el-radio-group v-model="listForm.funds_type" @change="fundsType">
							<el-radio :label="1">保证金代存</el-radio>
							<el-radio :label="2">敞口代还</el-radio>
							<el-radio :label="3">信用证代付</el-radio>
							<el-radio :label="4">信易贷</el-radio>
							<el-radio :label="5">流贷倒贷</el-radio>
							<el-radio :label="6">短融过桥</el-radio>
							<el-radio :label="7">融易贷</el-radio>
							<el-radio :label="8">时点存款</el-radio>
							<el-radio :label="9">特需摆账</el-radio>
							<el-radio :label="10">应收保理</el-radio>
							<el-radio :label="11">反向保理</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="业务清单：">
						<ul class="list-body">
							<template v-for="(item, index) in content">
								<li>
									<ul class="list">
										<li style="width:20%;">
											<ul>
												<li style="margin-bottom:8px;">
													<el-select v-model="item.role" placeholder="提供者角色" @change="role(index)" style="width:100%;">
														<el-option v-for="items in item.options" :key="items.value" :label="items.label" :value="items.value">
														</el-option>
													</el-select>
												</li>
												<li>
													<el-input style="width:100%;" placeholder="请输入资料标题" v-model.trim="item.title"></el-input>
												</li>
											</ul>
										</li>
										<li style="width:60%;">
											<el-input type="textarea" :rows="3" placeholder="请输入资料详情"  v-model.trim="item.detail" 
											style="width:100%;"></el-input>
										</li>
										<li style="width:5%;">
											<ul>
												<li>
													<el-button size="small" type="text" style="color: #20a0ff;width: 30px;height: 30px;font-size:15px;" 
													icon="plus" @click="add(index)"></el-button>
												</li>
												<li>
													<el-button size="small" type="text" style="color: red;width: 30px;height: 30px;font-size:15px;" icon="close" 
													@click="remove(index)"></el-button>
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</template>
						</ul>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="checklist('listForm')">{{operation}}</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				host:_const.host,
				operation:'修改',
				listForm:{
					company_name:'',
					funds_type:1,
				},
				checked:true,
				content:[{
					title:'',
					detail:'',
					checked:false,
					id:1,
					must:0,
					role:'',
					options: [{
						value: 1,
						label: '创建者'
					}, {
						value: 2,
						label: '风控初审'
					}, {
						value: 3,
						label: '风控复核'
					}]
				}],
			}
		},
		mounted(){
			this.ifLogin()
			this.defaultList()
			this.listForm.company_name=JSON.parse(this.cookie.get('userinfo')).company_name
		},
		methods:{
			//监听业务类型
			fundsType(type){
				this.listForm.funds_type=type
				this.defaultList()
			},
			role(index){},
			change(val){
			},
			//取得默认资料清单
			defaultList(){
				this.axios.get(`${this.host}/ftk/checklists/user/checklist`,{
					params:{
						funds_type:this.listForm.funds_type
					},
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.listForm.funds_type=res.data.data[0].funds_type
						this.content=res.data.data[0].content
						this.getCheck()
						this.operation='修改'
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('defaultList')
					} else if (res.data.code==='CHECKLIST_NOT_EXIST') {
						this.content=[{
							title:'',
							detail:'',
							checked:false,
							id:1,
							must:0,
							role:'',
							options: [{
								value: 1,
								label: '创建者'
							}, {
								value: 2,
								label: '风控初审'
							}, {
								value: 3,
								label: '风控复核'
							}]
						}]
						this.operation='添加'
					} else if(res.data.code==='USER_UNAUTHORIZED') {
						this.errMsg('error', res.data.msg)
						this.logout()
					} else {
						this.$message.error({message:res.data.msg, duration:2000})
					}
				})
			},
			//获取资料清单转换格式
			getCheck(){
				var content=this.content
				for(var i=0; i<content.length; i++){
					if (this.content[i].must==1) {
						this.content[i].checked=true
					} else {
						this.content[i].checked=false
					}

					this.content[i].id=i+1
					this.content[i].options=[{
						value: 1,
						label: '创建者'
					}, {
						value: 2,
						label: '风控初审'
					}, {
						value: 3,
						label: '风控复核'
					}]
				}
			},
			//提交资料清单转换格式
			submitCheck(){
				var content=this.content
				for(var i=0;i<content.length;i++){
					if (this.content[i].checked) {
						this.content[i].must=1
					} else {
						this.content[i].must=0
					}

					this.content[i].id=i+1
					delete content[i]['checked']
					delete content[i]['options']
					delete content[i]['users_id']
				}
			},
			add(index){
				this.content.splice(index+1, 0, {
					title:'',
					detail:'',
					checked:false,
					id:1,
					must:0,
					role:'',
					options: [{
						value: 1,
						label: '创建者'
					}, {
						value: 2,
						label: '风控初审'
					}, {
						value: 3,
						label: '风控复核'
					}]
				})
			},
			remove(index){
				if (this.content.length!==1) {
					this.content.splice(index,1)
				}
			},
			//提交资料清单
			checklist(form){
				this.$refs[form].validate(valid=>{
					if (valid) {
						this.submitCheck()
						this.axios.post(`${this.host}/ftk/checklists`,{
							company_name:this.listForm.company_name,
							funds_type:this.listForm.funds_type,
							content:this.content,
						},{
							headers:{
								'Content-Type':'application/json',
								token:this.cookie.get('token')
							}
						}).then(res=>{
							if (res.data.code==='OK') {
								this.$notify({type:'success', message:res.data.msg, duration:2000})
							} else if (res.data.code=='TOKEN_INVLID') {
								this.token('checklist', form)
							} else if(res.data.code==='USER_UNAUTHORIZED') {
								this.errMsg('error', res.data.msg)
								this.logout()
							} else {
								this.$notify.error({message:res.data.msg, duration:2000})
							}
						})
					} else {
						this.$message.error({message:'请填写公司名称',duration:2000})
						return false
					}
				})
			}
		}
	}
</script>

<style scoped>
.newlist{
	padding: 20px 10px;
}
.list-body, .list-body ul, .list-body li{
	padding: 0;
	margin: 0;
	list-style-type: none;
}
.list-body{
	width: 66%;
}
.list-body>li{
	padding: 20px 0;
	border-bottom: 1px dashed #ccc;
}
.list-body>li:first-child{
	padding-top: 0;
}
.list-body>li:last-child{
	border: none;
}
.list{
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
}
</style>