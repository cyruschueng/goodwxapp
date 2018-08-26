//+################################################
//    
//# 描述:通用的javascript函数
//# 无为工作室 QQ:542852019
//# author : guozg
//# 方法列表:
//#   1)  init() : 初始化方法
//#   2)  OpenModalDlg(url,iwidth,iHeight) : 打开一个模态窗口
//#   3)  mOvr(src,cssName) : 鼠标进入表格行显示css样式
//#   4)  mOut(src,cssName) : 鼠标进入表格行显示css样式
//#   5)  isNotBlank(ctrlobj,name) : 初始化方法
//#   6)  isDouble(ctrlobj,name) : 初始化方法
//#   7)  numberKeyFilter() : 初始化方法
//#   8)  checkEmail(ctrlobj) : 初始化方法
//#   9)  getDate() : 初始化方法
//#   10)  displayDiv(sDivId,bFlag) : 图层处理

//
//+################################################

function select(id,frame,screen,topscreen)	{			
		if(event.srcElement.id!=("chk"+id) ){
				if(id!=document.all("current").value) {//不是同一行
						document.all("tr"+id).style.backgroundColor='#7895BF';
						var current=document.all("current").value;
						document.all("tr"+current).style.backgroundColor='#E4EEF8';
						document.all("current").value=id;
						if(typeof(screen)!='object') 
								frame.location = screen + "?fid=" + id;
						if(typeof(topscreen) == 'string') {
										parent.topFrame.location.href = topscreen + "?action=11100";
						}
				}
		}else {
				if(id==document.all.current.value){//是同一行
					// document.all("chk"+id).checked=true;
				}
		}
}


//+------------------------------------
// 初始化方法 暂时没有使用
// 例子 
// author : guozg
//-------------------------------------
function init(){
   if(document.all('current')!=null){   
	   document.all("tr"+document.all('current').value).style.backgroundColor='#7895BF';
   }
}

//+------------------------------------
// 打开一个模态窗口
// 例子 OpenModalDlg("test.asp","300","200")
// author : guozg
//-------------------------------------

function OpenModalDlg(url,sWin,iwidth,iHeight)
{
   str ="dialogWidth :"+iwidth+"px;" +"dialogHeight:"+iHeight+"px;status:no;help:no;";
//			if(!bTest){
 //   window.open(url);

			showModalDialog(url,sWin,str);
	//		} else {
	//		}
//   showModelessDialog(url,window,str);
	
}

function OpenModallessDlg(url,sWin,iwidth,iHeight)
{
   str ="dialogWidth :"+iwidth+"px;" +"dialogHeight:"+iHeight+"px;status:no;help:no;";
   showModelessDialog(url,window,str);
	
}

//+------------------------------------
// 鼠标进入表格行显示css样式
// 应用于:<tr class="table-content" onmouseout="mOut(this,'table-Ovr');" onmouseover="mOvr(this,'table-content');" >  
// author : guozg
//-------------------------------------

function mOvr(src,cssName)
{ 
		if(!src.contains(event.fromElement))
		{
 	 
				src.className=cssName;
				src.style.cursor='default';
		}
}
//+------------------------------------
// 鼠标离开表格行显示css样式
// 应用于:<tr class="table-content" onmouseout="mOut(this,'table-Ovr');" onmouseover="mOvr(this,'table-content');" >  
// author : guozg
//-------------------------------------

function mOvrB(src,cssName,objId)
{ 
	 
 if(!src.contains(event.fromElement))
 {
   src.style.cursor='default'; 
			if(!document.getElementById(objId).checked){
    	src.className=cssName;
			}
 }
}  
//+------------------------------------
// 鼠标离开表格行显示css样式
// 应用于:<tr class="table-content" onmouseout="mOut(this,'table-Ovr');" onmouseover="mOvr(this,'table-content');" >  
// author : guozg
//-------------------------------------

function mOut(src,cssName)
{ 
 if(!src.contains(event.toElement))
 {
   src.style.cursor='default'; 
  	src.className=cssName;
 }
} 

//+------------------------------------
// 鼠标离开表格行显示css样式
// 应用于:<tr class="table-content" onmouseout="mOut(this,'table-Ovr');" onmouseover="mOvr(this,'table-content');" >  
// author : guozg
//-------------------------------------

