<%@ OutputCache Location="None" %>

<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    CodeBehind="list.aspx.cs" Inherits="SfSoft.web.emc.sm.s8.list" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">

    <script type="text/javascript">
    function set_workfrow(MID,AuditClass,mode,flag) {
      //  window.open('update.aspx?state=browse&mode=' + mode + '&MID=' + MID + '&AuditClass=' + AuditClass + '&flag=' + flag, 'workfrow', 'width=600,height=400,left=100,top=50');
        parent.ShowIframe('流程设置', 'update.aspx?state=browse&mode=' + mode + '&MID=' + MID + '&AuditClass=' + AuditClass + '&flag=' + flag, '600', '400')
    }
     function update_workfrow(AFID,MID,AuditClass,mode,flag) {
        // window.open('update.aspx?state=browse&mode=' + mode + '&AFID=' + AFID + '&MID=' + MID + '&AuditClass=' + AuditClass + '&flag=' + flag, 'workfrow', 'width=600,height=400,left=100,top=50');
         parent.ShowIframe('流程设置', 'update.aspx?state=browse&mode=' + mode + '&AFID=' + AFID + '&MID=' + MID + '&AuditClass=' + AuditClass + '&flag=' + flag, '600', '400')
    }
    
    
    function del_workfrow(AFID,MID,AuditClass) {
      if (confirm("确定要删除吗！")) {
       
       //SfSoft.web.emc.sm.s8.list.DelAuditFlow(AFID, AuditClass, MID,get_Result_CallBack);
      document.location ='list.aspx?state=browse&mode=del&MID='+MID+'&AuditClass='+AuditClass+'&AFID='+AFID;
      }
      else {
         return ;
      }
    }
    
 function get_Result_CallBack(response)
{
  if (response.value != null)
   { 
      var tblHtml = response.value;
      var AuditList = document.getElementById("AuditList");
     // AuditList.innerHTML = tblHtml;
   }
}
    </script>

    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="审批流程">
   
            <asp:Panel ID="panelCallType" runat="server" GroupingText="提醒方式">
                <asp:CheckBoxList ID="cblCallType" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                </asp:CheckBoxList>
                <asp:Button ID="btnSave" runat="server" Text="保存设置" OnClick="btnSave_Click" CssClass="btn" />

            </asp:Panel>
                  <table width="90%" border="0" cellspacing="0"     class="fromtable">
                    <tr>
                        <td height="22" width="34%"  >
                            <asp:CheckBox ID="ckIsApprove" runat="server" AutoPostBack="True" Text="不需要审批" OnCheckedChanged="ckIsApprove_CheckedChanged" />
                        </td>
                        <td>从：<asp:DropDownList ID="ddlFun" runat ="server" ></asp:DropDownList>流程中<asp:Button ID="btnImport" runat ="server" Text ="导入" CssClass ="btn" OnClick ="btnImportClick" />&nbsp;(导入的数据不包括审批条件)</td>
                    </tr>
                </table>   
                <table width="90%" border="0" cellspacing="0" cellpadding="1" bgcolor="#8ad3f7" class="fromtable">
                    <tr>
                        <td height="22" width="54%" style="color: RED; text-align: center;">
                            <asp:Label ID="lblMName" runat="server" Width="225px"></asp:Label>
                        </td>
                    </tr>
                </table>           
            <div id="AuditList">
                <%=GetAuditList() %>
                <asp:HiddenField ID="hfMName" runat="server" />
                <asp:HiddenField ID="hfMID" runat="server" />
                <asp:HiddenField ID="hfMaxClass" runat="server" />
            </div>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
