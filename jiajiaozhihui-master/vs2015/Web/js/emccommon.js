
function emcShowSelectDept(ObjText,ObjValue) {
   ShowIframe('部门选择', '/emc/common/SelectDept.aspx?ObjText=' + ObjText + '&ObjValue=' + ObjValue, '600', '350')
}

function emcShowSelectCDept(ObjText,ObjValue) {
 ShowIframe('部门选择', '/emc/common/SelectCDept.aspx?ObjText=' + ObjText + '&ObjValue=' + ObjValue, '600', '350')
}


 function emcShowSelectEmployee(ObjText,ObjValue) {
     ShowIframe('人员选择', '/emc/common/SelectEmployee.aspx?ObjText=' + ObjText + '&ObjValue=' + ObjValue, '600', '350')
}

 function emcShowSelectCEmployee(ObjText,ObjValue) {
    ShowIframe('人员选择', '/emc/common/SelectCEmployee.aspx?ObjText=' + ObjText + '&ObjValue=' + ObjValue, '600', '350')
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
	
