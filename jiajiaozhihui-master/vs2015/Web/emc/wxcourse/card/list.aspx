<%@ Page Language="C#" MasterPageFile="~/MasterPage/FrameTemplate.Master" AutoEventWireup="true"
    Codebehind="list.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.card.list" Title="无标题页" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="//cdn.bootcss.com/jquery/2.2.0/jquery.js"></script>
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
     <script type="text/javascript" src="/js/comm.js"></script>
    <script src="../../js/ajaxfileupload-1.1.js" type="text/javascript"></script>
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="基础数据">
            <script type="text/javascript">
                var params = {
                    cardId:0,
                    type:''
                };
                function myPrompt(cardId) {
                    var v = prompt("请输入要生成多少张学习卡");
                    if (v > 0) {
                        $.ajax({
                            url: 'provide.ashx',
                            //url:'http://weixin.jiajiaozhihui.cn/emc/wxcourse/card/provide.ashx',
                            type: 'POST',
                            dataType: 'text',
                            data: { cardid: cardId, quantity: v },
                            success: function (res) {
                                alert(res);
                            }
                        });
                    }
                }
                //v:Id值
                function toggle(v) {
                    $("#view").toggle();
                    $("#edit").toggle();
                    $("#btnSave").toggle();
                    $("#btnNew").toggle();
                    $("#btnReturn").toggle();
                    if (v != undefined) {
                        showData(v);
                        params.cardId = v;
                        params.type = "edit";
                    } else {
                        clearData();
                    }
                };
                function clearData() {
                    $("#<%=txtTitle.ClientID %>").val();
                    $("#<%=ddlCardType.ClientID %>").val();
                    $("#<%=txtRemark.ClientID %>").val();
                    $("#txtImgUrl").val();

                    $("#<%=txtStartDate.ClientID %>").val();
                    $("#<%=txtEndDate.ClientID %>").val();

                    var oEditor = FCKeditorAPI.GetInstance("<%=txtDetails.ClientID %>");
                    oEditor.SetHTML("");
                    params.cardId = 0;
                    params.type = "add";
                };
                function showData(id) {
                    $.ajax({
                        url: 'CardProvide.ashx?method=show',
                        type: 'GET',
                        dataType: 'JSON',
                        data: { "cardid": id },
                        success: function (result) {
                            fillData(result);
                        }
                    });
                };
                function fillData(data) {
                    console.log(data);
                    $("#<%=txtTitle.ClientID %>").val(data.title);
                    $("#<%=ddlCardType.ClientID %>").val(data.cardType);
                    $("#<%=txtRemark.ClientID %>").val(data.remark);
                    $("#txtImgUrl").val(data.imgUrl);

                    if (data.imgUrl != "") {
                        $("#btnView").show().on('click', function () {
                            window.open(data.imgUrl, "", "width=600,height=500");
                        });
                        $("#btnDelPic").show().on('click', function () {
                            //onclick ="return confirm('确定要删除图片？');"
                            if (confirm("确定要删除图片？")) {
                                $.ajax({
                                    url: 'CardProvide.ashx?method=delete',
                                    type: 'POST',
                                    dataType: 'text',
                                    data: { cardid: data.id },
                                    success: function (info) {
                                        if (info == "ok") {
                                            $("#txtImgUrl").val("").hide();
                                            $("#btnView").hide();
                                            $("#btnDelPic").hide();
                                            $("#fileUpload").show();
                                        }
                                    }
                                });
                            }
                        });
                        $("#fileUpload").hide();
                        $("#txtImgUrl").show();
                    }
                    $("#<%=txtStartDate.ClientID %>").val(data.startDate);
                    $("#<%=txtEndDate.ClientID %>").val(data.endDate);
                    $("#<%=rblIsAct.ClientID %>").val(data.isAct);

                    var oEditor = FCKeditorAPI.GetInstance("<%=txtDetails.ClientID %>");
                    oEditor.SetHTML(data.detail);

                    $("#btnReturn").on('click', function () {
                        parent.mainbody.location = "list.aspx?state=browse&ClassID=" + data.bagId + "&mediaType=" + 1;
                    })
                }
                function fileUpload(cardid) {
                    var file1 = document.getElementById("fileUpload");
                    postFile(file1.files[0]);
                    function postFile(data) {
                        var req = new XMLHttpRequest();
                        req.open("post", "CardProvide.ashx?method=upload&cardid=" + cardid, false);
                        req.onreadystatechange = function () {
                            if (req.readyState == 4 && req.status == 200) {
                                console.log("....error.......");
                                console.log(req.responseText);
                            }
                        };
                        req.send(data);
                    }
                    /*
                    var filePath = $("#fileUpload").val();
                    if(filePath.indexOf("jpg") != -1 || filePath.indexOf("jpeg") != -1 || filePath.indexOf("png") != -1) {
                        
                    } else {
                        alert("请选择正确的文件格式！");
                        $("#txtImgUrl").val("");
                        return false;
                    }
                    */
                };
                function add(v) {
                    if (params.cardId != 0) return;
                    var jsonParams = {
                        title: $("#<%=txtTitle.ClientID %>").val(),
                        bagid:$("#<%=hfClassID.ClientID %>").val(),
                        startdate: $("#<%=txtStartDate.ClientID %>").val(),
                        enddate: $("#<%=txtEndDate.ClientID %>").val(),
                        detail: escape(v),
                        remark: $("#<%=txtRemark.ClientID %>").val(),
                        cardtype: $("#<%=ddlCardType.ClientID %>").val(),
                        imgurl: $("#txtImgUrl").val(),
                        isact: $("#<%=rblIsAct.ClientID %>").val()
                    };

                    $.ajax({
                        url: 'CardProvide.ashx?method=new',
                        type: 'POST',
                        dataType: 'JSON',
                        data: jsonParams,
                        success: function (result) {
                            if (result.id) {
                                fileUpload(result.id);
                                toggle()
                                parent.mainbody.location = "list.aspx?state=browse&ClassID=" + result.bagId + "&mediaType=" + 1;
                            }
                        }
                    });

                };
                function edit(v) {
                    if(params.cardId==0) return;
                    var jsonParams = {
                        title: $("#<%=txtTitle.ClientID %>").val(),
                        startdate: $("#<%=txtStartDate.ClientID %>").val(),
                        enddate: $("#<%=txtEndDate.ClientID %>").val(),
                        detail: escape(v),
                        remark: $("#<%=txtRemark.ClientID %>").val(),
                        cardtype: $("#<%=ddlCardType.ClientID %>").val(),
                        imgurl: $("#txtImgUrl").val(),
                        isact: $("#<%=rblIsAct.ClientID %>").val(),
                        id: params.cardId
                    };
                    $.ajax({
                        url: 'CardProvide.ashx?method=save',
                        type: 'POST',
                        dataType: 'JSON',
                        data: jsonParams,
                        success: function (result) {
                            if (result.id) {
                                fileUpload(result.id);
                                toggle()
                                parent.mainbody.location = "list.aspx?state=browse&ClassID=" + result.bagId + "&mediaType=" + 1;
                            }
                        }
                    });
                };
                function getValue() {
                /*
                    var v = $("#ctl00_PageBody_txtDetails___Frame").contents().find("body").first();
                    var m = v.children("table").children("tbody").children("tr").eq(1).children("td#xEditingArea");
                    var fram = m.children("iframe").contents().find("body");

                    console.log(fram.html());
                    return fram.html();
                    */
                    var oEditor = FCKeditorAPI.GetInstance("<%=txtDetails.ClientID %>");
                    var editorValue = oEditor.GetHTML();
                    return editorValue;
                };

                $(function () {

                    $("#btnNew").click(function () {
                        toggle();
                    });
                    $("#btnSave").click(function () {
                        try {
                            var v = getValue();
                            if (params.type == "add") {
                                add(v);
                            } else {
                                edit(v);
                            }
                        } catch (e) {
                        } finally {
                            params.cardId = 0;
                        }
                    });
                })
            </script>
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td  style=" text-align:right;">
                        <input  type="button" name="btnNew" value="新建学习卡" id="btnNew" class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" />
                        <input  type="button" name="btnSave" value="保存" id="btnSave" class="btn" style=" display:none;" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" />
                        <input  type="button" name="btnReturn" value="返回" id="btnReturn" class="btn" style=" display:none;" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" />
                     </td>
                </tr>
            </table>
            <div id="view">
                <asp:SmartGridView ID="GridView1" runat="server" AutoGenerateColumns="False" Width="98%" SkinID ="sgv2" 
                 OnRowDeleting="GridView1_RowDeleting" OnRowDataBound="GridView1_RowDataBound"
                 DataKeyNames="Id" AllowPaging="True" PageSize="50">
                 <Columns>
                     <asp:BoundField DataField="Title" HeaderText="卡名" ReadOnly="True">
                         <ItemStyle Width="100px" />
                     </asp:BoundField>
                     <asp:BoundField DataField="CardType" HeaderText="卡类型" ReadOnly="True">
                         <ItemStyle Width="100px" />
                     </asp:BoundField>
                     <asp:TemplateField HeaderText="有效期">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <%# string.Format("{0:yyyy-MM-dd}",Eval("StartDate")) %>至<%# string.Format("{0:yyyy-MM-dd}",Eval("EndDate")) %>
                        </ItemTemplate>
                     </asp:TemplateField>
                     <asp:BoundField DataField="Quantity" HeaderText="发卡数量" ReadOnly="True">
                         <ItemStyle Width="100px" />
                     </asp:BoundField>
                     <asp:BoundField DataField="CreateDate" DataFormatString="{0:yyyy-MM-dd}" HeaderText="创建日期">
                         <ItemStyle Width="150px" />
                     </asp:BoundField>
                     <asp:CommandField ShowDeleteButton="True">
                         <ItemStyle Width="50px" />
                     </asp:CommandField>
                     <asp:CommandField ShowSelectButton="true" SelectText="生成卡">
                         <ItemStyle Width="50px" />
                     </asp:CommandField>
                 </Columns>
                 <PagerSettings Position="Top"/>
                 <EditRowStyle Width="50px" />
             </asp:SmartGridView>
            </div>
            <div id="edit" style=" display:none;">
                <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                    <tr>
                        <td>卡名</td>
                        <td>
                            <asp:TextBox ID="txtTitle" runat="server" Width="200px"></asp:TextBox>
                        </td>

                    </tr>
                    <tr>
                        <td>卡类型</td>
                        <td>
                            <asp:DropDownList ID="ddlCardType" runat="server">
                                <asp:ListItem Text="金卡" Value="1"></asp:ListItem>
                                <asp:ListItem Text="银卡" Value="2"></asp:ListItem>
                                <asp:ListItem Text="铜卡" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>有效日期</td> 
                        <td>
                            <asp:TextBox ID="txtStartDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server"></asp:TextBox>
                            至
                            <asp:TextBox ID="txtEndDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})" runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>详情</td>
                        <td>
                            <FCKeditorV2:FCKeditor ID="txtDetails" runat="server" DefaultLanguage="zh-cn" Height="300px" Width="100%" ></FCKeditorV2:FCKeditor>
                        </td>
                    </tr>
                    <tr>
                        <td>图片</td>
                        <td >
                            <input id="txtImgUrl"  Width="50%" style=" display:none" />
                            <!--<asp:FileUpload ID="fileUpload" runat="server"  />-->
                            <input type="file" id="fileUpload" name="fileUpload"   />
                            <a id="btnView"   class="btn" onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'"  href="javascript:void(0)"  style=" display:none"   >查看</a>
                            <input id="btnDelPic" type="button"  value="删除" class="btn" style=" display:none"    />
                        </td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td>
                            <asp:TextBox ID="txtRemark" Width="100%"  TextMode="MultiLine" Rows="3"  runat="server"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>是否有效</td>
                        <td>
                            <asp:DropDownList ID="rblIsAct" RepeatDirection="Horizontal" runat="server">
                                <asp:ListItem Text="有效" Value="1"></asp:ListItem>
                                <asp:ListItem Text="无效" Value="0"></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </div>
            <asp:HiddenField ID="hfClassID" runat="server" />
            <asp:HiddenField ID="hfMediaType" runat="server" />
            <asp:HiddenField ID="hfEditCardId" runat="server" />

        </cc1:TabOptionItem>
        <cc1:TabOptionItem ID="TabOptionItem2" runat="server" Tab_Name="特训卡下载">
            <table border="0" cellpadding="0" cellspacing="0" style="width:98%" class="fromtable">
                <tr>
                    <td>卡类型</td>
                    <td><asp:DropDownList ID="ddlCourseCardType" runat="server"></asp:DropDownList></td>
                    <td>日期</td>
                    <td>
                        <asp:TextBox ID="txtFirstDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})"  runat="server"></asp:TextBox>
                        &nbsp;&nbsp-&nbsp;&nbsp;
                        <asp:TextBox ID="txtSecondDate" onFocus="WdatePicker({isShowClear:true,readOnly:true})"  runat="server"></asp:TextBox>
                    </td>
                    <td>
                        <asp:CheckBoxList ID="cblActive" RepeatDirection="Horizontal" runat="server">
                            <asp:ListItem Value="1"　 Text="激活"></asp:ListItem>
                            <asp:ListItem Value="0" Text="未激活"></asp:ListItem>
                            <asp:ListItem Value="" Text="全部" Selected="True"></asp:ListItem>
                        </asp:CheckBoxList>
                    </td>
                    <td><asp:Button ID="btnSearch" Text="查询" class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                            runat="server" onclick="btnSearch_Click" /></td>
                    <td>
                        <asp:CheckBox　id="cbAll" Text="全部下载" runat="server" />

                        <asp:Button ID="btnDown" Text="下载" class="btn" 
                            onmouseout="this.className='btn'" onmouseover="this.className='btn_mouseover'" 
                            runat="server" onclick="btnDown_Click" /></td>
                </tr>
            </table>
            <asp:SmartGridView ID="GridView2" runat="server" AutoGenerateColumns="False" 
                Width="98%" SkinID ="sgv2" 
                 DataKeyNames="Id" 
                onrowcommand="GridView2_RowCommand" onrowdatabound="GridView2_RowDataBound">
                 <Columns>
                     <asp:TemplateField ItemStyle-Width="20px">
                        <HeaderTemplate>
                            <asp:CheckBox ID="all" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox ID="item" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True">
                         <ItemStyle Width="50px" />
                     </asp:BoundField>
                     <asp:BoundField DataField="Title" HeaderText="卡名" ReadOnly="True">
                         <ItemStyle Width="100px" />
                     </asp:BoundField>
                     <asp:BoundField DataField="CardNo" HeaderText="卡编号" ReadOnly="True">
                         <ItemStyle Width="100px" />
                     </asp:BoundField>
                     <asp:TemplateField HeaderText="有效期">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <%# string.Format("{0:yyyy-MM-dd}", Eval("StardDate"))%>至<%# string.Format("{0:yyyy-MM-dd}",Eval("EndDate")) %>
                        </ItemTemplate>
                     </asp:TemplateField>
                     <asp:BoundField DataField="IsUing" HeaderText="是否激活" ReadOnly="True">
                         <ItemStyle Width="100px" />
                     </asp:BoundField>
                     <asp:BoundField DataField="RegistDate" HeaderText="激活日期" ReadOnly="True">
                         <ItemStyle Width="150px" />
                     </asp:BoundField>
                     <asp:BoundField DataField="DownNumber" HeaderText="下载量" ReadOnly="True">
                         <ItemStyle Width="100px" />
                     </asp:BoundField>
                     <asp:BoundField DataField="CreateDate" HeaderText="创建日期" ReadOnly="True">
                         <ItemStyle Width="150px" />
                     </asp:BoundField>
                     <asp:TemplateField>
                        <ItemTemplate>
                            <asp:LinkButton ID="lbLink" Text="下载" runat="server" CommandArgument='<%# Eval("Id") %>'></asp:LinkButton>
                        </ItemTemplate>
                     </asp:TemplateField>
                 </Columns>
                 <PagerSettings Position="Top"/>
                 <EditRowStyle Width="50px" />
             </asp:SmartGridView>

             <asp:AspNetPager ID="AspNetPager1" runat="server" class="aspnetpager" 
                        CustomInfoHTML="&lt;font color='red'&gt;&lt;b&gt;%currentPageIndex%&lt;/b&gt;&lt;/font&gt;/%PageCount%&nbsp; &nbsp;&nbsp;   共 %RecordCount% 记录   每页 %PageSize% 条" 
                        FirstPageText="首 页" LastPageText="尾 页" NextPageText="下一页" 
                        OnPageChanged="AspNetPager1_PageChanged" PageSize="50" PrevPageText="上一页" 
                        ShowCustomInfoSection="right" ShowDisabledButtons="false" 
                        ShowPageIndexBox="always">
                    </asp:AspNetPager>

        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    
</asp:Content>
