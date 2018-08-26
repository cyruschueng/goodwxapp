<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" EnableEventValidation="false" AutoEventWireup="true" CodeBehind="list.aspx.cs" Inherits="SfSoft.web.emc.sm.s4.list" Title="无标题页" %>

 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">

    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="数据权限列表">
            <asp:Button ID="btnAdd" runat="server" Text="新建" OnClick="btnAdd_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" /><br />
            <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="99%" SkinID ="sgv1"  >
                <Columns>
                    <asp:BoundField DataField="DataAclID" HeaderText="ID" />
                    <asp:BoundField HeaderText="数据权限描述" DataField="DataAclDesc">
                        <HeaderStyle Width="80%" />
                    </asp:BoundField>
                    <asp:TemplateField HeaderText="操作">
                         <ItemTemplate>
                              <asp:LinkButton ID="lbEdit" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" Text="修改" CommandName="Edit"
                                   CommandArgument='<%# DataBinder.Eval(Container.DataItem,"DataAclID") %>' OnCommand="LinkButtonClick"></asp:LinkButton>

                                <asp:LinkButton ID="lbDel" runat="server" CssClass="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" Text="删除" CommandName="Delete" CommandArgument='<%# DataBinder.Eval(Container.DataItem,"DataAclID") %>'
                                   OnCommand="LinkButtonClick" OnClientClick="return confirm('确定删除该数据权限吗？');"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:SmartGridView>
            <asp:HiddenField ID="hfFunID" runat="server" />
 
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="数据权限设置" Visible="False">
            <asp:Label ID="Label1" runat="server" Text="数据权限描述" Width="121px"></asp:Label>
            <asp:TextBox ID="txtDataAclDesc" runat="server" Width="303px"></asp:TextBox><font color="red">&nbsp;*</font><br />
            <table width="99%" class="fromtable" style="border-right: #ffcc66 thin dotted; border-top: #ffcc66 thin dotted; margin: 2px; border-left: #ffcc66 thin dotted; border-bottom: #ffcc66 thin dotted">
                <tr>
                    <td class="divtitle">
                        数据范围</td>
                    <td class="divtitle" width="50%">
                        授权人</td>
                </tr>
                <tr>
                    <td valign="top" style="width: 50%; height: 210px" bgcolor="azure">
           
                        <asp:SmartGridView ID="GridView2" runat="server" AutoGenerateColumns="False" Width="95%"  onrowdatabound="GridView2_RowDataBound"
                        OnRowDeleting="GridView2_RowDeleting"  DataKeyNames="ID" SkinID ="sgv3" >
                            <Columns>
                                <asp:BoundField DataField="ID" HeaderText="ID" />
                                <asp:BoundField DataField="FieldName" HeaderText="属性名" />
                                <asp:BoundField DataField="Operator" HeaderText="操作" />
                                <asp:BoundField DataField="FieldText" HeaderText="值" />
       
                                <asp:TemplateField ShowHeader="False">
                                    <ItemTemplate>
                                    <asp:HiddenField ID="hfRowCount" runat="server" /> 
                                        <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" CommandName="Delete"
                                            Text="删除" OnClientClick="return confirm('确定删除该数据权限吗？');"></asp:LinkButton>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:SmartGridView>
                       
                        <asp:Label ID="Label2" runat="server" Text="部门" Width="42px"></asp:Label><asp:DropDownList ID="ddlDeptID" runat="server"  >
                        </asp:DropDownList>
                        <asp:Button ID="btnNew1" runat="server" Text="添加部门"  class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnNewDept_Click"   /><br />
                        <asp:Label ID="Label4" runat="server" Text="人员" Width="42px" Visible="false"></asp:Label>
                        <asp:DropDownList ID="ddlUserID" runat="server"    Width="66px" Visible="false" >
                        </asp:DropDownList>
                        <asp:Button ID="Button1" Visible="false" runat="server" Text="添加人员" OnClick="btnNewUser_Click"   /><br />
                        <asp:Button ID="btnAddAllDept" runat="server" Text="添加所有部门"  class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnAddAllDept_Click" />
                        <asp:Button ID="btnDelAllDept" runat="server" Text="取消所有部门"  class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnDelAllDept_Click" /></td>
                    <td valign="top" width="50%" style="height: 210px" bgcolor="azure">
                    
                        <asp:SmartGridView ID="GridView3" runat="server" AutoGenerateColumns="False" Width="99%"  onrowdatabound="GridView3_RowDataBound"
                        OnRowDeleting="GridView3_RowDeleting"   DataKeyNames="ID" SkinID ="sgv3" >
                       
                            <Columns>
                                <asp:BoundField DataField="ID" HeaderText="ID" />
                                <asp:BoundField DataField="CnName" HeaderText="姓名" />
 
                                <asp:TemplateField ShowHeader="False">
                                    <ItemTemplate>
                                    <asp:HiddenField ID="hfRowCount1" runat="server" /> 
                                        <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" CommandName="Delete"
                                            Text="删除" OnClientClick="return confirm('确定删除该数据吗？');"></asp:LinkButton>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:SmartGridView>
                        人员：<asp:DropDownList ID="ddlUserList" runat="server">
                        </asp:DropDownList>
                        <asp:Button ID="btnNew2" runat="server" Text="添加"  class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnNew2_Click" /></td>
                </tr>
                <tr>
                    <td align="center" colspan="2">
                        <asp:HiddenField ID="hfID" runat="server" />
                        <asp:HiddenField ID="hfFieldValue" runat="server" />
                        <asp:HiddenField ID="hfFieldText" runat="server"  />
                        <asp:HiddenField ID="hfState" runat="server" />
                        <asp:Button ID="btnSave" runat="server" Text="保存"  class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnSave_Click"   /></td>
                </tr>
            </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
 
</asp:Content>
