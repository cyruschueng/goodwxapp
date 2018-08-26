<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.activity.testquestion.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="公益品">
            <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
            <asp:Panel ID="Panel1" GroupingText="查询条件" runat="server">
                <style>
                    select,.select{ width:95%;}
                   .updateset{ position:fixed; top:0px; left:0px; z-index:9999; display:none; height:100%; width:100%; background:rgba(250,250,250,0.3); border-bottom:2px solid #ccc; border-right:2px solid #ccc; }
                   .updateset .content{ width:1002px; height:600px; background:#fff; margin:50px auto; }
                </style>
                <script>
                    $(function () {
                        $("#btnClose").click(function () {
                            $(".updateset").hide();
                        });
                    })
                </script>
                <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                    <tr>
                        <td>试题</td>
                        <td><asp:TextBox ID="txtTestQuestion" runat="server"></asp:TextBox></td>
                        <td>类型</td>
                        <td><asp:DropDownList ID="ddlQuestionType" runat="server" CssClass="select"></asp:DropDownList></td>
                        <td>等级</td>
                        <td><asp:DropDownList ID="ddlGrade" runat="server" CssClass="select"></asp:DropDownList></td>
                        
                    </tr>
                    <tr>
                        <td colspan="6">
                            <asp:Button ID="btnSearch" runat="server" Text="查询"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="btnSearch_Click1"  />
                         &nbsp;&nbsp;&nbsp;
                         <asp:FileUpload ID="FileUpload1" runat="server" />
                          <asp:Button ID="btnInport" runat="server" Text="导入"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" onclick="btnInport_Click" 
                                  />
                         &nbsp;&nbsp;&nbsp;&nbsp;
                          <asp:Button ID="Button2" runat="server" Text="导出"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="Button2_Click" />


                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <asp:Button ID="Button4" runat="server" Text="设置"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                                onclick="Button4_Click" />
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <asp:SmartGridView ID="GridView1" runat="server"  AutoGenerateColumns="False"
                Width="99%"  DataKeyNames="ID"
                 OnRowDataBound="GridView1_RowDataBound" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onrowcancelingedit="GridView1_RowCancelingEdit" 
                onrowediting="GridView1_RowEditing" onrowupdating="GridView1_RowUpdating">
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px" HeaderStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" ItemStyle-Width="50px" HeaderStyle-Width="50px" />
                    <asp:BoundField DataField="TestQuestion" HeaderText="试题" ReadOnly="true" HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="300px" HeaderStyle-Width="300px" />
                    <asp:TemplateField HeaderText="答案"  HeaderStyle-HorizontalAlign="Center" ItemStyle-CssClass="" >
                        <ItemTemplate>
                            <label title="<%# "A："+ Eval("Answer1").ToString().Replace("/a","") +" B："+ Eval("Answer2").ToString().Replace("/b","") +" C："+ Eval("Answer3").ToString().Replace("/c","") +" D："+ Eval("Answer4").ToString().Replace("/d","") %>"><%# "A：" + Eval("Answer1").ToString().Replace("/a", "") + " B：" + Eval("Answer2").ToString().Replace("/b", "") + " C：" + Eval("Answer3").ToString().Replace("/c", "") + " D：" + Eval("Answer4").ToString().Replace("/d", "")%></label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    
                    <asp:TemplateField HeaderText="正确答案" ItemStyle-Width="80px" HeaderStyle-Width="80px" HeaderStyle-HorizontalAlign="Center" >
                        <ItemTemplate >
                            <%# Eval("RightAnswer").ToString()%>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:DropDownList ID="ddlRightAnswer" runat="server">
                                <asp:ListItem Text="" Value=""></asp:ListItem>
                                <asp:ListItem Text="A" Value="A"></asp:ListItem>
                                <asp:ListItem Text="B" Value="B"></asp:ListItem>
                                <asp:ListItem Text="C" Value="C"></asp:ListItem>
                                <asp:ListItem Text="D" Value="D"></asp:ListItem>
                            </asp:DropDownList>
                            <asp:Label ID="lblRightAnswer" runat="server" Text='<%# Eval("RightAnswer")%>' Style="display: none;"></asp:Label>
                        </EditItemTemplate>
                    </asp:TemplateField>

                    <asp:TemplateField HeaderText="类型" ItemStyle-Width="100px" HeaderStyle-Width="100px" HeaderStyle-HorizontalAlign="Center">
                        <ItemTemplate >
                            <%# GetNameByValue("weixin.activity.testquestion.type", Eval("QuestionType").ToString()) %>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:DropDownList ID="ddlQuestionType" runat="server"></asp:DropDownList>
                            <asp:Label ID="lblQuestionType" runat="server" Text='<%# Eval("QuestionType")%>' Style="display: none;"></asp:Label>
                        </EditItemTemplate>
                    </asp:TemplateField>

                    <asp:TemplateField HeaderText="等级"  ItemStyle-Width="100px" HeaderStyle-Width="100px" HeaderStyle-HorizontalAlign="Center">
                        <ItemTemplate >
                            <%# GetNameByValue("weixin.activity.testquestion.grade", Eval("Grade").ToString())%>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:DropDownList ID="ddlGrade" runat="server"></asp:DropDownList>
                            <asp:Label ID="lblGrade" runat="server" Text='<%# Eval("Grade")%>' Style="display: none;"></asp:Label>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="CreateDate" HeaderText="创建日期" DataFormatString="{0:yyyy-MM-dd}" ReadOnly="true" ItemStyle-Width="100px" HeaderStyle-Width="100px" HeaderStyle-HorizontalAlign="Center" />
                    <asp:CommandField ShowEditButton="True" HeaderText="操作" EditText="编辑" >
                            <ItemStyle Width="70px" HorizontalAlign="Center" />
                            <HeaderStyle Width="70px"  HorizontalAlign="Center"/>
                        </asp:CommandField>
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <div class="updateset" runat="server" id="updateset">
        <div class="content">
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td colspan="3"></td>
                </tr>
            </table>
            <table border="0" cellpadding="2" cellspacing="0" width="100%" class="fromtable">
                <tr>
                    <td>类型</td>
                    <td><asp:DropDownList ID="ddlQuestionType2" runat="server" CssClass="select"></asp:DropDownList></td>
                    <td>等级</td>
                    <td><asp:DropDownList ID="ddlGrade2" runat="server" CssClass="select"></asp:DropDownList></td>
                    <td>答题时间(秒)</td>
                    <td><asp:TextBox ID="txtEveryTime" runat="server"></asp:TextBox></td>
                </tr>
                <tr>
                    <td>多少题目</td>
                    <td><asp:TextBox ID="txtAmount" runat="server"></asp:TextBox></td>
                    <td>达标(100满分)</td>
                    <td><asp:TextBox ID="txtUpperLimit" runat="server"></asp:TextBox></td>
                    <td>是否启用时间</td>
                    <td><asp:CheckBox ID="cbIsActTime" Checked="true" runat="server"></asp:CheckBox></td>
                    
                </tr>
                <tr>
                    <td colspan="6">
                          <asp:Button ID="Button1" runat="server" Text="新增"  class="btn" 
                            onmouseout="this.className='btn'" 
                              onmouseover="this.className='btn_mouseover'" onclick="Button1_Click" 
                                  />
                         &nbsp;&nbsp;&nbsp;
                          <asp:Button ID="Button3" runat="server" Text="删除"  class="btn" 
                            onmouseout="this.className='btn'" 
                              onmouseover="this.className='btn_mouseover'" onclick="Button3_Click"  
                                  />

                        &nbsp;&nbsp;&nbsp;
                        <input type="button" id="btnClose" value="关闭" class="btn" 
                            onmouseout="this.className='btn'" 
                              onmouseover="this.className='btn_mouseover'" />
                    </td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView2" runat="server"  AutoGenerateColumns="False"
                Width="100%"  DataKeyNames="ID" MouseOverCssClass="OverRow" 
                SkinID="sgv1" onrowcancelingedit="GridView2_RowCancelingEdit" 
                onrowdatabound="GridView2_RowDataBound" onrowediting="GridView2_RowEditing" 
                onrowupdating="GridView2_RowUpdating"  >
                <Columns>
                    <asp:TemplateField ItemStyle-Width="20px" HeaderStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="ID" HeaderText="编号" ReadOnly="true" ItemStyle-Width="50px" HeaderStyle-Width="50px" />
                    
                    <asp:TemplateField HeaderText="类型"  HeaderStyle-HorizontalAlign="Center"  >
                        <ItemTemplate>
                            <%# GetNameByValue("weixin.activity.testquestion.type", Eval("QuestionType").ToString()) %>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:DropDownList ID="ddlQuestionType" runat="server"></asp:DropDownList>
                            <asp:Label ID="lblQuestionType" runat="server" Text='<%# Eval("QuestionType")%>' Style="display: none;"></asp:Label>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="等级"  HeaderStyle-HorizontalAlign="Center"  >
                        <ItemTemplate>
                            <%# GetNameByValue("weixin.activity.testquestion.grade", Eval("Grade").ToString())%>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:DropDownList ID="ddlGrade" runat="server"></asp:DropDownList>
                            <asp:Label ID="lblGrade" runat="server" Text='<%# Eval("Grade")%>' Style="display: none;"></asp:Label>
                        </EditItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="答题时间"  HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="100px" HeaderStyle-Width="100px" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <%# Eval("EveryTime").ToString() %>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="txtEveryTime" Text='<%# Eval("EveryTime") %>' runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>

                    <asp:TemplateField HeaderText="多少题目"  HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="100px" HeaderStyle-Width="100px" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <%# Eval("Amount").ToString()%>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="txtAmount" Text='<%#Eval("Amount") %>' runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>

                    <asp:TemplateField HeaderText="分数"  HeaderStyle-HorizontalAlign="Center"  ItemStyle-Width="100px" HeaderStyle-Width="100px" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <%# Eval("UpperLimit").ToString()%>
                        </ItemTemplate>
                        <EditItemTemplate>
                            <asp:TextBox ID="txtUpperLimit" Text='<%#Eval("UpperLimit") %>' runat="server"></asp:TextBox>
                        </EditItemTemplate>
                    </asp:TemplateField>

                    <asp:CommandField ShowEditButton="True" HeaderText="操作" EditText="编辑" >
                            <ItemStyle Width="70px" HorizontalAlign="Center" />
                            <HeaderStyle Width="70px"  HorizontalAlign="Center"/>
                        </asp:CommandField>
                </Columns>
                <CascadeCheckboxes>
                    <asp:CascadeCheckbox ChildCheckboxID="item" ParentCheckboxID="all" />
                </CascadeCheckboxes>
                <CheckedRowCssClass CheckBoxID="item" CssClass="SelectedRow" />
                <PagerSettings Position="Bottom"></PagerSettings>
            </asp:SmartGridView>
        </div>
    </div>
    <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="15" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>
</asp:Content>