function mOutB(src,cssName,objId)
{ 
 if(!src.contains(event.toElement))
 {
   src.style.cursor='default'; 
			if(!document.getElementById(objId).checked){
    	src.className=cssName;
			}
 }
}  

/* getCheckedBoxValues() 
 * 返回选中的Checkbox的值，用";"隔开
 * @return  如：a;b
 * eg. 
	* author guozg
 */


	function getCheckedBoxValues(){
	  var value=""
   var   tmp = document.getElementsByTagName("input")   
   for(var   i=0;   i<tmp.length;i++){   
     if(tmp[i].type=="checkbox") {   
							if(tmp[i].checked==true){
									if(value ==""){
  									value =tmp[i].value;
									} else {
  									value =value+";"+  tmp[i].value;
									}
							}
     }   
   }
	 	return value;
	}

/* isNotBlank() 
 * 是否为空
 * @return true|false
 * eg. if isNotBlank(from.userName,"用户名")
	* author guozg
 */
function isNotBlank(ctrlobj,name){
		var value1 = ctrlobj.value;
		if (value1==""){
				alert('<'+name+">不能为空！");
				ctrlobj.focus();
				return false;
		}
  //是否为空格
		var b="true";   
		for (i=0;i<value1.length;i++){
				if (value1.charAt(i)!=" "){
 					b="false";
						break;
				}
		}
		if (b=="true"){
				alert('<'+name+">不能为空格！");
				ctrlobj.focus();
				return false;
		}
		return true;
}

/* isDouble() 
 * 是否为数字
 * @return true|false
 * eg. if isDouble(from.userName,"用户名")
	* author guozg
 */
function isDouble(obj,name){
		var value1 = obj.value;
		var count=0;
		for(i=0;i<obj.value.length;i++){
			var ch=obj.value.charAt(i);
			if((ch<'0' || ch>'9') && ch!='.'){
 				alert('<'+name+">只能是数字或是小数点！");
					return false;
			}else if(ch=='.'){
	 			count++;
		 		if(count>1){
			  		alert('<'+name+">只能有一个小数点！");
					  return false;
					}
			}	
		}
		return true;	    
}

String.prototype.trim = function()  {
   return this.replace(/(^\s*)|(\s*$)/g, "");
}


/* numberKeyFilter() 
 * 在数字输入框中限制其他字符的输入(用于onKeypress事件)
 * @return true|false
 * eg. onkeypress="return numberKeyFilter()"
	* author guozg
 */
function numberKeyFilter() {
	 var berr=true;
	 if (!(event.keyCode>=48 && event.keyCode<=57))  berr=false;
 	return berr;
}

 /* checkEmail(str)
  * 判断email格式是否正确，不正确返回false
  * @param pStrEmail 电子邮件地址字符串
  * @return true|false 
  */
function checkEmail(ctrlObj)
{
		var strValue=ctrlObj.value;
		var objRegExp = /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,3}(\.[a-z]{2}){0,2})$/i;
		if(!objRegExp.test(strValue)){
				alert("电子邮件格式不正确！");
				return false;
	 }
 	return true ;
}

 /* getDate()
  * 得到当前日期,如:2003-05-06
  * @return 
  */
function getDate(){
   var date=new Date();
	  var year=date.getYear();
	  var month=date.getMonth()+1;
	  var day=date.getDate();
      if(month<10) month='0'+month;
	  if(day<10) day='0'+day;
	  return (year+'-'+month+'-'+day);
}

 /* displayDiv(sDivId,bFlag)
  * x
  * @param sDivId 图层ID
  * @param sDivId bFlag 是否隐藏
		* @ 修改:改变了原来的处理方式,根据层的显示状态自己判断是否该隐藏 
  * @return 
  */
function displayDiv(sDivId,bFlag){
	  if(bFlag){
   // document.getElementById(sDivId).style.display="block";
			} else {
   // document.getElementById(sDivId).style.display="none";
			}
			if(document.getElementById(sDivId).style.display=="block"){
    document.getElementById(sDivId).style.display="none";
			} else {
    document.getElementById(sDivId).style.display="block";
			}
}



/*
 * 功能：密码校验
 * @param pass1   用户密码 
 * @param pass2   用户校验密码
 * @param minLen  密码最小长度
 * @param maxLen 密码最大长度
 * eg:  onsubmit="return validpassword(form1.password,form1.password1,6,12)"
 */
