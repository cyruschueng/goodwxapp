//1.创建受捐单位数组
var arrOrg = [
    { "Id": 1, "OrgName": "红十字会" },
    { "Id": 2, "OrgName": "壹基金" },
    { "Id": 3, "OrgName": "中华慈善总会" },
    { "Id": 4, "OrgName": "中国扶贫基金会" }
];
//1-1为数组对象动态定义（绑定）一个方法(类似委托事件)，返回这个数组的一个元素对象
arrOrg.getOrgById = function (id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == id) {
            return this[i];
        };
    }
};
//2.详细捐赠信息数组
var arrData = [
    { "Id": 1, "Name": "成龙", "OrgId": 1, "Money": "1000", "Time": "2013 - 07 - 08" },
    { "Id": 2, "Name": "肥龙", "OrgId": 2, "Money": "2000", "Time": "2013 - 07 - 08" },
    { "Id": 3, "Name": "瘦龙", "OrgId": 3, "Money": "3000", "Time": "2013 - 07 - 08" },
    { "Id": 4, "Name": "傻龙", "OrgId": 4, "Money": "4000", "Time": "2013 - 07 - 08" }
];
//2-1为数组动态绑定一个删除元素的方法(ById)
//--this代表当前arrData,不是window或者其他对象
arrData.deleteById = function (id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == id) {
            //元素前移
            for (var j = i; j < this.length - 1; j++) {
                this[j] = this[j + 1];
            };
            //数组长度--
            this.length--;
        };
    }
};
//2-2.更新数据，obj-修改后的对象
arrData.update = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].Id == obj.Id) {
            this[i] = obj;
            break;
        };
    }
};
//3.将绑定数据到下拉列表的操作写成一个方法
//function LoadOrgDataToSel(id) {
//    for (var i = 0; i < arrOrg.length; i++) {
//        var opt = new Option(arrOrg[i].OrgName, arrOrg[i].Id);
//        document.getElementById(id).options.add(opt);
//    };
//};
//（修改）id改为obj，传入下拉列表对象
function LoadOrgDataToSel(obj) {
    for (var i = 0; i < arrOrg.length; i++) {
        var opt = new Option(arrOrg[i].OrgName, arrOrg[i].Id);
        obj.options.add(opt);
    };
};
//4.加载详细信息数据到表（方法）
function LoadDataToTable() {
    for (var i = 0; i < arrData.length; i++) {
        //添加一行
        AddTr(arrData[i]);
    }
};
//4-1加载一行数据到表格(obj-数组元素对象信息)
function AddTr(obj) {
    var tb = GetElement("tbList");
    //-1,表示在末端添加
    var tr = tb.insertRow(-1);//添加一行
    tr.insertCell(-1).innerHTML = obj.Id;//添加id列
    tr.insertCell(-1).innerHTML = obj.Name;//添加名称列
    var td = tr.insertCell(-1);
    td.innerHTML = arrOrg.getOrgById(obj.OrgId).OrgName;
    td.setAttribute("orgId", obj.OrgId);//为td设置orgId属性，存储obj的OrgId
    tr.insertCell(-1).innerHTML = obj.Money;
    tr.insertCell(-1).innerHTML = obj.Time;
    tr.insertCell(-1).innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";
};
//4-2根据id返回受捐单位信息
function getOrgById(id) {
    for (var i = 0; i < arrOrg.length; i++) {
        if (arrOrg[i].Id == id) {
            return arrOrg[i];
        };
    }
};
//5.将得到对象的过程写成一个单独的方法
function GetElement(id) {
    return document.getElementById(id);
};
//6.删除表格中一行(传入当前点击列对象)
function deleteRow(obj) {
    if (GlobalUpdateTr!=null) {//判断当前是否修改状态
        back();//退出修改状态
    }
    if (!confirm("确定删除吗？")) {
        return;
    }
    var delRow = obj.parentNode.parentNode;//获取要删除的行
    delRow.parentNode.removeChild(delRow);//删除行显示
    var id = delRow.children[0].innerHTML;//当前行的对象的id
    arrData.deleteById(id);//删除数组中对应id的元素
};
//-------7.修改状态------//
//7-1.创建全局的三个文本框和一个下拉列表，以及定义存储修改行的变量GlobalUpdateTr，标记当前是否为修改状态
var inputPerson = document.createElement("input");//捐赠人
inputPerson.type = "text";
var inputMoney = document.createElement("input");//金额
inputMoney.type = "text";
var inputDate = document.createElement("input");//日期
inputDate.type = "text";
var selectOrgName = document.createElement("select");//受捐单位
var GlobalUpdateTr = null;//标记修改状态，存储修改行，为null表示表格非修改状态
//7.2.设置（进入）修改状态，设置选择行GlobalUpdateTr，obj-传入点击对象
function setUpdateState(obj) {
    if (GlobalUpdateTr != null) {//（GlobalUpdateTr要修改的行）判断点击修改前是否有在修改的行，有则退出之前行的修改（还原）
        back();//退出之前行的修改状态
    };
    //设置当前选择行GlobalUpdateTr，进入修改操作状态
    GlobalUpdateTr = obj.parentNode.parentNode;
    //将所有列（td）设置为修改状态
    TextToInput(GlobalUpdateTr.childNodes[1], inputPerson);
    TextToSelect(GlobalUpdateTr.childNodes[2], selectOrgName);
    TextToInput(GlobalUpdateTr.childNodes[3], inputMoney);
    TextToInput(GlobalUpdateTr.childNodes[4], inputDate);
    GlobalUpdateTr.childNodes[5].innerHTML = "<a href='#'onclick='update()'>确定</a>&nbsp;&nbsp;<a href='#' onclick=back()>取消</a>";
};
//7-2-1.将td文本替换为文本框(修改状态)，td：列，obj：文本框
function TextToInput(td, obj) {
    obj.value = td.innerHTML;//设置文本框值
    td.setAttribute("oldValue", td.innerHTML);//替换前存储当前列的文本信息，当取消修改时可以返回
    td.appendChild(obj);//添加文本框
    td.removeChild(td.childNodes[0]);//移除文本
};
//7-2-2.将td文本替换为下拉列表（修改状态）
function TextToSelect(td, obj) {
    td.appendChild(obj);//添加下拉列表
    td.removeChild(td.childNodes[0]);//移除文本节点
    obj.value = td.getAttribute("orgId");//下拉列表的value值设为orgId（使下拉列表显示当前列的文本值）
};
//7-3.确定修改，更新界面显示和数组数据，GlobalUpdateTr-修改的行
function update() {
    //更新列的文本显示
    GlobalUpdateTr.childNodes[1].innerHTML = inputPerson.value;
    GlobalUpdateTr.childNodes[3].innerHTML = inputMoney.value;
    GlobalUpdateTr.childNodes[4].innerHTML = inputDate.value;
    GlobalUpdateTr.childNodes[2].removeChild(selectOrgName);//设置innerHTML前，先移除下拉列表（否则ie会报错），直接设置innerHTML，会clear select里的options
    GlobalUpdateTr.childNodes[2].innerHTML = arrOrg.getOrgById(selectOrgName.value).OrgName;//根据id返回Org对象，获得名称
    GlobalUpdateTr.childNodes[2].setAttribute("orgId", selectOrgName.value);//更新td中存储的orgId
    //更新数组的元素信息
    var updateObj = { "Id": GlobalUpdateTr.childNodes[0].innerHTML, "Name": inputPerson.value, "OrgId": selectOrgName.value, "Money": inputMoney.value, "Time": inputDate.value };//根据当前列的信息定义更新对象
    arrData.update(updateObj);
    //还原操作列为：修改 删除
    GlobalUpdateTr.childNodes[5].innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";
    //GlobalUpdateTr设置为null，表示更新完毕，当前没有修改的行，退出修改操作状态
    GlobalUpdateTr = null;
};
//7-4.取消修改操作，退出修改状态（点击取消或者点击其他行的修改）
function back() {
    //还原文本框
    GlobalUpdateTr.childNodes[1].innerHTML = GlobalUpdateTr.childNodes[1].getAttribute("oldValue");
    GlobalUpdateTr.childNodes[3].innerHTML = GlobalUpdateTr.childNodes[3].getAttribute("oldValue");
    GlobalUpdateTr.childNodes[4].innerHTML = GlobalUpdateTr.childNodes[4].getAttribute("oldValue");
    //还原下拉列表
    var id = GlobalUpdateTr.childNodes[2].getAttribute("orgId");//捐赠机构id
    GlobalUpdateTr.childNodes[2].removeChild(selectOrgName);//移除下拉列表（否则ie会报错）
    GlobalUpdateTr.childNodes[2].innerHTML = arrOrg.getOrgById(id).OrgName;
    //还原操作状态列
    GlobalUpdateTr.childNodes[5].innerHTML = "<a href='#' onclick='setUpdateState(this)'>修改</a>&nbsp;&nbsp;<a href='#' onclick='deleteRow(this)'>删除</a>";
    //GlobalUpdateTr设置为null，表示更新完毕，当前没有修改的行，退出修改操作状态
    GlobalUpdateTr = null;
};
//-----------窗口加载-----------//
window.onload = function () {
    //----1.加载下拉列表数据
    LoadOrgDataToSel(GetElement("selAddOrg"));//新增栏
    LoadOrgDataToSel(GetElement("selSearchOrg"));//查询栏
    LoadOrgDataToSel(selectOrgName);//修改栏
    //----2.加载表数据
    LoadDataToTable();
};