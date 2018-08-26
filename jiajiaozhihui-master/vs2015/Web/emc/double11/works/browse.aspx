<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.double11.works.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    .select{ width:95%;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>昵称</td>
                        <td><asp:TextBox ID="txtNickName" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>状态</td>
                        <td>
                            <asp:DropDownList ID="ddlStatus" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="正常" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="违规" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>日期</td>
                        <td><asp:TextBox ID="txtCreateDate" TextMode="DateTime" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server" style=" width:98%;"></asp:TextBox></td>
                        <td>
                            <asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click1"  />

                                <asp:Button ID="btnLike" runat="server" Text="点赞"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnLike_Click" />

                                <input id="btnMyLike" type="button" value="点赞" class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" />
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onrowcancelingedit="GridView1_RowCancelingEdit" 
                onrowediting="GridView1_RowEditing" onrowupdating="GridView1_RowUpdating">
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
                    <asp:BoundField DataField="NickName" HeaderText="昵称" ReadOnly="true" />
                    <asp:TemplateField HeaderText="状态">
                        <ItemTemplate>
                            <asp:Label ID="lbIsAct" runat="server" Text='<%#Eval("IsAct") %>'></asp:Label>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                        <EditItemTemplate>
                            <asp:DropDownList ID="ddlIsAct" runat="server">
                                <asp:ListItem Text="--请选择--" Value=""></asp:ListItem>
                                <asp:ListItem Text="正常" Value="1"></asp:ListItem>
                                <asp:ListItem Text="违规" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="查看作品">
                        <ItemTemplate>
                            <a target="_blank" href="<%#Eval("ImgUrl") %>"><img style=" width:30px; height:30px;"  src='<%#Eval("ImgUrl")+"?imageView2/w/30/h/30" %>' alt="" /></a>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="Like_Number" HeaderText="点赞" ReadOnly="true" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" />

                    <asp:CommandField ShowEditButton="True" HeaderText="操作" EditText="编辑" >
                            <ItemStyle Width="70px" HorizontalAlign="Center" />
                            <HeaderStyle  HorizontalAlign="Center"/>
                        </asp:CommandField>
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
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script>
        $(function () {
            $("#btnMyLike").click(function () {
                var Flag = "1";
                var url = "../../common/Like.aspx?Flag=" + Flag;
                ShowIframe('点赞', url, '720', '400');
            });
        })
    </script>
</asp:Content>
