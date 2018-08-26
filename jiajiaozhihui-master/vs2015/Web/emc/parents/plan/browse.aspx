<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.parents.plan.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="父母评测计划">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>AppId</td>
                        <td><asp:DropDownList ID="ddlAppId" runat="server">
                            <asp:ListItem Text="---全部---" Value=""></asp:ListItem>
                            <asp:ListItem Text="app001" Value="app001"></asp:ListItem>
                            <asp:ListItem Text="app002" Value="app002"></asp:ListItem>
                            <asp:ListItem Text="app003" Value="app003"></asp:ListItem>
                            <asp:ListItem Text="app004" Value="app004"></asp:ListItem>
                            <asp:ListItem Text="app005" Value="app005"></asp:ListItem>
                        </asp:DropDownList> </td>
                        <td>计划名称</td>
                        <td><asp:TextBox ID="txtPlanName" runat="server"></asp:TextBox></td>
                        <td><asp:Button ID="btnSearch"   runat="server" Text="查询" CssClass="btn" 
                                onclick="btnSearch_Click"    /></td>
                    </tr>
                </table>

                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" >
                    <Columns>
                        <asp:TemplateField ItemStyle-Width="20px">
                            <HeaderTemplate>
                                <asp:CheckBox ID="all" runat="server" />
                            </HeaderTemplate>
                            <ItemTemplate>
                                <asp:CheckBox ID="item" runat="server" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Id" HeaderText="编号" ReadOnly="true" />
                        <asp:BoundField DataField="AppId" HeaderText="活动编码" ReadOnly="true" />
                        <asp:BoundField DataField="Sn" HeaderText="第几关"  ReadOnly="true"/>
                        <asp:BoundField DataField="PlanName" HeaderText="计划名称"  ReadOnly="true"/>
                        <asp:BoundField DataField="Score" HeaderText="过关分数"  ReadOnly="true"/>
                        <asp:BoundField DataField="TestLibraryId" HeaderText="题库ID"  ReadOnly="true"/>
                        <asp:BoundField DataField="MedalName" HeaderText="证书名称"  ReadOnly="true"/>
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
