<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.life.exchange.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script>
        $(function () {
            $("#<%=ddlGoodsType.ClientID %>").change(function () {
                if ($("#<%=ddlGoodsType.ClientID %>").val() == "-1") {
                    $("#changename").text("消费积分");
                } else {
                    $("#changename").text("消费粉丝数");
                }
            });
        })
    </script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品兑换编辑">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td align="right" height="25" style="width: 100px">产品类型&nbsp;</td>
                    <td align="left" height="25" style="width: 230px">
                        <asp:DropDownList ID="ddlGoodsType" runat="server" Width="95%"></asp:DropDownList>
                    </td>
                    <td align="right" height="25" style="width: 100px">产品名称&nbsp;</td>
                    <td align="left" height="25" style="width: 230px">
                        <asp:TextBox ID="txtPublicGoods" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    <td align="left" height="25" style="width: 100px"><span id="changename">消费积分</span> </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtScore" runat="server" Width="30%"></asp:TextBox>
                    </td> 
                </tr>
                <tr>
                    <td align="left" height="25" style="width: 100px">有效期</td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:CalendarTextBox ID="txtValidityDate" runat="server" Width="95%" ></asp:CalendarTextBox>
                    </td>
                    <td align="left" height="25" style="width: 100px">数量</td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtNumber" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    <td align="left" height="25" style="width: 100px">顺序</td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtOrderBy" runat="server" Width="95%"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25" style="width: 100px" colspan="8">
                        简述
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="8">
                        <FCKeditorV2:FCKeditor ID="txtInfoDesc" runat="server" DefaultLanguage="zh-cn" Height="200px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </td>

                </tr>
                <tr>
                    <td align="left" height="25" style="width: 100px" colspan="8">
                        详情
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="8">
                        <FCKeditorV2:FCKeditor ID="txtDesc" runat="server" DefaultLanguage="zh-cn" Height="400px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25"  style="width: 200px" colspan="8">
                        产品图片
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25"  colspan="8">
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
