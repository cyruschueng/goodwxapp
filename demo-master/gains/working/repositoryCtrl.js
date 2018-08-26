/**
 * Created by Administrator on 2017/8/30.
 */
var router = '/material';
var app = new Vue({
    el: '#app',
    mixins: [commonMixin],
    data: {
        multipleSelection: [],
        ischeckAll: false,
        classify: '0',
        status: '',
        time: '',
        searchText: '',
        start: '',
        end: '',
        options: [{
            value: '',
            label: '全部状态'
        }, {
            value: '2',
            label: '审核通过'
        }, {
            value: '3',
            label: '审核中'
        }, {
            value: '1',
            label: '驳回'
        }, {
            value: 'Permit',
            label: '待审核'
        }],
        listdata: [],
        is_visible: false,
        currentPage: 1,
        pageSize: 12,
        total: 0,
        modaldata: '',
        dialogReject: false,
        rejectinfo: {
            id: '',
            type: "",
            reason: ''
        },
        file_visible: false,
        isddd: false
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getlist();
        })
    },
    methods: {
        handleActiveMenu: function () {
            activeMenu(34);
        },
        handleConfigPermission: function () {
            this.getPermission(34);
        },
        Imglogo: function (imgUrl) {
            if (imgUrl != '' && imgUrl != null && imgUrl != placeholderImg) {
                return '/getImg?sid=' + imgUrl;
            } else {
                return placeholderImg;
            }
        },
        getRes: function (id) {//获取音频
            return '/getResource?sid=' + id
        },
        getVideologo: function (logo) {
            console.log(logo);
            if (logo !== null) {
                return "/img/" + logo;
            } else {
                return placeholderImg;
            }
        },
        fileSize: function (bytes) {
            if (bytes === 0) return '0 B';
            var k = 1000, // or 1024
                sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        getlist: function () {
            var _this = this;
            var reqData = {
                "page": this.currentPage,
                "pageSize": this.pageSize,
                "search": this.searchText,
                "classify": this.classify,
                "start": this.start,
                "end": this.end,
                "status": this.status,
                "order": '1',
                "where": '',
                "nonce": gettime(),
                "_token": createToken(router)
            };
            $.ajax({
                url: router,
                type: 'get',
                data: reqData,
                dataType: 'json',
                scriptCharset: 'utf-8',
                success: function (res) {
                    if (res.code === '000000') {
                        _this.listdata = res.data.list;
                        _this.listdata.forEach(function (val) {
                            val.checkid = '';
                        });
                        _this.total = res.data.total;
                    }
                },
                error: function (res) {

                }
            });
        },
        setFiledata: function (item) {
            var _this = this;
            $.ajax({
                type: 'post',
                url: router,
                data: {resource_id: item},
                dataType: 'json',
                scriptCharset: 'utf-8',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (res) {
                    if (res.code === "000002") {
                        _this.$message({
                            type: 'success',
                            customClass: 'messagefixed',
                            message: '上传成功，等待审核'
                        });
                    } else {
                        _this.$message({
                            type: 'error',
                            customClass: 'messagefixed',
                            message: res.msg
                        });
                    }
                },
                error: function (err) {
                    _this.$message({
                        type: 'error',
                        customClass: 'messagefixed',
                        message: '操作失败'
                    });
                }
            })
        },
        selectChange: function () {
            this.getlist();
        },
        dateChange: function (val) {
            this.start = (val.split(" - "))[0];
            this.end = (val.split(" - "))[1];
        },
        //全选
        handleCheck: function (event) {
            var _this = this;
            if (this.ischeckAll) {
                _this.multipleSelection = [];
                this.listdata.forEach(function (val, idx, ary) {
                    val.checkid = '';
                });
                this.ischeckAll = false;
            } else {
                _this.multipleSelection = [];
                this.listdata.forEach(function (val, idx, ary) {
                    val.checkid = val.resource_id;
                    _this.multipleSelection.push(val.resource_id);
                });
                this.ischeckAll = true;
            }
        },
        //单个选择事件
        checkChange: function (row, event) {
            var _this = this;
            if (event.target.checked) {
                row.checkid = row.resource_id;
                this.multipleSelection.push(row.resource_id);
                if (this.multipleSelection.length === this.listdata.length) {
                    this.ischeckAll = true;
                }
            } else {
                row.checkid = '';
                this.multipleSelection.forEach(function (val, index) {
                    if (row.resource_id === val) {
                        _this.multipleSelection.splice(index, 1);
                    }
                });
                this.ischeckAll = false;
            }
        },
        handleClick: function (tab, event) {
            console.log(tab, event);
        },
        search: function () {
            this.getlist();
        },
        handleSizeChange: function (val) {
            this.pageSize = val;
            this.getlist();
        },
        handleCurrentChange: function (val) {
            this.currentPage = val;
            this.getlist();
        },
        delAll: function () {//批量删除事件
            var _this = this;
            if (this.multipleSelection.length === 0) {
                this.$message({
                    message: '请选择你要删除选项',
                    type: 'warning',
                    customClass: 'messagefixed'
                });
            } else {
                'use strict';
                this.$confirm('确认删除这些资源吗，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    $.ajax({
                        type: 'delete',
                        url: router + '/' + _this.multipleSelection,
                        dataType: 'json',
                        scriptCharset: 'utf-8',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function (res) {
                            if (res.code === '000003') {
                                _this.$message({
                                    type: 'success',
                                    customClass: 'messagefixed',
                                    message: '删除成功!'
                                });
                                _this.getlist();
                                _this.multipleSelection = [];
                            } else {
                                _this.$message({
                                    type: 'error',
                                    customClass: 'messagefixed',
                                    message: res.msg
                                });
                            }
                        },
                        error: function (res) {
                            _this.$message({
                                type: 'error',
                                customClass: 'messagefixed',
                                message: res.msg
                            });
                        }
                    });

                })
            }
        },
        del: function (resource_id) {//单个删除事件
            console.log(resource_id)
            var _this = this;
            this.$confirm('确认删除该资源吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                $.ajax({
                    type: 'delete',
                    url: router + '/' + resource_id,
                    dataType: 'json',
                    scriptCharset: 'utf-8',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (res) {
                        if (res.code === '000003') {
                            _this.$message({
                                type: 'success',
                                customClass: 'messagefixed',
                                message: res.msg
                            });
                            _this.getlist();
                            _this.is_visible = false;
                        } else {
                            _this.$message({
                                type: 'error',
                                customClass: 'messagefixed',
                                message: res.msg
                            });
                        }
                    },
                    error: function (res) {
                        _this.$message({
                            type: 'error',
                            customClass: 'messagefixed',
                            message: res.msg
                        });
                    }
                });

            }).catch(function () {
                _this.$message({
                    type: 'info',
                    customClass: 'messagefixed',
                    message: '已取消删除'
                });
            });
        },
        //下载
        dowload: function (id) {
            var url = '/ExportResource?sid=' + id;
            var iframe = document.createElement("iframe");
            iframe.src = url;
            iframe.style.display = "none";
            document.body.appendChild(iframe);
        },
        preview: function (item) {
            this.modaldata = item;
            this.is_visible = true;
        },
        check: function (row) {
            var _this = this;
            $.ajax({
                type: 'put',
                url: router + '/' + row.resource_id,
                data: {type: '0', reason: ''},
                dataType: 'json',
                scriptCharset: 'utf-8',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (res) {
                    if (res.code === '000002') {
                        _this.$message({
                            type: 'success',
                            customClass: 'messagefixed',
                            message: res.msg
                        });
                        _this.is_visible = false;
                        _this.getlist();
                    }
                },
                error: function (err) {

                }
            })
        },
        reject: function (id) {
            this.rejectinfo.id = id;
            this.dialogReject = true;
        },
        //确认驳回
        rejectSubmit: function () {
            var _this = this;
            $.ajax({
                type: 'put',
                url: router + '/' + this.rejectinfo.id,
                data: this.rejectinfo,
                dataType: 'json',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (res) {
                    if (res.code === '000002') {
                        _this.$message({
                            type: 'success',
                            customClass: 'messagefixed',
                            message: res.msg
                        });
                        _this.is_visible = false;
                        _this.dialogReject = false
                        _this.rejectinfo.reason = '';
                        _this.getlist();
                    } else {
                        _this.$message({
                            type: 'error',
                            customClass: 'messagefixed',
                            message: res.msg
                        });
                    }
                },
                error: function (err) {
                    _this.$message({
                        type: 'error',
                        customClass: 'messagefixed',
                        message: '操作失败'
                    });
                }
            })
        },
        //关闭预览模态框事件
        closeModal: function () {
            if (this.classify === "2") {
                var video = document.querySelector('#myvideo');
                this.is_visible = false;
                video.pause();
            } else if (this.classify === "1") {
                var audio = document.querySelector("#myaudio");
                this.is_visible = false;
                audio.pause();
            }
        },
        insertdata: function (obj) { //确定添加事件
            var _this = this;
            console.log(this.classify);
            if (this.classify === '0') {
                if ($(".audioRes").length != imglocation_num) {
                    this.$confirm('你有图片未上传，是否确认添加?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: 'zindex'
                    }).then(function () {
                        is_addition()
                    }).catch(function () {
                        return false;
                    });
                }else{
                    is_addition()
                }
            } else if (this.classify === '1') {
                if ($(".audioRes").length != audio_num) {
                    this.$confirm('你有音频未上传，是否确认添加?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: 'zindex'
                    }).then(function () {
                        is_addition()
                    }).catch(function () {
                        return false;
                    });
                }else{
                    is_addition()
                }
            } else {
                if ($(".audioRes").length != audio_num) {
                    this.$confirm('你有视频未上传，是否确认添加?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: 'zindex'
                    }).then(function () {
                        is_addition()
                    }).catch(function () {
                        return false;
                    });
                }else{
                    is_addition()
                }
            }

        },
        removefile: function () {
            console.log(this.classify)
            if (this.classify === '0') {
                $("#imgfile .fileinput-remove").click();
            } else if (this.classify === '1') {
                $("#audiofile .fileinput-remove").click();
            } else {
                $("#videofile .fileinput-remove").click();
            }
        }
    },
    watch: {
        classify: function (val) {
            this.currentPage = 1;
            this.getlist();
            if (val === '0') {
                $("#audiofile .fileinput-remove").click();
                $("#videofile .fileinput-remove").click();
                audio_num = 0;
                video_num = 0;
            } else if (val === '1') {
                $("#imgfile .fileinput-remove").click();
                $("#videofile .fileinput-remove").click();
                imglocation_num = 0;
                video_num = 0;
            } else {
                $("#audiofile .fileinput-remove").click();
                $("#imgfile .fileinput-remove").click();
                audio_num = 0;
                imglocation_num = 0;
            }

        }
    }
});
//图片上传初始化
var imglocation_num = 0;
//文件删除时修改文件选择的文件数
$("#imgfile").on("click", ".kv-file-remove", function () {
    imglocation_num--;
    console.log(imglocation_num);
});
$("#image-file-id").fileinput({
    language: 'zh', //设置语言
    uploadUrl: '/FileUpload',
    allowedFileExtensions: ['png', 'jpg', 'jpeg'],//接收的文件后缀glyphicon glyphicon-trash text-danger['mp3','wav','wma','wmv','ogg','ape','acc']
    browseIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
    removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>&nbsp;',
    showUpload: true, //是否显示上传按钮
    showCaption: false,//是否显示标题
    showRemove: true,
    showPreview: true,
    browseClass: "btn btn-default", //按钮样式
    dropZoneEnabled: false,//是否显示拖拽区域rue
    maxFileSize: 3072,//单位为kb，如果为0表示不限制文件大小
    maxFileCount: 10, //表示允许同时上传的最大文件个数*/
    enctype: 'multipart/form-data',
    validateInitialCount: true,
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
}).on('fileuploaded', function (event, numFiles, label) {
    $("#startupload").attr("disabled", false);
}).on('fileselect', function (event, files) {
    imglocation_num = imglocation_num + 1;
});
//音频上传控件初始化
var audio_num = 0;
//文件删除时修改文件选择的文件数
$("#audiofile").on("click", ".kv-file-remove", function () {
    audio_num--;
});
$("#audio-file-id").fileinput({
    language: 'zh', //设置语言
    uploadUrl: '/FileUpload',
    allowedFileExtensions: ['mp3'],//接收的文件后缀glyphicon glyphicon-trash text-danger['mp3','wav','wma','wmv','ogg','ape','acc']
    browseIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
    removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>&nbsp;',
    showUpload: true, //是否显示上传按钮
    showCaption: false,//是否显示标题
    showRemove: true,
    browseClass: "btn btn-default", //按钮样式
    dropZoneEnabled: false,//是否显示拖拽区域rue
    maxFileSize: 10240,//单位为kb，如果为0表示不限制文件大小
    maxFileCount: 10, //表示允许同时上传的最大文件个数*/
    enctype: 'multipart/form-data',
    validateInitialCount: true,
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
}).on('fileuploaded', function (event, numFiles, label) {
    $("#startupload").attr("disabled", false)
}).on('fileselect', function (event, files) {
    audio_num = audio_num + 1;
});
//视频上传控件初始化
var video_num = 0;
//文件删除时修改文件选择的文件数
$("#videofile").on("click", ".kv-file-remove", function () {
    video_num--;
});
$("#video-file-id").fileinput({
    language: 'zh', //设置语言
    uploadUrl: '/FileUpload',
    allowedFileExtensions: ['mp4'],//接收的文件后缀glyphicon glyphicon-trash text-danger['mp3','wav','wma','wmv','ogg','ape','acc']
    browseIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
    removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>&nbsp;',
    showUpload: true, //是否显示上传按钮
    showCaption: false,//是否显示标题
    showRemove: true,
    browseClass: "btn btn-default", //按钮样式
    dropZoneEnabled: false,//是否显示拖拽区域rue
    maxFileSize: 1048576,//单位为kb，如果为0表示不限制文件大小
    maxFileCount: 10, //表示允许同时上传的最大文件个数*/
    enctype: 'multipart/form-data',
    validateInitialCount: true,
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
}).on('fileuploaded', function (event, numFiles, label) {
    $("#startupload").attr("disabled", false)
}).on('fileselect', function (event, files) {
    video_num = video_num + 1;
});
// //确定添加
// function insertdata(obj) {
//     var audioAarry = [];
//     console.log(app.classify);
//     if(app.classify==='0'){
//         if($(".audioRes").length===imglocation_num){
//             return true
//         }else{
//
//             return false;
//         }
//     }
//     $(".audioRes").each(function (index) {//获取资源id
//         audioAarry[index] = $(this).val();
//     });
//     $(obj).attr("disabled", true);//设置按钮禁用状态
//     $(".fileinput-remove-button").click();//移除以上传的显示
//     $("#file").modal('hide');//隐藏模态框
//     app.setFiledata(audioAarry);//调用vue对象中的方法
//     app.getlist();//调用vue对象中的方法，并重新请求数据；
// }
function is_addition() {
    var audioAarry = [];
    $(".audioRes").each(function (index) {//获取资源id
        audioAarry[index] = $(this).val();
    });
    $("#startupload").attr("disabled", true);//设置按钮禁用状态
    $(".fileinput-remove-button").click();//移除以上传的显示
    $("#file").modal('hide');//隐藏模态框
    app.setFiledata(audioAarry);//调用vue对象中的方法
    app.getlist();//调用vue对象中的方法，并重新请求数据；
}
