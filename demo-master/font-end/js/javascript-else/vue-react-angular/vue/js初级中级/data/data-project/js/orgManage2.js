//1.创建受捐单位数组
var arrOrgData = [
    { "Id": 1, "OrgName": "红十字会" },
    { "Id": 2, "OrgName": "壹基金" },
    { "Id": 3, "OrgName": "中华慈善总会" },
    { "Id": 4, "OrgName": "中国扶贫基金会" }
];
//1-1.根据受捐单位id，返回受捐单位元素,动态绑定(定义)方法
arrOrgData.getOrgById = function (id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == id) {
            return this[i];
        };
    };
};
//2.详细捐赠信息数组
var arrDetailData = [
    { "Id": 1, "Name": "成龙", "OrgId": 1, "Money": "1000", "Time": "2013 - 07 - 08" },
    { "Id": 2, "Name": "肥龙", "OrgId": 2, "Money": "2000", "Time": "2013 - 07 - 08" },
    { "Id": 3, "Name": "瘦龙", "OrgId": 3, "Money": "3000", "Time": "2013 - 07 - 08" },
    { "Id": 4, "Name": "傻龙", "OrgId": 4, "Money": "4000", "Time": "2013 - 07 - 08" },
    { "Id": 5, "Name": "成龙", "OrgId": 1, "Money": "1000", "Time": "2013 - 07 - 08" },
    { "Id": 6, "Name": "肥龙", "OrgId": 2, "Money": "2000", "Time": "2013 - 07 - 08" },
    { "Id": 7, "Name": "瘦龙", "OrgId": 3, "Money": "3000", "Time": "2013 - 07 - 08" },
    { "Id": 8, "Name": "傻龙", "OrgId": 4, "Money": "4000", "Time": "2013 - 07 - 08" }
];
//2.1.根据id删除数组元素
arrDetailData.deleteById = function (id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == id) {
            //元素前移
            for (var j = i; j < this.length - 1; j++) {
                this[j] = this[j + 1];
            };
            //数组长度--
            this.length--;
            break;
        };
    };
};
//2-2.更新数据，obj-修改后的对象
arrDetailData.update = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == obj.Id) {
            this[i] = obj;
            break;
        };
    };
};
//2-3.新增数据
var modelId = arrDetailData.length;//定义变量，存储数组元素的Id
arrDetailData.addModel = function (model) {
    modelId++;//每次添加序号++
    //model.Id = modelId;//设置添加对象的Id
    model = { "Id": modelId, "Name": model.Name, "OrgId": model.OrgId, "Money": model.Money, "Time": model.Time }
    this[this.length] = model;//数组元素++，在length
    return this[this.length-1];//长度已经发生变化
};
//2-4.根据id，返回查询到的详细捐赠信息
arrDetailData.getSearchData = function (id) {
    if (id == -1) {
        return this;
    };
    //定义数组，存储查询到的数据
    var arr = new Array();
    for (var i = 0; i < this.length; i++) {
        if(this[i].OrgId==id){//判断OrgId是否符合
            arr[arr.length] = this[i];//添加到数组
        };
    }
    return arr;
};
//2-5.获得一页数据
arrDetailData.pageIndex = 1;
arrDetailData.pageCount = 5;
arrDetailData.pages = 0;
//获取一页数据
arrDetailData.getPageData = function () {
    //定义数组存储一页数据
    var arr = new Array();
    for (var i =(this.pageIndex-1)*this.pageCount; i < this.pageIndex*this.pageCount; i++) {
        if(this[i]){//判断this[i]是否有值（undefined），过滤掉
            arr[arr.length] = this[i];
        };
    }
    return arr;
};
//3.加载受捐单位信息,obj-传入select对象
function loadOrgData(obj) {
    for (var i = 0; i < arrOrgData.length; i++) {
        var opt = new Option(arrOrgData[i].OrgName, arrDetailData[i].Id);
        obj.options.add(opt);
    };
};
//4.加载表数据（详细信息）
function loadDetailData() {
    for (var i = 0; i < arrDetailData.length; i++) {
        addTr(arrDetailData[i]);
    }
};
//加载表数据，arrDetail-要加载的数组
function loadDatailArr(arrDetail) {
    for (var i = 0; i < arrDetail.length; i++) {
        addTr(arrDetail[i]);
    }
};
//4-1.插入一行,obj-数组元素
function addTr(obj) {
    var tb = getElement("tbList");//获得表对象
    var tr = tb.insertRow(-1);//插入一行
    tr.insertCell(-1).innerHTML = obj.Id;//插入序号列
    tr.insertCell(-1).innerHTML = obj.Name;//插入名称列
    var td = tr.insertCell(-1);//插入OrgId列
    td.setAttribute("OrgId", obj.OrgId);//保存OrgId到td的OrgId属性（自定义）
    td.innerHTML = arrOrgData.getOrgById(obj.OrgId).OrgName;//设置捐赠单位名称
    tr.insertCell(-1).innerHTML = obj.Money;//插入金额列
    tr.insertCell(-1).innerHTML = obj.Time;//插入捐赠时间列
    tr.insertCell(-1).innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";//操作列
};
//5.根据标签id获得标签对象
function getElement(id) {
    return document.getElementById(id);
};
//6.删除行
function deleteRow(obj) {
    if(GlobalUpdateTr!=null){//判断当前是否修改状态
        exitUpdateState();
    };
    if (!confirm("确定删除吗？")) {//确认是否要移除
        return;
    };
    var delTr = obj.parentNode.parentNode;//获取删除行
    delTr.parentNode.removeChild(delTr);//移除行
    arrDetailData.deleteById(delTr.childNodes[0].innerHTML);//删除对应的数组元素
};
//7.修改行
//7-1.定义全局变量,三个文本框一个下拉列表，一个存储修改行的变量GlobalUpdateTr，标记修改状态
var inputPersonName = document.createElement("input");//捐赠人名称
var inputMoney = document.createElement("input");//捐赠金额
var inputTime = document.createElement("input");//捐赠时间
var selectOrg = document.createElement("select");//受捐单位下拉列表
var GlobalUpdateTr = null;//存储修改行，标记是否修改状态
//7-2.点击修改，设置（进入）修改状态,obj-点击的对象
function setUpdateState(obj) {
    if(GlobalUpdateTr!=null){//判断点击修改前是否已经是修改状态，是则先退出之前的修改状态，然后进入当然修改状态
        exitUpdateState();//退出修改状态
    };
    GlobalUpdateTr = obj.parentNode.parentNode;//获得修改行
    //所有列设置为修改状态
    textToInput(GlobalUpdateTr.childNodes[1], inputPersonName);
    textToInput(GlobalUpdateTr.childNodes[3], inputMoney);
    textToInput(GlobalUpdateTr.childNodes[4], inputTime);
    textToSelect(GlobalUpdateTr.childNodes[2], selectOrg);
    GlobalUpdateTr.childNodes[5].innerHTML = "<a href='#' onclick='update()'>确定</a>&nbsp;&nbsp;<a href='#' onclick='exitUpdateState()'>取消</a>";//设置操作列
};
//7-2-1.把文本列设置为文本框（修改状态）,td:列，obj:文本框
function textToInput(td, obj) {
    obj.value = td.innerHTML;//设置文本框值
    td.setAttribute("oldValue", td.innerHTML);//保存文本值
    td.appendChild(obj);//往列添加文本框
    if(td.childNodes[1]){//判断是否有文本节点
        td.removeChild(td.childNodes[0]);//移除文本节点
    };
};
//7-2-2.把文本列设置为下拉列表（修改状态）,td:列，obj:文本框
function textToSelect(td, obj) {
    td.appendChild(obj);//往列添加下拉列表
    td.removeChild(td.childNodes[0]);//移除文本节点
    obj.value = td.getAttribute("OrgId");//设置下拉列表显示为文本显示的值
};
//7-3.确认修改
function update() {
    //更新文本界面
    GlobalUpdateTr.childNodes[1].innerHTML = inputPersonName.value;
    GlobalUpdateTr.childNodes[3].innerHTML = inputMoney.value;
    GlobalUpdateTr.childNodes[4].innerHTML = inputTime.value;
    GlobalUpdateTr.childNodes[2].removeChild(selectOrg);
    GlobalUpdateTr.childNodes[2].innerHTML = arrOrgData.getOrgById(selectOrg.value).OrgName;
    GlobalUpdateTr.childNodes[2].setAttribute("OrgId",selectOrg.value);
    GlobalUpdateTr.childNodes[5].innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";
    //更新数组数据
    var obj = { "Id": GlobalUpdateTr.childNodes[0].innerHTML, "Name": inputPersonName.value, "OrgId": selectOrg.value, "Money": inputMoney.value, "Time": inputTime.value };
    arrDetailData.update(obj);
    //更新完成，退出修改状态（重置）
    GlobalUpdateTr = null;
};
//7-4.退出修改状态（重置）
function exitUpdateState() {
    //还原
    GlobalUpdateTr.childNodes[1].innerHTML = GlobalUpdateTr.childNodes[1].getAttribute("oldValue");
    GlobalUpdateTr.childNodes[3].innerHTML = GlobalUpdateTr.childNodes[3].getAttribute("oldValue");
    GlobalUpdateTr.childNodes[4].innerHTML = GlobalUpdateTr.childNodes[4].getAttribute("oldValue");
    GlobalUpdateTr.childNodes[2].removeChild(selectOrg);
    var id = GlobalUpdateTr.childNodes[2].getAttribute("OrgId");//原来存储的OrgId
    GlobalUpdateTr.childNodes[2].innerHTML = arrOrgData.getOrgById(id).OrgName;
    GlobalUpdateTr.childNodes[5].innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";
    GlobalUpdateTr = null;
}
//------窗口加载完毕触发------//
window.onload = function () {
    //加载各个栏的受捐单位信息
    loadOrgData(getElement("selSearchOrg"));//查询栏
    loadOrgData(getElement("selAddOrg"));//新增栏
    loadOrgData(selectOrg);//修改栏
    //加载详细捐赠信息(第一页)
    var arr = arrDetailData.getPageData();
    loadDatailArr(arr);
    //loadDetailData();
    //新增
    getElement("btnAdd").onclick = function () {
        var model = { "Name": getElement("txtName").value, "OrgId": getElement("selAddOrg").value, "Money": getElement("txtMoney").value, "Time": getElement("txtDate").value };//创建一个新数组元素对象
        model = arrDetailData.addModel(model);//返回新增的元素
        addTr(model);//插入新行到表显示
    };
    //查询
    getElement("btnSearch").onclick = function () {
        var id = getElement("selSearchOrg").value;//获得需要查询的捐赠单位id
        var arrSearchData = arrDetailData.getSearchData(id);//获取查询到的数据
        var tbList = getElement("tbList");//获取表元素
        for (var i = tbList.rows.length - 1; i >= 1; i--) {//加载数据前，删除表的行,从末端删
            tbList.deleteRow(i);
        }
        window.loadDatailArr(arrSearchData);//加载数据
    };
    //分页
    //下一页
    getElement("btnnextPage").onclick = function () {
        if (arrDetailData.length == 0) {
            alert("没有数据");
        };
        //计算总页数
        arrDetailData.pages = arrDetailData.length % arrDetailData.pageCount != 0 ? (arrDetailData.length - arrDetailData.length % arrDetailData.pageCount) / arrDetailData.pageCount + 1 : arrDetailData.length / arrDetailData.pageCount;
        if (arrDetailData.pageIndex==arrDetailData.pages) {//判断是否最后一页
            alert("最后一页啦");
            return;
        }
        //加载数据前，先删除表的行
        var tbList = getElement("tbList");//获得表元素
        for (var i = tbList.rows.length - 1; i >= 1; i--) {//删除表的行
            tbList.deleteRow(i);
        }
        arrDetailData.pageIndex++;//++，得到下一页
        //获取一页数据
        var pageArrData = arrDetailData.getPageData();
        loadDatailArr(pageArrData);
    };
    //上一页
    getElement("btnprePage").onclick = function () {
        if (arrDetailData.length == 0) {
            alert("没有数据");
        };
        //计算总页数
        arrDetailData.pages = arrDetailData.length % arrDetailData.pageCount != 0 ? (arrDetailData.length - arrDetailData.length % arrDetailData.pageCount) / arrDetailData.pageCount + 1 : arrDetailData.length / arrDetailData.pageCount;
        if (arrDetailData.pageIndex == 1) {//判断是否第一页
            alert("这是第一页啦");
            return;
        }
        //加载数据前，先删除表的行
        var tbList = getElement("tbList");//获得表元素
        for (var i = tbList.rows.length - 1; i >= 1; i--) {//删除表的行
            tbList.deleteRow(i);
        }
        arrDetailData.pageIndex--;//--，得到上一页
        //获取一页数据
        var pageArrData = arrDetailData.getPageData();
        loadDatailArr(pageArrData);
    };
};