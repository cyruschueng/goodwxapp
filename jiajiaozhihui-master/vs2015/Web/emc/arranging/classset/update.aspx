<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.arranging.classset.update" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="班级设置">
            <script src="../../../js/My97DatePicker/WdatePicker.js"></script>
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td style="width: 100px;">区域</td>
                    <td>
                        <asp:Label ID="lbClassArea" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">班级名称<span style="color: #f00;">*</span> </td>
                    <td>
                        <asp:TextBox ID="txtClassName" Width="200px" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">开学日期<span style="color: #f00;">*</span></td>
                    <td>
                        <asp:TextBox ID="txtOpeningDate" onClick="WdatePicker()" Width="150px" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">结束日期</td>
                    <td>
                        <asp:TextBox ID="txtClosingDate" onClick="WdatePicker()" Width="150px" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">班级介绍</td>
                    <td>
                        <asp:TextBox ID="txtClassIntro" TextMode="MultiLine" Rows="3" Width="80%" runat="server"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">是否有效</td>
                    <td>
                        <asp:RadioButtonList RepeatDirection="Horizontal" ID="rblIsAct" runat="server">
                            <asp:ListItem Value="1" Text="有效"></asp:ListItem>
                            <asp:ListItem Value="0" Text="无效"></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                </tr>
            </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfProductIDBags" runat="server" />
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfMode" runat="server" />
</asp:Content>
