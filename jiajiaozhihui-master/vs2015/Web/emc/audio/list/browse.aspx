<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.audio.list.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程订单">
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="基础数据">
                    <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                        <tr>
                            <td  >
                                <asp:TextBox ID="txtFullName" placeholder="标题" runat="server" Width="120px"></asp:TextBox>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <asp:CheckBox ID="cbIsAct" Checked="true" runat="server" />是否启用    
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <asp:Button ID="btnSearch" runat="server" class="btn" 
                                    onmouseover="this.className='btn_mouseover'" onmouseout="this.className='btn'"  
                                    Text="查询" onclick="btnSearch_Click" />
                            </td>
                        </tr>
                    </table>
                    <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" OnRowDeleting="GridView1_RowDeleting"
                             OnRowDataBound="GridView1_RowDataBound" DataKeyNames="Id" >
                            <Columns>
                                <asp:BoundField DataField="Id" HeaderText="ID" ReadOnly="True">
                                    <ItemStyle Width="20px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="FullName" HeaderText="长标题">
                                    <ItemStyle Width="100px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="ShortName" HeaderText="短标题">
                                    <ItemStyle Width="100px" />
                                </asp:BoundField>
                                <asp:BoundField DataField="SoundSource" HeaderText="音源">
                                </asp:BoundField>
                                <asp:BoundField DataField="Duration" HeaderText="时长">
                                </asp:BoundField>
                                <asp:CommandField ShowDeleteButton="True">
                                    <ItemStyle Width="50px" />
                                </asp:CommandField>
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <a href="javascript:void(0)" onclick='getDuration("<%# Eval("SoundSource") %>",<%# Eval("Id") %>,<%# Container.DataItemIndex %>)'>获取时长</a>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                            <PagerSettings Position="Top"/>
                            <EditRowStyle Width="50px" />
                        </asp:SmartGridView>
                        <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                                CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                                FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                                OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                                ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                                ShowPageIndexBox="always">
                            </asp:AspNetPager>
                            <audio id="audio"></audio>
                            <script>
                                var audio = document.getElementById("audio");
                                var data = {
                                    id:0,
                                    index:0,
                                };
                                function getDuration(src, id, index) {
                                    audio.src = src;
                                    data.id=id;
                                    data.index=index;
                                    audio.load();
                                }
                                audio.addEventListener('loadedmetadata', function () {
                                    var duration = audio.duration;
                                    $.ajax({
                                        url: 'service/mp3.ashx',
                                        type: 'POST',
                                        data: { mp3Id: data.id, duration: duration },
                                        success: function () {
                                            var grid = $("#<%=GridView1.ClientID %>");
                                            var row= $(grid[0].rows[data.index+1]);
                                            var cells=row[0].cells;
                                            var cell=$(cells[4]);
                                            cell.text(parseInt(duration));
                                        }
                                    })
                                })
                        </script>
                </cc1:TabOptionItem>
            </asp:Panel>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    
</asp:Content>
