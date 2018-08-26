function valid(type){
	
	
	switch(type){
	  case "phone":reg=/^[0-9_-]{7,11}$/;break; //联系电话  
	  case "tel":reg=/^1[0-9][0-9]\d{8}$/;break;  //手机号码      
	  case "password":reg=/^[^\s].{4,14}[^\s]$/;break;//密码
	  case "msgCode":reg=/.{6}/;break;//验证码
	  case "inviteCode":reg=/.*/;break;//邀请码
	  case "email":reg=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;break;//邮箱
	  case "idCard":reg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$|^[0-9a-zA-Z()\/]{7,}$/;break;//身份证号码
	  case "commonInput":reg=/^.{0,20}$/;break;//20个字符以内
	  case "*":reg=/.*/;break;
	  default:reg=/.*/;     
	}		
}

module.exports = {
  valid: valid
}