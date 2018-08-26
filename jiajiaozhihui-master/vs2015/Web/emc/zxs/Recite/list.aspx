<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.zxs.recite.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <link href="../../css/reveal.css" rel="stylesheet" type="text/css" />
    <script src="../../../js/comm.js" type="text/javascript"></script>
    <script src="../../js/jquery.reveal.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
        <asp:Panel ID="panel2" runat="server">
            <table border="0" cellpadding="0" cellspacing="0" style="width:100%" class="fromtable">
                <tr>
                    <td>手机号</td>
                    <td><asp:TextBox TextMode="Phone"  ID="txtPhone" runat="server"></asp:TextBox></td>
                    <td>昵称</td>
                    <td><asp:TextBox ID="txtNickName"   runat="server"></asp:TextBox></td>
                    <td>状态</td>
                    <td>
                        <asp:RadioButtonList ID="rblState" RepeatDirection="Horizontal" runat="server">
                            <asp:ListItem Text="申请" Value="0"></asp:ListItem>
                            <asp:ListItem Text="审核通过" Value="1"></asp:ListItem>
                            <asp:ListItem Text="审核未通过" Value="2"></asp:ListItem>
                            <asp:ListItem Text="所有的" Value="" Selected=True></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                    <td>用户类型</td>
                    <td>
                        <asp:RadioButtonList ID="rblPlayerType" RepeatDirection="Horizontal" runat="server">
                            <asp:ListItem Text="挑战者" Value="1"></asp:ListItem>
                            <asp:ListItem Text="爱好者" Value="2"></asp:ListItem>
                            <asp:ListItem Text="所有的" Value="" Selected=True></asp:ListItem >
                        </asp:RadioButtonList>
                    </td>
                    <td>
                        <asp:Button ID="btnSearch" runat="server" class="btn" 
                            onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"  
                            Text="查询" onclick="btnSearch_Click" />
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" 
                    OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating"
                    OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowDataBound="GridView1_RowDataBound"
                    DataKeyNames="Id" AllowPaging="True" PageSize="50" 
                      OnPageIndexChanging="GridView1_PageIndexChanging" >
                    <Columns>
                        <asp:BoundField DataField="Id" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="ThemeTitle" HeaderText="主题名称" ReadOnly="True">
                            <ItemStyle Width="100px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TaskTitle" HeaderText="任务名称" ReadOnly="True">
                            <ItemStyle Width="100px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="NickName" HeaderText="昵称"  ReadOnly="true"/>
                        <asp:BoundField DataField="Mobile" HeaderText="手机号码"  ReadOnly="true"/>
                        <asp:TemplateField HeaderText="用户类型">
                            <ItemTemplate>
                                <asp:Label ID="Label1" Text='<%# Eval("PlayerType").ToString()=="1"?"挑战者":"爱好者" %>' runat="server"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="状态">
                            <ItemTemplate>
                                <asp:Label Text='<%# StateText(Eval("State").ToString())%>' runat="server"></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:HiddenField runat="server" ID="hfState" Value='<%# Eval("State") %>' />
                                <asp:DropDownList ID="ddlState" runat="server">
                                        <asp:ListItem Text="申请" Value="0"></asp:ListItem>
                                        <asp:ListItem Text="审核通过" Value="1"></asp:ListItem>
                                        <asp:ListItem Text="审核未通过" Value="2"></asp:ListItem>
                                </asp:DropDownList>
                            </EditItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="CreateDate" HeaderText="审请时间"  ReadOnly="True" />
                        <asp:BoundField DataField="Checker" HeaderText="审核人" ReadOnly="True" />
                        <asp:BoundField DataField="CheckDate" HeaderText="审核时间" ReadOnly="True" />
                        <asp:CommandField ShowEditButton="True" EditText="编辑">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
                </asp:SmartGridView>
                <asp:HiddenField ID="hfThemeId" runat="server" />
                <asp:HiddenField ID="hfAppId" runat="server" />
                <asp:HiddenField ID="hfTasks" runat="server" />
        </asp:Panel>
            <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="3" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>