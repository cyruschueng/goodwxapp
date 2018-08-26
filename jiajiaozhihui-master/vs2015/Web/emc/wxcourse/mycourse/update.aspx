<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.mycourse.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="编辑课程供应商">
            <asp:Panel ID="Panel0" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td><input type="button" id="btnAddCourse" value="添加课程" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"  /></td>
                        <td><input type="button" id="btnAddCourseBag" value="添加课程包" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"  /></td>
                    </tr>
                </table>
            </asp:Panel>

            <asp:Panel ID="Panel1" GroupingText="" runat="server" style="display:none">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td><asp:Button ID="btnAddCourseOK" Text="确认" onclick="btnAddCourseOK_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" /></td>
                    </tr>
                </table>

                <asp:SmartGridView ID="GridView3" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="Id" OnRowDataBound="GridView3_RowDataBound" MouseOverCssClass="OverRow" 
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
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>
            <asp:Panel ID="Panel2" GroupingText="" runat="server" style="display:none">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td><asp:Button ID="btnAddCourseBagOK" Text="确认" onclick="btnAddCourseBagOK_Click" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" runat="server" /></td>
                    </tr>
                </table>

                <asp:SmartGridView ID="GridView2" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="RefValueCode" OnRowDataBound="GridView2_RowDataBound" MouseOverCssClass="OverRow" 
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
                        <asp:BoundField DataField="RefValueCode" HeaderText="包号" ReadOnly="true" />
                        <asp:BoundField DataField="RefValue" HeaderText="课程包名" ReadOnly="true" />
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>

            <asp:Panel ID="Panel3" GroupingText="" runat="server">
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                    Width="99%"  DataKeyNames="OpenId" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                    SkinID="sgv1" >
                    <Columns>
                        <asp:TemplateField HeaderText="序号">
                                    <ItemTemplate><%# Container.DataItemIndex+1 %></ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="CoursName" HeaderText="课程" ReadOnly="true" />
                        <asp:BoundField DataField="Duration" HeaderText="时长"  ReadOnly="true"/>
                        <asp:BoundField DataField="LecturName" HeaderText="讲师"  ReadOnly="true"/>
                    </Columns>
                    <CascadeCheckboxes>
                        <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                    </CascadeCheckboxes>
                    <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>

            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
            <asp:HiddenField ID="hfReward" runat="server" />
            <asp:HiddenField ID="hfBag" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
        <script>
            $("#btnAddCourse").click(function () {
                $("#<%=Panel2.ClientID %>").hide();
                $("#<%=Panel1.ClientID %>").toggle();
            });
            $("#btnAddCourseBag").click(function () {
                $("#<%=Panel1.ClientID %>").hide();
                $("#<%=Panel2.ClientID %>").toggle();
            });    
    </script>
</asp:Content>
