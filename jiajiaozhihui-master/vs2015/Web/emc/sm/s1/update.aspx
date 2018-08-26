<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.sm.s1.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language="javascript" src="/js/emccommon.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="部门信息">
            <table
        border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="right" height="25" style="width: 29%">
                        上级部门：</td>
                    <td align="left" height="25" width="*">
                        <asp:Label ID="LblParentDept" runat="server" Width="314px"></asp:Label></td>
                </tr>
        <tr>
            <td align="right" height="25" style="width: 29%">
                部门编码：</td>
            <td align="left" height="25" width="*">
                <asp:TextBox ID="txtDeptNo" runat="server" ReadOnly="True" Width="175px" Visible="False"></asp:TextBox>
                <asp:DropDownList ID="DeptIDDropDownList" runat="server" >
                </asp:DropDownList></td>
        </tr>
        <tr>
            <td align="right" height="25" style="width: 29%">
                部门名称：</td>
            <td align="left" height="25" width="*">
                <asp:TextBox ID="txtDeptName" runat="server" Width="311px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td align="right" height="25" style="width: 29%">
                部门名称(英文)：</td>
            <td align="left" height="25" width="*">
                <asp:TextBox ID="txtDeptName_e" runat="server" Width="312px"></asp:TextBox></td>
        </tr>
        <tr>
            <td align="right" style="width: 29%; height: 25px">
                部门经理&nbsp;：</td>
            <td align="left" width="*" style="height: 25px">
                <asp:TextBox ID="txtManagerName" runat="server" Width="200px" onClick="emcShowSelectEmployee('txtManagerName','hfManagerID')"  ReadOnly="True"></asp:TextBox>
            </td>
        </tr>
                <tr>
                    <td align="right" style="width: 29%; height: 25px">
                        部门审批人 ：</td>
                    <td align="left" width="*" style="height: 25px">
                        <asp:TextBox ID="txtAuditName" runat="server" Width="200px"  onClick="emcShowSelectEmployee('txtAuditName','hfAuditID')"  ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
        <tr>
            <td align="right" height="25" style="width: 29%">
                上级审批部门：</td>
            <td align="left" height="25" width="*">
                <asp:TextBox ID="txtParentAuditName" runat="server" Width="200px"  onClick="emcShowSelectDept('txtParentAuditName','hfParentAuditID')"  ReadOnly="True"></asp:TextBox>&nbsp;
            </td>
        </tr>
                <tr>
                    <td align="right" style="width: 29%; height: 25px">
                        公司类型：</td>
                    <td align="left" style="height: 25px" width="*">
                        <asp:Label ID="LblFiliale" runat="server" Width="206px"></asp:Label></td>
                </tr>
        <tr>
            <td align="right" style="height: 25px; width: 29%;">
                联系信息：</td>
            <td align="left" style="height: 25px" width="*">
                <asp:TextBox ID="txtContactInfo" runat="server" Rows="3" TextMode="MultiLine" Width="315px"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td colspan="2" height="25">
                <div align="center">
                    <asp:HiddenField ID="hfAuditID" runat="server" /><asp:HiddenField ID="hfParentID" runat="server" Visible="False" />
                    <asp:HiddenField ID="State" runat="server" />
                    <asp:HiddenField ID="hfParentAuditID" runat="server" />
                    <asp:HiddenField ID="hfManagerID" runat="server" /><asp:HiddenField ID="hfDeptID" runat="server" />
                    &nbsp; &nbsp;
                    <asp:Button ID="btnAdd" runat="server" OnClick="btnAdd_Click" Text="· 提交 ·" />&nbsp;
                    <br />
                    <asp:Label ID="LblMessage" runat="server" ForeColor="Red" Width="130px"></asp:Label></div>
            </td>
        </tr>
    </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls><!--******************************修改页面代码********************************-->
</asp:Content>
