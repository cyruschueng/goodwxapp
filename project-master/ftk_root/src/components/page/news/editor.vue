<template>
	<div class="editor">
		<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题：" prop="title">
				<el-input v-model="editForm.title" style="width:300px;" placeholder="请输入资讯标题"></el-input>
			</el-form-item>
			<el-form-item label="简介：" prop="brief">
				<el-input type="textarea" :rows="2" placeholder="请输入资讯简介" v-model="editForm.brief" style="width:300px;"></el-input>
			</el-form-item>
			<el-form-item label="图片：">
				<el-upload 
					ref="upload"
					:action="host" 
					list-type="picture-card"
					:before-upload="handleUpload" 
					 :on-preview="handlePictureCardPreview"
					:data="params"
					>
					<i class="el-icon-plus"></i>
				</el-upload>

				<el-dialog v-model="dialogVisible" size="tiny">
					<img width="100%" :src="dialogImageUrl" alt="">
					<!-- <span>{{this.host+'/'+this.params.key}}</span> -->
				</el-dialog>
			</el-form-item>
			<el-form-item label="列表图片：" prop="pic">
				<el-input v-model="editForm.pic" placeholder="请输入列表缩略图" style="width:300px;"></el-input>
			</el-form-item>
			<el-form-item label="正文图片：">
				<template v-for="(item, index) in fileList">
					<p style="line-height:14px;">{{index+1}}： {{host}}/{{item}}</p>
				</template>
			</el-form-item>
			<el-form-item>
				<mavon-editor v-model="editForm.detail"/>
			</el-form-item>
			<el-form-item>
				<el-button class="submit-btn" type="primary" @click="submit('editForm')">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {mavonEditor} from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	export default{
		components:{
			'mavon-editor':mavonEditor
		},
		data(){
			return {
				editorOption:{
					//config
				},
				editForm:{
					title:'',
					brief:'',
					detail:'',
					pic:''
				},
				rules:{
					title:[
						{ required:true, message:'请填写资讯标题', trigger:'blur' }
					],
					brief:[
						{ required:true, message:'请填写资讯简介', trigger:'blur' }
					]
				},
				host:'',
				upload_dir:'',
				filename:'',
				suffix:'',
				params:{
					key:'',
					OSSAccessKeyId:'',
					policy:'',
					signature:'',
					expire:'',
					success_action_status:'200',
				},
				fileList:[],
				isModify:false,
				dialogVisible: false,
				dialogImageUrl:''
			}
		},
		couputed:{},
		mounted(){
			if (this.$route.query.modify) {
				this.getnews()
			}
			this.get_sign()
		},
		methods:{
			//取得头像上传签名
			get_sign(){
				this.axios.get(`${_const.host}/ftk/news/pic/sign`,{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code!=='OK') {
						this.g_message('error', res.data.msg)
						return false
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('get_sign')
					} else {
						this.host=res.data.sign.host
						this.upload_dir=res.data.sign.upload_dir
						this.filename=res.data.sign.filename
						this.params.OSSAccessKeyId=res.data.sign.accessid
						this.params.policy=res.data.sign.policy
						this.params.signature=res.data.sign.signature
						this.params.expire=res.data.sign.expire

					}
				})
			},
			handleUpload(file){
				this.get_sign()
				let filename=file.name
				let namesplit=filename.split('.')
				let suffix=namesplit[1]
				
				this.params.key=`${this.upload_dir}${this.filename}.${suffix}`
				this.fileList.push(this.params.key)
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			submit(form){
				console.log(123)
				this.$refs[form].validate(valid=>{
					if (!valid) {
						return false
					} else if (this.editForm.detail=='') {
						this.$confirm('请填写票据资讯详细内容', '提示', {
							showCancelButton:false,
							confirmButtonText:'确定',
							type:'wraning'
						})
					} else {
						if (this.$route.query.modify) {
							this.edit()
						} else {
							this.add()
						}
					}
				})
			},
			reset(form){
				this.$refs[form].resetFields()
			},
			add(){
				this.axios.post(`${_const.host}/ftk/news`,{
					title:this.editForm.title,
					brief:this.editForm.brief,
					detail:this.editForm.detail,
					pic:this.editForm.pic
				},{
					headers:{
						token:this.cookie.get('token'),
						'Content-Type':'application/json'
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.notice('success', '添加成功')
						this.fileList=[]
						this.editForm.detail=''
						this.reset('editForm')
						this.$refs.upload.clearFiles()
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('add')
					} else {
						this.notice('error', res.data.msg)
					}
				})
			},
			edit(){
				this.axios.put(`${_const.host}/ftk/news/${this.$route.query.id}`,{
					title:this.editForm.title,
					brief:this.editForm.brief,
					detail:this.editForm.detail,
					pic:this.editForm.pic
				},{
					headers:{
						'Content-Type':'application/json',
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.notice('success', '修改成功')
						this.fileList=[]
						this.editForm.detail=''
						this.reset('editForm')
						this.$refs.upload.clearFiles()
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('edit')
					} else {
						this.notice('error', res.data.msg)
					}
				})
			},
			getnews(){
				this.axios.get(`${_const.host}/ftk/news/${this.$route.query.id}`,{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code==='OK') {
						this.editForm.title=res.data.data[0].title
						this.editForm.brief=this.$route.query.brief
						this.editForm.detail=res.data.data[0].detail
						this.editForm.pic=this.$route.query.pic
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('getnews')
					} else {
						this.errMsg('error', res.data.msg)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.submit-btn{
		margin: 52px 0 25px;
	}
</style>