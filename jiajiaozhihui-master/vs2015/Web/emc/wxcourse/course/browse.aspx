<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.course.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程">
            
            <asp:Panel ID="Panel1" GroupingText="基础条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>课程名</td>
                        <td><asp:TextBox ID="txtName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>主题</td>
                        <td>
                            <asp:DropDownList ID="ddlTheme" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>课程类别</td>
                        <td >
                            <asp:DropDownList id="ddlCourseType" runat="server">
                                <asp:ListItem  Text="" Value=""></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>
                            <asp:CheckBox ID="cbBag" runat="server" />课程包
                            <asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click"  />
                        </td>
                    </tr>
                    <tr>
                        <td>讲师</td>
                        <td>
                            <asp:TextBox ID="txtLecturer" runat="server" style=" width:95%;"></asp:TextBox>
                        </td>
                        <td>媒体类型</td>
                        <td>
                            <asp:DropDownList ID="ddlMediaType" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="视频" Value="1"></asp:ListItem>
                                <asp:ListItem Text="单音频" Value="2"></asp:ListItem>
                                <asp:ListItem Text="多音频" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>销售状态</td>
                        <td>
                            <asp:DropDownList ID="ddlSaleState" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="上架" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="下架" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>学习状态</td>
                        <td>
                            <asp:DropDownList ID="ddlLearnState" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="开课" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="休课" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="Panel2" GroupingText="供应商" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>供应商</td>
                        <td><asp:TextBox ID="txtProviderName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>联系人</td>
                        <td><asp:TextBox ID="txtLinkMan" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>电话</td>
                        <td><asp:TextBox ID="txtMobile" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>QQ</td>
                        <td><asp:TextBox ID="txtQQ" runat="server" style=" width:98%;"></asp:TextBox></td>
                    </tr>
                </table>
            </asp:Panel>
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
                        <asp:BoundField DataField="Name" HeaderText="课程名" ReadOnly="true" />
                        <asp:BoundField DataField="Duration" HeaderText="时长"  ReadOnly="true"/>
                        <asp:BoundField DataField="Lecturer" HeaderText="讲师"  ReadOnly="true"/>
                        <asp:BoundField DataField="LearnNumber" HeaderText="学习次数"  ReadOnly="true"/>
                        <asp:BoundField DataField="OnLineDateTime" HeaderText="上架时间"  ReadOnly="true"/>
                        <asp:BoundField DataField="SaleState" HeaderText="销售状态" ReadOnly="true" />
                        <asp:BoundField DataField="LearnState" HeaderText="学习状态" ReadOnly="true" />
                        <asp:TemplateField HeaderText="媒体类型">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                 <asp:Label runat="server" Text='<%# Eval("MediaType").ToString() == "1" ? "视频" : (Eval("MediaType").ToString() == "2" ? "单音频" : "多音频") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField>
                            <ItemTemplate>
                                <a href="javascript:parent.addTab('%E8%AF%BE%E7%A8%8B%E5%86%85%E5%AE%B9','/emc/wxcourse/content/browse.aspx?ID=<%# Eval("Id") %>&state=browse&TreeModulesID=emc.wxcourse.content','subNav')"><font color=#2828FF>查看内容</font></a>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="课程练习">
                            <ItemTemplate>
                                <%# Eval("ExercisesId").ToString() %>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:TextBox ID="txtExercisesId" runat="server" Text='<%# Eval("ExercisesId").ToString() %>'></asp:TextBox>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:CommandField ShowEditButton="true" ShowCancelButton="true" />
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
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>

    
</asp:Content>
