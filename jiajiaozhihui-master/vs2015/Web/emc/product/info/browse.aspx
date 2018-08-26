<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.product.info.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="产品信息">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>产品名称</td>
                        <td><asp:TextBox ID="txtGoodsName" runat="server" style=" width:98%;"></asp:TextBox></td>
                         <td align="left" height="25" style="width: 100px">产品类型</td>
                        <td align="left" height="25" style="width: 269px">
                            <asp:DropDownList ID="ddlGoodsType" runat="server">
                                <asp:ListItem Text="请选择产品类型" Value=""></asp:ListItem>
                                <asp:ListItem Text="国学达人擂台赛奖品" Value="20161212"></asp:ListItem>
                                <asp:ListItem Text="课程练习奖品" Value="20161213"></asp:ListItem>
                                <asp:ListItem Text="课程实践奖品" Value="20161214"></asp:ListItem>
                                <asp:ListItem Text="亲子书法" Value="20161215"></asp:ListItem>
				                <asp:ListItem Text="神尔听听" Value="20161216"></asp:ListItem>
                                <asp:ListItem Text="推客奖品" Value="20161217"></asp:ListItem>
                                <asp:ListItem Text="二维码产品" Value="20161218"></asp:ListItem>
				                <asp:ListItem Text="家教问答打赏" Value="20161219"></asp:ListItem>
                                <asp:ListItem Text="吸粉-推荐书" Value="20161220"></asp:ListItem>
                                <asp:ListItem Text="吸粉-四大名著" Value="20161221"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>是否启用</td>
                        <td><asp:DropDownList ID="ddlIsAct" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="启用" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td><asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click1"  /></td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onrowcancelingedit="GridView1_RowCancelingEdit" 
                onrowediting="GridView1_RowEditing" onrowupdating="GridView1_RowUpdating">
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
                    <asp:BoundField DataField="GoodName" HeaderText="产品名称" ReadOnly="true" />
                    <asp:BoundField DataField="MarketPrice" HeaderText="市场价"  ReadOnly="true"/>
                    <asp:BoundField DataField="PublicPrice" HeaderText="优惠价" ReadOnly="true" />
                    <asp:BoundField DataField="Number" HeaderText="数量" ReadOnly="true" />
                    <asp:BoundField DataField="CreateDate" HeaderText="创建日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" />
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
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
