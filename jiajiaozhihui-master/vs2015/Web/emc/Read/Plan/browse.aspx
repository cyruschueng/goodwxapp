<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.read.plan.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="计划信息">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <table align="center" border="0" cellpadding="0" cellspacing="0"  height="100%" width="100%" class="fromtable">
                    <tr>
                        <td>名称</td>
                        <td><asp:TextBox ID="txtPlanName" runat="server"></asp:TextBox></td>
                    
                            <td>是否启用</td>
                            <td>
                                <asp:RadioButtonList ID="rblAct" RepeatDirection="Horizontal" runat="server">
                                    <asp:ListItem  Text="启用" Value="1"></asp:ListItem>
                                    <asp:ListItem  Text="未启用" Value="0"></asp:ListItem>
                                    <asp:ListItem  Text="全部" Value=""></asp:ListItem>
                                </asp:RadioButtonList>
                            </td>  
                    
                            <td>类型</td>
                            <td>
                                <asp:RadioButtonList ID="rblType" RepeatDirection="Horizontal" runat="server">
                                    <asp:ListItem  Text="故事" Value="1"></asp:ListItem>
                                    <asp:ListItem  Text="诵读" Value="0"></asp:ListItem>
                                    <asp:ListItem  Text="全部" Value=""></asp:ListItem>
                                </asp:RadioButtonList>
                            </td>  
                    
                        <td colspan="2">
                            <asp:Button ID="btnSearch"   class="btn"  Text="确认"
                                onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                runat="server" onclick="btnSearch_Click"  /></td>
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
                        <asp:BoundField DataField="PlanName" HeaderText="名称" ReadOnly="true" />
                        <asp:BoundField DataField="FileType" HeaderText="类型"  ReadOnly="true"/>
                        <asp:BoundField DataField="IsAct" HeaderText="是否启用"  ReadOnly="true"/>
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
