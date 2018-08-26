/**
 * Created by hzx on 2017/7/27.
 */

var host = '-----';
var placeholderImg = '../img/bg/placeholder.png';
var userImg = '../img/logo/user-avatar.png';
var userXImg = '../img/logo/user-avatar@3x.png';
var adminImg = '../img/logo/admin-avatar.png';
var adminXImg = '../img/logo/admin-avatar@3x.png';

//后台菜单模块id
var ModuleId = {
    article: 1,
    audio: 2,
    user: 3,
    radio: 4,
    album: 5,
    webcast: 6,
    comment: 7,
    keywords: 8,
    resource: 9
}
/*var host = '';*/

//获取地址栏参数信息
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getUrlParam(key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

function getUrlParam2(key) {
    // 获取参数
    var url = window.location.search;
    console.log(url);
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = window.atob(url.substr(1)).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

//格式化时间
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//计算时间差
function GetTimeDiff(startTime, resTime) {
    console.info(resTime);
    var time1 = startTime.replace(/-/g, "/");
    var date1 = new Date(time1); //开始时间;

    if (resTime != '') {
        var time2 = resTime.replace(/-/g, "/");
        var date2 = new Date(time2); //结束时间(回复时间)
    } else {
        var date2 = new Date();  //结束时间(当前时间)
    }
    var timeDi = date2.getTime() - date1.getTime();  //时间差的毫秒数

    //计算出相差天数
    var days = Math.floor(timeDi / (24 * 3600 * 1000));

    //计算出小时数
    var leave1 = timeDi % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);     //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if (days > 0) {
        var dayStr = days + "天";
    } else {
        var dayStr = '';
    }
    var timeStr = dayStr + hours + "小时" + minutes + "分钟";
    return timeStr;
}

//系统退出
function Logout() {
    sessionStorage.clear();
    window.location.href = '/loginOut'
}

function setEidtTag() {
    var titleName = ''
    var urlid = getQueryString('id');
    if (urlid != '') {
        titleName = '编辑';
    } else {
        titleName = '新建'
    }
    $('.edit-name').text(titleName);
    return;
}

function disableFormEle(ele) {
    $(ele + ' input').attr('disabled', true);
    $(ele + ' select').attr('disabled', true);
    $(ele + ' textarea').attr('disabled', true);
    $(ele + ' checkbox').attr('disabled', true);
    $(ele + ' radio').attr('disabled', true);
    $(ele + ' .el-checkbox').attr('disabled', true);
}

function goBack() {
    window.history.go(-1);
}

function delayBack() {
    setTimeout(goBack, 1500);
}

function msgError(_this, msg) {
    _this.$message({
        type: 'error',
        message: msg,
        customClass: 'msg-fixed'
    });
}

function msgSuccess(_this, msg) {
    _this.$message({
        type: 'success',
        message: msg,
        customClass: 'msg-fixed'
    });
}

function msgWarning(_this, msg) {
    _this.$message({
        type: 'warning',
        message: msg,
        customClass: 'msg-fixed'
    });
}

function msgInfo(_this, msg) {
    _this.$message({
        message: msg,
        customClass: 'msg-fixed'
    });
}

function formCheck(data, errors, _this) {
    var result = '';
    var msg = '';
    for (var i = 0; i < data.length; i++) {
        result = data[i].trim();
        if (result == '' || result == undefined) {
            msg = errors[i];
            msgWarning(_this, msg);
            return false;
        }
    }
    return true;
}

function compareTime(startTime, endTime) {
    var start = startTime.replace(/:/g, '');
    var end = endTime.replace(/:/g, '');
    if (parseInt(start) >= parseInt(end)) {
        return true
    }
    return false
}

function compareDate(startDate, endDate) {
    var start = startDate.replace(/-/g, '');
    var end = endDate.replace(/-/g, '');
    console.log(start);
    console.log(end);
    if (parseInt(start) > parseInt(end)) {
        return true
    }
    return false
}

function compareDateTime(startDateTime, endDateTime) {
    var start = startDateTime.replace(/-/g, "/");
    var end = endDateTime.replace(/-/g, "/");
    var time1 = new Date(start).getTime(); //开始时间;
    var time2 = new Date(end).getTime(); //结束时间;
    console.log(time1);
    console.log(time2);
    if (time1 - time2 > 0) {
        return true
    }
    return false
}

