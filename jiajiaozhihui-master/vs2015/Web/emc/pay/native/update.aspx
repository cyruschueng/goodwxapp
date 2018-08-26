<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.pay.native.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name=" 消息管理">
            <table class="fromtable">
                <tr>
                    <td>商品ID<span style=" color:#f00;">*</span></td>
                    <td><asp:Label ID="lbProductId" runat="server"></asp:Label></td>
                </tr>
                <tr>
                    <td>产品名称<span style=" color:#f00;">*</span></td>
                    <td><asp:TextBox ID="txtProductName" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                    <td>商品描述<span style=" color:#f00;">*</span></td>
                    <td><asp:TextBox ID="txtBody" MaxLength="64" Width="50%" runat="server"></asp:TextBox><span style=" color:#f00;"> 最多64个汉字</span></td>
                </tr>
                <tr>
                    <td>标价金额<span style=" color:#f00;">*</span></td>
                    <td><asp:TextBox TextMode="Number" ID="txtTotalFee" runat="server"></asp:TextBox><span style=" color:#f00;"> 订单总金额，单位为分</span></td>
                </tr>
                <tr>
                    <td>产品类型</td>
                    <td><asp:DropDownList ID="ddlAttach" runat="server"></asp:DropDownList></td>
                </tr>
                <tr>
                    <td>商户订单前缀<span style=" color:#f00;">*</span></td>
                    <td><asp:TextBox ID="txtOutTradeNo" MaxLength="10" runat="server" Width="260px"></asp:TextBox><span style=" color:#f00;">自定义订单编号可以在商户平台区分不同的产品（如父母特训营：HMTX000001）</span></td>
                </tr>
                <tr>
                    <td>交易结束时间</td>
                    <td><asp:TextBox TextMode="Number" ID="txtTimeExpire"  runat="server" Width="100px"></asp:TextBox><span style=" color:#f00;">从发起支付多少分钟后失效 单位分钟但不低于5分钟</span></td>
                </tr>
                <tr>
                    <td>通知地址<span style=" color:#f00;">*</span></td>
                    <td><asp:Label  ID="lbNotityUrl" Width="70%"   runat="server"></asp:Label><span style=" color:#f00;">支付回调地址，不可随便修改</span></td>
                </tr>
                <tr>
                    <td>是否有效<span style=" color:#f00;">*</span></td>
                    <td>
                        <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                            <asp:ListItem Text="有效" Value="1"></asp:ListItem>
                            <asp:ListItem Text="无效" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                </tr>
             </table>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
