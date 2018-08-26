<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    Codebehind="browse.aspx.cs" Inherits="SfSoft.web.emc.hrm.group.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language="javascript" >
  function addNext_onClick() 
  {
       var hfdeptid = document.getElementById("DeptID");
        DeptID=hfdeptid.value;
        if (DeptID=="") {
          alert("请选中要增加下级的部门");
          return;
        }        
        mainbody.location="update.aspx?state=addNext&DeptID="+DeptID;
  }
 
  function addCur_onClick() 
  {
       var hfdeptid = document.getElementById("DeptID");
        DeptID=hfdeptid.value;
        if (DeptID=="") {
           DeptID="0";
        }
        mainbody.location="update.aspx?state=addCur&DeptID="+DeptID;
  }
  function delete_onClick() 
  {
       var hfdeptid = document.getElementById("DeptID");
       if (hfdeptid.value==""){
          alert("没有选择要删除的部门");
          return false;
       }
        DeptID=hfdeptid.value;
        mainbody.location="update.aspx?state=delete&DeptID="+DeptID;
  }
  
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%" align="center">
<tr>
    <td id="frmTitle"    nowrap valign="middle" align="center"   style="border-right: 1px solid #C7C5D9;border-top: 1px solid #C7C5D9;border-bottom: 1px solid #C7C5D9;border-left: 1px solid #C7C5D9; height: 455px;"> 
	<Iframe  name="leftbody" 	style="HEIGHT: 100%; WIDTH: 180px; Z-INDEX: 2" 	scrolling=no frameborder=0 src="depttree.aspx?state=browse" id="IFRAME1" ></Iframe>
</td>
    <td style="width:10pt; height: 455px;" width="10"  title="关闭/打开左栏" class="navPoint"> 

	  
	<table border="0" cellpadding="0" cellspacing="0" width="11" height="100%" align="right">
		<tr>
			<td valign="middle" align="right" ><img border="0" src="<%=Page.ResolveClientUrl("~/images/Menu/close.gif")%>" id="menuimg" alt="隐藏左栏"  onclick="javascript:switchSysBar()" style="cursor: hand" width="11" height="76"></td>
		</tr>
	</table>

			  
    </td>
    <td style="width:100%; height:455px;border-top: 1px solid #C7C5D9;border-bottom: 1px solid #C7C5D9;border-left: 1px solid #C7C5D9;border-right: 1px solid #C7C5D9;">
	<Iframe src="" name="mainbody" style="HEIGHT: 100%;   WIDTH: 100%; Z-INDEX: 1" scrolling="auto" frameborder="0"></Iframe>
</td>
  </tr>
</table>
<script language="JavaScript">

function switchSysBar(){

 	if (document.all("frmTitle").style.display=="none") {
		document.all("frmTitle").style.display=""
		document.all("menuimg").src="../../../images/Menu/close.gif";
		document.all("menuimg").alt="隐藏左栏";
		}
	else {
		document.all("frmTitle").style.display="none"
		document.all("menuimg").src="../../../images/Menu/open.gif";
		document.all("menuimg").alt="开启左栏";
	 }
	 
	 

}

  


 
 
</script>

    <input id="DeptID" type="hidden" value=""/>
</asp:Content>
