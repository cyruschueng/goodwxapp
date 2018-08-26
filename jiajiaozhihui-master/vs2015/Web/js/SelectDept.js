var boolDeptPadExist=false;
function ShowDept(objID) {
  if(!boolDeptPadExist)
	 {
	     CreateDeptPad(objID);
	 }
}
function CreateDeptPad(objID) {
        boolDeptPadExist=true;
        var ID=objID
        var Shadow = "#666666";
	    var Alpha = "100";
	    var Width = 170; 
	    var Height = 200; 
		var DeptPadHTML = "";
		DeptPadHTML += " <div id=\"" + ID + "_DeptPad\" style=\"Z-INDEX: 201; POSITION: absolute;top:-100;left:-100;"; 
		if(Shadow != "")
		{
			DeptPadHTML += "FILTER:progid:DXImageTransform.Microsoft.Shadow(direction=135,color=" + Shadow + ",strength=3);";
		}
		if(Alpha != "100" && Alpha != "")
		{
			DeptPadHTML += "FILTER: progid:DXImageTransform.Microsoft.Alpha( style=0,opacity=" + Alpha + ");";
		}
		DeptPadHTML += " \">";
		DeptPadHTML += " <iframe frameborder=0 width=\"" + (Width+2).toString() + "\" height=\"" + (Height+2).toString() + "\"></iframe>";
 
		DeptPadHTML += " <div id=\"" + ID + "_TreeView\"></div>"; 
 
		DeptPadHTML += "</div>"; 
		document.body.insertAdjacentHTML("beforeEnd", DeptPadHTML);
  
		theDeptObject = document.all.item(ID + "_DeptPad"); 
		theDeptObject.style.position = "absolute"; 
		 this.Source=document.all.item("ctl00_PageBody_"+objID);
		theDeptObject.style.posLeft = GetDeptPadLeft(this.Source); 
		theDeptObject.style.posTop = GetDeptPadTop(this.Source); 
		 
}

function GetDeptPadLeft(theObject) {
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

  function GetDeptPadTop(theObject)
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
		return absTop + this.Source.offsetHeight; 
	} 

function HiddenDeptPad(objID) {
            var ID=objID;
            theDeptPadObject = document.all.item(ID + "_DeptPad");
			theDeptPadObject.outerHTML = ""; 
			boolDeptPadExist = false;
}