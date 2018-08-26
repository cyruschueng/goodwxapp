<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.libao.bag.update" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="打包">
            <asp:Panel ID="Panel1" Enabled="false"  GroupingText="设置包名" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td  style=" width:100px;">设置包名：</td>
                        <td>
                            <asp:DropDownList ID="ddlBag" runat="server"></asp:DropDownList>
                        </td>
                        <td>
                            <asp:Button ID="btnSave" runat="server" class="btn" 
                            onmouseout="this.className='btn'" 
                                onmouseover="this.className='btn_mouseover'"  Text="确认" 
                                onclick="btnSave_Click" />
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="Panel2" GroupingText="默认产品" runat="server">
                <style>
                    select{ width:80%;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td style=" width:100px;">请选择产品：</td>
                        <td>
                            <asp:DropDownList ID="ddlDefaultProduct"  runat="server"></asp:DropDownList>
                        </td>
                        <td>
                            <asp:Button ID="btnAddDefaultProduct"  runat="server" class="btn" 
                            onmouseout="this.className='btn'" 
                                onmouseover="this.className='btn_mouseover'"  Text="添加默认产品" 
                                onclick="btnAddDefaultProduct_Click" />
                        </td>
                    </tr>
                </table>
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="ID" MouseOverCssClass="OverRow" SkinID="sgv1" 
                    onrowcommand="GridView1_RowCommand" onrowdeleting="GridView1_RowDeleting" >
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
                        <asp:BoundField DataField="GoodName" HeaderText="公益品" ReadOnly="true" />
                        <asp:BoundField DataField="MarketPrice" HeaderText="市场价"  ReadOnly="true"/>
                        <asp:BoundField DataField="Depreciate" HeaderText="降价"  ReadOnly="true"/>
                        <asp:BoundField DataField="Discount" HeaderText="折扣率"  ReadOnly="true"/>
                        <asp:BoundField DataField="PublicPrice" HeaderText="公益价" ReadOnly="true" />
                        <asp:BoundField DataField="Number" HeaderText="数量" ReadOnly="true" />
                        <asp:BoundField DataField="IsRosebery" HeaderText="货到付款" ReadOnly="true"  />
                        <asp:BoundField DataField="IsOnlinePayment" HeaderText="在线支付" ReadOnly="true"  />
                        <asp:BoundField DataField="CreateDate" HeaderText="创建日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" />
                        <asp:TemplateField HeaderText="排序">
                            <ItemTemplate>
                                <asp:Label ID="lbOrderBy" runat="server" Text='<%#Eval("OrderBy") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                            <EditItemTemplate>
                                <asp:TextBox ID="txtOrderBy" runat="server" Text='<%#Eval("OrderBy") %>'></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="操作">
                            <ItemTemplate>
                                <asp:LinkButton ID="btnDelete" Text="删除" CommandName="Delete" CommandArgument='<%#Eval("ID") %>' runat="server"  />
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

            <asp:Panel ID="Panel3" GroupingText="可选产品" runat="server">
                
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td style=" width:100px;">请选择产品：</td>
                        <td>
                            <asp:DropDownList ID="ddlOptionalProduct"  runat="server"></asp:DropDownList>
                        </td>
                        <td>
                            <asp:Button ID="btnAddOptionalProduct"  runat="server" class="btn" 
                            onmouseout="this.className='btn'" 
                                onmouseover="this.className='btn_mouseover'"  Text="添加可选产品" 
                                onclick="btnAddOptionalProduct_Click" />
                        </td>
                    </tr>
                </table>
                <asp:SmartGridView ID="GridView2" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="ID" MouseOverCssClass="OverRow" SkinID="sgv1" 
                    onrowcommand="GridView2_RowCommand" onrowdeleting="GridView2_RowDeleting" >
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
                        <asp:BoundField DataField="GoodName" HeaderText="公益品" ReadOnly="true" />
                        <asp:BoundField DataField="MarketPrice" HeaderText="市场价"  ReadOnly="true"/>
                        <asp:BoundField DataField="Depreciate" HeaderText="降价"  ReadOnly="true"/>
                        <asp:BoundField DataField="Discount" HeaderText="折扣率"  ReadOnly="true"/>
                        <asp:BoundField DataField="PublicPrice" HeaderText="公益价" ReadOnly="true" />
                        <asp:BoundField DataField="Number" HeaderText="数量" ReadOnly="true" />
                        <asp:BoundField DataField="IsRosebery" HeaderText="货到付款" ReadOnly="true"  />
                        <asp:BoundField DataField="IsOnlinePayment" HeaderText="在线支付" ReadOnly="true"  />
                        <asp:BoundField DataField="CreateDate" HeaderText="创建日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" />
                        <asp:TemplateField HeaderText="排序">
                            <ItemTemplate>
                                <asp:Label ID="lbOrderBy" runat="server" Text='<%#Eval("OrderBy") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                            <EditItemTemplate>
                                <asp:TextBox ID="txtOrderBy" runat="server" Text='<%#Eval("OrderBy") %>'></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="操作">
                            <ItemTemplate>
                                <asp:LinkButton ID="btnDelete" Text="删除" CommandName="Delete" CommandArgument='<%#Eval("ID") %>' runat="server"  />
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
   <asp:HiddenField ID="hfProductIDBags" runat="server" />
   <asp:HiddenField ID="hfID" runat="server" />
   <asp:HiddenField ID="hfMode" runat="server" />
</asp:Content>
