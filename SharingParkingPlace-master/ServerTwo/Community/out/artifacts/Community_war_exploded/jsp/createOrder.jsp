<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>发布车位</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/font-awesome.min.css" rel="stylesheet">
    <!-- Data Tables -->
    <link href="../css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../css/animate.min.css" rel="stylesheet">
    <link href="../css/style.min.css" rel="stylesheet">
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/plugins/jeditable/jquery.jeditable.js"></script>
    <script src="../js/plugins/dataTables/jquery.dataTables.js"></script>
    <script src="../js/plugins/dataTables/dataTables.bootstrap.js"></script>
    <script src="../js/content.min.js"></script>
</head>
<body class="gray-bg">

<div class="middle-box text-center loginscreen  animated fadeInDown" style="margin-left: 20%">
    <div>
        <h3>发布我的车位</h3>
        <form class="m-t" role="form" action="/CreateOrderServlet" method="post">
            <div class="form-group">
                <input type="text" id="hardware_id" name="hardware_id" class="form-control" required="">
            </div>
            <div class="form-group">
                <p>开始时间</p>
                <input type="datetime-local" id="start_time" name="start_time" class="form-control" required="">
            </div>
            <div class="form-group">
                <p>结束时间</p>
                <input type="datetime-local" name="end_time" class="form-control" required="">
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b">发 布</button>
        </form>
    </div>
</div>


<script>
    var url = window.location.href;
    var result = url.split("?")[1];
    $("#hardware_id").val(result);
</script>

</body>
</html>
