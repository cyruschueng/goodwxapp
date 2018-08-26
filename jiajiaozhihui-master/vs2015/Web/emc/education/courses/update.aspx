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
                        发布人
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:TextBox ID="txtCreator" runat="server" Width="95%"></asp:TextBox>
                    </td>
                    </tr>
                    <tr>
                        
                    <td align="left" height="25" style="width: 100px">
                        是否显头条
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:RadioButtonList ID="rblShow" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                            <asp:ListItem Text="是" Value="1" ></asp:ListItem>
                            <asp:ListItem Text="否" Value="0"></asp:ListItem>
                        </asp:RadioButtonList>
                    </td>
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
                        分组
                    </td>
                    <td align="left" height="25" style="width: 269px">
                        <asp:DropDownList ID="ddlGroup" runat="server">
                            <asp:ListItem Text="---请选择---" Value="" ></asp:ListItem>
                            <asp:ListItem Text="第1期" Value="1" ></asp:ListItem>
                            <asp:ListItem Text="第2期" Value="2" ></asp:ListItem>
                            <asp:ListItem Text="第3期" Value="3" ></asp:ListItem>
                            <asp:ListItem Text="第4期" Value="4" ></asp:ListItem>
                            <asp:ListItem Text="第5期" Value="5" ></asp:ListItem>
                            <asp:ListItem Text="第6期" Value="6" ></asp:ListItem>
                            <asp:ListItem Text="第7期" Value="7" ></asp:ListItem>
                            <asp:ListItem Text="第8期" Value="8" ></asp:ListItem>
                            <asp:ListItem Text="第9期" Value="9" ></asp:ListItem>
                            <asp:ListItem Text="第10期" Value="10" ></asp:ListItem>
                            <asp:ListItem Text="第11期" Value="11" ></asp:ListItem>
                            <asp:ListItem Text="第12期" Value="12" ></asp:ListItem>
                            <asp:ListItem Text="第13期" Value="13" ></asp:ListItem>
                            <asp:ListItem Text="第14期" Value="14" ></asp:ListItem>
                        </asp:DropDownList>
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
            
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    
</asp:Content>
