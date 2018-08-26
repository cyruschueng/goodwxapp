<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的车</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/font-awesome.min.css" rel="stylesheet">

    <!-- Data Tables -->
    <link href="../css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">
    <link href="../css/animate.min.css" rel="stylesheet">
    <link href="../css/style.min.css" rel="stylesheet">
</head>
<body class="gray-bg">

<div class="row">
    <div class="col-sm-12">
        <div class="ibox float-e-margins">
            <div class="ibox-content">
                <table class="table table-striped table-bordered table-hover " id="editable">
                    <thead>
                    <tr>
                        <th>车牌号</th>
                    </tr>
                    </thead>
                    <tbody id="tbodys">
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</div>


<script src="../js/jquery.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/plugins/jeditable/jquery.jeditable.js"></script>
<script src="../js/plugins/dataTables/jquery.dataTables.js"></script>
<script src="../js/plugins/dataTables/dataTables.bootstrap.js"></script>
<script src="../js/content.min.js"></script>


<script>
    $(document).ready(function () {
        $.ajax({
            url: "/CheckCarsServlet",
            type: "POST",
            success: function (data) {
                data.data.forEach(function (value) {
                    console.log(value);
                    var tr=document.createElement("tr");
                    var td=document.createElement("td");
                    var node=document.createTextNode(value["licence_plate"]);
                    td.appendChild(node);
                    tr.appendChild(td);
                    document.getElementById("tbodys").appendChild(tr);
                })
            },
            dataType: 'json'
        });
    })

</script>

</body>
</html>
