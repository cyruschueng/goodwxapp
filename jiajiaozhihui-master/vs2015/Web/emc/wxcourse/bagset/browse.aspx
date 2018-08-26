<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.bagset.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程">
            
            <asp:Panel ID="Panel1" GroupingText="基础条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>包名</td>
                        <td><asp:TextBox ID="txtBagName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>媒体类型</td>
                        <td>
                            <asp:DropDownList ID="ddlMediaType" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="视频" Value="1"></asp:ListItem>
                                <asp:ListItem Text="单音频" Value="2"></asp:ListItem>
                                <asp:ListItem Text="多音频" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                        </td>

                        <td>
                            <asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click"  />
                        </td>
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
                        <asp:BoundField DataField="BagName" HeaderText="课程包名" ReadOnly="true" />
                        <asp:BoundField DataField="OriginalPrice" HeaderText="原价" ReadOnly="true" />
                        <asp:BoundField DataField="PreferentialPrice" HeaderText="优惠价" ReadOnly="true" />
                        <asp:BoundField DataField="BuyNumber" HeaderText="购买量" ReadOnly="true" />
                        <asp:BoundField DataField="BuyNumber1" HeaderText="虚拟量" ReadOnly="true" />
                        <asp:TemplateField HeaderText="媒体类型">
                            <ItemTemplate>
                                 <asp:Label ID="Label1" runat="server" Text='<%# Eval("MediaType").ToString() == "1" ? "视频" : (Eval("MediaType").ToString() == "2" ? "单音频" : "多音频") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
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
