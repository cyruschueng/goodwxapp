/**
 * @description: 发起项目工具类
 * @author: Franco
 * @update:
 */
define('module/launchUtil', [
    'common/interface', 
    'common/util', 
    'module/cookie'
], function(inter, util, cookie){
    var project = $('#project');
    
    return {
        /**
         * 展示发布项目步骤
         */
        stepShow: function (m){
            project.find('.p-launch-box').each(function(i, n){
                if(i == m-1){
                    $(window).scrollTop(0);
                    $(n).removeClass('none');
                    project.find('.launch-steps').prop('class', 'launch-steps steps-'+m);
                }else{
                    if(!$(n).hasClass('none')){
                        $(n).addClass('none');
                    }
                }
            });
        },
        /**
         * 上传文件
         */
        upload: function(opts){
            var defaultOpts = {
                    title: '上传图片',
                    callback: null
                },
                options = $.extend({}, defaultOpts, opts);
            var uploadApi = $.dialog({
                title: options.title,
                content: [
                    '<div class="upload-panel">',
                        '<div class="upload-tabs clearfix">',
                            '<a class="current" href="javascript:">本地上传</a>',
                            '<a href="javascript:">网络图片</a>',
                        '</div>',
                        '<div class="upload-box">',
                            '<label class="pt10 db clearfix">',
                                '<span class="btn-default btn-xs btn-white p-launch-upload fl">',
                                    '<span>选择图片</span>',
                                    '<input id="projectCover" type="file" name="file" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp">',
                                '</span>',
                                '<span class="txt-lighter fl ml10 mt5">支持JPG、JPEG、PNG、GIF格式；<br/>建议尺寸：宽度298px，高度185px；</span>',
                            '</label>',
                        '</div>',
                        '<div class="upload-box none clearfix">',
                            '<label class="pt10 db clearfix">',
                                '<input id="netPic" class="inp fl w350" type="text" name="netPic">',
                                '<input id="submitPic" class="btn-default btn-xs btn-white fl ml10" value="确 认" type="button" name="submitPic">',
                            '</label>',
                        '</div>',
                    '<div>'
                ].join(''),
                lock: true,
                padding: 20,
                initialize: function(){
                    /*绑定tabs*/
                    $('.upload-tabs a').on('click', function(e){
                        e.preventDefault();
                        var index = $('.upload-tabs a').index(this);
                        $('.upload-tabs a').removeClass('current');
                        $(this).addClass('current');
                        $('.upload-box').eq(index).removeClass('none').siblings('.upload-box').addClass('none');
                    });
                    /*绑定上传按钮*/
                    $('#projectCover').on('change', function(){
                        var loadTpl = [
                                '<div class="upload-data uploading">',
                                '<div class="progress"></div>',
                                '<div class="percentage">0%</div>',
                                '<div class="image-item"><table><tr><td><img class="db" src=""></td></tr></table></div>',
                                '</div>'
                            ].join(''),
                            $this = $(this),
                            uploadPanel = $this.closest('label').siblings('.upload-data');

                        if(!uploadPanel.length){
                            uploadPanel = $(loadTpl);
                            $this.closest('label').after(uploadPanel);
                        }
                        util.previewImage(uploadPanel, this)
                    }).fileupload({
                        url: inter.getApiUrl().uploadFileUrl+'?token='+cookie.get('_u_token'),
                        dataType: 'json',
                        headers: {Authorization: 'Bearer ' + cookie.get('_u_token')},
                        //formData: {'token': cookie.get('_u_token')},
                        limitMultiFileUploads: 1,
                        /*limitMultiFileUploadSize: 1024*1024*5,*/
                        //multipart: false,
                        done: function (e, data) {
                            var $this = $(e.target),
                                hasHttpUrl = data.result.data,
                                img = $this.closest('label').siblings('.upload-data').clone(),
                                progressPanel = $this.closest('label').siblings('.upload-data').find('.progress'),
                                percentagePanel = $this.closest('label').siblings('.upload-data').find('.percentage');
                            if(data.result.code){
                                if(data.result.code === 102 || data.result.code === 105){
                                    location.href = '/login?referer=' + encodeURIComponent(location.href);
                                }else{
                                    $.alert(errCode.get(data.result.code));
                                }
                            }else{
                                progressPanel.addClass('none');
                                percentagePanel.addClass('none');
                                if(!util.isURL(data.result.data)){
                                    hasHttpUrl = ued_conf.imgPath + data.result.data;
                                }
                                img.find('img').prop('src', hasHttpUrl);
                                options.callback && options.callback(data.result.data, img, hasHttpUrl);
                                uploadApi.close();
                            }
                        },
                        progressall: function (e, data) {
                            var progress = parseInt(data.loaded / data.total * 100, 10),
                                $this = $(e.target),
                                progressPanel = $this.closest('label').siblings('.upload-data').find('.progress'),
                                percentagePanel = $this.closest('label').siblings('.upload-data').find('.percentage');

                            progressPanel.css('height', (100 - progress) + '%');
                            percentagePanel.text(progress + '%');

                            if(progressPanel.hasClass('none')){
                                progressPanel.removeClass('none')
                            }
                            if(percentagePanel.hasClass('none')){
                                percentagePanel.removeClass('none')
                            }
                        }
                    }).prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');

                    $('#submitPic').on('click', function(e){
                        e.preventDefault();
                        var url = $('#netPic').val();
                        if(!util.isURL(url)){
                            $.alert('网络图片地址错误。');
                            return;
                        }

                        var img = [
                            '<div class="upload-data uploading">',
                                '<div class="image-item"><table><tr><td><img class="db" src="'+ url +'"></td></tr></table></div>',
                            '</div>'
                        ].join('');
                        options.callback && options.callback(url, $(img));
                        uploadApi.close();
                    })
                }
            });
        }  
    }
});