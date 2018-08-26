module("vizengine_view.js",function () {
    var Object = com.vizengine.core.Object;

    com.vizengine.device = {};

    Object.extend("com.vizengine.device.Device", {
    });

    window.device = new com.vizengine.device.Device();
})