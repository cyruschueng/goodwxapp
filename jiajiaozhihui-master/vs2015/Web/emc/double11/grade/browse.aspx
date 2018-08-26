<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.double11.grade.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
<cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
    <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="">
        <asp:Panel ID="Panel1" GroupingText="活动" runat="server">
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID" MouseOverCssClass="OverRow"  SkinID="sgv1" 
                onrowdatabound="GridView1_RowDataBound" >
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px" HeaderStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" ItemStyle-Width="50px" HeaderStyle-Width="50px" />
                    <asp:BoundField DataField="GradeName" HeaderText="等级名称" ReadOnly="true" HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="150px" HeaderStyle-Width="150px" />
                    <asp:BoundField DataField="Grade" HeaderText="等级" ReadOnly="true" HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="150px" HeaderStyle-Width="150px" />
                    <asp:BoundField DataField="LowerLimit" HeaderText="下限" ReadOnly="true" HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="100px" HeaderStyle-Width="100px" />
                    <asp:BoundField DataField="UpperLimit" HeaderText="上限"  ReadOnly="true" ItemStyle-Width="80px" HeaderStyle-Width="80px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" />
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
            </asp:SmartGridView>
        </asp:Panel>
    </cc1:TabOptionItem>
</cc1:TabOptionWebControls>

</asp:Content>
