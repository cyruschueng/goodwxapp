<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.course.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="编辑课程供应商">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <script>
                    function SelectExpert() {
                        var ObjAssignID = "<%=txtLecturer.ClientID %>";
                        var ObjhfAssignID = "<%=hfLecturer.ClientID %>";
                        var Flag = "1";
                        var url = "../../common/SelectExpert.aspx?ObjID=" + ObjAssignID + "&ObjhfID=" + ObjhfAssignID + "&Flag=" + Flag;
                        ShowIframe('专家选择', url, '720', '600');
                    }
                </script>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>课程名</td>
                        <td colspan="1"><asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox></td>
                        <td>课程类别</td>
                        <td colspan="1">
                            <asp:DropDownList id="ddlCourseType" runat="server">
                                <asp:ListItem  Text="" Value=""></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>主题</td>
                        <td>
                            <asp:DropDownList ID="ddlTheme" runat="server" Width="95%" CssClass="select">
                            </asp:DropDownList>
                        </td>
                        <td>时长</td>
                        <td ><asp:TextBox ID="txtDuration" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td>供应商</td>
                        <td colspan="3">
                            <asp:DropDownList ID="ddlProvider" runat="server" Width="95%" CssClass="select"></asp:DropDownList>
                        </td>
                         <td>媒体类型</td>
                        <td >
                            <asp:DropDownList ID="ddlMediaType" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="视频" Value="1"></asp:ListItem>
                                <asp:ListItem Text="单音频" Value="2"></asp:ListItem>
                                <asp:ListItem Text="多音频" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td>讲师</td>
                        <td >
                            <asp:TextBox ID="txtLecturer" runat="server" Width="60%" ReadOnly="true" ></asp:TextBox>
                            <input id="btn" type="button"  value="选择"  class="btn" onmouseout="this.className='btn'"  onmouseover="this.className='btn_mouseover'" onclick="SelectExpert()" />
                            <asp:ImageButton ID="btnLecturerDele" ImageUrl="~/images/wrong.gif" 
                                runat="server" Visible="false" onclick="btnLecturerDele_Click" /> 
                        </td>
                    </tr>
                    <tr>
                        <td>课程封面(大)</td>
                        <td colspan="7">
                            <asp:TextBox ID="txtImgUrl" runat="server" Width="50%" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUpload" runat="server"  />
                            <asp:HyperLink ID="btnView" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPic"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');" onclick="btnDelPic_Click" />
                        </td>
                    </tr>
                    <tr>
                        <td>课程封面(小)</td>
                        <td colspan="7">
                            <asp:TextBox ID="txtImgUrlMini" runat="server" Width="50%" Visible="false" ></asp:TextBox>
                            <asp:FileUpload ID="fileUploadMini" runat="server"  />
                            <asp:HyperLink ID="btnViewMini" Target="_blank"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  Text ="查看"  Visible="false" runat="server" ></asp:HyperLink>
                            <asp:Button ID="btnDelPicMini"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');" onclick="btnDelPicMini_Click" />
                        </td>
                    </tr>
                    <tr>
                        <td>原价格</td>
                        <td ><asp:TextBox ID="txtOriginalPrice" runat="server" Text="0" Width="95%"></asp:TextBox></td>
                        <td>优惠价</td>
                        <td ><asp:TextBox ID="txtPreferentialPrice" runat="server" Text="0.0" Width="95%"></asp:TextBox></td>
                        <td>购买数</td>
                        <td ><asp:Label ID="txtBuyNumber" runat="server"  Width="95%"></asp:Label></td>
                        <td>购买数</td>
                        <td ><asp:TextBox ID="txtBuyNumber1" runat="server" Text="1" Width="95%"></asp:TextBox></td>
                     </tr>
                     <tr>  
                        <td>简介</td>
                        <td colspan="7"><asp:TextBox ID="txtIntro" TextMode="MultiLine" Rows="2"  runat="server" Width="100%"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td>详情</td>
                        <td colspan="7"><FCKeditorV2:FCKeditor ID="txtDetails" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                     <tr>       
                        <td>上架时间</td>
                        <td ><asp:TextBox ID="txtOnLineDateTime" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server" Width="95%"></asp:TextBox></td>
                        <td >销售状态</td>
                        <td>
                            <asp:DropDownList ID="ddlSaleState" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="上架" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="下架" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td >学习状态</td>
                        <td >
                            <asp:DropDownList ID="ddlLearnState" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="开课" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="休课" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                         <td >评论开启</td>
                        <td >
                            <asp:DropDownList ID="ddlCommentState" runat="server" Width="95%" CssClass="select">
                                <asp:ListItem Text="" Value="" ></asp:ListItem>
                                <asp:ListItem Text="开启" Value="1" ></asp:ListItem>
                                <asp:ListItem Text="未开启" Value="2"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>开始时间</td>
                        <td ><asp:TextBox ID="txtStart" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" class="Wdate"  runat="server" Width="95%"></asp:TextBox></td>
                        <td>结束时间</td>
                        <td ><asp:TextBox ID="txtEnd" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" class="Wdate"  runat="server" Width="95%"></asp:TextBox></td>
                        <td>课程练习</td>
                        <td ><asp:TextBox ID="txtExercisesId"   runat="server" Width="95%"></asp:TextBox></td>
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
