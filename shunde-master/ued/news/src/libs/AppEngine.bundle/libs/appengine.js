(function(){
    if ("undefined" == typeof com) {
        com = {};
    }
    if ("undefined" == typeof com.appengine) {
        com.appengine = {};
    }

    var isEndsWith = function(str,post) {
        if(str == null || post == null) {
            return false;
        }
        if(str.length < post.length) {
            return false;
        }
        return str.substring(str.length-post.length,str.length) == post;
    }

    var mergeObject = com.appengine.mergeObject = function() {
        var output = {};
        for(var i = 0 ; i < arguments.length; i++) {
            var arg = arguments[i];
            if(arg != null){
                if(arg instanceof Array) {
                    for(var i = 0; i < arg.length;i++) {
                        var ele = arg[i];
                        for(var key in ele) {
                            output[key] = ele[key];
                        }
                    }
                } else {
                    for(var key in arg) {
                        output[key] = arg[key];
                    }
                }
            }
        }
        return output;
    }

    com.appengine.Module = function(path) {
        this.path = path;
        this.script = null;
        this.packageObject = null;
        this.loadState = 0;// 0未加载，1加载中，2加载完成，3处理完成, 4加载失败
        this.loadRequests = [];
        this.templateScripts = [];
        this.templateDatas = [];
    }
    var Module = com.appengine.Module;
    Module.prototype.isLoaded = function() {
        return this.loadState >= 2;
    }
    Module.prototype.isProcessed = function() {
        return this.loadState == 3;
    }

    Module.currentTemplateContextPath = null;

    Module.prototype.isScript = function() {
        return isEndsWith(this.path,".js");
    }
    Module.prototype.isViewTemplate = function() {
        return Module.isViewTemplate(this.path);
    }
    Module.isViewTemplate = function(path) {
        return isEndsWith(path,".jpl") || isEndsWith(path,".xml");
    }
    Module.prototype.isXMLTemplate = function() {
        return isEndsWith(this.path,".xml");
    }
    Module.prototype.isTextTemplate = function() {
        return isEndsWith(this.path,".tpl");
    }
    Module.prototype.isJson = function() {
        return isEndsWith(this.path,".json");
    }

    var cleanPath = function(path) {
        // 去除/./
        while(true){
            var stub = path.indexOf("/./");
            if(stub < 0) {
                break;
            }
            path = path.replace(/\/\.\//g,"/");
        }


        /*
         *  ../folder ->  ../folder
         *  /../folder -> /../folder
         *  folder/../subfolder -> subfolder
         *  /folder/../subfolder -> /subfolder
         */

        // 去除../
        while(true) {
            var stub = path.indexOf("/../");
            if(stub < 0) {
                break;
            }
            var prefix = path.substring(0,stub);
            var pstub = prefix.lastIndexOf("/");
            var newprefix = "";
            if(pstub >= 0) {
                newprefix = prefix.substring(0,pstub+1);
            }
            path = newprefix + path.substring(stub+4);
        }
        return path;
    }

    Module.prototype.processScriptContent = function(callback) {
        var self = this;
        var bridge = evaluateScript(this.script,cleanPath(this.path));
        var finishCallback = function() {
            if(bridge!=null){
                self.packageObject = bridge.packageObject;
            }
            self.loadState = 3;
            callback();
        }

        if(bridge == null || bridge.ready || bridge.__bridge__flag__ == null) {
            finishCallback();
        } else {
            bridge.callback = finishCallback;
        }
    }
    Module.prototype.applyTemplateScripts = function(view) {
        for(var i = 0 ; i < this.templateScripts.length; i++) {
            var ts = this.templateScripts[i];
            ts(view);
        }
    }
    Module.prototype.processTextTemplate = function(callback) {
        var self = this;
        this.render = template.compile(this.script,{filename:this.path});
        this.packageObject = function(){
            Module.currentTemplateContextPath = self.path;
            var args = [];
            for(var i = 0 ; i < self.templateDatas.length;i++) {
                args.push(self.templateDatas[i]);
            }
            for(var i = 0 ; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            var output = self.render(mergeObject.apply(null,args));
            return output;
        };

        var includes = [];
        var searchContent = this.script;
        var reg = /(?:{{\s*include\s+)(?:'|")([\w$0-9_\/\.]+)(?:'|")/;

        while((res = searchContent.match(reg)) != null) {
            includes.push(com.appengine.view.View.resolvePath(this.path,res[1]));
            searchContent = searchContent.substring(res.index + res[0].length);
        }

        var finishCallback = function() {
            for(var i = 0 ; i < includes.length; i++) {
                if(!com.appengine.moduleManager.isModuleProcessed(includes[i])){
                    return;
                }
            }
            for(var i = 0 ; i < includes.length; i++) {
                var module = com.appengine.moduleManager[includes[i]];
                if(module.isJson()) {
                    self.templateDatas.push(module.packageObject);
                }
            }
            self.loadState = 3;
            callback();
        }

        if(includes.length == 0) {
            finishCallback();
            return;
        }

        for(var i = 0 ; i < includes.length; i++) {
            com.appengine.moduleManager.loadModule(includes[i],function(){
                finishCallback();
            });
        }
    }
    Module.prototype.processViewTemplateContent = function(callback) {
        var self = this;
        this.render = template.compile(this.script,{filename:this.path});
        this.packageObject = function(){
            Module.currentTemplateContextPath = self.path;
            var args = [];
            for(var i = 0 ; i < self.templateDatas.length;i++) {
                args.push(self.templateDatas[i]);
            }
            for(var i = 0 ; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            var data = mergeObject.apply(null,args);
            var output = self.render(data);
            if(self.isXMLTemplate()) {
                output = nativeParseXMLToJson(output);
            }
            var view = com.appengine.view.View.parse(output,{contextPath:self.path},data,self.path);
            self.applyTemplateScripts(view);
            return view;
        };

        var includes = [];
        var searchContent = this.script;
        var reg = null;
        if(this.isXMLTemplate()) {
            reg = /\<\s*include\s+(?:(?!src[=\s])[\w]+\s*=\s*\"[0-9\w\s\.\$\/\:'\#\{\}:,]*\"\s+)*src\s*=\s*\"([0-9\w\s\.\$\/\:'\{\}:,]*)\"/;
        } else {
            reg = /(?:{{\s*include\s+)(?:'|")([\w$0-9_\/\.]+)(?:'|")/;
        }
        while((res = searchContent.match(reg)) != null) {
            includes.push(com.appengine.view.View.resolvePath(this.path,res[1]));
            searchContent = searchContent.substring(res.index + res[0].length);
        }

        var finishCallback = function() {
            for(var i = 0 ; i < includes.length; i++) {
                var module = com.appengine.moduleManager[includes[i]];
                if(module.isScript() && module.packageObject instanceof Function) {
                    self.templateScripts.push(module.packageObject);
                }
                if(module.isJson()) {
                    self.templateDatas.push(module.packageObject);
                }
            }
            self.loadState = 3;
            callback();
        }

        if(includes.length == 0) {
            finishCallback();
            return;
        }

        var currentLoadIndex = 0;
        var loadNextModule = function(){
            if(currentLoadIndex < includes.length) {
                com.appengine.moduleManager.loadModule(includes[currentLoadIndex],function(){
                    currentLoadIndex++;
                    loadNextModule();
                });
                return;
            }
            finishCallback();
        }
        loadNextModule();
    }

    Module.prototype.processJsonContent = function(callback) {
        this.packageObject = JSON.parse(this.script);
        this.loadState = 3;
        callback();
    }

    Module.prototype.processModelContent = function(callback) {
        var self = this;
        var onContentProceessed = function() {
            for(var i = 0 ; i < self.loadRequests.length; i++) {
                self.loadRequests[i].callback();
            }
            self.loadRequests.length = 0;
            log("processed:"+self.path);
            callback();
        }
        com.appengine.moduleManager.contextPath = this.path;
        if(this.isScript()) {
            this.processScriptContent(onContentProceessed);
        } else if(this.isViewTemplate()) {
            this.processViewTemplateContent(onContentProceessed);
        } else if(this.isJson()) {
            this.processJsonContent(onContentProceessed);
        }
    }
    Module.prototype.load = function(callback) {
        if(this.loadState == 3) {
            callback();
            return;
        }
        if(this.loadState > 0) {
            this.loadRequests.push({
                callback : callback
            });
            return;
        }
        this.loadState = 1;
        var self = this;
        loadResource(this.path,function(script){
            if(self.isJson() || self.isViewTemplate()) {
                script = com.appengine.view.View.deleteComment(script);
            }
            self.script = script;
            self.loadState = script == null ? 4 : 2;
            log("loaded :"+self.path+" try process");
            self.processModelContent(callback);
        })
    }
    function ModuleManager() {}
    ModuleManager.prototype.loadModule = function(path,callback) {
        if(this[path] == null) {
            this[path] = new Module(path);
        }
        this[path].load(callback);
    }
    ModuleManager.prototype.isModuleProcessed = function(path) {
        if(this[path] == null) {
            return false;
        }
        return this[path].isProcessed();
    }
    ModuleManager.prototype.resolveScriptPath = function(path) {
        if(this.contextPath == null || path == null || path[0] == '/' || path.substring(0,4) == "http") {
            return path;
        }
        var lastIndexSep = this.contextPath.lastIndexOf("/");
        if(lastIndexSep >= 0) {
            return this.contextPath.substring(0,lastIndexSep+1) + path;
        } else {
            return "/" + path;
        }
    }

    com.appengine.moduleManager = new ModuleManager();


    /*
     * 定义并实现module方法，支持js模块化编程
     * @param libs
     * @param callback
     */
    window.module = function() {
        var libs = [];
        var callback = null;
        for(var i = 0 ; i < arguments.length; i++) {
            var arg = arguments[i];
            if(arg instanceof Function) {
                callback = arg;
            } else if(arg instanceof Array) {
                for(var j = 0; j < arg.length;j++) {
                    libs.push(arg[j]);
                }
            } else {
                libs.push(arg);
            }
        }

        for(var i = 0 ; i < libs.length ; i++) {
            libs[i] = com.appengine.moduleManager.resolveScriptPath(libs[i]);
        }

        var bridge = {__bridge__flag__:true};
        bridge.ready = false;
        bridge.callback = null;
        var checkRequiredLibsProcessed = function(){
            for(var i = 0 ; i < libs.length; i++) {
                if(!com.appengine.moduleManager.isModuleProcessed(libs[i])) {
                    return false;
                }
            }
            return true;
        }
        var getPackageObjectsArg = function() {
            var args = [];
            for(var i = 0 ; i < libs.length; i++) {
                args.push(com.appengine.moduleManager[libs[i]].packageObject);
            }
            return args;
        }

        var onRequireModulesProcessed= function() {
            bridge.ready = true;
            bridge.packageObject = callback.apply(null,getPackageObjectsArg());

            if(bridge.callback) {
                bridge.callback(bridge.packageObject);
            }
        }

        var currentLoadIndex = 0;
        var loadNextModule = function() {
            if(currentLoadIndex < libs.length){
                com.appengine.moduleManager.loadModule(libs[currentLoadIndex],function(){
                    currentLoadIndex++;
                    loadNextModule();
                });
                return;
            }
            if(checkRequiredLibsProcessed()) {
                onRequireModulesProcessed();
            }
        }

        loadNextModule();

        if(libs == null || libs.length == 0) {
            bridge.ready = true;
            bridge.packageObject = callback();
        }
        return bridge;
    };

    /*
     * 避免与requirejs冲突
     */
    if(window.require==null) {
        window.require = window.module;
    }

    var customTemplate = function() {
        template.onerror = function(e) {
            var message = 'Template Error\n\n';
            for (var name in e) {
                message += '<' + name + '>\n' + e[name] + '\n\n';
            }
            throw new TypeError(e.filename+" : "+e.message);
        }

        template.get = function(filename) {
            var path = com.appengine.view.View.resolvePath(Module.currentTemplateContextPath,filename);
            var module = com.appengine.moduleManager[path];
            if(module != null && module.isViewTemplate()) {
                return function() {
                    var args = [];
                    for(var i = 0 ; i < module.templateDatas.length;i++) {
                        args.push(module.templateDatas[i]);
                    }
                    for(var i = 0 ; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    var data = mergeObject.apply(null,args);

                    var str = module.render.call(null,data);
                    if(module.isXMLTemplate()) {
                        str = nativeParseXMLToJson(str);
                    }
                    var obj = JSON.parse(str);
                    obj["__template__path__"] = path;
                    obj["contextPath"] = path;
                    str = JSON.stringify(obj);
                    return str;
                };
            }
            return function(){return "";}
        }

        /*
         * 定制语法解析，支持默认值指定
         */
        template.defaults.parser = function (code, options) {

            // var match = code.match(/([\w\$]*)(\b.*)/);
            // var key = match[1];
            // var args = match[2];
            // var split = args.split(' ');
            // split.shift();

            code = code.replace(/^\s/, '');

            var split = code.split(' ');
            var key = split.shift();
            var args = split.join(' ');

            switch (key) {

                case 'if':

                    code = 'if(' + args + '){';
                    break;

                case 'else':

                    if (split.shift() === 'if') {
                        split = ' if(' + split.join(' ') + ')';
                    } else {
                        split = '';
                    }

                    code = '}else' + split + '{';
                    break;
                case '/if':

                    code = '}';
                    break;
                case 'each':
                    var object = split[0] || '$data';
                    var as     = split[1] || 'as';
                    var value  = split[2] || '$value';
                    var index  = split[3] || '$index';

                    var param   = value + ',' + index;

                    if (as !== 'as') {
                        object = '[]';
                    }

                    code =  '$each(' + object + ',function(' + param + '){';
                    break;

                case '/each':

                    code = '});';
                    break;

                case 'echo':

                    code = 'print(' + args + ');';
                    break;

                case 'print':
                case 'include':

                    code = key + '(' + split.join(',') + ');';
                    break;

                default:

                    // 过滤器（辅助方法）
                    // {{value | filterA:'abcd' | filterB}}
                    // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
                    // TODO: {{ddd||aaa}} 不包含空格
                    if (/^\s*\|\s*[\w\$]/.test(args)) {

                        var escape = true;

                        // {{#value | link}}
                        if (code.indexOf('#') === 0) {
                            code = code.substr(1);
                            escape = false;
                        }

                        var i = 0;
                        var array = code.split('|');
                        var len = array.length;
                        var val = array[i++];

                        for (; i < len; i ++) {
                            val = filtered(val, array[i]);
                        }

                        code = (escape ? '=' : '=#') + val;

                        // 即将弃用 {{helperName value}}
                    } else if (template.helpers[key]) {

                        code = '=#' + key + '(' + split.join(',') + ');';

                        // 内容直接输出 {{value}}
                    } else {
                        code = "=("+key+"==null?'"+args+"':"+key+")";
                        //code = '=' + code;
                    }

                    break;
            }
            return code;
        };
    }

    module([
        "/libs/appengine_model3d.js"
    ],function(){
        customTemplate();
        if(window.onAppEngineLoaded != null) {
            window.onAppEngineLoaded();
        }
    });
})();

