
function emcShowSelectDept(ObjText,ObjValue) {
 theObjectText=document.all.item("ctl00_PageBody_"+ObjText);
 
 var chasm = screen.availWidth;
var mount = screen.availHeight;

var w = 300;
var h = 300;
 
var absleft = (chasm - w - 10) * 0.5;
var abstop=(mount - h - 30) * 0.5;
    window.open('/emc/common/SelectDept.aspx?ObjText='+ObjText+'&ObjValue='+ObjValue,'selectdept','height='+h+', width='+w+', top='+abstop+',left='+absleft+', toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no');
   
}
 function emcShowSelectEmployee(ObjText,ObjValue) {
 theObjectText=document.all.item("ctl00_PageBody_"+ObjText);
 
 var chasm = screen.availWidth;
var mount = screen.availHeight;

var w = 300;
var h = 300;

var absleft = (chasm - w - 10) * 0.5;
var abstop=(mount - h - 30) * 0.5;
    window.open('/emc/common/SelectEmployee.aspx?ObjText='+ObjText+'&ObjValue='+ObjValue,'selectdept','height='+h+', width='+w+', top='+abstop+',left='+absleft+', toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no');
   
}


function GetemcElmLeft(theObject) {
		var absLeft = 0; 
		var thePosition=""; 
		var tmpObject = theObject; 
		while (tmpObject != null)
		{ 
			thePosition = tmpObject.position; 
			tmpObject.position = "static"; 
			absLeft += tmpObject.offsetLeft; 
			tmpObject.position = thePosition; 
			tmpObject = tmpObject.offsetParent; 
		} 
		return absLeft; 
}

  function GetemcElmTop(theObject)
	{
		var absTop = 0; 
		var thePosition = ""; 
		var tmpObject = theObject; 
		while (tmpObject != null)
		{ 
			thePosition = tmpObject.position; 
			tmpObject.position = "static"; 
			absTop += tmpObject.offsetTop; 
			tmpObject.position = thePosition; 
			tmpObject = tmpObject.offsetParent;
		} 
		return absTop + theObject.offsetHeight; 
	} 