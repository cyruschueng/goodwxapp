<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.s2.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">

    <script language="javascript">
        function configLock() {
            if (confirm("您确认锁定全部密码为【111111】的用户吗？\n如果您选择【确定】，则这些被锁定用户将无法登录本系统，\n只有通过解除该用户的锁定状态，才能登录本系统！\n您确定锁定这些用户吗？")) {
                return true;
            } else {
                return false;
            }

        }
    </script>

    <cc1:TabOptionWebControls ID="TabOWC" runat="server">
        <cc1:TabOptionItem ID="TabOItem1" runat="server" Tab_Name="用户管理">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td align="right">
                        <asp:Label ID="Label1" runat="server" Text="用户名"></asp:Label>
                    </td>
                    <td align="left">
                        <asp:TextBox ID="txtUserName" runat="server"  Width ="60px"></asp:TextBox>
                    </td>
                    <td align="right">
                        <asp:Label ID="Label2" runat="server" Text="姓名" ></asp:Label>
                    </td>
                    <td align="left">
                        <asp:TextBox ID="txtCnName" runat="server"  Width ="60px"></asp:TextBox>
                    </td>
                    <td align="right">
                        <asp:Label ID="Label3" runat="server" Text="部门"  Width ="80px"></asp:Label>
                    </td>
                    <td align="left">
                        <asp:TextBox ID="txtDeptName" runat="server"></asp:TextBox>
                    </td>
                    <td align="right">
                        <asp:CheckBox ID="cbxPass" runat="server" Checked="false" Text="未修改密码用户" />
                        <asp:CheckBox ID="cbxLock" runat="server" Checked="false" Text="已锁定用户" />
                        <asp:CheckBox ID="cbxLiZhi" runat="server" Checked="false" Text="离职用户" />
                        &nbsp;
                    </td>
                    <td align="left">
                        <asp:Button ID="BtnSearch" OnClick="BtnSearch_Click" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" Text="查询"></asp:Button>
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False"
                PageSize="10" Width="100%" OnPageIndexChanging="GridView1_PageIndexChanging"
                DataKeyNames="UserName" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow"
                SkinID="sgv1">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="UserName" HeaderText="用户名" />
                    <asp:BoundField DataField="CnName" SortExpression="CnName" HeaderText="姓名"></asp:BoundField>
                    <asp:BoundField DataField="DeptName" SortExpression="DeptName" HeaderText="部门"></asp:BoundField>
                    <asp:BoundField DataField="PostName" SortExpression="PostName" HeaderText="岗位">
                    </asp:BoundField>
                    <asp:BoundField DataField="Email" SortExpression="Email" HeaderText="Email"></asp:BoundField>
                    <asp:BoundField DataField="Tel" SortExpression="Tel" HeaderText="电话"></asp:BoundField>
                    <asp:BoundField DataField="Mobile" SortExpression="Mobile" HeaderText="移动电话"></asp:BoundField>
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="TopAndBottom"></PagerSettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
