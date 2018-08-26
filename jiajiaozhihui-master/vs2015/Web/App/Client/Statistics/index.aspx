<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.App.Client.Statistics.index" %>
<!DOCTYPE html >

<html>
<head runat="server">
    <title>数据统计</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
    <table class="table">
        <tr>
            <th>项目</th>
            <th>参与人数</th>
        </tr>
        <tr>
            <td>国学达人</td>
            <td><%=GxdrPlayerNumber %></td>
        </tr>
        <tr>
            <td>诵读社</td>
            <td><%=ReadPlayerNumber%></td>
        </tr>
        <tr>
            <td>亲子书法</td>
            <td><%=QZSFPlayerNumber%></td>
        </tr>
        <tr>
            <td>知行社</td>
            <td><%=ZxsPlayerNumber%></td>
        </tr>
        <tr>
            <td>家教问答</td>
            <td><%=QaPlayerNumber %></td>
        </tr>
    </table>
</body>
</html>
