<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.hrm.newemp.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
  
    <cc1:TabOptionWebControls ID="TabOWC" runat="server">
        <cc1:TabOptionItem ID="TabOItem1" runat="server" Tab_Name="新进员工">
        <table class="fromtable1" style="width:98%"><tr><td>
             <asp:Label ID="Label1" runat="server" Width="73px" Text="用户名"></asp:Label>
            <asp:TextBox ID="txtUserName" runat="server"></asp:TextBox>
          
            <asp:Label ID="Label2" runat="server" Width="73px" Text="姓名"></asp:Label>&nbsp;<asp:TextBox
                ID="txtCnName" runat="server"></asp:TextBox>&nbsp; 
            <asp:Label ID="Label3" runat="server" Text="部门" Width="71px"></asp:Label>
            <asp:TextBox ID="txtDeptName" runat="server" Width="150px"></asp:TextBox>
            <asp:Button ID="BtnSearch" OnClick="BtnSearch_Click" runat="server" Text="查询" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"></asp:Button>
        </td></tr></table><br />
            <asp:SmartGridView ID="GridView1" runat="server" Width="98%" AutoGenerateColumns="False" AllowPaging="True" DataKeyNames="UserName"  OnRowDataBound="GridView1_RowDataBound" 
                PageSize="20"   OnPageIndexChanging="GridView1_PageIndexChanging" SkinID ="sgv1" >
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
                    <asp:BoundField DataField="PostName" SortExpression="PostName" HeaderText="岗位"></asp:BoundField>
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
