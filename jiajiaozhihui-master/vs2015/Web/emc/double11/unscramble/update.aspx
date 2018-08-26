<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.double11.unscramble.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>书名</td>
                        <td>
                            <asp:DropDownList ID="ddlBookName" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="《弟子规》" Value="《弟子规》" ></asp:ListItem>
                                <asp:ListItem Text="《三字经》" Value="《三字经》" ></asp:ListItem>
                                <asp:ListItem Text="《千字文》" Value="《千字文》" ></asp:ListItem>
                                <asp:ListItem Text="《诫子书》" Value="《诫子书》" ></asp:ListItem>
                                <asp:ListItem Text="《声律启蒙》上" Value="《声律启蒙》上" ></asp:ListItem>
                                <asp:ListItem Text="《声律启蒙》下" Value="《声律启蒙》下" ></asp:ListItem>
                                <asp:ListItem Text="《唐诗选》" Value="《唐诗选》" ></asp:ListItem>
                                <asp:ListItem Text="《孝经》" Value="《孝经》" ></asp:ListItem>
                                <asp:ListItem Text="《格言别录》" Value="《格言别录》" ></asp:ListItem>
                                <asp:ListItem Text="《大学》" Value="《大学》" ></asp:ListItem>
                                <asp:ListItem Text="《中庸》" Value="《中庸》" ></asp:ListItem>
                                <asp:ListItem Text="《论语》上" Value="《论语》上" ></asp:ListItem>
                                <asp:ListItem Text="《论语》中" Value="《论语》中" ></asp:ListItem>
                                <asp:ListItem Text="《论语》下" Value="《论语》下" ></asp:ListItem>
                                <asp:ListItem Text="《老子道德经》" Value="《老子道德经》" ></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>页码</td>
                        <td><asp:TextBox ID="txtPageIndex" TextMode="Number" runat="server" Width="95%"></asp:TextBox></td>
                        <td>是否启用</td>
                        <td>
                            <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="启用" Value="1"></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td >名句</td>
                        <td colspan="5"><asp:TextBox ID="txtMainWords" TextMode="MultiLine" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    
                    <tr>
                        <td >译文</td>
                        <td colspan="5"><FCKeditorV2:FCKeditor ID="txtTranslation" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
