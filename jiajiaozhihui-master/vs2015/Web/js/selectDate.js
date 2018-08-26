 var months = new Array("一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月","十二月");


isIE = (document.all ? true : false);
/**
function getIEPosX(elt) { return getIEPos(elt,"Left"); }
function getIEPosY(elt) { return getIEPos(elt,"Top"); }
function getIEPos(elt,which) {
 iPos = 0
 while (elt!=null) {
  iPos += elt["offset" + which];
  elt = elt.offsetParent;
 }
 return iPos;
}
*/

function getXBrowserRef(eltname) {
   return (isIE ? document.all[eltname].style : 
			document.layers[eltname]);
}

function hideElement(eltname) {
   getXBrowserRef(eltname).visibility = 'hidden'; 
   window.close();
}


/**
// set the position by the explorer
function moveBy(elt,deltaX,deltaY) {
 if (isIE) {
  elt.left = elt.pixelLeft + deltaX;
  elt.top = elt.pixelTop + deltaY;
 } else {
  elt.left += deltaX;
  elt.top += deltaY;
 }
}
*/
function toggleVisible(eltname) {
 elt = getXBrowserRef(eltname);
 if (elt.visibility == 'visible' || elt.visibility == 'show') {
   elt.visibility = 'hidden';
 } else {
   //fixPosition(eltname);
   elt.visibility = 'visible';
 }
}
/**
function setPosition(elt,positionername,isPlacedUnder) {
 positioner = null;
 if (isIE) {
  var ix=0;
  positioner = document.all[positionername];
  elt.left = getIEPosX(positioner);  
  elt.top = getIEPosY(positioner);
  if (getIEPosX(positioner)+elt.pixelWidth > screen.width)
  {
     elt.left = getIEPosX(positioner) - elt.pixelWidth;  
   }
  if (getIEPosY(positioner)+elt.pixelHeight > screen.height-100){
     elt.top = getIEPosY(positioner) - elt.pixelHeight;
  }


 } else {
  positioner = document.images[positionername];
  elt.left = positioner.x;
  elt.top = positioner.y;
 }
 if (isPlacedUnder) { moveBy(elt,0,positioner.height); }
}
*/

function getDays(month, year) {
  // check if it is special year
  if (1 == month)
      return ((0 == year % 4) && (0 != (year % 100))) ||(0 == year % 400) ? 29 : 28;
  else
      return daysInMonth[month];
 }
        
 function newCalendar(eltName,type) {

    today = new getToday();
	var newCal;
	var parseHours;
    var parseMinutes ;
    var parseYear = parseIntNum(displayYear + '');
	if(type==1){
		parseHours = parseIntNum(displayHours + '');
		parseMinutes = parseIntNum(displayMinutes + '');
	}
	if(type==1){
        newCal = new Date(parseYear,displayMonth,1,parseHours,parseMinutes,0);
	} else {
		newCal = new Date(parseYear,displayMonth,1);
	}
    var day = -1;
    var startDayOfWeek = newCal.getDay();
    if ((today.year == newCal.getFullYear()) &&
        (today.month == newCal.getMonth()))
    {
         day = today.day;
    }
    var intDaysInMonth =
    getDays(newCal.getMonth(), newCal.getFullYear());
    var daysGrid = makeDaysGrid(startDayOfWeek,day,intDaysInMonth,newCal,eltName,type)
    if (isIE) {
        var elt = document.all[eltName];
        elt.innerHTML = daysGrid;
    } else {
        var elt = document.layers[eltName].document;
        elt.open();
        elt.write(daysGrid);
        elt.close();
    }
 }

 function incMonth(delta,eltName,type) {
     displayMonth += delta;
     if (displayMonth >= 12) {
		  displayMonth = 0;
          incYear(1,eltName);
     } else if (displayMonth <= -1) {
         displayMonth = 11;
         incYear(-1,eltName,type);
     }
		 newCalendar(eltName,type);
	     setDay(eltName,type);
     }

function incYear(delta,eltName,type) {
    displayYear = parseIntNum(displayYear + '') + delta;
  	newCalendar(eltName,type);
	setDay(eltName,type);
}
  
function incHours(delta,eltName,type){
    displayHours = parseIntNum(displayHours + '') + delta;
    if (displayHours >= 24) {
      displayHours = 0;
	}else if (displayHours<=-1){
	  displayHours = 23;
	}
      document.all.hour.value=displayHours;
	  setDay(eltName,type);
}

