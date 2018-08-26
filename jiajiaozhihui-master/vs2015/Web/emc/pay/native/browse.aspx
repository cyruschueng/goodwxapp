<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.pay.native.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="关键字回复">
            <table class="fromtable">
                <tr>
                    <td>商品ID</td>
                    <td><asp:TextBox ID="txtProductId" runat="server"></asp:TextBox></td>
                    <td>产品名称</td>
                    <td><asp:TextBox ID="txtProductName" runat="server"></asp:TextBox></td>
                    <td>商户订单前缀</td>
                    <td><asp:TextBox ID="txtOutTradeNo" runat="server"></asp:TextBox></td>
                    <td><asp:Button ID="btnSearch" runat="server" Text="查询" class="btn" OnClick="btnSearch_Click"
                            onmouseout="this.className='btn'"  onmouseover="this.className='btn_mouseover'" /></td>
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
                    <asp:BoundField DataField="product_id" HeaderText="商品ID" ItemStyle-Width="150px" ReadOnly="true"  />
                    <asp:BoundField DataField="product_name" HeaderText="商品名称" ItemStyle-Width="200px" ReadOnly="true"   />
                    <asp:BoundField DataField="body" HeaderText="商品描述" ItemStyle-Width="300px"  ReadOnly="true"  />
                    <asp:BoundField DataField="total_fee" HeaderText="标价金额(分)"  ReadOnly="true"  ItemStyle-Width="80px"  />
                    <asp:BoundField DataField="out_trade_no" HeaderText="商户订单前缀"  ReadOnly="true"  ItemStyle-Width="80px"  />
                    <asp:BoundField DataField="isact" HeaderText="是否有效"  ReadOnly="true"  ItemStyle-Width="80px"  />
                    <asp:BoundField DataField="create_date" HeaderText="创建日期"  ReadOnly="true"  ItemStyle-Width="100px"  />
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:LinkButton ID="linkQR" Text="生成支付二维码" CommandArgument='<%# Eval("product_id")+","+Eval("product_name") %>' runat="server"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
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
