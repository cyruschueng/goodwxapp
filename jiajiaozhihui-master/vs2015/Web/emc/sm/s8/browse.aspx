<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.s8.browse" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
 
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
        <tr>
            <td id="frmTitle" align="center" nowrap="nowrap" style="border-right: #c7c5d9 1px solid;
                border-top: #c7c5d9 1px solid; border-left: #c7c5d9 1px solid; border-bottom: #c7c5d9 1px solid;
                height: 455px" valign="middle">
                <iframe id="IFRAME1" frameborder="0" name="leftbody" scrolling="no" src="funtree.aspx?state=browse"
                    style="z-index: 2; width: 160px; height: 100%"></iframe>
            </td>
            <td class="navPoint" style="width: 10pt; height: 455px" title="关闭/打开左栏" width="10">
                <table align="right" border="0" cellpadding="0" cellspacing="0" height="100%" width="11">
                    <tr>
                        <td align="right" valign="middle">
                            <img id="menuimg" alt="隐藏左栏" border="0" height="76" onclick="javascript:switchSysBar()"
                                src='<%=Page.ResolveClientUrl("~/images/Menu/close.gif")%>' style="cursor: hand"
                                width="11" /></td>
                    </tr>
                </table>
            </td>
            <td style="border-right: #c7c5d9 1px solid; border-top: #c7c5d9 1px solid; border-left: #c7c5d9 1px solid;
                width: 100%; border-bottom: #c7c5d9 1px solid; height: 455px">
                <iframe frameborder="0" name="mainbody" scrolling="auto" src="" style="z-index: 1;
                    width: 100%; height: 100%"></iframe>
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
</asp:Content>
