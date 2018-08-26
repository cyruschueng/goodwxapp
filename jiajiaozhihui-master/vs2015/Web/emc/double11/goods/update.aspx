<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.double11.goods.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="right" height="25" style="width: 100px">福利品&nbsp;</td>
                        <td align="left" height="25" style="width: 230px">
                            <asp:TextBox ID="txtPublicGoods" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td align="left" height="25" style="width: 100px">是否启用</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:DropDownList ID="ddlIsAct" runat="server" Width="95%">
                                <asp:ListItem Text="启用" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td align="left" height="25" style="width: 100px">可兑换积分</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:TextBox ID="txtScore" runat="server" Width="95%" ></asp:TextBox>
                        </td> 
                        <td></td>
                        <td></td>
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
                        <td align="left" height="25" style="width: 100px">有效日期</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:CalendarTextBox ID="txtValidityDate" runat="server" Width="95%"></asp:CalendarTextBox>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="Panel2" GroupingText="价格" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="left" height="25" style="width: 100px">福利价</td>
                        <td align="left" height="25"  colspan="7">
                            <asp:TextBox ID="txtPublicPrice" runat="server" Width="269px" ></asp:TextBox>
                        </td> 
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">市场价</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:TextBox ID="txtMarketPrice" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td align="left" height="25" style="width: 100px">折扣率(<=1)</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:TextBox ID="txtDiscount" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td align="left" height="25" style="width: 100px">降价</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:TextBox ID="txtDepreciate" runat="server" Width="95%" ></asp:TextBox>
                        </td> 
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="8" style=" color:#f00">
                            产品价格计算说明：1）如果有福利价,产品价的计算方式为：福利价 &nbsp;&nbsp;&nbsp;2)如果没有福利价,产品价的计算方式为：（市场价-降价）*折扣率
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="Panel3" GroupingText="支付方式" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td style=" width:100px;">支付方式</td>
                        <td>
                            <asp:CheckBox ID="cbIsRosebery" runat="server" />货到付款
                            <asp:CheckBox ID="cbIsOnlinePayment" runat="server" />在线支付
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:100px;">在线支付链接</td>
                        <td>
                            <asp:TextBox ID="txtGoodsLink" runat="server" Width="95%"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="Panel4" GroupingText="显示位置" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>
                            <asp:CheckBox ID="cbIsRecommend" runat="server" />显示在订单中 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="color:#f00;">如果选择，当前产品将不显示在粉丝福利中，只会在订单中显示</span>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td colspan="8">简述</td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="8">
                        <FCKeditorV2:FCKeditor ID="txtInfoDesc" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </td>

                </tr>
                <tr>
                    <td colspan="8">详情</td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="8">
                        <FCKeditorV2:FCKeditor ID="txtDesc" runat="server" DefaultLanguage="zh-cn" Height="400px" Width="100%" ></FCKeditorV2:FCKeditor>
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
