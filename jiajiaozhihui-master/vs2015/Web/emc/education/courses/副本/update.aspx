<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.education.courses.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="在线活动">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td align="right" height="25" style="width: 100px">
                        标题&nbsp;
                    </td>
                    <td align="left" height="25" style="width: 230px">
                        <asp:TextBox ID="txtTopic" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    <td align="left" height="25" style="width: 100px">
                        活动参加人上限
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtEnrollment" runat="server" Width="30%"></asp:TextBox>
                        <span style="color:#2828FF">(如果值是0上限人数不限止)</span>
                    </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">
                        发布人
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtCreator" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    <td align="left" height="25" style="width: 100px">
                        是否显示报名人
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:RadioButtonList ID="rblShow" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                            <asp:ListItem Text="显示" Value="1" ></asp:ListItem>
                            <asp:ListItem Text="不显示" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                    
                    </tr>
                    <tr>
                        <td>课程链接</td>
                        <td ><asp:TextBox ID="txtCourseUrl" runat="server" Width="95%"></asp:TextBox></td>
                        <td>是否启用</td>
                        <td >
                            <asp:DropDownList ID="ddlIsAct" runat="server" Width="95%">
                                <asp:ListItem Text="启用" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="禁用" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                <tr>
                    <td align="left" height="25" style="width: 100px">
                        报名时间
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtPubDate" runat="server" Width="95%" onFocus="WdatePicker({isShowClear:true,readOnly:true,dateFmt:'yyyy-MM-dd'})"></asp:TextBox>
                    </td> 
                    <td align="left" height="25" style="width: 100px">
                        报名结束时间
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtEndDate" runat="server" Width="95%" onFocus="WdatePicker({isShowClear:true,readOnly:true,dateFmt:'yyyy-MM-dd'})"></asp:TextBox>
                    </td> 
                </tr>
                <tr>
                    <td>有效期</td>
                    <td ><asp:CalendarTextBox ID="txtValidityDate" runat="server" Width="95%"></asp:CalendarTextBox></td>
                    <td align="left" height="25" style="width: 100px">
                        是否显示联系方式
                    </td>
                    <td colspan=""  align="left" height="25" style="width: 269px">
                        <asp:DropDownList ID="ddlIsTele" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                            <asp:ListItem Text="显示" Value="1"></asp:ListItem>
                            <asp:ListItem Text="不显示" Value="0"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25" style="width: 100px">
                        发布状态
                    </td>
                    <td colspan=""  align="left" height="25" style="width: 269px">
                        <asp:RadioButtonList ID="rblStatus" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                            <asp:ListItem Text="已发布" Value="1" Selected="True"></asp:ListItem>
                            <asp:ListItem Text="未发布" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
                </tr>
                <tr>
                    <td align="left"  style="width: 100px">
                        课程描述
                    </td>
                    <td colspan="3">
                        <FCKeditorV2:FCKeditor ID="txtInfoDesc" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </td>
                </tr>
                <tr>
                    <td align="left"  style="width: 100px">
                        课程详情
                    </td>
                    <td colspan="3">
                        <FCKeditorV2:FCKeditor ID="fckInfoDetail" runat="server" DefaultLanguage="zh-cn" Height="400px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25"  style="width: 200px">
                        产品图片
                    </td>
                    <td colspan="3" align="left" height="25" style="width: 90%">
                        <asp:FileUpload ID="fuImgUrl" runat="server"  />
                        <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" 
                            Visible="false" OnClientClick="return confirm('确定要删除图片？');" 
                            onclick="btnDelPic_Click" />
                    </td>
                </tr>
                <tr>
                    <td align="left" height="25" colspan="4">
                        <asp:Image ID="imgUrl" runat="server" ImageUrl="" Visible="false" />
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <div align="center">
                            <asp:HiddenField ID="hfMode" runat="server" />
                            <asp:HiddenField ID="hfMID" runat="server" />
                            <asp:HiddenField ID="hfID" runat="server" />
                        </div>
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False"
                Width="99%" OnPageIndexChanging="GridView1_PageIndexChanging" DataKeyNames="ID" Caption="报名名单"
                  MouseOverCssClass="OverRow" SkinID="sgv1">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" ItemStyle-Width="60px" />
                    <asp:BoundField DataField="contact" HeaderText="姓名" ItemStyle-Width="100px"  />
                    <asp:BoundField DataField="mobile" HeaderText="联系号码" ItemStyle-Width="100px"  />
                    <asp:BoundField DataField="remark" HeaderText="备注" />
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
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="10" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
