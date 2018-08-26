const common={
	methods:{
		test(mold, msg){
			this.$message({
				type:mold,
				message:msg,
				duration:2000
			})
		}
	}
}

export {common}