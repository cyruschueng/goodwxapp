const localMethods={
	methods:{
		/**
		 * 短信验证码
		 * @param  {string}   code 图片验证码
		 * @param  {[number]} id   用户id
		 * @return null
		 */
		smscode:function(code, id){
			this.axios.get(`${_const.host}/secds/users/captcha/sms`,{
				params:{
					captcha: code,
					user_id: id
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.notice('success', '发送成功')
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
		},
		/**
		 * 图片验证码
		 * @param  {number} number  用户id
		 * @return null        
		 */
		picode:function(number){
			this.axios.get(`${_const.host}/secds/users/captcha/pic`,{
				params:{
					user_id:number
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					this.src=`${this.base}${res.data.data}`
				} else if (res.data.code=='CAPTCHA_INVALID') {
					this.notice('warning', '图片验证码已过期,请重新填写')
					this.picode(number)
				} else {
					this.errMsg('error', res.data.msg)
				}
			}).catch(error=>console.log(error))
		},
	}
}

const contact={
	methods:{
		contact(){
			let contact=[]
			this.axios.get(`${_const.host}/secds/users/contact`,{
				headers:{
					token:this.cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code=='OK') {
					var data=res.data.data
					for(let i=0; i<data.length; i++){
						data[i].value=data[i].contact_name
						delete data[i]['contact_name']
						contact.push(data[i])
					}
				} else if (res.data.code=='TOKEN_INVLID') {
					this.token('contact')
				} else {
					this.errMsg('error', res.data.msg)
				}
			})
			return contact
		},
		//检索过滤
		createFilter(queryString) {
			return (bank) => {
				return (bank.value.indexOf(queryString.toLowerCase()) === 0)
			}
		}
	}
}

export {
	localMethods,
	contact
}