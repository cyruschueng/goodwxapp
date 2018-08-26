<%@ Page Language="C#"  MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.database.set.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script>
        $(function () {
            $("#btnGenerate").click(function () {
                var appid = $("#<%=hfAppid.ClientID %>").val();
                var authurl = $("#<%=hfAuthUrl.ClientID %>").val();
                var pagename = $("#pagename").val();
                var scope = "snsapi_userinfo";
                var diaolog = $("#diaolog").val();
                if (diaolog == "0") {
                    scope = "snsapi_base";
                } 
                var id = $("#artid").val();
                var status = "{'mode':'link','id':'" + id + "'}";
                var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + authurl + pagename + "?openid=oiU-1t34NjrJz2zavfa_GmO9RN6M&response_type=code&scope=" + scope + "&state=" + status + "&connect_redirect=1#wechat_redirect";
                url = encodeURI(url);
                $("#urlresult").val(url);
            });
        })
    </script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="微信基本数据设置">
            <table class="fromtable">
                <tr>
                    <td colspan="2">
                        <asp:DropDownList ID="ddlApp" AutoPostBack="true" runat="server" 
                            onselectedindexchanged="ddlApp_SelectedIndexChanged">
                            <asp:ListItem Text="家教智慧公众号(jiajiaozh)" Value="jiajiaozh"></asp:ListItem>
                            <asp:ListItem Text="品格养成服务号(pingeyc)" Value="pingeyc"></asp:ListItem>
                        </asp:DropDownList>
                    </td>
                 </tr>
                <tr>
                    <td colspan="2">关注回复</td>
                 </tr>
                 <tr>   
                     <td colspan="2">
                        <asp:TextBox ID="txtAutoAttention" TextMode="MultiLine" runat="server" Width="100%" Height="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">被动回复</td>
                 </tr>
                 <tr>   
                     <td colspan="2">
                        <asp:TextBox ID="txtPassivityAttention" TextMode="MultiLine" runat="server" Width="100%" Height="100px"></asp:TextBox>
                    </td>
                </tr>
                <!--
                <tr>
                    <td>菜单设置</td>
                    <td><asp:Button ID="btnMenu" runat="server" Text="修改工菜单" class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                            onclick="btnMenu_Click"    /></td>
                 </tr>
                 <tr>   
                     <td colspan="2">
                        <asp:TextBox ID="txtMenu" TextMode="MultiLine" runat="server" Width="100%" Height="100px"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <asp:Label ID="lbMenuMsg" runat="server"></asp:Label>
                    </td>
                </tr>
                -->
                <!--
                <tr>
                    <td colspan="2">
                        自动生成原文链接
                        <select id="pagename" style=" width:100px;">
                            <option value="courses.aspx">课程</option>
                            <option value="publicgoods.aspx">公益品</option>
                            <option value="letianshu.aspx">乐天鼠</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        是否带弹出Auth2.0页面授权
                        <select id="diaolog" style=" width:100px;">
                            <option value="0">不弹出</option>
                            <option value="1">弹出</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        文章ID
                        <input type="text" id="artid"  style=" width:100px;" />
                        <input ID="btnGenerate"  value="生成" class="btn" type="button"
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" />
                    </td>
                </tr>
                
                <tr>
                    <td colspan="2">
                        <input id="urlresult" type="text" style=" width:100%" />
                    </td>
                </tr>
                -->
                <tr>
                    <td colspan="2">
                        <asp:Button ID="btnSave" runat="server" Text="保存" class="btn" 
                            onmouseout="this.className='btn'"  
                            onmouseover="this.className='btn_mouseover'" onclick="btnSave_Click"  /></td>
                </tr>
             </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfAppid" runat="server" />
    <asp:HiddenField ID="hfAuthUrl" runat="server" />
</asp:Content>
