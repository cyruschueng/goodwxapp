<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" EnableEventValidation = "false"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.double11.order.browse" Title="无标题页" %>  
    

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <style>
                .fromtable select {width:95%}
            </style>
            <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
            <script>
                function import() {
                    alert("dd");
                    return false;
                    //$("#<%=fileUpload.ClientID %>").click();
                }
            </script>
            <table class="fromtable">
                <tr style=" display:none;">
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                    <td style="width:10%"></td>
                    <td style="width:15%"></td>
                </tr>
                <tr>
                    <td>订单号</td>
                    <td colspan="7">
                        <asp:TextBox ID="txtTradeno" runat="server" Width="95%"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td >产品名称：</td>
                    <td>
                        <asp:TextBox ID="txtGoodsName" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    <td >备注：</td>
                    <td>
                        <asp:TextBox ID="txtRemark" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    <td >是否已发货：</td>
                    <td>
                        <asp:DropDownList ID="ddlIsSend" runat="server" CssClass=".select" >
                            <asp:ListItem Value="1" Text="已发货"></asp:ListItem>
                            <asp:ListItem Value="0" Text="未发货" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="2" Text="退货"></asp:ListItem>
                            <asp:ListItem Value="-1" Text="无效" ></asp:ListItem>
                            <asp:ListItem Value="11" Text="VIP" ></asp:ListItem>
                            <asp:ListItem Value=""  Text="所有"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                    <td >发货日期</td>
                    <td ><asp:CalendarTextBox ID="txtSendDate" runat="server" Width="95%"></asp:CalendarTextBox></td>
                </tr>
                <tr>
                    <td >订购人</td>
                    <td ><asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox></td>
                    <td >联系电话</td>
                    <td ><asp:TextBox ID="txtTelephone" runat="server" Width="95%"></asp:TextBox></td>
                    <td >收货地址</td>
                    <td><asp:TextBox ID="txtAddress"  runat="server" Width="95%" ></asp:TextBox></td>
                    <td >订购日期</td>
                    <td><asp:CalendarTextBox ID="txtOrderDate" runat="server" Width="95%"></asp:CalendarTextBox></td>
                </tr>
                <tr>
                    <td >支付方式</td>
                    <td ><asp:DropDownList ID="ddlPayModel"  runat="server">
                        <asp:ListItem Text="" Value="" Selected="True" ></asp:ListItem>
                        <asp:ListItem Text="货到付款" Value="0" ></asp:ListItem>
                        <asp:ListItem Text="微支付" Value="1" ></asp:ListItem>
                    </asp:DropDownList></td>
                    <td >是否收款</td>
                    <td><asp:DropDownList ID="ddlPay"   runat="server">
                        <asp:ListItem Text="" Value=""  Selected="True"></asp:ListItem>
                        <asp:ListItem Text="已收款" Value="1" ></asp:ListItem>
                        <asp:ListItem Text="未收款" Value="0"></asp:ListItem>
                    </asp:DropDownList>  </td>
                    <td colspan="3" >
                            <asp:FileUpload ID="fileUpload"  runat="server" />
                            &nbsp;&nbsp;
                            <asp:Button ID="btnSend" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                            Text="导入发货单"  onclick="btnSend_Click"   />&nbsp;&nbsp;

                             &nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:Button ID="btn_export" runat="server" class="btn" 
                                OnClick="btn_export_Click" onmouseout="this.className='btn'" 
                                onmouseover="this.className='btn_mouseover'" Text="导出订单" />

                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <asp:Button ID="btnSearch" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                            Text="查询" onclick="btnSearch_Click"  />&nbsp;&nbsp;
                    </td>
                </tr>
             </table>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onrowcommand="GridView1_RowCommand" >
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" ItemStyle-Width="30px" />
                    <asp:BoundField DataField="goodname" HeaderText="产品名称" ReadOnly="true" ItemStyle-Width="150px" />
                    <asp:BoundField DataField="Name" HeaderText="订购人" ReadOnly="true" ItemStyle-Width="80px" />
                    <asp:BoundField DataField="TelePhone" HeaderText="联系电话" ReadOnly="true" ItemStyle-Width="100px" />
                    <asp:BoundField DataField="Address" HeaderText="详细地址" ReadOnly="true"  ItemStyle-Width="300px" />
                    <asp:BoundField DataField="PayNumber" HeaderText="订购数量" ReadOnly="true" ItemStyle-Width="60px" />
                    <asp:BoundField DataField="Price" HeaderText="单价" ReadOnly="true" />
                    <asp:BoundField DataField="Paymode" HeaderText="支付方式" ReadOnly="true" />
                    <asp:BoundField DataField="Tradeno" HeaderText="订单号" ReadOnly="true" />
                    <asp:BoundField DataField="Logistics" HeaderText="物流公司" ReadOnly="true" />
                    <asp:BoundField DataField="LogisticsSN" HeaderText="物流单号" ReadOnly="true" />
                    <asp:BoundField DataField="Remark" HeaderText="备注" ItemStyle-Width="60px" ReadOnly="true" />
                    <asp:BoundField DataField="OrderDate" HeaderText="订购日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" ItemStyle-Width="100px" />
                    <asp:TemplateField HeaderText="操作">
                        <ItemTemplate>
                            <asp:LinkButton ID="btnVoid" CommandName="void" Text="作废" OnClientClick="return setVoid();" CommandArgument='<%# Eval("ID") %>' runat="server"></asp:LinkButton>
                            <!--<asp:LinkButton ID="btnVIP" CommandName="vip" Text="VIP" OnClientClick="return setVip();" CommandArgument='<%# Eval("ID") %>' runat="server"></asp:LinkButton>-->
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
            <script>
                function setVoid() {
                    if (confirm("确认此单作废吗？")) {
                        return true;
                    }
                    return false;
                }
                function setVip() {
                    if (confirm("确认此单Vip？")) {
                        return true;
                    }
                    return false;
                }
            </script>
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