function incMinutes(delta,eltName,type){
    displayMinutes = parseIntNum(displayMinutes + '') + delta;
    if (displayMinutes >= 60) {
      displayMinutes = 0;
	}else if (displayMinutes<=-1){
	  displayMinutes = 59;
	}
	document.all.minute.value=displayMinutes;
	setDay(eltName,type);
}
	
function makeDaysGrid(startDay,day,intDaysInMonth,newCal,eltName,type) {
 var daysGrid;
 var month = newCal.getMonth();
 var year = newCal.getFullYear();
	if (type==1)
	{
 		var hours = newCal.getHours();
	  var minutes = newCal.getMinutes();
	}

 var isThisYear = (year == new Date().getFullYear());
 var isThisMonth = (day > -1)
 //daysGrid = '<font face="courier new, courier" size=2>';
 daysGrid = '<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111">'
	daysGrid += '<tr><td><table border=0 width=300  style="font-size:9pt" bgcolor=#C9DDF1>';
 daysGrid += '<tr><td colspan=4 height=18>';
	daysGrid += '&nbsp;&nbsp;&nbsp;&nbsp;'
	daysGrid += '<a style="cursor:hand" onClick="incYear(-10,\'' + eltName + '\', \'' +type+'\')" ><font size=1>&#9668;&#9668;</font> </a>';
 daysGrid += '<a style="cursor:hand" onClick="incYear(-1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&nbsp;&nbsp;&#9668;</font> </a>';
 daysGrid += '<input type=text id=year size=4  maxlength=4 style="BACKGROUND-color:transparent;border:0;'
	if(isThisYear) daysGrid+='color:red;';
	daysGrid += 'font:10pt;font-weight:bold" value='+ year;
	daysGrid += ' onkeypress=\"return dtp_KeyFilter(\'number\');\" onfocus=\"return dtp_focus(\'year\');\" onblur=\"setYear(\'' +eltName+'\',\'' + type + '\');\">'; 
 daysGrid += '<a style="cursor:hand" onClick="incYear(1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&#9658;</font> </a>';
 daysGrid += '<a style="cursor:hand" onClick="incYear(10,\'' + eltName + '\', \'' +type+'\')"><font size=1>&nbsp;&nbsp;&#9658;&#9658;</font></a>';
 daysGrid += '</td><td colspan=3 align=right valign=top>'
 daysGrid += '<a style="cursor:hand" onClick="incMonth(-1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&#9668;</font> </a>';
	daysGrid += '<select id=month onchange="setMonth(\'' + eltName + '\', \'' +type+'\')" style="font-size:9pt;';
	if(month == new Date().getMonth()&&isThisYear) daysGrid +='color:red;';
	daysGrid +='background-color:#C9DDF1;border: 1px #000000 solid;height:10px;font-weight:bold" >';
	for(i=0;i<months.length;i++){
		daysGrid += '<option value='+i;
		if(i==month){
		  	daysGrid +=' selected '
		}
		daysGrid +='>'+months[i]+'</option>';
	}
	daysGrid += '</select>'
 
	daysGrid += '<a style="cursor:hand" onClick="incMonth(1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&#9658;</font></a>';
 daysGrid += '</td></tr></table><table width=300  style="font-size:9pt" bgcolor=white ><tr>';
 daysGrid += '<td>星期日</td><td>星期一</td><td>星期二</td><td>星期三</td><td>星期四</td><td>星期五</td><td>星期六</td></tr>';
 daysGrid += '</table></td></tr><tr><td><table border=0 width=300 style="font-size:9pt;LINE-HEIGHT: 12px" bgcolor=white>';
	var dayOfMonthOfFirstSunday = (7 - startDay + 1);
 for (var intWeek = 0; intWeek < 6; intWeek++) 
 {
     var dayOfMonth;
     daysGrid +='<tr>'
     for (var intDay = 0; intDay < 7; intDay++) 
	 	{
		  	dayOfMonth = (intWeek * 7) + intDay + dayOfMonthOfFirstSunday - 7;
			  if (dayOfMonth <= 0) {
			   daysGrid += "<td>&nbsp;</td> ";
			  } else if (dayOfMonth <= intDaysInMonth) 	{
   				var color = "black";
			   	if ( day == dayOfMonth) color="red";
   				daysGrid += '<td align=center ';
			    if ( dayOfMonth == displayDay)
				   daysGrid += 'bgcolor = yellow';
			       daysGrid += '><span style="cursor:hand" onClick ="selectDay(';
				   daysGrid += dayOfMonth + ',\'' + eltName + '\', \'' +type+'\')"'
				   daysGrid += 'style="color:' + color + '"/>';
				   var dayString = dayOfMonth + "";
				   if (dayString.length == 5) dayString = '0' + dayString;
     				daysGrid += dayString + '</td>';
 			   }else{
			      daysGrid += "<td>&nbsp;</td> "
       }
	   }
		  daysGrid +='</tr>';
		  if (dayOfMonth < intDaysInMonth) daysGrid += "</tr>";
	 }
	 daysGrid += '</table></td></tr><tr><td><table border=0 width=300 style="font-size:9pt" bgcolor=white>';
	 if (type == 1)
	 {
		  daysGrid += '<tr><td colspan=7 >&nbsp;<a style="cursor:hand" onClick="incHours(-1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&#9668;</font></a>';
		  daysGrid += '&nbsp;&nbsp;'
		  daysGrid += '<input type=text size=2 id=hour maxlength=2 style="border:0;color:red;font:9pt" value='+ hours;
		  daysGrid += ' onkeypress=\"return dtp_KeyFilter(\'number\');\" onfocus=\"return dtp_focus(\'hour\');\" onblur=\"setHours(\'' +eltName+'\',\'' + type + '\');\"></font>';
		  daysGrid +='<a style="cursor:hand" onClick="incHours(1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&nbsp;&#9658;</font></a>时&nbsp;&nbsp;&nbsp;';
		  daysGrid +='<a style="cursor:hand" onClick="incMinutes(-10,\'' + eltName + '\', \'' +type+'\')"><font size=1>&#9668;&#9668;</font></a>';
		  daysGrid +='<a style="cursor:hand" onClick="incMinutes(-1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&nbsp;&nbsp;&nbsp;&#9668;</font></a>';
		  daysGrid +='&nbsp;&nbsp;';
		  daysGrid += '<input type=text size=2  id=minute maxlength=2 style="border:0;color:red;font:9pt" value='+ minutes;
		  daysGrid += ' onkeypress=\"return dtp_KeyFilter(\'number\');\"  onfocus=\"return dtp_focus(\'minute\');\" onblur=\"setMinutes(\'' +eltName+'\',\'' + type + '\');\"></font>';
		  daysGrid +='<a style="cursor:hand"  onClick="incMinutes(1,\'' + eltName + '\', \'' +type+'\')"><font size=1>&nbsp;&#9658;</font></a>'
		  daysGrid +='<a style="cursor:hand" onClick="incMinutes(10,\'' + eltName + '\', \'' +type+'\')"><font size=1>&nbsp;&nbsp;&nbsp;&#9658;&#9658;</font></a>分</td>';
	  }
	  daysGrid +='<tr><td  bgcolor=#C9DDF1 colspan=7 height=24>';
	  daysGrid +='&nbsp;<a style="cursor:hand" onClick="hideElement(\'' + eltName + '\')" onmouseOver=changePic("ok") onmouseOut=returnPic("ok")><span id=ok><img src="tools-button.gif"></span>&nbsp;确定</a>';
	  daysGrid +='&nbsp;&nbsp;&nbsp;<a style="cursor:hand" onClick="clearAll(\'' + eltName + '\')"  onmouseOver=changePic("cancle") onmouseOut=returnPic("cancle")><span id=cancle><img src="tools-button.gif"></span>&nbsp;清空</a>';
	  daysGrid +='&nbsp;&nbsp;&nbsp;<a style="cursor:hand" onClick="cancle(\'' + eltName + '\')"    onmouseOver=changePic("clear") onmouseOut=returnPic("clear") ><span id=clear><img src="tools-button.gif"></span>&nbsp;取消</a></td></tr>';

   return daysGrid + "</table></td></tr></table>";
  }

