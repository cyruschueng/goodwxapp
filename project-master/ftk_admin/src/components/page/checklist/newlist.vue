<template>
	<div class="newlist">
		<el-row>
			<el-col :span="24">
				<el-form :model="listForm" :rules="rules" ref="listForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="公司名称：" prop="company_name" style="width:400px;">
						<el-input v-model="listForm.company_name"></el-input>
					</el-form-item>
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
							<el-radio :label="9">投标摆账</el-radio>
							<el-radio :label="10">应收保理</el-radio>
							<el-radio :label="11">反向保理</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="业务清单：">
						<table style="padding-left:0px; width:55%;">
							<tbody>
								<template v-for="(item,index) in content">
									<tr>
										<td>
											<el-input style="width:95%;" placeholder="请输入资料标题" v-model="item.title"></el-input>
										</td>
										<td>
											<el-checkbox v-model="item.checked" @change="change">必填</el-checkbox>
										</td>
										<td>
											<el-input type="textarea" :row="2" style="" placeholder="请输入资料详情"  v-model="item.detail"></el-input>
										</td>
										<td style="width: 10%;text-align: center;vertical-align: middle;">
											<el-button size="small" type="text" style="color: red;width: 30px;height: 30px;font-size:15px;" icon="close" 
											@click="remove(index)"></el-button>
										</td>
										<td style="width: 10%;text-align: center;vertical-align: middle;">
											<el-button size="small" type="text" style="color: #20a0ff;width: 30px;height: 30px;font-size:15px;" icon="plus" 
											@click="add(index)"></el-button>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="checklist('listForm')">提交</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<!-- <el-row>
			<el-col :span="24">
				<table style="padding-left:100px; width:55%;">
					<tbody>
						<template v-for="(item,index) in content">
							<tr>
								<td>
									<el-input style="width:95%;" placeholder="请输入资料标题" v-model="item.title"></el-input>
								</td>
								<td>
									<el-checkbox v-model="item.checked" @change="change">必填</el-checkbox>
								</td>
								<td>
									<el-input type="textarea" :row="2" style="" placeholder="请输入资料详情"  v-model="item.detail"></el-input>
								</td>
								<td style="width: 10%;text-align: center;vertical-align: middle;">
									<el-button size="small" type="text" style="color: red;width: 30px;height: 30px;font-size:15px;" icon="close" 
									@click="remove(index)"></el-button>
								</td>
								<td style="width: 10%;text-align: center;vertical-align: middle;">
									<el-button size="small" type="text" style="color: #20a0ff;width: 30px;height: 30px;font-size:15px;" icon="plus" 
									@click="add(index)"></el-button>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</el-col>
		</el-row> -->
	</div>
</template>

<script>
	export default{
		data(){
			return{
				host:_const.host,
				listForm:{
					company_name:'',
					funds_type:1,
				},
				rules:{
					company_name:[
						{ required:true, message:'请填写公司名称', trigger:'blur' }
					]
				},
				checked:true,
				content:[{
					title:'',
					detail:'',
					checked:false,
					id:1,
					must:0
				}]
			}
		},
		mounted(){
			// console.log(this.content)
		},
		methods:{
			//监听业务类型
			fundsType(type){
				this.funds_type=type
			},
			change(val){
				// console.log(val)
			},
			check(){
				var content=this.content
				for(var i=0;i<content.length;i++){
					if (this.content[i].checked) {
						this.content[i].must=1
					} else {
						this.content[i].must=0
					}
					this.content[i].id=i+1
				}
			},
			add(index){
				/*this.content.push({
					title:'',
					detail:'',
					checked:false,
					id:1,
					must:0
				})*/
				this.content.splice(index+1, 0, {
					title:'',
					detail:'',
					checked:false,
					id:1,
					must:0
				})
			},
			remove(index){
				if (this.content.length!==1) {
					this.content.splice(index,1)
				}
			},
			checklist(form){
				this.$refs[form].validate(valid=>{
					if (valid) {
						this.check()
						console.log(this.content)
						this.axios.post(`${this.host}/ftk/checklists`,{
							company_name:this.listForm.company_name,
							funds_type:this.listForm.funds_type,
							content:this.content
						},{
							headers:{
								'Content-Type':'application/json',
								token:this.cookie.get('token')
							}
						}).then(res=>{
							if (res.data.code==='OK') {
								this.$message({type:'success', message:res.data.msg, duration:2000})
							} else if(res.data.code==='TOKEN_INVLID'){
								this.token('checklist')
							} else if(res.data.code==='USER_UNAUTHORIZED') {
								this.errMsg('error', res.data.msg)
								this.logout()
							} else {
								this.$message.error({message:res.data.msg, duration:2000})
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
</style>