<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.brainsexpert.activity.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    
    <link href="../css/style.css" rel="stylesheet" type="text/css" />
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<div>
    <!--题库-->
    <div class="tree_content">
        <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
             <tr>
                 <td style="width:100px;">活动名称</td>
                  <td style="width:150px;"><asp:TextBox ID="txtActivityName" runat="server"></asp:TextBox></td>
                  &nbsp;&nbsp;&nbsp;
                  <td style="width:50px;">是否启用</td>
                  <td style="width:250px;">
                        <asp:RadioButtonList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                            <asp:ListItem Text="启用" Value="1"></asp:ListItem>
                            <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            <asp:ListItem Text="全部" Value="2" Selected="True"></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                   <td style="width:50px;">栏目</td>
                  <td style="width:250px;">
                        <asp:RadioButtonList ID="rblStatus" RepeatDirection="Horizontal" runat="server">
                            
                        </asp:RadioButtonList>
                    </td>
                 <td><asp:Button  ID="btnSearch" class="btn" Text="查询" runat="server" 
                         onclick="btnSearch_Click" /></td>
             </tr>
         </table>
        <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
            <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="活动">
                <asp:Panel ID="Panel1" GroupingText="" runat="server">
                    <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                        Width="99%"  DataKeyNames="ID" MouseOverCssClass="OverRow"  SkinID="sgv1" 
                        onrowdatabound="GridView1_RowDataBound" >
                        <Columns>
                            <asp:TemplateField ItemStyle-Width="20px" HeaderStyle-Width="20px">
                                <HeaderTemplate>
                                    <asp:CheckBox ID="all" runat="server" />
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:CheckBox ID="item" runat="server" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" ItemStyle-Width="50px" HeaderStyle-Width="50px" />
                            <asp:BoundField DataField="ActivityName" HeaderText="活动名称" ReadOnly="true" HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="150px" HeaderStyle-Width="150px" />
                            <asp:BoundField DataField="UsingData" HeaderText="使用题库" ReadOnly="true" HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="100px" HeaderStyle-Width="100px" />

                            <asp:BoundField DataField="Status" HeaderText="状态"  ReadOnly="true" ItemStyle-Width="80px" HeaderStyle-Width="80px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="Allocation" HeaderText="题目分配"  ReadOnly="true"  HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="InitTakeIn" HeaderText="初始人数"  ReadOnly="true"  HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="IsAct" HeaderText="是否启用"  ReadOnly="true"  HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="Sort" HeaderText="顺序"  ReadOnly="true"  HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:BoundField DataField="CreateDate" HeaderText="创建日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" ItemStyle-Width="100px" HeaderStyle-Width="100px" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center"  />
                            <asp:TemplateField>
                                <ItemTemplate>
                                    <a style=" padding:0 10px" href="javascript:parent.addTab('%E8%AF%BE%E7%A8%8B%E5%86%85%E5%AE%B9','/emc/brainsexpert/winner/list.aspx?ID=<%# Eval("Id") %>&state=browse&TreeModulesID=emc.wxcourse.content','subNav')"><font color=#2828FF>获奖设置</font></a>
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
        <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
        <asp:HiddenField ID="hfClassID" runat="server" />
    </div>
</div>

</asp:Content>
