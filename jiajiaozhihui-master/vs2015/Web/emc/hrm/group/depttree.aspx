<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true" CodeBehind="depttree.aspx.cs" Inherits="SfSoft.web.emc.hrm.group.depttree" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language =javascript >
            function OpenDocument( DeptID )
            {                
                 
                 var hfdeptid = parent.document.getElementById("DeptID");
                 hfdeptid.value=DeptID;
                parent.mainbody.location="update.aspx?state=update&DeptID="+DeptID;
            }
</script>
<asp:Panel ID="Panel1" runat="server" Height="454px" Width="175px" ScrollBars="Auto">
    <asp:TreeView ID="DeptTreeView" runat="server" ExpandDepth="1">
    </asp:TreeView>
    </asp:Panel> 
   
    
</asp:Content>
