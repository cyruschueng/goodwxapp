<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="SelectEmployee.aspx.cs" Inherits="SfSoft.web.emc.common.SelectEmployee" Title="人员选择" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language ="javascript" >
   function SelectDept(ObjValue,ObjText,HfObjText,HfObjValue) {
      if (HfObjText!="") {
       var   theObjectText = parent.document.getElementById("ctl00_PageBody_" + HfObjText);
      theObjectText.value=ObjText;
      }
      if (HfObjValue) {
      var    theObjectValue = parent.document.getElementById("ctl00_PageBody_" + HfObjValue);
      theObjectValue.value=ObjValue;
      }
      parent.ClosePop();
   }
</script>
    <asp:TreeView ID="EmpTreeView" runat="server" ExpandDepth="1" SkinID ="GroupEmp">
    </asp:TreeView>
    <asp:HiddenField ID="HfObjValue" runat="server" />
    <asp:HiddenField ID="HfObjText" runat="server" />
</asp:Content>
