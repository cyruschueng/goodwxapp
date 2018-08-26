<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.brainsexpert.product.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="right" height="25" style="width: 100px">产品名称</td>
                        <td align="left" height="25" style="width: 230px">
                            <asp:TextBox ID="txtPublicGoods" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td align="right" height="25" style="width: 100px">金币</td>
                        <td align="left" height="25" style="width: 230px">
                            <asp:TextBox ID="txtExchange" runat="server" Width="95%"></asp:TextBox>
                        </td>

                        <td align="left" height="25" style="width: 100px">是否启用</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:DropDownList ID="ddlIsAct" runat="server" Width="95%">
                                <asp:ListItem Text="启用" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">数量</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:TextBox ID="txtNumber" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td align="left" height="25" style="width: 100px">开始日期</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:CalendarTextBox ID="txtStartDate" runat="server" Width="95%"></asp:CalendarTextBox>
                        </td>
                        <td align="left" height="25" style="width: 100px">结束日期</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:CalendarTextBox ID="txtEndDate" runat="server" Width="95%"></asp:CalendarTextBox>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td colspan="8">详情</td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="8">
                        <FCKeditorV2:FCKeditor ID="txtDesc" runat="server" DefaultLanguage="zh-cn" Height="400px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </td>

                </tr>
                <tr>
                    <td colspan="8">简述</td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="8">
                        <asp:TextBox ID="txtInfoDesc" runat="server" TextMode="MultiLine" Width="98%"></asp:TextBox>
                    </td>

                </tr>
                <tr>
                    <td> 产品图片</td>
                </tr>
                <tr>
                    <td colspan="8" align="left" height="25" style="width: 90%">
                        <asp:FileUpload ID="fuImgUrl" runat="server"  />
                        <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" 
                            Visible="false" OnClientClick="return confirm('确定要删除图片？');" 
                            onclick="btnDelPic_Click" />
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="8">
                        <asp:Image ID="imgUrl" runat="server" ImageUrl="" Visible="false" />
                    </td>
                </tr>
            </table>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
