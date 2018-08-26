<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.sm.computer.update" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <asp:Panel ID="DetailPanel" runat="server" GroupingText="非验证用户信息">
        <table class="fromtable">
            <tr>
                <td>
                    姓名
                </td>
                <td>
                    <asp:DropDownList ID="ddlUserID" runat="server">
                    </asp:DropDownList>
                    <font color="red">*</font>
                </td>
            </tr>
            <tr>
                <td>
                    非验证原因
                </td>
                <td>
                    <asp:TextBox ID="txtRemark" runat="server" MaxLength="30" Width="200px"></asp:TextBox><font
                        color="red">*</font>
                </td>
            </tr>
            <tr>
                <td>
                    状态
                </td>
                <td>
                    <asp:TextBox ID="txtStatus" runat="server" MaxLength="30" Width="200px" ReadOnly="true" SkinID ="txtBoxRedonly"></asp:TextBox> 
                </td>
            </tr>
            <tr>
                <td>
                    审批人
                </td>
                <td>
                    <asp:TextBox ID="txtApproval" runat="server" ReadOnly="true" SkinID ="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td>
                    审批备注
                </td>
                <td>
                    <asp:TextBox ID="txtAppRemark" runat="server" MaxLength="200" Width="200px"></asp:TextBox>
                </td>
            </tr>          
            <tr>
                <td>
                    审批时间
                </td>
                <td>
                    <asp:TextBox ID="txtAppDate" runat="server" ReadOnly="true" SkinID ="txtBoxRedonly"></asp:TextBox>
                </td>
            </tr>              
            <tr>
                <td>
                </td>
                <td>
                    非验证用户信息：指由于某种特殊原因，临时授权某个用户不需要验证电脑客户端时可以登录系统！
                </td>
            </tr>
        </table>
    </asp:Panel>
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfMode" runat="server" />
</asp:Content>
