<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true" CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.wxcourse.timer.browse" Title="无标题页" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script  src="/js/emccommon.js"></script>
    
    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="课程执行计划">
            <script src="//cdn.bootcss.com/jquery/2.2.1/jquery.js"></script>
            <script src="../../../js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
            <style>
                .row{ padding:5px 0;}
            </style>
            <script>
                $(function () {
                    var playType = $("#<%=ddlPlanType.ClientID %>");
                    var repeatType = $("#<%=ddlRepeatType.ClientID %>");
                    var panel2 = $("#<%=Panel2.ClientID %>");
                    var panel3 = $("#<%=Panel3.ClientID %>");
                    var panel4 = $("#<%=Panel4.ClientID %>");
                    var hfpanel2 = $("#<%=hfPanel2.ClientID %>");
                    var hfpanel3 = $("#<%=hfPanel3.ClientID %>");
                    var init = {
                        initPlayType: function () {
                            if (playType.val() == "1") {
                                panel2.hide().addClass("hide");
                                panel3.hide().addClass("hide");
                                panel4.show().addClass("hide");
                                hfpanel2.val("0");
                                hfpanel3.val("0");
                            } else {
                                panel2.show().addClass("show");
                                panel3.show().addClass("show");
                                panel4.show().addClass("show");
                                hfpanel2.val("1");
                                hfpanel3.val("1");
                            }
                        },
                        initMonthInterval: function () {
                            $(".repeat_item_month").each(function () {
                                var radio = $(this).find("input[type='radio']");
                                if (radio.attr("checked")) {
                                    $(this).find("input[type!='radio'],select").removeAttr("disabled");
                                } else {
                                    $(this).find("input[type!='radio'],select").attr("disabled", "disabled");
                                }
                            })
                        },
                        initRepeatType: function () {
                            var v = repeatType.val();
                            var index = (v - 1);
                            var item = $(".repeat_item");
                            item.hide().eq(index).show();
                            if (v == "3") {
                                init.initMonthInterval();
                            }
                        }
                    };
                    playType.change(function () {
                        init.initPlayType();
                    });
                    repeatType.change(function () {
                        init.initRepeatType();
                    });
                    $(".repeat_item_month input[type='radio']").change(function () {
                        $(".repeat_item_month input[type='radio']").each(function () {
                            if ($(this).attr("checked")) {
                                $(this).removeAttr("checked");
                            } else {
                                $(this).attr("checked", "checked");
                            }
                        })
                        init.initMonthInterval();
                    });
                    var run = function () {
                        init.initPlayType();
                        init.initRepeatType();
                    } ();
                })
            </script>
            <asp:Panel ID="Panel1" GroupingText="计划类型" runat="server">
                <div class="row">
                    类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：
                    <asp:DropDownList ID="ddlPlanType" runat="server">
                        <asp:ListItem Value="1" Text="执行一次" ></asp:ListItem>
                        <asp:ListItem Value="2" Text="重复执行"></asp:ListItem>
                    </asp:DropDownList>
                </div>
            </asp:Panel>
            <asp:Panel ID="Panel2" GroupingText="频率" runat="server" >
                <div class="row">
                    执&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;行：
                    <asp:DropDownList ID="ddlRepeatType" runat="server">
                        <asp:ListItem Value="1" Text="每天" ></asp:ListItem>
                        <asp:ListItem Value="2" Text="每周"></asp:ListItem>
                        <asp:ListItem Value="3" Text="每月"></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="row repeat_item">
                    执行间隔：<asp:TextBox ID="txtDayInterval" TextMode="Number" Text=1 min="1" max="365"  runat="server"></asp:TextBox>天
                </div>
                <div class="row repeat_item">
                    <div class="row">
                        执行间隔：<asp:TextBox ID="txtWeekInterval" TextMode="Number" Text=1 min="1" max="100"  runat="server"></asp:TextBox>周，在
                    </div>
                    <div class="row" style=" padding-left:55px;">
                        <asp:CheckBoxList ID="cblWeek" runat="server" RepeatDirection="Horizontal"  >
                            <asp:ListItem Text="星期一" Value="1"></asp:ListItem>
                            <asp:ListItem Text="星期二" Value="2"></asp:ListItem>
                            <asp:ListItem Text="星期三" Value="3"></asp:ListItem>
                            <asp:ListItem Text="星期四" Value="4"></asp:ListItem>
                            <asp:ListItem Text="星期五" Value="5"></asp:ListItem>
                            <asp:ListItem Text="星期六" Value="6"></asp:ListItem>
                            <asp:ListItem Text="星期日" Value="7"></asp:ListItem>
                        </asp:CheckBoxList>
                    </div>
                </div>
                <div class="row repeat_item">
                    <div class="row repeat_item_month">
                        <asp:RadioButton ID="rbRepeatItemMonthIn"    Checked="true" runat="server" />第&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div style=" display:inline-block;">
                            <asp:TextBox TextMode="Number" ID="txtMonthInDay"   runat="server" min="1" Max="365" Text="1"></asp:TextBox>天 - 每
                            <asp:TextBox ID="txtMonthInterval" TextMode="Number" runat="server" min="1" Max="12" Text="1"></asp:TextBox> 个月
                        </div>
                    </div>
                    <div class="row repeat_item_month">
                        <asp:RadioButton ID="rbRepeatItemMonthAt"  runat="server" />在&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div style=" display:inline-block;">
                            <asp:DropDownList ID="ddlSn" runat="server">
                                <asp:ListItem Value="1" Text="第一个"></asp:ListItem>
                                <asp:ListItem Value="2" Text="第二个"></asp:ListItem>
                                <asp:ListItem Value="3" Text="第三个"></asp:ListItem>
                                <asp:ListItem Value="4" Text="第四个"></asp:ListItem>
                                <asp:ListItem Value="5" Text="最后一个"></asp:ListItem>
                            </asp:DropDownList>
                            <asp:DropDownList ID="ddlWeeks" runat="server">
                                 <asp:ListItem Text="星期一" Value="1"></asp:ListItem>
                                <asp:ListItem Text="星期二" Value="2"></asp:ListItem>
                                <asp:ListItem Text="星期三" Value="3"></asp:ListItem>
                                <asp:ListItem Text="星期四" Value="4"></asp:ListItem>
                                <asp:ListItem Text="星期五" Value="5"></asp:ListItem>
                                <asp:ListItem Text="星期六" Value="6"></asp:ListItem>
                                <asp:ListItem Text="星期日" Value="7"></asp:ListItem>
                                <asp:ListItem Text="工作日" Value="8"></asp:ListItem>
                                <asp:ListItem Text="周未" Value="9"></asp:ListItem>
                            </asp:DropDownList>&nbsp;&nbsp;&nbsp;&nbsp;-每
                            <asp:TextBox ID="txtMonthInterval1" TextMode="Number" runat="server" min="1" Max="12" Text="1"></asp:TextBox> 个月
                        </div>
                    </div>
                </div>
            </asp:Panel>
            <asp:Panel ID="Panel3" GroupingText="第天频率" runat="server">
                执行间隔：
                <asp:TextBox TextMode="Number" ID="txtEveryInterval" Text="1" runat="server" Max="500" min="1"></asp:TextBox>
                <asp:DropDownList ID="ddlUnit" runat="server">
                    <asp:ListItem Text="小时" Value="1" ></asp:ListItem>
                    <asp:ListItem Text="分钟" Value="2"></asp:ListItem>
                </asp:DropDownList>
                &nbsp;&nbsp;&nbsp;
                开始时间：<asp:TextBox ID="txtEveryDayStartTime" runat="server" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})"></asp:TextBox>&nbsp;&nbsp;&nbsp;
                结束时间：<asp:TextBox ID="txtEveryDayEndTime" runat="server" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})"></asp:TextBox>
            </asp:Panel>
            <asp:Panel ID="Panel4" GroupingText="持续时间" runat="server">
                <div class="row">开始日期：<asp:TextBox ID="txtStartDate" runat="server" onClick="WdatePicker()"></asp:TextBox>&nbsp;&nbsp;&nbsp;时间：<asp:TextBox ID="txtStartTime" runat="server" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})"></asp:TextBox></div>
                <div class="row">结束日期：<asp:TextBox ID="txtEndDate" runat="server" onClick="WdatePicker()"></asp:TextBox>&nbsp;&nbsp;&nbsp;时间：<asp:TextBox ID="txtEndTime" runat="server" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'H:mm:ss'})"></asp:TextBox></div>
            </asp:Panel>
            <asp:Panel ID="Panel5" GroupingText="摘要" runat="server">
                <asp:Label ID="lblInfo" runat="server"></asp:Label>
            </asp:Panel>
            <asp:HiddenField ID="hfMode" runat="server" />
            <asp:HiddenField ID="hfMID" runat="server" />
            <asp:HiddenField ID="hfID" runat="server" />
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfCourseId" runat="server" />
    <input id="hfPanel2" type="hidden" runat="server" />
    <input id="hfPanel3" type="hidden" runat="server" />
</asp:Content>