<!DOCTYPE html>
<!--[if IE 8]>
<html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" xmlns="http://www.w3.org/1999/html">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>
    <meta charset="utf-8"/>
    <title>资源库管理</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="Preview page of Metronic Admin Theme #1 for statistics, charts, recent events and reports"
          name="description"/>
    <meta content="" name="author"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/>
    <link href="../assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="../assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet"
          type="text/css"/>
    <link href="../assets/global/css/components.min.css" rel="stylesheet" id="style_components" type="text/css"/>
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME GLOBAL STYLES -->
    <!-- BEGIN THEME LAYOUT STYLES -->
    <link href="../assets/layouts/layout/css/layout.min.css" rel="stylesheet" type="text/css"/>
    <link href="../assets/layouts/layout/css/themes/darkblue.min.css" rel="stylesheet" type="text/css"
          id="style_color"/>
    <link href="{{URL::asset('admin/css/layout.css')}}" rel="stylesheet" type="text/css"/>
    <link href="{{URL::asset('admin/css/content.css')}}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{URL::asset('admin/css/main.css')}}"/>
    <link rel="stylesheet" href="{{URL::asset('admin/css/fileupload.css')}}"/>
    <link rel="stylesheet" href="{{URL::asset('admin/css/repository.css')}}"/>
    <link rel="stylesheet" href="{{URL::asset('admin/js/plugin/bootstrap-fileinput/css/fileinput.min.css')}}"/>
    <link href="{{URL::asset('admin/js/plugin/element/index.css')}}" rel="stylesheet" type="text/css"/>
    <!-- END THEME LAYOUT STYLES -->
    <link rel="shortcut icon" href="favicon.ico"/>
    <style>

        .right-headimg-box .file-preview-frame {
            margin: 0;
            /* height: auto !important; */
            max-height: 150px !important;
            border: none;
            padding: 6px;
            float: left;
            text-align: center;
            vertical-align: middle;
        }

        .right-headimg-box .kv-file-content > img {
            width: 150px !important;
            height: auto !important;
            max-height: 150px !important;
        }

        .kv-file-content, .file-preview-frame {
            width: 180px !important;
        }

        .kv-file-content audio, .kv-file-content video {
            width: 100% !important;
        }

        .file-preview-image {
            width: 180px !important;
            height: 100px !important;
        }

        .file-thumb-progress {
            position: initial !important;
            left: 0;
            right: 0;
        }

        .file-drop-disabled {
            max-height: 620px;
            overflow: auto;
        }

        .file-drop-disabled::-webkit-scrollbar {
            width: 4px
        }

        .file-drop-disabled::-webkit-scrollbar-thumb {
            background-color: #808080;
            -webkit-border-radius: 2em;
            -moz-border-radius: 2em;
            border-radius: 2em
        }

        .file-drop-disabled::-webkit-scrollbar-track {
            background-color: #fff;
            -webkit-border-radius: 2em;
            -moz-border-radius: 2em;
            border-radius: 2em
        }

        .table-list {
            word-break: break-all;
        }

        .kv-file-zoom {
            display: none;
        }

        .zindex {
            z-index: 6666;
        }

        .modal-backdrop {
            z-index: auto !important;
        }

        .page-header.navbar.navbar-fixed-top, .page-header.navbar.navbar-static-top {
            z-index: 1500!important;
        }

        .operation-search .el-input-group__append {
            border-color: #39d1de !important;
        }

        .operation-search .el-input-group__append .el-button--primary {
            color: #fff;
            background-color: #39d1de;
            border-color: #39d1de;
            border-radius: 0px;
        }
    </style>
</head>
<!-- END HEAD -->

