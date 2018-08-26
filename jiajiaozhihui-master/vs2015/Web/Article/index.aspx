<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.Article.index" %>

<!DOCTYPE html >

<html >
<head  runat="server">
    <title>下周微信文章预发布</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" id="viewport" name="viewport">
    <link href="../css/public.css" rel="stylesheet" type="text/css" />
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
    <div class="wrap">
        <div class="item">
            <%=Content %>
        </div>
    </div>
</body>
</html>
