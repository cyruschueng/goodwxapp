<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.content.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script>
        $("#ToolBarsDiv").show();
    </script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程内容">
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"  OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating"
                    OnRowCancelingEdit="GridView1_RowCancelingEdit"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" >
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="Id" HeaderText="编号" ReadOnly="true" />
                    <asp:BoundField DataField="Type" HeaderText="类型"  ReadOnly="true"/>
                    <asp:BoundField DataField="Cname" HeaderText="姓名"  />
                    <asp:BoundField DataField="Roles" HeaderText="角色"  ReadOnly="true"/>
                    <asp:BoundField DataField="Sn" HeaderText="顺序"  />
                    <asp:BoundField DataField="Duration" HeaderText="时长(毫秒)"  />
                    <asp:BoundField DataField="Interval" HeaderText="间隔(毫秒)"  />
                    <asp:BoundField DataField="IsAct" HeaderText="是否发布"  ReadOnly="true"/>
                    <asp:TemplateField HeaderText="是否显示">
                        <ItemTemplate>
                            <asp:Label Text='<%# Eval("AtOnceShow").ToString()=="1"?"显示":"隐藏"  %>' runat="server"></asp:Label>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:CheckBox ID="cbAtOnceShow"  Checked=<%# Eval("AtOnceShow").ToString()=="1"?true:false %>  runat="server" />
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <ItemStyle Width="50px" />
                        <ItemTemplate>
                            <a href="javascript:void(0)" onclick='getDuration("<%# Eval("Url") %>",<%# Eval("Id") %>,<%# Container.DataItemIndex %>)'>获取时长</a>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:CommandField ShowEditButton="True">
                            <ItemStyle Width="50px" />
                        </asp:CommandField>
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
            <asp:HiddenField ID="hfSectionId" runat="server" />

        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfId" runat="server" />
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
                try{
                    audio.src = src;
                    data.id=id;
                    data.index=index;
                    audio.load();
                    audio.erro
                }catch(e){
                    console.log(e);
                }
            }
            audio.addEventListener('loadedmetadata', function () {
                var duration = audio.duration;
                console.log(duration);
                $.ajax({
                    url: 'service/FileHelper.ashx',
                    type: 'POST',
                    data: { mp3Id: data.id, duration: duration },
                    success: function () {
                        var grid = $("#<%=GridView1.ClientID %>");
                        var row= $(grid[0].rows[data.index+1]);
                        var cells=row[0].cells;
                        var cell=$(cells[6]);
                        cell.text(parseInt(duration));
                    }
                })
            })
    </script>

</asp:Content>
