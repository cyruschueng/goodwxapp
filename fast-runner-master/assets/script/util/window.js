var windows = cc._Class.extend({
    ctor : function() {
    },

    show : function(window_key, component_key, params) {
        var prefab = cc.instantiate(fr.cache.prefabs[window_key]);
        prefab.parent = cc.director.getScene();

        var component = prefab.getComponent(component_key || window_key);
        if (component && typeof(component.reload) == 'function') {
            component.reload(params);
        }

        var size = cc.director.getWinSize();
        prefab.setPosition(cc.v2(size.width / 2, size.height / 2));
    },
});

module.exports = windows;
