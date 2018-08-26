/**
 * Created by Robot on 2016/6/25.
 */
var ABGroup = null;
class Group {
    /**
     * 获取AB测试分组
     * @returns {*}
     */
    static getABGroup() {
        return ABGroup;
    }

    static init() {

        ABGroup = localStorage.getItem('minic'+ window.Util.getMinicId() +'-ABGroup');

        ABGroup = 'A';
        if( !ABGroup ){
            ABGroup = Math.random() < 0.5 ? 'A' : 'B';
            localStorage.setItem('minic'+ window.Util.getMinicId() +'-ABGroup', ABGroup);
        }
    }
}
module.exports = Group;