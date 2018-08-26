<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="SfSoft.web.emc.main" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>无标题页</title>
    <script type="text/javascript" src="/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="/js/jquery.easyui.min.1.2.2.js"></script>
    <script type="text/javascript" src="/js/jquery/sliderman/js/sliderman.1.2.1.js"></script>
    <script type="text/javascript" src="/js/popup.js"></script>
    <script language="javascript" src="/js/checkform.js"></script>
    <script type="text/javascript" src="/js/popupclass.js"></script>
    <link rel="stylesheet" type="text/css" href="css/emccss.css" />
    <link rel="stylesheet" type="text/css" href="/js/jquery/sliderman/css/sliderman.css" />
    <link rel="stylesheet" type="text/css" href="/js/themes/default/easyui.css" />
    <style type="text/css">
        .fillet1, .fillet2, .fillet3, .fillet4, .fillet1b, .fillet2b, .fillet3b, .fillet4b, .fillet
        {
            display: block;
            overflow: hidden;
        }
        .fillet1, .fillet2, .fillet3, .fillet1b, .fillet2b, .fillet3b
        {
            height: 1px;
        }
        .fillet2, .fillet3, .fillet4, .fillet2b, .fillet3b, .fillet4b, .fillet
        {
            border-left: 1px solid #999;
            border-right: 1px solid #999;
        }
        .fillet1, .fillet1b
        {
            margin: 0 5px;
            background: #999;
        }
        .fillet2, .fillet2b
        {
            margin: 0 3px;
            border-width: 2px;
        }
        .fillet3, .fillet3b
        {
            margin: 0 2px;
        }
        .fillet4, .fillet4b
        {
            height: 2px;
            margin: 0 1px;
        }
        .filletbg
        {
            background: #F7F8F9;
        }
        
        
        .margintop10
        {
            margin-top: 10px;
        }
        .homenewsinfocat
        {
            height: 20px;
            display: block;
        }
        .homenewsinfocatspan
        {
            font-weight: bold;
            font-size: 14px;
            margin-top: 1px;
            background-repeat: no-repeat;
            width: 150px;
            height: 25px;
            float: left;
            color: #1056AB;
            padding-left: 25px;
            padding-top: 0px;
            padding-right: 10px;
        }
        
        .shadow
        {
            float: left;
            width: 100%;
        }
        .divframe
        {
            position: relative;
            background: #fff;
            padding: 10px;
            display: block;
            -moz-box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
            -webkit-box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
        }
        .newslist li
        {
            width: auto;
            list-style: none;
            background: url("images/home/hongdian.gif") no-repeat left;
            border-bottom: 1px dashed #eee;
            line-height: 22px;
            padding-left: 10px;
        }
        .newslist
        {
            list-style-type: none;
            margin: 0px;
            padding-left: 10px;
        }
        .lilinline
        {
            display: inline;
        }
        .todotitle
        {
            width: auto;
            list-style: none;
            color: #416AA3;
            font-weight: bold;
            background: url("images/home/hongdian.gif") no-repeat left;
            border-bottom: 1px dashed #eee;
            line-height: 22px;
            padding-left: 10px;
        }
        .movetitle
        {
            width: auto;
            color: #416AA3;
            font-weight: bold;
            background: url("images/home/hongdian.gif") no-repeat left;
            line-height: 22px;
            padding-left: 10px;
        }
        .todolist li
        {
            width: auto;
            list-style: none;
            border-bottom: 1px dashed #eee;
            line-height: 22px;
        }
        .todolist1
        {
            width: auto;
            list-style: none;
            background: url("images/home/home_left_dot3.gif") no-repeat left;
            border-bottom: 1px dashed #eee;
            line-height: 22px;
            margin-left: 5px;
            padding-left: 10px;
        }
        .todolist
        {
            list-style-type: none;
            margin: 0px;
            padding-left: 10px;
        }
    </style>
    <!--[if IE]>
<style type="text/css">
 
.divframe {left:4px; top:4px;}
.shadow {background:#000;width:100%; margin:-4px -4px; filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='3', MakeShadow='true', ShadowOpacity='0.40');}
</style>
<![endif]-->
</head>
<body style="padding-left: 5px; background-image: url('images/loginbg.jpg');">
    <form id="form1" runat="server">
    </form>
  
      
</body>
</html>
