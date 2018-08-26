<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jinghua.aspx.cs" Inherits="SfSoft.web.jinghua" %>

<!DOCTYPE html >

<html >
<head  runat="server">
    <title>学习中心</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" id="viewport" name="viewport">
    <link href="../css/public.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <style>
        body{ background:#dad9d5; }
        .wrap{ width:90%; margin:0 auto; margin-top:15px;}
        .item
        {
            text-align: left;
            font-size: 14px;
            letter-spacing: normal;
        }
        .appmsg
        {
               position: relative;
               overflow: hidden;
               margin-bottom: 5px;
               border: 1px solid #E7E7EB;
               background-color: #FFF;
               color: #666; 
        }
        .appmsg_content{ position:relative;}
        .appmsg_info
        {
            padding-top: 14px;
            padding-left: 14px;
            padding-right: 14px;
        }
        .appmsg_date{font-weight: 400;font-style: normal;}
        .cover_appmsg_item
        {
            position: relative;
            margin: 0px 14px 14px;
            text-align: left;
            font-size: 14px;
            letter-spacing: normal;
        }
        .cover_appmsg_item  .appmsg_title
        {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            background: none repeat scroll 0% 0% rgba(0, 0, 0, 0.6) !important;
            padding:0px;
            margin:0px;
            float:left;
            font-size: 14px;
            padding-top: 0px;
            line-height: 28px;
            max-height: 56px;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
        }
        .cover_appmsg_item  .appmsg_title a
        {
            padding: 0px 8px;
            color: #FFF;    
            display: block;
            text-decoration: none;
            font-weight: 400;
            font-style: normal;
            font-size: 16px;
            line-height: 28px;
            word-wrap: break-word;
            word-break: break-all;
        }
        
        .appmsg_thumb_wrp
        {
            height:30%;
            width:100%;
            overflow: hidden;
        }
        .appmsg_thumb
        {
            width: 100%;
            color: #666;    
        }
        .appmsg_item
        {
            position: relative;
            padding: 5px 14px;
            border-top: 1px solid #E7E7EB;    
        }
        .appmsg_item .appmsg_thumb
        {
            float: right;
            
            width: 20%;
            height: 20%;
            margin-left: 14px;
        }
       .appmsg_item  .appmsg_title
        {
            font-size: 14px;
            padding-top: 0px;
            line-height: 24px;
            max-height: 48px;
            overflow: hidden;
            margin-top: 14px;
            font-weight: 400;
            font-style: normal;
            word-wrap: break-word;
            word-break: break-all;
        }
        .appmsg_title a
        {
            display: block;
            color: #666;
            font-weight:bold;
        }
        .appmsg_item:after {
            content: "​";
            display: block;
            height: 0px;
            clear: both;
        }
    </style>
</head>
<body>
   
    <div class="wrap" id="wrapper">
        <div class="item" id="scroller">
            <div id="thelist">
                
            </div>
            <div style=" padding:0px 0 20px 0">
                <span class="  btn btn-default" id="more" style=" width:100%;">加载更多</span>
            </div>
            <%=Content %>
        </div>
        
    </div>
    <div></div>
    <script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script>
        sessionStorage.setItem("pageindex", 1);
        var startLoad = 0;
        $(function () {
            load();
            $("#more").click(function () {
                load();
            });
        })
        function load() {
            var type = getQueryString("type")
            var jinhua = new jinhuaData(sessionStorage.getItem("pageindex"), 6,type);
            var data = jinhua.init();
            console.log("ddddddddddddd");
            console.log(data);
            jinhua.loadMsgs(data); //加载数据
        }

        function jinhuaData(pageindex, pagesize,type) {
            this.init = function () {
                var result = "";
                $.ajax({
                    url: "../Service/showJinHuaData.ashx",
                    type: "POST",
                    async: false,
                    dataType: "json",
                    data: { "pageindex": pageindex, "pagesize": pagesize,type:type },
                    beforeSend: function () {
                        startLoad = 1;
                    },
                    complete: function () {
                        startLoad = 0;
                    },
                    success: function (msg) {
                        console.log(msg);
                        if (!jQuery.isEmptyObject(msg.ds)) {
                            result = msg.ds;
                            var pageindex = parseInt(sessionStorage.getItem("pageindex")) + 1;
                            sessionStorage.setItem("pageindex", pageindex);
                        }
                    }
                });
                return result;
            }
        }
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        };

        jinhuaData.prototype.loadMsgs = function (msg, wrap) {
            var html = "";
            for (var i = 0; i < msg.length; i=i + 2) {
                html += "<div class='appmsg'>";
                html += "<div class='appmsg_content'>";
                html += headMsgs($(msg[i])[0]);
                html += generalMsgs($(msg[i + 1])[0]);
                html += "</div>";
                html += "</div>";
            }
            $("#thelist").append(html);
            startLoad = 0;
        }
        //加载头条
        var headMsgs = function (msg) {
            var html = "";
            html += "<div class='appmsg_info'>";
            html += "<em class='appmsg_date'>" + msg.RefValue + "</em>";
            html += "</div>"
            html += "<div class='cover_appmsg_item'>";
            html += "<h4 class='appmsg_title'>";
            html += "<a href='" + msg.ArticleUrl + "'   target='_blank'>" + msg.Title + "</a>";
            html += "</h4>";
            html += "<div class='appmsg_thumb_wrp'><img src='" + msg.ImgUrl + "'  class='appmsg_thumb'></div>";
            html += "</div>";
            return html;
        }
        //加载其它的数据
        var generalMsgs = function (msg) {
            var html = "";
            html += "<div class='appmsg_item'>";
            html += "<img src=" + msg.ImgUrl + " class='appmsg_thumb' />";
            html += "<h4 class='appmsg_title'>";
            html += "<a href='" + msg.ArticleUrl + "' target='_blank'>" + msg.Title + "</a>";
            html += "</h4>";
            html += "</div>";
            return html;
        }
    </script>
    
</body>
</html>
