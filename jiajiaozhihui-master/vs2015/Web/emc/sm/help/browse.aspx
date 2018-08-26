<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.help.browse" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script type ="text/javascript" language ="javascript" >
function openupdate(helpid,dpath) {
  if (dpath=="") {
  helpInfo.location="update.aspx?state=browse&HelpID="+helpid;
  }
  else {
  helpInfo.location=dpath+"?state=browse&HelpID="+helpid;
  }
}
</script>
 
            <table width="100%">
 
                <tr>
                    <td style="width: 155px; " valign="top">
                         <div align="left" style=" overflow: auto; width: 155px; height: 425px; background-color: #f2f8fd;border:1px;">
                            <asp:TreeView ID="TreeView1" runat="server" ExpandDepth="2" Width="130px" >
                            </asp:TreeView>
                        </div>
                    </td>
                    <td style="width: 85%; " valign="top">
                                    <iframe id="helpInfo" style=" width: 100%; z-index: 2; height: 425px;" scrolling="auto"
                    frameborder="0" src="../../../empty.aspx"></iframe>
                    </td>
                </tr>
            </table>
 
</asp:Content>
