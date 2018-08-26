<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.tempmsg.wx.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="模版消息">
            <asp:Panel ID="Panel1" GroupingText="" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" id="tableView" class="fromtable">
                    <tr>
                        <td>模版号</td>
                        <td><asp:DropDownList ID="ddlTemp" runat="server"></asp:DropDownList></td>
                        <td>发布日期</td>
                        <td><asp:TextBox ID="txtSendDate" runat="server"></asp:TextBox></td>
                        <td>是否发布</td>
                        <td>
                            <asp:RadioButtonList ID="rblIsSend" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="发布" Value="1"></asp:ListItem>
                                <asp:ListItem Text="未发布" Value="0"></asp:ListItem>
                                <asp:ListItem Text="全部" Value="" Selected="True"　></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td>是否有效</td>
                        <td>
                            <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="有效" Value="1"></asp:ListItem>
                                <asp:ListItem Text="无效" Value="0"></asp:ListItem>
                                <asp:ListItem Text="全部" Value="" Selected="True"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td><asp:Button ID="btnSearch" Text="查询" OnClick="btnSearch_Click"　class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" runat="server" /></td>
                        <td><input type="button" id="btnAutoSend" value="启动模板消息自动发布" ></input> </td>
                    </tr>
                </table>
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id"  MouseOverCssClass="OverRow"  
                    SkinID="sgv1" onrowdatabound="GridView1_RowDataBound" >
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
                        <asp:BoundField DataField="TempId" HeaderText="模版号" ReadOnly="true" />
                        <asp:BoundField DataField="Title" HeaderText="标题"  ReadOnly="true"/>
                        <asp:BoundField DataField="IsSend" HeaderText="是否发送"  ReadOnly="true"/>
                        <asp:BoundField DataField="SendDate" HeaderText="发送日期"  ReadOnly="true"/>
                        <asp:BoundField DataField="IsAct" HeaderText="是否有效"  ReadOnly="true"/>
                        <asp:BoundField DataField="CreateDate" HeaderText="创建日期" ReadOnly="true" />

                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
                <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
