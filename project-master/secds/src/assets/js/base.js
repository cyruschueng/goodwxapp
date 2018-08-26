export default{
	install(Vue, options){
		/**
		 * 获取短信验证码
		 * @param  {string} picode  图片验证码
		 * @param  {string} user_id 手机号
		 */
		Vue.prototype.captcha = (picode, user_id) => {
			this.axios.get(`${_const.host}/secds/users/captcha/sms`,{
				params:{
					captcha:picode,
					user_id:user_id
				}
			}).then(res=>{
				if (res.data.code==='') {
					this.$message.error({message:'发送成功', duration:2000})
				} else {
					this.$message({type:'success', message:res.data.msg, duration:2000})
				}
			})
		}

		/**
		 * 获取图片验证码
		 * @param  {string} user_id 手机号
		 * @param  {string} base    base前缀
		 * @param  {string} src     base码
		 */
		Vue.prototype.captchaPic = (user_id, base, src) => {
			this.axios.get(`${_const.host}/secds/users/captcha/pic`,{
				params:{
					user_id:user_id
				}
			}).then(res=>{
				if (res.data.code!=='OK') {
					this.$message.error({message:res.data.msg, duration:2000})
				} else if (res.data.code=='CAPTCHA_INVALID') {
					this.$message.error({message:'图片验证码已过期,请点击图片刷新后重新填写', duration:2000})
					this.captchaPic()
				} else {
					src=`${base}${res.data.data}`
				}
			}).catch(error=>console.log(error))
		}

		//错误提示
		Vue.prototype.usertip= (err, msg) => {
			if (err) {
				this.$message.error({message: msg, duration:2000})
			} else {
				this.$message({type:'success', message: msg, duration:2000})
			}
		}
	}
}