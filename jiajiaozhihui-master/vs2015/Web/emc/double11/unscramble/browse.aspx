<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.double11.unscramble.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>书名</td>
                        <td>
                            <asp:DropDownList ID="ddlBookName" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="《弟子规》" Value="《弟子规》" ></asp:ListItem>
                                <asp:ListItem Text="《三字经》" Value="《三字经》" ></asp:ListItem>
                                <asp:ListItem Text="《千字文》" Value="《千字文》" ></asp:ListItem>
                                <asp:ListItem Text="《诫子书》" Value="《诫子书》" ></asp:ListItem>
                                <asp:ListItem Text="《声律启蒙》上" Value="《声律启蒙》上" ></asp:ListItem>
                                <asp:ListItem Text="《声律启蒙》下" Value="《声律启蒙》下" ></asp:ListItem>
                                <asp:ListItem Text="《唐诗选》" Value="《唐诗选》" ></asp:ListItem>
                                <asp:ListItem Text="《孝经》" Value="《孝经》" ></asp:ListItem>
                                <asp:ListItem Text="《格言别录》" Value="《格言别录》" ></asp:ListItem>
                                <asp:ListItem Text="《大学》" Value="《大学》" ></asp:ListItem>
                                <asp:ListItem Text="《中庸》" Value="《中庸》" ></asp:ListItem>
                                <asp:ListItem Text="《论语》上" Value="《论语》上" ></asp:ListItem>
                                <asp:ListItem Text="《论语》中" Value="《论语》中" ></asp:ListItem>
                                <asp:ListItem Text="《论语》下" Value="《论语》下" ></asp:ListItem>
                                <asp:ListItem Text="《老子道德经》" Value="《老子道德经》" ></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>页码</td>
                        <td><asp:TextBox ID="txtPageIndex" TextMode="Number" runat="server" style=" width:98%;"></asp:TextBox></td>

                        <td><asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click"  /></td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
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
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" />
                    <asp:BoundField DataField="BookName" HeaderText="书名" ReadOnly="true" />
                    <asp:BoundField DataField="PageIndex" HeaderText="页码" ReadOnly="true" />
                    <asp:BoundField DataField="IsAct" HeaderText="是否启用" ReadOnly="true" />
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="20" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
