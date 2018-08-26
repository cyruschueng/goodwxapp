<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.fault.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="学习卡激活容错">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td><asp:TextBox ID="txtCardId" TextMode="Number" placeholder="卡Id" runat="server" ></asp:TextBox></td>
                        <td><asp:TextBox ID="txtCardNo" placeholder="卡编号" runat="server" ></asp:TextBox></td>
                        <td>
                            <asp:RadioButtonList ID="rbState" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="已处理" Value="1"></asp:ListItem>
                                <asp:ListItem Text="未处理" Selected="True" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td><asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click"  /></td>
                    </tr>
                </table>
            </asp:Panel>
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
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" />
                    <asp:BoundField DataField="CardId" HeaderText="卡Id" ReadOnly="true" />
                    <asp:BoundField DataField="CardType" HeaderText="卡类型"  ReadOnly="true"/>
                    <asp:BoundField DataField="CardNo" HeaderText="卡编号"  ReadOnly="true"/>
                    <asp:BoundField DataField="OpenId" HeaderText="昵称"  ReadOnly="true"/>
                    <asp:BoundField DataField="IpAddress" HeaderText="公益价" ReadOnly="true" />
                    <asp:BoundField DataField="RegistDate" HeaderText="申请日期" DataFormatString="{0:yyyy-MM-dd HH:mm:ss}" ReadOnly="true" />

                    <asp:TemplateField HeaderText="是否有效">
                        <ItemTemplate><%# Eval("IsAct").ToString()=="1"?"有效":""  %></ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField  HeaderText="是否审核">
                        <ItemTemplate><%# Eval("IsAgree").ToString()=="1"?"已审核":""  %></ItemTemplate>
                    </asp:TemplateField>

                    <asp:BoundField DataField="AgreeDate" HeaderText="审核日期" DataFormatString="{0:yyyy-MM-dd HH:mm:ss}"  ReadOnly="true"  />
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:LinkButton ID="lbtnCheck" Text='<%# Eval("IsAgree").ToString()=="1"?"完成":"审核"  %>'  CommandName='<%# "name"+Eval("IsAgree").ToString() %>'  CommandArgument='<%# Eval("Id") %>' runat="server"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
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
