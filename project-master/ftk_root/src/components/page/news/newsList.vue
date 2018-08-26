<template>
	<div class="newslist">
		<el-row>
			<el-col :span="24">
				<list :listData="data" @edit="modify" @remove="cutout"></list>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" style="margin-top:15px;">
				<el-button type="primary" @click="newList">新增</el-button>
				<page :page-no="page_no" :page-size="page_size" :total="count" @getIndex="pageNo" @getSize="pageSize" style="float:right;"></page>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import list from './components/list'
import page from '../../tmp/page'
export default{
	components:{
		'list':list,
		'page':page
	},
	data(){
		return{
			id:'',
			data:[],
			page_no:1,
			page_size:10,
			count:0
		}
	},
	mounted(){
		this.news()
	},
	methods:{
		modify(row){
			this.$router.push({
				path:'/editorR',
				query:{
					modify:true,
					id:row.id,
					pic:row.pic,
					brief:row.brief
				}
			})
		},
		cutout(row){
			this.$confirm('此操作将永久删除该资讯, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				this.axios.delete(`${_const.host}/ftk/news/${row.id}`,{
					headers:{
						token:this.cookie.get('token')
					}
				}).then(res=>{
					if (res.data.code=='OK') {
						this.news()
						this.$notify({type:'success', message:'删除成功'})
					} else if (res.data.code==='TOKEN_INVLID') {
						this.token('cutout')
					}  else {
						this.$notify.error({message:res.data.msg})
					}
				})
			}).catch(()=>{
				return false
			})
		},
		pageNo(no){
			this.page_no=no
			this.news()
		},
		pageSize(size){
			this.page_size=size
			this.news()
		},
		news(){
			this.axios.get(`${_const.host}/ftk/news`,{
				params:{
					page_no:this.page_no-1,
					page_size:this.page_size
				},
				headers:{
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code=='OK') {
					this.data=res.data.data
					this.count=res.data.count
				} else if (res.data.code==='TOKEN_INVLID') {
					this.token('news')
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		newList(){
			this.$router.push('/editorR')
		}
	}
}
</script>