<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxopen.habit.habitlist.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr><td >习惯名称</td></tr>
                <tr>
                    <td ><asp:TextBox ID="txtTitle" Width="90"  runat="server"></asp:TextBox></td>
                </tr>
                <tr><td >习惯分类</td></tr>
                <tr>
                    <td >
                        <asp:DropDownList ID="ddlHabitClassify" runat="server" Width="200" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="健康" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="气质" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                    </td>
                </tr>
                <tr><td >加入人数</td></tr>
                <tr>
                    <td ><asp:TextBox ID="txtJoinNum" TextMode="Number" Width="90"  runat="server"></asp:TextBox></td>
                </tr>
                <tr><td >序号</td></tr>
                <tr>
                    <td ><asp:TextBox ID="txtSn" TextMode="Number" Text="9999" Width="90"  runat="server"></asp:TextBox></td>
                </tr>
                <tr><td >是否有效</td></tr>
                <tr>
                    <td >
                        <asp:DropDownList ID="ddlIsAct" runat="server">
                            <asp:ListItem Text="有效" Value="1"></asp:ListItem>
                            <asp:ListItem Text="无效" Value="0"></asp:ListItem>
                        </asp:DropDownList>

                    </td>
                </tr>
                <tr><td>图片</td></tr>
                <tr>
                    <td >
                        <asp:FileUpload ID="fuImgUrl" runat="server"  />
                        <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" 
                            Visible="false" OnClientClick="return confirm('确定要删除图片？');" 
                            onclick="btnDelPic_Click" />
                    </td>
                </tr>
                <tr>
                    <td >
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
