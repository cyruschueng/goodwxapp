const localMethods = {
	methods: {
		boxOpen() {
			this.$confirm('该虚拟用户不存在，是否创建？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.display = true
			}).catch(() => {
			});
		}
	}
}
export default localMethods