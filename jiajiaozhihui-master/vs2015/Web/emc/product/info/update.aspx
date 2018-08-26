<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.product.info.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="right" height="25" style="width: 100px">产品名称&nbsp;</td>
                        <td align="left" height="25" style="width: 230px"><asp:TextBox ID="txtPublicGoods" runat="server" Width="95%"></asp:TextBox></td>
                        <td align="left" height="25" style="width: 100px">数量</td>
                        <td align="left" height="25" style="width: 269px"><asp:TextBox ID="txtNumber" runat="server" Width="95%"></asp:TextBox></td>

                        <td align="left" height="25" style="width: 100px">产品类型</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:DropDownList ID="ddlGoodsType" runat="server">
                                <asp:ListItem Text="请选择产品类型" Value=""></asp:ListItem>
                                <asp:ListItem Text="国学达人擂台赛奖品" Value="20161212"></asp:ListItem>
                                <asp:ListItem Text="课程练习奖品" Value="20161213"></asp:ListItem>
                                <asp:ListItem Text="课程实践奖品" Value="20161214"></asp:ListItem>
                                <asp:ListItem Text="亲子书法" Value="20161215"></asp:ListItem>
				                <asp:ListItem Text="神尔听听" Value="20161216"></asp:ListItem>
                                <asp:ListItem Text="推客奖品" Value="20161217"></asp:ListItem>
                                <asp:ListItem Text="二维码产品" Value="20161218"></asp:ListItem>
				                <asp:ListItem Text="家教问答打赏" Value="20161219"></asp:ListItem>
                                <asp:ListItem Text="吸粉-推荐书" Value="20161220"></asp:ListItem>
                                <asp:ListItem Text="吸粉-四大名著" Value="20161221"></asp:ListItem>
                            </asp:DropDownList>
                        </td>

                        <td align="left" height="25" style="width: 100px">是否启用</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:DropDownList ID="ddlIsAct" runat="server" Width="95%">
                                <asp:ListItem Text="启用" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="Panel2" GroupingText="价格" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="left" height="25" style="width: 100px">优惠价</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtPublicPrice" runat="server" Width="269px" ></asp:TextBox></td> 
                        <td align="left" height="25" style="width: 100px">市场价</td>
                        <td align="left" height="25" style="width: 269px"><asp:TextBox ID="txtMarketPrice" runat="server" Width="95%"></asp:TextBox></td>
                        <td style="width: 100px"></td>
                        <td style="width: 100px"></td>
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