//初始化单个图片上传控件的样式
function initImgUpload(inputFildId) {
    $("#" + inputFildId).fileinput({
        language: 'zh', //设置语言
        /*uploadUrl: 'upload_logo',*/
        allowedFileExtensions: ['jpg', 'png', 'gif', 'jpeg'],//接收的文件后缀glyphicon glyphicon-trash text-danger
        browseIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
        removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>&nbsp;',
        showUpload: false, //是否显示上传按钮
        showCaption: false,//是否显示标题
        showRemove: false,
        browseClass: "btn btn-default", //按钮样式
        //dropZoneEnabled: false,//是否显示拖拽区域rue
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
        //minFileCount: 0,
        /*maxFileCount: 1, //表示允许同时上传的最大文件个数*!/
         maxFileCount: 10, //表示允许同时上传的最大文件个数*/
        enctype: 'multipart/form-data',
        /*validateInitialCount:true,*/
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        initialPreview: [ //预览图片的设置
            "<img src='../img/bg/placeholder.png' class='file-preview-image' alt='无效的图片资源' title='图片'>"
        ]
    });
}

//单个音频上传功能
function initAudioUpload(audioFildId, postUrl) {
    $("#" + audioFildId).fileinput({
        language: 'zh', //设置语言
        uploadUrl: postUrl,
        allowedFileExtensions: ['mp3'],//接收的文件后缀glyphicon glyphicon-trash text-danger['mp3','wav','wma','wmv','ogg','ape','acc']
        browseIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
        removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>&nbsp;',
        showUpload: false, //是否显示上传按钮
        showCaption: false,//是否显示标题
        showRemove: false,
        browseClass: "btn btn-default", //按钮样式
        dropZoneEnabled: false,//是否显示拖拽区域rue
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        maxFileSize: 1024000,//单位为kb，如果为0表示不限制文件大小
        /*minFileCount: 1,*/
        maxFileCount: 1, //表示允许同时上传的最大文件个数*/
        enctype: 'multipart/form-data',
        validateInitialCount: true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        initialPreview: [ //预览图片的设置
            /*//"<img src='" + imageurl + "' class='file-preview-image' alt='肖像图片' title='肖像图片'>"
             "<img src='admin/img/head-img.png' class='file-preview-image' alt='肖像图片' title='肖像图片'>"*/
        ]
    });
}

function initUEditor(ueid) {
    var ue = UE.getEditor(ueid, {
        toolbars: [
            [
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                'print', 'preview', 'searchreplace', 'drafts', 'help'
            ]
        ],
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        allowDivTransToP: false,
        lang: "zh-cn",
        initialFrameHeight: 320,
        scaleEnabled: true,
        minFrameWidth: 500,
        minFrameHeight: 200,
        saveInterval: 1000,
    });
    return ue;
}

//站内选取视封面还是音频封面
function clouds(type) {
    $("#choosModal").modal('show');
    $("#dialogChoose").hide();
    window.chooseType = type;
}

//当前时间戳
var gettime = function () {
    var time = Date.parse(new Date());
    return time = time / 1000;
}

