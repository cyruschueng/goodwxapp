<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="share.aspx.cs" Inherits="SfSoft.web.game.doublenovember.share" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        
    </div>
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script>
        function uploadServer(openid,resume,mediaId) {
            $.ajax({
                url: "server/partin.ashx",
                type: "POST",
                dataType: "text",
                data: { 'folder': '' + openid+ '', 'resume': '' +resume+ '', 'mediaId': '' + mediaId + '' },
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (data) {
                    alert(data);
                }
            });
        }
        uploadServer("o6VEZzFT6gG3hPgrrg5r9hA/4GHObwpR5svhMrohyaw=", "sss", "wnKy9yDZVGtwdAYQol2I51nOS9xAx8JocYPyJNjEc7NiSXbCY-hJBDO5emdY5Aus");
    </script>
</body>
</html>
