<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.life.exchange.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td style="width:100px;">公益品类型</td>
                    <td style="width:150px;"><asp:DropDownList ID="ddlGoodsType" runat="server" 
                            AutoPostBack="true"  Width="95%" 
                            onselectedindexchanged="ddlGoodsType_SelectedIndexChanged"></asp:DropDownList></td>
                    <td style="width:100px;">公益品名称</td>
                    <td style="width:150px;"><asp:TextBox ID="txtGoodName" runat="server" Width="30%"></asp:TextBox></td>
                    <td style="width:100px;">
                        <asp:Button ID="btnSearch" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                            Text="查询" onclick="btnSearch_Click"  />&nbsp;&nbsp;
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID,GoodsType"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onpageindexchanging="GridView1_PageIndexChanging1">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" />
                    <asp:BoundField DataField="GoodName" HeaderText="公益品" />
                    <asp:BoundField DataField="Score" HeaderText="换取(积分/粉丝)" />
                    <asp:BoundField DataField="ValidityDate" HeaderText="有效期" DataFormatString="{0:yyyy-MM-dd}" />
                    <asp:BoundField DataField="Number" HeaderText="数量" />
                    <asp:BoundField DataField="CreateDate" HeaderText="创建日期" DataFormatString="{0:yyyy-MM-dd}" />
                    <asp:BoundField DataField="Creator" HeaderText="创建人"  />
                    <asp:BoundField DataField="OrderBy" HeaderText="顺序"  />
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
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="10" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
