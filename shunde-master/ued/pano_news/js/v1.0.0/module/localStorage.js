/**
 * @description: 本地存储模块
 * @author: Franco
 * @update:
 */
define('module/localStorage', [], function(){

    return {
        hostName: location.hostname || 'localStatus', // 获取hostName
        isLocalStorage: !!window.localStorage, // 是否支持localStorage
        dataDom: null,
        // 初始化userData
        initDom: function(){
            if(!this.dataDom){
                try{
                    this.dataDom = document.createElement('input'); //这里使用hidden的input元素
                    this.dataDom.type = 'hidden';
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior('#default#userData'); //这是userData的语法
                    document.body.appendChild(this.dataDom);
                    var exDate = new Date();
                    exDate = exDate.getDate() + 30;
                    this.dataDom.expires = exDate.toUTCString(); //设定过期时间
                }catch(ex){
                    return false;
                }
            }
            return true;
        },
        // 设置数据
        set: function(key, value){
            if(this.isLocalStorage){
                window.localStorage.setItem(key, value);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hostName);
                    this.dataDom.setAttribute(key, value);
                    this.dataDom.save(this.hostName)
                }
            }
        },
        // 获取数据
        get: function(key){
            var data = null;
            if(this.isLocalStorage){
                data = window.localStorage.getItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hostName);
                    data = this.dataDom.getAttribute(key);
                }else{}
            }
            return data;
        },
        // 删除数据
        remove: function(key){
            if(this.isLocalStorage){
                localStorage.removeItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hostName);
                    this.dataDom.removeAttribute(key);
                    this.dataDom.save(this.hostName)
                }
            }
        }
    }
});