function validpassword( pass1, pass2,minLen,maxLen ){
		var allValid = true;		
		if( pass1=="" )	{
				alert("请输入密码！");
				return false;
		}

		if( pass2=="" )	{
				alert("请确认密码！");
				return false;
		}
		
		if( pass1.length < minLen )	{
				alert("密码长度至少"+minLen+"个字符！");
				return false;
		}
		if( pass1.length > maxLen )	{
				alert("密码长度最多"+maxLen+"个字符！");
				return false;
		}

		if( pass1.length != pass2.length )	{
				alert("两次输入的密码长度不一致！");
				return false;
		}
		for(i=0;i<pass1.length;i++)	{
				if( pass1.charAt(i) != pass2.charAt(i) ){
						alert("两次输入的密码不一致!");
						allValid = false;
						break;
				}
		}
		return allValid;		
}

/*
 * 功能：界面元素输入控制,主要是对有相同控制属性的元素进行控制。（这个方法一般不用。）
 * @param d_input       元素的name
 * @param d_notnull     元素的value是否可以为空（1:不能为空  0:可以为空）
 * @param d_type        元素的类型
 * @param d_limited      元素的value值的长度是否受控( 1:受控  0:不受控)
 * @param d_low          元素的value值的最小长度
 * @param d_up           元素的value值的最大长度
 * @param d_str           元素的名称
 * eg: 具体的例子可看function InputValid_A(d_input,d_notnull, d_type,d_limited, d_low, d_up,d_str)
 */
function InputValid(d_input,d_notnull, d_type,d_limited, d_low, d_up,d_str)
{
  if(d_notnull==0&&d_input.value==""){
     return true;
  } 
  if ( d_input.length >1 ){
    var obj=d_input;
    var m;
    m=d_input.length;
				m=m.toString();
				for( var i=0; i<m ; i++ )
				{
						if( !InputValid_A( obj[i],d_notnull, d_type,d_limited, d_low, d_up,d_str ) ) {
									return (false);
						}
  	 }
  } else  {
      if ( !InputValid_A( d_input,d_notnull, d_type,d_limited, d_low, d_up,d_str ))
   	  return false;
  }
  return true;
}


/*
 * 功能：界面元素输入控制,这里包括对各种类型的元素进行判断，有int , float , string , date , time ,email ,fax , zip 等等。
 * @param d_input       元素的name
 * @param d_notnull     元素的value是否可以为空（1:不能为空  0:可以为空）
 * @param d_type        元素的类型
 * @param d_limited      元素的value值的长度是否受控( 1:受控  0:不受控)
 * @param d_low          元素的value值的最小长度
 * @param d_up           元素的value值的最大长度
 * @param d_str           元素的名称
 * eg:  InputValid_A(form1.username,1,"string",1,6,25,"用户名")   用户名不能为空,类型是字符串，且长度要受控,在6-25之间
 * eg:  InputValid_A(form1.userold,0,"int",1,1,3,"用户年龄")   用户年龄可以为空，类型是整型，只能输入数字，如果要输入长度只能在1-3之间
 * eg:  InputValid_A(form1.date,0,"int",1,1,3,"用户年龄")   用户年龄可以为空，类型是整型，只能输入数字，如果要输入长度只能在1-3之间
 */
