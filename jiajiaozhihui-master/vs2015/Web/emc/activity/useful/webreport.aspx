<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="webreport.aspx.cs" Inherits="SfSoft.web.emc.activity.useful.webreport" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>礼品订单打印</title>
     
    <style type="text/css">
         .wrap{width:208mm;  margin:0 auto;  }
        .page{ height:297mm;}
        .area{ text-align:right; display:block; float:right; padding-right:10px}
       .from{ font-size:12px;}
       .title,.value{ font-size:13px;}
       .left-col,.right-col{  border-bottom: 1px dashed #444; width:101mm; height:35mm;}
       .left-col{ border-right:1px dashed #444;}
       .right-col{ border-left:1px dashed #444;}
       .right-col div{ float:left;}
       .shared{font-size:11px; text-align:center; font-weight:bold; }
       .server-tel{ text-align:left;}
       .customer{ position:relative;width:101mm;}
       .print{ position:absolute; top:0px; left:140px; font-size:30px; border:2px solid #ccc; padding:5px;}
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
