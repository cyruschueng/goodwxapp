<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.group.info.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群基本信息">
            
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td style=" width:80px;">群名</td>
                        <td style=" width:100px;"><asp:TextBox ID="txtName"  runat="server"></asp:TextBox> </td>
                        <td style=" width:80px;">群编码</td>
                        <td style=" width:100px;"><asp:TextBox ID="txtCoding"  runat="server"></asp:TextBox> </td>
                        <td style=" width:80px;">群类型</td>
                        <td style=" width:200px;"><asp:DropDownList ID="ddlType" CssClass="select" runat="server"></asp:DropDownList></td>
                        <td>
                            是否审核
                            <asp:RadioButtonList ID="rblCheck" RepeatDirection ="Horizontal" RepeatLayout="Flow" runat="server">
                                <asp:ListItem Text="审核" Value="1"></asp:ListItem>
                                <asp:ListItem Text="免审" Value="0"></asp:ListItem>
                                <asp:ListItem Text="全部" Value="" Selected="True"></asp:ListItem>
                            </asp:RadioButtonList>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            是否收费
                            <asp:RadioButtonList ID="rblPremium" RepeatDirection="Horizontal" RepeatLayout="Flow"  runat="server">
                                <asp:ListItem Text="收费" Value="1"></asp:ListItem>
                                <asp:ListItem Text="不收费" Value="0"></asp:ListItem>
                                <asp:ListItem Text="全部" Value="" Selected="True"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td>
                            <asp:Button ID="btnSearch" class="btn" onmouseout="this.className='btn'"  onmouseover="this.className='btn_mouseover'"  Text="查询" OnClick="btnSearch_Click"  runat="server"/>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
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
                        <asp:BoundField DataField="Name" HeaderText="群名" ReadOnly="true" />
                        <asp:BoundField DataField="Type" HeaderText="群类型"  ReadOnly="true"/>
                        <asp:BoundField DataField="Coding" HeaderText="群编码"  ReadOnly="true"/>
                        <asp:BoundField DataField="UpperLimit" HeaderText="群人数上限"  ReadOnly="true"/>
                        <asp:BoundField DataField="Check" HeaderText="入群是否审核"  ReadOnly="true"/>
                        <asp:BoundField DataField="IsPremium" HeaderText="入群是否收费" ReadOnly="true" />
                        <asp:BoundField DataField="Premium" HeaderText="收费金额" ReadOnly="true" />
                        <asp:BoundField DataField="CreateDate" HeaderText="创建日期" ReadOnly="true"  />
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
