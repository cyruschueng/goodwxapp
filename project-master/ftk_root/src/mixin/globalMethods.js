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
		token(fun,argue=null){
			this.axios.get(`${_const.host}/ftk/users/token`,{
				headers:{
					swap:this.cookie.get('swap')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.cookie.set('token', res.data.token, 1/24)
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
			this.cookie.remove('userinfo')
			setTimeout(()=>this.$router.push('/'),500)
		},
		ifLogin(){
			let token_root=this.cookie.get('token')
			if (token_root===undefined) {
				this.logout()				
			}
		}
	}
}

export {globalMethods}