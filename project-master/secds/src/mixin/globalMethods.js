const globalMethods={
	data(){
		return{
			g_detailData:[],
			g_id:''
		}
	},
	methods:{
		errMsg(mold, msg){
			this.$message({
				type:mold, 
				message:msg, 
				duration:3000
			})
		},
		notice(mold, msg){
			this.$notify({
				type:mold,
				message:msg,
				duration:3000
			})
		},
		token(fun, argue=null){
			this.axios.get(`${_const.host}/secds/users/token`,{
				headers:{
					swap:this.cookie.get('swap')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.cookie.set('token', res.data.token)
					this[fun](argue)
				} else if (res.data.code=='USER_UNAUTHORIZED') {
					this.errMsg('error', res.data.msg)
					this.cookie.remove('swap')
					this.cookie.remove('token')
					this.cookie.remove('user_id')
					this.cookie.remove('userinfo')
					this.cookie.remove('id')
					setTimeout(()=>this.$router.push('/'),600)
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		loginStatus(){
			let swap=this.cookie.get('swap')
			if (swap===undefined) {
				this.cookie.remove('swap')
				this.cookie.remove('token')
				this.cookie.remove('userinfo')
				this.cookie.remove('user_id')
				this.cookie.remove('id')
				setTimeout(()=>this.$router.push('/'),600)
			} 
		},
		g_alert() {
			this.$alert('未选择收票条目', '提示', {
				confirmButtonText: '确定',
				type:'warning',
				callback: action => {
					return false
				}
			})
		},
		//汇票详细
		draftDetail(){
				//先在detail组件中完成id的赋值，在调用vuex中的票据详细接口
				setTimeout(()=>{
					this.$store.dispatch('GET_DRAFT_INFO')
					this.detailShow=true
				},50)
			}
	}
}

export {globalMethods}