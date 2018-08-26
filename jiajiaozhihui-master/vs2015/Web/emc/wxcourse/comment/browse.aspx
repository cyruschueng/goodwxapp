<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.comment.browse" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
     <script type="text/javascript" language="javascript" src="/js/comm.js"></script>
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="评论">
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td>课程&nbsp;</td>
                    <td  ><asp:TextBox ID="txtCourse" runat="server" Width="120px"></asp:TextBox></td>
                    <td>评论者&nbsp;</td>
                    <td  ><asp:TextBox ID="txtNickName" runat="server" Width="120px"></asp:TextBox></td>
                    <td  >评论&nbsp;</td>
                    <td  ><asp:TextBox ID="txtComment" runat="server" Width="120px"></asp:TextBox></td>
                    <td  >日期&nbsp;</td>
                    <td  >
                        <asp:TextBox ID="txtStartDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})"  runat="server" Width="120px"></asp:TextBox>
                        到
                        <asp:TextBox ID="txtEndDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server" Width="120px"></asp:TextBox>
                    </td>
                    <td >
                        <asp:RadioButtonList RepeatDirection="Horizontal" ID="ddlIsCheck" runat="server">
                            <asp:ListItem Text="已审核" Value="1"></asp:ListItem>
                            <asp:ListItem Text="未审核" Value="0" Selected="True"></asp:ListItem>
                            <asp:ListItem Text="所有的" Value=""></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                    <td  >
                        &nbsp;<asp:Button ID="btnSearch" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnSearch_Click" Text="查询" />
                    </td>
                </tr>
            </table>
                <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv1" 
                    OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating"
                    OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowDataBound="GridView1_RowDataBound"
                    DataKeyNames="ID" >
                    <Columns>
                        <asp:BoundField DataField="ID" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="CourseName" ReadOnly="true" HeaderText="课程">
                            <ItemStyle Width="200px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="CommentName" ReadOnly="true" HeaderText="评论者">
                            <ItemStyle Width="100px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Content" ReadOnly="true" HeaderText="评论">
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="状态">
                            <ItemTemplate>
                                <asp:CheckBox ID="cbIsActv" runat="server" />
                                <asp:HiddenField ID="hfIsActv" runat="server" Value='<%# Eval("IsCheck") %>' />
                            </ItemTemplate>
                            <ItemStyle Width="50px" />
                        </asp:TemplateField>
                        <asp:BoundField DataField="CreateDate" ReadOnly="true" HeaderText="日期">
                            <ItemStyle Width="120px" />
                        </asp:BoundField>
                        
                        <asp:CommandField ShowEditButton="True">
                            <ItemStyle Width="100px" />
                        </asp:CommandField>
                        <asp:CommandField ShowDeleteButton="True">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
       
                </asp:SmartGridView>
        
            <asp:HiddenField ID="hfClassID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="20" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>