function changePic(id)
{
	document.all[id].innerHTML='<img src="tools-button2.gif">'
}

function returnPic(id)
{
	document.all[id].innerHTML='<img src="tools-button.gif">'
}

function setHours(eltName,type)
{
	displayHours = parseIntNum(document.all.hour.value);
    if (displayHours >= 24) {
      displayHours = 0;
	 }else if (displayHours<=-1){
	  displayHours = 0;
	 }
     document.all.hour.value=displayHours;
	  setDay(eltName,type);
   
}

function setMinutes(eltName,type)
{
	displayMinutes = parseIntNum(document.all.minute.value);
    if (displayMinutes >= 60) {
      displayMinutes = 59;
	  }else if (displayMinutes<=-1){
	  displayMinutes = 0;
	 }
	document.all.minute.value=displayMinutes;
	setDay(eltName,type);
}

function setYear(eltName,type)
{
  document.all.month.focus();
  displayYear=parseIntNum(document.all.year.value);
  if(displayYear<1600)
	displayYear=1600;
  if(displayYear>3000)
    displayYear=3000;
  newCalendar(eltName,type);   
  setDay(eltName,type);
}

function setMonth(eltName,type)
{   
	 displayMonth=parseIntNum(document.all.month.value);
	 newCalendar(eltName,type);
	 setDay(eltName,type);
}

