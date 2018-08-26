<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sm.msg.browse" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">

    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="保障卡列表">
            <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False"
             Width="99%" OnPageIndexChanging="GridView1_PageIndexChanging"
                DataKeyNames="ID" MouseOverCssClass="OverRow"
                SkinID="sgv1" onrowdatabound="GridView1_RowDataBound" >
                <Columns>   
                <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField> 
                    <asp:BoundField DataField="sendurl" HeaderText="请求地址" ItemStyle-Width="35%" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center"  /> 
                    <asp:BoundField DataField="lname" HeaderText="帐号参数值" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center"  />
                    <asp:BoundField DataField="pwd" HeaderText="密码参数值" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="cId" HeaderText="企业Id参数值" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="isdefault" HeaderText="默认接口" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="msglength" HeaderText="内容长度" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />      
                    <asp:BoundField DataField="maxcount" HeaderText="最大发送量" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" /> 
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfMID" runat="server" />
    <asp:HiddenField ID="hfJoinMansID" runat="server" />
</asp:Content>
