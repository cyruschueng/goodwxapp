<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.activity.showphoto.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="">
            <asp:Panel ID="Panel1" GroupingText="" runat="server">
                <script src="../../../js/comm.js" type="text/javascript"></script>
                <script language="javascript" type="text/javascript">
                    function expandcollapse(obj, row) {
                        var div = document.getElementById(obj);
                        var img = document.getElementById('img' + obj);

                        if (div.style.display == "none") {
                            div.style.display = "block";
                            if (row == 'alt') {
                                img.src = "../../images/minus.gif";
                            }
                            else {
                                img.src = "../../images/minus.gif";
                            }
                            img.alt = "Close to view other Customers";
                        }
                        else {
                            div.style.display = "none";
                            if (row == 'alt') {
                                img.src = "../../images/plus.gif";
                            }
                            else {
                                img.src = "../../images/plus.gif";
                            }
                            img.alt = "Expand to show Orders";
                        }
                    }
                    function issend() {
                        if (window.confirm('你确定要发货吗！')) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                </script>
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onrowcommand="GridView1_RowCommand" >
                <Columns>
                    <asp:TemplateField HeaderStyle-Width="60px" ItemStyle-Width="60px">
                        <ItemTemplate>
                            <a href="javascript:expandcollapse('div<%# Eval("Id") %>', 'one');">
                                <img id="imgdiv<%# Eval("Id") %>" alt="<%# Eval("Id") %>"  width="9" height="7" border="0" src="../../images/plus.gif" />
                            </a>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" HeaderStyle-Width="60px" ItemStyle-Width="60px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:TemplateField HeaderStyle-Width="100px" ItemStyle-Width="100px" HeaderText="头像" HeaderStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <img src="<%# Eval("HeadImgUrl") %>" alt="" style=" height:36px; width:36px;" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="NickName" HeaderText="昵称" HeaderStyle-Width="80px" ItemStyle-Width="80px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="VoteNumber" HeaderText="投票数" HeaderStyle-Width="80px" ItemStyle-Width="80px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="CreateDate" HeaderText="参与日期" DataFormatString="{0:yyyy-MM-dd}"  HeaderStyle-Width="120px" ItemStyle-Width="120px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center"/>
                    <asp:BoundField DataField="UserName" HeaderText="姓名" HeaderStyle-Width="100px" ItemStyle-Width="100px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="ProvinceName" HeaderText="省" HeaderStyle-Width="80px" ItemStyle-Width="80px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="CityName" HeaderText="市" HeaderStyle-Width="80px" ItemStyle-Width="80px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="Address" HeaderText="详细地址"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="Telephone" HeaderText="联系电话" HeaderStyle-Width="100px" ItemStyle-Width="100px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />

                    <asp:TemplateField>
                        <HeaderStyle Width="100px" HorizontalAlign="Center" />
                        <ItemStyle Width="100px" HorizontalAlign="Center" />
                        <ItemTemplate>
                            <a target="_blank" style="color:#2828FF;" href='<%# Eval("UpLoadImgUrl") %>'>查看图片</a>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="是否发货">
                        <HeaderStyle Width="100px" HorizontalAlign="Center" />
                        <ItemStyle Width="100px" HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:LinkButton Text="发货" ID="linkbtnSend" CommandArgument='<%# Eval("ID") %>' style=" color:#2828FF" runat="server"></asp:LinkButton>
                            <asp:Label Text="已发货" ID="lblSend" runat="server" style=" color:#2828FF"></asp:Label>
                            <asp:HiddenField ID="hfIsSend" Value='<%# Eval("IsSend") %>' runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
			            <ItemTemplate>
			            <tr  align="center">
                            <td colspan="100%">
                                <div id="div<%# Eval("Id") %>" style="display:none;left:30px;OVERFLOW: auto;WIDTH:100%" >
                                    <asp:GridView ID="GridView2"  AutoGenerateColumns="false"  runat="server" DataKeyNames="Id"  SkinID="sgv1" >
                                        <HeaderStyle HorizontalAlign="Left"/>
                                        <Columns>
                                            <asp:TemplateField HeaderText="序号" HeaderStyle-Width="5%">
                                                <ItemTemplate>
                                                    <%#Container.DataItemIndex+1%>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="头像" HeaderStyle-Width="10%">
                                                <ItemTemplate>
                                                    <img src="<%# Eval("HeadImgUrl") %>" alt="" style=" height:36px; width:36px;" />
                                                </ItemTemplate>
                                                <HeaderStyle HorizontalAlign="Center" />
                                            </asp:TemplateField>                                            
                                            <asp:TemplateField HeaderText="昵称"  HeaderStyle-Width="15%">
                                                <ItemTemplate><%# Eval("NickName")%></ItemTemplate>
                                                <ItemStyle HorizontalAlign="Center" />
                                                <HeaderStyle HorizontalAlign="Center" />
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="投票日期" HeaderStyle-Width="15%" >
                                                <ItemTemplate><%#  string.Format("{0:yyyy-MM-dd}",Eval("CreateDate")) %></ItemTemplate>
                                                <ItemStyle HorizontalAlign="Center" />
                                                <HeaderStyle HorizontalAlign="Center" />
                                            </asp:TemplateField>
                                        </Columns>
                                   </asp:GridView>
                                </div>
                             </td>
                        </tr>
			        </ItemTemplate>			       
			        </asp:TemplateField>	

                </Columns>
               
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
            </asp:Panel>
            
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
    
</asp:Content>
