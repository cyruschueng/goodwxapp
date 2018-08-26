<%@ Page Language="C#" MasterPageFile="~/MasterPage/PageTemplate.Master" AutoEventWireup="true"
    CodeBehind="browse.aspx.cs" Inherits="SfSoft.web.emc.family.topic.browse" Title="无标题页" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PageBody" runat="server">
    <link href="../../../css/family.css" rel="stylesheet" type="text/css" />

    <cc1:TabOptionWebControls ID="TabOptionWebControls1" runat="server">
        <cc1:TabOptionItem ID="TabOptionItem1" runat="server" Tab_Name="话题管理">
            <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
            <script>
                $(function () {
                    $("#btnreplay").click(comment);
                    $("#btnClose").click(function () {
                        $("#fwin_mask_replyThread").css("display", "none");
                        $("#comment").css("display", "none");
                        $("#content").val("");
                    });
                })
                function comment(topicid, openid, nickname, headerimgurl) {
                    if (testing() == false) {
                        alert("回复内容不能为空");
                        return false;
                    }
                    $.ajax({
                        url: "../../../community/server.ashx",
                        type: "POST",
                        dataType: "json",
                        data: "topicid=" + sessionStorage.getItem("topicid") + "&content=" + $("#content").val() + "&openid=" + $("#<%=hfOpenid.ClientID %>").val() + "&nickname=" + $("#<%=hfNickName.ClientID %>").val() + "&headerimgurl=" + $("#<%=hfHeaderImgUrl.ClientID %>").val() + "&method=comment",
                        beforeSend: function (XMLHttpRequest) {
                            $('#load a').remove();
                            $('#load').append('<a class="load">处理信息中……</a>');
                        },
                        complete: function (XMLHttpRequest) {
                            $("#fwin_mask_replyThread").css("display", "none");
                            $("#comment").css("display", "none");
                            $("#content").val("");
                        },
                        success: function (data) {

                        }
                    });
                }
                function testing() {
                    if ($("#content").val() == "") {
                        return false;
                    }
                    return true;
                }
                function showReplay(id) {
                    $("#fwin_mask_replyThread").css("display", "block");
                    $("#comment").css("display", "block");
                    sessionStorage.setItem("topicid", id);
                }
            </script>
            <div class="topicSend mtm">
                <a class="pn_post sendBtn fl spr db ht" href="newtopic.aspx"></a>
            </div>
            <div class="spaceB"></div>
            <div class="topicList">
                <ul id="topicItems">
                    <%=ListItem%>
                </ul>
            </div>
            <div id="fwin_mask_replyThread" class="g-mask" style="position:absolute;top:-0px;left:-0px;width:1903px;height:3034px;background:#000;filter:alpha(opacity=60);opacity:0.5; z-index:1000; display:none;"></div>
            <div id="comment" style="width: 100%; position: fixed; z-index: 1001; top: 218.122px; left: 0px;display:none;">
                <div class="tip-box box-shadow" style="margin:0 auto;">
                    <div class="tip-hd mbm">回复</div>
                    <div class="tip-inbox f14 mbm">
                        <textarea id="content" name="content" cols="5" rows="10"></textarea>
                    </div>
                    <div class="tip-actionbtn txt-right">
                        <button class="button btn-default mrw close" id="btnClose" type="button" >取消</button>
                        <button type="button" id="btnreplay" class="button btn-green submitReplyBtn">确定</button>
                    </div>
                </div>
            </div>
        </cc1:TabOptionItem>
    </cc1:TabOptionWebControls>
    <asp:HiddenField ID="hfID" runat="server" />
    <asp:HiddenField ID="hfOpenid" runat="server" />
    <asp:HiddenField ID="hfNickName" runat="server" />
    <asp:HiddenField ID="hfHeaderImgUrl" runat="server" />
</asp:Content>
