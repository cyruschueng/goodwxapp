
function getDigit(str,type){
  var dates;
  var k=0;
  if(type==1)
  {
    dates = new Array("","","","","","");
  } else {
    dates = new Array("","","");
  }
  for (i=0;i<dates.length;i++){
    for (j=k;j<str.length;j++){
    if (str.charAt(j)==' '||isNaN(str.charAt(j)))  continue;
    else break;
  }
  k=j;
  for (j=k;j<str.length;j++){
      //if (str.charAt(j)==' ')  continue;  //去除前面的空格
  if (parseInt(str.charAt(j))>=0){
     dates[i] = dates[i]+str.charAt(j);
  }else break;   
    }
    k=j+1;
  }
  if (type == 1)
 	 return dates[0]+"-"+dates[1]+"-"+dates[2]+"-"+dates[3]+"-"+dates[4]+"-"+dates[5];
  else 
     return dates[0]+"-"+dates[1]+"-"+dates[2];  
}

function reWriteDate(time,type){
	
  var tradetime_to = document.getElementById(time).value;

	if(type==3){
     if(tradetime_to.length>0 && tradetime_to.length<=11)
		 type=2;
	 else 
		 type=1;
  }
  
  tradetime_to = getDigit(tradetime_to,type);
  tradetime_to = tradetime_to.split("-");
  //year
  if (tradetime_to[0].length!=4){
     //alert("年份必须为四位数字！");
	 tradetime_to[0] = new Date().getFullYear();
   }else if (parseInt(tradetime_to[0])<1850){
    // alert("年份超出范围！");
   	 tradetime_to[0] = 1850;
  }else if (parseInt(tradetime_to[0])>2030){
     tradetime_to[0] = 2030;
  }
//month
  if (tradetime_to[1].length<=0 || tradetime_to[1].length>2){
     //alert("月份必须是数字！");
	 tradetime_to[1] = (parseInt(new Date().getMonth())+1).toString();
  }
  if( tradetime_to[1] == '0'){
     tradetime_to[1] = "01";
  }
  var tempmonth = parseInt(tradetime_to[1])-1;
  if (parseInt(tradetime_to[1])==0 && tradetime_to[1].length==2){
      tempmonth = parseInt(tradetime_to[1].substring(1,2))-1;
  }
 
  if (parseInt(tradetime_to[1])>0&&parseInt(tradetime_to[1])<10 && tradetime_to[1].length==1){
	  tradetime_to[1] = "0"+tradetime_to[1];
  }else if (parseInt(tradetime_to[1])>12){
     //alert("月份超出范围！");
	 tradetime_to[1] = "01";
	 tempmonth = 0;
   }

//day
  if (tradetime_to[2].length<=0 || tradetime_to[2].length>2){
     //alert("日 必须是数字！");
	 tradetime_to[2] = parseInt(new Date().getDate()).toString();
  }
    if( tradetime_to[2] == '0'){
     tradetime_to[2] = "01";
  }  
  var tempyear = parseInt(tradetime_to[0]);
  if (parseInt(tradetime_to[2])>0&&parseInt(tradetime_to[2])<10 && tradetime_to[2].length==1){
     tradetime_to[2] = "0"+tradetime_to[2];
  } else if (parseInt(tradetime_to[2])>daysInMonth[tempmonth]){
	  if ((((0 == tempyear % 4) && (0 != (tempyear % 100))) ||(0 == tempyear % 400)) && 
	                                 tradetime_to[1] == "02" && parseInt(tradetime_to[2])== 29)
  {
	  tradetime_to[2] = "29";
  }else 
	 //alert("日 超出范围！");
     tradetime_to[2] = "01";
  }
 
  if (type==1)
  {
 //hour
    if (tradetime_to[3].length<=0 || tradetime_to[3].length>2){
    // alert("小时必须为数字！");
	 tradetime_to[3] = (new Date().getHours()).toString();
	}
    if (parseInt(tradetime_to[3])>0&&parseInt(tradetime_to[3])<10 && tradetime_to[3].length==1){
     tradetime_to[3] = "0"+tradetime_to[3];
  }else if (parseInt(tradetime_to[3])>23){
    // alert("小时超出范围！");
     tradetime_to[3] = "00";
  }

//minute
  if (tradetime_to[4].length<=0 || tradetime_to[4].length>2){
    // alert("分钟必须是数字！");  
	 tradetime_to[4] = (new Date().getMinutes()).toString();
  }
   if (parseInt(tradetime_to[4])>0&&parseInt(tradetime_to[4])<10 && tradetime_to[4].length==1){
     tradetime_to[4] = "0"+tradetime_to[4];
  }else if (parseInt(tradetime_to[4])>59){
    // alert("分钟超出范围！");
	  tradetime_to[4] = "00";
  }

  //second
   tradetime_to[5] = "00";
 
 }
  document.getElementById(time).value = tradetime_to[0]+"-"+tradetime_to[1]+"-"+tradetime_to[2];
  if(type == 1)
  document.getElementById(time).value += " "+tradetime_to[3]+":"+tradetime_to[4]+":"+tradetime_to[5];
}

function getType(id){
	var str=document.all[id].value;
   if(str.length && str.length<=11)
	   return 2;
   else
	   return 1;

}
