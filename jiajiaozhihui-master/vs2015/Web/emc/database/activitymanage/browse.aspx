<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.database.activitymanage.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <asp:Panel ID="Panel1" GroupingText="" runat="server">
                <style>
                   
                </style>
                <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" >
                <Columns>
                    <asp:BoundField DataField="ID" HeaderText="编号" HeaderStyle-Width="60px" ItemStyle-Width="60px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="ActivityName" HeaderText="活动名称"  />
                    <asp:BoundField DataField="ReadNumber" HeaderText="阅读数" HeaderStyle-Width="80px" ItemStyle-Width="80px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="LikeNumber" HeaderText="点赞数"  HeaderStyle-Width="80px" ItemStyle-Width="80px" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" />
                    <asp:BoundField DataField="ShareNumber" HeaderText="分享数"  HeaderStyle-Width="80px" ItemStyle-Width="80px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center"/>
                    <asp:BoundField DataField="StartDate" HeaderText="开始日期" DataFormatString="{0:yyyy-MM-dd HH:mm:ss}"  HeaderStyle-Width="120px" ItemStyle-Width="120px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center"/>
                    <asp:BoundField DataField="EndDate" HeaderText="结束日期" DataFormatString="{0:yyyy-MM-dd HH:mm:ss}" HeaderStyle-Width="120px" ItemStyle-Width="120px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center"/>
                    
                    <asp:TemplateField HeaderText="是否有效" HeaderStyle-Width="80px" ItemStyle-Width="80px" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <%# Eval("IsAct").ToString()=="0" || Eval("IsAct").GetType()== typeof(DBNull)?"无效":"有效" %>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="CreateDate" HeaderText="创建日期"  HeaderStyle-Width="120px" ItemStyle-Width="120px"  ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" DataFormatString="{0:yyyy-MM-dd}" />
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
