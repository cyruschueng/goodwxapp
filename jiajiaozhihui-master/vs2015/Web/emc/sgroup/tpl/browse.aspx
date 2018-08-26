<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.sgroup.tpl.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群模板">
            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating" >
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
                        <asp:BoundField DataField="title" HeaderText="标题" ReadOnly="true" />
                        <asp:TemplateField HeaderText="二维码X" >
                            <ItemTemplate >
                                <asp:Label ID="Label1" runat="server" Text='<%# Eval("qrcodex") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtQRCodeX" runat="server" Text='<%# Eval("qrcodex") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="二维码Y" >
                            <ItemTemplate >
                                <asp:Label ID="Label2" runat="server" Text='<%# Eval("qrcodey") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtQRCodeY" runat="server" Text='<%# Eval("qrcodey") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="二维码宽" >
                            <ItemTemplate >
                                <asp:Label ID="Label3" runat="server" Text='<%# Eval("qrcodew") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtQRCodeW" runat="server" Text='<%# Eval("qrcodew") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="二维码高" >
                            <ItemTemplate >
                                <asp:Label ID="Label4" runat="server" Text='<%# Eval("qrcodeh") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtQRCodeH" runat="server" Text='<%# Eval("qrcodeh") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField HeaderText="文字X" >
                            <ItemTemplate >
                                <asp:Label ID="Label5" runat="server" Text='<%# Eval("tagx") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtTagX" runat="server" Text='<%# Eval("tagx") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="文字Y" >
                            <ItemTemplate >
                                <asp:Label ID="Label6" runat="server" Text='<%# Eval("tagy") %>'></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtTagY" runat="server" Text='<%# Eval("tagy") %>' ></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="模版类型" >
                            <ItemTemplate >
                                <asp:Label ID="Label7" runat="server" Text='<%# Eval("catalogue").ToString()=="2"?"高级海报":"初级海报"  %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="sn" HeaderText="排序" ReadOnly="true" />
                        <asp:TemplateField HeaderText="是否有效" >
                            <ItemTemplate >
                                <asp:Label ID="Label8" runat="server" Text='<%# Eval("is_act").ToString()=="0"?"无效":"有效"  %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:CommandField ShowEditButton="true" ShowCancelButton="true"  />
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
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="60" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
