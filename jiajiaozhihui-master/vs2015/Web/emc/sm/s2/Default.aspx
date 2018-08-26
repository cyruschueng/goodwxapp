<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs"      Inherits="AjaxPro_ReturnDataSet" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
     <script type="text/javascript">
    function GetProductData()
    {
        var cb = function(res) {
            if(res.error) return alert("发生错误\n" + res.error.Message);
            //debugger;
            //alert(res);
            var ds = res.value;
            var tbl = ds.Tables[0]; 
            var tblHtml = "<table border=1>";
            
            // 表头
            tblHtml += "<tr>";
            for(var j = 0; j < tbl.Columns.length; j++) {
                tblHtml += "<th>" + tbl.Columns[j].Name + "</th>";
            }
            tblHtml += "</tr>";
            
            // 数据
            for(var i = 0; i < tbl.Rows.length; i++) {
                tblHtml += "<tr>";
                for(var j = 0; j < tbl.Columns.length; j++) {
                    tblHtml += "<td>" + tbl.Rows[i][tbl.Columns[j].Name] + "</td>";
                }
                tblHtml += "</tr>";
            }
            tblHtml += "</table>";
            var divPro = document.getElementById("divPro");
            divPro.innerHTML = tblHtml;
        }
        AjaxProSample.GetProductSet(cb);        
    }
    </script>
</head>
<body>
    <form id="form1" runat="server">
  
    <div>
        <input id="Button1" type="button" value="DisplayProductData" onclick="GetProductData()" />
        <div id="divPro">
            <asp:TextBox ID="TextBox1" runat="server" BackColor="Azure" BorderColor="InactiveCaptionText"
                BorderStyle="Inset"></asp:TextBox></div>
    </div>

    </form>
</body>
</html>