function InputValid_A( d_input,d_notnull, d_type,d_limited, d_low, d_up,d_str )
{
   if(d_notnull==0&&d_input.value==""){
     return true;
   } 

    //不能以空格开头
   if ( d_input.value.charAt(0) == ' ' ){
       alert(d_str+" 输入框不能以空格开头" );
       d_input.focus();
       return (false);
   }
   // not null
   if ( d_notnull==1 && d_input.value.length ==0 ) {
       alert(" 必须输入" + d_str );
       d_input.focus();
       return (false);
   }
    
  	// "int"
			if (d_type=="int")	{
					if ( !isInt(d_input.value))	{
							alert( d_str+ " 只能是数字");
							d_input.focus();
							return (false);
					}
					if  ( d_limited==1 && !(d_low<=d_input.value && d_input.value <= d_up))	{
								alert(d_str+ "的值必须在"+ d_low + " 到 "+ d_up +"之间.");
								d_input.focus();
								return (false);
					}
					return true;
			} 
		// "float"
			if (d_type=="float")	{
						if ( !isFloat(d_input.value))	{
									alert( d_str+" 只能输入数字及小数点" );
									d_input.focus();
									return (false);
						}
						if  ( d_limited==1 && !( d_low <=d_input.value && d_input.value <= d_up))	{
									alert(d_str+ "的值必须在"+ d_low + " 到 "+ d_up +"之间");
									d_input.focus();
									return (false);
						}
						return true;
			}
 		// "string"
			if (d_type=="string")	{
					if  (d_limited==1 && !(d_low<=d_input.value.length && d_input.value.length <= d_up)){
								alert(d_str+ " 的长度必须在 "+ d_low + " 和"+ d_up +" 之间。");
								d_input.focus();
								return (false);
					}
					return (true);
			}    
 		// "date"
			if (d_type=="date"){
							//if ( (!isDate(d_input.value)) || (d_input.value.length != 10) )
					dates = d_input.value.split('-')
					if(dates[1].length==1){
							dates[1] = "0"+dates[1] ;
					}
					if(dates[2].length==1){
							dates[2] = "0"+dates[2] ;
					}
											d_input.value =dates[0] +'-'+dates[1] +'-' +dates[2] ;
					if ( (!isDate(d_input.value)) ){
							alert("请在"+d_str+"处输入如下的日期形式：2000-08-08");
							d_input.focus();
							return (false);
					}	
					return (true);
			}
 		// "time"
			if (d_type=="time"){
					if ( (!isTime(d_input.value)) || (d_input.value.length != 5) )	{
								alert("请在"+d_str+"处输入24小时制时间格式如下:  18:00");
								d_input.focus();
								return (false);
					}	
					return (true);
			}

		// "email"
			if (d_type=="email"){
						if (d_notnull==0 && d_input.value.length==0) return (true);
						if ( !isEmail(d_input.value))	{
									alert("请在 "+d_str+"处输入正确的Email地址。");
									d_input.focus();
									return (false);
 					}	
	  			return (true);
			}

		// "fax"
			if (d_type=="fax")	{
 					if ( !isFax(d_input.value))	{
									alert(d_str+" 只能输入数字和'- '");
									d_input.focus();
									return (false);
						}
						//limit
						if  ( d_limited==1 && !(d_low<=d_input.value.length && d_input.value.length <= d_up))	{
   						alert(d_str+ "的长度只能在 "+ d_low + " 和 "+ d_up +" 之间.");
									d_input.focus();
			  				return (false);
						}
						return true;  
			}

							// auto
			if (d_type=="auto"){
				//limit
				if  ( d_input.value==0 )	{
	 				alert( "请输入 " + d_str );
 					return (false);
				}
				return true;  
			} 
			
		// "zip"
			if (d_type=="zip")	{
  				if ( !isInt(d_input.value) )	{
   					alert(d_str+" 只能是数字");
			   		d_input.focus();
					   return (false);
						}
				if  ( d_limited==1 ){
					if ( (d_low == d_up)&& (d_input.value.length != d_low) ) {
  						alert( d_str+ "的长度只能是 "+ d_low +" 位." );
								d_input.focus();
		  				return (false);
					}	else {
						if ( (d_low < d_input.value.length && d_input.value.length < d_up)) 	{
  						alert(d_str+ "的长度只能在 "+ d_up +" 位以内.");
								d_input.focus();
		  				return (false);
						}
					}
				}
				return true;  
			}

			return (true);
}

/*
 * 功能：是否整型
 * @param d_int   用户密码 
 * eg:  onsubmit="return isInt(form1.NUMs)"
 */

function isInt( d_int)
{
		var checkOK = "0123456789-,";
		var checkStr = d_int;
		var allValid = true;
		var decPoints = 0;
		var allNum = "";
		for (i = 0;  i < checkStr.length;  i++)
		{
			ch = checkStr.charAt(i);
			for (j = 0;  j < checkOK.length;  j++)
			if (ch == checkOK.charAt(j))
			break;
			if (j == checkOK.length)
			{
				allValid = false;
				break;
			}
		if (ch != ",")
			allNum += ch;
		}
		return (allValid)
 }

/*
 * 功能：是否浮点型
 * @param d_int   用户密码 
 * eg:  onsubmit="return isFloat(form1.money)"
 */
