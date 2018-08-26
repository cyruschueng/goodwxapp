<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.prize.doc.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script type="text/javascript"  src="/js/comm.js"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="规则说明">
              <div>
                <h3><span id="spanTitle" runat="server"></span></h3>
                <hr />
              </div>  
              <div>
                    <span>规则说明</span>
                    <hr />
                    <div class="edit" style=" display:none;">
                        <FCKeditorV2:FCKeditor ID="txtInfoDesc" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor>
                    </div>
                    <div class="view">
                        <pre id="preDetail" runat="server"></pre>
                    </div>
                    <div class="edit" style=" display:none;">
                        活动是否启用：<asp:CheckBox ID="cbDocIsAct" runat="server" />
                    </div>
                    <div class="view">
                        活动是否启用：<asp:Label ID="lbDocIsAct" runat="server"></asp:Label>
                    </div>
              </div>
              <div style="padding-top:20px;">
                <asp:Button ID="btnEdit"  Text="编辑" class="btn" 
                      onmouseout="this.className='btn'" data-action="edit" onmouseover="this.className='btn_mouseover'"  
                      runat="server" OnClick="btnEdit_Click"    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="button" value="取消" id="bntCancel" class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" style=" display:none;"   />
              </div>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="规则设置">
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                        <td>下限</td>
                        <td  >
                            <asp:TextBox ID="txtLowLimit" TextMode="Number" runat="server" Width="120px"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="Validator1" runat="Server" ControlToValidate="txtLowLimit" ValidationGroup="add" ErrorMessage="下限必须输入" Display="Static">*下限必须输入</asp:RequiredFieldValidator>
                        </td>
                        <td  >上限</td>
                        <td  >
                            <asp:TextBox ID="txtUpperLimit" TextMode="Number" runat="server" Width="120px"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="Server" ControlToValidate="txtUpperLimit" ValidationGroup="add" ErrorMessage="上限必须输入" Display="Static">*上限必须输入</asp:RequiredFieldValidator>
                        </td>
                        <td  >名次</td>
                        <td  >
                            <asp:TextBox ID="txtRanking" TextMode="Number" runat="server" Width=120px ></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="Server" ControlToValidate="txtRanking" ValidationGroup="add" ErrorMessage="名次必须输入" Display="Static">*名次必须输入</asp:RequiredFieldValidator>
                        </td>
                        <td  >奖品</td>
                        <td  >
                            <asp:DropDownList  ID="ddlPrizse" runat="server"></asp:DropDownList>
                            <asp:RequiredFieldValidator id="RequiredFieldValidator3"  runat="server" ValidationGroup="add" ErrorMessage="奖品必须选择" ControlToValidate="ddlPrizse" InitialValue="">*奖品必须选择</asp:RequiredFieldValidator>
                        </td>
                        <td >是否启用<asp:CheckBox ID="cbIsAct" runat="server" Checked="True" /></td>
                        <td ><asp:Button ID="btnAdd" runat="server" class="btn" onmouseover="this.className='btn_mouseover'" ValidationGroup="add" onmouseout="this.className='btn'" OnClick="btnAdd_Click" Text="增加" /></td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
                Width="98%" SkinID ="sgv2"  OnRowDataBound="GridView1_RowDataBound" DataKeyNames="ID" AllowPaging="True" PageSize="50" 
                 onrowcommand="GridView1_RowCommand">
                    <Columns>
                        <asp:BoundField DataField="ID" HeaderText="ID" ReadOnly="True">
                            <ItemStyle Width="20px" />
                        </asp:BoundField>

                        <asp:TemplateField HeaderText="下限">
                            <EditItemTemplate>
                                <asp:TextBox ID="gv_low_limit" TextMode="Number" runat="server" Text='<%# Bind("LowLimit") %>'></asp:TextBox>
                                 <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="gv_low_limit" ErrorMessage="必填！" ValidationGroup="EVC"></asp:RequiredFieldValidator>
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:Label ID="Label1" runat="server" Text='<%# Bind("LowLimit") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField HeaderText="上限">
                            <EditItemTemplate>
                                <asp:TextBox ID="gv_upper_limit" TextMode="Number" runat="server" Text='<%# Bind("UpperLimit") %>'></asp:TextBox>
                                 <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="gv_upper_limit" ErrorMessage="必填！" ValidationGroup="EVC"></asp:RequiredFieldValidator>
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:Label ID="Label2" runat="server" Text='<%# Bind("UpperLimit") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField HeaderText="名次">
                            <EditItemTemplate>
                                <asp:TextBox ID="gv_ranking" TextMode="Number" runat="server" Text='<%# Bind("Ranking") %>'></asp:TextBox>
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="gv_ranking" ErrorMessage="必填！" ValidationGroup="EVC"></asp:RequiredFieldValidator>
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:Label ID="Label3" runat="server" Text='<%# Bind("Ranking") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>

                        <asp:TemplateField HeaderText="奖品">
                            <ItemTemplate>
                                <asp:HyperLink Target="_blank" NavigateUrl='<%# Eval("GoodsLink").ToString() %>' runat="server">
                                    <asp:Image ID="Image1" runat="server" style="height:40px;" ImageUrl='<%# Eval("ImgUrl") %>' />
                                </asp:HyperLink>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:DropDownList ID="gv_goodsid" runat="server"></asp:DropDownList>
                                <asp:HiddenField ID="gv_hfgoodsid" Value='<%# Eval("GoodsId").ToString() %>' runat="server" />
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="gv_goodsid" InitialValue="" ErrorMessage="必填！" ValidationGroup="EVC"></asp:RequiredFieldValidator>
                            </EditItemTemplate>

                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="启用">
                            <ItemTemplate>
                                <asp:Label ID="Label4" Text='   <%# Eval("IsAct").ToString()=="1"?"是":""  %>' runat="server"></asp:Label>
                            </ItemTemplate>
                            <EditItemTemplate>
                                <asp:CheckBox ID="gv_isact" Checked='<%# Eval("IsAct").ToString()=="1"?true:false  %>' runat="server" />
                            </EditItemTemplate>
                            <ItemStyle Width="50px" />
                        </asp:TemplateField>
                        <asp:TemplateField ShowHeader="False">
                            <EditItemTemplate>
                                <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="True" CommandName="Update" Text="更新" ValidationGroup="EVC"></asp:LinkButton>
                                <asp:LinkButton ID="LinkButton2" runat="server" CausesValidation="False" CommandName="Cancel" Text="取消"></asp:LinkButton>           
                            </EditItemTemplate>
                            <ItemTemplate>
                                <asp:LinkButton ID="LinkButton3" runat="server" CausesValidation="False" CommandName="Edit" CommandArgument='<%# Container.DataItemIndex %>' Text="编辑"></asp:LinkButton>
                                <asp:LinkButton ID="LinkButton4" runat="server" CausesValidation="False" CommandName="Delete" Text="删除"></asp:LinkButton>
                            </ItemTemplate>
                            <ItemStyle Width="100px" />       
                        </asp:TemplateField>
                    </Columns>
                    <PagerSettings Position="Top"/>
                    <EditRowStyle Width="50px" />
                </asp:SmartGridView>
        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem3" runat="server" Tab_Name="练习实践设置">
            <style>
                .show{ display:inline-block;}
                .hide{ display:none;}
            </style>
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                        <td style="width:100px;">国学达人</td>
                        <td  >
                            <asp:TextBox ID="txtGxdrItemId" CssClass="tab3_edit hide" TextMode="Number" placeholder="国学达人活动ID"  runat="server" Width="120px"></asp:TextBox>
                            <asp:Label ID="lbGxdrItemId" CssClass="tab3_view show"  runat="server"></asp:Label>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator8" runat="Server" ControlToValidate="txtGxdrItemId" ValidationGroup="config" ErrorMessage="国学达人必须输入" Display="Static">*国学达人必须输入</asp:RequiredFieldValidator>
                        </td>
                </tr>
                <tr>
                        <td  style="width:100px;">家教顾问</td>
                        <td  >
                            <asp:TextBox ID="txtGeWenId" CssClass="tab3_edit hide" TextMode="Number" runat="server" Width="120px"></asp:TextBox>
                            <asp:Label ID="lbGeWenId" CssClass="tab3_view show"  runat="server"></asp:Label>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator9" runat="Server" ControlToValidate="txtGeWenId" ValidationGroup="config" ErrorMessage="家教顾问必须输入" Display="Static">*家教顾问必须输入</asp:RequiredFieldValidator>
                        </td>
                </tr>
                <tr>
                        <td  style="width:100px;">知行社AppId</td>
                        <td  >
                            <asp:TextBox ID="txtZxsAppId" CssClass="tab3_edit hide"  runat="server" Width=120px ></asp:TextBox>
                            <asp:Label ID="lbZxsAppId" CssClass="tab3_view show"  runat="server"></asp:Label>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator10" runat="Server" ControlToValidate="txtZxsAppId" ValidationGroup="config" ErrorMessage="知行社AppId必须输入" Display="Static">*知行社AppId必须输入</asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td  style="width:100px;">知行社主页</td>
                        <td  >
                            <asp:TextBox ID="txtZxstHash" CssClass="tab3_edit hide"  runat="server" Width=120px ></asp:TextBox>
                            <asp:Label ID="lbZxsHash" CssClass="tab3_view show"  runat="server"></asp:Label>
                            <asp:RequiredFieldValidator id="RequiredFieldValidator11"  runat="server" ValidationGroup="config" ErrorMessage="主页必须必须输入" ControlToValidate="txtZxstHash" >*主页必须必须输入</asp:RequiredFieldValidator>
                        </td>
                </tr>
                <tr>
                        <td  style="width:100px;">知行社主题Id</td>
                        <td>
                            <asp:TextBox ID="txtZxsThemeId" CssClass="tab3_edit hide" TextMode="Number"  runat="server" Width=120px ></asp:TextBox>
                            <asp:Label ID="lbZxsThemeId" CssClass="tab3_view show"  runat="server"></asp:Label>
                            <asp:RequiredFieldValidator id="RequiredFieldValidator12"  runat="server" ValidationGroup="config" ErrorMessage="知行社主题Id必须必须输入" ControlToValidate="txtZxsThemeId" >*知行社主题Id必须必须输入</asp:RequiredFieldValidator>
                        </td>
                </tr>
                <tr>
                        <td  style="width:100px;">知行社主题名称</td>
                        <td>
                            <asp:TextBox ID="txtZxsTitle" CssClass="tab3_edit hide"  runat="server" Width=120px ></asp:TextBox>
                            <asp:Label ID="lbZxsTitle" CssClass="tab3_view show"  runat="server"></asp:Label>
                            <asp:RequiredFieldValidator id="RequiredFieldValidator13"  runat="server" ValidationGroup="config" ErrorMessage="知行社主题名称必须必须输入" ControlToValidate="txtZxsTitle" >*知行社主题名称必须必须输入</asp:RequiredFieldValidator>
                        </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="button" id="btnConfig" value="编辑" name="edit" class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" />
                        <asp:Button ID="btnSaveConfig" ValidationGroup="config" style=" display:none;" Text="保存"  class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                            runat="server" onclick="btnSaveConfig_Click" />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" id="btnBackConfig" value="返回"  style=" display:none;"  class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" />
                    </td>
                </tr>
            </table>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfClassID" runat="server" />
    <asp:HiddenField ID="hfIsact" runat="server" />
    <script>
        $("#<%=btnEdit.ClientID %>").click(function () {
            var name = $(this).data("action");
            console.log(name);
            if (name == "edit") {
                $(".edit").show();
                $(".view").hide();
                $("#bntCancel").show();
                $(this).data("action", "save").val("保存");
                return false;
            } else if (name == "save") {
                $(this).data("action", "edit").val("编辑");
                $(".edit").hide();
                $(".view").show();
                $("#bntCancel").hide();
                return true;
            }
        });
        $("#bntCancel").click(function () {
            $("#<%=btnEdit.ClientID %>").data("action", "edit").val("编辑");
            $(".edit").hide();
            $(".view").show();
            $(this).hide();
        });
        $("#btnConfig").click(function () {
            var btn = $(this);
            if (btn.attr("name") == "edit") {
                $(".tab3_edit").removeClass("hide").addClass("show");
                $(".tab3_view").removeClass("show").addClass("hide");
                $("#<%=btnSaveConfig.ClientID %>").show();
                $("#btnBackConfig").show();
                btn.hide();
            } else {

            }
        });
        $("#btnBackConfig").click(function () {
            $(".tab3_edit").removeClass("show").addClass("hide");
            $(".tab3_view").removeClass("hide").addClass("show");
            $("#btnBackConfig").hide();
            $("#<%=btnSaveConfig.ClientID %>").hide();
        });
    </script>
</asp:Content>