<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
<div class="page-wrapper">
    <!-- BEGIN HEADER -->
    <div class="page-header navbar navbar-fixed-top">
        @include('admin.layout.header')
    </div>
    <div class="clearfix"></div>
    <div class="page-container">
        <div class="page-sidebar-wrapper">
            @include('admin.layout.menu')
        </div>
        <div class="page-content-wrapper">
            <div class="page-content">
                <div class="page-bar">
                    <ul class="page-breadcrumb">
                        <li>
                            <a href="index">首页</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="">资源库管理</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                    </ul>
                </div>
                <div class="clearfix"></div>
                <div id="app" v-cloak="">
                    <div class="tabs">
                        <template>
                            <el-radio-group v-clock v-model="classify">
                                <el-radio-button label="pic">图片</el-radio-button>
                                <el-radio-button label="audio">音频</el-radio-button>
                                <el-radio-button label="video">视频</el-radio-button>
                                <el-radio-button label="file">文件</el-radio-button>
                            </el-radio-group>
                        </template>
                    </div>
                    <div class="operation-search">
                        <div class="operation" v-cloak="">
                            <el-button v-if="btnList.add" onclick="$('#file').modal('show')">添加</el-button>
                            <el-button v-if="btnList.del" :plain="true" type="danger" @click="delAll">批量删除</el-button>
                            <el-button v-if="btnList.edit" :plain="true" type="info" style="position: relative"
                                       @click="handleCheck">@{{ ischeckAll?'取消全选':'全选' }}
                                {{--<input type="checkbox" @change="handleCheck"  style="width: 100%;height: 100%;position: absolute;left: 5px;top: 0;opacity: 0">--}}
                            </el-button>
                        </div>
                        <div class="search-condition">
                            <el-select v-model="type" placeholder="请选择" @change="selectChange">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-date-picker
                                    v-model="time"
                                    type="daterange"
                                    @change="dateChange"
                                    placeholder="选择日期范围">
                            </el-date-picker>
                            <div class="search-input" @keyup.enter="search()">
                                <el-input v-model="searchText" placeholder="请输入搜索内容" size="20">
                                    <el-button :loading="false" type="primary" slot="append" icon="search"
                                               @click="search()">查询
                                    </el-button>
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="pageContet">
                        <div class="Image" v-if="classify==='pic'">
                            <div class="cnt">
                                <div class="cnt-list clearfix">
                                    <div class="col-lg-2 col-md-3 the-card" v-for="(item,index) in listdata"
                                         :key="index" v-cloak="" v-if="listdata.length!=0">
                                        <figure class="fig-box">
                                            <img :src="Imglogo(item.list_id)" @click="preview(item)"
                                                 class="imgImgTag" alt="">
                                            <figcaption class="fig-label">
                                                <div class="check-label">
                                                    <template v-if="item.delete=='1'">
                                                        <input type="checkbox"
                                                               @change="checkChange(item,$event)"
                                                               :value="item.resource_id" v-model="item.checkid"
                                                               class="listcheck">
                                                    </template>
                                                </div>
                                                <div class="caption-h">
                                                    <template v-if="item.delete=='1'">
                                                        <a href="javascript:void (0)"
                                                           @click="del(item.resource_id)">
                                                            <i class="glyphicon glyphicon-trash text-danger"></i>
                                                        </a>
                                                    </template>
                                                    <a href="javascript:void (0)" @click="dowload(item.resource_id)">
                                                        <i class="glyphicon glyphicon-download-alt"></i>
                                                    </a>
                                                </div>
                                                <div class="captio-status" v-show="item.status!=''&&item.review_result!=''">
                                                    <template v-if="type=='0'">
                                                        <span v-if="item.power=='1'">待审核</span>
                                                        <template v-if="item.power!='1'">
                                                            <span v-if="item.status==='1'">审核中</span>
                                                            <span v-else-if="item.review_result=='1'">驳回</span>
                                                        </template>
                                                    </template>
                                                    <template v-else>
                                                        <span v-if="type=='2'">审核中</span>
                                                        <span v-if="type=='3'">驳回</span>
                                                        <span v-if="type=='4'">待审核</span>
                                                    </template>
                                                </div>
                                            </figcaption>
                                        </figure>
                                        <p :title="item.origin"><label class="text-right">图片名：</label>@{{ item.origin }}
                                        </p>
                                        <p><label class="text-right">尺寸：</label>@{{ item.widthHeight }}</p>
                                        <p><label class="text-right">大小：</label>@{{ fileSize(item.size) }}</p>
                                        <p><label class="text-right">格式：</label>@{{ item.extension }}</p>
                                        <p><label class="text-right">上传者：</label :title="item.name">@{{ item.name }}</p>
                                        <p :title="item.created_at"><label class="text-right" >上传时间：</label>@{{ item.created_at }}</p>
                                    </div>
                                    <div class="nullbox" v-if="listdata.length===0">
                                        <p>暂无数据</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="Audio" v-if="classify==='audio'">
                            <div class="cnt">
                                <div class="cnt-list clearfix">
                                    <div class="col-lg-2 col-md-3 the-card" v-for="(item,index) in listdata" v-cloak=""
                                         v-if="listdata.length!=0">
                                        <figure class="fig-box audioTag">
                                            <img src="{{URL::asset('/admin/img/logo/music.png')}}" @click="preview(item)" alt="">
                                            <figcaption class="fig-label">
                                                <div class="check-label">
                                                    <template v-if="item.delete=='1'">
                                                        <input type="checkbox"
                                                               @change="checkChange(item,$event)"
                                                               :value="item.resource_id" v-model="item.checkid"
                                                               class="listcheck">
                                                    </template>
                                                </div>
                                                <div class="duration">
                                                    <span>@{{ item.duration }}</span>
                                                </div>
                                                <div class="caption-h">
                                                    <template v-if="item.delete=='1'">
                                                        <a href="javascript:void (0)"
                                                           @click="del(item.resource_id)">
                                                            <i class="glyphicon glyphicon-trash text-danger"></i>
                                                        </a>
                                                    </template>
                                                    <a href="javascript:void (0)" @click="dowload(item.resource_id)">
                                                        <i class="glyphicon glyphicon-download-alt"></i>
                                                    </a>
                                                </div>
                                                <div class="captio-status" v-show="item.status!=''&&item.review_result!=''">
                                                    <template v-if="type=='0'">
                                                        <span v-if="item.power=='1'">待审核</span>
                                                        <template v-if="item.power!='1'">
                                                            <span v-if="item.status==='1'">审核中</span>
                                                            <span v-else-if="item.review_result=='1'">驳回</span>
                                                        </template>
                                                    </template>
                                                    <template v-else>
                                                        <span v-if="type=='2'">审核中</span>
                                                        <span v-if="type=='3'">驳回</span>
                                                        <span v-if="type=='4'">待审核</span>
                                                    </template>
                                                </div>
                                            </figcaption>
                                        </figure>
                                        <p :title="item.origin"><label class="text-right">音频名：</label>@{{ item.origin }}
                                        </p>
                                        <p><label class="text-right">码率：</label>@{{ item.bitrate }}bit/s</p>
                                        <p><label class="text-right">大小：</label>@{{fileSize(item.size)}}</p>
                                        <p><label class="text-right">格式：</label>@{{ item.extension }}</p>
                                        <p><label class="text-right">上传者：</label :title="item.name">@{{ item.name }}</p>
                                        <p :title="item.created_at"><label class="text-right">上传时间：</label>@{{ item.created_at }}</p>
                                    </div>
                                    <div class="nullbox" v-if="listdata.length===0">
                                        <p>暂无数据</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="Video" v-if="classify==='video'">
                            <div class="cnt">
                                <div class="cnt-list clearfix">
                                    <div class="col-lg-2 col-md-3 the-card" v-for="(item,index) in listdata" v-cloak=""
                                         v-if="listdata.length!=0">
                                        <figure class="fig-box audioTag">
                                            <img :src="getVideologo(item.logo)" style="width: 100%;height: 100%" alt="">
                                            <figcaption class="fig-label">
                                                <div class="check-label">
                                                    <template v-if="item.delete=='1'">
                                                        <input type="checkbox"
                                                               @change="checkChange(item,$event)"
                                                               :value="item.resource_id" v-model="item.checkid"
                                                               class="listcheck">
                                                    </template>
                                                </div>
                                                <div class="duration">
                                                    <span>@{{ item.duration }}</span>
                                                </div>
                                                <div class="caption-h">
                                                    <template v-if="item.delete=='1'">
                                                        <a href="javascript:void (0)"
                                                           @click="del(item.resource_id)">
                                                            <i class="glyphicon glyphicon-trash text-danger"></i>
                                                        </a>
                                                    </template>

                                                    <a href="javascript:;">
                                                        <i class="glyphicon glyphicon-download-alt"
                                                           @click="dowload(item.resource_id)"> </i>
                                                    </a>
                                                </div>
                                                <div class="centerplay">
                                                    <img src="{{URL::asset('/admin/img/logo/video.png')}}" alt="" @click="preview(item)">
                                                </div>
                                                <div class="captio-status" v-show="item.status!=''&&item.review_result!=''">
                                                    <template v-if="type=='0'">
                                                        <span v-if="item.power=='1'">待审核</span>
                                                        <template v-if="item.power!='1'">
                                                            <span v-if="item.status==='1'">审核中</span>
                                                            <span v-else-if="item.review_result=='1'">驳回</span>
                                                        </template>
                                                    </template>
                                                    <template v-else>
                                                        <span v-if="type=='2'">审核中</span>
                                                        <span v-if="type=='3'">驳回</span>
                                                        <span v-if="type=='4'">待审核</span>
                                                    </template>
                                                </div>
                                            </figcaption>
                                        </figure>
                                        <p :title="item.origin"><label class="text-right">视频名：</label>@{{ item.origin }}
                                        </p>
                                        <p><label class="text-right">码率：</label>@{{ item.bitrate }}kbps</p>
                                        <p><label class="text-right">大小：</label>@{{fileSize(item.size)}}</p>
                                        <p><label class="text-right">格式：</label>@{{ item.extension }}</p>
                                        <p><label class="text-right">上传者：</label :title="item.name">@{{ item.name }}</p>
                                        <p :title="item.created_at"><label class="text-right">上传时间：</label>@{{ item.created_at }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nullbox" v-if="listdata.length===0">
                                <p>暂无数据</p>
                            </div>
                        </div>
                        <div class="File" v-if="classify==='file'">
                            <div class="cnt">
                                <div class="cnt-list clearfix">
                                    <div class="col-lg-2 col-md-3 the-card" v-for="(item,index) in listdata" v-cloak=""
                                         v-if="listdata.length!=0">
                                        <figure class="fig-box audioTag">
                                            <img :src="getVideologo(item.logo)" style="width: 100%;height: 100%" alt="">
                                            <figcaption class="fig-label">
                                                <div class="check-label">
                                                    <template v-if="item.delete=='1'">
                                                        <input type="checkbox"
                                                               @change="checkChange(item,$event)"
                                                               :value="item.resource_id" v-model="item.checkid"
                                                               class="listcheck">
                                                    </template>
                                                </div>
                                                <div class="caption-h">
                                                    <template v-if="item.delete=='1'">
                                                        <a href="javascript:void (0)"
                                                           @click="del(item.list_id)">
                                                            <i class="glyphicon glyphicon-trash text-danger"></i>
                                                        </a>
                                                    </template>

                                                    <a href="javascript:;">
                                                        <i class="glyphicon glyphicon-download-alt"
                                                           @click="dowload(item.list_id)"> </i>
                                                    </a>
                                                </div>
                                                <div class="centerplay">
                                                    <img src="{{URL::asset('/admin/img/logo/file.png')}}" alt="" @click="preview(item)">
                                                </div>
                                                <div class="captio-status">
                                                    <template v-if="type=='0'">
                                                        <span v-if="item.power=='1'">待审核</span>
                                                        <template v-if="item.power!='1'">
                                                            <span v-if="item.status==='1'">审核中</span>
                                                            <span v-else-if="item.review_result=='1'">驳回</span>
                                                        </template>
                                                    </template>
                                                    <template v-else>
                                                        <span v-if="type=='2'">审核中</span>
                                                        <span v-if="type=='3'">驳回</span>
                                                        <span v-if="type=='4'">待审核</span>
                                                    </template>
                                                </div>
                                            </figcaption>
                                        </figure>
                                        <p :title="item.origin"><label class="text-right">视频名：</label>@{{ item.origin }}
                                        </p>
                                        <p><label class="text-right">码率：</label>@{{ item.bitrate }}kbps</p>
                                        <p><label class="text-right">大小：</label>@{{fileSize(item.size)}}</p>
                                        <p><label class="text-right">格式：</label>@{{ item.extension }}</p>
                                        <p><label class="text-right">上传者：</label :title="item.name">@{{ item.name }}</p>
                                        <p :title="item.created_at"><label class="text-right">上传时间：</label>@{{ item.created_at }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="nullbox" v-if="listdata.length===0">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="block tabs">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[12, 24, 48, 60]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                    <!-- modal 驳回 :before-close="handleClose"-->
                    <div class="el-dailog-wrapper">
                        <el-dialog
                                title="驳回理由"
                                :visible.sync="dialogReject"
                                size="tiny">
                            <div class="rejeck-box">
                                <el-input v-model="rejectinfo.reason"
                                          type="textarea"
                                          :rows="6"
                                          placeholder="请输入驳回理由">
                                </el-input>
                            </div>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogReject = false">取 消</el-button>
                            <el-button type="primary" @click="rejectSubmit">确 定</el-button>
                        </span>
                        </el-dialog>
                    </div>
                    <el-dialog
                            title="确认添加"
                            :visible.sync="isddd"
                            size="tiny" custom-class="zindex">
                        <div class="rejeck-box">
                            <span v-if="classify==='1'">你还有图片未上传，是否确认添加？</span>
                            <span v-else-if="classify==='2'">你还有音频未上传，是否确认添加？</span>
                            <span v-else>你还有视频未上传，是否确认添加？</span>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="isddd = false">取 消</el-button>
                            <el-button type="primary" @click="is_addition">确 定</el-button>
                        </span>
                    </el-dialog>
                    {{--预览--}}
                    <div class="sheet" v-show="is_visible" v-cloak="">
                        <div class="box">
                            <div class="box-content">
                                <div class="modal-cnt" v-if="classify==='pic'">
                                    <div class="previewbox">
                                        <figure class="fig-box">
                                            <img :src="Imglogo(modaldata.list_id)" alt="">
                                        </figure>
                                    </div>
                                    <div class="previewCnt">
                                        <div class="cnt-h">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">图片名：</td>
                                                    <td class="text-left table-list">@{{ modaldata.origin }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">尺寸：</td>
                                                    <td class="text-left table-list">@{{ modaldata.widthHeight }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">大小：</td>
                                                    <td class="text-left table-list">@{{ fileSize(modaldata.size) }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">格式：</td>
                                                    <td class="text-left table-list">@{{ modaldata.extension }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">上传者：</td>
                                                    <td class="text-left table-list">@{{ modaldata.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right" style="white-space: nowrap">上传时间：</td>
                                                    <td class="text-left table-list">@{{ modaldata.created_at }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">当前状态：</td>
                                                    <td class="text-left" style="color: red">
                                                        <template v-if="type=='0'">
                                                            <template v-if="modaldata.power=='1'">待审核</template>
                                                            <template v-else="">
                                                                <span v-if="modaldata.review_result==='1'">驳回</span>
                                                                <span v-else-if="modaldata.status==''&&modaldata.review_result==''">通过</span>
                                                                <span v-if="modaldata.status=='1'">审核中</span>
                                                            </template>
                                                        </template>
                                                        <template v-else>
                                                            <span v-if="type=='2'">审核中</span>
                                                            <span v-if="type=='3'">驳回</span>
                                                            <span v-if="type=='4'">待审核</span>
                                                            <span v-if="type=='1'">通过</span>
                                                        </template>
                                                    </td>
                                                </tr>
                                                <tr v-if="modaldata.review_result==='1'">
                                                    <td class="text-right">驳回理由：</td>
                                                    <td class="text-left" style="color: red">
                                                        <span v-text="modaldata.reason"></span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="cnt-f">
                                            <el-button :plain="true"
                                                       v-show="modaldata.delete=='1'"
                                                       type="danger"
                                                       @click="del(modaldata.list_id)">删除
                                            </el-button>
                                            <template v-if="modaldata.power=='1'">
                                                <el-button  @click="check(modaldata)">
                                                    审核通过
                                                </el-button>
                                                <el-button  @click="reject(modaldata.list_id)">
                                                    驳回
                                                </el-button>
                                            </template>
                                            <el-button @click="is_visible=false">关闭</el-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-cnt" v-if="classify==='audio'">
                                    <div class="previewbox">
                                        <video :src="getRes(modaldata.list_id)" id="myaudio" controls width="600"
                                               height="450"
                                               poster="{{URL::asset('/admin/img/logo/music.png')}}"></video>
                                    </div>
                                    <div class="previewCnt">
                                        <div class="cnt-h">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td class="text-right">音频名：</td>
                                                    <td class="text-left table-list">@{{ modaldata.origin }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">码率：</td>
                                                    <td class="text-left table-list">@{{ modaldata.widthHeight }}bit/s
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">大小：</td>
                                                    <td class="text-left table-list">@{{ fileSize(modaldata.size) }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">格式：</td>
                                                    <td class="text-left table-list">@{{ modaldata.extension }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">上传者：</td>
                                                    <td class="text-left table-list">@{{ modaldata.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right" style="white-space: nowrap">上传时间：</td>
                                                    <td class="text-left table-list">@{{ modaldata.created_at }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">当前状态：</td>
                                                    <td class="text-left" style="color: red">
                                                        <template v-if="type=='0'">
                                                            <template v-if="modaldata.power=='1'">待审核</template>
                                                            <template v-else="">
                                                                <span v-if="modaldata.review_result==='1'">驳回</span>
                                                                <span v-else-if="modaldata.status==''&&modaldata.review_result==''">通过</span>
                                                                <span v-if="modaldata.status=='1'">审核中</span>
                                                            </template>
                                                        </template>
                                                        <template v-else>
                                                            <span v-if="type=='2'">审核中</span>
                                                            <span v-if="type=='3'">驳回</span>
                                                            <span v-if="type=='4'">待审核</span>
                                                            <span v-if="type=='1'">通过</span>
                                                        </template>
                                                    </td>
                                                </tr>
                                                <tr v-if="modaldata.review_result==='1'">
                                                    <td class="text-right">驳回理由：</td>
                                                    <td class="text-left" style="color: red">
                                                        <span v-text="modaldata.reason"></span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="cnt-f">
                                            <el-button :plain="true"
                                                       v-show="modaldata.delete=='1'"
                                                       type="danger"
                                                       @click="del(modaldata.list_id)">删除
                                            </el-button>
                                            <template v-if="modaldata.power=='1'">
                                                <el-button  @click="check(modaldata)">
                                                    审核通过
                                                </el-button>
                                                <el-button  @click="reject(modaldata.list_id)">
                                                    驳回
                                                </el-button>
                                            </template>
                                            <el-button @click="closeModal">关闭</el-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-cnt" v-if="classify==='video'">
                                    <div class="previewbox" style="background: #000">
                                        <video :src="getRes(modaldata.list_id)" id="myvideo" controls width="600"
                                               height="450"
                                               poster="{{URL::asset('/admin/img/logo/video.png')}}"></video>
                                    </div>
                                    <div class="previewCnt">
                                        <div class="cnt-h">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td class="text-right" width="100">视频名称：</td>
                                                    <td class="text-left table-list">
                                                        <span>@{{ modaldata.origin }}</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">码率：</td>
                                                    <td class="text-left table-list">@{{ modaldata.bitrate }}kbps</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">大小：</td>
                                                    <td class="text-left table-list">@{{ fileSize(modaldata.size) }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">格式：</td>
                                                    <td class="text-left table-list">@{{ modaldata.extension }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">上传者：</td>
                                                    <td class="text-left table-list">@{{ modaldata.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">上传时间：</td>
                                                    <td class="text-left table-list">@{{ modaldata.created_at }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-right">当前状态：</td>
                                                    <td class="text-left" style="color: red">
                                                        <template v-if="type=='0'">
                                                            <template v-if="modaldata.power=='1'">待审核</template>
                                                            <template v-else="">
                                                                <span v-if="modaldata.review_result==='1'">驳回</span>
                                                                <span v-else-if="modaldata.status==''&&modaldata.review_result==''">通过</span>
                                                                <span v-if="modaldata.status=='1'">审核中</span>
                                                            </template>
                                                        </template>
                                                        <template v-else>
                                                            <span v-if="type=='2'">审核中</span>
                                                            <span v-if="type=='3'">驳回</span>
                                                            <span v-if="type=='4'">待审核</span>
                                                            <span v-if="type=='1'">通过</span>
                                                        </template>
                                                    </td>
                                                </tr>
                                                <tr v-if="modaldata.review_result==='1'">
                                                    <td class="text-right">驳回理由：</td>
                                                    <td class="text-left" style="color: red">
                                                        <span v-text="modaldata.reason"></span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="cnt-f">
                                            <el-button :plain="true"
                                                       v-show="modaldata.delete=='1'"
                                                       type="danger"
                                                       @click="del(modaldata.list_id)">删除
                                            </el-button>
                                            <template v-if="modaldata.power=='1'">
                                                <el-button  @click="check(modaldata)">
                                                    审核通过
                                                </el-button>
                                                <el-button  @click="reject(modaldata.list_id)">
                                                    驳回
                                                </el-button>
                                            </template>
                                            <el-button @click="closeModal">关闭</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade bs-example-modal-lg" id="file" tabindex="-1" role="dialog"
                         aria-labelledby="myLargeModalLabel" data-backdrop="static" style="z-index: 2000">
                        <div class="modal-dialog modal-lg" role="document" style="z-index: 2000">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="removefile">
                                        &times;
                                    </button>
                                    <h4 class="modal-title">
                                        上传文件
                                    </h4>
                                </div>
                                <div class="modal-body" style="max-height: 650px;overflow: hidden">
                                    <div class="filebody">
                                        <div v-show="classify==='pic'" id="imgfile">
                                            <input type="file" id="image-file-id" class="file" name="file" multiple/>
                                        </div>
                                        <div v-show="classify==='audio'" id="audiofile">
                                            <input type="file" id="audio-file-id" class="file" name="file" multiple/>
                                        </div>
                                        <div v-show="classify==='video'" id="videfile">
                                            <input type="file" id="video-file-id" class="file" name="file" multiple/>
                                        </div>
                                        <div v-show="classify=='file'" id="Filefile">
                                            <input type="file" id="file-id" class="file" name="file" multiple>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer new-modal-footer">
                                    <button type=button class="btn btn-success pull-left" id="startupload"
                                            @click="insertdata($event)" disabled>确定添加
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END CONTENT BODY -->
        </div>
        <a href="javascript:;" class="page-quick-sidebar-toggler">
            <i class="icon-login"></i>
        </a>
    </div>
</div>
<!-- END QUICK NAV -->
<!--[if lt IE 9]>
<script src="../assets/global/plugins/respond.min.js"></script>
<script src="../assets/global/plugins/excanvas.min.js"></script>
<script src="../assets/global/plugins/ie8.fix.min.js"></script>
<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="../assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="../assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
<script src="../assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="../assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<script src="../assets/global/scripts/app.min.js" type="text/javascript"></script>
<script src="../assets/layouts/layout/scripts/layout.min.js" type="text/javascript"></script>
<script src="{{URL::asset('admin/js/plugin/bootstrap-fileinput/js/fileinput-audio.js')}}" type="text/javascript"></script>
<script src="{{URL::asset('admin/js/plugin/bootstrap-fileinput/js/zh.js')}}" type="text/javascript"></script>
<script src="{{URL::asset('admin/js/plugin/md5.js')}}" type="text/javascript"></script>
<script src="{{URL::asset('admin/js/layout.js')}}"></script>
<script src="{{URL::asset('admin/js/plugin/vue.min.js')}}"></script>
<script src="{{URL::asset('admin/js/common.js')}}"></script>
<script src="{{URL::asset('admin/js/plugin/element/index.js')}}"></script>
<script src="{{URL::asset('admin/js/plugin/pdf/pdfobject.js')}}"></script>
<script src="{{URL::asset('admin/js/controller/repositoryCtrl.js')}}"></script>
</body>
</html>