function isFloat( d_float)
{
		var checkOK = "0123456789-,.";
		var checkStr = d_float;
		var allValid = true;
		var decPoints = 0;
		var allNum = "";
		for (i = 0;  i < checkStr.length;  i++)
		{
			ch = checkStr.charAt(i);
			for (j = 0;  j < checkOK.length;  j++)
			if (ch == checkOK.charAt(j))
			break;
			if (j == checkOK.length)
			{
				allValid = false;
				break;
			}
			if ( (ch == '-') && (i!=0) )			
			{
				allValid = false;
				break;
			}			
			if (ch != ",")
				allNum += ch;				
			if (ch == ".")
				decPoints += 1;				
		}				
		if ( decPoints > 1 )	{
			allValid = false;
		}
		return (allValid)
}

/*
 * 功能：是否日期型
 * @param d_int   用户密码 
 * eg:  onsubmit="return isDate(form1.money)"
 */
/*
function isDate( d_date)
{		
		var checkStr = d_date;


		for (i = 0;  i < checkStr.length;  i++)
		{
			ch = checkStr.charAt(i);
			if ((i==4) || (i==7)) 
			{
				if ( ch!='-' )
				{
					return (false);
				}
			}
			else
			{
				if (ch<'0' || ch > '9')
				{
					return (false);
				}
				if ( (i==5 && ch>'1')||(i==8 && ch>'3') ) {
   				return (false);
				}
			}									
		}				
		return (true);
}
*/
/*
 * 功能：是否时间型
 * @param d_int   用户密码 
 * eg:  onsubmit="return isTime(form1.time)"
 */

/*
function isTime( d_time)
{		
		var checkStr = d_time;
		var hour1='0';
		var hour2='0';
		for (i = 0;  i < checkStr.length;  i++)
		{
			ch = checkStr.charAt(i);
			if (i==2) 
			{
				if ( ch!=':' )
				{
					return (false);
				}
			}
			else
			{
				if (ch<'0' || ch > '9')
				{
					return (false);
				}
				if ( (i==0 && ch>'2')||(i==3 && ch>'5') ) 
				{
   					return (false);
				}
				if(i==0)
				{
					hour1=ch;
				}
				if(i==1)
				{
					hour2=ch;				
				}
				if((hour1=='2')&&(hour2>'3'))
				{
					return (false);
				}
			}		
							
		}				
		return (true);
}
*/

/*
 * 功能：是否邮件型
 * @param d_int   用户密码 
 * eg:  onsubmit="return isEmail(form1.Email)"
 */
function isEmail( d_email)
{		

		var checkStr = d_email;
		var emailtag = false;
		var emaildot=0
		var emailat=0
		
		if (checkStr.length<7) return (false);
		
		for (i = 0;  i < checkStr.length;  i++)
		{
			ch = checkStr.charAt(i);
			
			if (ch=='@') emailat++;	
			if (ch=='.') emaildot++;	
		}				
		
		if (( emailat==1 ) && ( emaildot>=1 )) 
		{
		   emailtag = true; 
		} 
		return (emailtag);  	
}

/*
 * 功能：是否传真
 * @param d_int   用户密码 
 * eg:  onsubmit="return isEmail(form1.Email)"
 */
function isFax( d_int)
{
		var checkOK = "0123456789 -()";
		var checkStr = d_int;
		var allValid = true;
		var decPoints = 0;
		var allNum = "";

		for (i = 0;  i < checkStr.length;  i++)
		{
			ch = checkStr.charAt(i);
			for (j = 0;  j < checkOK.length;  j++)
			if (ch == checkOK.charAt(j))
			break;
			if (j == checkOK.length)
			{
				allValid = false;
				break;
			}
			if (ch != ",")
			allNum += ch;
		}
		return (allValid)
}

/*
 * 功能：是否为空
 * @param d_int   用户密码 
 * eg:  onsubmit="return isBlank(form1.Email)"
 */
function isBlank(ctrlobj){
		var value1 = ctrlobj.value;
		if (value1==""){		
			return true;
		}
		for (i=0;i<value1.length;i++ ){
			if (value1.charAt(i)!=" "){
						return false;
			}
		}	
		return true;
}

/*
 * 功能：是否数字
 * @param d_int   用户密码 
 * eg:  onsubmit="return isNumber(form1.Email)"
 */
function isNumber(ctrlobj,name){     //必须输入的数字型
	var value1 = ctrlobj.value;
	if (!isNotBlank(ctrlobj,name)){
 		return false;
	}else if (isNaN(value1)){
	 	alert(name+"不能为非数字！");
		 ctrlobj.select();
		 return false;
	}
	return true;
}

