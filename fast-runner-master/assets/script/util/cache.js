var cache = cc.Class({
    extends : cc.Object,

    ctor : function() {
        this.pokers = {};
        this.prefabs = {};
    },
});

module.exports = cache;