function selectDay(day,eltName,type)
{
	displayDay = day;
    newCalendar(eltName,type);
 	setDay(eltName,type);
	hideElement(eltName);

}


function setDay(eltName,type)
{

			var strMonthEx=displayMonth + 1;
			var strDayEx=displayDay;
			var strHoursEx;
			var strMinutesEx;
			if (type==1)
			{
	 			strHoursEx=displayHours;
				strMinutesEx=displayMinutes;
			}
			
			if(strMonthEx<10)
			{
	 			strMonthEx="0"+strMonthEx;
			}
			if(strDayEx<10)
			{
				strDayEx="0"+strDayEx;
			}
			if (type == 1)
			{
					if(strHoursEx<10)
					{
						strHoursEx="0"+strHoursEx;
					}
					if(strMinutesEx<10)
					{
						strMinutesEx="0"+strMinutesEx;
					}
 		     }
//			 var args = new Object();
//             args = GetUrlParms();
//             var sId = args["id"];
//            window.dialogArguments.document.getElementById(sId).value=displayYear + "-" + strMonthEx + "-" + strDayEx;; 
  		  	window.dialogArguments.value= displayYear + "-" + strMonthEx + "-" + strDayEx;
			if(type==1){
   			  window.dialogArguments.value += " "+strHoursEx +":"+strMinutesEx ;
			}
}

  function clearAll(eltName)
  {
	  window.dialogArguments.value ="";
	  hideElement(eltName);
	  window.close();
  }

  function cancle(eltName)
  {
	  window.dialogArguments.value =oldValue;
	  hideElement(eltName);
	  window.close();
  }
// fixPosition()  the same as the before one
//
/**
function fixPosition(eltname) {
 elt = getXBrowserRef(eltname);
 positionerImgName = eltname+'Pos';
 // hint: try setting isPlacedUnder to false
isPlacedUnder = false;
 if (isPlacedUnder) {
  setPosition(elt,positionerImgName,true);
 } else {
  setPosition(elt,positionerImgName)
 }
}
*/
function toggleDatePicker(eltName,type) {
   init(eltName,type);
   newCalendar(eltName,type);
   toggleVisible(eltName);
}

//根据目标文本框的值初始化参数的值，画出datetime下拉框。保存文本框的值
function init(eltName,type)
{
    if (displayDivName && displayDivName != eltName) hideElement(displayDivName);
    displayDivName = eltName;
    oldValue = window.dialogArguments.value;
    if(oldValue == "")
	{
	   displayYear = new Date().getFullYear();
	   displayMonth = new Date().getMonth();
	   displayDay =new Date().getDate();;
	   if(type == 1){
	     displayHours = new Date().getHours();
	     displayMinutes = new Date().getMinutes();
	   }
	   setDay(eltName,type);
	} else {
       displayYear =  parseIntNum(oldValue.substring(0,4));
	   if(parseIntNum(oldValue.substring(5,7))==0)
		   displayMonth = parseIntNum(oldValue.substring(6,7))-1;
	   else
           displayMonth = parseIntNum(oldValue.substring(5,7))-1;
	   if(parseIntNum(oldValue.substring(8,10))==0)
	        displayDay = parseIntNum(oldValue.substring(9,10));
	   else
            displayDay = parseIntNum(oldValue.substring(8,10));
	if (type == 1)
	{
	   if(parseIntNum(oldValue.substring(11,13))==0)
	      displayHours = parseIntNum(oldValue.substring(12,13));
	   else
          displayHours = parseIntNum(oldValue.substring(11,13));
	   if(parseIntNum(oldValue.substring(14,16))==0)
	      displayMinutes = parseIntNum(oldValue.substring(15,16));
	   else
		  displayMinutes = parseIntNum(oldValue.substring(14,16));
	}
	}
}

