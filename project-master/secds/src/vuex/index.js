import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cookie from 'js-cookie'
import router from '../router'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		userinfo:[],
		user_name:'',
		draftdata:[]
	},
	mutations:{
		SET_USER_INFO:(state, {data, name})=>{
			state.userinfo = data
			state.user_name = name
		},
		SET_DRAFT_INFO:(state, {data})=>{
			state.draftdata = data
		}
	},
	actions:{
		//获取用户信息
		GET_USER_INFO:function({commit, dispatch}){
			/*console.log(context)
			context={
				commit:'',
				dispatch:'',
				getters:''
			}*/
			
			let user=[]
			axios.get(`${_const.host}/secds/users/user`,{
				headers:{
					token:cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					commit({
						type:'SET_USER_INFO',
						data:res.data.data[0],
						name:res.data.data[0].user_name
					})
					cookie.set('userinfo', res.data.data[0])
					cookie.set('user_account', res.data.data[0].user_account)
				} else if (res.data.code==='TOKEN_INVLID') {
					dispatch('GET_TOKEN',{
						which:'GET_USER_INFO'
					})
				} else {
					console.log(res.data.msg)
				}
			}).catch(err=>console.log(err))
		},
		//获取票据信息
		GET_DRAFT_INFO:function({commit, dispatch}){
			axios.get(`${_const.host}/secds/drafts/${cookie.get('id')}`,{
				headers:{
					token:cookie.get('token')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					commit({
						type:'SET_DRAFT_INFO',
						data:res.data.data[0]
					})
				} else if (res.data.code==='TOKEN_INVLID') {
					dispatch('GET_TOKEN',{
						which:'GET_DRAFT_INFO'
					})
				} else {
					console.log(res.data.msg)
				}
			})
		},
		//换取token
		GET_TOKEN:function({dispatch}, {which}){
			axios.get(`${_const.host}/secds/users/token`,{
				headers:{
					swap:cookie.get('swap')
				}
			}).then(res=>{
				if (res.data.code==='OK') {
					cookie.set('token', res.data.token)
					// console.log(which)
					dispatch(which)
				} else if (res.data.code=='USER_UNAUTHORIZED') {
					cookie.remove('swap')
					cookie.remove('token')
					cookie.remove('userinfo')
					cookie.remove('user_id')
					cookie.remove('id')
					setTimeout(()=>router.push('/'),600)
				} else {
					console.log(res.data.msg)
				}
			}).catch(err=>console.log(err))
		}
	},
	getters:{}
})

export default store
