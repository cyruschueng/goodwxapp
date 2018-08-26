<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.life.card.browse" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOWC" runat="server">
        <cc1:TabOptionItem  ID="TabOItem1" runat="server"  Tab_Name="家园卡">
            <asp:Panel ID="panelSearch" runat="server" GroupingText="查询条件">
                <style type="text/css">
                    .fromtable td{ height:30px; line-height:30px; }
                    .fromtable .caption{ width:80px; text-align:center;}
                    .fromtable .input{ width:150px;}
                    .fromtable .input select,.fromtable1 .input text{ width:90%}
                </style>
                <table class="fromtable" style="width:98%;">
                    <tr>
                        <td class="caption">家园卡：</td>
                        <td class="input"><asp:TextBox ID="txtCardID" Width="90%"   runat="server" ></asp:TextBox></td>
                        <td class="caption">头衔：</td>
                        <td class="input"><asp:DropDownList ID="ddlActor" Width="90%" runat="server"></asp:DropDownList></td>
                        <td class="caption">卡等级：</td>
                        <td  class="input" ><asp:DropDownList ID="ddlGrade" Width="90%" runat="server"></asp:DropDownList></td>
                        <td class="caption"></td>
                        <td  class="input" ></td>
                    </tr>
                    <tr>
                        <td class="caption">呢称</td>
                        <td class="input"><asp:TextBox ID="txtNickName" Width="90%" runat="server"></asp:TextBox></td>
                        <td class="caption">姓名</td>
                        <td class="input"><asp:TextBox ID="txtName" Width="90%" runat="server"></asp:TextBox></td>
                        <td class="caption">性别</td>
                        <td class="input">
                            <asp:DropDownList ID="ddlSex" runat="server">
                                <asp:ListItem Value="" Text=""></asp:ListItem>
                                <asp:ListItem Value="2" Text="女"></asp:ListItem>
                                <asp:ListItem Value="1" Text="男"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td class="caption"></td>
                        <td  class="input" ></td>
                    </tr>
                    <tr>
                        <td class="caption">省份：</td>
                        <td class="input"><asp:DropDownList ID="ddlProvice" AutoPostBack="true"  
                                runat="server" onselectedindexchanged="ddlProvice_SelectedIndexChanged"></asp:DropDownList></td>
                        <td class="caption">城市：</td>
                        <td class="input"><asp:DropDownList ID="ddlCity" runat="server"></asp:DropDownList></td>
                        <td class="caption">地址：</td>
                        <td  class="input" colspan="2" ><asp:TextBox ID="txtAddress" Width="90%" runat="server"></asp:TextBox></td>
                        <td class="caption"><asp:Button ID="btnSearch" Text="查询" class="btn" onmouseout="this.className='btn'"  onmouseover="this.className='btn_mouseover'" runat="server" /></td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:Panel ID="panel1" runat="server" GroupingText="会员">
                <asp:SmartGridView ID="GridView1" runat="server" AllowPaging="false" AutoGenerateColumns="False"
                    Width="100%" OnPageIndexChanging="GridView1_PageIndexChanging" SkinID="sgv1"
                    DataKeyNames="ID" OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" >
                    <Columns>
                        <asp:BoundField DataField="name"  HeaderText="姓名" HeaderStyle-HorizontalAlign="Center" HtmlEncode="false"
                            ItemStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="80px" />
                        <asp:BoundField DataField="NickName" HeaderText="昵称" ItemStyle-HorizontalAlign="Center"
                            HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="100px" />
                        <asp:BoundField DataField="CardId" HeaderText="家园卡" ItemStyle-HorizontalAlign="Center"
                            HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="100px" />
                        <asp:BoundField DataField="Actor" HeaderText="头衔" ItemStyle-HorizontalAlign="Center"
                            HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="80px" />
                         <asp:BoundField DataField="Grade" HeaderText="卡等级" ItemStyle-HorizontalAlign="Center"
                            HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="80px" />   
                         <asp:BoundField DataField="Sex" HeaderText="性别" ItemStyle-HorizontalAlign="Center"
                          HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="60px" />
                          <asp:BoundField DataField="Telephone" HeaderText="手机" ItemStyle-HorizontalAlign="Center"
                          HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="90px" />
                          <asp:BoundField DataField="Integral" HeaderText="用户积分" ItemStyle-HorizontalAlign="Center"
                            HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="100px" />
                        <asp:BoundField DataField="Birthday" HeaderText="孩子生日" ItemStyle-HorizontalAlign="Center"
                          HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="80px" DataFormatString="{0:yyyy-MM-dd}"  />
                          <asp:BoundField DataField="ProvinceName" HeaderText="省份" ItemStyle-HorizontalAlign="Center"
                          HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="80px" />
                          <asp:BoundField DataField="CityName" HeaderText="城市" ItemStyle-HorizontalAlign="Center"
                          HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="80px" />
                            <asp:BoundField DataField="CreateDate" HeaderText="用户创建时间" ItemStyle-HorizontalAlign="Center"
                            HeaderStyle-HorizontalAlign="Center" ReadOnly="true" ItemStyle-Width="80px" DataFormatString="{0:yyyy-MM-dd}"  />
                    </Columns>
                    <PagerSettings Position="Bottom"></PagerSettings>
                </asp:SmartGridView>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="13" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
    <asp:HiddenField ID="HF_UserID" runat="server" />
    <asp:HiddenField ID="hfAssignsID" runat="server"></asp:HiddenField>
</asp:Content>