//定义全程变量
  isIE = (document.all ? true : false);
  var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31);
  var displayMonth;
  var displayYear;
  var displayDay;
  var displayHours;
  var displayMinutes;
  var displayDivName;
  var oldValue;
  var today = new getToday();
  function getToday() {
            this.now = new Date();
            this.year = this.now.getFullYear();
            this.month = this.now.getMonth();
            this.day = this.now.getDate();
			this.hours = this.now.getHours();
			this.getMinutes = this.now.getMinutes();
  }


function dtp_KeyFilter(dk_type) {
	var berr=false;
	switch(dk_type)	{
		case 'date':
			if (!(event.keyCode == 45 || event.keyCode == 47 || event.keyCode == 32 || event.keyCode == 58 || (event.keyCode>=48 && event.keyCode<=57)))
				berr=true;
			break;
		case 'number':
			if (!(event.keyCode>=48 && event.keyCode<=57))
				berr=true;
			break;
		case 'cy':
			if (!(event.keyCode == 46 || (event.keyCode>=48 && event.keyCode<=57)))
				berr=true;
			break;
		case 'long':
			if (!(event.keyCode == 45 || (event.keyCode>=48 && event.keyCode<=57)))
				berr=true;
			break;
		case 'double':
			if (!(event.keyCode == 45 || event.keyCode == 46 || (event.keyCode>=48 && event.keyCode<=57)))
				berr=true;
			break;
		default:
			if (event.keyCode == 35 || event.keyCode == 37 || event.keyCode==38)
				berr=true;
	}
	return !berr;
}

//时间字符串转换为整数
function parseIntNum(str)
{
	if(str.charAt(0) == '0' && str.length>1){
		str=str.substring(1,str.length);
	}
	
	return parseInt(str);
}

//弹出窗口函数
function fPopUpCalendarDlg(RaletiveJsurl,sWin,ctrlobj,ptype)
{
	showx = event.screenX; // + deltaX;
	showy = event.screenY; // + deltaY;
    if(ptype == 1){
	  url=RaletiveJsurl+"/datetime.htm";
	  width = 310;
	  height = 225;
	}else{
      url=RaletiveJsurl+"/date.htm";
	  width = 310;
	  height = 205;
    }
	url = url+"?id="+ctrlobj.id;
	if(showx + width >screen.width){
		showx = showx - width;
	}
	if(showy + height + 10 >screen.height){
		showy = showy -height -10;
	}else{
		showy = showy + 10;
	}
    feather = "dialogWidth:"+width+"px; dialogHeight:"+height+"px; dialogLeft:"+showx+"px; dialogTop:"+showy+"px; status:no; directories:yes;scrollbars:no;Resizable:no;"  
    window.showModalDialog(url,sWin,feather );
	//window.open(url);
}

function dtp_focus(df_type) {
	var src=event.srcElement;
	if(src && src.tagName=="INPUT")	{
		switch(df_type)	{
			case 'year':break;
			case 'month':break;
			case 'day':	break;
			case 'hour':	break;
			case 'minute':	break;
			case 'second':	break;
			default:;
		}
		src.select();
	}
	return true;
}

function GetUrlParms()    
{
    var args=new Object();   
    var query=location.search.substring(1);//获取查询串   
    var pairs=query.split("&");//在逗号处断开   
    for(var   i=0;i<pairs.length;i++)   
    {   
        var pos=pairs[i].indexOf('=');//查找name=value   
        if(pos==-1)   continue;//如果没有找到就跳过   
        var argname=pairs[i].substring(0,pos);//提取name   
        var value=pairs[i].substring(pos+1);//提取value   
        args[argname]=unescape(value);//存为属性   
    }
    return args;
}