/*
 * 功能：是否数字
 * @param d_int   用户密码 
 * eg:  onsubmit="return isNumber(form1.Email)"
 */
function isNumber1(ctrlobj,name){     //不一定要输入，如果输入则必须为数字
	var value1 = ctrlobj.value;
	if (isNaN(value1)){
		alert(name+"不能为非数字！");
		ctrlobj.select();
		return false;
	}
	return true;
}

/*
 * 功能：获取日期字符串
 * @param str   
 * eg: 
 */
function fixDate(str){
  var dates = new Array("","","");
  var k=0;
  for (i=0;i<3;i++){
    for (j=k;j<str.length;j++){
	    if (str.charAt(j)==' '||isNaN(str.charAt(j))) 
						 continue;
     		else break;
   	}
				k=j;
				for (j=k;j<str.length;j++){
						if (parseInt(str.charAt(j))>=0){
								dates[i] = dates[i]+str.charAt(j);
						} else 
							 break;
				}
				k=j+1;
		}
  return dates[0]+"-"+dates[1]+"-"+dates[2];
}

/*
 * 功能：重写日期
 * @param d_int   用户密码 
 * eg:  onsubmit="return isNumber(form1.Email)"
 */
function isTime(str){ 
		var a = str.match(/^(\d{0,2}):(\d{0,2}):(\d{0,2})$/); 
		if (a == null) return false; 
		if (a[1]>=24 || a[2]>=60 || a[3]>=60) return false; 
		return true; 
} 

/*
 * 功能：重写日期
 * @param d_int   用户密码 
 * eg:  onsubmit="return isNumber(form1.Email)"
 */
function isDate(str){ 
		var a = str.match(/^(\d{0,4})-(\d{0,2})-(\d{0,2})$/); 
		if (a == null) return false; 
		if ( a[2]>=13 || a[3]>=32 || a[4]>=24) return false; 
		return true; 
} 

/*
 * 功能：重写日期
 * @param d_int   用户密码 
 * eg:  onsubmit="return isNumber(form1.Email)"
 */
function isDateTime(str){ 
		var a = str.match(/^(\d{0,4})-(\d{0,2})-(\d{0,2}) (\d{0,2}):(\d{0,2}):(\d{0,2})$/); 
		if (a == null) return false; 
		if ( a[2]>=13 || a[3]>=32 || a[4]>=24 || a[5]>=60 || a[6]>=60) return false; 
		return true; 
} 

function validate(obj,type){ 
		var valid; 
		switch(type){ 
		case 1:valid = isDate(text);break; 
		case 2:valid = isTime(text);break; 
		case 3:valid = isDateTime(text);break; 
		default:valid = false; 
		} 
		if(!valid){ 
		} 
} 

/*
 * 功能：重写日期
 * @param d_int   用户密码 
 * eg:  onsubmit="return isNumber(form1.Email)"
 */
function formatDate(objDate){
  var tradetime_to =objDate.value;
		if(objDate.value==""){
		   return;
		}
  tradetime_to = fixDate(tradetime_to);
  tradetime_to = tradetime_to.split("-");
  if (tradetime_to[0].length!=4){
     alert("年份必须为四位数字！");
					objDate.focus();
					objDate.select();
   	 return;
  }else if (parseInt(tradetime_to[0])<1250 || parseInt(tradetime_to[0])>3030){
    alert("年份超出范围！");
					objDate.focus();
					objDate.select();
  	 return;
  }
  if (tradetime_to[1].length<=0){
     alert("月份必须是数字！");
					objDate.focus();
					objDate.select();
	    return;
  }else if (parseInt(tradetime_to[1])>0&&parseInt(tradetime_to[1])<10 && tradetime_to[1].length==1){
     tradetime_to[1] = "0"+tradetime_to[1];
  }else if (parseInt(tradetime_to[1])>12){
     alert("月份超出范围！");
					objDate.focus();
					objDate.select();
	    return;
  }
  if (tradetime_to[2].length<=0){
     alert("日 必须是数字！");
					objDate.focus();
					objDate.select();
	    return;
  }else if (parseInt(tradetime_to[2])>0&&parseInt(tradetime_to[2])<10 && tradetime_to[2].length==1){
     tradetime_to[2] = "0"+tradetime_to[2];
  }else if (parseInt(tradetime_to[2])>31){
     alert("日 超出范围！");
					objDate.focus();
					objDate.select();
	    return;
  }
  objDate.value = tradetime_to[0]+"-"+tradetime_to[1]+"-"+tradetime_to[2];
}




