<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="financereport.aspx.cs" Inherits="SfSoft.web.emc.double11.order.financereport" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>礼品订单打印</title>
     
    <style type="text/css">
         .wrap{width:208mm;  margin:0 auto;  }
        .page{ height:297mm;}
        .area{ text-align:right; display:block; float:right; padding-right:10px}
       .from{ font-size:12px;}
       .title,.value{ font-size:13px;}
       
       .col{ border-left:1px dashed #444; height:2mm;}
     
       table tr th{ height:1mm;}
       table{ width:100%}
       table th{ background:#eee;}
       .col_sn{ width:30px; text-align:left; border-bottom:1px dashed #444; height:20px; padding:0px; margin:0px;}
       .col_name{ width:100px; text-align:left; border-bottom:1px dashed #444;height:20px;padding:0px; margin:0px;}
       .col_tel{ width:100px; text-align:left; border-bottom:1px dashed #444;height:20px;padding:0px; margin:0px;}
       .col_addr{ text-align:left; border-bottom:1px dashed #444;height:20px;padding:0px; margin:0px;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="wrap" >
        <div id="content" runat="server">
            
        </div>
    </div>
    </form>
</body>
</html>
