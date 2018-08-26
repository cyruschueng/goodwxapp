/**
 * @description: 数据列表
 * @author: franco
 * @update:
 */
define('module/dataList', [
    'common/interface',
    'common/util',
    'common/errCode',
    'widget/jquery.pagination'
], function(inter, util, errCode,pagination){
    return {
        /**
         * 发送
         */
        init: function(options){
            var defaults = {
                target: null,
                pagination: null,
                loadingCls: 'loading',
                loadingText: '数据加载中 <i class="ace-icon fa fa-spinner fa-pulse"></i>',
                loadingTpl: '<li class="#{loadingCls}">#{loadingText}</li>',
                failedCls: 'failed',
                failedText: '数据加载失败',
                failedTpl: '<li class="#{failedCls}">#{failedText}</li>',
                noDataCls: 'noData',
                noDataText: '暂无数据',
                noDataTpl: '<div class="#{noDataCls}">#{noDataText}</div>',
                addtionalHtml: '',
                itemTpl: [
                    '<li></li>'
                ].join(''),
                ajaxApi: null,
                getDataCallback: null,
                finishedCallback: null,
                hasPagination: false, //标识是否已经初始化分页控件
                listData: null, //记录ajax数据
                fromPage: 1, //当前页码
                size: 10, //分页大小
                param: {},
                listName: 'data',
                ajaxType: 'POST',
                url: '' //ajax请求地址
            };
            this.opts = $.extend(defaults, {}, options);
            this.opts.pagination.empty();
            this.renderList();
        },
        /**
         * 获取数据
         */
        getData: function (call){
            var self = this;

            if(!self.opts.listData){
                if(!self.opts.target.find('.' + self.opts.loadingCls).length){
                    self.opts.target.html(util.template(self.opts.loadingTpl, {
                        loadingCls: self.opts.loadingCls,
                        loadingText: self.opts.loadingText
                    }));
                }
                self.opts.ajaxApi && self.opts.ajaxApi.abort();
                self.opts.param.fromPage = self.opts.fromPage;
                self.opts.param.size = self.opts.size;
                self.opts.ajaxApi = util.setAjax(self.opts.url, self.opts.param, function(json){
                    if(json.result != 0){
                        self.loadFailed(errCode.get(json.msg));
                    }/*else if(json.status != 0){
                        $.alert(json.msg)
                    }*/else{
                        if(self.opts.getDataCallback){
                            json = self.opts.getDataCallback(json);
                        }
                        call && call(json);
                    }
                }, function(){
                    self.loadFailed(self.opts.failedText);
                }, self.opts.ajaxType);
            }else{
                call && call(self.opts.listData);
                self.opts.listData = null;
            }
        },
        /**
         * 渲染列表
         */
        renderList: function(){
            var self = this,
                listArr = [];

            self.getData(function(data){
                var count = data.total,
                    list = data[self.opts.listName];
                if(!self.opts.hasPagination) {
                    self.opts.listData = data;
                    self.initPagination(count);
                    self.changePage(count);
                }else{
                    if(list && list.length){
                        $.each(list, function(i, n){
                            listArr.push(util.template(self.opts.itemTpl, n));
                        });
                        if(list.length%2 ==1){
                            listArr.push(self.opts.addtionalHtml); 
                        }
                    }else{
                        listArr.push(util.template(self.opts.noDataTpl, {
                            noDataCls: self.opts.noDataCls,
                            noDataText: self.opts.noDataText
                        }));
                        self.opts.target.html('');
                    }
                    self.opts.target.html(listArr.join(''));
                    self.opts.finishedCallback && self.opts.finishedCallback(self.opts.target);
                }
            })

        },
        /**
         * 加载数据失败
         */
        loadFailed: function (errMsg){
            var self = this,
                failedPanel = $(util.template(self.opts.failedTpl, {
                    failedCls: self.opts.failedCls,
                    failedText: errMsg + '，<a id="listReload" href="javascript:">点击重新加载</a>'
                }));
            self.opts.target.find('.' + self.opts.loadingCls).closest('tr').remove();
            self.opts.target.html(failedPanel);
            $('#listReload').on('click', function(e){
                e.preventDefault();
                self.renderList();
            });
        },
        /**
         * 初始化分页控件
         */
        initPagination: function (count){
            var self = this;
            self.opts.hasPagination = true;
            if(count > self.opts.size) {
                self.opts.pagination.pagination(count, {
                    prev_text: '<',
                    next_text: '>',
                    link_to: '#tabsMenu',
                    items_per_page: self.opts.size,
                    num_display_entries: 3,
                    current_page: self.opts.fromPage-1,
                    num_edge_entries: 3,
                    callback: function(page_id, jq){
                        self.opts.fromPage = page_id+1;
                        self.renderList();
                    }
                });
            }else{
                self.renderList();
            }
        },
        changePage: function(count){
            var self = this;
            if(self.opts.fromPage == 1){
                $("#pageInput").val("");
            }
            if(count > self.opts.size){
                $(".pagination-container").show();
            } else {
                $(".pagination-container").hide();
            }
            $("#changePage").click(function(){
                var pageNum = parseInt($("#pageInput").val());
                var pageSize = Math.ceil(count / self.opts.size);
                if(pageNum && pageNum > 0 && pageNum <= pageSize){
                    $("#paginationBox").find("a").removeClass("current");
                    $($("#paginationBox").find("a")[pageNum]).addClass("current");
                    if(pageNum == 1){
                        $($("#paginationBox").find("a")[0]).addClass("current");
                    }
                    if(pageNum == pageSize){
                        $($("#paginationBox").find("a")[pageSize + 1]).addClass("current");
                    }
                    self.opts.fromPage = pageNum;
                    self.renderList();
                }
            })
        }
    }
});