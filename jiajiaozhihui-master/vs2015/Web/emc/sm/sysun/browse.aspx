<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.sysun.browse" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
 
     <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False"  
                Width="100%"   OnPageIndexChanging="GridView1_PageIndexChanging" DataKeyNames="ID"  OnRowDataBound="GridView1_RowDataBound"  MouseOverCssClass="OverRow" SkinID="sgv1">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" ItemStyle-Width="40px"/>
                     <asp:BoundField DataField="SysShortName" HeaderText="英文简称"  ItemStyle-Width="80px"/>
                    <asp:BoundField DataField="SysName" HeaderText="系统名称"  />
                    <asp:BoundField DataField="SysType" HeaderText="系统类型" ItemStyle-Width="70px"/>
                    <asp:BoundField DataField="SysUrl" HeaderText="系统地址"   />
                    <asp:BoundField DataField="IsAct" HeaderText="是否可用" ItemStyle-Width="70px"/>
                </Columns>
               <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="TopAndBottom"></PagerSettings>
            </asp:SmartGridView>
            <asp:HiddenField ID="hfMID" runat="server" />
    <script  type="text/javascript" language="javascript">
        function add_onClick() {
            ShowIframe('新增', 'update.aspx?ID=&mode=add', '850', '450')
        }
    </script>
</asp:Content>
