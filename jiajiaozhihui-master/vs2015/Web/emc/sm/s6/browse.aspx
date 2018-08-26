<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.s6.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<script language="javascript" src="/js/emccommon.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="兼职人员设置">
            <table style="width:95%" class="fromtable">
                <tr>
                    <td style="height: 16px" width="100px">
                        兼职人员</td>
                    <td style="height: 16px" width="200px">
                        <asp:TextBox ID="txtCnName" runat="server" onclick="emcShowSelectCEmployee('txtCnName','hfUserID')"
                            ReadOnly="True" Width="150px"></asp:TextBox><img src ="../../../images/button/assign.gif" onclick ="emcShowSelectCEmployee('txtCnName','hfUserID')" style ="cursor :hand"  title ="人员选择" /></td>
 
                    <td style="height: 16px" valign="top" width="100px">
                        兼职部门</td>
                    <td style="height: 16px" valign="top" width="200px">
                        <asp:TextBox ID="txtDeptName" runat="server" onclick="emcShowSelectCDept('txtDeptName','hfDeptID')"
                            ReadOnly="True" Width="150px"></asp:TextBox><img src ="../../../images/button/assign.gif" onclick ="emcShowSelectCDept('txtDeptName','hfDeptID')" style ="cursor :hand" title ="部门选择"  />
                    </td>
                    <td>岗位</td>
                    <td>  <asp:RadComboBox ID="rcbPostName" Width="100px" runat="server" EnableAutomaticLoadOnDemand="true"
                        EnableLoadOnDemand="True" ShowMoreResultsBox="true" EnableVirtualScrolling="true"
                        OnItemsRequested="RadComboBoxPost_ItemsRequested">
                    </asp:RadComboBox></td>
                    <td align="center" colspan="2">
                        <asp:HiddenField ID="hfUserID" runat="server" />
                        <asp:HiddenField ID="hfDeptID" runat="server" />
                        <asp:Button ID="btn_addTo" runat="server" Text="增加" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btn_addTo_Click" /></td>
                </tr>
            </table>
            <hr />
          
            <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False"  Width="95%" SkinID ="sgv1" >
                <Columns>
                    <asp:BoundField DataField="ID" HeaderText="ID" />
                    <asp:BoundField DataField="CnName" HeaderText="兼职人" />
                    <asp:BoundField DataField="DeptName" HeaderText="兼职部门" />
                    <asp:BoundField DataField="PostName" HeaderText="岗位" />
                    <asp:BoundField DataField="CompanyName" HeaderText="兼职公司" />
                    <asp:TemplateField HeaderText="操作">
                         <ItemTemplate>
                             <asp:LinkButton ID="lbDel" runat="server" Text="删除" CommandName="DeleteUser" CommandArgument='<%# DataBinder.Eval(Container.DataItem,"ID") %>'
                                   OnCommand="LinkButtonClick" ForeColor="blue" OnClientClick="return confirm('确定删除该角色吗？');"></asp:LinkButton>
                         </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
