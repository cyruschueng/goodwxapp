var ZHHY = {}
;(function(){
	this.index = {
		checkRole: function(vm){
			var userRole = window.localStorage.getItem('zhhy_user_role') || 0
			if(userRole === 0){
		      commom.msg('网络出错')
		    }else{
		      if(userRole == 1){
		        vm.$router.push({name: 'seller_yssp'})
		      }else if(userRole == 2){
		        vm.$router.push({name: 'seller_smrz_index'})            
		      }else if(userRole == 3){
		        vm.$router.push({name: 'seller_jylb'})
		      }else if(userRole == 4){
		        vm.$router.push({name: 'seller_twsm'})
		      }
		    }
		}
	}
	this.smrz = {
	  inputOn: function(event){
	  	$(event.target).parent().parent().addClass('active')
	  },
	  inputOff: function(event){
	  	$(event.target).parent().parent().removeClass('active')
	  },
	  saveType: function(vm){
	  	if(vm.choseList.length > 0){
	  		commom.getDataList('ysh/UpdateUserManage', {User_id: vm.userID, ManageType: vm.choseNames.join(',')}, function(d){
	  			vm.$store.commit('storeSmrzData', {
			        name: vm.$store.state.smrzData.name,
			        ads: vm.$store.state.smrzData.ads,
			        person: vm.$store.state.smrzData.person,
			        phone: vm.$store.state.smrzData.phone,
			        service: vm.$store.state.smrzData.service,
			        serviceName: vm.$store.state.smrzData.serviceName,
			        typeIDs: vm.choseList.join(','),
			        types: vm.choseNames.join(',')
		      	})
		    	vm.$router.push({name: 'seller_smrz_index'})
		  	})
	  	}else{
	  		commom.msg('请选择类型')
	  	}    
	  },
	  getUserByOpenID: function(vm){
	  	commom.getDataList('ysh/CountUserStatus', {openid: vm.openID}, function(ret){
	      if(ret.aaData.length > 0){
	        vm.rzStatu = ret.aaData[0].Status
	        if(vm.rzStatu === 0){
	          commom.getDataList('ysh/GetUserInfoByOpeid', {openid: vm.openID}, function(data){
	            if(data.aaData.length > 0){
	              var info = data.aaData[0]
	              vm.name = info.UserName
	              vm.ads = info.Address
	              vm.person = info.LiablePerson
	              vm.phone = info.PhoneNum
	              vm.service = info.ServicePhoneNum
	              vm.serviceName = info.ServicePerson
	              vm.types = info.ManageType
	            }
	          })
	        }
	      }
	    })
	  },
	  getVali: function(vm){
	  	$.ajax({
		    url: config.apiURL + 'ysh/getSesskey',
		    type: 'GET',
		    success: function(ret){
		      if(ret && ret.status === 0){
		        vm.valiImg = config.apiURL + 'captchapng?sesskey=' + ret.aaData[0].sesskey + '&time=' + Date.parse(new Date())
		      }
		    },
		    error: function(d){
		      console.log(d)
		    }
	  	})
	  },
	  showType: function(vm){
	  	vm.$store.commit('storeSmrzData', {
	    	name: vm.name,
	        ads: vm.ads,
	        person: vm.person,
	        phone: vm.phone,
	        service: vm.service,
	        serviceName: vm.serviceName,
	        typeIDs: vm.typeIDs,
	        types: vm.types
	  	})
	  	vm.$router.push({name: 'type'})
	  },
	  submit: function(vm){
	  	if(vm.name.length <= 0 || vm.ads.length <= 0 || vm.types.length <= 0 || vm.types === '经营范围(必选)' || vm.person.length <= 0 || vm.phone.length <= 0){
	        commom.msg('请填写完整信息')
      	}else{
	        commom.getDataList('ysh/CountUserCaptchas', {
	          Captchas: vm.valinum
	        }, function(d){
	          if(d.aaData && d.aaData.length > 0 && d.aaData[0].totals === 1){            
	              if(vm.rzStatu === 0){
	                commom.msg('正在审核中')
	              }else if(vm.rzStatu == -1){
	                commom.getDataList('ysh/AddUserPromise', {
	                  UserName: vm.name,
	                  Address: vm.ads,
	                  RoleType: vm.types,
	                  LiablePerson: vm.person,
	                  PhoneNum: vm.phone,
	                  ServicePhoneNum: vm.service,
	                  openid: vm.openID,
	                  ServicePerson: vm.serviceName,
	                  SellerOrBuyer: 1
	                }, function(d){
	                  commom.getDataList('wxsendmsg', {
	                    env: 1,
	                    userid: vm.userID
	                  }, function(d){
	                    commom.msg('提交成功')
	                    vm.rzStatu = 0
	                  })             
	                })
	              }                        
	          }else{
	            commom.msg('验证码错误')
	          }
	        })
      	}
	  }
	}  
}).apply(ZHHY)