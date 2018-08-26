<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的车位</title>
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
                        <th>硬件ID</th>
                        <th>设备经纬度</th>
                        <th>具体地址</th>
                        <th>当前状态</th>
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
            url: "/CheckSparkingSpaceServlet",
            type: "POST",
            success: function (data) {
                data.data.forEach(function (value) {
                    console.log(value);
                    var tr=document.createElement("tr");
                    var td1=document.createElement("td");
                    var td2=document.createElement("td");
                    var td3=document.createElement("td");
                    var td4=document.createElement("td");
                    var node1=document.createTextNode(value["hardware_id"]);
                    td1.appendChild(node1);
                    var node2=document.createTextNode(value["location"]);
                    td2.appendChild(node2);
                    var node3=document.createTextNode(value["address"]);
                    td3.appendChild(node3);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    var state=value["state"];
                    var res="";
                    if(state==1){
                        res="已出租";
                        var node4=document.createTextNode(res);
                        td4.appendChild(node4);
                        tr.appendChild(td4);
                    }else if(state==0){
                        res="等待用户下单";
                        var node4=document.createTextNode(res);
                        td4.appendChild(node4);
                        tr.appendChild(td4);
                    }else{
                        res="待发布订单";
                        var link=document.createElement("a");
                        link.href="createOrder.jsp?"+value["hardware_id"];
                        var node4=document.createTextNode(res);
                        link.appendChild(node4);
                        td4.appendChild(link);
                        tr.appendChild(td4);
                    }

                    document.getElementById("tbodys").appendChild(tr);
                })
            },
            dataType: 'json'
        });
    })


</script>

</body>
</html>
