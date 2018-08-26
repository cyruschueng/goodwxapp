//update by zhiqinag ;移除显示相关的
(function($) {
	$.fileUploader = {version: '1.3', count: 0};
	$.fn.fileUploader = function(config){
        return this.each(function() {
            config = $.extend({}, {
                autoUpload: false,
                limit: false,
                buttonUpload: '#px-submit',
                buttonClear: '#px-clear',
                buttonClass: 'btn-default btn-xs btn-green',
                selectFileLabel: 'Select files',
                allowedExtension: 'jpg|jpeg|gif|png',
                timeInterval: [1, 2, 4, 2, 1, 5], //iframe上传模拟百分比
                percentageInterval: [10, 20, 30, 40, 60, 80],
                itr: 1, // 文件的索引或者序列

                //回调函数
                onValidationError: null,	//文件无效时触发事件
                limitErr: function () {
                },//超过限制时执行的回调
                onUpErr: function () {
                },//上传失败时执行的回调
                onFileChange: function () {
                },
                onFileRemove: function () {
                },
                beforeUpload: function () {
                }, //提交按钮点击后，文件上传前，触发事件
                beforeEachUpload: function () {
                }, //每个文件上传完成前回调 返回每个form表单
                afterUpload: function () {
                },
                afterEachUpload: function () {
                } //每个文件上传完成后回调

            }, config);

            $.fileUploader.count++;

            //form多文件上传
            var pxUploadForm = 'px-form-' + $.fileUploader.count,
                pxWidget = 'px-widget-' + $.fileUploader.count,
                pxButton = 'px-button-' + $.fileUploader.count,
                wrapper = [
                    '<div id="' + pxWidget + '" class="px-widget ui-widget fl">',
                        '<div class="clearfix">',
                            '<div id="' + pxUploadForm + '-input" class="px-form-input"></div>',
                            '<div id="' + pxButton + '" class="px-buttons"></div>',
                        '</div>',
                        '<div id="' + pxUploadForm + '"></div>',
                    '</div>'
                ].join('');
            pxUploadForm = '#' + pxUploadForm;
            pxButton = '#' + pxButton;
            pxWidget = '#' + pxWidget;

            var pxUploadFormInput = pxUploadForm + '-input',
                buttonClearId = null,
                isLimit = !!config.limit,
                limit = parseInt(config.limit),

                e = this, //e 指向 this
                selector = '#' + $(this).prop('id'),//$(this).selector
                buttonM = pxButton + ' input, ' + pxButton + ' button', //接受按钮作为inout和button
                isFile = false, //用来判断是否隐藏form中其他input
                progress = 0, //初始上传百分比
                totalForm = 0,
                jqxhr = null, //ajax返回对象
                timeInterval = config.timeInterval,
                percentageInterval = config.percentageInterval,
                pcount = 0, //进度计数的时间间隔,
                progressTime = null,
                isHtml5 = false,
                stopUpload = false; //停止所有上传

            if (window.FormData) {
                isHtml5 = true;
            }

            //将所有方法封装成插件
            var px = {

                //初始化并且格式化数据
                init: function () {
                    px.form = $(e).parents('form');
                    //前置封装标记
                    if ($(pxWidget).length < 1) {
                        px.form.before(wrapper);
                    }

                    //封装 input button
                    $(e).wrap('<div class="px-input-button" />');
                    px.form.find('.px-input-button').append(
                        '<span class="fl">' + config.selectFileLabel + '</span>'
                    );

                    //将文件input转换新的UI
                    px.form.find('.px-input-button').addClass(config.buttonClass)

                    //清除所有的form数据
                    px.clearFormData(px.form);

                    px.form.hide();
                    this.printForm();
                },

                //克隆、格式化和追加form
                printForm: function () {

                    var formId = 'pxupload_u' + $.fileUploader.count + '_f' + config.itr,
                        iframeId = formId + '_frame';

                    if ($('iframe[name="' + iframeId + '"]').length < 1) {
                        $('<iframe name="' + iframeId + '"></iframe>').attr({
                            id: iframeId,
                            src: 'about:blank',
                            style: 'display:none'
                        }).prependTo(pxUploadFormInput);
                    }

                    if ($('#' + formId).length < 1) {
                        px.form.clone().attr({
                            id: formId,
                            target: iframeId
                        }).prependTo(pxUploadFormInput).show();
                    }

                    //只显示文件input
                    px.showInputFile('#' + formId);

                    //选择文件后根据浏览器html5兼容情况触发不同的上传事件
                    $(selector).change(function () {
                        if (isHtml5) {
                            if (this.files.length && this.files[0].size > config.maxSize) {
                                config.onSizeErr();
                                return;
                            }
                            html5Change(this);
                        } else {
                            uploadChange($(this));
                        }
                    });
                },

                //只显示文件input
                showInputFile: function (form) {
                    $(pxUploadFormInput).find(form).children().each(function () {
                        isFile = $(this).is(':file');
                        if (!isFile && $(this).find(':file').length == 0) {
                            $(this).hide();
                        }
                    });
                },
                //隐藏文件input，显示其他数据
                hideInputFile: function ($form) {
                    $form.children().each(function () {
                        isFile = $(this).is(':file');
                        if (isFile || $(this).find(':file').length > 0) {
                            $(this).hide();
                        } else {
                            $(this).show();
                        }
                    });
                },

                //验证文件
                getFileName: function (file) {

                    if (file.indexOf('/') > -1) {
                        file = file.substring(file.lastIndexOf('/') + 1);
                    } else if (file.indexOf('\\') > -1) {
                        file = file.substring(file.lastIndexOf('\\') + 1);
                    }

                    return file;
                },

                validateFileName: function (filename) {
                    var extensions = new RegExp(config.allowedExtension + '$', 'i');
                    if (extensions.test(filename)) {
                        return filename;
                    } else {
                        return -1;
                    }
                },

                getFileSize: function (file) {
                    var fileSize = 0;
                    if (file.size > 1024 * 1024) {
                        fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                    } else {
                        fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
                    }
                    return fileSize;
                },

                //清除form表单数据
                clearFormData: function (form) {
                    $(form).find(':input').each(function () {
                        if (this.type == 'file') {
                            $(this).val('');
                        }
                    });
                },

                //删除文件，itr回减
                removeFile: function () {
                    if (config.itr > 1) {
                        config.itr = config.itr - 1;
                        if (isLimit) {
                            limit = limit + 1;
                        }
                        $.fileUploader.count--;
                        px.clearFormData(px.form);
                        px.form.hide();
                        $(pxWidget).find('.px-form-input').empty();
                        px.printForm();
                    }
                },

                //获取input
                getFileInput: function () {
                    return e;
                }

            };

            //初始化
            px.init();

            /**
             * Html5 change事件
             */
            function html5Change($this) {
                $.each($this.files, function (index, file) {
                    uploadChange(file);
                });

                afterUploadChange();
            }

            /**
             * Html5拖拽
             */
            $.event.props.push('dataTransfer');
            $(pxWidget).bind('dragenter dragover', false)
                .bind('drop', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    html5Change(e.dataTransfer);

                });

            /**
             * 文件上传
             */
            function uploadChange($this) {

                var $form = $(pxUploadFormInput + ' #pxupload' + config.itr);

                //验证文件
                var filename = (isHtml5) ? $this.name : px.getFileName($this.val());
                px.originName = filename;
                if (px.validateFileName(filename) == -1) {
                    if ($.isFunction(config.onValidationError)) {
                        config.onValidationError($this);
                    } else {
                        $.alert('无效文件：' + filename);
                    }
                    $form.find(':file').val('');
                    return false;
                }

                console.log(isLimit + ' --- ' + limit);
                //限制
                if (isLimit) {
                    if (limit < 1) {
                        //可以输出信息显示限额
                        config.limitErr();
                        return false;
                    }
                    limit = limit - 1;
                }

                //上传成功后删除上传文字
                $('.upload-data', pxUploadForm).each(function () {
                    if ($(this).find('form').length <= 0) {
					    //$(this).remove();
                    }
                });

                //在文件名称后附加文件的大小
                if (isHtml5) {
                    filename += ' (' + px.getFileSize($this) + ')';
                }

                //显示标记
                $(pxUploadForm).append(
                    $('<div>').attr({
                        'class': 'upload-data pending ui-widget-content ui-corner-all',
                        id: 'pxupload' + config.itr + '_text'
                    })
                        .data('formId', 'pxupload' + config.itr)
                        .append([
                                '<img class="loading" src="' + ued_conf.root + 'images/common/loading.gif">',
                            '<div class="status">等待上传</div>',
                            '<div class="progress clearfix">',
                            '<div class="percentage">0%</div>',
                            '</div>'
                        ].join(''))
                );

                //记录input
                $form.data('input', $this);

                $form.appendTo(pxUploadForm + ' #pxupload' + config.itr + '_text');

                //隐藏文件input
                px.hideInputFile($form);

                //追加form
                config.itr++;

                //输出form
                px.printForm();

                //文件inout的change回调事件
                config.onFileChange($this, $form);

                if (!isHtml5) {
                    afterUploadChange();
                }
            }

            /**
             * 在选择文件后出发自动上传
             */
            function afterUploadChange() {

                if (config.autoUpload) {

                    //上传队列和进度
                    uploadQueue();
                }
            }

            /**
             * 上传队列和遍历每个文件的上传进度
             */
            function uploadQueue() {
                totalForm = $(pxUploadForm + ' form').parent('.upload-data').get().length;
                if (totalForm > 0) {
                    var pendingUpload = $(pxUploadForm + ' form').parent('.upload-data').get(0),
                        $form = $(pendingUpload).children('form');

                    var $uploadData = $form.parent();
                    $uploadData.find('.status').text('上传中');
                    $uploadData.removeClass('pending').addClass('uploading');

                    if (isHtml5) {
                        //使用Html5 api上传
                        html5Upload($form);
                    } else {
                        //使用iframe上传
                        iframeUpload($form);
                    }
                } else {
                    config.afterUpload(pxUploadForm);
                }
            }

            /**
             * html5上传进度条
             */
            function html5Upload($form) {
                var file = $form.data('input');
                if (file) {
                    var fd = new FormData();
                    fd.append($form.find(selector).attr('name'), file);
                    //获取其他表单
                    $form.find(':input').each(function () {
                        if (this.type != 'file') {
                            fd.append($(this).attr('name'), $(this).val());
                        }
                    });

                    //显示进度条
                    var $uploadData = $form.parent();
                    $uploadData.find('.progress').show();
                    var $percentage = $uploadData.find('.percentage');

                    //ajax
                    jqxhr = $.ajax({
                        url: $form.attr('action'),
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: 'html',
                        type: 'POST',
                        xhr: function () {
                            var req = $.ajaxSettings.xhr();
                            if (req) {
                                req.upload.addEventListener('progress', function (ev) {
                                    //显示进度条百分数
                                    progress = Math.round(ev.loaded * 100 / ev.total);
                                    $percentage.text(progress.toString() + '%');
                                }, false);
                            }
                            return req;
                        }
                    })
                        .success(function (data) {
                            afterEachUpload($form.attr('id'), data);
                        })
                        .error(function (jqXHR, textStatus, errorThrown) {
                            afterEachUpload($form.attr('id'), null, textStatus, errorThrown);
                        })
                        .complete(function (jqXHR, textStatus) {
                            $percentage.text('100%');
                            uploadQueue();
                        });
                }

                $form.remove();
            }

            /**
             * iframe上传进度条
             */
            function iframeUpload($form) {

                //显示进度条
                var $uploadData = $form.parent(),
                    data = null;
                $uploadData.find('.progress').show();
                var $percentage = $uploadData.find('.percentage'),
                    pcount = 0;
                dummyProgress($percentage);

                $form.submit();

                var id = pxWidget + ' #' + $form.attr('id');
                $(id + '_frame').load(function () {

                    data = $(this).contents().find('body').html();
                    console.log('iframe ' + data);
                    afterEachUpload($form.attr('id'), removeDataHtml(data));

                    progress = 100;
                    $percentage.text(progress.toString() + '%');
                    uploadQueue();

                });
            }

            /**
             * 去除json字符串中多余的html
             */
            function removeDataHtml(data) {
                data = data || '';
                data = data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1);
                return $.parseJSON(data);
            }

            /**
             * 显示进度条
             */
            function dummyProgress($percentage) {

                if (percentageInterval[pcount]) {
                    progress = percentageInterval[pcount] + Math.floor(Math.random() * 5 + 1);
                    $percentage.text(progress.toString() + '%');
                }

                if (timeInterval[pcount]) {
                    progressTime = setTimeout(function () {
                        dummyProgress($percentage)
                    }, timeInterval[pcount] * 1000);
                }
                pcount++;
            }

            /**
             * 每个文件上传完成之后
             */
            function afterEachUpload(formId, data, status, errorThrown) {
                if ($.type(data) === 'string') {
                    data = $.parseJSON(data);
                }
                if (data) {
                    status = data.status;
                }

                formId = pxWidget + ' #' + formId;
                var $uploadData = $(formId + '_text');
                $uploadData.find('.loading').remove();

                if (status == 1) {
                    $uploadData.removeClass('uploading').addClass('success');
                    $uploadData.children('.status').html('上传成功');
                } else {

                    $uploadData.remove();

                    if (status == 0) {
                        config.onUpErr(data.error);
                        $uploadData.removeClass('uploading').addClass('error');
                        $uploadData.children('.status').html(data.error);
                        $uploadData.find()
                    } else if (status.indexOf('error') > -1) {
                        config.onUpErr(errorThrown || "上传失败");

                        $uploadData.removeClass('uploading').addClass('error');
                        //显示错误信息
                        if (errorThrown) {
                            $uploadData.children('.status').html(errorThrown + '');
                        } else {
                            $uploadData.children('.status').html('上传失败');
                        }
                    } else if (status == 'abort') {

                        $uploadData.removeClass('uploading').addClass('cancel');

                        $uploadData.children('.status').html('已取消');
                    }
                }

                $uploadData.find('.cancel').removeClass('cancel').addClass('delete').attr('title', '删除');

                //隐藏进度条
                $uploadData.find('.progress').hide();

                //触发每个文件上传完后回调事件
                config.afterEachUpload(data, status, $uploadData);

                $(formId).remove();
                $(formId + '_frame').remove();
            }

            return px;
        });
	}
})(jQuery);