/*
 * 功能：格式化日期
 * @param timeId 
 * eg: 
 */
function formatTime(timeId){
  time = document.getElementById(timeId).value;
  time = getDigit(time);
  time = time.split("-");
  if (time[0]!=""){
     if (isNaN(time[0])){
       alert("输入的时间不是数字！");
    	 	document.getElementById(timeId).select();
       return false;
     }else if (parseInt(time[0])>23){
       alert("小时超出范围！");
     		document.getElementById(timeId).select();
       return false;
     }else if (time[0].length==1){
        time[0]="0"+time[0];
     }else if (time[0].length>2){
        alert("小时超出范围！");
        return false;
     }
  }else{
     time[0] = "00";
  }
  if (time[1]!=""){
     if (isNaN(time[1])){
        alert("输入的时间不是数字！");
      		document.getElementById(timeId).select();
        return false;
     }else if (parseInt(time[1])>59){
        alert("分钟超出范围！");
      		document.getElementById(timeId).select();
        return false;
     }else if (time[1].length==1){
        time[1]="0"+time[1];
     }else if (time[1].length>2){
        alert("分钟超出范围！");
        return false;
     }
  }else{
     time[1]="00";
  }
  if (time[2]!=""){
     if (isNaN(time[2])){
        alert("输入的时间不是数字！");
      		document.getElementById(timeId).select();
        return false;
     }else if (parseInt(time[2])>59){
        alert("秒钟超出范围！");
      		document.getElementById(timeId).select();
        return false;
     }else if (time[2].length==1){
        time[2]="0"+time[2];
     }else if (time[2].length>2){
        alert("秒钟超出范围！");
        return false;
     }
  }else{
     time[2]="00";
  }
  document.getElementById(timeId).value = time[0]+":"+time[1]+":"+time[2];
}


/*
 * 功能：保留两位小数，四舍五入
 * @param timeId 
 * eg: <input onkeyup="javascript:permitFloat(this);">
 */
function formatNum(fNum){
	 var value=0.0;
  if(parseFloat(fNum) == fNum) 
    value = Math.round(fNum * 100) / 100; 	
		return value;
}

/*
 * 功能：保留三位小数，四舍五入
 * @param timeId 
 * eg: <input onkeyup="javascript:permitFloat(this);">
 */
function formatNum3(fNum){
	 var value=0.0;
  if(parseFloat(fNum) == fNum) 
    value = Math.round(fNum * 1000) / 1000; 	
		return value;
}
/*
 * 功能：保留四位小数，四舍五入
 * @param timeId 
 * eg: <input onkeyup="javascript:permitFloat(this);">
 */
function formatNum4(fNum){
	 var value=0.0;
  if(parseFloat(fNum) == fNum) 
    value = Math.round(fNum * 10000) / 10000; 	
		return value;
}

/*
 * 功能：只能输入数字
 * @param timeId 
 * eg: <input onkeyup="javascript:permitFloat(this);">
 */
function permitFloat(objTR)
{

  objTR.value=objTR.value.replace(/[^+\-0-9.]/g,'');
		var value =objTR.value; 

		if( value.lastIndexOf("-") > 0){
		   value = value.substring(0,(value.length-1));
		}
		if(value.lastIndexOf("+") >0){
		   value = value.substring(0,(value.length-1));
		}
		if(value.indexOf(".") != value.lastIndexOf(".")){ // 输入小数点两次
		   value = value.substring(0,(value.length-1));
		} else if(value.indexOf(".")>0 && value.indexOf(".") == value.lastIndexOf(".")){ // 输入小数点一次
  		if(value.indexOf(".") != value.length-1) { // 如果最后一位不是小数点处理
						if(value.length-value.indexOf(".")>=3){

					   	value = formatNum(value);
						}
		  }  
		} 
		objTR.value = value ;

}
/*
 * 功能：只能输入数字
 * @param timeId 
 * eg: <input onkeyup="javascript:permitMaxFloat(this,100);">
 */
