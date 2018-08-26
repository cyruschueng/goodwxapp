<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.zxs.like.browse" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="知行社点赞设置">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                    <tr>
                        <td>日期范围</td>
                        <td>
                            <asp:TextBox TextMode="DateTime" ID="txtMiniDate" onClick="WdatePicker()" runat="server"></asp:TextBox>
                            --
                            <asp:TextBox TextMode="DateTime" ID="txtMaxDate" onClick="WdatePicker()" runat="server"></asp:TextBox>
                        </td>
                  </tr>
                  <tr>
                        <td>是大点赞数</td>
                        <td><asp:TextBox TextMode="Number" ID="txtMaxValue" runat="server"></asp:TextBox></td>  
                </tr> 
                    <tr>
                        <td colspan="2"><asp:Button ID="btnOk" class="btn"  Text="确认"
                                onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                runat="server" onclick="btnOk_Click" /></td>
                    </tr>
                </table>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    
</asp:Content>
