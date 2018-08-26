<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.exchange.qzsf.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="right" height="25" style="width: 100px">产品&nbsp;</td>
                        <td align="left" height="25" style="width: 230px">
                            <asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td align="left" height="25" style="width: 100px">是否上架</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:RadioButtonList ID="rblAct" RepeatDirection="Horizontal" runat="server" Width="95%">
                                <asp:ListItem Text="上架" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="下架" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td align="left" height="25" style="width: 100px">兑换类型</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:DropDownList ID="ddlType" runat="server" Width="95%">
                                
                            </asp:DropDownList>
                        </td> 
                        <td>兑换条件</td>
                        <td><asp:TextBox ID="txtQuantity" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">库存</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:TextBox ID="txtStore" runat="server" Width="95%"></asp:TextBox>
                        </td>
                        <td align="left" height="25" style="width: 100px">使用范围</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:DropDownList ID="ddlItem" runat="server" Width="95%">
                            </asp:DropDownList>
                        </td>
                        <td align="left" height="25" style="width: 100px"></td>
                        <td align="left" height="25" style="width: 269px">
                            
                        </td>
                        <td align="left" height="25" style="width: 100px"></td>
                        <td align="left" height="25" style="width: 269px">
                            
                        </td>
                    </tr>
                    <tr>
                    <td >简述</td>
                    <td align="left" height="25" colspan="7">
                        <asp:TextBox  ID="txtDescribe" runat="server"  Width="100%" ></asp:TextBox >
                    </td>
                </tr>
                <tr>
                    <td >详情</td>
                    <td align="left" height="25" colspan="7">
                        <FCKeditorV2:FCKeditor ID="txtDetails" runat="server" DefaultLanguage="zh-cn" Height="400px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </td>
                </tr>
                <tr>
                    <td> 产品图片</td>
                    <td colspan="7" align="left" height="25" style="width: 90%">
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
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
