<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.bagset.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    <script>
        function SelectExpert() {
            var ObjAssignID = "<%=txtLecturer.ClientID %>";
            var ObjhfAssignID = "<%=hfLecturer.ClientID %>";
            var Flag = "1";
            //var url = "../../common/SelectExpert.aspx?ObjID=" + ObjAssignID + "&ObjhfID=" + ObjhfAssignID + "&Flag=" + Flag;
            var url = "../../common/SelectMoreExpert.aspx?ObjID=" + ObjAssignID + "&ObjhfID=" + ObjhfAssignID + "&Flag=" + Flag;
            ShowIframe('专家选择', url, '720', '600');
        }
    </script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="编辑课程供应商">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>课程包名</td>
                        <td ><asp:TextBox ID="txtBagName" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>讲师</td>
                        <td >
                            <asp:TextBox ID="txtLecturer" runat="server" Width="80%"></asp:TextBox>
                            <input id="btnExpert" onclick="SelectExpert()" type="button" class="btn" onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'" value="选择专家"   />
                        </td>
                    </tr>
                    <tr>
                        <td>原价</td>
                        <td >
                            <asp:TextBox ID="txtOriginalPrice" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>优惠价</td>
                        <td >
                            <asp:TextBox ID="txtPreferentialPrice" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>购买量</td>
                        <td >
                            <asp:Label ID="lbBuyNumber" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>虚拟量</td>
                        <td >
                            <asp:TextBox ID="txtBuyNumber1" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>是否启用</td>
                        <td ><asp:CheckBox ID="cbIsAct" runat="server" />启用</td>
                    </tr>
                    <tr>
                        <td>媒体类型</td>
                        <td>
                            <asp:DropDownList ID="ddlMediaType" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="视频" Value="1"></asp:ListItem>
                                <asp:ListItem Text="单音频" Value="2"></asp:ListItem>
                                <asp:ListItem Text="多音频" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>简介</td>
                        <td ><asp:TextBox ID="txtIntro"  TextMode="MultiLine" Rows="3" runat="server" Width="99%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>详情</td>
                        <td ><FCKeditorV2:FCKeditor ID="txtDetails" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                    <tr>
                        <td>封面(大)</td>
                        <td >
                            <asp:TextBox ID="txtImgUrl" runat="server" Width="50%" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUpload" runat="server"  />
                            <asp:HyperLink ID="btnView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');" onclick="btnDelPic_Click" />
                        </td>
                    </tr>
                    <tr>
                        <td>封面(小)</td>
                        <td >
                            <asp:TextBox ID="txtImgUrlMini" runat="server" Width="50%" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUploadMini" runat="server"  />
                            <asp:HyperLink ID="btnViewMini" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPicMini"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');" onclick="btnDelPicMini_Click" />
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
            <asp:HiddenField ID="hfReward" runat="server" />
            <asp:HiddenField ID="hfBag" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfLecturer" runat="server" />
</asp:Content>
