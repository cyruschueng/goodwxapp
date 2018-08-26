<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.order.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程订单">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>课程名</td>
                        <td><asp:TextBox ID="txtCourseName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>购购人</td>
                        <td><asp:TextBox ID="txtName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>电话</td>
                        <td><asp:TextBox ID="txtTelephone" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>购买日期</td>
                        <td><asp:TextBox ID="txtOrderDateTime" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server" style=" width:98%;"></asp:TextBox></td>
                </tr>
                <tr>
                        <td>
                            <asp:DropDownList ID="ddlSalesPlatform" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="家教智慧订阅号" Value="0" ></asp:ListItem>
                                <asp:ListItem Text="家教智慧服务号" Value="1"></asp:ListItem>
                                <asp:ListItem Text="顾问平台" Value="2"></asp:ListItem>
                                <asp:ListItem Text="其它" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>状态</td>
                        <td>
                            <asp:DropDownList ID="ddlIsAct" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="已支付" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="未支付" Value="0"></asp:ListItem>
                                <asp:ListItem Text="已退款" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td colspan="4"><asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click"  /></td>
                </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="Id"
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
                    <asp:BoundField DataField="Name" HeaderText="购买人" ReadOnly="true" />
                    <asp:BoundField DataField="Telephone" HeaderText="电话" ReadOnly="true" />
                    <asp:BoundField DataField="Price" HeaderText="单价"  ReadOnly="true"/>
                    <asp:BoundField DataField="BuyNumber" HeaderText="数量"  ReadOnly="true"/>
                    <asp:BoundField DataField="OrderDateTime" HeaderText="购买日期"  ReadOnly="true"/>
                    <asp:BoundField DataField="Tradeno" HeaderText="单号"  ReadOnly="true"/>
                    <asp:BoundField DataField="CourseName" HeaderText="课程"  ReadOnly="true"/>
                    <asp:BoundField DataField="SalesPlatform" HeaderText="销售平台" ReadOnly="true" />
                    <asp:BoundField DataField="Referrer" HeaderText="推荐人"  ReadOnly="true"/>
                    <asp:BoundField DataField="IsAct" HeaderText="状态"  ReadOnly="true"/>
                    <asp:BoundField DataField="Remark" HeaderText="备注"  ReadOnly="true"/>
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
