<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master"
    AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.sm.sysun.update" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <table class="fromtable">
        <tr>
            <td>
                系统名称：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtSysName" MaxLength="100" Width="70%"></asp:TextBox>
                <label style="color: Red;">
                    *</label>
            </td>
        </tr>
        <tr>
            <td>
                英文简称：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtSysShortName" Width="70%" MaxLength="50"></asp:TextBox>
                <label style="color: Red;">
                    *</label>
            </td>
        </tr>
        <tr>
            <td>
                系统类型：
            </td>
            <td>
                <asp:RadioButtonList ID="rblSysType" runat="server" RepeatDirection="Horizontal">
                    <asp:ListItem Selected="True" Text="本地" Value="file"></asp:ListItem>
                    <asp:ListItem Text="网址" Value="http"></asp:ListItem>
                </asp:RadioButtonList>
            </td>
        </tr>
        <tr>
            <td>
                系统地址：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtSysUrl" MaxLength="200" Width="70%"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td>
                数据库服务器地址：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtDbSrvAddr" MaxLength="100" Width="70%"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td>
                数据库名：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtDbName" MaxLength="100" Width="70%"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td>
                数据库帐号：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtDbUid" MaxLength="100" Width="70%"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td>
                数据库密码：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtDbPwd" MaxLength="100" Width="70%"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td>
                系统图标：
            </td>
            <td>
                <asp:FileUpload ID="fuSysIcon" runat="server" />
                <asp:Button ID="btnDelPic" OnClick="BtnDelPic_Click" runat="server" Text="删除" CssClass="btn"
                    Visible="false" OnClientClick="return confirm('确定要删除图标？');" />
            </td>
        </tr>
        <tr>
            <td>
                <asp:Image ID="imgSysIcon" runat="server" ImageUrl="" Visible="false" />
            </td>
        </tr>
        <tr>
            <td>
                是否启用：
            </td>
            <td>
                <asp:RadioButtonList runat="server" ID="rblIsAct" RepeatDirection="Horizontal">
                    <asp:ListItem Value="1" Text="是" Selected="True"></asp:ListItem>
                    <asp:ListItem Value="0" Text="否"></asp:ListItem>
                </asp:RadioButtonList>
            </td>
        </tr>
        <tr>
            <td>
                顺序号：
            </td>
            <td>
                <asp:TextBox runat="server" ID="txtOrderID" MaxLength="100" Width="70%" onkeyup="javascript:permitInt(this);"></asp:TextBox>
            </td>
        </tr>
    </table>
    <asp:HiddenField runat="server" ID="hfID" />
    <asp:HiddenField runat="server" ID="hfMID" />
    <asp:HiddenField runat="server" ID="hfMode" />
</asp:Content>
