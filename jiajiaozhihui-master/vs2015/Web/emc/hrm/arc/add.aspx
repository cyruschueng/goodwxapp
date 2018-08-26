<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="add.aspx.cs" Inherits="SfSoft.web.emc.hrm.arc.add" Title="员工信息" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language="javascript" src="/js/emccommon.js"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="登录信息">
            <table cellspacing="2" cellpadding="0" width="100%" border="0">
                <tbody>
                    <tr>
                        <td style="width: 12%" align="right" height="25">
                            用户名</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtUserName" runat="server" Width="200px"></asp:TextBox>
                        </td>
                        <td align="right" width="*" height="25">
                            员工号</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtEmpID" runat="server" Width="200px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td align="right" height="25" style="width: 12%">
                            密码</td>
                        <td align="left" height="25" width="*">
                            <asp:TextBox ID="txtPassword" runat="server" Width="199px"></asp:TextBox></td>
                        <td align="right" height="25" width="*">
                        </td>
                        <td align="left" height="25" width="*">
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 12%" align="right" height="25">
                            姓名</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtCnName" runat="server" Width="200px"></asp:TextBox>
                        </td>
                        <td align="right" width="*" height="25">
                            英文名</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtEnName" runat="server" Width="200px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td style="width: 12%" align="right" height="25">
                            部门
                        </td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtDeptName" runat="server" Width="200px"  onClick="emcShowSelectDept('txtDeptName','txtDeptID')"  ReadOnly="True"></asp:TextBox>
                        </td>
                        <td align="right" width="*" height="25">
                            职位</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtPositions" runat="server" Width="200px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td style="width: 12%" align="right" height="25">
                            性别</td>
                        <td align="left" width="*" height="25">
                            &nbsp;<asp:RadioButtonList ID="txtSex" runat="server" Height="25px" RepeatDirection="Horizontal"
                                TextAlign="Left" Width="114px">
                                <asp:ListItem Value="1">男</asp:ListItem>
                                <asp:ListItem Value="0">女</asp:ListItem>
                            </asp:RadioButtonList></td>
                        <td align="right" width="*" height="25">
                            身份证号</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtIDCard" runat="server" Width="200px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td style="width: 12%" align="right" height="25">
                            国家</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtNationality" runat="server" Width="200px"></asp:TextBox>
                        </td>
                        <td align="right" width="*" height="25">
                            地址</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtAddr" runat="server" Width="200px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td style="width: 12%; height: 25px" align="right">
                            移动电话</td>
                        <td style="height: 25px" align="left" width="*">
                            <asp:TextBox ID="txtMobile" runat="server" Width="200px"></asp:TextBox>
                        </td>
                        <td style="height: 25px" align="right" width="*">
                            固定电话</td>
                        <td style="height: 25px" align="left" width="*">
                            <asp:TextBox ID="txtTel" runat="server" Width="200px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td style="width: 12%" align="right" height="25">
                            Email
                        </td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtEmail" runat="server" Width="200px"></asp:TextBox>
                        </td>
                        <td align="right" width="*" height="25">
                            传真</td>
                        <td align="left" width="*" height="25">
                            <asp:TextBox ID="txtFax" runat="server" Width="200px"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td colspan="4" height="25">
                            <asp:HiddenField ID="txtDeptID" runat="server" />
                            <asp:Label ID="Msg" runat="server" Width="544px"></asp:Label></td>
                    </tr>
                    <tr>
                        <td colspan="4" height="25">
                            <div align="center">
                                <asp:Button ID="btnAdd" OnClick="btnAdd_Click" runat="server" Text="· 提交 ·"></asp:Button>&nbsp;
                                <asp:Button ID="Btn_Add" OnClick="Btn_Add_Click" runat="server" Text="继续增加用户"></asp:Button>
                                <asp:Button ID="Btn_Return2" runat="server" Text="返回" PostBackUrl="~/emc/sm/s2/browse.aspx?state=browse" >
                                </asp:Button></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
