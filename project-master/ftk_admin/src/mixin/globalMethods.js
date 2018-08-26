const globalMethods={
	methods:{
		errMsg(mold, msg){
			this.$message({
				type:mold,
				message:msg,
				duration:2000
			})
		},
		notice(mold, msg){
			this.$notify({
				type:mold,
				message:msg,
				duration:2000
			})
		},
		token(fun, argue=null){
			this.axios.get(`${_const.host}/ftk/users/token`,{
				headers:{
					swap:this.cookie.get('swap')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.cookie.set('token', res.data.token)
					this[fun](argue)
				} else if (res.data.code==='USER_NOT_LOGIN') {
					this.errMsg('error', res.data.msg)
					this.logout()
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		logout(){
			this.cookie.remove('token')
			this.cookie.remove('swap')
			setTimeout(()=>this.$router.push('/login'),500)
		},
		ifLogin(){
			let token_admin=this.cookie.get('token')
			if (!token_admin) {
				this.errMsg('error', '登录已过期，请重新登录')
				setTimeout(()=>this.$router.push('/login'),500)
			}
		}
	}
}

export {globalMethods}