<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="update.aspx.cs" Inherits="SfSoft.web.emc.material.jinghua.update" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <style>
        select{ width:95%;}
    </style>
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name=" 消息管理">
          <asp:Panel  ID="Panel1" GroupingText="文章数据编辑" runat="server">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td align="right" height="25" style="width: 80px">标题&nbsp;</td>
                        <td align="left" height="25" ><asp:TextBox ID="txtTitle" runat="server" Width="95%"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <asp:RadioButtonList ID="rblImgType" AutoPostBack="true" 
                                RepeatDirection="Horizontal" runat="server" 
                                onselectedindexchanged="rblImgType_SelectedIndexChanged">
                                <asp:ListItem Text="远程连接" Value="1"></asp:ListItem>
                                <asp:ListItem Text="本地连接" Value="2"></asp:ListItem>
                            </asp:RadioButtonList>
                        </td>
                    </tr>
                    <tr id="localUrl" runat="server">
                        <td>本地图片Url</td>
                        <td align="left" height="25" >
                            <asp:Image ID="imgLogo" Visible="false" runat="server"  />
                            <asp:FileUpload ID="fileLogo" runat="server"  />
                            <asp:Button ID="btnDeleLogo" OnClick="btnDelPic_Click"  runat="server" Text="删除" CssClass="btn" Visible="false" OnClientClick="return confirm('确定要删除图片？');"  />
                        </td>
                    </tr>
                    <tr id="remoteUrl" runat="server">
                        <td>远程图片Url</td>
                        <td>
                            <asp:TextBox ID="txtImgUrl" runat="server" Width="95%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr id="Tr1" runat="server">
                        <td>原文链接</td>
                        <td>
                            <asp:TextBox ID="txtArticleUrl" runat="server" Width="95%"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>   
                        <td class="td">详细内容</td>
                        <td ><FCKeditorV2:FCKeditor ID="txtDetail" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="98%" ></FCKeditorV2:FCKeditor></td>
                    </tr>
                     <tr>
                        <td align="left" height="25" style="width: 100px">组名称</td>
                        <td align="left" height="25" >
                            <asp:DropDownList ID="ddlGroupTitle" runat="server"></asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">排序</td>
                        <td align="left" height="25" >
                            <asp:TextBox ID="txtOrder"  Width="95%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">类别</td>
                        <td align="left" height="25" >
                            <asp:DropDownList ID="ddlArticleType" runat="server">
                                <asp:ListItem Value="" Text="---请选择---"></asp:ListItem>
                                <asp:ListItem Value="0" Text="家教周刊"></asp:ListItem>
                                <asp:ListItem Value="2" Text="团队活动"></asp:ListItem>
                                <asp:ListItem Value="3" Text="学习中心"></asp:ListItem>
                                <asp:ListItem Value="4" Text="视频"></asp:ListItem>
                                <asp:ListItem Value="5" Text="万妈妈周刊"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" height="25" style="width: 100px">发布日期</td>
                        <td align="left" height="25" >
                            <asp:TextBox ID="txtReleaseDate" onFocus="WdatePicker({lang:'zh-cn',dateFmt:'yyyy-MM-dd HH:mm:ss'})"  Width="95%" runat="server" ></asp:TextBox>
                        </td>
                    </tr>
            </table>
            </asp:Panel>
            <asp:Panel  ID="Panel2" GroupingText="组名称设置" runat="server">
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>组名称：</td>
                        <td><asp:TextBox ID="txtGroup"  runat="server"></asp:TextBox></td>
                        <td><asp:Button ID="edit" Text="新增" runat="server" class="btn"  CommandArgument="add"
                                onmouseout="this.className='btn'"  onmouseover="this.className='btn_mouseover'"
                                onclick="edit_Click"  /></td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <asp:CheckBoxList ID="cblGroup" RepeatDirection="Horizontal" AutoPostBack="true"  runat="server"    RepeatLayout="Flow"
                                onselectedindexchanged="cblGroup_SelectedIndexChanged"></asp:CheckBoxList>
                        </td>
                    </tr>
                </table>
                
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
</asp:Content>
