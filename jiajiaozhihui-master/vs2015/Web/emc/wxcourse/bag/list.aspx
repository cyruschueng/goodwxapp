<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.bag.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
     <script type="text/javascript" src="/js/comm.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
            
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td  style=" text-align:right;">
                        <input type="button"  id="btnAddCourse" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" value="增加课程" />
                     </td>
                </tr>
            </table>

            <asp:Panel ID="Panel1" GroupingText="课程" runat="server" style=" display:none;">
                 <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                    <tr>
                        <td >
                            <asp:Button ID="btnOK" runat="server" class="btn"
                                onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" 
                                Text="确认" onclick="btnOK_Click"  />
                        </td>   
                    </tr>
                 </table>
                <asp:SmartGridView ID="GridView2" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id" OnRowDataBound="GridView2_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" >
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
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>
                <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" 
                    OnRowDeleting="GridView1_RowDeleting" OnRowDataBound="GridView1_RowDataBound"
                    DataKeyNames="BagId,CourseId " AllowPaging="True" PageSize="50">
                    <Columns>
                        <asp:BoundField DataField="CourseId" HeaderText="课程Id" ReadOnly="True">
                            <ItemStyle Width="100px" />
                        </asp:BoundField>
                        <asp:BoundField DataField="CourseName" HeaderText="课程名">
                        </asp:BoundField>
                        <asp:BoundField DataField="CreateDate" DataFormatString="{0:yyyy-MM-dd}" HeaderText="创建日期">
                            <ItemStyle Width="150px" />
                        </asp:BoundField>
                        <asp:CommandField ShowDeleteButton="True">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
                </asp:SmartGridView>
        
            <asp:HiddenField ID="hfClassID" runat="server" />
            <asp:HiddenField ID="hfMediaType" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <script>
        $("#btnAddCourse").click(function () {
            $("#<%=GridView1.ClientID %>").toggle();
            $("#<%=Panel1.ClientID %>").toggle();
        });    
    </script>
</asp:Content>
