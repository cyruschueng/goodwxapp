export default{
	install(Vue, options){
		Vue.prototype.test= () => {
			/*this.axios.get(`${_const.host}/ftk/funds`,{
				params:{
					page_no:0,
					page_size:10
				},
				headers:{
					token:_const.token
				}
			}).then(res=>{
				console.log(res.data.code)
			})*/
		}
	}
}