//token值
function createToken(routname) {
    return 'sl' + hex_md5(routname + gettime()) + 'mgfm'
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

var Request = new Object();
Request = GetRequest();

//打开文件预览
function openImg() {
    $(".el-upload__input").click()
}

//获取模块module_id
function getModuleId(type) {
    var module_id = '';
    switch (type) {
        case 'article':
            module_id = 1;
            break;
        case 'album':
            module_id = 5;
            break;
        case 'comment':
            module_id = 7;
            break;
        case 'keywords':
            module_id = 8;
            break;
        case 'resource':
            module_id = 9;
            break;
        default:
            module_id = '';
    }
    return module_id;
}

function getModuleName(type) {
    var module_name = '';
    switch (type) {
        case 'article':
            module_name = '文章发布内容审核';
            break;
        case 'album':
            module_name = '专辑发布内容审核';
            break;
        case 'comment':
            module_name = '用户评论内容审核';
            break;
        case 'keywords':
            module_name = '敏感词过滤';
            break;
        case 'resource':
            module_name = '素材库上传内容审核';
            break;
        default:
            module_name = '';
    }
    return module_name;
}

//获取sort——table信息
function getSortTable(type) {
    var sortTable = {
        table: '',
        idname: '',
    };
    switch (type) {
        case 'article':
            sortTable = {
                table: 'articles',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        case 'audio':
            sortTable = {
                table: 'albums',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        case 'anchor':
            sortTable = {
                table: 'anchors',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        case 'channel':
            sortTable = {
                table: 'channels',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        case 'netradio':
            sortTable = {
                table: 'radios',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        case 'programme':
            sortTable = {
                table: 'templates',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        case 'webcasts':
            sortTable = {
                table: 'webcasts',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        //音频类型管理
        case 'assorts':
            sortTable = {
                table: 'assorts',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        //音频场景管理
        case 'scenes':
            sortTable = {
                table: 'scenes',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        //专辑歌曲列表
        case 'albumList':
            sortTable = {
                table: 'audios',
                idname: 'id',
                sortname: 'sort',
            };
            break;
        default:
            sortTable = {
                table: '',
                idname: 'id',
                sortname: 'sort',
            };
    }
    return sortTable;
}

function getTzModuleName(module_id) {
    var module_name = '';
    switch (module_id) {
        case '1':
            module_name = '文章信息';
            break;
        case '5':
            module_name = '专辑信息';
            break;
        case '9':

            module_name = '素材';
            break;
        default:
            module_name = '';
    }
    return module_name;
}

//1：驳回 2:通过审核 3：下架 4：上架
function getTzStatus(status) {
    var status_name = '';
    switch (status) {
        case '1':
            status_name = '被驳回';
            break;
        case '2':
            status_name = '通过审核';
            break;
        case '3':
            status_name = '已被下架';
            break;
        case '4':
            status_name = '已上架';
            break;
        default:
            status_name = '';
    }
    return status_name;
}

//label-success label-info label-info
function getTypeClass(status) {
    var labelType = '';
    switch (status) {
        case '1':
            labelType = 'label-danger';
            break;
        case '2':
            labelType = 'label-success';
            break;
        case '3':
            labelType = 'label-info';
            break;
        case '4':
            labelType = 'label-info';
            break;
        default:
            labelType = '';
    }
    return labelType;
}

function getTzLinkUrl(item) {
    console.log('item');
    console.log(item);
    var linkUrl = '';
    var id = item.list_id;
    var status = item.status;
    switch (item.module_id) {
        case '1':
            if (status == '1') {
                sessionStorage.setItem('mid', 5);
                /*linkUrl = 'article_rejected';*/
            }
            if (status == '2' || status == '3' || status == '4') {
                sessionStorage.setItem('mid', 5);
                /*linkUrl = 'article_published';*/
            }
            linkUrl = 'article_publish_edit?id=' + id + '&status=' + status + '&from=' + 'msg';
            /*if (status == '2' || status == '3' || status == '4') {
                status = 2;
            }
            var paramStr = 'id='+item.list_id+'&status='+status+'&isDetail='+1;
            linkUrl = 'article_publish_edit?'+ window.btoa(paramStr);*/
            break;
        case '5':
            if (status == '1') {
                sessionStorage.setItem('mid', 11);
                /*linkUrl = 'article_rejected';*/
            }
            if (status == '2' || status == '3' || status == '4') {
                sessionStorage.setItem('mid', 9);
                /*linkUrl = 'article_published';*/
            }
            linkUrl = 'special?id=' + id + '&from=' + 'msg';
            break;
        case '9':
            sessionStorage.setItem('mid', 11);

            linkUrl = 'repository?id=' + id + '&from=' + 'msg' + '&classify=' + 0;
            /*if (status == '0') {
                linkUrl = 'article_check';
            }
            if (status == '1') {
                linkUrl = 'article_published';
            }*/
            break;
        default:
            linkUrl = '';
    }
    return linkUrl;
}

function getSourceType(name) {

}

function activeMenu(id) {
    var level2 = $("#menu-" + id).closest('.sub-menu');
    //判断是否有二级菜单
    if (level2.length > 0) {
        //有二级菜单，选中效果
        $("#menu-" + id).parent('.nav-item').addClass('active');
        var level1 = $("#menu-" + id).closest('.sub-menu').parent('.nav-item');
        level1.addClass('active');
        level1.find('.arrow').addClass('open');
        level1.find('a').append('<span class="selected"></span>');
    } else {
        //没有二级菜单，选中效果
        $("#menu-" + id).append('<span class="selected"></span>');
        $("#menu-" + id).parent('.nav-item').addClass('active open');
    }
}

function removeError(el) {
    console.log(el);
    $(el).closest('.dr').find('.error-show').removeClass('error-show');
}

var cloudMixin = {
    data: function () {
        return {
            list: [],
            searchAudio: '',//站内选取图片搜索条件
            chooseType: '',//选取的类型
            cloudsStext: '',
            cloudsPage: 1,
            resTotal: 0
        }
    },
    methods: {
        //图片封面站内按钮点击事件
        clouds: function (type) {
            this.geResdata();
            $("#choosModal").modal('show');
            this.isvisible = false;
            this.chooseType = type;
        },
        //站内选取图片搜索事件
        cloudSearch: function (val) {
            this.cloudsStext = val;
            this.geResdata();
        },
        //站内选取翻页事件
        curPagechange: function (page) {
            this.cloudsPage = page;
            this.geResdata();
        },
        //站内选取图片事件
        chooseChange: function (item) {
            console.log('提示：暂无 chooseChange(item) 方法');
        },
        geResdata: function (type) {//获取图片站内资源
            var _this = this;
            if (type === '1') {
                var datajson = {}
            } else {
                var datajson = {
                    type: type,
                    search: this.audioTotal,
                    page: this.audiocurrenPage,
                    limit: 10
                }
            }
            $.ajax({
                type: 'get',
                url: '/getAudioData',
                data: {
                    type: '1',
                    search: this.cloudsStext,
                    page: this.cloudsPage,
                    limit: 12
                },
                dataType: 'json',
                success: function (res) {
                    if (res.code === '000000') {
                        _this.list = res.data;
                        _this.resTotal = parseInt(res.total)
                    }
                },
                error: function (err) {
                    _this.$message({
                        message: '站内资源获取失败',
                        type: 'error',
                        customClass: 'messagefixed'
                    });
                }
            })
        }
    }
}
var commonMixin = {
    data: function () {
        return {
            amdinid: '',
            menuid: 1,
            permission: [],
            access: [],
            isCheck: false,
            btnList: {
                query: true,
                add: false,
                edit: false,
                del: false,
                sort: false,
                review: false
            }
        }
    },
    created: function () {
        this.handleActiveMenu();
        this.handleConfigPermission();
    },
    methods: {
        handleActiveMenu: function () {
            console.log('请选中菜单');
        },
        handleConfigPermission: function () {
            console.log('请配置操作权限');
        },
        getPermission: function (menuid) {
            this.menuid = menuid;
            this.amdinid = $('#amdin_id').val();
            var _this = this;
            if (sessionStorage.permisson) {
                this.permission = JSON.parse(sessionStorage.permisson);
            } else {
                $.ajax({
                    url: '/getMenuByUserId/' + this.amdinid,
                    type: 'get',
                    data: null,
                    dataType: 'json',
                    scriptCharset: 'utf-8',
                    async: false,
                    success: function (res) {
                        if (res.code == '000000') {
                            _this.permission = res.data;
                            sessionStorage.permisson = JSON.stringify(_this.permission);
                        } else {
                            msgError(_this, res.msg);
                            return;
                        }
                    },
                    error: function () {
                        console.log('请求失败');
                        return;
                    }
                });
            }
            this.permission.forEach(function (item) {
                //判断该模块是否有审核功能
                if (item.permission) {
                    item.permission.forEach(function (t) {
                        if (t.name == 'review') {
                            _this.isCheck = t.value == '1' ? true : false;
                        }
                    })
                }
                if (item.id == menuid) {
                    return _this.access = item.permission
                }
                if (item._child) {
                    try {
                        item._child.forEach(function (child) {
                            if (child.id == menuid) {
                                console.log(child.permission);
                                _this.access = child.permission
                                //一级模块是否带有审核
                                /* item.permission.forEach(function (t) {
                                     if (t.name == 'review') {
                                         _this.isCheck = t.value == '1' ? true : false;
                                     }
                                 });*/
                                console.log('_this.access');
                                console.log(_this.access);
                            }
                            return
                        })
                        return
                    } catch (e) {
                        console.log('mmp,_child 数组有问题')
                    }
                }
            })
            if (this.access.length == 0) {
                msgError(_this, '不存在id为' + menuid + '的菜单');
                return
            }
            this.setBtnList();
        },
        setBtnList: function () {
            console.log(this.menuid);
            console.log('this.isCheck');
            console.log(this.isCheck);
            if (this.access[0].value == '1') {
                this.btnList = {
                    query: true,
                    add: true,
                    edit: true,
                    del: true,
                    sort: true,
                    review: true
                }
                return
            } else {
                for (var i = 1; i < this.access.length; i++) {
                    this.btnList[this.access[i].name] = (this.access[i].value == '1') ? true : false;
                }
                console.log('this.btnList');
                console.log(this.btnList);
                if (!this.btnList.review) {
                    this.btnList["review"] = this.isCheck;
                }
                console.log('this.btnList');
                console.log(this.btnList);
            }
        },
        //排序
        sortFormat: function (index, row) {
            var sortVal = row.sort;
            var regNum = /[^0-9]/g;
            if (regNum.test(sortVal)) {
                var sort = sortVal.replace(regNum, '');
                this.tableData[index].sort = sort;
            }
        },
        saveSorts: function (moduleType) {
            var sortData = [];
            var sortItem = {};
            if (this.multipleSelection && this.multipleSelection.length > 0) {
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    sortItem = {
                        "id": this.multipleSelection[i].id,
                        "sort": this.multipleSelection[i].sort
                    }
                    sortData.push(sortItem);
                }
                var reqUrl = '/holdSort';
                var reqData = {
                    table: getSortTable(moduleType).table,
                    idname: getSortTable(moduleType).idname,
                    sortname: getSortTable(moduleType).sortname,
                    sortdata: sortData
                }
                var _this = this;
                $.ajax({
                    url: reqUrl,
                    type: 'get',
                    data: reqData,
                    dataType: 'json',
                    scriptCharset: 'utf-8',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (res) {
                        if (res.code === '000002') {
                            _this.tableRefresh();
                            msgSuccess(_this, '保存成功');
                        } else {
                            msgError(_this, res.msg);
                        }
                    },
                    error: function (res) {
                        console.log('error');
                    }
                });
            } else {
                this.$message({
                    type: 'warning',
                    message: '请选择要排序的数据！',
                    customClass: 'msg-fixed'
                });
                return;
            }
            console.log(sortData);
        }
    }
};

function remove_remind(obj) {
    $(obj).next().text("");
}

var bus = new Vue();

new Vue({
    el: '.page-header',
    data: function () {
        return {
            msgList: [],
            msgCount: 0,
            loading: false,
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
            dataMore: false,
            nodata: '',
        }
    },
    created: function () {
        this.getMsgList();
        this.getMsgCount();
        this.TzTimer();
    },
    methods: {
        labelClass: function (status) {
            return getTypeClass(status);
        },
        TzModuleName: function (module_id) {
            return getTzModuleName(module_id);
        },
        TzStatusInfo: function (status) {
            return getTzStatus(status);
        },
        TzTimer: function () {
            var _this = this;
            this.msgTimer = setInterval(function () {
                _this.getMsgCount();
            }, 50000);
        },
        linkToTable: function (item) {
            var linkUrl = getTzLinkUrl(item.module_id, item.status);
            if (item.is_read == '1') {
                this.isRead(item.id, linkUrl, false);
            } else {
                window.location.href = linkUrl;
            }
        },
        markReadAll: function () {
            if (this.msgList.length > 0) {
                this.isRead('', '', true);
            }
            return;
        },
        isRead: function (id, linkUrl, isReadAll) {
            var _this = this;
            var reqUrl = '/msgUpdate';
            var reqType = 'post';
            var reqData = {};
            if (isReadAll) {
                reqData = {
                    type: 'all',
                }
            } else {
                reqData = {
                    type: '',
                    id: id
                }
            }
            $.ajax({
                url: reqUrl,
                type: reqType,
                data: reqData,
                scriptCharset: 'utf-8',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                dataType: 'json',
                success: function (res) {
                    if (res.code == '000002') {
                        if (isReadAll) {
                            _this.msgCount = 0;
                            _this.msgList = [];
                            bus.$emit('msgReadAll');
                        } else {
                            _this.msgCount--;
                            window.location.href = linkUrl;
                        }
                    } else {
                        console.log(_this, res.msg);
                    }
                },
                error: function (res) {
                    console.log('error');
                }
            });
        },
        getMsgCount: function () {
            var _this = this;
            var reqUrl = '/msgCount';
            var reqType = 'get';
            var reqData = {
                nonce: gettime(),
                _token: createToken('/msgCount')
            };
            $.ajax({
                url: reqUrl,
                type: reqType,
                data: reqData,
                dataType: 'json',
                scriptCharset: 'utf-8',
                success: function (res) {
                    if (res.code == '000000') {
                        _this.msgCount = res.data;
                    } else {
                        console.log(res.msg);
                    }
                },
                error: function (res) {
                    console.log('error');
                }
            });
        },
        getMsgList: function () {
            var _this = this;
            var reqUrl = '/msgContent';
            var reqType = 'get';
            var reqData = {
                //basic
                unread: 1,
                page: this.currentPage,
                pageSize: this.pageSize,
                nonce: gettime(),
                _token: createToken('/msgContent')
            };
            $.ajax({
                url: reqUrl,
                type: reqType,
                data: reqData,
                dataType: 'json',
                scriptCharset: 'utf-8',
                success: function (res) {
                    if (res.code == '000000') {
                        _this.msgList = res.data.list;
                        if (res.data.total > 0) {
                            _this.nodata = 0;
                        } else {
                            _this.nodata = 1;
                        }
                    }
                },
                error: function (res) {
                    console.log('error');
                }
            });
        }
    }
})

new Vue({
    el: '#app-menu',
    data: function () {
        return {
            article: {
                count1: 0,
                count2: 0,
                count3: 0,
            },
            audio: {
                count1: 0,
                count2: 0,
                count3: 0,
            },
            countCreated: false
        }
    },
    created: function () {
        var _this = this;
        this.getCountObj(0);
        bus.$on('updateModuleCount', function () {
            if (_this.countCreated) {
                console.log('updateCount');
                _this.getCountObj(1);
            }
        });
    },
    methods: {
        getCountObj: function (type) {
            console.log(type)
            var _this = this;
            var reqUrl = '/ModuleCount';
            var reqType = 'get';
            var reqData = {
                nonce: gettime(),
                _token: createToken('/ModuleCount')
            };
            $.ajax({
                url: reqUrl,
                type: reqType,
                data: reqData,
                dataType: 'json',
                scriptCharset: 'utf-8',
                success: function (res) {
                    if (res.code == '000000') {
                        var article = res.data.article;
                        var audio = res.data.audio;
                        //1：驳回 2:通过审核 3：审核中
                        _this.article = {
                            count1: article[3] != undefined ? article[3] : 0,
                            count2: article[1] != undefined ? article[1] : 0,
                            count3: article[5] != undefined ? article[5] : 0
                        };
                        _this.audio = {
                            count1: audio[3] != undefined ? audio[3] : 0,
                            count2: audio[1] != undefined ? audio[1] : 0,
                            count3: audio[5] != undefined ? audio[5] : 0
                        };
                        _this.$nextTick(function () {
                            if (type === 0) {
                                //文章 -- 审核中
                                $('#menu-4').append('<span class="m-count">(' + _this.article.count1 + ')</span>');
                                //文章 -- 驳回
                                $('#menu-5').append('<span class="m-count">(' + _this.article.count2 + ')</span>');
                                //文章 -- 审核
                                $('#menu-7').append('<span class="m-count">(' + _this.article.count3 + ')</span>');
                                //音频 -- 审核中
                                $('#menu-10').append('<span class="m-count">(' + _this.audio.count1 + ')</span>');
                                //音频 -- 驳回
                                $('#menu-11').append('<span class="m-count">(' + _this.audio.count2 + ')</span>');
                                //音频音频 -- 审核
                                $('#menu-13').append('<span class="m-count">(' + _this.audio.count3 + ')</span>');
                                _this.countCreated = true;
                            } else {
                                //文章 -- 审核中
                                $('#menu-4').find('.m-count').html('(' + _this.article.count1 + ')');
                                //文章 -- 驳回
                                $('#menu-5').find('.m-count').html('(' + _this.article.count2 + ')');
                                //文章 -- 审核
                                $('#menu-7').find('.m-count').html('(' + _this.article.count3 + ')');
                                //音频 -- 审核中
                                $('#menu-10').find('.m-count').html('(' + _this.audio.count1 + ')');
                                //音频 -- 驳回
                                $('#menu-11').find('.m-count').html('(' + _this.audio.count2 + ')');
                                //音频音频 -- 审核
                                $('#menu-13').find('.m-count').html('(' + _this.audio.count3 + ')');
                            }
                        });
                    } else {
                        console.log(res.msg);
                    }
                },
                error: function (res) {
                    console.log('error');
                }
            });
        }
    }
});
