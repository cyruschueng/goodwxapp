<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.group.info.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="群信息">
            <asp:Panel ID="Panel1" GroupingText="基本数据" runat="server">
                <style>
                    .td{ width:80px;}
                </style>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td class="td">群状态</td>
                        <td colspan="5">
                            <asp:RadioButtonList ID="rblStatus" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="启用" Value="1"></asp:ListItem>
                                <asp:ListItem Text="取消" Value="0"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">群名</td>
                        <td ><asp:TextBox ID="txtName" runat="server" Width="95%"></asp:TextBox></td>
                        <td class="td">群类型</td>
                        <td><asp:DropDownList ID="ddlType" runat="server" Width="95%" CssClass="select"></asp:DropDownList></td>
                        <td class="td">群编码</td>
                        <td ><asp:TextBox ID="txtCoding" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td class="td">群上限</td>
                        <td ><asp:TextBox ID="txtUpperLimit" TextMode="Number" runat="server" Width="95%"></asp:TextBox></td>
                         <td class="td">是否审核</td>
                        <td >
                            <asp:RadioButtonList ID="rblCheck" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="免审" Value="0"></asp:ListItem>
                                <asp:ListItem Text="审核" Value="1"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                        <td>是否收费</td>
                        <td >
                            <asp:RadioButtonList ID="rblPremium" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="免费" Value="0"></asp:ListItem>
                                <asp:ListItem Text="收费" Value="1"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr>
                        <td class="td">开始收费人数</td>
                        <td ><asp:TextBox ID="txtPremiumCondition" TextMode="Number" Text="0" runat="server" Width="95%"></asp:TextBox></td>
                        <td class="td">收费金额</td>
                        <td ><asp:TextBox ID="txtPremium"  runat="server" Width="95%"></asp:TextBox></td>
                        <td class="td">群余额</td>
                        <td ><asp:TextBox ID="txtBalance" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                     <tr>
                         <td class="td">群规则</td>
                        <td colspan="5"><asp:TextBox ID="txtGrule" TextMode="MultiLine" Rows="5" runat="server" Width="98%"></asp:TextBox></td>
                     </tr>
                     <tr>  
                        <td class="td">群简介</td>
                        <td colspan="5"><asp:TextBox ID="txtIntro" TextMode="MultiLine" Rows="5"  runat="server" Width="98%"></asp:TextBox></td>
                    </tr>
                     <tr>   
                        <td class="td">详情</td>
                        <td colspan="5"><FCKeditorV2:FCKeditor ID="txtDetails" runat="server" DefaultLanguage="zh-cn" Height="600px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                    <tr>
                        <td  colspan="2"  style=" text-align:center;"><asp:Image ImageUrl="" ID="imgLogoUrl" Visible="false" style=" max-height:200px;" runat="server" /></td>
                        <td  colspan="2" style=" text-align:center;"><asp:Image ImageUrl="" ID="imgQRcodeUrl" Visible="false" style=" max-height:200px;" runat="server" /></td>
                        <td  colspan="2" style=" text-align:center;"><asp:Image ImageUrl="" ID="imgRegisterQRcodeUrl" Visible="false" style=" max-height:200px;" runat="server" /></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <asp:Label style=" color:#f00; font-size:11px;" runat="server">logo</asp:Label>
                            <asp:FileUpload ID="fileLogo" runat="server"  />
                            <asp:Button ID="btnDeleLogo"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
                        </td>
                        <td colspan="2">
                            <asp:Label ID="Label1" style=" color:#f00; font-size:11px;" runat="server">群二维码</asp:Label>
                            <asp:FileUpload ID="fileQRcode" runat="server"  />
                            <asp:Button ID="btnDeleQRcode"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
                        </td>
                        <td colspan="2">
                            <asp:Label ID="Label2" style=" color:#f00; font-size:11px;" runat="server">群注册二维码</asp:Label>
                            <asp:FileUpload ID="fileRegisterQRcode" runat="server"  />
                            <asp:Button ID="btnDeleRegisterQRcode"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
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
