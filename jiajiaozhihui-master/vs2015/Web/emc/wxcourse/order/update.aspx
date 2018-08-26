<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.order.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程内容">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <script>
                    function selectType() {
                        var v = $("#<%=ddlType.ClientID %>").val();
                        if (v == 1 || v == 2 || v == 3) {
                            $("#txt").css("display", "none");
                            $("#url").removeAttr("style");
                        } else if (v == 4) {
                            $("#txt").removeAttr("style");
                            $("#url").css("display", "none");
                        } else {
                            $("#txt").css("display", "none");
                            $("#url").css("display", "none");
                        }
                        return false;
                    }
                    
                </script>
                <style>
                    select { width:200px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td style=" width:200px;">交易单号</td>
                         <td colspan="2"><asp:Label ID="lbTradeno" runat="server" ></asp:Label></td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">订购人</td>
                        <td colspan="2">
                            <asp:Label ID="lbName" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">订购电话</td>
                        <td colspan="2">
                            <asp:Label ID="lbTelephone" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">订购时间</td>
                        <td colspan="2">
                            <asp:Label ID="lbOrderDateTime" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">订购数量</td>
                        <td colspan="2">
                            <asp:Label ID="lbBuyNumber" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">价格</td>
                        <td colspan="2">
                            <asp:Label ID="lbPrice" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">订单状态</td>
                        <td colspan="2">
                            <asp:DropDownList ID="ddlIsAct" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="已支付" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="未支付" Value="0"></asp:ListItem>
                                <asp:ListItem Text="已退款" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
