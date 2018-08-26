<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.tempmsg.user.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="更新模版用户">
            <asp:Panel ID="Panel1" GroupingText="" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" id="tableView" class="fromtable">
                    <tr>
                        <td>
                            上次用户总数:<asp:Label ID="lbLatelyOpenIdTotal" style="color:#0094ff" runat="server"></asp:Label>当前用户总数: <asp:Label ID="lbCurrOpenIdTotal" style="color:#ff0000" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Button ID="btnUpdate" Text="更新模板用户" OnClick="btnUpdate_Click"　class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" runat="server" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            更新记录：
                            <hr />
                            <div runat="server" id="html_logs"></div>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
