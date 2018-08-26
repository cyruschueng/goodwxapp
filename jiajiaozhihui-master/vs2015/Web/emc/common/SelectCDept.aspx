<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="SelectCDept.aspx.cs" Inherits="SfSoft.web.emc.common.SelectCDept" Title="公司部门选择" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language ="javascript" >
   function SelectDept(ObjValue,ObjText,HfObjText,HfObjValue) {
      if (HfObjText!="") {
          theObjectText = parent.document.getElementById("ctl00_PageBody_" + HfObjText);
       theObjectText.value=ObjText;
  
      }
       
      if (HfObjValue) {
          theObjectValue = parent.document.getElementById("ctl00_PageBody_" + HfObjValue);
       theObjectValue.value=ObjValue;
      }

      parent.ClosePop();
   }
</script>
    <asp:TreeView ID="DeptTreeView" runat="server" ExpandDepth="1"  SkinID="Group">
    </asp:TreeView>
    <asp:HiddenField ID="HfObjText" runat="server" />
    <asp:HiddenField ID="HFObjValue" runat="server" />
</asp:Content>