function permitMaxFloat(objTR,fMax)
{
		//objTR.value=objTR.value.replace(/[^[[+-]+\d+\.\d]]/g,'');
		//objTR.value=objTR.value.replace(/[^\d]/g,'');
  objTR.value=objTR.value.replace(/[^+\-0-9.]/g,'');
		var value =objTR.value; 
		if( value.lastIndexOf("-") > 0){
		   value = value.substring(0,(value.length-1));
		}
		if(value.lastIndexOf("+") >0){
		   value = value.substring(0,(value.length-1));
		}
		if(value.indexOf(".") != value.lastIndexOf(".")){ // 输入小数点两次
		   value = value.substring(0,(value.length-1));
		} else if(value.indexOf(".")>0 && value.indexOf(".") == value.lastIndexOf(".")){ // 输入小数点一次
  		if(value.indexOf(".") != value.length-1) { // 如果最后一位不是小数点处理
						if(value.length-value.indexOf(".")>=4){
   		   	value = formatNum3(value);
						}
						if(parseFloat(fMax)<parseFloat(value)){ //判断范围
							alert("不能超过取值范围："+fMax);
							value ="0";
							objTR.select();						
						}
		  }  
		} else {
						if(parseFloat(fMax)<parseFloat(value)){ //判断范围
							alert("不能超过取值范围："+fMax);
							value ="0";
							objTR.select();						
						}
		} 
		objTR.value = value ;
}

/*
 * 功能：允许整型
 * @param timeId 
 * eg: <input onkeyup="javascript:permitInt(this);">
 */
function permitInt(objTR)
{
		objTR.value=objTR.value.replace(/[^\-0-9]/g,'');
		var value =objTR.value; 
		if( value.lastIndexOf("-") > 0){
		   value = value.substring(0,(value.length-1));
		}
		objTR.value = value ;
}
/*
 * 功能：判断邮件格式
 * @param timeId 
 * eg: <input onBlur="javascript:permitEMail(this);">
 */
function permitEMail(objTR)
{
	  if(objTR.value!=""){
					if(!isEmail(objTR.value)) {
								alert("邮箱格式错误!")
								objTR.focus();
								objTR.select();
					}
			}
}

/*
 * 功能：判断允许的日期格式
 * @param timeId 
 * eg: <input onBlur="javascript:permitDate(this);">
 */
function permitDate(objTR)
{
   formatDate(objTR)
}

/*
 * 功能：判断允许的日期格式
 * @param timeId 
 * eg: <input onBlur="javascript:permitDate(this);">
 */
function permitDate(objDate,type)
{
		var text = objDate.value;
		if(text==""){
		   return;
		}
		var valid = false;
		var strMsg ="";
		switch(type){ 
				case 1:
					strMsg="日期格式不对!\n标准格式如:2008-01-01 10:00";
					valid = isDateTime(text);break; 
				case 2:
					strMsg="日期格式不对!\n标准格式如:2008-01-01";
					valid = isDate(text);break; 
				case 3:
					strMsg="日期格式不对!\n标准格式如:10:00:00";
					valid = isTime(text);break; 
    default:
					strMsg="日期格式不对!\n标准格式如:2008-01-01";
					valid = isDate(text);break; 
		} 
		if(!valid){
			 alert(strMsg);
				objDate.focus();
		}
}

/*
 * 功能：只能输入中文
 * @param timeId 
 * eg: <input onkeyup="javascript:permitChinese(this);">
 */
function permitChinese(obj)
{
		obj.value=obj.value.replace(/[^\u4E00-\u9FA5]/g,'');
}

/*
 * 功能：只能输入全角字符
 * @param timeId 
 * eg: <input onkeyup="javascript:permitSBC(this);">
 */
function permitSBC(obj)
{
		obj.value=obj.value.replace(/[^\uFF00-\uFFFF]/g,'','');
}

/*
 * 功能：入数字和英文
 * @param timeId 
 * eg: <input onkeyup="javascript:permitNumAndEnglist(this);">
 */
function permitNumAndEnglist(obj)
{
		obj.value=obj.value.replace(/[\W]/g,'');
}

/*
 * 功能：没有权限操作提示
 * @param timeId 
 * 
 */
function showNoPermInfo()
{
		alert("温馨提示：对不起，您没有权限做该项操作！\n如有需要，请和系统管理员联系！");
}

/*
 * 功能：显示提示信息
 * @param timeId 
 * 
 */
function showMsgInfo(sMsg)
{
		alert(sMsg);
}

