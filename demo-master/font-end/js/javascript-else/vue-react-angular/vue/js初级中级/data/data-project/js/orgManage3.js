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
    { "Id": 4, "Name": "傻龙", "OrgId": 4, "Money": "4000", "Time": "2013 - 07 - 08" }
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
//2-2.更新数据，model-修改后的对象
arrDetailData.update = function (model) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == model.Id) {
            this[i] = model;
            break;
        };
    };
};
//2-3.新增数据，并返回新增的元素
var modelId=arrDetailData.length;//定义变量，存储数组元素的Id
arrDetailData.addModel = function (model) {
    modelId++;//每次添加序号++
    model.Id = modelId;//设置添加对象的Id
    this[this.length] = model;//数组元素++，在length
    return model;
};
//2-4.根据捐赠单位Id返回数组
arrDetailData.getSearchData = function (id) {
    if(id==-1){//id为-1返回所有数据
        return this;
    };
    //定义存储查询数据的数组
    var arrSearch = new Array();
    for (var i = 0; i < this.length; i++) {
        if(this[i].OrgId==id){//判断OrgId是否符合条件
            arrSearch[arrSearch.length]=this[i];
        };
    };
    return arrSearch;
};
//2-5.返回一页数据
arrDetailData.pageIndex = 1;//页码
arrDetailData.pageCount = 5;//每页记录条数
arrDetailData.pages=0;//总页数
//返回第pageIndex页数据
arrDetailData.getPageData = function () {
    var pageData = new Array();//定义数组存储一页数据
    for (var i = (this.pageIndex - 1) * this.pageCount; i < this.pageIndex * this.pageCount; i++) {//获取第pageIndex页数据
        //alert(this[i]);
        if (this[i]) {//判断this[i]是否undefined,过滤掉
            pageData[pageData.length] = this[i];
        };
    }
    return pageData;
};
//3.加载受捐单位信息,element-传入select对象
function loadOrgData(element) {
    for (var i = 0; i < arrOrgData.length; i++) {
        var opt = new Option(arrOrgData[i].OrgName, arrDetailData[i].Id);
        element.options.add(opt);
    };
};
//4.加载表数据（详细信息）
function loadDetailData() {
    for (var i = 0; i < arrDetailData.length; i++) {
        addTr(arrDetailData[i]);
    }
};
//4-1.加载表数据,arr数组数据
function loadDataToTb(arr) {
    for (var i = 0; i < arr.length; i++) {
        addTr(arr[i]);
    };
};
//4-1.插入一行,model-数组元素
function addTr(model) {
    var tb = getElement("tbList");//获得表对象
    var tr = tb.insertRow(-1);//插入一行
    tr.insertCell(-1).innerHTML = model.Id;//插入序号列
    tr.insertCell(-1).innerHTML = model.Name;//插入名称列
    var td = tr.insertCell(-1);//插入OrgId列
    td.setAttribute("OrgId", model.OrgId);//保存OrgId到td的OrgId属性（自定义）
    td.innerHTML = arrOrgData.getOrgById(model.OrgId).OrgName;//设置捐赠单位名称
    tr.insertCell(-1).innerHTML = model.Money;//插入金额列
    tr.insertCell(-1).innerHTML = model.Time;//插入捐赠时间列
    tr.insertCell(-1).innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";//操作列
};
//5.根据标签id获得标签对象
function getElement(id) {
    return document.getElementById(id);
};
//6.删除行,element-当前点击de
function deleteRow(element) {
    if (GlobalUpdateTr != null) {//判断当前是否修改状态
        rollBack(GlobalUpdateTr);
    };
    if (!confirm("确定删除吗？")) {//确认是否要移除
        return;
    };
    var delTr = element.parentNode.parentNode;//获取删除行
    delTr.parentNode.removeChild(delTr);//移除行
    arrDetailData.deleteById(delTr.childNodes[0].innerHTML);//删除对应的数组元素
};
//7.修改行
//7-1.定义全局变量,三个文本框一个下拉列表，一个存储修改行的变量GlobalUpdateTr，标记修改状态
var inputPersonName = document.createElement("input");//捐赠人名称
inputPersonName.type = "text";
var inputMoney = document.createElement("input");//捐赠金额
inputMoney.type = "text";
var inputTime = document.createElement("input");//捐赠时间
inputTime.type = "text";
var selectOrg = document.createElement("select");//受捐单位下拉列表
var GlobalUpdateTr = null;//存储修改行，标记是否修改状态
//7.2.设置当前行，为修改状态,obj-当前点击对象
function setUpdateState(element) {
    if (GlobalUpdateTr != null) {//判断是否已经在修改状态
        rollBack(GlobalUpdateTr);//还原
    };
    GlobalUpdateTr = element.parentNode.parentNode;//获得当前修改行
    txtToInput(GlobalUpdateTr.childNodes[1], inputPersonName);
    txtToInput(GlobalUpdateTr.childNodes[3], inputMoney);
    txtToInput(GlobalUpdateTr.childNodes[4], inputTime);
    txtToSelect(GlobalUpdateTr.childNodes[2], selectOrg);
    GlobalUpdateTr.childNodes[5].innerHTML = "<a href='#' onclick='update(this)'>确定</a>&nbsp;&nbsp;<a href='#' onclick='exitUpdateState(this)'>取消</a>";//设置操作列
};
//7-2-1.当前行设置为修改状态（文本设为文本框）(td:列，element:文本框)
function txtToInput(td,element) {
    element.value = td.innerHTML;//设置obj的值
    td.setAttribute("oldValue",td.innerHTML);//保存td的文本值，取消修改时要取的值
    td.appendChild(element);//往列td添加obj
    if (td.childNodes[1]) {//判断是否有文本节点
        td.removeChild(td.childNodes[0]);//移除td的文本节点
    };
};
//7-2-2.当前行设置为修改状态（文本设为下拉列）(td:列，element:下拉列)
function txtToSelect(td, element) {
    td.appendChild(element);
    td.removeChild(td.childNodes[0]);
    element.value = td.getAttribute("OrgId");
};
//7-3.取消修改，恢复界面，退出修改操作状态,element-当前点击对象
function exitUpdateState(element) {
    var cancelTr = element.parentNode.parentNode;//取得当前行
    rollBack(cancelTr);
    //退出修改状态
    GlobalUpdateTr = null;
};
//还原,obj-当前修改行/之前的修改行
function rollBack(element) {
    element.childNodes[1].innerHTML = element.childNodes[1].getAttribute("oldValue");//恢复原来的文本值(名称)
    element.childNodes[3].innerHTML = element.childNodes[3].getAttribute("oldValue");//恢复原来的文本值(金额)
    element.childNodes[4].innerHTML = element.childNodes[4].getAttribute("oldValue");//恢复原来的文本值(日期)
    element.childNodes[2].removeChild(selectOrg);//移除下拉列
    var orgId = element.childNodes[2].getAttribute("OrgId");//取得捐赠单位id
    element.childNodes[2].innerHTML = arrOrgData.getOrgById(orgId).OrgName;//恢复原来的文本值（捐赠单位）
    element.childNodes[5].innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";//恢复操作列
};
//7-4.确定修改，更新界面，更新数据，修改完毕退出修改状态,element-当前点击对象
function update(element) {
    var updateTr = element.parentNode.parentNode;//取得当前行
    //更新界面
    updateTr.childNodes[1].innerHTML = inputPersonName.value;
    updateTr.childNodes[3].innerHTML = inputMoney.value;
    updateTr.childNodes[4].innerHTML = inputTime.value;
    updateTr.childNodes[2].removeChild(selectOrg);
    updateTr.childNodes[2].innerHTML = arrOrgData.getOrgById(selectOrg.value).OrgName;
    updateTr.childNodes[2].setAttribute("OrgId", selectOrg.value);//更新OrgId
    updateTr.childNodes[5].innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";//恢复操作列
    //更新数据
    //下拉列表的value值就是下拉列表当前选项的value值
    var model = { "Id": updateTr.childNodes[0].innerHTML, "Name": inputPersonName.value, "OrgId": selectOrg.value, "Money": inputMoney.value, "Time": inputTime.value };//创建与当前行数据对应的对象
    arrDetailData.update(model);//更新数组
    //退出修改状态
    GlobalUpdateTr = null;
};
//-------窗口加载完毕触发--------//
window.onload = function () {
    //1.加载arrOrgData（to下拉列）
    loadOrgData(getElement("selSearchOrg"));
    loadOrgData(getElement("selAddOrg"));
    loadOrgData(selectOrg);
    //2.加载arrDetailData（to表）
    loadDetailData();
    //3.新增
    getElement("btnAdd").onclick = function () {
        var model = {"Name": getElement("txtName").value, "OrgId": getElement("selAddOrg").value, "Money": getElement("txtMoney").value, "Time": getElement("txtDate").value };//创建一个新数组元素对象
        model = arrDetailData.addModel(model);//返回新增的元素
        addTr(model);//插入新行到表显示
    };
    //4.查询（先删除当前界面所有行，再添加）
    getElement("btnSearch").onclick = function () {
        var tbList = getElement("tbList");//获得表
        for (var i = tbList.rows.length - 1; i >= 1; i--) {//遍历删除表的行，从末端开始
            tbList.deleteRow(i);//删除一行
        }
        var searchId = getElement("selSearchOrg").value;//要查询的捐赠单位id
        var arrSearchData = arrDetailData.getSearchData(searchId);//得到查询数据
        loadDataToTb(arrSearchData);//(加载)显示查询数据
    };
    //5.分页（先删除当前界面所有行，再添加）
    //5-1.下一页
    getElement("btnnextPage").onclick = function () {
        if (arrDetailData.length == 0) {
            alert("没有数据");
        };
        //获取总页数
        arrDetailData.pages = arrDetailData.length % arrDetailData.pageCount != 0 ? (arrDetailData.length - arrDetailData.length % arrDetailData.pageCount) / arrDetailData.pageCount + 1 : arrDetailData.length / arrDetailData.pageCount;
        if (arrDetailData.pageIndex == arrDetailData.pages) {//判断是否最后一页
            alert("最后一页啦");
            return;//返回
        };
        var tbList = getElement("tbList");//获得表对象
        for (var  i= tbList.rows.length-1;i>=1; i--) {//删除表所有行
            tbList.deleteRow(i);
        }
        arrDetailData.pageIndex++;//页码++,取得下一页
        var arrPage = arrDetailData.getPageData();//获得一页数据
        loadDataToTb(arrPage);//加载显示到表
    };
    //5-2.上一页
    getElement("btnprePage").onclick = function () {
        if (arrDetailData.length == 0) {
            alert("没有数据");
        };
        //获取总页数
        arrDetailData.pages = arrDetailData.length % arrDetailData.pageCount != 0 ? (arrDetailData.length - arrDetailData.length % arrDetailData.pageCount) / arrDetailData.pageCount + 1 : arrDetailData.length / arrDetailData.pageCount;
        if(arrDetailData.pageIndex==1){//判断是否第一页
            alert("这个第一页");
            return;
        };
        var tbList = getElement("tbList");//获得表对象
        for (var i = tbList.rows.length - 1; i >= 1; i--) {//删除表所有行
            tbList.deleteRow(i);
        }
        arrDetailData.pageIndex--;//页码--，取得上一页
        var arrPage = arrDetailData.getPageData();//获得一页数据
        loadDataToTb(arrPage);//加载显示到表
    };
};