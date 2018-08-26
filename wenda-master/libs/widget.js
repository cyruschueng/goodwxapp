import ObjectAssign from './object-assign.js';

function Widget(path, obj) {
    this.obj = obj;
    this.$setPathProperty(path, obj);
    console.log(1);
}
Widget.prototype = {
    constructor: Widget,
    $pathProperty: {},    //保存所有页面的方法
    $data: {},      //全局数据保存
    $retProperty() {       //返回基类和每个页面方法的集合
        return ObjectAssign({}, Widget.prototype, this.obj);
    },
    $setPathProperty(path, obj) {    //基类中设置每个页面对应的方法集合
        this.$pathProperty[path] = ObjectAssign({}, Widget.prototype, obj);
    },
    $put(key, val) {  //基类中设置预加载的数据
        Widget.prototype.$data[key] = JSON.stringify(val);
    },
    $take(key) {        //获取基类中相应页面预加载的数据
        return Widget.prototype.$data[key];
    },
    $remove(key) {     //页面数据去除
        Widget.prototype.$data[key] = null;
    },
    $route(path) {
        if (!path) return;

        if (path.indexOf('?') > -1) {
            var [pathStr, args] = path.split('?');
        }
        this.$pathProperty[pathStr ? pathStr : path].onNavigate(args);   //预加载页面路径触发方法
        wx.navigateTo({
            url: path
        })
    }

}



export default Widget;