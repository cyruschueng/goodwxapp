<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.content.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程内容">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <script>
                    function selectType() {
                        var v = $("#<%=ddlType.ClientID %>").val();
                        var txt = $("#<%=txt.ClientID %>");
                        var url = $("#<%=url.ClientID %>");
                        var duration = $("#<%=duration.ClientID %>");
                        var iframe = $("#<%=iframe.ClientID %>");
                        var responsive = $("#<%=responsive.ClientID%>");
                        switch (v) {
                            case "1":
                                txt.css("display", "none");
                                url.removeAttr("style");
                                duration.show();
                                iframe.show();
                                responsive.show();
                                break;
                            case "2":
                                txt.css("display", "none");
                                url.removeAttr("style");
                                duration.show();
                                iframe.hide();
                                responsive.hide();
                                break;
                            case "3":
                                txt.css("display", "none");
                                url.css("display", "none");
                                duration.hide();
                                iframe.hide();
                                responsive.hide();
                                break;
                            case "4":
                                txt.removeAttr("style");
                                url.css("display", "none");
                                duration.hide();
                                iframe.hide();
                                responsive.hide();
                                break;
                            default:
                                txt.css("display", "none");
                                url.css("display", "none");
                                duration.hide();
                                iframe.hide();
                                responsive.hide();
                                break;
                        }
                    }
                </script>
                <style>
                    select { width:200px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr style=" display:none;">
                        <td style=" width:200px;">标题名称</td>
                         <td colspan="2">
                            <asp:TextBox ID="txtCourseName" runat="server" Width="90%" ></asp:TextBox>
                         </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">类型</td>
                        <td colspan="2">
                            <asp:DropDownList ID="ddlType"  onchange=" return selectType();"  runat="server" >
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="视频" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="语音" Value="2"></asp:ListItem>
                                <asp:ListItem Text="图片" Value="3"></asp:ListItem>
                                <asp:ListItem Text="文字" Value="4"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">姓名</td>
                        <td>
                            <asp:TextBox ID="txtCname" runat="server" Width="60%"  ></asp:TextBox>
                        </td>
                        <td>
                            <asp:RadioButtonList ID="rblRoles" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem Text="主持人" Value="主持人" Selected="True" ></asp:ListItem>
                                <asp:ListItem Text="嘉宾" Value="嘉宾"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr id="url" runat="server" style=" display:none; width:100%;">
                        <td style=" width:200px;">Url</td>
                        <td colspan="2">
                            <div style=" float:left; width:50%;">
                                <asp:TextBox ID="txtUrl" runat="server" Width="90%"  ></asp:TextBox>
                            </div>
                            <div style=" float:left;" id="duration" runat="server">
                                <asp:TextBox ID="txtDuration" runat="server" Width="60px"></asp:TextBox>秒
                                &nbsp;&nbsp;&nbsp;
                            </div>
                            
                            <div style=" float:left; height:30px; line-height:30px;" id="iframe" runat="server">
                                <asp:CheckBox ID="cbIsiframe" runat="server" />嵌入
                                &nbsp;&nbsp;&nbsp;
                            </div>
                            
                            <div style=" float:left; " id="responsive" runat="server">
                                <span style=" height:30px; line-height:30px;">显示比率</span>
                                <asp:RadioButtonList RepeatDirection="Horizontal" ID="rblResponsive" runat="server" style=" display:inline-block; float:left" >
                                    <asp:ListItem Value="16by9" Text="16:9"></asp:ListItem>
                                    <asp:ListItem Value="4by3" Text="4:3"></asp:ListItem>
                                    <asp:ListItem Value="" Text="无"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">封面</td>
                         <td colspan="2">
                            <asp:TextBox ID="txtCover" Width="50%" runat="server" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUpload" runat="server"  />
                            <asp:HyperLink ID="btnView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');" onclick="btnDelPic_Click" />
                         </td>
                    </tr>
                    <tr id="txt" runat="server" style=" display:none; width:100%;">
                        <td style=" width:200px;">内容</td>
                        <td colspan="2"><FCKeditorV2:FCKeditor ID="txtContent" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">顺序</td>
                         <td colspan="2">
                            <asp:TextBox ID="txtSn" runat="server"></asp:TextBox>
                         </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">是否发布</td>
                         <td colspan="2">
                            <asp:DropDownList ID="ddlIsAct" runat="server">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="发布" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="未发布" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                         </td>
                    </tr>
                    <tr>
                        <td style=" width:200px;">显示</td>
                        <td colspan="2">
                            <asp:CheckBox Checked=true ID="cbShow" runat="server" />是否显示
                            <span style=" color:#f00">模拟直播有用</span>
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfContentId" runat="server" />
            <asp:HiddenField ID="hfCourseId" runat="server" />
            <asp:HiddenField ID="hfSectionId" runat="server" />
            <asp:HiddenField ID="hfSubSectionId" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>