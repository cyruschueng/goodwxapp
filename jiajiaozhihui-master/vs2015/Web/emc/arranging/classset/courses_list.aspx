<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="courses_list.aspx.cs" Inherits="SfSoft.web.emc.arranging.classset.courses_list" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
            <script src="../../../js/My97DatePicker/WdatePicker.js"></script>
            <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False"
                Width="99%" DataKeyNames="id" MouseOverCssClass="OverRow" SkinID="sgv1"
                OnRowDataBound="GridView1_RowDataBound" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="id" HeaderText="ID" ReadOnly="True">
                        <ItemStyle Width="20px" />
                    </asp:BoundField>
                    <asp:BoundField DataField="course_name" HeaderText="课程名称" ReadOnly="true" ></asp:BoundField>
                    <asp:BoundField DataField="course_size" HeaderText="课时" ReadOnly="true"></asp:BoundField>
                    <asp:TemplateField HeaderText="课程档期">
                        <ItemTemplate>
                            <%# Eval("starting_date") %>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="txtStartingDate" Text='<%# Eval("starting_date") %>'  onClick="WdatePicker()" runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="班级类型">
                        <ItemTemplate>
                            <%# GetClassType(Eval("role").ToString()) %>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:RadioButtonList ID="cblRole" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="初级班" Value="001" ></asp:ListItem>
                                <asp:ListItem Text="高级班" Value="002" ></asp:ListItem>
                                <asp:ListItem Text="卓越班" Value="003" ></asp:ListItem>
                            </asp:RadioButtonList>
                            <asp:HiddenField ID="hfRole" Value='<%# Eval("role") %>' runat="server" />
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="公开课">
                        <ItemTemplate>
                            <%# Eval("is_public").ToString()=="0"?"":"公开" %>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:RadioButtonList ID="cbIsPublic" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="受限" Value="0" ></asp:ListItem>
                                <asp:ListItem Text="公开" Value="1" ></asp:ListItem>
                            </asp:RadioButtonList>
                            <asp:HiddenField ID="hfIsPublic" Value='<%# Eval("is_public") %>' runat="server" />
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="exper_name" HeaderText="讲师" ReadOnly="true" ></asp:BoundField>
                    <asp:CommandField HeaderText="操作" ShowCancelButton="true" ShowEditButton="true" CancelText="取消" EditText="编辑" />
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
        </cc1:TabOptionItem>

        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="课程导入">

            <table border="0" cellpadding="0" cellspacing="0" style="width: 99%" class="fromtable">
                <tr>
                    <td>
                        <asp:Button ID="btnAdd" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" OnClick="btnAdd_Click" Text="新境" />
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView2" runat="server" AutoGenerateColumns="False"
                Width="99%" DataKeyNames="id" MouseOverCssClass="OverRow" SkinID="sgv1">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="id" HeaderText="ID" ReadOnly="True">
                        <ItemStyle Width="20px" />
                    </asp:BoundField>
                    <asp:BoundField DataField="title" HeaderText="课程名称"></asp:BoundField>
                    <asp:BoundField DataField="create_date" ReadOnly="true" HeaderText="创建日期">
                        <ItemStyle Width="200px" />
                    </asp:BoundField>

                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>

            <asp:AspNetPager ID="AspNetPager2" runat="server" class="aspnetpager"
                CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条"
                FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页"
                OnPageChanged="AspNetPager2_PageChanged" PageSize="15" PrevPageText="上一页"
                ShowCustomInfoSection="right" ShowDisabledButtons="false"
                ShowPageIndexBox="always">
            </asp:AspNetPager>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfMID" runat="server" />
    <asp:HiddenField ID="hfClassID" runat="server" />
    <asp:HiddenField ID="hfzz" runat="server" />


    <script>
        function Add_CorseForm(classId) {
            document.location = 'courses_update.aspx?mode=add&ID=&classId=' + classId;
        }
    </script>
</asp:Content>
