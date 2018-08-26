/*
    * Author : chentao
    * Date : 2017.2.9
    * Desc : 扑克容器
    * Example :
*/
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad : function() {
    },

    reload : function(list) {
        this.node.removeAllChildren();

        list.forEach(function(identity) {
            var prefab = cc.instantiate(fr.cache.prefabs['PokerItem']);
            prefab.getComponent('PokerItem').init(identity);
            prefab.parent = this.node;
        }.bind(this));

        this.node.sortAllChildren();
    },
});
